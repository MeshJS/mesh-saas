import request from "supertest";
import app from "./index"; // Import your Express app
import noScriptTxInJson from "../test/sampleJSONs/all_money_goes_back_to_change_address.json";
import scriptTxInJson from "../test/sampleJSONs/tx_spend_a_script_input.json";
import scriptMintJson from "../test/sampleJSONs/minting_plutus_asset.json";
import noScriptTxInJson2 from "../test/sampleJSONs/send_with_output_to_specific_address.json";
import scriptMintJson_no_collateral from "../test/sampleJSONs/minting_plutus_asset_with_no_collateral.json";
import scriptTxInJson_no_collateral from "../test/sampleJSONs/tx_spend_a_script_input_with_no_collateral.json";

describe("POST /users/jsontoTx", () => {
  it("should process JSON file with no ScriptTxIn and ScriptSource and return unsignedTx", async () => {
    const data = noScriptTxInJson;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/jsontoTx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with ScriptTxIn and collaterals and return unsignedTx", async () => {
    const data = scriptTxInJson;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/jsontoTx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with ScriptMint and collaterals and return unsignedTx 2", async () => {
    const data = scriptMintJson;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/jsontoTx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with no ScriptTxIn and ScriptSource and return unsignedTx 2", async () => {
    const data = noScriptTxInJson2;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/jsontoTx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toHaveProperty("unsignedTx");
  });

  it("should return 500 if file has ScriptTxIn but without collateral", async () => {
    const data = scriptMintJson_no_collateral;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/jsontoTx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);

    expect(response.status).toBe(400);
  });

  it("should return 500 if file has ScriptTxIn but without collateral 2", async () => {
    const data = scriptTxInJson_no_collateral;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/jsontoTx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);

    expect(response.status).toBe(400);
  });
});
