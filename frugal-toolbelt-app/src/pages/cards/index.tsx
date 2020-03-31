import React from "react";
import { requireUser } from "../../lib/auth0-spa";

interface Props {}

const Cards: React.FC<Props> = () => {
  return (
    <div className="container">
      <h1>Your current credit cards</h1>
    </div>
  );
};

export default requireUser(Cards);
