import React from "react";
import { requireUser } from "../../lib/auth0-spa";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

interface Props {}

const GET_CARDS = gql`
  query getCards {
    cards {
      _id
      vendor
      bank
      name
    }
  }
`;

const Cards: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(GET_CARDS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error! {error.message}</h1>;

  const { cards } = data;

  return (
    <div className="container">
      <h1>Your current credit cards</h1>
      <div className="columns">
        {cards.map(card => (
          <div className="column" key={card._id}>
            <p className="card">
              <h2>{card.vendor}</h2>
              <h2>
                {card.bank}: {card.name}
              </h2>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default requireUser(Cards);
