import CardSection from "@/components/card-section";
import Metatags from "@/components/site/metatags";
import Codeblock from "@/components/text/codeblock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useValidateStaking } from "@/hooks/useValidateStaking";
import axios from "axios";
import { useState } from "react";
import MeshUtilsLayout from "./layout";

const EXPRESS_BACKEND_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL!;

export default function ResolveNativeScriptHash() {
  const { isStaked, isDRepDelegated } = useValidateStaking();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const runDemo = async () => {
    setLoading(true);
    try {
      const requestBody = {
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

      const res = await axios.post(
        `${EXPRESS_BACKEND_URL}users/meshUtilities/resolvers/resolveNativeScriptHash`,
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
  codeSnippet += `  address: "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",\n`;
  codeSnippet += `  nativeScript: {\n`;
  codeSnippet += `    type: "all",\n`;
  codeSnippet += `    scripts: [\n`;
  codeSnippet += `      {\n`;
  codeSnippet += `        type: "sig",\n`;
  codeSnippet += `        keyHash: "dummyKeyHash",\n`;
  codeSnippet += `      },\n`;
  codeSnippet += `    ],\n`;
  codeSnippet += `  },\n`;
  codeSnippet += `};\n`;
  codeSnippet += `\n`;
  codeSnippet += `const res = await axios.post(\n`;
  codeSnippet += `  "${EXPRESS_BACKEND_URL}users/meshUtilities/resolvers/resolveNativeScriptHash",\n`;
  codeSnippet += `  requestBody,\n`;
  codeSnippet += `);\n`;

  return (
    <MeshUtilsLayout>
      <Metatags title="ResolveNativeScriptHash" />
      <CardSection
        title="Resolve NativeScript Hash"
        description="Converts NativeScript into hash."
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
