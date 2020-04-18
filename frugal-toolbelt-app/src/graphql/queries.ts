import gql from "graphql-tag";

export const GET_LINE_ITEMS = gql`
  query GetLineItems {
    lineItems {
      _id
      title
      description
      isSavings
      amount
      date
      category {
        _id
        name
        icon
        isActive
      }
    }
  }
`;

export const GET_LINE_ITEM = gql`
  query GetLineItem($id: ID!) {
    lineItem(id: $id) {
      _id
      title
      category {
        _id
        name
      }
      description
      amount
      isSavings
      date
    }
  }
`;

export const GET_LINE_ITEMS_BY_DATE = gql`
  query GetLineItemsByDate($month: Int, $year: Int) {
    filterLineItemsByDate(month: $month, year: $year) {
      _id
      title
      description
      isSavings
      amount
      date
      category {
        _id
        name
        icon
        isActive
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      _id
      name
      icon
      isActive
    }
  }
`;
