import gql from "graphql-tag";

export const CREATE_LINE_ITEM = gql`
  mutation CreateLineItem(
    $title: String!
    $description: String!
    $isSavings: Boolean
    $amount: Int!
  ) {
    createLineItem(
      title: $title
      description: $description
      isSavings: $isSavings
      amount: $amount
    ) {
      title
    }
  }
`;
