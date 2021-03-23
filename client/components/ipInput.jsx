import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { context } from '../context.js'
import Button from '@material-ui/core/Button'; 



/* Authors: Jordan Kind,  Taylor Davis
 * @param {*} 
 * 
 * 
 * 
 */

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '20ch',
  },
}));

export default function ipInput() {
  const classes = useStyles();
  const { ipArray, setipArray } = useContext(context);
  const [newIp, setNewIp] = useState('');

  //function to Add IP to current state to be populated, and to DB
  const onClickHandler = () => {
    if (ipArray.includes(`${newIp}`)) return;
    ipArray.push(`${newIp}`);
    console.log('ipArrayPushed:', ipArray)
    setipArray(ipArray);
    const endpoint = '/profile/ip'; 
    fetch(endpoint, {
      method: "POST", 
      body: JSON.stringify({ip: `${newIp}`}),
      headers: { 
        'content-type' : 'application/json'
      }
  })
  .then(ip => ip.json())
  .then(ip => {
      console.log(ip);
  })
  .catch(err => console.log(err));
}

const mystyle = {
  color: "yellow", 
  fontFamily: "Arial",
  border: "1px solid red",
  margin: '10px'
}

  return (
    <div className={classes.root}>
      <div>
        <TextField
          id="IP Input"
          style={{ 
            margin: 8,
            color: 'red',
            fontFamily: 'Arial',
            backgroundColor: 'gray' }}
          placeholder="IP Address"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={event => setNewIp(event.target.value)}
          // onSubmit={onClickHandler}
        />
        <Button
         style={mystyle}
         onClick={() => {onClickHandler()}}>
                            Submit IP</Button>
      </div>
    </div>
  );
}