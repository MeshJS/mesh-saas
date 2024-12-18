// import { Request, Response, NextFunction } from "express";
// import { validateParam } from "./usersJsonToTxValidation";
// import noscriptTxIn_and_scriptMintJson_preprod from "../../../test/sampleJSONs/preprod/all_money_goes_back_to_change_address_preprod.json";
// import noscriptTxIn_and_scriptMintJson2_preprod from "../../../test/sampleJSONs/preprod/send_with_output_to_specific_address_preprod.json";
// import scriptTxInJson_preprod from "../../../test/sampleJSONs/preprod/tx_spend_a_script_input_preprod.json";
// import scriptTxInJson_no_collateral_preprod from "../../../test/sampleJSONs/preprod/tx_spend_a_script_input_with_no_collateral_preprod.json";
// import scriptMintJson_preprod from "../../../test/sampleJSONs/preprod/minting_plutus_asset_preprod.json";
// import scriptMintJson_no_collateral_preprod from "../../../test/sampleJSONs/preprod/minting_plutus_asset_with_no_collateral_preprod.json";
// import noscriptTxIn_and_scriptMintJson_mainnet from "../../../test/sampleJSONs/mainnet/all_money_goes_back_to_change_address_mainnet.json";
// // import scriptTxInJson_mainnet from "../../../test/sampleJSONs/mainnet/tx_spend_a_script_input_mainnet.json";
// // import scriptMintJson_mainnet from "../../../test/sampleJSONs/mainnet/minting_plutus_asset_mainnet.json";
// // import noscriptTxIn_and_scriptMintJson2_mainnet from "../../../test/sampleJSONs/mainnet/send_with_output_to_specific_address_mainnet.json";
// // import scriptMintJson_no_collateral_mainnet from "../../../test/sampleJSONs/mainnet/minting_plutus_asset_with_no_collateral_mainnet.json";
// // import scriptTxInJson_no_collateral_mainnet from "../../../test/sampleJSONs/mainnet/tx_spend_a_script_input_with_no_collateral_mainnet.json";

// describe("validateParam Middleware", () => {
//   let req: Request;
//   let res: Response;
//   let next: NextFunction;

//   beforeEach(() => {
//     req = {} as Request;
//     res = {} as Response;
//     res.status = jest.fn().mockReturnValue(res);
//     res.json = jest.fn().mockReturnValue(res);
//     next = jest.fn();
//   });

//   it("should pass for JSON file with no ScriptTxIn and ScriptSource - preprod", async () => {
//     req.body = noscriptTxIn_and_scriptMintJson_preprod;
//     await validateParam(req, res, next);
//     expect(next).toHaveBeenCalled();
//   });

//   it("should pass for JSON file with no ScriptTxIn and ScriptSource 2 - preprod", async () => {
//     req.body = noscriptTxIn_and_scriptMintJson2_preprod;
//     await validateParam(req, res, next);
//     expect(next).toHaveBeenCalled();
//   });

//   it("should pass for JSON file with both ScriptTxIn and collaterals - preprod", async () => {
//     req.body = scriptTxInJson_preprod;
//     await validateParam(req, res, next);
//     expect(next).toHaveBeenCalled();
//   });

//   it("should fail for JSON file with ScriptTxIn and without collaterals - preprod", async () => {
//     req.body = scriptTxInJson_no_collateral_preprod;
//     await validateParam(req, res, next);
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       error:
//         "Collaterals cannot be null when scriptTxIn or scriptMint is present.",
//     });
//   });

//   it("should pass for JSON file with both ScriptMint and collaterals - preprod", async () => {
//     req.body = scriptMintJson_preprod;
//     await validateParam(req, res, next);
//     expect(next).toHaveBeenCalled();
//   });

//   it("should fail for JSON file with both ScriptTxIn and ScriptSource and no collaterals - preprod", async () => {
//     req.body = scriptMintJson_no_collateral_preprod;
//     await validateParam(req, res, next);
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       error:
//         "Collaterals cannot be null when scriptTxIn or scriptMint is present.",
//     });
//   });

//   it("should pass for JSON file with no ScriptTxIn and ScriptSource - mainnet", async () => {
//     req.body = noscriptTxIn_and_scriptMintJson_mainnet;
//     await validateParam(req, res, next);
//     expect(next).toHaveBeenCalled();
//   });

//   // it("should pass for JSON file with both ScriptTxIn and collaterals - mainnet", async () => {
//   //   req.body = scriptTxInJson_mainnet;
//   //   await validateParam(req, res, next);
//   //   expect(next).toHaveBeenCalled();
//   // });

//   // it("should pass for JSON file with both ScriptMint and collaterals - mainnet", async () => {
//   //   req.body = scriptMintJson_mainnet;
//   //   await validateParam(req, res, next);
//   //   expect(next).toHaveBeenCalled();
//   // });

//   // it("should pass for JSON file with no ScriptTxIn and ScriptSource 2 - mainnet", async () => {
//   //   req.body = noscriptTxIn_and_scriptMintJson2_mainnet;
//   //   await validateParam(req, res, next);
//   //   expect(next).toHaveBeenCalled();
//   // });

//   // it("should fail for JSON file with ScriptTxIn but without collateral - mainnet", async () => {
//   //   req.body = scriptTxInJson_no_collateral_mainnet;
//   //   await validateParam(req, res, next);
//   //   expect(res.status).toHaveBeenCalledWith(400);
//   //   expect(res.json).toHaveBeenCalledWith({
//   //     error:
//   //       "Collaterals cannot be null when scriptTxIn or scriptMint is present.",
//   //   });
//   // });

//   // it("should fail for JSON file with ScriptMint but without collateral - mainnet", async () => {
//   //   req.body = scriptMintJson_no_collateral_mainnet;
//   //   await validateParam(req, res, next);
//   //   expect(res.status).toHaveBeenCalledWith(400);
//   //   expect(res.json).toHaveBeenCalledWith({
//   //     error:
//   //       "Collaterals cannot be null when scriptTxIn or scriptMint is present.",
//   //   });
//   // });
// });
