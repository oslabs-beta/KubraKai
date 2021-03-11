import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
// import "./styles.css"; 

import { Line } from "react-chartjs-2";

/**
 * Authors: 
 * @param {*} props 
 * 
 * 
 */
export default function CpuUsage(props){

  const [cpuUsage, setCpuUsage] = useState([]);

  const endpoint = `http://104.200.26.218:8080/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total{id=%22/%22}[1m]))/sum((machine_cpu_cores)*100)&start=2021-03-10T19:12:52.00Z&end=2021-03-10T20:12:52.00Z&step=1m`

  useEffect(() => {
    console.log('About to parse data')
    parseData();
  }, []);

  function parseData(){
    // fetch(endpoint)
    //   .then(data => data.json())
    //   .then(result =>{
    //     console.log('arr of arr', result.data.result.values)
        
    //     // setCpuUsage(result.data.result.values);
    //   })
    setCpuUsage(Array.from(Array(60).fill(.5)))
    console.log('at parseDatae bottom: ', cpuUsage)
  }
  
  const data = {
    labels: Array.from(Array(60).keys()),//["Jan", "Feb", "Mar", "Apr", "May", "Jun"], //x axis
    
    datasets: [
      {
        label: "CPU Usage", //append time range
        data: cpuUsage.map(x => x[1]),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
      // {
      //   label: "Second dataset",
      //   data: [33, 25, 35, 51, 54, 76],
      //   fill: false,
      //   borderColor: "#742774"
      // }
    ]
  };
  
  return(
    
    <Container maxWidth='md'>
      <Line data={data} />
      
    </Container>
  )
}

