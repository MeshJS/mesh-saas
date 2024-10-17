import { Request, Response } from "express";
import * as meshSdkCore from "@meshsdk/core";
import {
  resolvePrivateKey,
  resolveDataHash,
  resolveNativeScriptHash,
  resolveScriptHash,
  resolveStakeAddress,
  resolveFingerprint,
  resolveStakeKeyHash,
  resolveRepId,
  resolveEpochNumber,
  resolveSlotNumber,
} from "./usersMeshUtilitiesResolversController";
import { demoMnemonic } from "../../data/cardano";

describe("mesh_utilities_resolvers Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should resolve mnemonic phrases and return the private key", async () => {
    req.body = demoMnemonic;
    console.log("Request Body:", req.body);
    await resolvePrivateKey(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    expect((res.json as jest.Mock).mock.calls[0][0]).toEqual(
      "xprv1cqa46gk29plgkg98upclnjv5t425fcpl4rgf9mq2txdxuga7jfq5shk7np6l55nj00sl3m4syzna3uwgrwppdm0azgy9d8zahyf32s62klfyhe0ayyxkc7x92nv4s77fa0v25tufk9tnv7x6dgexe9kdz5gpeqgu",
    );
  });

  it("should resolve datum and return the data hash", async () => {
    req.params = {
      datum: "supersecretdatum"};
    console.log("Request Body:", req.params);
    await resolveDataHash(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    expect((res.json as jest.Mock).mock.calls[0][0]).toEqual(
      "d786b11f300b0a7b4e0fe7931eb7871fb7ed762c0a060cd1f922dfa631cafb8c",
    );
  });

  it("should resolve native script and return the hash", async () => {
    req.body = {
      address:
        "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
      nativeScript: {
        type: "all",
        scripts: [
          {
            type: "sig",
            keyHash: "dummyKeyHash",
          },
        ],
      },
    };
    console.log("Request Body:", req.body);
    await resolveNativeScriptHash(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual(
      "f748d81a6bf4c1f6f57cf8628017901a73639a3eb9a7bb6732a8c0c9",
    );
  });

  it("should resolve script address and return the hash", async () => {
    req.params = { scriptaddress: "8200581c5867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f"};
    console.log("Request Body:", req.params);
    await resolveScriptHash(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual(
      "d9312da562da182b02322fd8acb536f37eb9d29fba7c49dc17255527",
    );
  });

  it("should resolve wallet address and return a stake address", async () => {
    req.params = { walletaddress: "addr_test1qpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0uafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq93swx9"};
    console.log("Request Body:", req.params);
    await resolveStakeAddress(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual(
      "stake_test1uzw5mnt7g4xjgdqkfa80hrk7kdvds6sa4k0vvgjvlj7w8eskffj2n",
    );
  });

  it("should convert asset policy ID and asset name to asset fingerprint", async () => {
    req.body = {
      policyId: "426117329844ccb3b0ba877220ff06a5bdf21eab3fb33e2f3a3f8e69",
      assetName: "4d657368546f6b656e",
    };
    console.log("Request Body:", req.body);
    await resolveFingerprint(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual(
      "asset1w7z7f29z9pxy6epred5j2a0vsc69nllw8tcpf6",
    );
  });

  it("should resolve stake address and return the stake key hash", async () => {
    req.params = { stakeaddress: "stake_test1uzw5mnt7g4xjgdqkfa80hrk7kdvds6sa4k0vvgjvlj7w8eskffj2n"};
    console.log("Request Body:", req.params);
    await resolveStakeKeyHash(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual(
      "9d4dcd7e454d2434164f4efb8edeb358d86a1dad9ec6224cfcbce3e6",
    );
  });

  it("should resolve script hash and return the DRep ID", async () => {
    req.params = { scripthash: "202a3b011141058d75e4a142a5990f9d819be7d46677154133379660"};
    console.log("Request Body:", req.params);
    await resolveRepId(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual(
      "drep_script1yq4rkqg3gyzc6a0y59p2txg0nkqehe75vem32sfnx7txqfef0u0",
    );
  });

  it("should get the epoch number for the network", async () => {
    req.params = { network: "preprod" };
    const network = req.params.network as "preprod" | "testnet" | "preview" | "mainnet";
    console.log("Request Body:", req.params);
    await resolveEpochNumber(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual(meshSdkCore.resolveEpochNo(network));
  });

  it("should get the slot number for the network", async () => {
    req.params = { network: "preprod" };
    const network = req.params.network as "preprod" | "testnet" | "preview" | "mainnet";
    console.log("Request Body:", req.params);
    await resolveSlotNumber(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual(meshSdkCore.resolveSlotNo(network));
  });
});
