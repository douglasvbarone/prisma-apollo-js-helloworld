import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    users: [User!]!
    posts: [Post!]!
  }

  type Mutation {
    createUser(email: String!, name: String, bio: String): User!
    createPost(data: PostInput!): Post!
    deleteUser(email: String!): User!
    deletePost(postId: String!): Post!
    updateProfile(email: String!, bio: String!): Profile!
    updatePost(id: String!, data: PostInput!): Post!
    publishPost(id: String): Post!
    unPublishPost(id: String): Post!
  }

  type Post {
    id: ID!
    createdAt: String!
    title: String!
    content: String
    published: Boolean
    author: User!
  }

  type Profile {
    id: ID!
    bio: String
    user: User!
  }

  type User {
    id: ID!
    email: String!
    name: String
    posts: [Post!]!
    profile: Profile
  }

  input PostInput {
    title: String!
    content: String
    published: Boolean = false
    authorEmail: String!
  }
`
