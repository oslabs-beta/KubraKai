//Modules
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
//Components
import NavBar from '../client/Components/NavBar';
import ComponentWrapper from '../client/Components/ComponentWrapper';
//Pages
import Home from '../client/Pages/Home';
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<Router>
			<ComponentWrapper>
				<Switch>
					<Route exact path="/" component={Home}></Route>
				</Switch>
			</ComponentWrapper>
		</Router>
	);
};

export default App;
