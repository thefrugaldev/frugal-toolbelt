import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useFirebase } from "../lib/firebase/firebase-provider";
import { useRouter } from "next/router";
import AuthForm from "../components/common/forms/auth-form";

const Register: React.FC = () => {
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const router = useRouter();
  const { registerAsync } = useFirebase();

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ): void => {
    event.preventDefault();

    registerAsync(email, password)
      .then(() => {
        toast.success("Registration successful");
        router.push("/");
      })
      .catch((error) => {
        toast.error(
          "Registration failed. Please ensure the email address is correctly formatted and provide a password with at least 6 characters."
        );
        console.error(error);
      });
  };

  return (
    <div className="container">
      <AuthForm title="Register" onSubmit={handleSubmit} />
    </div>
  );
};

export default Register;
