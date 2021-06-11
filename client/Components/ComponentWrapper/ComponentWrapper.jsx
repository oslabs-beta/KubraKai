//Modules
import React, { Fragment, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
//Components
import NavBar from "../NavBar";

const ComponentWrapper = ({ children }) => {

  return (
    <Fragment>
       <Container className='wrapper-container' fluid>
            <Row className="">
                <Col className="side-bar-nav" as={ NavBar } xs={ 12 } md={ 3 } lg={ 2 } />
                <Col xs={ 12 } md={ 9 } lg={ 10 }>{children}</Col>
            </Row>
        </Container>
    </Fragment>
  )
}

export default ComponentWrapper;