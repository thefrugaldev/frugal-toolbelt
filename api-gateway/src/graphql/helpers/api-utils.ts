// TODO: do we need lodash for this?
import _ from "lodash";

export const formatGraphQLErrors = (error: any) => {
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

// TODO: Build Tests
export const buildQueryString = (filters: LineItemFilters): string => {
  if (!filters) return "";

  let queryString = "?";
  const filtersArray = Object.keys(filters);
  const firstItem = filtersArray[0];

  filtersArray.forEach((key) => {
    queryString =
      key === firstItem
        ? queryString.concat(`${key}=${filters[key]}`)
        : queryString.concat(`&${key}=${filters[key]}`);
  });

  return queryString;
};
