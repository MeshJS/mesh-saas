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

export default function DeserializeDatum() {
  const { isStaked, isDRepDelegated } = useValidateStaking();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const cbor =
    "167a4a048d87fcee0425ed200615ff2356f472c6413472c6106b8c5da52e3fd0";

  const runDemo = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${EXPRESS_BACKEND_URL}users/meshUtilities/deserializers/deserializeDatum/${cbor}`,
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
  codeSnippet += `const res = await axios.get(\n`;
  codeSnippet += `  "${EXPRESS_BACKEND_URL}users/meshUtilities/deserializers/deserializeDatum/${cbor}",\n`;
  codeSnippet += `);\n`;

  return (
    <MeshUtilsLayout>
      <Metatags title="DeserializeDatum" />
      <CardSection
        title="Deserialize Datum"
        description="Deserialize a datum from a CBOR string to JSON object."
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
