import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import withRequireUser from "../../components/common/with-require-user";
import Spinner from "../../components/common/spinner";

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

const Cards: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CARDS);

  if (loading) return <Spinner />;
  if (error)
    return (
      <h1 className="title is-1 has-text-centered">
        Error loading credit cards
      </h1>
    );

  const { cards } = data;

  return (
    <div className="container">
      <h1>Your current credit cards</h1>
      <img src="https://creditcards.chase.com/K-Marketplace/images/cardart/freedom_unlimited_card.png" />
      <div className="columns">
        {cards.map((card) => (
          <div className="column" key={card._id}>
            <div className="card">
              <h2>{card.vendor}</h2>
              <h2>
                {card.bank}: {card.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withRequireUser(Cards);
