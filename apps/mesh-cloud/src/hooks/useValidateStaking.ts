import {
  BlockfrostProvider,
  BrowserWallet,
  keepRelevant,
  MeshTxBuilder,
  type Quantity,
  Transaction,
  type Unit,
} from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";
import { useCallback, useEffect, useState } from "react";

const blockfrostApiKey = process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY_PREPROD!;
const meshPoolId = process.env.NEXT_PUBLIC_MESH_POOL_ID!;
const meshDRepId = process.env.NEXT_PUBLIC_MESH_DREP_ID!; // (Leon, 10/08/2024) - Use CIP-105 DRep ID for backward compatibility, as current Mesh csl does not support CIP-129 yet

export const useValidateStaking = () => {
  const blockchainProvider = new BlockfrostProvider(blockfrostApiKey);

  const walletInfo = useWallet();

  const [wallet, setBrowserWallet] = useState<BrowserWallet | null>(null);
  const [rewardAddress, setRewardAddress] = useState<string | null>(null);

  const [stakingError, setErrorMessage] = useState<string | null>(null);

  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isStaked, setIsStaked] = useState<boolean>(false);
  const [isDRepDelegated, setIsDRepDelegated] = useState<boolean>(false);

  const checkAddressInfo = async (stakeAddress: string) => {
    const info = await blockchainProvider.get(`/accounts/${stakeAddress}`);

    const { active, pool_id, drep_id } = info;

    setIsRegistered(active);

    if (active && pool_id && pool_id == meshPoolId) {
      setIsStaked(true);
    }

    if (drep_id && drep_id == meshDRepId) {
      setIsDRepDelegated(true);
    }
  };

  const stakeToPool = useCallback(async () => {
    if (!rewardAddress) {
      setErrorMessage("Connect your wallet first before staking to pool");
      return;
    }

    if (!wallet) {
      setErrorMessage("Wallet not connected");
      return;
    }

    try {
      const tx = new Transaction({ initiator: wallet });
      if (!isRegistered) {
        tx.registerStake(rewardAddress);
      }

      tx.delegateStake(rewardAddress, meshPoolId);

      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);
      console.log("StakeToPool success: ", txHash);

      if (txHash) {
        setErrorMessage(null);
        setIsStaked(true);
      }
    } catch (error) {
      setErrorMessage(`Error staking to pool.`);
      console.log(error);
    }
  }, [rewardAddress, wallet, isRegistered, meshPoolId]);

  const delegateDRep = useCallback(async () => {
    if (!rewardAddress) {
      setErrorMessage("Connect your wallet first before delegating to DRep");
      return;
    }
    if (!wallet) {
      setErrorMessage("Wallet not connected");
      return;
    }

    const utxos = await wallet.getUtxos();

    const changeAddress = await wallet.getChangeAddress();

    const assetMap = new Map<Unit, Quantity>();
    assetMap.set("lovelace", "5000000");
    const selectedUtxos = keepRelevant(assetMap, utxos);

    const txBuilder = new MeshTxBuilder();

    for (const utxo of selectedUtxos) {
      txBuilder.txIn(
        utxo.input.txHash,
        utxo.input.outputIndex,
        utxo.output.amount,
        utxo.output.address,
      );
    }

    txBuilder
      .voteDelegationCertificate(
        {
          dRepId: meshDRepId,
        },
        rewardAddress,
      )
      .changeAddress(changeAddress);

    const unsignedTx = await txBuilder.complete();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("DelegateDRep success: ", txHash);

    if (txHash) {
      setErrorMessage(null);
      setIsDRepDelegated(true);
    }
  }, [rewardAddress, wallet]);

  useEffect(() => {
    if (walletInfo.name) {
      BrowserWallet.enable(walletInfo.name).then((wallet) => {
        setBrowserWallet(wallet);
        wallet.getRewardAddresses().then((addresses) => {
          if (addresses.length > 0 && addresses[0]) {
            setRewardAddress(addresses[0]);
            checkAddressInfo(addresses[0]);
          }
        });
      });
    }
  }, [walletInfo.name]);

  return {
    rewardAddress,
    stakeToPool,
    delegateDRep,
    stakingError,
    wallet,
    isStaked,
    isDRepDelegated,
    isRegistered,
  };
};
