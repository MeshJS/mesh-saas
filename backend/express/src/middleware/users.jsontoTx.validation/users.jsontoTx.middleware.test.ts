import { Request, Response, NextFunction } from "express";
import { validateParam } from "./users.jsontoTx.middleware";
import noscriptTxIn_and_scriptMintJson from "../../../test/sampleJSONs/all_money_goes_back_to_change_address.json";
import noscriptTxIn_and_scriptMintJson2 from "../../../test/sampleJSONs/send_with_output_to_specific_address.json";
import scriptTxInJson from "../../../test/sampleJSONs/tx_spend_a_script_input.json";
import scriptTxInJson_no_collateral from "../../../test/sampleJSONs/tx_spend_a_script_input_with_no_collateral.json";
import scriptMintJson from "../../../test/sampleJSONs/minting_plutus_asset.json";
import scriptMintJson_no_collateral from "../../../test/sampleJSONs/minting_plutus_asset_with_no_collateral.json";

describe("validateParam Middleware", () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    next = jest.fn();
  });

  it("should pass for JSON file with no ScriptTxIn and ScriptSource", async () => {
    req.body = noscriptTxIn_and_scriptMintJson;
    await validateParam(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should pass for JSON file with no ScriptTxIn and ScriptSource 2", async () => {
    req.body = noscriptTxIn_and_scriptMintJson2;
    await validateParam(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should pass for JSON file with both ScriptTxIn and collaterals", async () => {
    req.body = scriptTxInJson;
    await validateParam(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should fail for JSON file with ScriptTxIn and without collaterals", async () => {
    req.body = scriptTxInJson_no_collateral;
    await validateParam(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error:
        "Collaterals cannot be null when scriptTxIn or scriptMint is present.",
    });
  });

  it("should pass for JSON file with both ScriptMint and collaterals", async () => {
    req.body = scriptMintJson;
    await validateParam(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("should fail for JSON file with both ScriptTxIn and ScriptSource and no collaterals", async () => {
    req.body = scriptMintJson_no_collateral;
    await validateParam(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error:
        "Collaterals cannot be null when scriptTxIn or scriptMint is present.",
    });
  });
});
