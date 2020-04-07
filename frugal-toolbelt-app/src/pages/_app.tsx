import * as React from "react";
import App from "next/app";
import Head from "next/head";
import { ApolloProvider } from "react-apollo";
import { Auth0Provider } from "../lib/auth0-spa";
import Navbar from "../components/common/navbar";
import graphqlClient from "../api/graphql-client";
import { ToastContainer } from "react-toastify";
//Styles
import "bulma/css/bulma.css";
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import "react-toastify/dist/ReactToastify.css";

export default class FrugalToolbeltApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    const onRedirectCallback = appState => {
      window.location =
        appState && appState.targetUrl ? appState.targetUrl : "/";
    };

    return (
      <ApolloProvider client={graphqlClient}>
        <Head>
          <title>Frugal Toolbelt Application</title>
        </Head>
        <Auth0Provider
          domain={process.env.AUTH0_DOMAIN}
          clientId={process.env.AUTH0_CLIENT_ID}
          redirectUri={"http://localhost:3000/callback"}
          onRedirectCallback={onRedirectCallback}
        >
          <section>
            <Navbar />
            <Component {...pageProps} router={router} />
            <ToastContainer autoClose={3000} hideProgressBar />
          </section>
        </Auth0Provider>
      </ApolloProvider>
    );
  }
}
