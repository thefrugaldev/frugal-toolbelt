import React from "react";
import { useAuth0 } from "../lib/auth0-spa";
import Link from "next/link";

interface Props {}

const Navbar: React.FunctionComponent<Props> = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    loading,
    user
  } = useAuth0();

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
                <a className="navbar-item">Budget</a>
                <a className="navbar-item">Stock Market</a>
                <a className="navbar-item">Calculators</a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {!loading && !isAuthenticated && (
                <div className="buttons">
                  <button
                    className="button is-primary"
                    onClick={() => loginWithRedirect({})}
                  >
                    <strong>Sign up</strong>
                  </button>
                  <button
                    className="button is-light"
                    onClick={() => loginWithRedirect({})}
                  >
                    Log in
                  </button>
                </div>
              )}
              {!loading && isAuthenticated && (
                <div>
                  {user && <span>Welcome {user.nickname}</span>}

                  <div className="buttons">
                    <button
                      className="button is-danger"
                      onClick={() => logout()}
                    >
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
