import { Kind } from "graphql/language";
import { GraphQLScalarType } from "graphql";
import { merge } from "lodash";
import { resolvers as lineItemResolvers } from "./line-item";
import { resolvers as categoryResolvers } from "./category";
import { resolvers as cardChurningResolvers } from "./card-churning";

const resolvers = {
  Date: new GraphQLScalarType({
    // TODO: Fix date property from nulling out
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return new Date(value); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};

export default merge(
  resolvers,
  lineItemResolvers,
  categoryResolvers,
  cardChurningResolvers
);
