import React, { useRef } from "react";

interface AuthFormProps {
  title: string;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit }) => {
  const email = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();

  return (
    <form
      onSubmit={(e): void =>
        onSubmit(e, email.current.value, password.current.value)
      }
    >
      <h1>{title}</h1>
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
  );
};

export default AuthForm;
