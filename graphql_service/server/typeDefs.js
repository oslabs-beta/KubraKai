const {gql} = require('apollo-server-express')

const typeDefs = gql`
  type Metric{
    dateTime: String
    value: String
  }

  type Query{
    cpuUsage(start:String!, end:String!, step:String!): [Metric]
    networkUsage(start:String!, end:String!, step:String!): [Metric]
  }
`


module.exports = typeDefs;