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
import { Dispatch, SetStateAction, useState } from "react";
import TransactionLayout from "./layout";
import noScriptTxInJson from "./sampleJSONs/all_money_goes_back_to_change_address.json";
import scriptTxInJson from "./sampleJSONs/tx_spend_a_script_input.json";
import scriptMintJson from "./sampleJSONs/minting_plutus_asset.json";
import noScriptTxInJson2 from "./sampleJSONs/send_with_output_to_specific_address.json";
import scriptMintJson_no_collateral from "./sampleJSONs/minting_plutus_asset_with_no_collateral.json";
import scriptTxInJson_no_collateral from "./sampleJSONs/tx_spend_a_script_input_with_no_collateral.json";

const EXPRESS_BACKEND_URL = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL!;

export function SelectJSON({
  setValue,
}: {
  setValue: Dispatch<SetStateAction<any>>;
}) {
  return (
    <Select onValueChange={setValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="JSON with no ScriptTxIn and ScriptSource" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={JSON.stringify(noScriptTxInJson)}>
            JSON with no ScriptTxIn and ScriptSource
          </SelectItem>
          <SelectItem value={JSON.stringify(noScriptTxInJson2)}>
            JSON with no ScriptTxIn and ScriptSource 2
          </SelectItem>
          <SelectItem value={JSON.stringify(scriptTxInJson)}>
            JSON with ScriptTxIn and collaterals
          </SelectItem>
          <SelectItem value={JSON.stringify(scriptMintJson)}>
            JSON with ScriptMint and collaterals
          </SelectItem>
          <SelectItem value={JSON.stringify(scriptMintJson_no_collateral)}>
            JSON with ScriptMint and collaterals 2 (Error Example)
          </SelectItem>
          <SelectItem value={JSON.stringify(scriptTxInJson_no_collateral)}>
            JSON with ScriptTxIn but without collateral (Error Example)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function JsonToTx() {
  const { isStaked, isDRepDelegated } = useValidateStaking();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(JSON.stringify(noScriptTxInJson));

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const runAPI = async () => {
    setLoading(true);
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
          <SelectJSON setValue={setInput} />

          <Codeblock data={JSON.parse(input)} isJson language="javascript" />
          {/* <Textarea
            id="input"
            className="min-h-[240px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          /> */}
        </div>
        {error && (
          <Alert>
            <AlertTitle>API Error</AlertTitle>
            <AlertDescription className="break-all">
              <code>{error}</code>
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert>
            <AlertTitle>API Result</AlertTitle>
            <AlertDescription className="break-all">
              <code>{"UnsignedTx: " + success}</code>
            </AlertDescription>
          </Alert>
        )}
      </CardSection>
    </TransactionLayout>
  );
}
