import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'; 
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Account from '../containers/Account.jsx'
import Signup from './Signup.jsx'
import Logo from '../assets/kubra_kai-02.png'


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
      function loginFunc(e) {
        setEmail(e.target.value)
        setPassword(e.target.value)
        const loginInfo = {
          'email': email,
          'password': password
        }
        console.log('loginInfo:', loginInfo)
      }
      return (
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
                                           style={{ color: "white" }} />
                                <TextField id="standard-basic" 
                                           label="Password" 
                                           style={{ color: "white" }} />
                            </form>
                            <Button><Link to="/account" 
                                          color="inherit" 
                                          onClick={loginFunc}>Login</Link></Button>
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
                        <Account />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                </Switch>
            </div>

        </Router>
      );
  }