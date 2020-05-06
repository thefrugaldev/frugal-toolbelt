import axios, { AxiosInstance } from "axios";

let tradierClient: AxiosInstance;

const initialize = () => {
  const { TRADIER_API_ENDPOINT, TRADIER_ACCESS_TOKEN } = process.env;
  tradierClient = axios.create({
    baseURL: TRADIER_API_ENDPOINT,
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${TRADIER_ACCESS_TOKEN}`,
      Accept: "application/json",
    },
  });
};

// // GET
const getQuotesAsync = async (symbols: string[]) => {
  const body = tradierClient
    .get(`/markets/quotes`, {
      params: {
        symbols: symbols.toString(),
      },
    })
    .then((res) => {
      //TODO need to check x-ratelimit-available header to ensure requests are not throttled
      return res.data;
    })
    .catch((error) => {
      // tslint:disable-next-line:no-console
      console.error(
        `🚸 🚨 🚸 🚨 🚸 🚨 🚸 🚨 → Error fetching quotes from Tradier API: `,
        error
      );
    });

  return body;
};

export { getQuotesAsync, initialize, tradierClient };
