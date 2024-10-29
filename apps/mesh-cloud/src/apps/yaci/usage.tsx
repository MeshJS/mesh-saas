import CardSection from "@/components/card-section";
import YaciLayout from "./layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import Code from "@/components/code";
import { YaciProvider } from "@meshsdk/core";
import Metatags from "@/components/site/metatags";
import { Button } from "@/components/ui/button";
import Codeblock from "@/components/text/codeblock";

export default function YaciUsage() {
  const [params, setParams] = useState("");

  let codeProvider = "";
  codeProvider += `import { YaciProvider } from "@meshsdk/core";\n`;
  codeProvider += `\n`;
  codeProvider += `const blockchainProvider = new YaciProvider('https://yaci-node.meshjs.dev/api/v1/');\n`;
  codeProvider += `const params = await blockchainProvider.fetchProtocolParameters();\n`;
  codeProvider += `console.log(params);`;

  let codeTransaction = "";
  codeTransaction += `import { YaciProvider, MeshTxBuilder } from "@meshsdk/core";\n`;
  codeTransaction += `\n`;
  codeTransaction += `const blockchainProvider = new YaciProvider('https://yaci-node.meshjs.dev/api/v1/');\n`;
  codeTransaction += `\n`;
  codeTransaction += `const txBuilder = new MeshTxBuilder({\n`;
  codeTransaction += `  fetcher: blockchainProvider,\n`;
  codeTransaction += `  evaluator: blockchainProvider,\n`;
  codeTransaction += `});\n`;
  codeTransaction += `\n`;
  codeTransaction += `const utxos = await wallet.getUtxos();\n`;
  codeTransaction += `const changeAddress = await wallet.getChangeAddress();\n`;
  codeTransaction += `\n`;
  codeTransaction += `const unsignedTx = await txBuilder\n`;
  codeTransaction += `  .txOut('addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr', [{ unit: "lovelace", quantity: '2000000' }])\n`;
  codeTransaction += `  .changeAddress(changeAddress)\n`;
  codeTransaction += `  .selectUtxosFrom(utxos)\n`;
  codeTransaction += `  .complete();\n`;
  codeTransaction += `\n`;
  codeTransaction += `const signedTx = await wallet.signTx(unsignedTx);\n`;
  codeTransaction += `const txHash = await blockchainProvider.submitTx(signedTx);\n`;

  useEffect(() => {
    async function getPP() {
      const blockchainProvider = new YaciProvider(
        "https://yaci-node.meshjs.dev/api/v1/",
      );
      const params = await blockchainProvider.fetchProtocolParameters();
      setParams(JSON.stringify(params, null, 2));
    }
    getPP();
  }, []);

  return (
    <YaciLayout>
      <Metatags title="Usage" />
      <>
        <CardSection title="Introduction" description="About Yaci devnet">
          <>
            <p>
              Yaci Devnet enhances development efficiency with integrated tools,
              allows for rapid iteration and experimentation, making it ideal
              for developers seeking flexible and seamless Cardano testing.
            </p>
          </>
        </CardSection>
        <CardSection
          title="Yaci Provider"
          description="Integrated data provider"
          footer={
            <Button asChild>
              <Link
                href="https://meshjs.dev/providers/yaci"
                target="_blank"
                rel="noreferrer"
              >
                Learn more
              </Link>
            </Button>
          }
        >
          <>
            <p>
              Yaci Provider is a data provider that allows users to interact
              with the Yaci devnet.
            </p>
            <p>Example:</p>
            <Code>{codeProvider}</Code>
            <p>Response:</p>
            <Code>{params}</Code>
          </>
        </CardSection>
        <CardSection title="API" description="API for Yaci devnet">
          <>
            <p>API that allows users to interact with the blockchain:</p>
            <Code>https://yaci-node.meshjs.dev/api/v1/</Code>
            <p>Example:</p>
            <Code>
              curl https://yaci-node.meshjs.dev/api/v1/epochs/latest/parameters
            </Code>
            <p>Response:</p>
            <Code>{params}</Code>
          </>
        </CardSection>
        <CardSection
          title="Transaction"
          description="Build transaction with Mesh and submit to Yaci"
        >
          <>
            <p>
              Build a transaction with Mesh and submit it to the Yaci devnet is
              simple, just follow the example below.
            </p>
            <p>
              In this example, we are building a transaction that sends 2 ADA to
              an address and then submits it to the Yaci devnet.
            </p>
            <p>Example:</p>
            <Codeblock data={codeTransaction} language="javascript" />
          </>
        </CardSection>
      </>
    </YaciLayout>
  );
}
