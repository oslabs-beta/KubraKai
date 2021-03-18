import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
// import "./styles.css"; 
import { context } from '../context.js'
import { Line } from "react-chartjs-2";

/**
 * Authors: Jordan Kind, Anthony Martinez
 * @param {*} props 
 * 
 * TODO: pass endpoint and label as props 
 * 
 */
export default function CpuUsage(props){
  const { ip } = useContext(context);
  const [cpuUsage, setCpuUsage] = useState([]);
  const endpoint = `http://${ip}:8080/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total{id=%22/%22}[1m]))/sum((machine_cpu_cores)*100)&start=2021-03-10T19:12:52.00Z&end=2021-03-10T20:12:52.00Z&step=1m`

  useEffect(() => {
    console.log("endpoint", endpoint)
    parseData();
  }, []);

  function parseData(){
    fetch(endpoint)
      .then(data => data.json())
      .then(result =>{        
        setCpuUsage(result.data.result[0].values);
      })    
  }
  
  const data = {
    labels: Array.from(Array(60).keys()),    
    datasets: [
      {
        label: "CPU Usage", //append time range
        data: cpuUsage.map(x => x[1]),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.3)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };
  
  return(    
    <Container maxWidth='md'>
      <Line data={data} />      
    </Container>
  )
}

