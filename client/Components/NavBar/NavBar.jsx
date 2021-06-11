import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Nav, Navbar, NavDropdown, Col, Image, Container, Button, Spinner, Collapse } from 'react-bootstrap';
import { Drawer } from 'react-bootstrap-drawer';
import { Link, Redirect } from 'react-router-dom';

const NavBar = () => {
	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className='flex-column'>
					<Nav.Link href="/home">
						<i className="fas fa-home"></i>
					</Nav.Link>
					<Nav.Link eventKey="link-1">
						<i className="fas fa-user-circle"></i>
					</Nav.Link>
					<Nav.Link eventKey="link-2">
						<i className="fas fa-th-large"></i>
					</Nav.Link>
					<Nav.Link eventKey="link-2">
						<i className="fas fa-cog"></i>
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
