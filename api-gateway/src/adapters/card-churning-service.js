import axios from "axios";

const CARD_CHURNING_SERVICE_URI = "http://card-churning-service:8080";

export default class CardChurningService {
  static async fetchAllCardsAsync() {
    const body = await axios
      .get(`${CARD_CHURNING_SERVICE_URI}/cards`)
      .then(res => {
        return res.data;
      })
      .catch(error => {
        console.error(error);
      });
    return body;
  }

  static async createCardAsync({ vendor, bank, name }) {
    const body = await axios
      .post(`${CARD_CHURNING_SERVICE_URI}/cards`, {
        vendor: vendor,
        bank: bank,
        name: name
      })
      .then(res => {
        return res.data;
      })
      .catch(error => {
        console.error(error);
      });

    return body;
  }
}
