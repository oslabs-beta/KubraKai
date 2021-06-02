import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { appContext } from '../context'
import { Line } from "react-chartjs-2";

/**
 * Authors: Jordan Kind, Anthony Martinez, Taylor Davis
 * Line Graph component to expose our CPU Used via a Restful API call PromQL DB.
 * UseEffect Hook to Parse the response Data each time the "ip" property on state is 
 * changed. 
 * 
 */

export default function CpuUsage(props){
  const date = new Date();
  const date2 = new Date();
  date2.setDate(date2.getDate() - 2);
  const previous = date2.toISOString();
  const current = date.toISOString();
  //ip address to fetch
  const { ip } = useContext(appContext);
  const [cpuUsage, setCpuUsage] = useState([]);
  const endpoint = `http://${ip}:8080/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total{id=%22/%22}[1m]))/sum((machine_cpu_cores)*100)&start=${previous}&end=${current}&step=1m`
  
  useEffect(() => {
    parseData();
  }, [ip]);
  // parse the data recieved and populate it to cpuUsage property
  function parseData(){
    fetch(endpoint)
    .then(data => data.json())
    .then(result =>{        
      setCpuUsage(result.data.result[0].values);
    })
    .catch(err => console.log(err)); 
  }
  // Format Data recieved from fetch to be rendered in Line Graph
  const data = {
    labels: Array.from(Array(60).keys()),    
    datasets: [
      {
        label: "CPU Usage History", //append time range
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

