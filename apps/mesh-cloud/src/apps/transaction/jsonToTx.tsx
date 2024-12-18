import CardSection from "@/components/card-section";
import Metatags from "@/components/site/metatags";
import Codeblock from "@/components/text/codeblock";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useValidateStaking } from "@/hooks/useValidateStaking";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TransactionLayout from "./layout";
import { SelectNetwork } from "@/apps/dev/transaction";

import noScriptTxInJson_preprod from "@/data/sampleJSONs/preprod/all_money_goes_back_to_change_address_preprod.json";
import noScriptTxInJson2_preprod from "@/data/sampleJSONs/preprod/send_with_output_to_specific_address_preprod.json";
import scriptTxInJson_preprod from "@/data/sampleJSONs/preprod/tx_spend_a_script_input_preprod.json";
import scriptMintJson_preprod from "@/data/sampleJSONs/preprod/minting_plutus_asset_preprod.json";
import scriptMintJson_no_collateral_preprod from "@/data/sampleJSONs/preprod/minting_plutus_asset_with_no_collateral_preprod.json";
import scriptTxInJson_no_collateral_preprod from "@/data/sampleJSONs/preprod/tx_spend_a_script_input_with_no_collateral_preprod.json";
import noscriptTxIn_and_scriptMintJson_mainnet from "@/data/sampleJSONs/mainnet/all_money_goes_back_to_change_address_mainnet.json";
// import scriptTxInJson_mainnet from "@/data/sampleJSONs/sampleJSONs/mainnet/tx_spend_a_script_input_mainnet.json";
// import scriptMintJson_mainnet from "@/data/sampleJSONs/sampleJSONs/mainnet/minting_plutus_asset_mainnet.json";
// import noscriptTxIn_and_scriptMintJson2_mainnet from "@/data/sampleJSONs/sampleJSONs/mainnet/send_with_output_to_specific_address_mainnet.json";
// import scriptMintJson_no_collateral_mainnet from "@/data/sampleJSONs/sampleJSONs/mainnet/minting_plutus_asset_with_no_collateral_mainnet.json";
// import scriptTxInJson_no_collateral_mainnet from "@/data/sampleJSONs/sampleJSONs/mainnet/tx_spend_a_script_input_with_no_collateral_mainnet.json";

const EXPRESS_BACKEND_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL!;

export function SelectJSON({
  setValue,
  network = "preprod",
  placeholder = "JSON with no ScriptTxIn and ScriptSource (Preprod)",
}: {
  setValue: Dispatch<SetStateAction<any>>;
  network: "mainnet" | "preprod" | "preview";
  placeholder?: string;
}) {
  return (
    <Select onValueChange={setValue}>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={
            placeholder
              ? placeholder
              : "JSON with no ScriptTxIn and ScriptSource (Preprod)"
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {network === "mainnet" && (
            <SelectItem
              value={JSON.stringify(noscriptTxIn_and_scriptMintJson_mainnet)}
            >
              JSON with no ScriptTxIn and ScriptSource
            </SelectItem>
          )}

          {network === "preprod" && (
            <>
              <SelectItem value={JSON.stringify(noScriptTxInJson_preprod)}>
                JSON with no ScriptTxIn and ScriptSource (Preprod)
              </SelectItem>
              <SelectItem value={JSON.stringify(noScriptTxInJson2_preprod)}>
                JSON with no ScriptTxIn and ScriptSource 2 (Preprod)
              </SelectItem>
              <SelectItem value={JSON.stringify(scriptTxInJson_preprod)}>
                JSON with ScriptTxIn and collaterals (Preprod)
              </SelectItem>
              <SelectItem value={JSON.stringify(scriptMintJson_preprod)}>
                JSON with ScriptMint and collaterals (Preprod)
              </SelectItem>
              <SelectItem
                value={JSON.stringify(scriptMintJson_no_collateral_preprod)}
              >
                JSON with ScriptMint and collaterals 2 (Preprod) (Error Example)
              </SelectItem>
              <SelectItem
                value={JSON.stringify(scriptTxInJson_no_collateral_preprod)}
              >
                JSON with ScriptTxIn but without collateral (Preprod) (Error
                Example)
              </SelectItem>
            </>
          )}

          {network === "preview" && (
            <>
              <SelectItem
                value={JSON.stringify({
                  error: "No JSON available for Preview",
                })}
              >
                No JSON available for Preview
              </SelectItem>
            </>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function JsonToTx() {
  const { isStaked, isDRepDelegated } = useValidateStaking();

  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState<"mainnet" | "preprod" | "preview">(
    "preprod",
  );
  const [jsonSelectPlaceholder, setJsonSelectPlaceholder] = useState(
    "JSON with no ScriptTxIn and ScriptSource (Preprod)",
  );
  const [input, setInput] = useState(JSON.stringify(noScriptTxInJson_preprod));

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    switch (network) {
      case "mainnet":
        setInput(JSON.stringify(noscriptTxIn_and_scriptMintJson_mainnet));
        setJsonSelectPlaceholder(
          "JSON with no ScriptTxIn and ScriptSource (Mainnet)",
        );
        break;
      case "preprod":
        setInput(JSON.stringify(noScriptTxInJson_preprod));
        setJsonSelectPlaceholder(
          "JSON with no ScriptTxIn and ScriptSource (Preprod)",
        );
        break;
      case "preview":
        setInput(
          JSON.stringify({
            error: "No JSON available for Preview",
          }),
        );
        setJsonSelectPlaceholder("No JSON available for Preview");
        break;
    }
  }, [network]);

  const runAPI = async () => {
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await axios.post(`${EXPRESS_BACKEND_URL}users/jsontoTx`, {
        ...JSON.parse(input),
      });
      const data = res.data;
      setSuccess(data.unsignedTx);
    } catch (error) {
      setError(`Error calling API.`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  let codeSnippet = "";
  codeSnippet+=`const res = await axios.post("${EXPRESS_BACKEND_URL}users/jsontoTx", {\n`;
  codeSnippet+=`  ...meshTxBody,\n`;
  codeSnippet+=`});\n`;

  return (
    <TransactionLayout>
      <Metatags title="JSON to Tx" />
      <CardSection
        title="JSON to Transaction"
        description="Coverts JSON body to unsigned Transaction"
        footer={
          <div className="flex gap-2">
            <Button onClick={() => runAPI()} disabled={loading}>
              Run API
            </Button>

            <Button onClick={() => runAPI()} disabled={!isStaked}>
              Run API (auth Test: stake)
            </Button>

            <Button onClick={() => runAPI()} disabled={!isDRepDelegated}>
              Run API (auth Test: drep)
            </Button>

            <Button
              onClick={() => runAPI()}
              disabled={!isStaked || !isDRepDelegated}
            >
              Run API (auth Test: both)
            </Button>
          </div>
        }
      >
        <div className="grid gap-3">
          <Label htmlFor="input">API Input</Label>
          <SelectNetwork setValue={setNetwork} placeholder="Preprod" />
          <SelectJSON
            setValue={setInput}
            network={network}
            placeholder={jsonSelectPlaceholder}
          />

          <Codeblock data={JSON.parse(input)} isJson language="javascript" />

          <Codeblock data={codeSnippet} language="javascript" />

          {/* <Textarea
            id="input"
            className="min-h-[240px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          /> */}
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
          <Alert>
            <AlertTitle>API Response</AlertTitle>
            <AlertDescription className="break-all">
              <code>{"UnsignedTx: " + success}</code>
            </AlertDescription>
          </Alert>
        )}
      </CardSection>
    </TransactionLayout>
  );
}
