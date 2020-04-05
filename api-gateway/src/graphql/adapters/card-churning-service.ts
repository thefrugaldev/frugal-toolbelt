import axios from "axios";
import ICard from "../interfaces/ICard";

const CARD_CHURNING_SERVICE_URI = "http://card-churning-service:8080";

export default class CardChurningService {
  static async fetchAllCardsAsync() {
    const body = await axios
      .get(`${CARD_CHURNING_SERVICE_URI}/cards`)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        // tslint:disable-next-line:no-console
        console.error(
          `🚸 🚨 🚸 🚨 🚸 🚨 🚸 🚨 → Error fetching cards: ${error}`
        );
      });
    return body;
  }

  static async fetchCardByIdAsync(id: string) {
    const body = await axios
      .get(`${CARD_CHURNING_SERVICE_URI}/cards/${id}`)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        // tslint:disable-next-line:no-console
        console.error(
          `🚸 🚨 🚸 🚨 🚸 🚨 🚸 🚨 → Error fetching card ${id}: ${error}`
        );
      });

    return body;
  }

  static async createCardAsync(card: ICard) {
    const body = await axios
      .post(`${CARD_CHURNING_SERVICE_URI}/cards`, card)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        // tslint:disable-next-line:no-console
        console.error(
          `🚸 🚨 🚸 🚨 🚸 🚨 🚸 🚨 → Error creating cards: ${error}`
        );
      });

    return body;
  }
}
