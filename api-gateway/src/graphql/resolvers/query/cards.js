import CardChurningService from "#root/adapters/card-churning-service";

const cardsResolver = async () => {
  return await CardChurningService.fetchAllCards();
};

export default cardsResolver;
