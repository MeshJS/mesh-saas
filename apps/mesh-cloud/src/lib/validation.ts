import * as cqLib from "@cardananium/cquisitor-lib";
import {
  DEFAULT_V1_COST_MODEL_LIST,
  DEFAULT_V2_COST_MODEL_LIST,
  DEFAULT_V3_COST_MODEL_LIST,
  KoiosProvider,
  resolveSlotNo,
} from "@meshsdk/core";
import JSONbig from "json-bigint";
import { getProvider } from "./provider";
import { decodeByCsl } from "@/apps/cquisitor/utils";

type Info = {
  cc_cold_hex: string;
  cc_cold_has_script: boolean;
  status: "authorized" | "not_authorized" | "resigned";
  cc_hot_hex: string | null;
  cc_hot_has_script: boolean | null;
  expiration_epoch: number;
};

const costModels: cqLib.CostModels = {
  plutusV1: [
    100788, 420, 1, 1, 1000, 173, 0, 1, 1000, 59957, 4, 1, 11183, 32, 201305,
    8356, 4, 16000, 100, 16000, 100, 16000, 100, 16000, 100, 16000, 100, 16000,
    100, 100, 100, 16000, 100, 94375, 32, 132994, 32, 61462, 4, 72010, 178, 0,
    1, 22151, 32, 91189, 769, 4, 2, 85848, 228465, 122, 0, 1, 1, 1000, 42921, 4,
    2, 24548, 29498, 38, 1, 898148, 27279, 1, 51775, 558, 1, 39184, 1000, 60594,
    1, 141895, 32, 83150, 32, 15299, 32, 76049, 1, 13169, 4, 22100, 10, 28999,
    74, 1, 28999, 74, 1, 43285, 552, 1, 44749, 541, 1, 33852, 32, 68246, 32,
    72362, 32, 7243, 32, 7391, 32, 11546, 32, 85848, 228465, 122, 0, 1, 1,
    90434, 519, 0, 1, 74433, 32, 85848, 228465, 122, 0, 1, 1, 85848, 228465,
    122, 0, 1, 1, 270652, 22588, 4, 1457325, 64566, 4, 20467, 1, 4, 0, 141992,
    32, 100788, 420, 1, 1, 81663, 32, 59498, 32, 20142, 32, 24588, 32, 20744,
    32, 25933, 32, 24623, 32, 53384111, 14333, 10,
  ],
  plutusV2: [
    100788, 420, 1, 1, 1000, 173, 0, 1, 1000, 59957, 4, 1, 11183, 32, 201305,
    8356, 4, 16000, 100, 16000, 100, 16000, 100, 16000, 100, 16000, 100, 16000,
    100, 100, 100, 16000, 100, 94375, 32, 132994, 32, 61462, 4, 72010, 178, 0,
    1, 22151, 32, 91189, 769, 4, 2, 85848, 228465, 122, 0, 1, 1, 1000, 42921, 4,
    2, 24548, 29498, 38, 1, 898148, 27279, 1, 51775, 558, 1, 39184, 1000, 60594,
    1, 141895, 32, 83150, 32, 15299, 32, 76049, 1, 13169, 4, 22100, 10, 28999,
    74, 1, 28999, 74, 1, 43285, 552, 1, 44749, 541, 1, 33852, 32, 68246, 32,
    72362, 32, 7243, 32, 7391, 32, 11546, 32, 85848, 228465, 122, 0, 1, 1,
    90434, 519, 0, 1, 74433, 32, 85848, 228465, 122, 0, 1, 1, 85848, 228465,
    122, 0, 1, 1, 955506, 213312, 0, 2, 270652, 22588, 4, 1457325, 64566, 4,
    20467, 1, 4, 0, 141992, 32, 100788, 420, 1, 1, 81663, 32, 59498, 32, 20142,
    32, 24588, 32, 20744, 32, 25933, 32, 24623, 32, 43053543, 10, 53384111,
    14333, 10, 43574283, 26308, 10,
  ],
  plutusV3: [
    100788, 420, 1, 1, 1000, 173, 0, 1, 1000, 59957, 4, 1, 11183, 32, 201305,
    8356, 4, 16000, 100, 16000, 100, 16000, 100, 16000, 100, 16000, 100, 16000,
    100, 100, 100, 16000, 100, 94375, 32, 132994, 32, 61462, 4, 72010, 178, 0,
    1, 22151, 32, 91189, 769, 4, 2, 85848, 123203, 7305, -900, 1716, 549, 57,
    85848, 0, 1, 1, 1000, 42921, 4, 2, 24548, 29498, 38, 1, 898148, 27279, 1,
    51775, 558, 1, 39184, 1000, 60594, 1, 141895, 32, 83150, 32, 15299, 32,
    76049, 1, 13169, 4, 22100, 10, 28999, 74, 1, 28999, 74, 1, 43285, 552, 1,
    44749, 541, 1, 33852, 32, 68246, 32, 72362, 32, 7243, 32, 7391, 32, 11546,
    32, 85848, 123203, 7305, -900, 1716, 549, 57, 85848, 0, 1, 90434, 519, 0, 1,
    74433, 32, 85848, 123203, 7305, -900, 1716, 549, 57, 85848, 0, 1, 1, 85848,
    123203, 7305, -900, 1716, 549, 57, 85848, 0, 1, 955506, 213312, 0, 2,
    270652, 22588, 4, 1457325, 64566, 4, 20467, 1, 4, 0, 141992, 32, 100788,
    420, 1, 1, 81663, 32, 59498, 32, 20142, 32, 24588, 32, 20744, 32, 25933, 32,
    24623, 32, 43053543, 10, 53384111, 14333, 10, 43574283, 26308, 10, 16000,
    100, 16000, 100, 962335, 18, 2780678, 6, 442008, 1, 52538055, 3756, 18,
    267929, 18, 76433006, 8868, 18, 52948122, 18, 1995836, 36, 3227919, 12,
    901022, 1, 166917843, 4307, 36, 284546, 36, 158221314, 26549, 36, 74698472,
    36, 333849714, 1, 254006273, 72, 2174038, 72, 2261318, 64571, 4, 207616,
    8310, 4, 1293828, 28716, 63, 0, 1, 1006041, 43623, 251, 0, 1, 100181, 726,
    719, 0, 1, 100181, 726, 719, 0, 1, 100181, 726, 719, 0, 1, 107878, 680, 0,
    1, 95336, 1, 281145, 18848, 0, 1, 180194, 159, 1, 1, 158519, 8942, 0, 1,
    159378, 8813, 0, 1, 107490, 3298, 1, 106057, 655, 1, 1964219, 24520, 3,
  ],
};

