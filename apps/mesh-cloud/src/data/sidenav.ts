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
      href: "/transaction/jsonToTx",
    },
  ],
};
