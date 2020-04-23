import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useFirebase } from "../lib/firebase/firebase-provider";
import { useRouter } from "next/router";

const Register: React.FC = () => {
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const router = useRouter();
  const { registerAsync } = useFirebase();

  const handleSubmit = (event): void => {
    event.preventDefault();

    registerAsync(email.current.value, password.current.value)
      .then(() => {
        toast.success("Registration successful");
        router.push("/");
      })
      .catch((error) => {
        toast.error("Registration failed");
        console.error(error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="control">
          <input
            name="name"
            type="email"
            ref={email}
            placeholder="Email"
            className="input is-primary"
          />
        </div>

        <div className="control">
          <input
            name="password"
            type="password"
            ref={password}
            placeholder="Password"
            autoComplete="none"
            className="input is-primary"
          />
        </div>

        <div className="control">
          <button type="submit" className="button is-link">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
