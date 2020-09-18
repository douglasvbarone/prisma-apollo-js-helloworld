import { gql } from 'apollo-server'

export const typeDefs = gql`
type Query {
    users:      [User!]!
    posts:      [Post!]!
}

type Mutation {
    createUser (email: String!, name: String, bio: String): User!    
    createPost (title: String!, content: String, published: Boolean = false, authorEmail: String!): Post!
}

type Post {
    id:         Int!
    createdAt:  String!
    title:      String!
    content:    String
    published:  Boolean
    author:     User!    
}

type Profile {
    id:         Int!
    bio:        String
    user:       User!    
}
  
type User {
    id: Int!
    email:      String!
    name:       String
    posts:      [Post!]!
    profile:    Profile
}
  
`