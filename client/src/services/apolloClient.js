import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";


const local = "http://localhost:3004/graphql";
const staging = "https://workout-api-psi.vercel.app/graphql";

const uploadLink = createUploadLink({
  uri: staging,
  credentials: "include",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
  formData: true,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllCategories: {
            merge(existing = [], incoming) {
              if (existing.length === 0) {
                return incoming;
              }
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export default client;