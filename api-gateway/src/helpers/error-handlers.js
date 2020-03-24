//TODO: do we need lodash for this?
import _ from "lodash";

const formatGraphQLErrors = error => {
  errorDetails = _.get(error, "originalError.response.body");

  try {
    if (errorDetails) return JSON.parse(errorDetails);
  } catch (e) {}

  return error;
};

export default formatGraphQLErrors;