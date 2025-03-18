const mockInput = {
  0: {
    ada: 2,
    indy: 4.12,
    staking_position: 1,
    address: "addr1qx234567890abcdefghijklmnopqrstuvwxyz",
    datum:
      "d87a9fd8799f581cfa773cf3b7cb0a80d8ff29e065ad3fc2a4bb075874f3fbac743fd368a0d8799f1b00000133e5035169ffffff",
  },
  1: {
    ada: 3.21,
    indy: 4.12,
    staking_position: 1,
    address: "addr1qx234567890abcdefghijklmnopqrstuvwxyz",
    datum:
      "d87a9fd8799f581cfa773cf3b7cb0a80d8ff29e065ad3fc2a4bb075874f3fbac743fd368a0d8799f1b00000133e5035169ffffff",
  },
  2: {
    ada: 4.86,
    indy: 4.12,
    staking_position: 1,
    address: "addr1qx234567890abcdefghijklmnopqrstuvwxyz",
    datum:
      "d87a9fd8799f581cfa773cf3b7cb0a80d8ff29e065ad3fc2a4bb075874f3fbac743fd368a0d8799f1b00000133e5035169ffffff",
  },
};

const mockTxHash = {
  hashed_value: "somethingHash",
};

const mockOutput = {
  0: {
    ada: 3,
  },
  1: {
    ada: 4.21,
  },
  2: {
    ada: 1.86,
  },
  3: {
    ada: 512.34234234,
  },
};

const mockOption = {
  mint: {
    staking_position: 1,
  },
  withdrawal: {
    ada: 2,
  },
};

const mockFee = {
  fee: {
    ada: 0.17,
  },
  burn: {
    indy: 512351234,
  },
  donation: {
    ada: 2.17,
  },
};

export const mockJson = {
  input: mockInput,
  txHash: mockTxHash,
  output: mockOutput,
  option: mockOption,
  fee: mockFee,
};
