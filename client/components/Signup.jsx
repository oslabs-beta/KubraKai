import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'; 
import Account from './Account.jsx'
import { gql, useMutation, useQuery } from '@apollo/client';


// const CREATE_USER = gql`
//   mutation createUser($type: User) {
//     createUser(firstname: String, lastname: String, email: String, pwd: String) {
//       firstname
//       lastname
//       email
//       pwd
//     }
//   }
// `;
const GET_USERS = gql`
  query allUsers {
    allUsers {
        firstname
        lastname
        email
        pwd
    }
  }`



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
  // const [createUser] = useMutation(CREATE_USER);
  const {loading, error, data } = useQuery(GET_USERS); 
 
  useEffect(() => {
    console.log('data ->>>', data);
  },[data])

  // const createNewUser = () => {
  //   console.log(firstName)
  //   return createUser({ variables: { firstName, lastName, email, password }})
  // }

  // const getAllUsers = () => {
  //   console.log(data);
  // }

  return(
      <Router>
      <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Switch>
              <Route path="/signup">
                  <h2>CREATE AN ACCOUNT</h2>
                    <TextField id="outlined-basic" 
                            label = "firstName" 
                            classname = {classes.textField}
                            onChange={event => setFirstName(event.target.value)} 
                            variant="outlined" />
                    <TextField id="outlined-basic" 
                            label = "lastName" 
                            classname = {classes.textField}
                            onChange={event => setLastName(event.target.value)} 
                            variant="outlined" />
                    <TextField id="outlined-basic" 
                            label = "email" 
                            classname = {classes.textField}
                            onChange={event => setEmail(event.target.value)} 
                            variant="outlined" />
                    <TextField id="outlined-basic" 
                            label = "password" 
                            classname = {classes.textField}
                            onChange={event => setPassword(event.target.value)} 
                            variant="outlined" />
                    <Button><Link to="/account"
                          onClick={() => {}}
                            >SIGN UP</Link></Button>
                  </Route>
                  <Route path="/account">
                    <Account />
                  </Route>

          </Switch>
      </section>

      </Router>
    )
};