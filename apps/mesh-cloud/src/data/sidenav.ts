export const SIDENAV: {
  [key: string]: {
    label: string;
    href: string;
  }[];
} = {
  yaci: [
    {
      label: "Usage",
      href: "/yaci/usage",
    },
    {
      label: "Faucet",
      href: "/yaci/faucet",
    },
  ],
  dev: [
    {
      label: "Transaction",
      href: "/dev/transaction",
    },
  ],
  transaction: [
    {
      label: "JSON to Tx",
      href: "/transaction/json-tx",
    },
  ],
  "mesh-utils": [
    {
      label: "Serialize NativeScript",
      href: "/mesh-utils/serializeNativeScript",
    },
    {
      label: "Serialize PlutusScript",
      href: "/mesh-utils/serializePlutusScript",
    },
    {
      label: "Serialize Address Object",
      href: "/mesh-utils/serializeAddressObject",
    },
    {
      label: "Serialize Pool Id",
      href: "/mesh-utils/serializePoolId",
    },
    {
      label: "Serialize Reward Address",
      href: "/mesh-utils/serializeRewardAddress",
    },
    {
      label: "Deserialize Address",
      href: "/mesh-utils/deserializeAddress",
    },
    {
      label: "Deserialize Datum",
      href: "/mesh-utils/deserializeDatum",
    },
    {
      label: "Deserialize Pool Id",
      href: "/mesh-utils/deserializePoolId",
    },
    {
      label: "Resolve Private Key",
      href: "/mesh-utils/resolvePrivateKey",
    },
    {
      label: "Resolve Data Hash",
      href: "/mesh-utils/resolveDataHash",
    },
    {
      label: "Resolve NativeScript Hash",
      href: "/mesh-utils/resolveNativeScriptHash",
    },
    {
      label: "Resolve Script Hash",
      href: "/mesh-utils/resolveScriptHash",
    },
    {
      label: "Resolve Stake Address",
      href: "/mesh-utils/resolveStakeAddress",
    },
    {
      label: "Resolve Fingerprint",
      href: "/mesh-utils/resolveFingerprint",
    },
    {
      label: "Resolve Stake Key Hash",
      href: "/mesh-utils/resolveStakeKeyHash",
    },
    {
      label: "Resolve Rep Id",
      href: "/mesh-utils/resolveRepId",
    },
    {
      label: "Resolve Epoch Number",
      href: "/mesh-utils/resolveEpochNumber",
    },
    {
      label: "Resolve Slot Number",
      href: "/mesh-utils/resolveSlotNumber",
    },
  ],
  "tx-inspector": [
    {
      label: "Graph",
      href: "/graph",
    },
  ],
};
