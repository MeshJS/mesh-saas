import * as cq from "@cardananium/cquisitor-lib";

export const isASCII = (str: string) => {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str);
};

export type DecodeType =
  | "cbor-to-json"
  | "decode-by-csl"
  | "check-tx-signature"
  | "decode-plutus-cbor-json"
  | "decode-plutus-cbor-uplc"
  | "evaluate-redeemer";

export const decodeCborToJson = (cborHex: string) => {
  const result = cq.cbor_to_json(cborHex);
  return JSON.parse(result as any);
};

export const decodeByCsl = (
  dataString: string,
  typeName: string,
  schemaType: cq.DecodingParams = {
    plutus_script_version: 3,
    plutus_data_schema: "DetailedSchema",
  },
): string => {
  const decoded = cq.decode_specific_type(dataString, typeName, schemaType);
  if (typeof decoded === "string" || decoded instanceof String) {
    return JSON.parse(decoded as string);
  }
  return decoded;
};

export const checkTxSignature = (cborHex: string) => {
  return cq.check_block_or_tx_signatures(cborHex);
};

export const decodePlutusCborJson = (cborHex: string) => {
  return cq.decode_plutus_program_uplc_json(cborHex);
};

export const decodePlutusCborUplc = (cborHex: string) => {
  return cq.decode_plutus_program_pretty_uplc(cborHex);
};

export const decode = (
  cborHex: string,
  decodeType: DecodeType = "cbor-to-json",
  dataType: string = "Transaction",
  schemaType: cq.DecodingParams = {
    plutus_script_version: 3,
    plutus_data_schema: "DetailedSchema",
  },
) => {
  switch (decodeType) {
    case "cbor-to-json":
      return decodeCborToJson(cborHex);
    case "decode-by-csl":
      return decodeByCsl(cborHex, dataType, schemaType);
    case "check-tx-signature":
      return checkTxSignature(cborHex);
    case "decode-plutus-cbor-json":
      return decodePlutusCborJson(cborHex);
    case "decode-plutus-cbor-uplc":
      return decodePlutusCborUplc(cborHex);
    default:
      return null;
  }
};
