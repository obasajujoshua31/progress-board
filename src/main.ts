import { ApolloServer } from "apollo-server";

import schema from "./schema.graphql";

import resolvers from "./resolvers";
import { environment } from "./environment";

async function startServer() {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    introspection: environment.apollo.introspection,
  });

  server
    .listen({ port: environment.port })
    .then(({ url }) => console.log(`Server ready at ${url}. `));

  // Hot Module Replacement
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.stop());
  }
}

startServer();
