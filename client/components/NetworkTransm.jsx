import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
// import "./styles.css"; 
import { context } from '../context.js';
import { Line } from "react-chartjs-2";

/**
 * Authors: Jordan King, Anthony Martinez
 * @param {*} props 
 * 
 * TODO: pass endpoint and label as props 
 * 
 */

export default function NetworkTransmit(props){
  const { ip } = useContext(context)
  const [networkUsage, setNetworkUsage] = useState([]);
  const [networkLabels, setNetworkLabels] = useState([]);
  const endpoint = `http://104.200.26.218:8080/api/v1/query_range?query=rate(node_network_transmit_bytes_total{job="node-exporter",instance="192.168.136.62:9100",device!="lo"}[1m])&start=2021-03-10T19:12:52.00Z&end=2021-03-10T20:12:52.00Z&step=1m`

  useEffect(() => {
    parseData();
  }, []);

  function parseData(){
    fetch(endpoint)
      .then(data => data.json())
      .then(result =>{        
        setNetworkUsage(result.data.result[0].values);
        setNetworkLabels(result.data.result[0].metric.device);
      })    
  }
  
  const data = {
    labels: Array.from(Array(60).keys()),    
    datasets: [
      {
        label: "Network Usage", //append time range
        data: networkUsage.map(x => x[1]),//Array.from(Array(60).fill(.5))
        fill: true,
        backgroundColor: "rgba(75,192,192,0.3)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  };
  
  return(    
    <Container>
      <Line data={data} />      
    </Container>
  )
}

