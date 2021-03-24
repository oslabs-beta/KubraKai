
const resolvers = {
  Query:{
    cpuUsage: async(_, {start, end, step}, {dataSources})=>{
      return dataSources.prometheusAPI.getCpuUsageSecondsTotal(start, end, step)
    },
    networkUsage: async(_, {start, end, step}, {dataSources})=>{
      return dataSources.prometheusAPI.getNetworkTransmit(start, end, step)
    }
  }
}

module.exports = resolvers;
