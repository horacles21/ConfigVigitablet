import * as React from 'react';
import {
    Collapse,
    Container,
    Navbar,
    Nav,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default class NavMenu extends React.PureComponent {
    state = {
        isOpen: false
    };

    render() {
        return (
            <header>
                <Navbar color="light" light expand="sm">{/*fixed="top"*/}
                    <NavbarBrand href="/"></NavbarBrand>
                    <NavbarToggler onClick={this.toggle_} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/geo"><span className='glyphicon glyphicon-user'></span>Geo</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/map"><span className='glyphicon glyphicon-user'></span>Mapa</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/contract"><span className='glyphicon glyphicon-home'></span>Contratos</NavLink>
                            </NavItem>
                            {/*<ul className="navbar-nav flex-grow">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbardrop" data-toggle="dropdown">
                                    Registros
                                </a>
                                <div className="dropdown-menu">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-light" to="/area"><span className='glyphicon glyphicon-paperclip'></span>Areas</NavLink>
                                    </NavItem>
                                    <a className="dropdown-item" href="#">Link 2</a>
                                    <a className="dropdown-item" href="#">Link 3</a>
                                </div>
                                </li>
                            </ul>*/}
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/area"><span className='glyphicon glyphicon-paperclip'></span>Areas</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/group"><span className='glyphicon glyphicon-sunglasses'></span>Grupos</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/configcontrolpoint"><span className='glyphicon glyphicon-map-marker'></span>Puntos Control</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/contact"><span className='glyphicon glyphicon-user'></span>Contactos</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/configgroupincident"><span className='glyphicon glyphicon-fire'></span>Grupos Incidentes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/configround"><span className='glyphicon glyphicon-hourglass'></span>Rondas</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/access"><span className='glyphicon glyphicon-hourglass'></span>Accesos</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/configalarm"><span className='glyphicon glyphicon-bell'></span>Configuracion Alarmas</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/specialdate"><span className='glyphicon glyphicon-calendar'></span>Fechas Especiales</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/configturn"><span className='glyphicon glyphicon-calendar'></span>Guardias</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/guardemployee"><span className='glyphicon glyphicon-user'></span>Vigilantes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/configgeneral/news"><span className='glyphicon glyphicon-user'></span>Novedades</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/configgeneral/job"><span className='glyphicon glyphicon-user'></span>Tareas</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/incidenttypes"><span className='glyphicon glyphicon-user'></span>Incidentes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/surveillancecompany"><span className='glyphicon glyphicon-user'></span>Empresa Vigilancia</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/callrecord"><span className='glyphicon glyphicon-user'></span>Registro Llamadas</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/incidentrecord"><span className='glyphicon glyphicon-user'></span>Registro Incidentes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/alarmeventtype"><span className='glyphicon glyphicon-user'></span>Eventos Alarma</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                {/*<Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/"></NavbarBrand>
                        <NavbarToggler onClick={this.toggle_} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/"><span className='glyphicon glyphicon-home'></span>Home</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Options
              </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            Option 1
                </DropdownItem>
                                        <DropdownItem>
                                            Option 2
                </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            Reset
                </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/contract"><span className='glyphicon glyphicon-home'></span>Contratos</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/area"><span className='glyphicon glyphicon-paperclip'></span>Areas</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/group"><span className='glyphicon glyphicon-sunglasses'></span>Grupos</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/configcontrolpoint"><span className='glyphicon glyphicon-map-marker'></span>Puntos de Control</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/contact"><span className='glyphicon glyphicon-user'></span>Contactos</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/configgroupincident"><span className='glyphicon glyphicon-fire'></span>Grupos por Incidentes</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/configround"><span className='glyphicon glyphicon-hourglass'></span>Rondas</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/access"><span className='glyphicon glyphicon-hourglass'></span>Accesos</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/configalarm"><span className='glyphicon glyphicon-bell'></span>Configuracion de Alarmas</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/specialdate"><span className='glyphicon glyphicon-calendar'></span>Fechas Especiales</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/configturn"><span className='glyphicon glyphicon-calendar'></span>Guardias</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/guardemployee"><span className='glyphicon glyphicon-user'></span>Vigilantes</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/configgeneral/news"><span className='glyphicon glyphicon-user'></span>Novedades</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/configgeneral/job"><span className='glyphicon glyphicon-user'></span>Tareas</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/incidenttypes"><span className='glyphicon glyphicon-user'></span>Incidentes</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/surveillancecompany"><span className='glyphicon glyphicon-user'></span>Empresa de Vigilancia</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/callrecord"><span className='glyphicon glyphicon-user'></span>Registro de Llamadas</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/incidentrecord"><span className='glyphicon glyphicon-user'></span>Registro de Incidentes</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/alarmeventtype"><span className='glyphicon glyphicon-user'></span>Tipos de Eventos de Alarma</NavLink>
                                </NavItem>
                                <li className="dropdown">
                                    <ul className="dropdown-menu" role="menu">
                                        <li>
                                            <NavLink tag={Link} to={'/guardemployee'} activeClassName='active'>
                                                <span className='glyphicon glyphicon-user'></span> Personal de Mantenimiento
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>*/}
            </header>
        );
    }

    toggle_ = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

/*
import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
    <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
                <Link to={'/'}>ConfigVigitablet</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav>
                    <LinkContainer to={'/alarmeventtype'}>
                        <NavItem>
                            <Glyphicon glyph='map-marker' /> Tipos de Eventos de Alarmas
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/configgroupincident'}>
                        <NavItem>
                            <Glyphicon glyph='map-marker' /> Config Group Incident
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/configcontrolpoint'}>
                        <NavItem>
                            <Glyphicon glyph='map-marker' /> Puntos de Control
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/configgeneral/job'}>
                        <NavItem>
                            <Glyphicon glyph='edit' /> Tareas
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/configgeneral/news'}>
                        <NavItem>
                            <Glyphicon glyph='map-marker' /> Novedades
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/configround'}>
                        <NavItem>
                            <Glyphicon glyph='list-alt' /> Rutinas
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/maintenancecompany'}>
                        <NavItem>
                            <Glyphicon glyph='bullhorn' /> Empresas de Mantenimiento
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/surveillancecompany'}>
                        <NavItem>
                            <Glyphicon glyph='bullhorn' /> Empresas de Seguridad
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/configincident'}>
                        <NavItem>
                            <Glyphicon glyph='bullhorn' /> Incidentes
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/configturn'}>
                        <NavItem>
                            <Glyphicon glyph='bullhorn' /> Guardias
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/configalarm'}>
                        <NavItem>
                            <Glyphicon glyph='bullhorn' /> Configuracion de Alarmas
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/access'}>
                        <NavItem>
                            <Glyphicon glyph='map-marker' /> Accesos
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/employee'}>
                        <NavItem>
                            <Glyphicon glyph='map-marker' /> Empleados
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/guardemployee'}>
                        <NavItem>
                            <Glyphicon glyph='map-marker' /> Vigilantes
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/incidentrecord'}>
                        <NavItem>
                            <Glyphicon glyph='map-marker' /> Reporte Incidentes
                    </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/roundrecord'}>
                        <NavItem>
                            <Glyphicon glyph='map-marker' /> reporte Rondas
                    </NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar.Header>
    </Navbar >
);
*/