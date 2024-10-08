import { Request, Response } from "express";
import { jsontoTx } from "./users.jsontoTx.controller";
import noScriptTxInJson from "../../../test/sampleJSONs/all_money_goes_back_to_change_address.json";
import scriptTxInJson from "../../../test/sampleJSONs/tx_spend_a_script_input.json";
import scriptMintJson from "../../../test/sampleJSONs/minting_plutus_asset.json";
import noScriptTxInJson2 from "../../../test/sampleJSONs/send_with_output_to_specific_address.json";
import scriptMintJson_no_collateral from "../../../test/sampleJSONs/minting_plutus_asset_with_no_collateral.json";
import scriptTxInJson_no_collateral from "../../../test/sampleJSONs/tx_spend_a_script_input_with_no_collateral.json";

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

  it("should process JSON file with no ScriptTxIn and ScriptSource", async () => {
    req.body = noScriptTxInJson;
    console.log("Request Body:", req.body);
    await jsontoTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with ScriptTxIn and collaterals", async () => {
    req.body = scriptTxInJson;
    console.log("Request Body:", req.body);
    await jsontoTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with ScriptMint and collaterals", async () => {
    req.body = scriptMintJson;
    console.log("Request Body:", req.body);
    await jsontoTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with no ScriptTxIn and ScriptSource 2", async () => {
    req.body = noScriptTxInJson2;
    console.log("Request Body:", JSON.stringify(req.body));
    await jsontoTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });

  it("should return 500 if file has ScriptTxIn but without collateral", async () => {
    req.body = scriptMintJson_no_collateral;
    console.log("Request Body:", JSON.stringify(req.body));
    await jsontoTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(500);
  });

  it("should return 500 if file has ScriptTxIn but without collateral", async () => {
    req.body = scriptTxInJson_no_collateral;
    console.log("Request Body:", JSON.stringify(req.body));
    await jsontoTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(500);
  });
});
