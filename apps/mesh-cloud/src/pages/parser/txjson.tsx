import CardSection from "@/components/card-section";
import LayoutParser from "./layout";
import Metatags from "@/components/site/metatags";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Code from "@/components/code";
import { useEffect, useState } from "react";
import { csl } from "@meshsdk/core-csl";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function checkType(value: any) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  if (typeof value === "object") return "object";
  return typeof value;
}

export default function ParserTxjson() {
  const [txCbor, setTxCbor] = useState<string>("");
  const [txjson, setTxjson] = useState<
    undefined | { body: any; witness_set: any }
  >(undefined);
  const [txCborError, setTxCborError] = useState<undefined | string>("");

  const exampleTxCbor1 =
    "84a3008282582052eb66ac4ad48d1d6363f0b21b7a3e0fe0f140c3a7f551a7bae3baa25958924a0182582075f24f6c1e284fa9a00590a873d0dcdac195cb3cabb0b40d1cf3a1ab26ac654b01018282581d605867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f1a001e8480825839005867c3b8e27840f556ac268b781578b14c5661fc63ee720dbeab663f9d4dcd7e454d2434164f4efb8edeb358d86a1dad9ec6224cfcbce3e61a00d478d1021a000291d5a0f5f6";
  const exampleTxCbor2 =
    "84a400818258202cb57168ee66b68bd04a0d595060b546edf30c04ae1031b883c9ac797967dd8503018283581d60f95cab9352c14782a366802b7967746a89356e8915c17006149ff68c1a001e84805820923918e403bf43c34b4ef6b48eb2ee04babed17320d8d1b9ff9ad086e86f44ec82581d60f95cab9352c14782a366802b7967746a89356e8915c17006149ff68c1b000000024d74dc6e021a000294690b582015dd0a3ac1244430aacc7e95c2734b51f1a8cf2aaf05e5d6e8124cb78ab54cc9a1049fd87980fff5f6";

  useEffect(() => {
    if (txCbor.length > 0) {
      setTxjson(undefined);
      setTxCborError(undefined);
      try {
        const json = csl.Transaction.from_hex(txCbor).to_json();
        setTxjson(JSON.parse(json));
      } catch (e: string | any) {
        setTxCborError(e);
      }
    }
  }, [txCbor]);

  return (
    <LayoutParser>
      <Metatags title="Transaction Parser" />
      <>
        <CardSection title="Input" description="Input transaction CBOR">
          <>
            <Textarea
              value={txCbor}
              onChange={(e) => setTxCbor(e.target.value)}
            />
            {txCborError && <p>{txCborError}</p>}

            <div className="flex flex-row gap-2">
              <Button onClick={() => setTxCbor(exampleTxCbor1)}>
                Example TX 1
              </Button>
              <Button onClick={() => setTxCbor(exampleTxCbor2)}>
                Example TX 2
              </Button>
            </div>
          </>
        </CardSection>

        {txjson && (
          <>
            <CardSection
              title="Transaction Body"
              description="Transaction Body"
            >
              <ParseTxJsonChild childData={txjson.body} />
            </CardSection>

            <CardSection title="Witness Set" description="Witness Set">
              <ParseTxJsonChild childData={txjson.witness_set} />
            </CardSection>
          </>
        )}
      </>
    </LayoutParser>
  );
}

function ParseTxJsonChild({ childData }: { childData: any }) {
  return (
    <Table>
      <TableBody>
        {Object.keys(childData).map((item, i) => {
          // @@ts-expect-error
          const data = childData[item];
          const type = checkType(data);

          return (
            <TableRow key={i}>
              <TableCell width={100}>
                {item} {type == "array" && `(${data.length})`}
              </TableCell>
              <TableCell>
                <Child data={data} key={item} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function Child({ data }: { data: any }) {
  const type = checkType(data);

  if (type == "array") {
    return <IsList data={data} />;
  }

  return <IsObject data={data} />;
}

function IsList({ data }: { data: any[] }) {
  return (
    <>
      {data.map((item, i) => {
        return (
          <div key={i} className="my-1">
            <IsObject data={item} />
          </div>
        );
      })}
    </>
  );
}

function IsObject({ data }: { data: any }) {
  return (
    <div className="max-w-full">
      <Code>{JSON.stringify(data, null, 2)}</Code>
    </div>
  );
}
