import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'; 
import Account from '../containers/Account.jsx'
import { gql, useMutation } from '@apollo/client';
import { context } from '../context.js'

/*POTENTIAL USER CREATION */
const CREATE_USER = gql`
  mutation signup($firstname: String!, $lastname: String!, $email: String!, $pwd: String!) {
    signup(firstname: $firstname, lastname: $lastname, email: $email, pwd: $pwd) {
      firstname
      lastname
      email
      pwd
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: '50ch',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "1px solid black",
    borderRadius: '5px',
    backgroundColor: "white",
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
}));


export default function Signup(){
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const [auth, setAuth] = useState(false);
  const [signup] = useMutation(CREATE_USER);
  const { ip } = useContext(context)
 
  console.log(ip);

  const createNewUser = () => {
    signup({ 
      variables: { 
      firstname: firstName, 
      lastname: lastName,
      email: email, 
      pwd: password
    }})
    .then(data => {
      console.log(data)
      setAuth(true);
      return;
    })
    .catch(err => console.log(err));
  };

  if (auth === true) return (
    <Router>
      <Route>
        <Redirect to='/account'>
          </Redirect>
          <Route path="/account">
         <Account />
          </Route>
          </Route>
         </Router>
         )
  return(
      <Router>
      <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Switch>
              <Route path="/signup">
                  <h2>CREATE AN ACCOUNT</h2>
                    <TextField id="outlined-basic" 
                            label = "firstName" 
                            className = {classes.textField}
                            onChange={event => setFirstName(event.target.value)} 
                            variant="outlined" />
                    <TextField id="outlined-basic" 
                            label = "lastName" 
                            className = {classes.textField}
                            onChange={event => setLastName(event.target.value)} 
                            variant="outlined" />
                    <TextField id="outlined-basic" 
                            label = "email" 
                            className = {classes.textField}
                            onChange={event => setEmail(event.target.value)} 
                            variant="outlined" />
                    <TextField id="outlined-basic" 
                            label = "password" 
                            className = {classes.textField}
                            onChange={event => setPassword(event.target.value)} 
                            variant="outlined" />
                    <div>ip below</div>
                    <div>{ip}</div>
                    <Button onClick={() => {createNewUser()}}>
                            SIGN UP</Button>
                  </Route>
                  <Route path="/account">
                    <Account />
                  </Route>

          </Switch>
      </section>

      </Router>
  )
};