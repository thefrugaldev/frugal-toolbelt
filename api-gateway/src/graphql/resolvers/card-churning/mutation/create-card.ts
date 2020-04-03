import CardChurningService from "../../../adapters/card-churning-service";
import ICard from "../../../interfaces/ICard";

const createCardResolver = async (obj: any, card: ICard) => {
  return await CardChurningService.createCardAsync(card);
};

export default createCardResolver;