// get pp from blockfrost
// const provider = getProvider("blockfrost", apiKey, network);
// const ppFromBlockFrost = await provider.get(`epochs/latest/parameters`);
// console.log("pp?", ppFromBlockFrost);

const PROTOCOLPARAMETERS_V10_0: cqLib.ProtocolParameters = {
  // blockforst type
  minFeeCoefficientA: 44n, // min_fee_a
  minFeeConstantB: 155381n, // min_fee_b
  maxBlockBodySize: 90112, // max_block_size
  maxTransactionSize: 16384, // max_tx_size
  maxBlockHeaderSize: 1100, // max_block_header_size
  stakeKeyDeposit: 2000000n, // key_deposit
  stakePoolDeposit: 500000000n, // pool_deposit
  maxEpochForPoolRetirement: 18, // e_max
  protocolVersion: [10, 0], // [protocol_major_ver, protocol_minor_ver]
  minPoolCost: 170000000n, // min_pool_cost
  adaPerUtxoByte: 4310n, // coins_per_utxo_size!!
  costModels: costModels, // from mesh default // v // cost_models_raw
  executionPrices: {
    memPrice: {
      numerator: 577n, // price_mem * 10000
      denominator: 10_000n,
    },
    stepPrice: {
      numerator: 721n, // price_step * 10000000
      denominator: 10_000_000n,
    },
  },
  maxTxExecutionUnits: {
    mem: 14000000, // max_tx_ex_mem
    steps: 10000000000, // max_tx_ex_steps
  },
  maxBlockExecutionUnits: {
    mem: 62000000, // max_block_ex_mem
    steps: 20000000000, // max_block_ex_steps
  },
  maxValueSize: 5000, // max_val_size
  collateralPercentage: 150, // collateral_percent
  maxCollateralInputs: 3, // max_collateral_inputs
  governanceActionDeposit: 100000000000n, // gov_action_deposit
  drepDeposit: 500000000n, // drep_deposit
  referenceScriptCostPerByte: {
    // 15
    numerator: 15n, // min_fee_ref_script_cost_per_byte
    denominator: 1n, // chnage to 1?
  },
};

