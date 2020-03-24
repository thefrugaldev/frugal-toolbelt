import CardChurningService from "#root/adapters/card-churning-service";

const cardsResolver = async () => {
  return await CardChurningService.fetchAllCardsAsync();
};

export default cardsResolver;
