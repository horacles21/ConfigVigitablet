import * as Settings from '../store/MyConfig';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Login';
import * as LogInStore from '../store/Login';
import { PageLoader } from '../components/PageLoader';
//import Button from '@material-ui/core/Button';
import { Form } from 'reactstrap';
//import { Tooltip, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
//import classnames from 'classnames';
//import { ErrorHandler } from 'universal-react-logger';

//import { requestSettings } from '../store/BaseStore';
//import * as Usuario from '../store/Usuario';
/*export type LogInProps =
    LogInStore.LogInState
    & typeof LogInStore.actionCreators
    & RouteComponentProps<{}>;
    */
export class LoginPage extends Component {
    state = {
        login: LogInStore.defaultLogin
    }

    componentWillMount() {
        this.props.requestSettings();
        this.props.getSession();
        this.props.getUserbyEmail();
        //this.props.getIP();

    }

    componentDidMount() {
        /*const Some_API = 'https://api.ipify.org?format=json';
        fetch(Some_API).then(response => {
            if (response.ok) {
                console.log(response.json());
                response.headers.map(header => {
                    console.log(header);
                });
            }
        });*/
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.response !== this.props.response) {
            const response = nextProps.response;
            if (response) {
                if (response.status) {
                    switch (response.status) {
                        case 400:
                            alert(response.statusText);
                            break;
                        default:
                            break;
                    }
                    /*if (response.status !== 200) {

                    }*/
                }
                else {
                    //alert("SIN RESPUESTA");
                }
            }
            else {
                //alert("SIN RESPUESTA");
            }
        }
        if (nextProps.login !== this.props.login) {
            this.props.getUserbyEmail();
            //this.props.history.push('/');
            //this.props.history.goBack();
        }
        if (nextProps.contracts !== this.props.contracts) {
            //const currentPage = '';//GetCurretPage();
            //this.props.history.goBack();
            //this.props.history.push('/'+ currentPage);
        }
        if (nextProps.user !== this.props.user) {
            Settings.default.key.user = nextProps.user.Id;
            this.props.history.goBack();
        }
    }

    handlerSubmit(event) {
        try {
            event.preventDefault();
            this.props.getToken(this.state.login);
        } catch (reason) {
            console.log('Submit login:' + reason);
        }
    }

    handlerChange(e) {
        e.preventDefault();
        this.setState({
            login: {
                ...this.state.login,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        return this.props.isLoading ? <PageLoader /> : this.props.login.access_token === '' ?
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header bg-dark text-white">
                        <h3>INICIO DE SESIÓN</h3>
                    </div>
                    {this.props.response.statusText ? <span>
                        {/*this.state.errors.map((error, i) => <p key={i}>HEllo{error.value}</p>)*/}
                        <p>{'Status ' + this.props.response.status + ': ' + this.props.response.statusText}</p>
                    </span> : []}
                    {this.props.response.description ? <span>
                        {/*this.state.errors.map((error, i) => <p key={i}>HEllo{error.value}</p>)*/}
                        <p>{'Error: ' + this.props.response.description}</p>
                    </span> : []}
                    {this.props.login.error ? <span>
                        {/*this.state.errors.map((error, i) => <p key={i}>HEllo{error.value}</p>)*/}
                        <p>{'Error ' + this.props.login.error + ': ' + this.props.login.error_description}</p>
                    </span> : []}
                    <div className="card-body card-padding">
                        <Form>
                            <div className="input-group" title="Usuario">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                                <input type="text" className="form-control" placeholder="Escriba el usuario" name="uname" value={this.state.login.uname} onChange={this.handlerChange.bind(this)} required />
                            </div>
                            <div className="input-group" title="Clave">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-lock" /></span>
                                <input type="password" className="form-control" placeholder="Escriba la clave" name="passw" value={this.state.login.passw} onChange={this.handlerChange.bind(this)} required />
                            </div>
                            <div className="input-group">
                                <button className="btn btn-primary btn-lg" type="submit" onClick={this.handlerSubmit.bind(this)}>Login</button>
                                <button className="btn btn-secondary btn-lg" type="reset">Restablecer</button>
                            </div>
                            {/*<div>
                             *  <Tooltip target="TooltipExample123" isOpen={this.state.isOpenTTT} toggle={this.toggle_} {...this.props} />
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggle_('1'); }}
                                        >
                                            Tab1
          </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle_('2'); }}
                                        >
                                            Moar Tabs
          </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab="1">
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col sm="12">
                                                <h4>Tab 1 Contents</h4>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Col sm="6">
                                                <Card body>
                                                    <CardTitle>Special Title Treatment</CardTitle>
                                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                                    <Button>Go somewhere</Button>
                                                </Card>
                                            </Col>
                                            <Col sm="6">
                                                <Card body>
                                                    <CardTitle>Special Title Treatment</CardTitle>
                                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                                    <Button>Go somewhere</Button>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </div>*/}
                           
                        </Form>
                    </div>
                </div>
            </div> :
            <div><h2>La sesión finalizó... Refrescar la página...</h2></div>;
    }
}

// Wire up the React component to the Redux store
export default connect(
    state => state.login, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(actionCreators, dispatch)             // Selects which action creators are merged into the component's props
)(LoginPage);
