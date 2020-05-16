import admin from "../../lib/firebase-service";

export default interface ApolloContext {
  user: admin.auth.DecodedIdToken;
}
