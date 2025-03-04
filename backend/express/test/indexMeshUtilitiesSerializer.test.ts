import request from "supertest";
import app from "../src/index";
import sampleNativeScript from "../test/sampleJSONs/meshUtilitiesSerializers/sampleNativeScript.json";
import { demoPlutusAlwaysSucceedScript } from "../src/data/cardano";
import { demoPubKeyHash, demoStakeCredential } from "../src/data/cardano";

// To test successfully, you would need to run individual test case by adding .only to the described test case

describe("POST /users/mesh_utilities/serializers", () => {
  it("serialize native script", async () => {
    const data = sampleNativeScript;
    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/meshUtilities/serializers/serializeNativeScript")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual({
      address:
        "addr_test1wq96gqkqgfm4mll7m0v43jhrspdzsxadxn6xkkm06hpvwugv62733",
      scriptCbor:
        "82018282051a05f5e0ff8200581c5867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f",
    });
  });
  it("serialize plutus script", async () => {
    const data = {
      code: demoPlutusAlwaysSucceedScript,
      version: "V2",
    };
    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/meshUtilities/serializers/serializePlutusScript")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual({
      address:
        "addr_test1wpunlryvl7aqsxe22erzlsseej87v5kk5vutvtrmzdy8dect48z0w",
    });
  });
  it("serialize address object", async () => {
    const data = {
      PubKeyHash: demoPubKeyHash,
      StakeCredential: demoStakeCredential,
    };
    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/meshUtilities/serializers/serializeAddressObject")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual(
      "addr_test1zz4qfrjvezs7vlsajllm6jlxzsugq9xtc2ey29f8yq558d5afhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq0dwnyy",
    );
  });
  it("serialize PoolId", async () => {
    const pubkeyhash = demoPubKeyHash;
    console.log("Sending request with data:", pubkeyhash);

    const response = await request(app)
      .get(`/users/meshUtilities/serializers/serializePoolId/${pubkeyhash}`)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual(
      "pool114gzgunxg58n8u8vhl775hes58zqpfj7zkfz32feq99pmvykz00d",
    );
  });
  it("serialize RewardAddress", async () => {
    const data = {
      ScriptHashOrKeyHash: demoPubKeyHash,
      Is_Script_Hash: true,
      Network: "testnet",
    };

    const response = await request(app)
      .post("/users/meshUtilities/serializers/serializeRewardAddress")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual(
      "stake_test17z4qfrjvezs7vlsajllm6jlxzsugq9xtc2ey29f8yq558ds4yqfjm",
    );
  });
});