// fetch utxo from blockfrost by txId and Index
export const getUtxoSet = async (
  inputs: any,
  service: "blockfrost" | "maestro",
  apiKey: string,
  network: string,
): Promise<cqLib.UtxoInputContext[]> => {
  const provider = getProvider(service, apiKey, network);

  // fetch utxos by txHash and outputIndex
  // Fetch all UTXOs by txHash and outputIndex, and group by address
  const utxosWithAddress: { utxo: cqLib.UTxO; address: string }[] = [];
  for (const input of inputs) {
    const utxos = (await provider.fetchUTxOs(
      input.txHash,
      Number(input.outputIndex),
    )) as cqLib.UTxO[];

    const utxo = utxos[0]!;
    if (!utxo) continue;
    utxosWithAddress.push({ utxo, address: utxo.output.address });
  }

  // console.log("utxosWithAddress: ", utxosWithAddress);

  // Group UTXOs by unique address
  const addressMap = new Map<string, cqLib.UTxO[]>();
  for (const { utxo, address } of utxosWithAddress) {
    if (!addressMap.has(address)) {
      addressMap.set(address, []);
    }
    addressMap.get(address)!.push(utxo);
  }

  // console.log("addressMap: ", addressMap);

  // Fetch all UTXOs for each unique address once
  const addressUtxosMap = new Map<string, cqLib.UTxO[]>();
  for (const address of addressMap.keys()) {
    const addressUtxos = (await provider.fetchAddressUTxOs(
      address,
    )) as cqLib.UTxO[];
    addressUtxosMap.set(address, addressUtxos);
  }

  // console.log("addressUtxosMap: ", addressUtxosMap);

  // Check if each utxo is unspent
  const utxoSet: cqLib.UtxoInputContext[] = [];
  for (const { utxo, address } of utxosWithAddress) {
    const addressUtxos = addressUtxosMap.get(address) || [];
    const isUnspent = addressUtxos.some(
      (u) =>
        u.input.txHash === utxo.input.txHash &&
        u.input.outputIndex === utxo.input.outputIndex,
    );

    const UtxoInputContext: cqLib.UtxoInputContext = {
      utxo: utxo,
      isSpent: !isUnspent,
    };

    utxoSet.push(UtxoInputContext);
  }

  return utxoSet;
};

