const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { default: axios } = require("axios");


async function startServer() {
  const app = express();
  const port = 3000;
  app.use(cors());
  app.use(bodyParser.json());
  

  const server = new ApolloServer({
    typeDefs: /* GraphQL */ `
      type users {
        name: String!
      }
    

      type Query {
        getUsers: [users]
        getUser(id: ID!): users
      }

      type Mutation {
        createUser(name: String!): users
      }
    `,
    resolvers: {
      Query: {
        getUsers: async () =>
          (await axios.get("http://localhost:8080/users")).data,

        getUser: async (parent, { id }) =>
          (await axios.get(`http://localhost:8080/users/${id}`)).data
    },

      Mutation: {
        createUser: async (parent, { name}) =>
          (await axios.post("http://localhost:8080/users", {
            name
          })).data
      }
    },


  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
