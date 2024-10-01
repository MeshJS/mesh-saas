import {
  BlockfrostProvider,
  MaestroProvider,
  type MaestroSupportedNetworks,
  type Network,
} from "@meshsdk/core";

export const getProvider = (
  provider: "blockfrost" | "maestro",
  apiKey: string,
  network: Omit<Network, "testnet">,
) => {
  if (provider === "blockfrost") {
    const instance = new BlockfrostProvider(apiKey, 0);
    return instance;
  } else {
    const instance = new MaestroProvider({
      network: (network.charAt(0).toUpperCase() +
        network.slice(1)) as MaestroSupportedNetworks,
      apiKey,
    });
    return instance;
  }
};