export const validate = async (
  cbor: string,
  service: "blockfrost" | "maestro",
  apiKey: string,
  network: string,
) => {
  const contextData: any = cqLib.get_necessary_data_list_js(cbor);

  const contextJson = JSON.parse(contextData);

  const accounts: cqLib.AccountInputContext[] = contextJson.accounts;

  const committeeMembers = contextJson.committeeMembers;

  const {
    activeCommitteeMembers,
    potentialCommitteeMembers,
    resignedCommitteeMembers,
  } = await splitCommitteeMembers(committeeMembers);

  const dReps: cqLib.DrepInputContext[] = contextJson.dReps;

  const govActions: cqLib.GovActionInputContext[] = contextJson.govActions;

  const lastEnactedGovAction: cqLib.GovActionInputContext[] =
    contextJson.lastEnactedGovAction;

  const pools: cqLib.PoolInputContext[] = contextJson.pools;

  const utxos = contextJson.utxos;

  // console.log("data: ", contextJson);
  // console.log("accounts: ", accounts);
  // console.log("committeeMembers: ", committeeMembers);
  // console.log("dReps: ", dReps);
  // console.log("govActions: ", govActions);
  // console.log("lastEnactedGovAction: ", lastEnactedGovAction);
  // console.log("pools: ", pools);
  // console.log("utxos: ", utxos);

  const utxoSet = await getUtxoSet(utxos, service, apiKey, network);
  // console.log("utxoSet: ", utxoSet);

  const networkTypeForSlot = network as
    | "mainnet"
    | "testnet"
    | "preview"
    | "preprod";

  const slot = BigInt(resolveSlotNo(networkTypeForSlot, Date.now()));

  const txJson: any = decodeByCsl(cbor, "Transaction", {
    plutus_script_version: 3,
    plutus_data_schema: "DetailedSchema",
  });

  const treasuryValue = txJson.transaction.body.current_treasury_value || 0n;

  const networkType: cqLib.NetworkType =
    network === "mainnet" ? "mainnet" : "testnet";

  const context: cqLib.ValidationInputContext = {
    accountContexts: accounts,
    committeeContext: {
      activeCommitteeMembers: activeCommitteeMembers, // Vec<LocalCredential>,
      potentialCommitteeMembers: potentialCommitteeMembers, // Vec<LocalCredential>,
      resignedCommitteeMembers: resignedCommitteeMembers, // Vec<LocalCredential>,
    },
    drepContexts: dReps,
    govActionContexts: govActions,
    lastEnactedGovAction: lastEnactedGovAction,
    networkType: networkType, // mainNet, testNet
    poolContexts: pools,
    protocolParameters: PROTOCOLPARAMETERS_V10_0, // currently hard coded
    slot: slot, // u64
    treasuryValue: treasuryValue, // u64
    utxoSet: utxoSet,
  };

  const json4 = cqLib.validate_transaction_js(cbor, JSONbig.stringify(context));

  // console.log("cbor: ", cbor);
  console.log("context", context);
  console.log("json4: ", json4);

  return json4;
};

export const splitCommitteeMembers = async (
  committeeMembers: any[],
): Promise<cqLib.CommitteeInputContext> => {
  const activeCommitteeMembers: cqLib.LocalCredential[] = [];
  const potentialCommitteeMembers: cqLib.LocalCredential[] = [];
  const resignedCommitteeMembers: cqLib.LocalCredential[] = [];

  if (committeeMembers.length === 0) {
    // return empty arrays if no committee members are provided
    console.log("No committee members in transaction");

    return {
      activeCommitteeMembers,
      potentialCommitteeMembers,
      resignedCommitteeMembers,
    };
  }

  if (!process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY_PREPROD) {
    console.log("Please set up environment variables");

    // return empty arrays if no API key is set
    return {
      activeCommitteeMembers,
      potentialCommitteeMembers,
      resignedCommitteeMembers,
    };
  }

  const provider = new KoiosProvider(
    "preprod",
    process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY_PREPROD,
  );

  console.log("fetching committee info from koios...");

  const committeeInfo = await provider.get("/committee_info");
  // console.log("Committee Info:", committeeInfo[0]);

  const committeeMembersFromKoios: Info[] = committeeInfo[0].members;

  const membersById = new Map(
    committeeMembersFromKoios.map((info: Info) => [info.cc_cold_hex, info]),
  );

  for (const member of committeeMembers) {
    const memberInfo: Info = membersById.get(member)!;

    if (!memberInfo) {
      console.log("Unknown member:", member);
      continue;
    }

    const targetArr =
      memberInfo.status === "authorized"
        ? activeCommitteeMembers
        : memberInfo.status === "not_authorized"
          ? potentialCommitteeMembers
          : memberInfo.status === "resigned"
            ? resignedCommitteeMembers
            : null;

    if (!targetArr) {
      console.log("Unknown status for member:", memberInfo.cc_cold_hex);
      continue;
    }

    if (memberInfo.cc_cold_has_script) {
      targetArr.push({ scriptHash: member });
    } else {
      targetArr.push({ keyHash: member });
    }
  }

  return {
    activeCommitteeMembers,
    potentialCommitteeMembers,
    resignedCommitteeMembers,
  };
};
