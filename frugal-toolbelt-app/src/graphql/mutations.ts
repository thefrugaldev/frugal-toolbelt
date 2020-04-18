import gql from "graphql-tag";

export const UPSERT_LINE_ITEM = gql`
  mutation UpsertLineItem($lineItem: UpsertLineItemInput!) {
    upsertLineItem(lineItem: $lineItem) {
      title
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($category: CreateCategoryInput!) {
    createCategory(category: $category) {
      _id
      name
      icon
    }
  }
`;

export const DELETE_LINE_ITEM = gql`
  mutation DeleteLineItem($id: ID!) {
    deleteLineItem(id: $id)
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
