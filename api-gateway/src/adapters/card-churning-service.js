import axios from "axios";

const CARD_CHURNING_SERVICE_URI = "http://card-churning-service:8080";

export default class CardChurningService {
  static async fetchAllCards() {
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
}
