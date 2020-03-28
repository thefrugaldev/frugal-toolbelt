import CardChurningService from "#root/adapters/card-churning-service";

const cardsResolver = async (obj, { id }) => {
  return await CardChurningService.fetchCardByIdAsync(id);
};

export default cardsResolver;
