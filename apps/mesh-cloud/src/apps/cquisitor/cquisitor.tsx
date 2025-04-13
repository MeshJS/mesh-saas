import CardSection from "@/components/card-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CquisitorLayout from "./layout";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import Metatags from "@/components/site/metatags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Budget, type Action, type RedeemerTagType } from "@meshsdk/core";
import { csl } from "@meshsdk/core-csl";

import { getProvider } from "@/lib/provider";
import { SelectNetwork, SelectService } from "./select";
import { CquisitorCommand } from "./command";

import { Textarea } from "@/components/ui/textarea";
import { decode, DecodeType } from "./utils";

export default function DevTransaction() {
  const [cborHex, setCborHex] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [network, setNetwork] = useState("mainnet");
  const [service, setService] = useState<"blockfrost" | "maestro">(
    "blockfrost",
  );
  const [decodeType, setDecodeType] = useState<DecodeType>("decode-by-csl");
  const [currentType, setCurrentType] = useState("Transaction");
  const [currentData, setCurrentData] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const decoded = decode(cborHex, decodeType, currentType);
    setCurrentData(decoded);
  }, [currentType, cborHex]);

  return (
    <CquisitorLayout>
      <Metatags title="Cquisitor" />
      <div className="flex flex-row gap-4">
        <SelectNetwork setValue={setNetwork} />
        <SelectService setValue={setService} />
        <div className="grid w-[300px] gap-3">
          <Input
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            disabled={loading}
            type="password"
            placeholder="API Key"
          />
        </div>
      </div>
      <>
        <CardSection
          title="Investigate CBOR"
          description="Paste your CBOR hex here to decode."
        >
          <>
            <div className="grid gap-3">
              <div className="grid w-full gap-2">
                <Textarea
                  placeholder="Type your message here."
                  onChange={(e) => setCborHex(e.target.value)}
                />
              </div>
            </div>
            <CquisitorCommand
              currentType={currentType}
              setCurrentType={setCurrentType}
            />
          </>
        </CardSection>
      </>
      <>
        <Card className="p-4">
          <div className="w-full whitespace-pre-wrap break-all">
            {currentData}
            {/* {
              "84a600d90102828258201e126e978ffbc3cd396fb2b69ce3368abb353443292e0ae56f6acf6f3c97022800825820e0b92c29cad3b1c8c8c192eae238f8f21748673b6ce296ec8c2fd7f1935bb3e902018182583900d161d64eef0eeb59f9124f520f8c8f3b717ed04198d54c8b17e604aea63c153fb3ea8a4ea4f165574ea91173756de0bf30222ca0e95a649a1a06b9f40a021a0002d5610b58202f299a81829e6e429ddd3930c838653dcc966735a6e4ad0e3b07bd17059c6d120dd9010281825820e0b92c29cad3b1c8c8c192eae238f8f21748673b6ce296ec8c2fd7f1935bb3e9050ed9010281581cd161d64eef0eeb59f9124f520f8c8f3b717ed04198d54c8b17e604aea206d901028159011659011301010032323232323225980099191919192cc004cdc3a400460106ea80062646464b30013370e900018059baa005899192cc004c04400a2b30013370e900018069baa003899192cc004cdc79bae30023010375401291010d48656c6c6f2c20576f726c6421008800c528201c332232330010010032259800800c52844c96600266e3cdd7180b0010024528c4cc00c00c005012180b000a0283758602260246024602460246024602460246024601e6ea8028dd7180098079baa3011300f37540084602200316403116403c6eb8c03c004c030dd5002c5900a18069807001180600098049baa0018b200e300a300b00230090013009002300700130043754003149a26cac80115cd2ab9d5573caae7d5d0aba2105a182000082d8799f4d48656c6c6f2c20576f726c6421ff820000f5f6"
            } */}
          </div>
        </Card>
      </>
    </CquisitorLayout>
  );
}
