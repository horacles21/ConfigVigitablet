import React, { NavLink } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ServiceUnitManagementsStore from '../store/ServiceUnitManagement';
import { Mode, onlyNumbers } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';

// At runtime, Redux will merge together...
/*type ServiceUnitManagementProps =
    ServiceUnitManagementsStore.ServiceUnitManagementsState        // ... state we've requested from the Redux store
    & typeof ServiceUnitManagementsStore.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ IdContract: string, IdUnit: string }>; // ... plus incoming routing parameters
*/
class ServiceUnitManagementApp extends BaseApp {
    state = {
        ...this.defaultState,
        errors: ServiceUnitManagementsStore.defaultErrors,
        ServiceUnitManagement: ServiceUnitManagementsStore.defaultServiceUnitManagement,
        ServiceUnitManagement_old: ServiceUnitManagementsStore.defaultServiceUnitManagement,
        ServiceUnitManagements: [],
        fieldList: {

        },
        getObjetos: 'getRoutines'

    };
    /*constructor() {
        super();
    }*/
    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            this.props.getServiceUnitManagements(22);
            this.initializeList();
            this.props.getJobTitles();
            let IdContract = parseInt(this.props.match.params.IdContract, 10) || 0;
            let IdUnit = parseInt(this.props.match.params.IdUnit, 10) || 0;
            if (IdContract !== 0 && IdUnit !== 0) {
                this.props.getServiceUnitManagement(IdContract, IdUnit);
            }

        } catch (reason) {
            const error = reason;
        }
    }
    initializeList() {
        if (this.state.ServiceUnitManagements.length === 0) {
            if (this.props.ServiceUnitManagements.length === 0) {
                this.props.getServiceUnitManagements(22);
            } else {
                this.setState({
                    ServiceUnitManagements: this.props.ServiceUnitManagements,
                });
            }

        }
    }
    procesarResponse(nextProps) {
        this.initializeList();


        let IdContract = parseInt(nextProps.match.params.IdContract, 10) || 0;
        let IdUnit = parseInt(nextProps.match.params.IdUnit, 10) || 0;
        if (IdContract !== 0 && IdUnit !== 0) {
            this.props.getServiceUnitManagement(IdContract, IdUnit);
        }

        if (nextProps.ServiceUnitManagements !== this.props.ServiceUnitManagements) {
            this.setState({
                ServiceUnitManagements: nextProps.ServiceUnitManagements,
            });

        }
        if (nextProps.ServiceUnitManagement !== this.props.ServiceUnitManagement) {

            let ServiceUnitManagements = this.state.ServiceUnitManagements;
            var number_of_elements_to_remove = 1;
            switch (this.state.mode) {
                case Mode.Create:
                    ServiceUnitManagements.push(nextProps.ServiceUnitManagement);
                    break;
                case Mode.Update:
                    ServiceUnitManagements.splice(ServiceUnitManagements.indexOf(this.state.ServiceUnitManagement_old), number_of_elements_to_remove, nextProps.ServiceUnitManagement);
                    break;
                case Mode.Delete:
                    ServiceUnitManagements.splice(ServiceUnitManagements.indexOf(this.state.ServiceUnitManagement_old), number_of_elements_to_remove);
                    break;
                default:
                    break;
            }
            this.setState({
                ServiceUnitManagement: nextProps.ServiceUnitManagement,
                ServiceUnitManagement_old: nextProps.ServiceUnitManagement,
                ServiceUnitManagements: ServiceUnitManagements,
                mode: Mode.Read,
            })

        }
    }

    componentDidMount() {
        ///
    }
    componentWillUnmount() {
        this.setState({
            ServiceUnitManagement: ServiceUnitManagementsStore.defaultServiceUnitManagement,
        });
        this.props.setDefault(this.state.ServiceUnitManagements);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.canBeSubmitted()) {
            switch (this.state.mode) {
                case Mode.Create:
                    this.props.create(this.state.ServiceUnitManagement);
                    break;
                case Mode.Update:
                    this.props.update(this.state.ServiceUnitManagement);
                    break;
                default: break;

            }
        }
        this.setState({
            //mode: Mode.Read,
            // ServiceUnitManagement_old: this.state.ServiceUnitManagement,
        });

    }
    setSMS() {

    }
    setEmail() {

    }
    getOption() {
    }
    handleChange(event) {
        event.preventDefault();
        console.log(event.currentTarget.name + ':' + event.currentTarget.value);
        this.setState({
            ServiceUnitManagement: {
                ...this.state.ServiceUnitManagement,
                [event.currentTarget.name]: event.currentTarget.value,
            }
        });
    }
    toggleCheckbox(e) {
        const valor = !this.state.ServiceUnitManagement[e.target.name];
        this.setState({
            ServiceUnitManagement: {
                ...this.state.ServiceUnitManagement,
                [e.target.name]: valor
            }
        });
    }
    handleNew() {
        this.setState({
            mode: Mode.Create,
            ServiceUnitManagement: ServiceUnitManagementsStore.defaultServiceUnitManagement,
            errors: ServiceUnitManagementsStore.defaultErrors,
            touched: ServiceUnitManagementsStore.defaultTouched
        });
    }
    handleDelete(serviceUnitManagement) {
        const idContract = serviceUnitManagement.IdContrato;
        const idUnit = serviceUnitManagement.IdUnidad;

        this.setState({
            mode: Mode.Delete,
            ServiceUnitManagement_old: serviceUnitManagement
        });
        this.props.delete(idContract, idUnit);
    }
    handleUpdate(serviceUnitManagement) {
        const idContract = serviceUnitManagement.IdContrato;
        const idUnit = serviceUnitManagement.IdUnidad;

        this.setState({
            mode: Mode.Update,
            ServiceUnitManagement: serviceUnitManagement,
            ServiceUnitManagement_old: serviceUnitManagement,
        });
        //this.props.delete(idContract, idUnit);

    }
    handleJobTitles(event) {
        event.preventDefault();
        for (let node of event.target.children) {
            if (node.value === event.target.value) {
                this.setState({
                    //[event.target.name]: event.target.value,
                    ServiceUnitManagement: {
                        ...this.state.ServiceUnitManagement,
                        [event.target.name]: node.value,
                    }
                });
            }
        }

    }
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
    showServiceUnits() {
        return <div className="list-group lg-odd-black">,

            {this.state.ServiceUnitManagements.map(serviceUnitManagement =>
            <div className="list-group-item">
                {/*<div className="pull-right">
                        <div className="actions dropdown">
                            <a href="" data-toggle="dropdown" aria-expanded="true">
                                <i className="glyphicon glyphicon-option-vertical"/>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                    <NavLink to={`/serviceunitmanagements/${serviceUnitManagement.IdContrato}/${serviceUnitManagement.IdUnidad}`} >Editar</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>*/}
                <div className="media-body">
                    <div className="lgi-heading" onClick={this.handleUpdate.bind(this, serviceUnitManagement)}>{serviceUnitManagement.DescServicio}</div>
                </div>
            </div>
        )}
        </div>;
    }
    handleBack() {
        this.setState({
            mode: Mode.Read
        });
        this.props.history.push('/serviceunitmanagements/');
    }

    renderList() {
        return <div className="row">
            <div className="col-md-6">
                <div className="row">
                    <div className="card">
                        <div className="card-header bgm-BlueSeguricel">
                            <div className="row">
                                <h2>Unidades de Servicios</h2>
                                <div className="col-md-9" style={{ textAlign: 'right' }}>
                                    <button name="New" className="btn bgm-OrangeSeguricel" onClick={this.handleNew.bind(this)}>Agregar</button>
                                </div>
                            </div>
                        </div>
                        {/*this.props.mode == Utils.Mode.Read ? */this.showServiceUnits() /*: []*/}
                    </div>
                </div>
            </div>
        </div>;
    }
    renderList_() {
        let serviceunitmanagements = this.props.ServiceUnitManagements;
        return <div> {serviceunitmanagements.map(serviceunitmanagement =>

            this.renderNew(serviceunitmanagement)
        )}</div>;

    }
    renderBody() {
        let serviceunitmanagement = this.state.ServiceUnitManagement;
        return <section id="content">
            <div className="container">
                <div className="block-header">
                    <h2>Servicios</h2>
                    <div className="col-md-12" style={{ textAlign: 'right' }}>
                        <button className="btn  btn-lg bgm-info " style={{ width: '120px', height: '50px' }} onClick={() => { this.props.history.push('/'); }}>Salir</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    </div>
                </div>{(this.state.mode == Mode.Read) ?
                    this.renderList() :
                    this.renderNew(serviceunitmanagement)}
            </div>
        </section>;

    }
    renderNew(serviceunitmanagement) {
        this.setState({
            errors: ServiceUnitManagementsStore.validate(this.state.ServiceUnitManagement)
        });
        return <div className="col-md-12">
            <div className="card">
                <div className="card-header bgm-BlueSeguricel">
                    <h2>Gestion de permisologia de accesos a unidades de servicio</h2>
                </div>
                <div className="card-body card-padding">
                    <div className="row">
                        <div className="col-md-9" style={{ textAlign: 'right' }}>
                            <button name="Volver" className="btn bgm-OrangeSeguricel" onClick={this.handleBack.bind(this)}>Volver</button>
                            <button name="Volver" className="btn bgm-OrangeSeguricel" onClick={this.handleDelete.bind(this, serviceunitmanagement)}>Eliminar</button>
                            <button className="btn btn-lg bgm-info" id="btn_game_return" name="btn_game_return" onClick={this.handleSubmit.bind(this)} style={{ width: "120px", height: "50px" }} >Guardar</button>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-xs-6">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                                        <div className="fg-line">
                                            <input type="text" id="DescServicio" name="DescServicio" value={serviceunitmanagement.DescServicio} className={this.getClassName('DescServicio')} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur('DescServicio')} placeholder={this.getPlaceHolder('DescServicio', "Nombre del servicio")} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="row">
                                <div className="col-md-12 col-xs-12">
                                    <b><p className="c-black f-14">Notificaciones cuando ocurra un acceso</p></b>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 col-xs-3">
                                    <p className="c-gray f-14">Requieren Notificacion</p>
                                </div>
                                <div className="col-md-1 col-xs-1">
                                    <label className="checkbox checkbox-inline m-r-20 f-14 m-t-0">
                                        <input type="checkbox" checked={serviceunitmanagement.GestionRequiereConfirmacion} name="GestionRequiereConfirmacion" onChange={this.toggleCheckbox.bind(this)} />
                                        <i className="input-helper" />
                                    </label>
                                </div>
                                <div hidden={!serviceunitmanagement.GestionRequiereConfirmacion}>
                                    <div className="col-md-3 col-xs-3">
                                        <p className="c-gray f-14">Notificacion Por SMS</p>
                                    </div>
                                    <div className="col-md-1 col-xs-1">
                                        <label className="checkbox checkbox-inline m-r-20 f-14 m-t-0">
                                            <input type="checkbox" checked={serviceunitmanagement.GestionRequiereConfirmacion && serviceunitmanagement.GestionNotificacionSMS} name="GestionNotificacionSMS" onChange={this.toggleCheckbox.bind(this)} />
                                            <i className="input-helper" />
                                        </label>
                                    </div>
                                    <div className="col-md-3 col-xs-3">
                                        <p className="c-gray f-16">Notificacion por Correo</p>
                                    </div>
                                    <div className="col-md-1 col-xs-1">
                                        <label className="checkbox checkbox-inline m-r-20 f-14 m-t-0">
                                            <input type="checkbox" id="" name="GestionNotificacionEmail" checked={serviceunitmanagement.GestionRequiereConfirmacion && serviceunitmanagement.GestionNotificacionEmail} onChange={this.toggleCheckbox.bind(this)} />
                                            <i className="input-helper" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-xs-12">
                                    <b><p className="c-black f-14">Contactos</p></b>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-3">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className=" glyphicon glyphicon-user" /></span>
                                        <div className="fg-line">
                                            <input type="text" id="GestionContacto1" name="GestionContacto1" value={serviceunitmanagement.GestionContacto1} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur('GestionContacto1')} className={this.getClassName('GestionContacto1')} placeholder={this.getPlaceHolder('GestionContacto1', "Contacto")} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-3">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-briefcase" /></span>
                                        <div className="fg-line">
                                            {this.showJobTitles('GestionCargoContacto1', serviceunitmanagement.GestionCargoContacto1)}
                                            {/*<input type="text" id="GestionCargoContacto1" name="GestionCargoContacto1" value={serviceunitmanagement.GestionCargoContacto1} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur('GestionCargoContacto1')} className={this.getClassName('GestionCargoContacto1')} placeholder={this.getPlaceHolder('GestionCargoContacto1', "Cargo")} />*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-3">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-earphone" /></span>
                                        <div className="fg-line">
                                            <input type="text" id="GestionTelefonoContacto1" onKeyPress={(e) => onlyNumbers(e)} name="GestionTelefonoContacto1" value={serviceunitmanagement.GestionTelefonoContacto1} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur('GestionTelefonoContacto1')} className={this.getClassName('GestionTelefonoContacto1')} placeholder={this.getPlaceHolder('GestionTelefonoContacto1', "Telefono")} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-3">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span>
                                        <div className="fg-line">
                                            <input type="text" id="GestionEmailContacto1" name="GestionEmailContacto1" value={serviceunitmanagement.GestionEmailContacto1} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur('GestionEmailContacto1')} className={this.getClassName('GestionEmailContacto1')} placeholder={this.getPlaceHolder('GestionEmailContacto1', "Correo")} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-xs-3">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className=" glyphicon glyphicon-user" /></span>
                                        <div className="fg-line">
                                            <input type="text" id="GestionContacto2" name="GestionContacto2" value={serviceunitmanagement.GestionContacto2} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur('GestionContacto2')} className={this.getClassName('GestionContacto2')} placeholder={this.getPlaceHolder('GestionContacto2', "Contacto")} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-3">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-briefcase" /></span>
                                        <div className="fg-line">
                                            {this.showJobTitles('GestionCargoContacto2', serviceunitmanagement.GestionCargoContacto2)}
                                            {/*<input type="text" id="GestionCargoContacto2" name="GestionCargoContacto2" value={serviceunitmanagement.GestionCargoContacto2} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur('GestionCargoContacto2')} className={this.getClassName('GestionCargoContacto2')} placeholder={this.getPlaceHolder('GestionCargoContacto2', "Cargo")} />*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-3">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-earphone" /></span>
                                        <div className="fg-line">
                                            <input type="text" id="GestionTelefonoContacto2" onKeyPress={(e) => onlyNumbers(e)} name="GestionTelefonoContacto2" value={serviceunitmanagement.GestionTelefonoContacto2} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur('GestionTelefonoContacto2')} className={this.getClassName('GestionTelefonoContacto2')} placeholder={this.getPlaceHolder('GestionTelefonoContacto2', "Telefono")} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-3">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span>
                                        <div className="fg-line">
                                            <input type="text" id="GestionEmailContacto2" name="GestionEmailContacto2" value={serviceunitmanagement.GestionEmailContacto2} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur('GestionEmailContacto2')} className={this.getClassName('GestionEmailContacto2')} placeholder={this.getPlaceHolder('GestionEmailContacto2', "Correo")} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;

    }
}

export default connect(
    state => state.serviceunitmanagements, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(ServiceUnitManagementsStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(ServiceUnitManagementApp);