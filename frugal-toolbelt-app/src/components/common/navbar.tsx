import React from "react";
import Link from "next/link";
import { useFirebase } from "../../lib/firebase/firebase-provider";
import { toast } from "react-toastify";

const Navbar: React.FunctionComponent = () => {
  const { loading, currentUser, logoutAsync } = useFirebase();

  const handleLogout = async (): Promise<void> => {
    logoutAsync();
    toast.success("Logout succesfull");
  };

  return (
    <div className="container">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item">
              <img src="/logo.png" />
            </a>
          </Link>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbar" className="navbar-menu">
          <div className="navbar-start">
            <Link href="/">
              <a className="navbar-item">Home</a>
            </Link>

            <a className="navbar-item">About</a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">Tools</a>

              <div className="navbar-dropdown">
                <Link href="/cards">
                  <a className="navbar-item">Credit Cards</a>
                </Link>
                <hr className="navbar-divider" />
                <Link href="/budget">
                  <a className="navbar-item">Budget</a>
                </Link>
                <a className="navbar-item">Stock Market</a>
                <a className="navbar-item">Calculators</a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {!loading && !currentUser && (
                <div className="buttons">
                  <Link href="/register">
                    <a className="button is-primary">Register</a>
                  </Link>
                  <Link href="/login">
                    <a className="button is-primary">Log in</a>
                  </Link>
                </div>
              )}
              {!loading && currentUser && (
                <div>
                  {currentUser && (
                    <span>Welcome {currentUser.displayName}</span>
                  )}

                  <div className="buttons">
                    <button className="button is-danger" onClick={handleLogout}>
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
