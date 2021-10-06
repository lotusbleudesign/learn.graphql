const { ApolloServer, gql } = require("apollo-server");
const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql://localhost/pg-graphsql",
});

client.connect();

const typeDefs = gql`

# Schema User
  type User {
    id: Int
    email: String
    firstName: String
    lastName: String
  }
  # appel de la requete nommé Query
  type Query {
    users: [User]
  }

 # Shema Post
  type MyPost {
    id: Int
    author: String
    comments: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    posts: [MyPost]
  }

`;

const resolvers = {
  // requete SQL
  Query: {
    users:getUser(),
    posts: getPost()
  },
};

const server = new ApolloServer({ typeDefs, resolvers });


// TABLE MY USER
async function getUser() {
  const { rows } = await client.query("SELECT * FROM myuser");
  return rows
}

// TABLE MODEL POST
async function getPost() {
  const {rows} = await client.query("SELECT * FROM model");
  return rows
}

// --------- Afficher --------
getUser()
getPost()

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


