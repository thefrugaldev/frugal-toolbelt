import React, { useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useFirebase } from "../lib/firebase/firebase-provider";

const Login: React.FC = () => {
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();
  const router = useRouter();
  const { loginAsync } = useFirebase();

  const handleSubmit = (event): void => {
    event.preventDefault();

    if (email && password) {
      loginAsync(email.current.value, password.current.value)
        .then(() => {
          toast.success("Login successful");
          router.push("/");
        })
        .catch((error) => {
          toast.error("Login failed");
          console.error(error);
        });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
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

export default Login;
