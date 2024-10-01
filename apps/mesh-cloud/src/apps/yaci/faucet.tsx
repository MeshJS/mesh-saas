import CardSection from "@/components/card-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import YaciLayout from "./layout";
import { post } from "@/lib/axios";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import Metatags from "@/components/site/metatags";
import Code from "@/components/code";

const amount = 10000;

export default function YaciFaucet() {
  const [address, setAddress] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function requestFunds() {
    setLoading(true);
    const res = await post("/admin/topup", {
      wallet_address: address,
      ada_amount: amount,
    });
    console.log("res", res);
    if (res.message == "Topup successful") {
      setDone(true);
    }
    setLoading(false);
  }

  const codeCurl = `curl -d '{"wallet_address":"addr_test1qpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0uafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq93swx9","ada_amount":10000}' -H "Content-Type: application/json" -X POST https://yaci-node.meshjs.dev/admin/topup`;

  return (
    <YaciLayout>
      <Metatags title="Faucet" />
      <>
        <CardSection
          title="Faucet"
          description="Request test ADA using the faucet"
          footer={
            !done && (
              <Button onClick={() => requestFunds()} disabled={loading}>
                Request Funds
              </Button>
            )
          }
        >
          <>
            <p>
              While these tokens have no 'real world' value, they enable users
              to experiment with Yaci node, without having to spend real ADA on
              the mainnet.
            </p>
            {done ? (
              <Alert>
                <AlertTitle>Funds requested successfully</AlertTitle>
                <AlertDescription className="break-all">
                  {amount} ADA sent to the <code>{address}</code>
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid gap-3">
                <Label htmlFor="address">The address to send funds to</Label>
                <Input
                  id="address"
                  placeholder="addr_test1..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
          </>
        </CardSection>
        <CardSection title="API" description="Request test ADA using via API">
          <>
            <p>
              Send a POST request to the following endpoint with the
              wallet_address and ada_amount.
            </p>
            <Code>{codeCurl}</Code>
          </>
        </CardSection>
      </>
    </YaciLayout>
  );
}
