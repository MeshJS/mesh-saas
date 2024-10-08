import { Request, Response } from "express";
import { jsontoTx } from "./users.jsontoTx.controller";
import noscriptTxIn_and_scriptMintJson_preprod from "../../../test/sampleJSONs/preprod/all_money_goes_back_to_change_address_preprod.json";
import scriptTxInJson_preprod from "../../../test/sampleJSONs/preprod/tx_spend_a_script_input_preprod.json";
import scriptMintJson_preprod from "../../../test/sampleJSONs/preprod/minting_plutus_asset_preprod.json";
import noscriptTxIn_and_scriptMintJson2_preprod from "../../../test/sampleJSONs/preprod/send_with_output_to_specific_address_preprod.json";
import scriptMintJson_no_collateral_preprod from "../../../test/sampleJSONs/preprod/minting_plutus_asset_with_no_collateral_preprod.json";
import scriptTxInJson_no_collateral_preprod from "../../../test/sampleJSONs/preprod/tx_spend_a_script_input_with_no_collateral_preprod.json";
import noscriptTxIn_and_scriptMintJson_mainnet from "../../../test/sampleJSONs/mainnet/all_money_goes_back_to_change_address_mainnet.json";
// import scriptTxInJson_mainnet from "../../../test/sampleJSONs/mainnet/tx_spend_a_script_input_mainnet.json";
// import scriptMintJson_mainnet from "../../../test/sampleJSONs/mainnet/minting_plutus_asset_mainnet.json";
// import noscriptTxIn_and_scriptMintJson2_mainnet from "../../../test/sampleJSONs/mainnet/send_with_output_to_specific_address_mainnet.json";
// import scriptMintJson_no_collateral_mainnet from "../../../test/sampleJSONs/mainnet/minting_plutus_asset_with_no_collateral_mainnet.json";
// import scriptTxInJson_no_collateral_mainnet from "../../../test/sampleJSONs/mainnet/tx_spend_a_script_input_with_no_collateral_mainnet.json";

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
    req.body = noscriptTxIn_and_scriptMintJson_preprod;
    console.log("Request Body:", req.body);
    await jsontoTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with ScriptTxIn and collaterals - preprod", async () => {
    req.body = scriptTxInJson_preprod;
    console.log("Request Body:", req.body);
    await jsontoTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with ScriptMint and collaterals - preprod", async () => {
    req.body = scriptMintJson_preprod;
    console.log("Request Body:", req.body);
    await jsontoTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with no ScriptTxIn and ScriptSource 2 - preprod", async () => {
    req.body = noscriptTxIn_and_scriptMintJson2_preprod;
    console.log("Request Body:", JSON.stringify(req.body));
    await jsontoTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });

  it("should return 500 if file has ScriptTxIn but without collateral - preprod", async () => {
    req.body = scriptMintJson_no_collateral_preprod;
    console.log("Request Body:", JSON.stringify(req.body));
    await jsontoTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(500);
  });

  it("should return 500 if file has ScriptTxIn but without collateral - preprod", async () => {
    req.body = scriptTxInJson_no_collateral_preprod;
    console.log("Request Body:", JSON.stringify(req.body));
    await jsontoTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    expect((res.status as jest.Mock).mock.calls[0][0]).toBe(500);
  });

  it("should process JSON file with no ScriptTxIn and ScriptSource - mainnet", async () => {
    req.body = noscriptTxIn_and_scriptMintJson_mainnet;
    console.log("Request Body:", req.body);
    await jsontoTx(req as Request, res as Response);
    console.log("Response Status:", (res.status as jest.Mock).mock.calls);
    console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
    const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
    expect(jsonResponse).toHaveProperty("unsignedTx");
  });

  // it("should process JSON file with ScriptTxIn and collaterals - mainnet", async () => {
  //   req.body = scriptTxInJson_mainnet;
  //   console.log("Request Body:", req.body);
  //   await jsontoTx(req as Request, res as Response);
  //   console.log("Response Status:", (res.status as jest.Mock).mock.calls);
  //   console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
  //   const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
  //   expect(jsonResponse).toHaveProperty("unsignedTx");
  // });

  // it("should process JSON file with ScriptMint and collaterals - mainnet", async () => {
  //   req.body = scriptMintJson_mainnet;
  //   console.log("Request Body:", req.body);
  //   await jsontoTx(req as Request, res as Response);
  //   console.log("Response Status:", (res.status as jest.Mock).mock.calls);
  //   console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
  //   const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
  //   expect(jsonResponse).toHaveProperty("unsignedTx");
  // });

  // it("should process JSON file with no ScriptTxIn and ScriptSource 2 - mainnet", async () => {
  //   req.body = noscriptTxIn_and_scriptMintJson2_mainnet;
  //   console.log("Request Body:", JSON.stringify(req.body));
  //   await jsontoTx(req as Request, res as Response);
  //   console.log("Response Status:", (res.status as jest.Mock).mock.calls);
  //   console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
  //   const jsonResponse = (res.json as jest.Mock).mock.calls[0][0];
  //   expect(jsonResponse).toHaveProperty("unsignedTx");
  // });

  // it("should return 500 if file has ScriptTxIn but without collateral - mainnet", async () => {
  //   req.body = scriptMintJson_no_collateral_mainnet;
  //   console.log("Request Body:", JSON.stringify(req.body));
  //   await jsontoTx(req as Request, res as Response);
  //   console.log("Response Status:", (res.status as jest.Mock).mock.calls);
  //   console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
  //   expect((res.status as jest.Mock).mock.calls[0][0]).toBe(500);
  // });

  // it("should return 500 if file has ScriptTxIn but without collateral - mainnet", async () => {
  //   req.body = scriptTxInJson_no_collateral_mainnet;
  //   console.log("Request Body:", JSON.stringify(req.body));
  //   await jsontoTx(req as Request, res as Response);
  //   console.log("Response Status:", (res.status as jest.Mock).mock.calls);
  //   console.log("Response JSON:", (res.json as jest.Mock).mock.calls);
  //   expect((res.status as jest.Mock).mock.calls[0][0]).toBe(500);
  // });
});
