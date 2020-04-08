import gql from "graphql-tag";

export const CREATE_LINE_ITEM = gql`
  mutation CreateLineItem($lineItem: CreateLineItemInput!) {
    createLineItem(lineItem: $lineItem) {
      title
    }
  }
`;
