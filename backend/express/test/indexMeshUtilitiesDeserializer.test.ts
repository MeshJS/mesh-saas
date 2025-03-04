import request from "supertest";
import app from "../src/index"; // Import your Express app

describe("GET /users/mesh_utilities/deserializers", () => {
  it("deserialize address", async () => {
    const address =
      "addr_test1qpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0uafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq93swx9";
    console.log("Sending request with data:", address);

    const response = await request(app)
      .get(`/users/meshUtilities/deserializers/deserializeAddress/${address}`)
      .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual({
      pubKeyHash: "5867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f",
      scriptHash: "",
      stakeCredentialHash:
        "9d4dcd7e454d2434164f4efb8edeb358d86a1dad9ec6224cfcbce3e6",
      stakeScriptCredentialHash: "",
    });
  });
  it("deserialize datum", async () => {
    const cbor = "167a4a048d87fcee0425ed200615ff2356f472c6413472c6106b8c5da52e3fd0";
    console.log("Sending request with data:", cbor);

    const response = await request(app)
        .get(`/users/meshUtilities/deserializers/deserializeDatum/${cbor}`)
        .set("Accept", "application/json");
    
    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual({
        int: 22,
    });
 });
 it("deserialize poolId", async () => {
    const poolId = "pool107k26e3wrqxwghju2py40ngngx2qcu48ppeg7lk0cm35jl2aenx";
    console.log("Sending request with data:", poolId);

    const response = await request(app)
        .get(`/users/meshUtilities/deserializers/deserializePoolId/${poolId}`)
        .set("Accept", "application/json");

    console.log("Received response with status:", response.status);
    console.log("Received response body:", response.body);

    expect(response.body).toEqual(
        "7facad662e180ce45e5c504957cd1341940c72a708728f7ecfc6e349",
    );
    }); 
});
