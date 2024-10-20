import CardSection from "@/components/card-section";
import Metatags from "@/components/site/metatags";
import Codeblock from "@/components/text/codeblock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useValidateStaking } from "@/hooks/useValidateStaking";
import axios from "axios";
import { useState } from "react";
import MeshUtilsLayout from "./layout";

const EXPRESS_BACKEND_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL!;

export default function ResolveDataHash() {
  const { isStaked, isDRepDelegated } = useValidateStaking();

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState("supersecretdatum");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const runDemo = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${EXPRESS_BACKEND_URL}users/meshUtilities/resolvers/resolveDataHash/${input}`,
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
  codeSnippet += `const datum = "${input}";\n`;
  codeSnippet += `\n`;
  codeSnippet += `const res = await axios.get(\n`;
  codeSnippet += `  "${EXPRESS_BACKEND_URL}users/meshUtilities/resolvers/resolveDataHash/" + datum,\n`;
  codeSnippet += `);\n`;

  return (
    <MeshUtilsLayout>
      <Metatags title="ResolveDataHash" />
      <CardSection
        title="Resolve Data Hash"
        description="Converts datum into hash. Getting the hash is useful when you need to query for the UTXO that contain the assets you need for your transaction's input."
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
          <Label htmlFor="datum">Datum</Label>
          <Input
            id="datum"
            placeholder={input}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            disabled={loading}
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
