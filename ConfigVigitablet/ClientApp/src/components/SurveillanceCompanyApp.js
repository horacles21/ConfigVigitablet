import React, { NavLink } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SurveillanceCompanyStore from '../store/SurveillanceCompany';
import { GuardEmployee } from '../store/GuardEmployeeInfo';
import { Mode } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
import { isEmpty } from '../store/Utils';
/*type SurveillanceCompanyProps =
    SurveillanceCompanyStore.SurveillanceCompanyState
    & typeof SurveillanceCompanyStore.actionCreators
    & RouteComponentProps<{ id: string }>;
*/
class SurveillanceCompanyApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'surveillancecompany',
        listObjetos: 'surveillancecompanys',
        defaulObjeto: SurveillanceCompanyStore.defaultSurveillanceCompany,
        surveillancecompany: SurveillanceCompanyStore.defaultSurveillanceCompany,
        surveillancecompany_old: SurveillanceCompanyStore.defaultSurveillanceCompany,
        surveillancecompanys: [],
        fieldList: {
            descEmpresaVigilancia: { ...this.defaultField, description: "Nombre Empresa" },
            TelefonosEmpresaVigilancia: { ...this.defaultField, description: "Telefono Empresa" },
            EmailEmpresaVigilancia: { ...this.defaultField, description: "Email Empresa" },
            IdPais: { ...this.defaultField, description: "Pais" },
            DireccionEmpresaVigilancia: { ...this.defaultField, description: "Direccion Empresa de Vigilancia" },
            PersonaContactoEmpresaVigilancia1: { ...this.defaultField, description: "Persona Contacto 1" },
            PersonaContactoEmpresaVigilancia2: { ...this.defaultField, description: "Persona de Contacto 2" },
            TelefonosPersonaContactoEmpresaVigilancia1: { ...this.defaultField, description: "Telefono Contacto 1" },
            TelefonosPersonaContactoEmpresaVigilancia2: { ...this.defaultField, description: "Telefono Contacto 2" },
            IdCargoPersonaContactoEmpresaVigilancia1: { ...this.defaultField, description: "Cargo Persona 1" },
            IdCargoPersonaContactoEmpresaVigilancia2: { ...this.defaultField, description: "Cargo persona 2" },
            CorreoPersonaContactoEmpresaVigilancia1: { ...this.defaultField, description: "Correo de contacto 1" },
            CorreoPersonaContactoEmpresaVigilancia2: { ...this.defaultField, description: "Correo de contacto 2" },
        },
        title: 'Empresas de Vigilancia',
        subtitle: 'Lista de Empresas de Vigilancia',
        addNewTitle: 'Agregar Nueva Empresa de Vigilancia',
        editTitle: 'Editar Empresa de Vigilancia',
        listTitle: 'Lista de Empresas de Vigilancia',
        getObjetos: "getSurveillanceCompanys"

    };
    validate = (surveillancecompany) => {
        return {
            descEmpresaVigilancia: {
                errorMessage: "Falta Nombre de  Empresa ", isRequired: true, isEmpty: isEmpty(surveillancecompany.descEmpresaVigilancia)
            },
            TelefonosEmpresaVigilancia: {
                errorMessage: "Falta Telefono", isRequired: true, valid: true, isEmpty: isEmpty(surveillancecompany.TelefonosEmpresaVigilancia)
            },
            EmailEmpresaVigilancia: {
                errorMessage: "Falta email", isRequired: true, valid: true, isEmpty: isEmpty(surveillancecompany.EmailEmpresaVigilancia)
            },
            IdPais: {
                errorMessage: "Falta Pais", isRequired: true, valid: true, isEmpty: isEmpty(surveillancecompany.IdPais)
            },
            DireccionEmpresaVigilancia: {
                errorMessage: "Falta Empresa de  Vigilancia", isRequired: true, valid: true, isEmpty: isEmpty(surveillancecompany.DireccionEmpresaVigilancia)
            },
            PersonaContactoEmpresaVigilancia1: {
                errorMessage: "Falta Persona de Conctacto 1", isRequired: true, valid: true, isEmpty: isEmpty(surveillancecompany.PersonaContactoEmpresaVigilancia1)
            },
            PersonaContactoEmpresaVigilancia2: {
                errorMessage: "Falta Persona de Conctacto 2 ", isRequired: true, valid: true, isEmpty: isEmpty(surveillancecompany.PersonaContactoEmpresaVigilancia2)
            },
            TelefonosPersonaContactoEmpresaVigilancia1: {
                errorMessage: "Falta Telefono Contacto 1", isRequired: true, valid: true, isEmpty: isEmpty(surveillancecompany.TelefonosPersonaContactoEmpresaVigilancia1)
            },
            TelefonosPersonaContactoEmpresaVigilancia2: {
                errorMessage: "Falta Telefono Contacto 2", isRequired: true, valid: true, isEmpty: isEmpty(surveillancecompany.TelefonosPersonaContactoEmpresaVigilancia2)
            },
            IdCargoPersonaContactoEmpresaVigilancia1: {
                errorMessage: "Falta cargo Persona 1", isRequired: true, valid: surveillancecompany.IdCargoPersonaContactoEmpresaVigilancia1 > 0, isEmpty: false
            },
            IdCargoPersonaContactoEmpresaVigilancia2: {
                errorMessage: "Falta Cargo persona 2 ", isRequired: true, valid: surveillancecompany.IdCargoPersonaContactoEmpresaVigilancia2 > 0, isEmpty: false
            },
            CorreoPersonaContactoEmpresaVigilancia1: {
                errorMessage: "Falta correo de contacto 1", isRequired: true, valid: true, isEmpty: isEmpty(surveillancecompany.CorreoPersonaContactoEmpresaVigilancia1)
            },
            CorreoPersonaContactoEmpresaVigilancia2: {
                errorMessage: "Falta correo de contacto 2", isRequired: true, valid: true, isEmpty: isEmpty(surveillancecompany.CorreoPersonaContactoEmpresaVigilancia2)
            },
        };
    };
    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            this.props.getCargos();
            this.props.getSurveillanceCompanys();
            this.props.getJobTitles();
            //let IdEmpresaVigilancia = parseInt(this.props.match.params.id, 10) || 0;
            /*if (IdEmpresaVigilancia !== 0) {
                this.props.getCompany(IdEmpresaVigilancia);
                this.props.getGuardEmployees(IdEmpresaVigilancia);
                this.setState({
                    surveillancecompany: this.props.surveillancecompany,
                });
            }*/

        } catch (reason) {
            console.log('Error in componentWillMount - SurveillanceCompany:' + reason);
        }
    }
    componentDidMount() {

    }

    procesarResponse(nextProps) {
        //let id = parseInt(nextProps.match.params.id, 10) || 0;
        /*if (id !== 0) {
            this.props.getCompany(id);
        }*/
    }

    processSubmit() {
        switch (this.state.mode) {
            case Mode.Create:
                this.props.create(this.state.surveillancecompany);
                break;
            case Mode.Update:
                this.props.update(this.state.surveillancecompany);
                break;
            case Mode.Delete:
                this.props.delete(this.state.surveillancecompany);
                break;
            default:
                break;
        }
    }

    //METODO PARA MOSTRAR EL SELECT
    showJobTitles(name_, value_) {
        const defaultOption = 'Seleccione Cargo...';
        const _jobtitles = this.props.jobtitles === null ? [] : (this.props.jobtitles != undefined ? this.props.jobtitles : []);
        let options = _jobtitles.length > 0 ? _jobtitles.map(function (option) {
            return (
                <option key={option.IdCargo} value={option.IdCargo}>
                    {option.DescCargo}
                </option>
            )
        }) : [];
        return <select className='form-control input-sm' name={name_} onChange={this.handleChange.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }
    //render empleados
    showGuardEmployees(guardemployees) {
        const _guardemployees = guardemployees || [];
        //const _guardemployees = guardemployees_.map ? guardemployees_ : [];
        return <div className="card-body card-padding">
            <div className="row">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="card">
                                <div className="card-header bgm-BlueSeguricel">
                                    <div className="row">
                                        <h2>Personal de Vigilancia</h2>
                                        <div className="col-md-9" style={{ textAlign: 'right' }}>
                                            <button className="btn bgm-OrangeSeguricel" onClick={
                                                () => {
                                                    this.props.history.push('/guardemployee/');
                                                }
                                            }>Agregar</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-group lg-odd-black">
                                    {_guardemployees.map(guardemployee =>
                                        <div className="list-group-item">
                                            <div className="pull-right">
                                                <div className="actions dropdown">
                                                    <a href="" data-toggle="dropdown" aria-expanded="true">
                                                        <i className="glyphicon glyphicon-option-vertical" />
                                                    </a>
                                                    <ul className="dropdown-menu dropdown-menu-right">
                                                        <li>
                                                            <NavLink to={`/guardemployee/`} >Editar</NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <div className="lgi-heading">{guardemployee.PrimerApellido + " " + guardemployee.PrimerNombre}</div>
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

    renderNew() {
        const _surveillanceCompany = this.state.surveillancecompany || SurveillanceCompanyStore.defaultSurveillanceCompany;
        return <div>
            {this.fieldGroup("descEmpresaVigilancia", "glyphicon glyphicon-user")}
            {this.fieldGroup("TelefonosEmpresaVigilancia", "glyphicon glyphicon-earphone")}
            {this.fieldGroup("EmailEmpresaVigilancia", "glyphicon glyphicon-envelope")}
            <div className="input-group">
                <label>Direccion</label>
                <textarea className="form-control auto-size" name="DireccionEmpresaVigilancia" value={_surveillanceCompany.DireccionEmpresaVigilancia} onChange={this.handleChange.bind(this)}
                    placeholder="Escribe aqui la direccion..." title="Direccion Empresa"/>
            </div>
            <br />
            {this.fieldGroup("PersonaContactoEmpresaVigilancia1", "glyphicon glyphicon-user")}
            <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-credit-card" /></span>
                {this.showJobTitles("IdCargoPersonaContactoEmpresaVigilancia1", _surveillanceCompany.IdCargoPersonaContactoEmpresaVigilancia1 || 0)}
            </div>
            <br />
            {this.fieldGroup("TelefonosPersonaContactoEmpresaVigilancia1", "glyphicon glyphicon-earphone")}
            {this.fieldGroup("CorreoPersonaContactoEmpresaVigilancia1", "glyphicon glyphicon-envelope")}
            {this.fieldGroup("PersonaContactoEmpresaVigilancia2", "glyphicon glyphicon-user")}
            <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-credit-card" /></span>
                {this.showJobTitles("IdCargoPersonaContactoEmpresaVigilancia2", _surveillanceCompany.IdCargoPersonaContactoEmpresaVigilancia1 || 0)}
            </div>
            <br />
            {this.fieldGroup("TelefonosPersonaContactoEmpresaVigilancia2", "glyphicon glyphicon-earphone")}
            {this.fieldGroup("CorreoPersonaContactoEmpresaVigilancia2", "glyphicon glyphicon-envelope")}
        </div>;
    }

    //render empresa de vigilanccia
    showSurveillanceCompanys() {
        const _surveillancecompanys = this.state.surveillancecompanys || [];
        return <div className="list-group lg-odd-black">
            {_surveillancecompanys.map(_surveillancecompany =>
                <div className="list-group-item">
                    <div className="media-body">
                        <div className="lgi-heading" onClick={this.handleUpdate.bind(this, _surveillancecompany)}>{_surveillancecompany.descEmpresaVigilancia}</div>
                    </div>
                </div>
            )}
        </div>;
    }
    handleUpdateFunctions(area) {

    }
    initializeRecords() {
        this.state.records = this.state.surveillancecompanys || [];
    }
}

// Wire up the React component to the Redux store
export default connect(
    state => state.surveillancecompany, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(SurveillanceCompanyStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(SurveillanceCompanyApp);