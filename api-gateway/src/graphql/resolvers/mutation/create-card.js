import CardChurningService from "#root/adapters/card-churning-service";

const createCardResolver = async (obj, { vendor, bank, name }) => {
  return await CardChurningService.createCardAsync({ vendor, bank, name });
};

export default createCardResolver;
