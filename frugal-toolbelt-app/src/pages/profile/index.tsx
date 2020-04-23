import React, { useEffect } from "react";
import { useFirebase } from "../../lib/firebase/firebase-provider";
// Components
import Input from "../../components/common/forms/input";
import withRequireUser from "../../components/common/with-require-user";

const Profile: React.FC = () => {
  const { currentUser } = useFirebase();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const confirmDeletion = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    //modal popup to confirm deletion
  };

  return (
    <div className="container">
      <h1>Change Email: </h1>
      <Input
        name="email"
        type="text"
        onChange={(e) => console.log(e)}
        value="thisismytestemail.com"
      />
      <button onClick={confirmDeletion} className="button is-danger">
        Delete Account
      </button>
    </div>
  );
};

export default withRequireUser(Profile);
