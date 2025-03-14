const mockInput = {
  0: {
    ada: 2,
  },
  1: {
    ada: 3.21,
  },
  2: {
    ada: 4.86,
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
