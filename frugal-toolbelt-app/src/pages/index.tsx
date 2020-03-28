import * as React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useAuth0 } from "../lib/auth0-spa";
import NavBar from "../components/NavBar";

interface Props {}

const Page: NextPage<Props> = () => {
  const { user } = useAuth0();

  return (
    <div>
      <h1>Frugal Toolbelt Application</h1>

      <div>
        {user && (
          <div>
            {user.nickname}{" "}
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </div>
        )}
        <NavBar />
      </div>
    </div>
  );
};

export default Page;
