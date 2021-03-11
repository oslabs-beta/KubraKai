const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    firstname: String!
    lastname: String!
    email: String!
    pwd: String!
  }
  type Query {
    allUsers: [User!]!
    currentUser: User
  }
  type Mutation {
    signup(firstname: String!, lastname: String!, email: String!, pwd: String!): User!
    login(email: String!, pwd: String!): User!
    userInfo(email: String!, ip: String!, dpname: String!): UserInfo
    logout: Boolean
  }
  type UserInfo {
    email: String!
    ip: String!
    dpname: String!
  }
`;
module.exports = typeDefs;