import * as React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useAuth0 } from "../lib/auth0-spa";
//Components
import Navbar from "../components/common/navbar";

interface Props {}

const Page: NextPage<Props> = () => {
  const { user } = useAuth0();

  return (
    <div className="container">
      <h1>Frugal Toolbelt Application</h1>
    </div>
  );
};

export default Page;
