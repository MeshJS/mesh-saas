import request from "supertest";
import app from "../src/index"; // Import your Express app
import noScriptTxInAndScriptMintJsonPreprod from "../test/sampleJSONs/jsonToTxPreprod/allMoneyGoesBackToChangeAddressPreprod.json";
import scriptTxInJsonPreprod from "../test/sampleJSONs/jsonToTxPreprod/txSpendAScriptInputPreprod.json";
import scriptMintJsonPreprod from "../test/sampleJSONs/jsonToTxPreprod/mintingPlutusAssetPreprod.json";
import noScriptTxInAndScriptMintJson2Preprod from "../test/sampleJSONs/jsonToTxPreprod/sendWithOutputToSpecificAddressPreprod.json";
import scriptMintJsonNoCollateralPreprod from "../test/sampleJSONs/jsonToTxPreprod/mintingPlutusAssetWithNoCollateralPreprod.json";
import scriptTxInJsonNoCollateralPreprod from "../test/sampleJSONs/jsonToTxPreprod/txSpendAScriptInputWithNoCollateralPreprod.json";
import noScriptTxInAndScriptMintJsonMainnet from "../test/sampleJSONs/jsonToTxMainnet/allMoneyGoesBackToChangeAddressMainnet.json";

describe("POST /transaction/json-tx", () => {
  it("should process JSON file with no ScriptTxIn and ScriptSource and return unsignedTx", async () => {
    const data = noScriptTxInAndScriptMintJsonPreprod;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/transaction/json-tx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with ScriptTxIn and collaterals and return unsignedTx", async () => {
    const data = scriptTxInJsonPreprod;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/transaction/json-tx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with ScriptMint and collaterals and return unsignedTx 2", async () => {
    const data = scriptMintJsonPreprod;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/transaction/json-tx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toHaveProperty("unsignedTx");
  });

  it("should process JSON file with no ScriptTxIn and ScriptSource and return unsignedTx 2", async () => {
    const data = noScriptTxInAndScriptMintJson2Preprod;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/transaction/json-tx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toHaveProperty("unsignedTx");
  });

  it("should return 500 if file has ScriptTxIn but without collateral", async () => {
    const data = scriptMintJsonNoCollateralPreprod;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/transaction/json-tx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);

    expect(response.status).toBe(400);
  });

  it("should return 500 if file has ScriptTxIn but without collateral 2", async () => {
    const data = scriptTxInJsonNoCollateralPreprod;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/transaction/json-tx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);

    expect(response.status).toBe(400);
  });

  it("should process JSON file with no ScriptTxIn and ScriptSource - mainnet", async () => {
    const data = noScriptTxInAndScriptMintJsonMainnet;

    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/transaction/json-tx")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toHaveProperty("unsignedTx");
  });
});
