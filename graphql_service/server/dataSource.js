const {RESTDataSource} = require('apollo-datasource-rest')

//This API URL should point to Prometheus data that 
//can be queried in PromQL
const API_URL = 'http://104.200.26.218:8080/api/v1/';

/** 
 * Define PromQL queries for an exposed Prometheus Server
 */
class PrometheusAPI extends RESTDataSource{
  constructor(){
    super()
    this.baseURL = API_URL;
  }

  /**
   * @param {*} startDateTime 
   * @param {*} endDateTime 
   * @param {*} step 
   * 
   * Times are 10 digits or 2021-03-10T19:12:52.00Z
   * Step must be a valid increment, see PromQL documentation. 
   */
  async getCpuUsageSecondsTotal(startDateTime, endDateTime, step){   
    let str = 'query_range?query=sum(rate(container_cpu_usage_seconds_total{id="/"}[1m]))/sum((machine_cpu_cores)*100)&'
    str += 'start='+startDateTime +'&end='+endDateTime+'&step='+step
    const data = await this.get(str)
    let res = this.convertToObjects(data.data.result[0].values)
    console.log(res)
    return res;
  }

  /** 
   * @param {*} startDateTime 
   * @param {*} endDateTime 
   * @param {*} step
   * 
   * TODO: instance must be set as a param.  You must make a query to get the instance
   *       ip address since it may be dynamically generated.  
   */
  async getNetworkTransmit(startDateTime, endDateTime, step){   
    let str = 'query_range?query=rate(node_network_transmit_bytes_total{job="node-exporter",instance="192.168.136.62:9100",device!="lo"}[1m])&' 
    str += 'start='+startDateTime +'&end='+endDateTime+'&step='+step
    const data = await this.get(str)
    let res = this.convertToObjects(data.data.result[0].values)
    console.log(res)
    return res;
  }

  /**
   * Reformat data from [0123456789, 'somevalue'] to {dateTime, value}
   * to facilitate data modeling typeDefs.
   *  
   * @param {*} arr 
   */
  convertToObjects(arr){
    const result = arr.map(x => {
      let dateTime = new Date(1000 *x[0]).toJSON();
      let value = x[1];
      return {dateTime, value}
    })
    return result;
  }
}

module.exports = PrometheusAPI;