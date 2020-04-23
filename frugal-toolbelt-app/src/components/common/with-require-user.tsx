import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useFirebase } from "../../lib/firebase/firebase-provider";
import { toast } from "react-toastify";

const withRequireUser = (page: NextPage): React.FC<any> => {
  return (props: any): React.ReactElement<any, any> => {
    const router = useRouter();
    const { loading, isAuthenticated } = useFirebase();

    React.useEffect(() => {
      if (loading || isAuthenticated) return;

      const fn = async (): Promise<void> => {
        // await loginWithRedirect({appState: {targetUrl: router.asPath}})

        toast.warn("Please login to access this page");
        router.push("/");
      };

      fn();
    }, [loading, isAuthenticated, router.pathname]);

    if (loading || !isAuthenticated) return null;

    return React.createElement(page, props, { displayName: "withRequireUser" });
  };
};

export default withRequireUser;
