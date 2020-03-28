import * as React from "react";
import App from "next/app";
import Head from "next/head";
import { Auth0Provider } from "../lib/auth0-spa";

export default class FrugalToolbeltApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    const onRedirectCallback = appState => {
      console.log(`appState`, appState);

      window.location =
        appState && appState.targetUrl ? appState.targetUrl : "/";
    };

    return (
      <>
        <Head>
          <title>Frugal Toolbelt Application</title>
        </Head>
        <Auth0Provider
          domain={process.env.AUTH0_DOMAIN}
          clientId={process.env.AUTH0_CLIENT_ID}
          redirectUri={"http://localhost:3000/callback"}
          onRedirectCallback={onRedirectCallback}
        >
          <Component {...pageProps} router={router} />
        </Auth0Provider>
      </>
    );
  }
}
