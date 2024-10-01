import CardSection from "@/components/card-section";
import YaciLayout from "./layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import Code from "@/components/code";
import { YaciProvider } from "@meshsdk/core";
import Metatags from "@/components/site/metatags";
import { Button } from "@/components/ui/button";

export default function YaciUsage() {
  const [params, setParams] = useState("");

  let codeProvider = "";
  codeProvider += `import { YaciProvider } from "@meshsdk/core";\n`;
  codeProvider += `\n`;
  codeProvider += `const blockchainProvider = new YaciProvider('https://yaci-node.meshjs.dev/api/v1/');\n`;
  codeProvider += `const params = await blockchainProvider.fetchProtocolParameters();\n`;
  codeProvider += `console.log(params);`;

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
      </>
    </YaciLayout>
  );
}
