import * as cq from "@cardananium/cquisitor-lib";
import { Link } from "@mui/material";
import { defineDataType } from "@textea/json-viewer";
import { type Dispatch, type SetStateAction } from "react";

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

export const nonCSLDecodeOption: Record<string, DecodeType> = {
  "CBOR to JSON": "cbor-to-json",
  "Check tx signatures": "check-tx-signature",
  "Decode plutus CBOR (json structure)": "decode-plutus-cbor-json",
  "Decode plutus CBOR (plain uplc)": "decode-plutus-cbor-uplc",
};

export const decodeCborToJson = (cborHex: string) => {
  const result = cq.cbor_to_json(cborHex);
  return JSON.parse(replaceSerdeJsonNumbersWithString(result as any));
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
  return replaceSerdeJsonNumbersWithString(
    cq.check_block_or_tx_signatures(cborHex),
  );
};

export const decodePlutusCborJson = (cborHex: string) => {
  return replaceSerdeJsonNumbersWithString(
    cq.decode_plutus_program_uplc_json(cborHex),
  );
};

export const decodePlutusCborUplc = (cborHex: string) => {
  return replaceSerdeJsonNumbersWithString(
    cq.decode_plutus_program_pretty_uplc(cborHex),
  );
};

export function replaceSerdeJsonNumbersWithString<T>(data: T): T {
  if (typeof data !== "object" || data === null) {
    return data;
  }

  if (
    Object.prototype.hasOwnProperty.call(data, "$serde_json::private::Number")
  ) {
    return (data as any)["$serde_json::private::Number"];
  }

  if (Array.isArray(data)) {
    return data.map((item) => replaceSerdeJsonNumbersWithString(item)) as any;
  }

  const result: Record<string, unknown> = {};
  for (const key of Object.keys(data)) {
    result[key] = replaceSerdeJsonNumbersWithString((data as any)[key]);
  }

  return result as T;
}

export const decode = (
  cborHex: string,
  decodeType: DecodeType = "cbor-to-json",
  dataType = "Transaction",
  schemaType: cq.DecodingParams = {
    plutus_script_version: 3,
    plutus_data_schema: "DetailedSchema",
  },
) => {
  if (!cborHex) {
    const object_stub = {
      message1: "Welcome",
      message2:
        "This is tool to decode CBOR into JSON representation. Just put your CBOR hex on the left side",
      message3:
        "You can also decode CBOR by cardano-serialization-lib. Choose that option on the top list to use it",
      message4:
        "To check signatures of transactions, choose that option on the top list and paste block hex or tx hex. Note: the tool doesn't check missed signatures",
    };
    return replaceSerdeJsonNumbersWithString(object_stub);
  }

  try {
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
  } catch (err) {
    return "Error decoding CBOR" + JSON.stringify(err);
  }
};

export function mapNetworkName(
  networkName: any,
  dataType: string,
  data: string,
) {
  if (
    networkName === "mainnet" ||
    typeof networkName !== "string" ||
    networkName.length === 0
  ) {
    return ["https://cardanoscan.io/", dataType, "/", data].join("");
  }
  return [
    "https://",
    networkName,
    ".cardanoscan.io/",
    dataType,
    "/",
    data,
  ].join("");
}

export const getPositionDataType = (
  setCborPositionFunction: Dispatch<SetStateAction<number[]>>,
) =>
  defineDataType({
    is: (value, path) =>
      typeof value === "object" &&
      (path[path.length - 1] === "position_info" ||
        path[path.length - 1] === "struct_position_info"),
    Component: (props: any) => (
      <Link
        component="button"
        onClick={() => {
          setCborPositionFunction([props.value.offset, props.value.length]);
        }}
      >
        offset: {props.value.offset}, length: {props.value.length} (click)
      </Link>
    ),
  });

export const getTxIdDataType = (networkType: string) =>
  defineDataType({
    is: (value, path) =>
      typeof value === "string" && path[path.length - 1] === "transaction_id",
    Component: (props: any) => (
      <Link
        target="_blank"
        href={mapNetworkName(networkType, "transaction", props.value)}
      >
        <span style={{ overflowWrap: "anywhere" }}>{props.value}</span>
      </Link>
    ),
  });

export const getTxAddressDataType = (networkType: string) =>
  defineDataType({
    is: (value, path) =>
      typeof value === "string" && path[path.length - 1] === "address",
    Component: (props: any) => (
      <Link
        target="_blank"
        href={mapNetworkName(networkType, "address", props.value)}
      >
        <span style={{ overflowWrap: "anywhere" }}>{props.value}</span>
      </Link>
    ),
  });
