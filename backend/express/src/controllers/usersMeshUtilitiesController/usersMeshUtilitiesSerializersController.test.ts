import { Request, Response } from "express";
import { serializeNativeScript } from "./usersMeshUtilitiesSerializersController";
import { serializePlutusScript } from "./usersMeshUtilitiesSerializersController";
import { serializeAddressObject } from "./usersMeshUtilitiesSerializersController";
import { serializePoolId } from "./usersMeshUtilitiesSerializersController";
import { serializeRewardAddress } from "./usersMeshUtilitiesSerializersController";
import { demoPlutusAlwaysSucceedScript } from "../../data/cardano";
import { demoPubKeyHash, demoStakeCredential } from "../../data/cardano";
import sampleNativeScript from "../../../test/sampleJSONs/meshUtilitiesSerializers/sampleNativeScript.json";

describe("mesh_utilities_serializers Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should serialize a native script and return the serialized script", async () => {
    req.body = sampleNativeScript;
    console.log("Request Body:", req.body);
    await serializeNativeScript(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual({
      address:
        "addr_test1wq96gqkqgfm4mll7m0v43jhrspdzsxadxn6xkkm06hpvwugv62733",
      scriptCbor:
        "82018282051a05f5e0ff8200581c5867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f",
    });
  });

  it("should serialize a plutus script and return the serialized script", async () => {
    req.body = {
      code: demoPlutusAlwaysSucceedScript,
      version: "V2",
    };
    console.log("Request Body:", req.body);
    await serializePlutusScript(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual({
      address:
        "addr_test1wpunlryvl7aqsxe22erzlsseej87v5kk5vutvtrmzdy8dect48z0w",
    });
  });

  it("should serialize an address object and return the serialized address object", async () => {
    req.body = {
      PubKeyHash: demoPubKeyHash,
      StakeCredential: demoStakeCredential,
    };
    console.log("Request Body:", req.body);
    await serializeAddressObject(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual(
      "addr_test1zz4qfrjvezs7vlsajllm6jlxzsugq9xtc2ey29f8yq558d5afhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq0dwnyy",
    );
  });

  it("should serialize a PubKeyHash and return the serialized pool ID", async () => {
    req.params = { pubkeyhash: demoPubKeyHash };
    console.log("Request Body:", req.params);
    await serializePoolId(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual(
      "pool114gzgunxg58n8u8vhl775hes58zqpfj7zkfz32feq99pmvykz00d",
    );
  });

  it("should serialize a script hash or key hash into bech32 reward address", async () => {
    req.body = {
      ScriptHashOrKeyHash: demoPubKeyHash,
      Is_Script_Hash: true,
      Network: "testnet",
    };
    console.log("Request Body:", req.body);
    await serializeRewardAddress(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual(
      "stake_test17z4qfrjvezs7vlsajllm6jlxzsugq9xtc2ey29f8yq558ds4yqfjm",
    );
  });
});
