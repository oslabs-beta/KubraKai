import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'; 
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Account from '../containers/Account.jsx'
import Signup from './Signup.jsx'
import Logo from '../assets/kubra_kai-02.png'
import { gql, useMutation } from '@apollo/client'; 
import { context } from '../context.js';

const LOGIN = gql`
  mutation login($email: String!, $pwd: String!) {
    login(email: $email, pwd: $pwd) {
      firstname
    }
  }`;

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '1fr',
        },
      },
  }));
  
  export default function NavbarLogin() {
      const classes = useStyles();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState(''); 
      const [auth, setAuth] = useState(false);
      const [login] =  useMutation(LOGIN);

      const [ip, setIP] = useState('104.200.26.218');
      const [ipArray, setipArray] = useState(["104.200.26.218"])
      const state = {
        ip,
        setIP,
        ipArray,
        setipArray
      }

      const loginFunc = async () => {
       const user = await login({
         variables: {
           email,
           pwd: password
         }
       })
       .then(data => {
         console.log(data)
         if(data) setAuth(true); 
       })
      };
      
      if (auth === true) return (
      <context.Provider value={state}>
      <Router>
        <Route>
          <Redirect to='/account'>
            </Redirect>
            <Route path="/account">
           <Account />
            </Route>
            </Route>
           </Router>
        </context.Provider>
           )
      return (
        <context.Provider value={state}>
        <Router>
            <div className={classes.root}>
                <Switch>
                    <Route exact path="/">
                        <AppBar position="static">
                            <Toolbar>
                            <Typography variant="h6" className={classes.title}>A BADASS KUBERNETES MONITORING TOOL</Typography>
                            <form className={classes.root} noValidate autoComplete="off">
                                <TextField id="standard-basic" 
                                           label="Email" 
                                           style={{ color: "white" }}
                                           onChange={(e) => setEmail(e.target.value)} />
                                <TextField id="standard-password-input" 
                                           label="Password" 
                                           style={{ color: "white" }}
                                           onChange={(e) => setPassword(e.target.value)} />
                            </form>
                                   <Button color="inherit" 
                                          onClick={() => loginFunc()}>Login</Button>
                            <Button><Link to="/signup" 
                                          color="green">Create Account</Link></Button>
                            </Toolbar>
                        </AppBar>
                        <h1>Kubra Kai</h1>
                        <h2>The badass kubernetes monitoring tool</h2>
                        <img src={Logo}></img>
                        <h3>Kubra Kai is a free tool that we will explain what this tool does here and we can continue on to talk about the importance of it and I am just typing an trying to add words to make this seem longer like it is a chunk of text but it is late and I don't feel like coming up with a good writeup for this yet.</h3>
                    </Route>
                    <Route path="/account">
                    <context.Provider value={state}>
                        <Account />
                    </context.Provider>
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                </Switch>
            </div>
        </Router>
      </context.Provider>
      );
  }