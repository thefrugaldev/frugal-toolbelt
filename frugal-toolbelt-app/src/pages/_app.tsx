import * as React from "react";
import App from "next/app";
import Head from "next/head";
import { ApolloProvider } from "react-apollo";
import Navbar from "../components/common/navbar";
import graphqlClient from "../api/graphql-client";
import { ToastContainer } from "react-toastify";
//Styles
import "../styles/bulma-override.scss";
import "react-toastify/dist/ReactToastify.css";
import "flatpickr/dist/flatpickr.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FirebaseProvider } from "../lib/firebase/firebase-provider";

export default class FrugalToolbeltApp extends App {
  render(): JSX.Element {
    const { Component, pageProps, router } = this.props;

    return (
      <ApolloProvider client={graphqlClient}>
        <Head>
          <title>Frugal Toolbelt Application</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <FirebaseProvider defaultMessage={""}>
          <section>
            <Navbar />
            <Component {...pageProps} router={router} />
            <ToastContainer autoClose={3000} hideProgressBar />
          </section>
        </FirebaseProvider>
      </ApolloProvider>
    );
  }
}
