import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

export default (props) => (
    <React.Fragment>
        <NavMenu />
        <Container>
            {props.children}
        </Container>
    </React.Fragment>
);
/*



import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
//import { Container, Row, Col } from 'reactstrap';
export default props => (
    <React.Fragment>
        <NavMenu />
        <Row>
            {props.children}
        </Row>
    </React.Fragment>
);

/*export default props => (
    <Grid>
        <Row>
            <Col sm={3}>
                <NavMenu />
            </Col>
            <Col sm={9}>
                {props.children}
            </Col>
        </Row>
    </Grid>
);*/
