const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ApolloServer } = require("@apollo/server");
//const { startStandaloneServer } = require("@apollo/server/standalone");
const { expressMiddleware } = require("@apollo/server/express4");
const { default: axios } = require("axios");
//npm i const { get } = require("../src/routes/userRoute");

async function startServer() {
  const app = express();
  const port = 3000;
  app.use(cors());
  app.use(bodyParser.json());
  //app.use(bodyParser.urlencoded({ extended: fa }));

  const server = new ApolloServer({
    typeDefs: /* GraphQL */ `
      type users {
        id: ID!
        first_name: String!
        last_name: String!
        address: String!
      }
    

      type Query {
        getUsers: [users]
        getUser(id: ID!): users
      }
    `,
    resolvers: {
      Query: {
        getUsers: async () =>
          (await axios.get("http://localhost:8080/users")).data,

        getUser: async (parent, { id }) =>
          (await axios.get(`http://localhost:8080/users/${id}`)).data,


      },
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
