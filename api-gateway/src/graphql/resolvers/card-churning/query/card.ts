import CardChurningService from "../../../adapters/card-churning-service";
import ICard from "../../../interfaces/ICard";

const cardResolver = async (obj: any, card: ICard) => {
  return await CardChurningService.fetchCardByIdAsync(card.id);
};

export default cardResolver;
