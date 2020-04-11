import * as React from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import { useRouter } from "next/router";
import { NextPage } from "next";

const DEFAULT_REDIRECT_CALLBACK = (): void =>
  window.history.replaceState({}, document.title, window.location.pathname);

interface Auth0ProviderProps {
  children: React.ReactNode;
  onRedirectCallback: (any) => any;
  domain: string;
  clientId: string;
  redirectUri: string;
}

interface Auth0ContextProps {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  popupOpen: boolean;
  loginWithPopup: (any) => any;
  handleRedirectCallback: (any) => any;
  getIdTokenClaims: (any) => any;
  loginWithRedirect: (any) => any;
  getTokenSilently: (any) => any;
  getTokenWithPopup: (any) => any;
  logout: () => any;
}

export const Auth0Context = React.createContext<Auth0ContextProps>(null);
export const useAuth0 = (): Auth0ContextProps => React.useContext(Auth0Context);

export const Auth0Provider: React.FunctionComponent<Auth0ProviderProps> = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  domain,
  clientId,
  redirectUri,
}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>();
  const [user, setUser] = React.useState();
  const [auth0Client, setAuth0] = React.useState<Auth0Client>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [popupOpen, setPopupOpen] = React.useState<boolean>(false);

  React.useEffect((): void => {
    const initAuth0 = async (): Promise<void> => {
      const auth0FromHook = await createAuth0Client({
        domain,
        client_id: clientId, // eslint-disable-line
        redirect_uri: redirectUri, // eslint-disable-line
      });

      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };

    initAuth0();
  }, []);

  const loginWithPopup = async (params = {}): Promise<void> => {
    setPopupOpen(true);

    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.log(`👻 🛡️ 👻 🛡️ 👻 🛡️ → Error logging in with popup: ${error}`);
    } finally {
      setPopupOpen(false);
    }

    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async (): Promise<void> => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p): Promise<IdToken> =>
          auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p): Promise<void> =>
          auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p): Promise<any> =>
          auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p): Promise<string> =>
          auth0Client.getTokenWithPopup(...p),
        logout: (...p): void => auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};

//TODO: remove?
interface RequireUserProps {
  children: React.ReactNode;
}

//higher order component for secure pages that require an authenticated user
export const requireUser = (
  page: NextPage
): React.FunctionComponent<NextPage> => {
  return (props: any): React.ReactElement<any, any> => {
    const router = useRouter();
    const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

    React.useEffect(() => {
      if (loading || isAuthenticated) return;

      const fn = async (): Promise<void> => {
        await loginWithRedirect({
          appState: { targetUrl: router.asPath },
        });
      };
      fn();
    }, [loading, isAuthenticated, loginWithRedirect, router.pathname]);

    if (loading || !isAuthenticated) return null;

    return React.createElement(page, props, { displayName: "requireUser" });
  };
};
