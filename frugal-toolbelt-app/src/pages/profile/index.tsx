import React, { useEffect, useState } from "react";
import { useFirebase } from "../../lib/firebase/firebase-provider";
// Components
import Input from "../../components/common/forms/input";
import withRequireUser from "../../components/common/with-require-user";
import { toast } from "react-toastify";

const Profile: React.FC = () => {
  const { currentUser } = useFirebase();
  const [email, setEmail] = useState(currentUser.email);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    console.log(`currentUser was updated`);
  }, [currentUser]);

  const confirmUpdate = async (email: string): Promise<void> => {
    setIsUpdating(true);
    try {
      console.log(`Updating email`);
      await currentUser.updateEmail(email);
    } catch (e) {
      toast.error(`Could not update email address: ${e.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const confirmDeletion = (): void => {
    //modal popup to confirm deletion
  };

  return (
    <div className="container">
      <h1>Change Email: </h1>
      <div className="field has-addons">
        <div className="control">
          <Input
            name="email"
            type="text"
            onChange={(e): void => setEmail(e.currentTarget.value)}
            value={email}
          />
        </div>
        <div className="control">
          <button
            onClick={(): Promise<void> => confirmUpdate(currentUser.email)}
            className={`button is-info ${isUpdating && "is-loading"}`}
            disabled={email === currentUser.email ? true : null}
          >
            Update
          </button>
        </div>
      </div>
      <button onClick={confirmDeletion} className="button is-danger">
        Delete Account
      </button>
    </div>
  );
};

export default withRequireUser(Profile);
