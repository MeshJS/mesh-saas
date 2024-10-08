import request from "supertest";
import app from "./index"; // Import your Express app
import noscriptTxIn_and_scriptMintJson_preprod from "../test/sampleJSONs/preprod/all_money_goes_back_to_change_address_preprod.json";
import scriptTxInJson_preprod from "../test/sampleJSONs/preprod/tx_spend_a_script_input_preprod.json";
import scriptMintJson_preprod from "../test/sampleJSONs/preprod/minting_plutus_asset_preprod.json";
import noscriptTxIn_and_scriptMintJson2_preprod from "../test/sampleJSONs/preprod/send_with_output_to_specific_address_preprod.json";
import scriptMintJson_no_collateral_preprod from "../test/sampleJSONs/preprod/minting_plutus_asset_with_no_collateral_preprod.json";
import scriptTxInJson_no_collateral_preprod from "../test/sampleJSONs/preprod/tx_spend_a_script_input_with_no_collateral_preprod.json";
import noscriptTxIn_and_scriptMintJson_mainnet from "../test/sampleJSONs/mainnet/all_money_goes_back_to_change_address_mainnet.json";

describe("POST /users/jsontoTx", () => {
  it("should process JSON file with no ScriptTxIn and ScriptSource and return unsignedTx", async () => {
    const data = noscriptTxIn_and_scriptMintJson_preprod;

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
    const data = scriptTxInJson_preprod;

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
    const data = scriptMintJson_preprod;

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
    const data = noscriptTxIn_and_scriptMintJson2_preprod;

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
    const data = scriptMintJson_no_collateral_preprod;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/jsontoTx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);

    expect(response.status).toBe(400);
  });

  it("should return 500 if file has ScriptTxIn but without collateral 2", async () => {
    const data = scriptTxInJson_no_collateral_preprod;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/jsontoTx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);

    expect(response.status).toBe(400);
  });

  it("should process JSON file with no ScriptTxIn and ScriptSource - mainnet", async () => {
    const data = noscriptTxIn_and_scriptMintJson_mainnet;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/jsontoTx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toHaveProperty("unsignedTx");
  });
});
