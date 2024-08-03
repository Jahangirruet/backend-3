const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { default: axios } = require("axios");

async function startServer() {
  const app = express();
  const port = 4000;
  app.use(cors());
  app.use(bodyParser.json());

  const server = new ApolloServer({
    typeDefs: /* GraphQL */ `

    type servers{
      id: ID!
      serverIP: String
      serverPassword: String
      ram: Int
      core: Int
      disk: Int
    }

    type clients{
      id: ID!
      ipaddress: String
      username: String
      password: String
      email: String
      ram: Int
      core: Int
      disk: Int
      expirydate: String
    }


      type users {
        id: ID!
        first_name: String  
        last_name: String
        address: String
      }

      type Query {
        getClients: [clients]
        gerServers: [servers]
        getUsers: [users]
        getUser(id: ID!): users
      }

      type Mutation {
        createUser(
          first_name: String
          last_name: String
          address: String
        ): users,

        UpdateUser(id: ID, first_name: String, last_name: String, address: String): users,

        deleteUser(id: ID): users
   
        
      }
    `,
    resolvers: {
      Query: {
        getUsers: async () =>
          (await axios.get("http://localhost:8080/users")).data,

        getUser: async (parent, { id }) =>
          (await axios.get(`http://localhost:8080/users/${id}`)).data,
        gerServers: async () =>
          (await axios.get("http://localhost:8080/server")).data,

        getClients: async () =>
          (await axios.get("http://localhost:8080/client")).data,
      },

      Mutation: {
        createUser: async (parent, { first_name, last_name, address }) =>
          (
            await axios.post("http://localhost:8080/users", {
              first_name,
              last_name,
              address,
            })
          ).data,

        UpdateUser: async (parent, { id, first_name, last_name, address }) => {
          (
            await axios.put(`http://localhost:8080/users/${id}`, {
              id,
              first_name,
              last_name,
              address,
            })
          ).data;
        },

        deleteUser: async (parent, { id }) =>
          (await axios.delete(`http://localhost:8080/users/${id}`),{
            id
          }).data,
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
