import React, { NavLink } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MaintenanceCompanyStore from '../store/MaintenanceCompany';
import { Employee } from '../store/EmployeeInfo';
import { Mode } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
import { isEmpty } from '../store/Utils';

/*type MaintenanceCompanyProps =
    MaintenanceCompanyStore.MaintenanceCompanyState
    & typeof MaintenanceCompanyStore.actionCreators
    & RouteComponentProps<{ id: string }>;*/

class MaintenanceCompany extends BaseApp {
    state = {
        maintenancecompany: MaintenanceCompanyStore.defaultMaintenanceCompany,
        maintenancecompany_old: MaintenanceCompanyStore.defaultMaintenanceCompany,
        maintenancecompanys: [],
        mode: Mode.Read,
    };

    validate = (maintenancecompanys) => {
        return {
            descEmpresaVigilancia: { errorMessage: "Falta Nombre de  Empresa ", isRequired: true, isEmpty: isEmpty(maintenancecompanys.descEmpresaVigilancia) },

            TelefonosEmpresaVigilancia: { errorMessage: "Falta Telefono de la Empresa ", isRequired: true, isEmpty: isEmpty(maintenancecompanys.TelefonosEmpresaVigilancia) },

            EmailEmpresaVigilancia: { errorMessage: "Falta Nombre de  Empresa ", isRequired: true, isEmpty: isEmpty(maintenancecompanys.EmailEmpresaVigilancia) },

            DireccionEmpresaVigilancia: { errorMessage: "Falta Direccion  de la Empresa ", isRequired: true, isEmpty: isEmpty(maintenancecompanys.DireccionEmpresaVigilancia) },

            PersonaContactoEmpresaVigilancia1: { errorMessage: "Falta Persona  de Contacto Empresa ", isRequired: true, isEmpty: isEmpty(maintenancecompanys.PersonaContactoEmpresaVigilancia1) },

            PersonaContactoEmpresaVigilancia2: { errorMessage: "Falta Persona  de Contacto Empresa ", isRequired: true, isEmpty: isEmpty(maintenancecompanys.PersonaContactoEmpresaVigilancia2) },

            IdCargoPersonaContactoEmpresaVigilancia1: {
                errorMessage: "Falta cargo Persona 1", isRequired: true, valid: maintenancecompanys.IdCargoPersonaContactoEmpresaVigilancia1 > 0, isEmpty: false },

            IdCargoPersonaContactoEmpresaVigilancia2: {
                errorMessage: "Falta Cargo persona 2 ", isRequired: true, valid: maintenancecompanys.IdCargoPersonaContactoEmpresaVigilancia2 > 0, isEmpty: false},

            TelefonosPersonaContactoEmpresaVigilancia1: {
                errorMessage: "Falta Telefono Contacto 1", isRequired: true, valid: true, isEmpty: isEmpty(maintenancecompanys.TelefonosPersonaContactoEmpresaVigilancia1)},

            TelefonosPersonaContactoEmpresaVigilancia2: {
                errorMessage: "Falta Telefono Contacto 2", isRequired: true, valid: true, isEmpty: isEmpty(maintenancecompanys.TelefonosPersonaContactoEmpresaVigilancia2)},

            CorreoPersonaContactoEmpresaVigilancia1: {
                errorMessage: "Falta correo de contacto 1", isRequired: true, valid: true, isEmpty: isEmpty(maintenancecompanys.CorreoPersonaContactoEmpresaVigilancia1)},

            CorreoPersonaContactoEmpresaVigilancia2: {
                errorMessage: "Falta correo de contacto 2", isRequired: true, valid: true, isEmpty: isEmpty(maintenancecompanys.CorreoPersonaContactoEmpresaVigilancia2)},
        };
    };

