import * as React from "react";
import { NextPage } from "next";
import { useAuth0 } from "../lib/auth0-spa";
import NavBar from "../components/NavBar";

interface Props {}

const Page: NextPage<Props> = () => {
  const { user } = useAuth0();

  return (
    <div>
      <h1>Frugal Toolbelt Application</h1>

      <div>
        <p>{user && user.nickname}</p>
        <NavBar />
      </div>
    </div>
  );
};

export default Page;
