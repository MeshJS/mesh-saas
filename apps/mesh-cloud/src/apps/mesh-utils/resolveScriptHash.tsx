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

export default function ResolveScriptHash() {
  const { isStaked, isDRepDelegated } = useValidateStaking();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const runDemo = async () => {
    setLoading(true);
    try {
      const address =
        "8200581c5867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f";

      const res = await axios.get(
        `${EXPRESS_BACKEND_URL}users/meshUtilities/resolvers/resolveScriptHash/${address}`,
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
  codeSnippet += `const address =\n`;
  codeSnippet += `  "8200581c5867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f";\n`;
  codeSnippet += `\n`;
  codeSnippet += `const res = await axios.get(\n`;
  codeSnippet += `  "${EXPRESS_BACKEND_URL}users/meshUtilities/resolvers/resolveScriptHash/" + address,\n`;
  codeSnippet += `);\n`;

  return (
    <MeshUtilsLayout>
      <Metatags title="ResolveScriptHash" />
      <CardSection
        title="Resolve Script Hash"
        description="This will return a script hash. For example, this is useful when you want to convert a script to a policy ID."
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
