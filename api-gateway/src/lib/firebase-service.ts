import * as admin from "firebase-admin";

export const initialize = () => {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
};

export default admin;
