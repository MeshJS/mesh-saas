import request from "supertest";
import app from "./index";
import { demoMnemonic } from "./data/cardano";
import * as meshSdkCore from "@meshsdk/core";

describe("POST /users/meshUtilities/resolvers", () => {
  it("resolve private key", async () => {
    const data = demoMnemonic;
    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/meshUtilities/resolvers/resolvePrivateKey")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual(
      "xprv1cqa46gk29plgkg98upclnjv5t425fcpl4rgf9mq2txdxuga7jfq5shk7np6l55nj00sl3m4syzna3uwgrwppdm0azgy9d8zahyf32s62klfyhe0ayyxkc7x92nv4s77fa0v25tufk9tnv7x6dgexe9kdz5gpeqgu"
    );
  });
  it("resolve native script hash", async () => {
    const datum = "supersecretdatum";
    console.log("Sending request with data:", datum);

    const response = await request(app)
        .get(`/users/meshUtilities/resolvers/resolveDataHash/${datum}`)
        .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual("d786b11f300b0a7b4e0fe7931eb7871fb7ed762c0a060cd1f922dfa631cafb8c");
  });
  it("resolve native script into hash", async () => {
    const data = {
        address:
          "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
        nativeScript: {
          type: "all",
          scripts: [
            {
              type: "sig",
              keyHash: "dummyKeyHash",
            },
          ],
        },
      };
    console.log("Sending request with data:", data);

    const response = await request(app)
        .post("/users/meshUtilities/resolvers/resolveNativeScriptHash")
        .send(data)
        .set("Accept", "application/json");
    
    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual("f748d81a6bf4c1f6f57cf8628017901a73639a3eb9a7bb6732a8c0c9");
    });
  it("resolve script hash", async () => {
    const scriptAddress = "8200581c5867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f";
    console.log("Sending request with data:", scriptAddress);

    const response = await request(app)
        .get(`/users/meshUtilities/resolvers/resolveScriptHash/${scriptAddress}`)
        .set("Accept", "application/json");
    
    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);
    
    expect(response.body).toEqual("d9312da562da182b02322fd8acb536f37eb9d29fba7c49dc17255527");
  });
  it("resolve stake address", async () => {
    const walletaddress = "addr_test1qpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0uafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq93swx9";
    console.log("Sending request with data:", walletaddress);

    const response = await request(app)
      .get(`/users/meshUtilities/resolvers/resolveStakeAddress/${walletaddress}`)
      .set("Accept", "application/json");
    
    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual("stake_test1uzw5mnt7g4xjgdqkfa80hrk7kdvds6sa4k0vvgjvlj7w8eskffj2n");
  });
  it("resolve Fingerprint", async () => {
    const data = {
        policyId: "426117329844ccb3b0ba877220ff06a5bdf21eab3fb33e2f3a3f8e69",
        assetName: "4d657368546f6b656e",
      };
    console.log("Sending request with data:", data);

    const response = await request(app)
      .post("/users/meshUtilities/resolvers/resolveFingerprint")
      .send(data)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual("asset1w7z7f29z9pxy6epred5j2a0vsc69nllw8tcpf6");
    });
    it("resolve stake key hash", async () => {
    const stakeaddress = "stake_test1uzw5mnt7g4xjgdqkfa80hrk7kdvds6sa4k0vvgjvlj7w8eskffj2n";
    console.log("Sending request with data:", stakeaddress);

    const response = await request(app)
    .get(`/users/meshUtilities/resolvers/resolveStakeKeyHash/${stakeaddress}`)
    .set("Accept", "application/json");
      
    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body); 

    expect(response.body).toEqual("9d4dcd7e454d2434164f4efb8edeb358d86a1dad9ec6224cfcbce3e6");
    });
    it("resolve rep id", async () => {
    const scripthash = "202a3b011141058d75e4a142a5990f9d819be7d46677154133379660";
    console.log("Sending request with data:", scripthash);

    const response = await request(app)
    .get(`/users/meshUtilities/resolvers/resolveRepId/${scripthash}`)
    .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual("drep_script1yq4rkqg3gyzc6a0y59p2txg0nkqehe75vem32sfnx7txqfef0u0");
    });
    it("resolve epoch number", async () => {
        const network = "preprod";
        console.log("Sending request with data:", network);

        const response = await request(app)
        .get(`/users/meshUtilities/resolvers/resolveEpochNumber/${network}`)
        .set("Accept", "application/json"); 

        console.log("Received response with status:", response.status);
        console.log("Received response body:", response.body);
    
        expect(response.body).toEqual(meshSdkCore.resolveEpochNo(network));
    });
    it("resolve slot number", async () => {
        const network = "preprod";
        console.log("Sending request with data:", network);

        const response = await request(app)
        .get(`/users/meshUtilities/resolvers/resolveSlotNumber/${network}`)
        .set("Accept", "application/json");

        console.log("Received response with status:", response.status);
        console.log("Received response body:", response.body);

        expect(response.body).toEqual(meshSdkCore.resolveSlotNo(network));
    });
});
