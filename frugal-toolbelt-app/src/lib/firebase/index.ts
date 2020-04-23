import firebase from "firebase";
import config from "./config";

!firebase.apps.length && firebase.initializeApp(config);

const auth = firebase.auth();

export { auth };
