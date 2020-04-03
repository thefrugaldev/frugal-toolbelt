// TODO: do we need lodash for this?
import _ from "lodash";

const formatGraphQLErrors = (error: any) => {
  const errorDetails = _.get(error, "originalError.response.body");

  try {
    if (errorDetails) {
      return JSON.parse(errorDetails);
    }
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log(
      `🚸 🚨 🚸 🚨 🚸 🚨 🚸 🚨 → Could not parse graphql error details: ${e}`
    );
  }

  return error;
};

export default formatGraphQLErrors;
