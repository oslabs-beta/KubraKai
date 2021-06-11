import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Row, Col, Container, } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import NavBar from '../../Components/NavBar';

const Home = () => {
	return (
		<Fragment>
			<Container fluid>
				<Row className="text-white">
					<Container>
						<Row>
							<Col>Hello</Col>
							<Col>World </Col>
						</Row>
					</Container>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Home;
