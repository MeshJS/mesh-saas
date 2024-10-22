import { Request, Response } from "express";
import {
  deserializeAddress,
  deserializeDatum,
  deserializePoolId,
} from "./usersMeshUtilitiesDeserializersController";

describe("mesh_utilities_deserializers Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should deserialize an address and return pubKeyHash, scriptHash, stakecredentialHash, stakeScriptCredentialHash", async () => {
    req.params = {
      address: "addr_test1qpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0uafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq93swx9"
    };
    console.log("Request Params:", req.params);
    await deserializeAddress(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    expect((res.json as jest.Mock).mock.calls[0][0]).toEqual({
      pubKeyHash: "5867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f",
      scriptHash: "",
      stakeCredentialHash:
        "9d4dcd7e454d2434164f4efb8edeb358d86a1dad9ec6224cfcbce3e6",
      stakeScriptCredentialHash: "",
    });
  });

  it("should deserialize a datum and return a JSON object", async () => {
    req.params = {
      cbor: "167a4a048d87fcee0425ed200615ff2356f472c6413472c6106b8c5da52e3fd0"};
    console.log("Request Body:", req.params);
    await deserializeDatum(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    expect((res.json as jest.Mock).mock.calls[0][0]).toEqual({
      int: 22,
    });
  });

  it("should deserialize a poolId and return a Ed25519 key hash", async () => {
    req.params = {
      poolId: "pool107k26e3wrqxwghju2py40ngngx2qcu48ppeg7lk0cm35jl2aenx",
    }
    console.log("Request Body:", req.params);
    await deserializePoolId(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toEqual(
      "7facad662e180ce45e5c504957cd1341940c72a708728f7ecfc6e349",
    );
  });
});
