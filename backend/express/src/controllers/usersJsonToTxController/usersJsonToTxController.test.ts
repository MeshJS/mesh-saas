import { Request, Response } from "express";
import { jsonToTx } from "./usersJsonToTxController";
import noScriptTxInAndScriptMintJsonPreprod from "../../../test/sampleJSONs/jsonToTxPreprod/allMoneyGoesBackToChangeAddressPreprod.json";
import scriptTxInJsonPreprod from "../../../test/sampleJSONs/jsonToTxPreprod/txSpendAScriptInputPreprod.json";
import scriptMintJsonPreprod from "../../../test/sampleJSONs/jsonToTxPreprod/mintingPlutusAssetPreprod.json";
import noScriptTxInAndScriptMintJson2Preprod from "../../../test/sampleJSONs/jsonToTxPreprod/sendWithOutputToSpecificAddressPreprod.json";
import scriptMintJsonNoCollateralPreprod from "../../../test/sampleJSONs/jsonToTxPreprod/mintingPlutusAssetWithNoCollateralPreprod.json";
import scriptTxInJsonNoCollateralPreprod from "../../../test/sampleJSONs/jsonToTxPreprod/txSpendAScriptInputWithNoCollateralPreprod.json";
import noScriptTxInAndScriptMintJsonMainnet from "../../../test/sampleJSONs/jsonToTxMainnet/allMoneyGoesBackToChangeAddressMainnet.json";

describe("jsontoTx Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should process JSON file with no ScriptTxIn and ScriptSource - preprod", async () => {
    req.body = noScriptTxInAndScriptMintJsonPreprod;
    console.log("Request Body:", req.body);
    await jsonToTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with ScriptTxIn and collaterals - preprod", async () => {
    req.body = scriptTxInJsonPreprod;
    console.log("Request Body:", req.body);
    await jsonToTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with ScriptMint and collaterals - preprod", async () => {
    req.body = scriptMintJsonPreprod;
    console.log("Request Body:", req.body);
    await jsonToTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with no ScriptTxIn and ScriptSource 2 - preprod", async () => {
    req.body = noScriptTxInAndScriptMintJson2Preprod;
    console.log("Request Body:", JSON.stringify(req.body));
    await jsonToTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });

  it("should return 500 if file has ScriptTxIn but without collateral - preprod", async () => {
    req.body = scriptMintJsonNoCollateralPreprod;
    console.log("Request Body:", JSON.stringify(req.body));
    await jsonToTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(500);
  });

  it("should return 500 if file has ScriptTxIn but without collateral - preprod", async () => {
    req.body = scriptTxInJsonNoCollateralPreprod;
    console.log("Request Body:", JSON.stringify(req.body));
    await jsonToTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(500);
  });

  it("should process JSON file with no ScriptTxIn and ScriptSource - mainnet", async () => {
    req.body = noScriptTxInAndScriptMintJsonMainnet;
    console.log("Request Body:", req.body);
    await jsonToTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });
});
