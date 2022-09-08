import { createClient } from "urql";

/**
 * When working in development mode we get a cors issue on the github graphql endpoint
 * This code routes development requests via the proxy defined in the package.json
 */
const url = process.env.NODE_ENV === "development" ? "/graphql" : "https://api.github.com/graphql";
const token = process.env.REACT_APP_AUTH_TOKEN;

const client = createClient({
  url,
  fetchOptions: {
    headers: { authorization: token ? `Bearer ${token}` : "" },
  },
});

export { client };
