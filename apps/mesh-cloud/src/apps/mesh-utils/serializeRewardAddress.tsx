import CardSection from "@/components/card-section";
import Metatags from "@/components/site/metatags";
import Codeblock from "@/components/text/codeblock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { demoPubKeyHash } from "@/data/cardano";
import { useValidateStaking } from "@/hooks/useValidateStaking";
import axios from "axios";
import { useState } from "react";
import { SelectNetwork } from "@/apps/dev/transaction";

import MeshUtilsLayout from "./layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EXPRESS_BACKEND_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL!;

export default function SerializeRewardAddress() {
  const { isStaked, isDRepDelegated } = useValidateStaking();

  const [loading, setLoading] = useState(false);

  const [network, setNetwork] = useState<"mainnet" | "testnet">("testnet");
  const [input, setInput] = useState(demoPubKeyHash);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const runDemo = async () => {
    setLoading(true);
    try {
      const requestBody = {
        ScriptHashOrKeyHash: input,
        Is_Script_Hash: true,
        Network: network,
      };

      const res = await axios.post(
        `${EXPRESS_BACKEND_URL}users/meshUtilities/serializers/serializeRewardAddress`,
        requestBody,
      );
      const data = res.data;
      setSuccess(JSON.stringify(data, null, 2));
    } catch (error) {
      setError(`Error calling API.`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  let codeSnippet = "";
  codeSnippet += `const requestBody = {\n`;
  codeSnippet += `  ScriptHashOrKeyHash: "${input}",\n`;
  codeSnippet += `  Is_Script_Hash: true,\n`;
  codeSnippet += `  Network: "${network}",\n`;
  codeSnippet += `};\n`;
  codeSnippet += `\n`;
  codeSnippet += `const res = await axios.post(\n`;
  codeSnippet += `  "${EXPRESS_BACKEND_URL}users/meshUtilities/serializers/serializeRewardAddress",\n`;
  codeSnippet += `  requestBody,\n`;
  codeSnippet += `);\n`;

  return (
    <MeshUtilsLayout>
      <Metatags title="SerializeRewardAddress" />
      <CardSection
        title="Serialize Reward Address"
        description="Serialize a script hash or key hash into bech32 reward address."
        footer={
          <div className="flex gap-2">
            <Button onClick={() => runDemo()} disabled={loading}>
              Run API
            </Button>

            <Button
              onClick={() => runDemo()}
              disabled={!isStaked || !isDRepDelegated}
            >
              Run API
            </Button>
          </div>
        }
      >
        <div className="grid gap-3">
          <Label htmlFor="pubKeyHash">Public Key Hash</Label>
          <Input
            id="pubKeyHash"
            placeholder={input}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            disabled={loading}
          />
          <Label htmlFor="pubKeyHash">Select Network</Label>
          <SelectNetwork
            setValue={setNetwork}
            placeholder="Testnet"
            simplified
          />
          <Codeblock data={codeSnippet} language="javascript" />
        </div>
        {error && (
          <>
            <AlertTitle>API Error</AlertTitle>
            <Alert>
              <AlertDescription className="break-all">
                <code>{error}</code>
              </AlertDescription>
            </Alert>
          </>
        )}

        {success && (
          <>
            <AlertTitle>API Response</AlertTitle>
            <Alert>
              <AlertDescription className="break-all">
                <Codeblock data={JSON.parse(success)} isJson />
              </AlertDescription>
            </Alert>
          </>
        )}
      </CardSection>
    </MeshUtilsLayout>
  );
}
