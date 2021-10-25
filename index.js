//Connexion avec ApolloServer
const { ApolloServer, gql } = require("apollo-server");
require("apollo-server");
const { Client } = require("pg");
const { typeDefs } = require("./src/schema");

//-- Connexion BDD
const client = new Client({
  connectionString: "postgresql://localhost/pg-graphsql",
});
client.connect();

function toto() {
  return "coucou";
}

// -- Resolvers
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
    update: updatePost,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// Register user
async function addUser(firstName, lastName, password, email) {
  const {
    rows,
  } = await client.query(
    "INSERT INTO myuser (firstName,lastName,password,email) VALUES ($1,$2,$3,$4) RETURNING *",
    [firstName, lastName, password, email]
  );
  console.log(
    `INSERT Job done for : ${firstName}, ${lastName}, ${password},${email}, `
  );
  return rows;
}

// --------- Users ----------
// Get user
async function getUser() {
  const { rows } = await client.query("SELECT * FROM myuser");
  console.log("Job done !");
  return rows;
}

// --------- Post ----------
//Create a post
async function addPost(_, { author, comments, content, createdAt }) {
  let ladate = new Date();
  let createdAt =
    ladate.getDate() +
    "/" +
    (ladate.getMonth() + 1) +
    "/" +
    ladate.getFullYear() +
    " à " +
    ladate.getHours() +
    "h" +
    ladate.getMinutes() +
    "mn";

  const { rows } = await client.query(
    //TODO Comment faire la relation entre l'auteur d'une autre table à cette table ?
    "INSERT INTO post (author,comments,content,createdAt) VALUES ( \
    (SELECT id_user FROM myuser WHERE author = id_user), $2, $3, $4) RETURNING * ",
    [author, comments, content, createdAt]
  );
  console.log(
    `Job done for adding post : ${author} ${content}, ${comments}, ${createdAt}`
  );
  return rows;
}

// Read all the posts
async function getPost() {
  const { rows } = await client.query("SELECT * FROM post");
  console.log(rows);
  return rows;
}

// Read a post by It's ID
async function getPostId(_, { id_post }) {
  console.log(id_post);
  const {
    rows,
  } = await client.query("SELECT * from post where (id_post) = ($1) ", [
    id_post,
  ]);
  return rows;
}
// Update a post by It's ID
async function updatePost(_, { id_post, content, updatedAt }) {
  let ladate = new Date();
  let updatedAt =
    ladate.getDate() +
    "/" +
    (ladate.getMonth() + 1) +
    "/" +
    ladate.getFullYear() +
    " à " +
    ladate.getHours() +
    "h" +
    ladate.getMinutes() +
    "mn";
  const {
    rows,
  } = await client.query(
    "UPDATE post SET content=($1), updatedAt=($2) where (id_post)=($3)",
    [id_post, content, updatedAt]
  );
  console.log(`Job done for updatePost : ${id_post} ${content} ${updatedAt} `);
  return rows;
}

// Delete a post by It's ID
async function deletePost(_, { id_post }) {
  const { rows } = await client.query("DELETE FROM post WHERE id_post=($1)", [
    id_post,
  ]);
  console.log("Job done, post deleted");
  return rows;
}
//Create a comment on a post
// TODO comment relier des commentaires dans un même post ?
async function createContent(_, { id_post, author, content, createdAt }) {
  console.log(" Test ");
}

// --------- Afficher --------
getUser();
getPost();

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// https://www.apollographql.com/docs/apollo-server/schema/schema/
// mutation Mutation($deleteId: Int) {
//   delete(id: $deleteId) {
//     author
//   }
// }
