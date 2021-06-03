import React, { useContext, useEffect } from 'react';
<<<<<<< HEAD
import MetricsContainer from '../components/metricsContainer.jsx'
import DropDown from '../components/ipDropDown'
import Input from '../components/ipInput'
import {appContext} from '../context';

/**
 * Authors: Jordan Kind, Anthony Martinez, Taylor Davis
 * Dashboard Component that houses all children components. 
 * Initialization of State and passing of Context happens here. 
 */

export default function Account(props) {  
 
  const {ipArray, setIpArray} = useContext(appContext)
  const {ip, setIp} = useContext(appContext)

  const getIps = () => { 
    if(ipArray.length < 1) {
      fetch('/profile/ip')
      .then(res => res.json())
      .then(res => {
        console.log("Arr?", res)
        let newArr = [];
        for (let i = 0; i < res.length; i++) {
          let ip = res[i].userip;
          newArr.push(ip)
        }
        setIpArray(newArr);
        setIp(newArr[0]);
      })
      .catch(err => console.log(err));
=======
import MetricsContainer from '../components/metricsContainer.jsx';
import DropDown from '../components/ipDropDown';
import Input from '../components/ipInput';
import { appContext } from '../context';

/**
 * Authors: Jordan Kind, Anthony Martinez, Taylor Davis
 * Dashboard Component that houses all children components.
 * Initialization of State and passing of Context happens here.
 */

export default function Account(props) {
  const { ipArray, setIpArray } = useContext(appContext);
  const { ip, setIp } = useContext(appContext);
  const { user, setUser } = useContext(appContext);
  console.log('the user is.............', user);

  const getIps = () => {
    if (ipArray.length < 1) {
      fetch('/profile/ip')
        .then((res) => res.json())
        .then((res) => {
          console.log('Arr?', res);
          let newArr = [];
          for (let i = 0; i < res.length; i++) {
            let ip = res[i].userip;
            newArr.push(ip);
          }
          setIpArray(newArr);
          setIp(newArr[0]);
        })
        .catch((err) => console.log(err));
>>>>>>> passing-user
    }
    return;
  };
  useEffect(() => {
    getIps();
  }, [ip]);

<<<<<<< HEAD
  return(
    <div 
      style={{ backgroundColor: "black" }}>
      <header style={mystyle}>
        <img src="../client/assets/rsz_1rsz_kubra_kai-02.png" ></img>
      </header>    
      <DropDown />
      <Input />
      <MetricsContainer className="metricsContainer"/>   
    </div>
  )
}

const mystyle = {
  color: "red", 
  fontFamily: "Arial",
  display: "flex", 
  justifyContent: "center", 
};
=======
  return (
    <div style={{ backgroundColor: 'black' }}>
      <header style={mystyle}>
        <img src='../client/assets/rsz_1rsz_kubra_kai-02.png'></img>
      </header>
      <DropDown />
      <Input />
      <MetricsContainer className='metricsContainer' />
      <h1>hello world!!!!</h1>
    </div>
  );
}

const mystyle = {
  color: 'red',
  fontFamily: 'Arial',
  display: 'flex',
  justifyContent: 'center',
};
>>>>>>> passing-user
