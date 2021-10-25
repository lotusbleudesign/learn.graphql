const { gql } = require("apollo-server");

const typeDefs = gql`
  # ---- Schema User
  type User {
    id: ID!
    email: String
    password: String
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

  type Query {
    users: [User] # renvoit un tableau
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
    addUser(
      id: ID
      email: String
      password: String
      firstName: String
      lastName: String
    ): User
  }
`;

module.exports.typeDefs = typeDefs;
