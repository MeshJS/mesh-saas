import CardSection from "@/components/card-section";
import CquisitorLayout from "./layout";
import { useEffect, useState } from "react";
import Metatags from "@/components/site/metatags";
import { Card } from "@/components/ui/card";

import { JsonViewer } from "@textea/json-viewer";
import { TopBar } from "./top-bar";
import { CquisitorCommand } from "./command";

import { Textarea } from "@/components/ui/textarea";
import {
  decode,
  getPositionDataType,
  getTxAddressDataType,
  getTxIdDataType,
  nonCSLDecodeOption,
  type DecodeType,
} from "./utils";
import * as cq from "@cardananium/cquisitor-lib";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Cquisitor() {
  const [apiKey, setApiKey] = useState("");
  const [network, setNetwork] = useState("mainnet");
  const [service, setService] = useState<"blockfrost" | "maestro">(
    "blockfrost",
  );
  const [loading, setLoading] = useState(false);

  const [cborHex, setCborHex] = useState("");
  const [decodeType, setDecodeType] = useState<DecodeType>("decode-by-csl");
  const [currentType, setCurrentType] = useState("Transaction");
  const [currentData, setCurrentData] = useState("");

  // display
  const [cborPosition, setCborPosition] = useState([0, 0]);
  const [possibleTypes, setPossibleTypes] = useState<string[]>([]);

  const setItem = (item: string) => {
    setCurrentType(item);
    if (nonCSLDecodeOption[item]) {
      setDecodeType(nonCSLDecodeOption[item]);
    } else {
      setDecodeType("decode-by-csl");
    }
  };

  useEffect(() => {
    const decoded = decode(cborHex, decodeType, currentType);
    setCurrentData(decoded);
    const possibleTypes = cq.get_possible_types_for_input(cborHex);
    setPossibleTypes(possibleTypes);
    console.log("possibleTypes", possibleTypes);
  }, [currentType, cborHex, decodeType]);

  let showAsJson = true;
  if (
    typeof currentData === "string" ||
    (currentData as any) instanceof String
  ) {
    console.log(currentData);
    showAsJson = false;
  }

  useEffect(() => {
    const apiKey = localStorage.getItem("apiKey");
    if (apiKey) setApiKey(apiKey);
    const network = localStorage.getItem("network");
    if (network) setNetwork(network);
  }, []);

  return (
    <CquisitorLayout>
      <Metatags title="Cquisitor" />
      <TopBar
        network={network}
        setNetwork={setNetwork}
        setService={setService}
        apiKey={apiKey}
        setApiKey={setApiKey}
        loading={loading}
      />
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

            {possibleTypes && possibleTypes.length > 0 && (
              <>
                <Label>Possible types to decode:</Label>
                <div className="block gap-2">
                  {possibleTypes.map((type, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="mb-2 mr-2 inline-block rounded px-4 py-2 text-white"
                      onClick={() => setItem(type)}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </>
            )}
            <CquisitorCommand currentType={currentType} setItem={setItem} />
          </>
        </CardSection>
      </>
      <>
        <Card className="p-4">
          <div className="w-full whitespace-pre-wrap break-all">
            {showAsJson ? (
              <JsonViewer
                sx={{ fontSize: 14 }}
                value={currentData}
                theme="dark"
                valueTypes={[
                  getPositionDataType(setCborPosition),
                  getTxIdDataType(network),
                  getTxAddressDataType(network),
                ]}
              />
            ) : (
              currentData
            )}
            {/* {
              "84a600d90102828258201e126e978ffbc3cd396fb2b69ce3368abb353443292e0ae56f6acf6f3c97022800825820e0b92c29cad3b1c8c8c192eae238f8f21748673b6ce296ec8c2fd7f1935bb3e902018182583900d161d64eef0eeb59f9124f520f8c8f3b717ed04198d54c8b17e604aea63c153fb3ea8a4ea4f165574ea91173756de0bf30222ca0e95a649a1a06b9f40a021a0002d5610b58202f299a81829e6e429ddd3930c838653dcc966735a6e4ad0e3b07bd17059c6d120dd9010281825820e0b92c29cad3b1c8c8c192eae238f8f21748673b6ce296ec8c2fd7f1935bb3e9050ed9010281581cd161d64eef0eeb59f9124f520f8c8f3b717ed04198d54c8b17e604aea206d901028159011659011301010032323232323225980099191919192cc004cdc3a400460106ea80062646464b30013370e900018059baa005899192cc004c04400a2b30013370e900018069baa003899192cc004cdc79bae30023010375401291010d48656c6c6f2c20576f726c6421008800c528201c332232330010010032259800800c52844c96600266e3cdd7180b0010024528c4cc00c00c005012180b000a0283758602260246024602460246024602460246024601e6ea8028dd7180098079baa3011300f37540084602200316403116403c6eb8c03c004c030dd5002c5900a18069807001180600098049baa0018b200e300a300b00230090013009002300700130043754003149a26cac80115cd2ab9d5573caae7d5d0aba2105a182000082d8799f4d48656c6c6f2c20576f726c6421ff820000f5f6"
            } */}
          </div>
        </Card>
      </>
    </CquisitorLayout>
  );
}
