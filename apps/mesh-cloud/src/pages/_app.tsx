import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import { api } from "@/utils/api";
import LayoutRoot from "@/components/layouts/root";

import "@/styles/globals.css";
import "@meshsdk/react/styles.css";
import Metatags from "@/components/site/metatags";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Metatags />
      <div className={GeistSans.className}>
        <MeshProvider>
          <LayoutRoot>
            <Component {...pageProps} />
          </LayoutRoot>
        </MeshProvider>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
