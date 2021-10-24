const { ApolloServer, gql } = require("apollo-server");
require("apollo-server");
const { Client } = require("pg");

const client = new Client({
  connectionString: "postgresql://localhost/pg-graphsql",
});

client.connect();

const typeDefs = gql`

  # Schema User
  type User {
    id: ID!
    email: String
    password : String
    firstName: String
    lastName: String
  }
  # Shema Post
  type MyPost {
    id: ID!
    author: String
    comments: String
    createdAt: String
    updatedAt: String
  }

  # Query
  type Query {
    users: [User] # renvoir un tableau
    posts: [MyPost]
    postID: MyPost # on post une seule insertion, donc pas de tableau
  }

  type Mutation {
    post(
      author: String
      content: String
      comments: String
      createdAt: String
    ): MyPost
    delete(id: Int): MyPost
    update(comments: String, updatedAt: String, id: Int): MyPost
    addUser(id:ID,email: String, password: String, firstName: String, lastName:String): User
  }
`;

function toto() {return "coucou"}
const resolvers = {
  // Get
  Query: {
    users: getUser,
    posts: getPost,
    postID: getPostId,
  },
  // Modification
  Mutation: {
    addUser: addUser,
    post: addPost,
    delete: deletePost,
    update: updatePost
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// Register user
async function addUser(firstName, lastName, email, password) {
  console.log(`INSERT Job done ${firstName}, ${lastName}, ${email},${password} `);
  const {
    rows,
  } = await client.query(
    "INSERT INTO myuser (firstName,lastName,email,password) VALUES ($1,$2,$3,$4) RETURNING *",
    [firstName, lastName, email,password]
  );
  return rows;
}

// Get user
async function getUser() {
  const { rows } = await client.query("SELECT * FROM myuser");

  return rows;
}

// Read all the posts
async function getPost() {
  const { rows } = await client.query("SELECT * FROM model");
  console.log(rows);
  return rows;
}

//Create a post
async function addPost(_, { author, content, comments, createdAt }) {
  console.log(author, content, comments, createdAt);
  const {
    rows,
  } = await client.query(
    "INSERT INTO model (author,comments,content,createdAt) VALUES ($1,$2,$3,$4) RETURNING *",
    [author, content, comments, createdAt]
  );
}

// Read a post by It's ID
async function getPostId(id) {
  console.log(id);
  const { rows } = await client.query(
    "SELECT * from model where (id) = ($1) ",
    [id]
  );
}

async function updatePost(comments, updatedAt, id) {
  const {
    rows,
  } = await client.query(
    "UPDATE model SET comments=($1), updatedAt=($2) where (id)=($3)",
    [comments, updatedAt, id]
  );
  return rows;
}

// Delete a post by It's ID
async function deletePost(_, { id }) {
  const { rows } = await client.query("DELETE FROM model WHERE id=($1)", [id]);
  return rows;
}

// --------- Afficher --------
getUser();
getPost();


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// https://www.apollographql.com/docs/apollo-server/schema/schema/