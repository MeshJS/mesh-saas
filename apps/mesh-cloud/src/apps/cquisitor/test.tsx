import { getProvider } from "@/lib/provider";
import { type IWallet, MeshTxBuilder } from "@meshsdk/core";

export const getTestTx = async (
  service: "blockfrost" | "maestro",
  apiKey: string,
  network: string,
  wallet: IWallet,
): Promise<string> => {
  const provider = getProvider(service, apiKey, network);

  const utxos = await wallet.getUtxos();
  const changeAddress = await wallet.getChangeAddress();

  const txBuilder = new MeshTxBuilder({
    fetcher: provider,
    verbose: true,
  });

  const collateral = (await wallet.getCollateral())[0]!;

  const unsignedTx = await txBuilder
    // .txInCollateral(
    //   collateral.input.txHash,
    //   collateral.input.outputIndex,
    //   collateral.output.amount,
    //   collateral.output.address,
    // )
    // .setFee("200000")
    .txOut(
      "addr_test1qzh08xdyqhkav7t3z73akejnux3rpc0klywatwkmwletudeql3za4qnqjwhga5hy7rupcn674xm0phd9v8yhfn7xx4wszxyw5t",
      [{ unit: "lovelace", quantity: "1000000" }],
    )
    .changeAddress(changeAddress)
    .selectUtxosFrom(utxos)
    .complete();

  const signedTx = await wallet.signTx(unsignedTx, true);

  return signedTx;
};
