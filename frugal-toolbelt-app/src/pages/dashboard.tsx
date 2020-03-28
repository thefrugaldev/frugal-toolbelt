import * as React from "react";
import { NextPage } from "next";
import { requireUser, useAuth0 } from "../lib/auth0-spa";
import Link from "next/link";
import NavBar from "../components/NavBar";

interface Props {}

const DashboardPage: NextPage<Props> = () => {
  const { user } = useAuth0();

  return (
    <div>
      {user && (
        <div>
          {user.nickname}{" "}
          <Link href="/">
            <a>Home</a>
          </Link>
          <div>
            <img src={user.picture} alt={user.nickname} />
          </div>
        </div>
      )}
      Secured Dashboard
      <NavBar />
    </div>
  );
};

export default requireUser(DashboardPage);
