import React, { useState, useEffect } from "react";
import { auth } from "./index";
import fb from "firebase";

interface FirebaseProviderProps {
  children: React.ReactNode;
  defaultMessage: string;
}

interface FirebaseContextProps {
  isAuthenticated: boolean;
  currentUser: fb.User;
  loading: boolean;
  message: string;
  destroySession: () => void;
  setMessage: (message: string) => void;
  clearMessage: () => void;
  registerAsync: (
    email: string,
    password: string
  ) => Promise<fb.auth.UserCredential>;
  loginAsync: (
    email: string,
    password: string
  ) => Promise<fb.auth.UserCredential>;
  logoutAsync: () => void;
}

const FirebaseContext = React.createContext<FirebaseContextProps>(null);
export const useFirebase = (): FirebaseContextProps =>
  React.useContext(FirebaseContext);

const FirebaseProvider: React.FC<FirebaseProviderProps> = ({
  children,
  defaultMessage,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [currentUser, setCurrentUser] = useState<fb.User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user): void => {
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        setLoading(false);
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    });
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        loading,
        message,
        destroySession: (): void => {
          setCurrentUser(null);
        },
        setMessage: (message: string): void => setMessage(message),
        clearMessage: (): void => setMessage(defaultMessage),
        registerAsync: async (
          email: string,
          password: string
        ): Promise<fb.auth.UserCredential> =>
          await auth.createUserWithEmailAndPassword(email, password),
        loginAsync: async (
          email: string,
          password: string
        ): Promise<fb.auth.UserCredential> =>
          await auth.signInWithEmailAndPassword(email, password),
        logoutAsync: async (): Promise<void> => await auth.signOut(),
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