    /*constructor() {
        super();
    }*/
    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            this.props.getSession();
            this.props.getCargos();
            this.props.getMaintenanceCompanys();
            let IdEmpresaMantenimiento = parseInt(this.props.match.params.id) || 0;
            if (IdEmpresaMantenimiento !== 0) {
                this.props.getCompany(IdEmpresaMantenimiento);
                this.setState({
                    maintenancecompany: this.props.maintenancecompany,

                });
            } else {
                const x = 0;
            }
        } catch (reason) {
            console.log('Error in componentWillMount - MaintenanceCompany:' + reason);
        }
    }
    componentDidMount() {
        //if (this.props.jobs.length === 0) {
        //    console.log("jobs");
        //    this.props.getJobs();
        //}();
        //if (this.props.news.length === 0) {
        //    console.log("news");
        //    this.props.getNews();
        //}

    }

    procesarResponse(nextProps) {
        let id = parseInt(nextProps.match.params.id) || 0;
        if (id !== 0) {
            this.props.getCompany(id);
            //if (this.props.mode != Mode.Update) {
            //    this.props.setModeEdit();
            //}
        }
        if (this.props.maintenancecompanys !== nextProps.maintenancecompanys) {
            this.setState({
                maintenancecompanys: nextProps.maintenancecompanys,
            })
        }
        if (this.props.maintenancecompany !== nextProps.maintenancecompany) {
            let maintenancecompanys = this.state.maintenancecompanys;
            switch (this.state.mode) {
                case Mode.Create:
                    maintenancecompanys.push(nextProps.maintenancecompany);
                    break;
                case Mode.Update:
                    maintenancecompanys.splice(maintenancecompanys.indexOf(this.state.maintenancecompany_old), 1, nextProps.maintenancecompany);
                    break;
                case Mode.Delete:
                    maintenancecompanys.splice(maintenancecompanys.indexOf(this.state.maintenancecompany_old), 1);
                    break;
                default:
                    break;

            }
            this.setState({
                maintenancecompanys: maintenancecompanys,
                maintenancecompany: nextProps.maintenancecompany,
                mode: Mode.Read,
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        try {
            if (this.props.maintenancecompany !== nextProps.maintenancecompany
                && ((nextProps.maintenancecompany === nextState.maintenancecompany)
                    || (nextState.maintenancecompany === MaintenanceCompanyStore.defaultMaintenanceCompany))
            ) {
                this.props.getMaintenanceCompanys();


            }
            if (this.props.IdEmpresaMantenimiento !== nextProps.IdEmpresaMantenimiento) {
                this.props.getEmployees(nextProps.IdEmpresaMantenimiento);
            }
            console.log('shouldComponentUpdate');
            return true;
        } catch (reason) {
            return false;
        }

    }
    /*  componentDidUpdate() {
          console.log('componentDidUpdate');
      }
      componentWillUpdate() {
          console.log('componentWillUpdate');
  
      }
      componentWillUnmount() {
          console.log('componentWillUnmount');
      }*/
    /*handleChange = event => {
        event.preventDefault();
        console.log(event.currentTarget.name + ':' + event.currentTarget.value);
        this.setState({
            maintenancecompany: {
                ...this.state.maintenancecompany,
                [event.currentTarget.name]: event.currentTarget.value,
                FechaUltActualizacion: new Date().toISOString().split('T')[0],
            }
        });
    }*/

    handleChange = event => {
        event.preventDefault();
        this.setState({
            maintenancecompany: {
                ...this.state.maintenancecompany,
                [event.currentTarget.name]: event.currentTarget.value,
                FechaUltActualizacion: new Date().toISOString().split('T')[0],
            }
        });
    }
   /* handleSubmit = event => {
        event.preventDefault();
        switch (this.state.mode) {
            case Mode.Create:
                this.props.create(this.state.maintenancecompany);
                //this.props.setModeRead();
                break;
            case Mode.Update:
                this.props.update(this.state.maintenancecompany);
                break;
            default:
                break;
        }
    }*/
    setMode(maintenancecompany, mode) {
        this.setState({
            maintenancecompany: maintenancecompany,
            maintenancecompany_old: maintenancecompany,
            mode: mode,
        });
    }
    handleNew = () => {
        this.setMode(MaintenanceCompanyStore.defaultMaintenanceCompany, Mode.Create);
    }
    handleUpdate = (maintenancecompany) => {
        this.setMode(maintenancecompany, Mode.Update);
    }
    handleDelete = (maintenancecompany) => {
        this.setState({
            mode: Mode.Delete,
        });
        this.props.delete(this.state.maintenancecompany);
    }
    handleJobTitles(event) {
        event.preventDefault();

        for (let node of event.target.children) {
            if (node.value === event.target.value) {
                this.setState({
                    [event.target.name]: event.target.value,
                    maintenancecompany: {
                        ...this.state.maintenancecompany,
                        ['Id' + event.target.name]: node.value,
                    }
                });
            }
        }

    }
    //METODO PARA MOSTRAR EL SELECT
    showJobTitles(name_, value_) {
        const defaultOption = 'Seleccione...';
        const _jobtitles = this.props.jobtitles === null ? [] : (this.props.jobtitles != undefined ? this.props.jobtitles : []);
        let options = _jobtitles.length > 0 ? _jobtitles.map(function (option) {
            return (
                <option key={option.IdCargo} value={option.IdCargo}>
                    {option.DescCargo}
                </option>
            )
        }) : [];
        return <select className='form-control input-sm' name={name_} onChange={this.handleJobTitles.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }
    //render empleados
    //render empleados
    showdEmployees() {
        //const _employees = this.props.employees.map ? this.props.employees : [];
        const _employees = this.props.employees || [];
        if (_employees.length > 0)
            return <div className="card-body card-padding">
                <div className="row">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="card">
                                    <div className="card-header bgm-BlueSeguricel">
                                        <div className="row">
                                            <h2>Personal de Mantenimiento</h2>
                                            <div className="col-md-9" style={{ textAlign: 'right' }}>
                                                <button className="btn bgm-OrangeSeguricel" onClick={
                                                    () => {
                                                        this.props.history.push('/employee/');
                                                    }
                                                }>Agregar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-group lg-odd-black">
                                        {_employees.map(employee =>
                                            <div className="list-group-item">
                                                <div className="pull-right">
                                                    <div className="actions dropdown">
                                                        <a href="" data-toggle="dropdown" aria-expanded="true">
                                                            <i className="glyphicon glyphicon-option-vertical" />
                                                        </a>
                                                        <ul className="dropdown-menu dropdown-menu-right">
                                                            <li>
                                                                <NavLink to={`/employee/`} >Editar</NavLink>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="media-body">
                                                    <div className="lgi-heading">{employee.PrimerApellido + " " + employee.PrimerNombre}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;

    }
    renderBody() {
        return <section id="main">
            <section id="content">
                <div className="container">
                    <div className="card bgm-GraySeguricel">
                        {/*<div className="card-header bgm-BlueSeguricel">
                            <h2>Empresa de Seguridad</h2>
                        </div>*/}

                        <div className="card-body card-padding">
                            <div className="row">
                                <div className="col-md-12">
                                    {this.renderList()}
                                    {this.state.mode != Mode.Read ? this.renderDatos() : []}
                                    {this.showdEmployees()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>;
    }
    renderDatos() {
        const _maintenancecompany = this.state.maintenancecompany;
        return <div className="col-md-12"><div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-xs-6">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                                        <div className="fg-line">
                                            <input type="text" className="form-control" name="descEmpresaMantenimiento" value={_maintenancecompany.descEmpresaMantenimiento} onChange={this.handleChange.bind(this)} placeholder="Nombre" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-3">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-earphone" /></span>
                                        <div className="fg-line">
                                            <input type="text" className="form-control" name="TelefonosEmpresaMantenimiento" value={_maintenancecompany.TelefonosEmpresaMantenimiento} onChange={this.handleChange.bind(this)} placeholder="Telefono" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <br />
            <div className="col-xs-6">
                <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span>
                    <div className="fg-line">
                        <input type="text" className="form-control" name="EmailEmpresaMantenimiento" value={_maintenancecompany.EmailEmpresaMantenimiento} onChange={this.handleChange.bind(this)} placeholder="Correo" />
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-12">
                    <div className="card-body card-padding bgm-WhiteSeguricel">
                        <div className="row">
                            <div className="col-md-12">
                                <p className="c-black f-500 m-t-20 m-b-20">Direccion</p>
                                <div className="row">
                                    <div className="col-md-9">
                                        <div className="form-group">
                                            <div className="fg-line">
                                                <textarea className="form-control auto-size" name="DireccionEmpresaMantenimiento" value={_maintenancecompany.DireccionEmpresaMantenimiento} onChange={this.handleChange.bind(this)}
                                                    placeholder="Escribe aqui..." />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="col-xs-3">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                                                <div className="fg-line">
                                                    <input type="text" className="form-control" name="PersonaContactoMant1" value={_maintenancecompany.PersonaContactoMant1} onChange={this.handleChange.bind(this)} placeholder="Persona Contacto" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-3">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-credit-card" /></span>
                                                <div className="fg-line">
                                                    {this.showJobTitles("CargoPersonaContactoMant1", _maintenancecompany.IdCargoPersonaContactoMant1 || 0)}
                                                    {/*<input type="text" className="form-control" name="IdCargoPersonaContactoMant1" value={_maintenancecompany.IdCargoPersonaContactoMant1} onChange={this.handleChange.bind(this)} placeholder="Cargo" />*/}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-3">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-earphone" /></span>
                                                <div className="fg-line">
                                                    <input type="text" className="form-control" name="TelefonosPersonaContactoMant1" value={_maintenancecompany.TelefonosPersonaContactoMant1} onChange={this.handleChange.bind(this)} placeholder="Telefono" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-3">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span>
                                                <div className="fg-line">
                                                    <input type="text" className="form-control" name="CorreoPersonaContactoMant1" value={_maintenancecompany.CorreoPersonaContactoMant1} onChange={this.handleChange.bind(this)} placeholder="Correo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="col-xs-3">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                                                <div className="fg-line">
                                                    <input type="text" className="form-control" name="PersonaContactoMant2" value={_maintenancecompany.PersonaContactoMant2} onChange={this.handleChange.bind(this)} placeholder="Persona Contacto" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-3">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-credit-card" /></span>
                                                <div className="fg-line">
                                                    {this.showJobTitles("CargoPersonaContactoMant2", _maintenancecompany.IdCargoPersonaContactoMant2 || 0)}
                                                    {/*<input type="text" className="form-control" name="IdCargoPersonaContactoMant2" value={_maintenancecompany.IdCargoPersonaContactoMant2} onChange={this.handleChange.bind(this)} placeholder="Cargo" />*/}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-3">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-earphone" /></span>
                                                <div className="fg-line">
                                                    <input type="text" className="form-control" name="TelefonosPersonaContactoMant2" value={_maintenancecompany.TelefonosPersonaContactoMant2} onChange={this.handleChange.bind(this)} placeholder="Telefono" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xs-3">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="glyphicon glyphicon-earphone" /></span>
                                                <div className="fg-line">
                                                    <input type="text" className="form-control" name="CorreoPersonaContactoMant2" value={_maintenancecompany.CorreoPersonaContactoMant2} onChange={this.handleChange.bind(this)} placeholder="Correo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.mode === Mode.Update ? this.DeleteButton() : []}
                </div>
            </div>
            <br />
            <div className="col-md-9" style={{ textAlign: 'right' }}>
                <button className="btn  btn-lg bgm-OrangeSeguricel " /*width="120px" height="50px"*/ onClick={
                    () => {
                        this.setState({
                            maintenancecompany: MaintenanceCompany.MaintenanceCompany,
                            mode: Mode.Read
                        });
                    }

                }>Salir</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btn-lg bgm-OrangeSeguricel" /*width="120px" height="50px"*/ onClick={this.handleSubmit.bind(this, this.state.maintenancecompany)}>Guardar</button>
            </div>
        </div>;

    }
    renderList() {
        return <div className="row">
            <div className="col-md-6">
                <div className="row">
                    <div className="card">
                        <div className="card-header bgm-BlueSeguricel">
                            <div className="row">
                                <h2>Empresa de Mantenimiento</h2>
                                <div className="col-md-9" style={{ textAlign: 'right' }}>
                                    <button className="btn bgm-OrangeSeguricel" onClick={this.handleNew.bind(this)}>Agregar</button>
                                </div>
                            </div>
                        </div>
                        {this.showMaintenanceCompanys()}
                    </div>
                </div>
            </div>
        </div>;
    }
    //render empresa de vigilanccia
    showMaintenanceCompanys() {
        const _maintenancecompanys = this.props.maintenancecompanys || [];
        return <div className="list-group lg-odd-black">
            {_maintenancecompanys.map ? _maintenancecompanys.map(_maintenancecompany =>
                <div className="list-group-item">
                    {/*<div className="pull-right">
                        <div className="actions dropdown">
                            <a href="" data-toggle="dropdown" aria-expanded="true">
                                <i className="glyphicon glyphicon-option-vertical"/>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                    <NavLink to={`/maintenancecompany/${_maintenancecompany.IdEmpresaMantenimiento}`} >Editar</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>*/}
                    <div className="media-body">
                        <div className="lgi-heading" onClick={this.handleUpdate.bind(this, _maintenancecompany)}>{_maintenancecompany.descEmpresaMantenimiento}</div>
                    </div>
                </div>
            ) : []}

        </div>;
    }
    DeleteButton() {
        return <div className="col-md-9" style={{ textAlign: 'right' }}>
            <button className="btn btn-default pull-right btn-lg bgm-OrangeSeguricel" /*width="120px" height="50px"*/ onClick={this.handleDelete.bind(this)}>Eliminar</button>
        </div>;
    }
}

// Wire up the React component to the Redux store
export default connect(
    state => state.maintenancecompany, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(MaintenanceCompanyStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(MaintenanceCompany);