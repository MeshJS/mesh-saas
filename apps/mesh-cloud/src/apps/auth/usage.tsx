import CardSection from "@/components/card-section";
import YaciLayout from "./layout";
import Link from "next/link";
import Code from "@/components/code";
import Metatags from "@/components/site/metatags";
import { Button } from "@/components/ui/button";
import { post } from "@/lib/axios";
import { CardanoWallet, useWallet } from "@meshsdk/react";

export default function AuthUsage() {
  const { wallet, connected } = useWallet();

  let codeProvider = "";
  codeProvider += "";

  async function loginDemo() {
    if (!connected) return;

    const userRewardAddress = (await wallet.getRewardAddresses())[0];
    console.log(userRewardAddress);
    const label = `I agree to the term and conditions of Mesh (${userRewardAddress})`;

    const resGetNonce = await post("/auth/nonce", {
      label: label,
    });
    console.log("resGetNonce", resGetNonce);

    const nonce = resGetNonce.data;
    console.log("nonce", nonce);
    const signature = await wallet.signData(nonce, userRewardAddress);
    console.log("signature", signature);

    const resVerifySign = await post("/auth/verify", {
      label: label,
      signature: signature,
    });
    console.log("resVerifySign", resVerifySign);

    // if (res.message == "Topup successful") {
    //   setDone(true);
    // }
    // setLoading(false);
  }

  return (
    <YaciLayout>
      <Metatags title="Usage" />
      <>
        <CardSection
          title="Introduction"
          description="Cryptographically sign-in with wallet is a secure way to authenticate users."
          footer={
            <Button asChild>
              <Link
                href="https://meshjs.dev/guides/prove-wallet-ownership"
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
              Prove the ownership of an account by signing a piece of data using
              a private key. Since a user's public address can be used as their
              identifier, we can build an authentication mechanism that is based
              on message signing. This mechanism is made possible because we are
              able to cryptographically prove the ownership of an account by
              signing a specific piece of data using the corresponding private
              key. If the data is correctly signed, then the backend will
              recognize it as coming from the owner of the public address.
            </p>
          </>
        </CardSection>
        <CardSection title="Demo" description="Try out to see how it works">
          <>
            <Code>{codeProvider}</Code>

            <CardanoWallet />
            <Button onClick={() => loginDemo()}>Demo Login</Button>
          </>
        </CardSection>
      </>
    </YaciLayout>
  );
}
