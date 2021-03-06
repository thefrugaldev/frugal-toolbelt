import React from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useFirebase } from "../lib/firebase/firebase-provider";
import AuthForm from "../components/common/forms/auth-form";

const Login: React.FC = () => {
  const router = useRouter();
  const { loginAsync } = useFirebase();

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ): void => {
    event.preventDefault();

    loginAsync(email, password)
      .then((userCredential) => {
        toast.success("Login successful");
        if (!userCredential.user.emailVerified) {
          router.push("/profile");
        }
        router.push("/");
      })
      .catch(() => {
        toast.error(
          "Login failed. Please ensure Email and Password are correct."
        );
      });
  };

  return (
    <div className="container">
      <AuthForm title="Login" onSubmit={handleSubmit} />
    </div>
  );
};

export default Login;
