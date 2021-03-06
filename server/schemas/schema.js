const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    firstname: String!
    lastname: String!
    email: String!
    pwd: String!
  }
  type UserMetrics {
      CPU_Usage: Int
      Mem_Usage: Int
      Bandwith: Int
  }
  type Query {
    allUsers: [User!]!
    getMetrics: [UserMetrics!]!
  }
  type Mutation {
      createUser(firstname: String, lastname: String, email: String, pwd: String): User!
      login(email: String): User
      createMetric(CPU_Usage: Int, Mem_Usage: Int, Bandwith: Int): UserMetrics 
  }
`;
module.exports = typeDefs;