import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  split,
} from '@apollo/client';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

// get the authentication token from local storage if it exists

const bearerString = async () => {
  const token = await AsyncStorage.getItem('@token');
  console.log(`Token is`, token);

  return `Bearer ${token ?? undefined}`;
};
// cross platform web socketing triage (tldr use node lib on server and web lib on browser)

const wsLink = new WebSocketLink({
  uri: 'wss://api.dogehouse.online/graphql',
  options: {
    reconnect: true,
    lazy: true,
    timeout: 3000,
    connectionParams: {
      authorization: async () => {
        const bearer = await bearerString();
        return bearer;
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: 'https://api.dogehouse.online/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  // return the headers to the context so httpLink can read them

  const bearer = await bearerString();
  return {
    headers: {
      ...headers,
      authorization: bearer,
    },
  };
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const { message, locations, path } of graphQLErrors) {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    }
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    if (networkError.message.includes('500')) {
      console.error('500 Yup');
      //   if (!location.href.includes('/login')) {
      //     store.dispatch({ type: AuthResourceReducerAction.AUTH_RESOURCE_RESET });
      //     location.replace(
      //       '/login?redirect_uri=' + encodeURIComponent(location.href)
      //     );
      //   }
    }
  }
});

export const client = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Room: {
        keyFields: ['name'],
      },
    },
  }),
});
