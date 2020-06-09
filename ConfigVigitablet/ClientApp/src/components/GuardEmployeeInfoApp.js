import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { actionCreators } from '../store/GuardEmployeeInfo';
import * as GuardEmployeeInfoStore from '../store/GuardEmployeeInfo';
import { SurveillanceCompany } from '../store/SurveillanceCompany';
import { defaultConfigTurn, ConfigTurn } from '../store/ConfigTurn';
import { Mode, defaultListDays, SetWeekDays, GetWeekDays, Now, setDate, onlyNumbers } from '../store/Utils';
import * as Access from '../store/Access';
import { BaseApp } from '../components/BaseApp';
import { isEmpty } from '../store/Utils';
import * as Settings from '../store/MyConfig';

/*type GuardEmployeeInfoProps =
    GuardEmployeeInfoStore.GuardEmployeeState
    & typeof GuardEmployeeInfoStore.actionCreators
    & RouteComponentProps<{ id }>;
type HtmlEvent = React.ChangeEvent<HTMLSelectElement>;*/
class GuardEmployeeInfoApp extends BaseApp {
    state = {
        ... this.defaultState,
        objeto: "guardemployee",
        listObjetos: "guardemployees",
        defaultObjeto: GuardEmployeeInfoStore.defaultGuardEmployee,
        guardemployee: GuardEmployeeInfoStore.defaultGuardEmployee,
        guardemployee_old: GuardEmployeeInfoStore.defaultGuardEmployee,
        listdays: defaultListDays,
        file: '', imagePreviewUrl: '', fileName: '', errorMessage: [''],
        relationshipTypes: [],
        surveillancecompany: GuardEmployeeInfoStore.defaultEmpresa,
        configturn: defaultConfigTurn,
        persontime: Access.defaultUnidadPersonaHorario,
        persontimeaccess: [],
        arAccesses: [],
        arAccesos: [],
        mode: Mode.Read,
        guardemployees: [],
        fieldList: {
            IdDocIdentidad: { ...this.defaultField, description: "Doc. Identidad" },
            PrimerApellido: { ...this.defaultField, description: "Primer Apellido" },
            SegundoApellido: { ...this.defaultField, description: "Segundo Apellido" },
            PrimerNombre: { ...this.defaultField, description: "Primer Nombre" },
            SegundoNombre: { ...this.defaultField, description: "Segundo Nombre" },
            FechaNacimiento: { ...this.defaultField, description: "Fecha Nacimiento" },
            TelefonoMovil1: { ...this.defaultField, description: "Telefono Movil" },
            RutaImagenVig: { ...this.defaultField, description: "Foto" },
        },
        getObjetos: "getGuardEmployees"
    }

    validate = guardemployee => {
        // true means invalid, so our conditions got reversed
        return {
            ContactoVig1: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: isEmpty(guardemployee.ContactoVig1) },
            ContactoVig2: { errorMessage: "Falta nombre segundo contacto", isRequired: true, valid: true, isEmpty: isEmpty(guardemployee.ContactoVig2) },
            IdParentescoVig1: { errorMessage: "Falta Parentesco", isRequired: true, valid: guardemployee.IdParentescoVig1 > 0, isEmpty: false },
            IdParentescoVig2: { errorMessage: "Falta Parentesco", isRequired: true, valid: guardemployee.IdParentescoVig2 > 0, isEmpty: false },
            TelefonosContactoVig1: { errorMessage: "Falta telefono contacto", isRequired: true, valid: true, isEmpty: isEmpty(guardemployee.TelefonosContactoVig1) },
            TelefonosContactoVig2: { errorMessage: "Falta telefono contacto", isRequired: true, valid: true, isEmpty: isEmpty(guardemployee.TelefonosContactoVig2) },
            EmailVig: { errorMessage: "Falta email contacto", isRequired: true, valid: true, isEmpty: isEmpty(guardemployee.EmailVig) },
            DireccionVig: { errorMessage: "Falta direcion contacto", isRequired: true, valid: true, isEmpty: isEmpty(guardemployee.DireccionVig) },
            RutaImagenVig: { errorMessage: "Falta imagen contacto", isRequired: true, valid: true, isEmpty: isEmpty(guardemployee.RutaImagenVig) },
            IdEmpresaVigilancia: { errorMessage: "Falta empresa contacto", isRequired: true, valid: guardemployee.IdEmpresaVigilancia > 0, isEmpty: false },
            //FechaUltActualizacion: { errorMessage: "Falta fecha contacto", isRequired: true, valid: true, isEmpty: isEmpty(guardemployee.FechaUltActualizacion) },
            //IdUsuario: { errorMessage: "Falta usuario", isRequired: true, valid: true, isEmpty: guardemployee.IdUsuario === 0 }
        };
    }
    /*constructor() {
       // super();
    }*/

    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            //super.componentWillMount();
            this.props.getSession();
            this.props.getGuardEmployees();
            this.props.getSurveillanceCompanys();
            this.props.getRelationship();
            this.props.getAccesos(/*this.props.contract.Id*/);
            //let IdPersonaVig = parseInt(this.props.match.params.id) || 0;
            /*if (IdPersonaVig !== 0) {
                this.props.getGuardEmployee(IdPersonaVig);
                this.props.getConfigTurns(IdPersonaVig);

                const idUnit = 10;
                const idType = 7;
                this.props.getHorarios(idUnit, idType, IdPersonaVig);
                this.setState({
                    guardemployee: this.props.guardemployee,
                    imagePreviewUrl: this.props.guardemployee.RutaImagenVig || '',
                });
                this.props.getCompany(this.state.guardemployee.IdEmpresaVigilancia);
                
            } else {
                //
            }*/

        } catch (reason) {

            console.log('Error in Component Will Mount:' + reason);
        }

    }
    componentDidMount() {
        try {
            //
        } catch (reason) {
            console.log("Reason in ComponentDidMount GuardEmployeeInfoApp:" + reason);
        }
    }


    procesarResponse(nextProps) {
        let id = parseInt(nextProps.match.params.id) || 0;
        if (id !== 0) {
            this.props.getGuardEmployee(id);
            this.setState({
                mode: Mode.Update
            });
        }
        if (this.props.accesses !== nextProps.accesses) {
            let arr = [];
            let arr_ = [];
            const idContract = this.props.contract.Id;
            nextProps.accesses.forEach !== undefined ? nextProps.accesses.forEach(access => {
                arr.push(access.Id);
                arr_.push(this.selectedAccesses(nextProps.persontimeaccess, access.Id));
            }) : this.props.getAccesos(/*idContract*/);
            this.setState({
                arAccesses: arr,
                arAccesos: arr_,
            });
        }
        if (this.props.fileName !== nextProps.fileName) {
            this.setState({
                guardemployee: {
                    ...this.state.guardemployee,
                    ['RutaImagenVig']: nextProps.fileName
                }
            });

        }

        if (this.props.guardemployee !== nextProps.guardemployee) {
            this.setState({
                imagePreviewUrl: nextProps.guardemployee.RutaImagenVig,
            });

        }

        if (this.props.persontime !== nextProps.persontime) {
            let persontime_ = null;
            if (nextProps.persontime.length !== undefined) {
                persontime_ = nextProps.persontime[0];
            } else {
                persontime_ = nextProps.persontime;
            }
            if (persontime_ !== undefined) {
                this.setState({
                    persontime: persontime_,
                    listdays: SetWeekDays(persontime_.Dias || '0000000')
                });
                this.props.GetPersonAccessByTime(persontime_.IdHorario);
            }
        }
        if (this.props.persontimeaccess !== nextProps.persontimeaccess) {
            this.setState({
                persontimeaccess: nextProps.persontimeaccess
            });
            this.setAcccesos(nextProps.persontimeaccess);
        }
    }

    /*shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextState.mode !== this.state.mode && nextState.mode === Mode.Read) {
            if (this.state.guardemployee !== GuardEmployeeInfoStore.defaultGuardEmployee)
                this.setState({
                    guardemployee: GuardEmployeeInfoStore.defaultGuardEmployee,
                    file: '',
                    imagePreviewUrl: '',
                    fileName: '',
                });
        }
        return true;
    }*/

    componentWillUpdate() {
    }
    componentDidUpdate() {
    }
    componentWillUnmount() {
    }

    getAccesos = () => {
        const arr = this.state.arAccesos;
        const arr_ = this.state.arAccesses;
        const IdUsuario = Settings.default.key.user;
        let arResult = [];
        let persontimeaccess = {
            IdHorario: this.props.IdHorario,
            IdAcceso: 0,
            Acceso: '',
            IdUsuario: IdUsuario,
            FechaActivacion: Now(),
            Usuario: '',
        };
        arr.forEach((element, index) => {
            if (element) {
                arResult.push(arr_[index]);
            }
            //persontimeaccess.IdAcceso = arr_[index];
            //this.props.AddPersonTimeAccess(persontimeaccess);
        });
        return arResult;
    }
    processSubmit = () => {
        switch (this.state.mode) {
            case Mode.Create:
                this.props.create(this.state.guardemployee, this.state.persontime, this.getAccesos());
                break;
            case Mode.Update:
                this.props.update(this.state.guardemployee, this.state.persontime, this.getAccesos());
                break;
            case Mode.Delete:
                this.props.delete(this.state.guardemployee, this.state.persontime, this.getAccesos());
                break;
            default:
                break;
        }
    }

    setDefaultGuardEmployee() {
        this.setState({
            guardemployee: GuardEmployeeInfoStore.defaultGuardEmployee,
            file: '',
            imagePreviewUrl: '',
            fileName: ''
        });
    }

    initAccesos() {
        let arr_ = [];
        this.props.accesses.forEach(access => {
            arr_.push(false);
        });
        this.setState({
            arAccesos: arr_,
        });
    }

    handleNewFunctions() {
        //this.setDefaultGuardEmployee();
        let arr_ = [];
        this.props.accesses.forEach(access => {
            arr_.push(false);
        });

        this.setState({
            file: '',
            imagePreviewUrl: '',
            fileName: '',
            persontime: Access.defaultUnidadPersonaHorario,
            persontimeaccess: [],
            listdays: [0, 0, 0, 0, 0, 0, 0],
            arAccesos: arr_,
        });
    }

    handleUpdateFunctions(guardemployee) {
        this.setState({
            imagePreviewUrl: guardemployee.RutaImagenVig,
            persontime: Access.defaultUnidadPersonaHorario,
            persontimeaccess: [],
            listdays: [0, 0, 0, 0, 0, 0, 0]
        });
        this.initAccesos();
        this.props.getConfigTurns(guardemployee.IdPersonaVig);
        const idUnit = 10;
        const idType = 7;
        this.props.getHorarios(idUnit, idType, guardemployee.IdPersonaVig);
        this.props.getCompany(guardemployee.IdEmpresaVigilancia);
    }

    /////////////EVENTO AL CAMBIAR LOS COMBOS
    handleComboChangeRT = e => {
        this.setState({
            [e.target.name]: e.target.value,
            guardemployee: {
                ...this.state.guardemployee,
                ['Id' + e.target.name]: e.target.value
            }
        });
    }
    toggleCheckbox(e) {
        const index = e.target.value;
        var arr = this.state.listdays;
        arr[index] === 1 ? arr[index] = 0 : arr[index] = 1;
        this.setState({
            listdays: arr,
            persontime: {
                ...this.state.persontime,
                Dias: GetWeekDays(arr)
            }
        });
    }

    toggleCheckboxAccesses(e) {
        const index = e.target.name;
        let arr = this.state.arAccesos;
        arr[index] = !arr[index];
        this.setState({
            arAccesos: arr
        });
    }

    //EVENTO PARA LA CAPTURA DE CAMBIOS EN LOS INPUT
    handleChangePersonTime(e) {
        e.preventDefault();
        this.setState({
            persontime: {
                ...this.state.persontime,
                [e.target.name]: e.target.value,
                FechaUltActualizacion: new Date().toISOString().split('T')[0]
            }
        });
    }

    //EVENTO QUE MANEJA LA CARGA Y SUBIDA DE LA IMAGEN
    _handleImageChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        this.props.changeImage(e.target.files[0]);
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result || "",
                fileName: this.props.fileName
            });
        };
        reader.readAsDataURL(file);
    }


    _handleSubmit(e) {
        // if (this.canBeSubmitted()) {
        e.preventDefault();
        switch (this.state.mode) {
            case Mode.Create:
                this.props.setModeRead();
                break;
            case Mode.Update:
                this.props.update(this.state.guardemployee, this.state.persontime, this.getAccesos());
                break;
            case Mode.Delete:
                this.props.delete(this.state.guardemployee.IdPersonaVig);
            default:
                break;
        }
    }

    isCheckedDay(index) {
        return this.state.listdays[index] === 1;
    }

    FileUpload() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} width="150px" height="150px" />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (<div className="col-md-4">
            <div className="previewComponent">
                <form onSubmit={(e) => this._handleSubmit(e)} action="/upload/image" method="post">
                    <input className="fileInput" type="file" required onChange={(e) => this._handleImageChange(e)} />
                    <button className="submitButton"
                        type="submit"
                        onClick={(e) => this._handleSubmit(e)}>Upload Image</button>
                </form>
                <div className="imgPreview">
                    {$imagePreview}
                </div>
            </div>
        </div>);

    }

    //METODO PARA MOSTRAR EL SELECT
    showSurveillanceCompanys() {
        const defaultOption = 'Seleccione Empresa de Vigilancia...';
        let options = this.props.surveillancecompanys === null ? [] : (this.props.surveillancecompanys !== undefined ? this.props.surveillancecompanys.map(function (option) {
            return (
                <option key={option.IdEmpresaVigilancia} value={option.IdEmpresaVigilancia}>
                    {`${option.descEmpresaVigilancia}`}
                </option>
            )
        }) : []);
        return (<select className='form-control input-sm' name="IdEmpresaVigilancia" onChange={this.handleChange.bind(this)} value={this.state.guardemployee.IdEmpresaVigilancia}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }
    //METODO PARA MOSTRAR EL SELECT
    showRelationships(name_, value_) {
        const defaultOption = 'Seleccione Parentesco...';
        const _relationshipTypes = this.props.relationshipTypes || [];
        let options = _relationshipTypes.map !== undefined ? _relationshipTypes.map(function (option) {
            console.log(value_);
            return (
                <option key={option.IdParentesco} value={option.IdParentesco}>
                    {option.DescParentesco}
                </option>
            )
        }) : "";
        return (<select className='form-control input-sm' name={name_} onChange={this.handleComboChangeRT.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    setAcccesos(persontimeaccess) {
        let arr = [];
        let arr_ = [];
        const idContract = this.props.contract.Id;
        this.props.accesses.forEach !== undefined ? this.props.accesses.forEach(access => {
            arr.push(access.Id);
            arr_.push(this.selectedAccesses(persontimeaccess, access.Id));
        }) : this.props.getAccesos(/*idContract*/);
        this.setState({
            arAccesses: arr,
            arAccesos: arr_
        });
    }
    selectedAccesses(persontimeaccess, IdAccess) {
        return persontimeaccess.find(persontimeaccess_ => persontimeaccess_.IdAcceso === IdAccess) !== undefined
    }

    initializeAccesses() {
        this.state.arAccesos.forEach(
            (element, index) => {

            }
        );
    }

    renderNew() {
        const _guardemployee = this.state.guardemployee;
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} width="150px" height="150px" />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        var days = ["L", "M", "M", "J", "V", "S", "D"];
        return (<div className="container">
            <div className="col-md-9 col-md-offset-3">
                <h4>Informacion del vigilante</h4>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-9">
                    <div className="col-xs-12 col-md-6">
                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>
                            <input type="text" className="form-control input-sm" name="PrimerApellido" value={_guardemployee.PrimerApellido} onChange={this.handleChange.bind(this)} placeholder="Primer Apellido" />
                        </div>
                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>
                            <input type="text" className="form-control input-sm" name="SegundoApellido" value={_guardemployee.SegundoApellido} onChange={this.handleChange.bind(this)} placeholder="Segundo Apellido" />

                        </div>
                    </div>

                    <div className="col-xs-12 col-md-6">
                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>
                            <input type="text" className="form-control input-sm" name="PrimerNombre" value={_guardemployee.PrimerNombre} onChange={this.handleChange.bind(this)} placeholder="Primer Nombre" />
                        </div>
                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>
                            <input type="text" className="form-control input-sm" name="SegundoNombre" value={_guardemployee.SegundoNombre} onChange={this.handleChange.bind(this)} placeholder="Segundo Nombre" />

                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-credit-card" /></span>
                            <div className="fg-line">
                                <input type="text" className="form-control input-sm" name="IdDocIdentidad" value={_guardemployee.IdDocIdentidad} onChange={this.handleChange.bind(this)} placeholder="Cedula" />
                            </div>
                        </div>

                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-envelope" /></span>
                            <div className="fg-line">
                                <input type="text" className="form-control input-sm" name="EmailVig" value={_guardemployee.EmailVig} onChange={this.handleChange.bind(this)} placeholder="Email" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-calendar" /></span>
                            <div className="fg-line">
                                <input type="date" className="form-control input-sm" name="FechaNacimiento" value={setDate(_guardemployee.FechaNacimiento)} onChange={this.handleChange.bind(this)} placeholder="Fecha de nacimiento " />
                            </div>
                        </div>
                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-earphone" /></span>
                            <div className="fg-line">
                                <input type="text" className="form-control input-sm" name="TelefonoMovil1" value={_guardemployee.TelefonoMovil1} onChange={this.handleChange.bind(this)} placeholder="Telefono de Hab" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-12">
                        <p className="c-black f-500 m-t-20 m-b-20">Direccion</p>
                        <div className="form-group">
                            <div className="fg-line">
                                <textarea className="form-control auto-size" name="DireccionVig" value={_guardemployee.DireccionVig} onChange={this.handleChange.bind(this)}
                                    placeholder="Escribe aqui..." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-md-3">
                    <div className="fileinput fileinput-new" data-provides="fileinput">
                        <div className="fileinput-preview thumbnail" data-trigger="fileinput">
                            {$imagePreview}
                        </div>

                        <span className="btn btn-info btn-file">
                            <span className="fileinput-new">Seleccione...</span>
                            <span className="fileinput-exists">Cambiar</span>
                            <form onSubmit={(e) => this._handleSubmit(e)} action="/upload/image" method="post">
                                <input className="fileInput"
                                    type="file"
                                    required
                                    onChange={(e) => this._handleImageChange(e)} />
                            </form>
                        </span>
                        <a href="#" className="btn btn-danger fileinput-exists"
                            data-dismiss="fileinput">Quitar</a>

                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-md-12">
                <p className="c-black f-500 m-t-20 m-b-20">Referencias</p>
                <div className="col-xs-4">
                    <div className="input-group input-sm">
                        <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>
                        <div className="fg-line">
                            <input type="text" className="form-control input-sm" name="ContactoVig1" value={_guardemployee.ContactoVig1} onChange={this.handleChange.bind(this)} placeholder="Apellidos y Nombres de Contacto" />
                        </div>
                    </div>
                </div>
                <div className="col-xs-4">
                    <div className="input-group input-sm">
                        <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>
                        <div className="fg-line">
                            {this.showRelationships("ParentescoVig1", _guardemployee.IdParentescoVig1 || 0)}
                        </div>
                    </div>
                </div>
                <div className="col-xs-4">
                    <div className="input-group  input-sm">
                        <span className="input-group-addon  input-sm"><i className="glyphicon glyphicon-phone" /></span>
                        <div className="fg-line">
                            <input type="text" className="form-control  input-sm" onKeyPress={(e) => onlyNumbers(e)} name="TelefonosContactoVig1" value={_guardemployee.TelefonosContactoVig1} onChange={this.handleChange.bind(this)} placeholder="Telefono" />
                        </div>
                    </div>
                </div>

                <div className="col-xs-4">
                    <div className="input-group input-sm">
                        <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>
                        <div className="fg-line">
                            <input type="text" className="form-control input-sm" name="ContactoVig2" value={_guardemployee.ContactoVig2} onChange={this.handleChange.bind(this)} placeholder="Apellidos y Nombres de Contacto" />
                        </div>
                    </div>
                </div>
                <div className="col-xs-4">
                    <div className="input-group input-sm">
                        <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>
                        <div className="fg-line">
                            {this.showRelationships("ParentescoVig2", _guardemployee.IdParentescoVig2 || 0)}
                        </div>
                    </div>
                </div>
                <div className="col-xs-4">
                    <div className="input-group input-sm">
                        <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-phone" /></span>
                        <div className="fg-line">
                            <input type="text" className="form-control input-sm" onKeyPress={(e) => onlyNumbers(e)} name="TelefonosContactoVig2" value={_guardemployee.TelefonosContactoVig2} onChange={this.handleChange.bind(this)} placeholder="Telefono" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xs-12 col-md-12">
                <p className="c-black f-500 m-t-20 m-b-20">Empresa de Vigilancia</p>
                {this.showSurveillanceCompanys()}
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-3">
                    <div className="col-md-3" style={{ height: '300px', width: '200px', border: '1px solid #ddd', background: '#f1f1f1', overflowY: 'scroll' }}>
                        <p className="c-black f-16"><b>Tipo de acceso permitido</b></p>
                        {this.props.accesses.map((access, index) =>
                            <div className="row">
                                <div className="col-md-3 col-xs-3">
                                    <label className="checkbox checkbox-inline m-r-20 f-16 m-t-0">
                                        <input type="checkbox" id="" checked={this.state.arAccesos[index]} name={index.toString()} value={access.Id} onChange={this.toggleCheckboxAccesses.bind(this)} />
                                        <i className="input-helper" />
                                        <p className="c-gray"> {access.NombreAcceso}</p>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-xs-12 col-md-6">
                    {this.weekDaysEmpl()}
                </div>
                <div className="col-xs-12 col-md-6">
                    <p className="c-black f-16"><b>Horario permitido</b></p>
                    <div className="row">
                        <div className="col-md-2 col-xs-2">
                            <p className="c-gray f-16"> <b>Primer intervalo</b></p>
                        </div>
                        <div className="col-md-1 col-xs-1">
                            <p className="c-gray f-16">Hora Inicio</p>
                        </div>
                        <div className="col-md-3 col-xs-3">
                            <div className="input-group form-group input-sm">
                                <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-time" /></span>
                                <div className="dtp-container">
                                    <input type='time' className="form-control time-picker input-sm" name="HoraInicio1" value={this.state.persontime.HoraInicio1} onChange={this.handleChangePersonTime.bind(this)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-xs-2">
                            <p className="c-gray f-16">Duracion</p>
                        </div>
                        <div className="col-md-3 col-xs-3">
                            <div className="input-group form-group input-sm">
                                <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-time" /></span>
                                <div className="dtp-container">
                                    <input type='number' className="form-control input-sm" name="Duracion1" value={this.state.persontime.Duracion1} onChange={this.handleChangePersonTime.bind(this)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1 col-xs-1">
                            <p className="c-gray f-16">Horas</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2 col-xs-2">
                            <p className="c-gray f-16"> <b>Segundo intervalo</b></p>
                        </div>
                        <div className="col-md-1 col-xs-1">
                            <p className="c-gray f-16">Hora Inicio</p>
                        </div>
                        <div className="col-md-3 col-xs-3">
                            <div className="input-group form-group input-sm">
                                <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-time" /></span>
                                <div className="dtp-container">
                                    <input type='time' className="form-control time-picker input-sm" name="HoraInicio2" value={this.state.persontime.HoraInicio2} onChange={this.handleChangePersonTime.bind(this)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-xs-2">
                            <p className="c-gray f-16">Duracion</p>
                        </div>
                        <div className="col-md-3 col-xs-3">
                            <div className="input-group form-group input-sm">
                                <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-time" /></span>
                                <div className="dtp-container">
                                    <input type='number' className="form-control input-sm" name="Duracion2" value={this.state.persontime.Duracion2} onChange={this.handleChangePersonTime.bind(this)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1 col-xs-1">
                            <p className="c-gray f-16">Horas</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

    summary() {
        let arrErrors = this.state.errorMessage;
        {
            arrErrors.forEach((error) => {
                return (<li>
                    error
                </li>);
            });
        }
    }
    validateEmail(value) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }


    renderListBody(list) {
        this.state.records = this.state.guardemployees;
        return list.map((guardemployee, index) =>
            (<tr key={index} onDoubleClick={this.handleUpdate.bind(this, guardemployee)}>
                <td>{guardemployee.IdDocIdentidad}</td>
                <td>{guardemployee.PrimerApellido}</td>
                <td>{guardemployee.SegundoApellido}</td>
                <td>{guardemployee.PrimerNombre}</td>
                <td>{guardemployee.SegundoNombre}</td>
                <td>{this.showDate(guardemployee.FechaNacimiento)}</td>
                <td>{guardemployee.TelefonoMovil1}</td>
                <td><img src={guardemployee.RutaImagenVig} width="50px" height="50px" /></td>


            </tr>)
        );
    }
    showDate(fecha) {
        if (fecha) {
            return fecha.substring(0, 10).split("-").reverse().join("-");
        }
    }
    contactos() {
        //const isDisabled = Object.keys(errors).some(x => errors[x]);
        //const isDisabled = Object.keys(this.state.errors).some(x => this.state.errors[x]);
        const errors = this.state.errors;
        return (<div><div className="row">
            <div className="col-xs-4">
                <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                    <div className="fg-line">
                        <input type="text" maxLength={200} pattern=".{3,}" required title="3 characters minimum" minLength={3} className={this.getClassName('ContactoVig1')} ref="ContactoVig1" name="ContactoVig1" onBlur={this.handleBlur('ContactoVig1')} onChange={this.handleChange.bind(this)} value={this.state.guardemployee.ContactoVig1} placeholder={this.getPlaceHolder('ContactoVig1', "Contacto")} />
                    </div>
                </div>
            </div>
            <div className="col-xs-4">
                <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                    <div className="fg-line">
                        {/*<input type="text" className={this.getClassName('IdParentescoVig1')} name="IdParentescoVig1" value={this.state.guardemployee.IdParentescoVig1} onBlur={this.handleBlur('IdParentescoVig1')} onChange={this.handleChange.bind(this)} placeholder={this.getPlaceHolder('IdParentescoVig1', "Parentesco")} />*/}
                        {this.showRelationships("ParentescoVig1", this.state.guardemployee.IdParentescoVig1 || 0)}
                    </div>
                </div>
            </div>
            <div className="col-xs-4">
                <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-phone" /></span>
                    <div className="fg-line">
                        <input type="text" className={this.getClassName('TelefonosContactoVig1')} name="TelefonosContactoVig1" onKeyPress={(e) => onlyNumbers(e)} value={this.state.guardemployee.TelefonosContactoVig1} onBlur={this.handleBlur('TelefonosContactoVig1')} onChange={this.handleChange.bind(this)} placeholder="Telefono" />
                    </div>
                </div>
            </div>
        </div>
            <div className="row">
                <div className="col-xs-4">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                        <div className="fg-line">
                            <input type="text" className={this.getClassName('ContactoVig2')} name="ContactoVig2" value={this.state.guardemployee.ContactoVig2} onBlur={this.handleBlur('ContactoVig2')} onChange={this.handleChange.bind(this)} placeholder={this.getPlaceHolder('ContactoVig2', '"Contacto"')} />
                        </div>
                    </div>
                </div>
                <div className="col-xs-4">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                        <div className="fg-line">
                            {/*<input type="text" className={this.getClassName('IdParentescoVig2')} name="IdParentescoVig2" value={this.state.guardemployee.IdParentescoVig2} onBlur={this.handleBlur('IdParentescoVig2')} onChange={this.handleChange.bind(this)} placeholder={this.getPlaceHolder('IdParentescoVig2', 'Parentesco')} /¨*/}
                            {this.showRelationships("ParentescoVig2", this.state.guardemployee.IdParentescoVig2 || 0)}
                        </div>
                    </div>
                </div>
                <div className="col-xs-4">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-phone" /></span>
                        <div className="fg-line">
                            <input type="text" className={this.getClassName('TelefonosContactoVig2')} name="TelefonosContactoVig2" onKeyPress={(e) => onlyNumbers(e)} value={this.state.guardemployee.TelefonosContactoVig2} onBlur={this.handleBlur('TelefonosContactoVig2')} onChange={this.handleChange.bind(this)} placeholder={this.getPlaceHolder('TelefonosContactoVig2', 'Telefono')} />
                        </div>
                    </div>
                </div>
            </div>
            {/*<button disabled={isDisabled}>Sign up</button>*/}
        </div>);
    }

    tipoAcceso() {
        return (<div className="col-md-12">
            <div className="col-md-6">
                <div className="row">
                    <p className="c-black f-14"><b>Tipo de acceso permitido</b></p>
                </div>
                <div className="row">
                    <div className="col-md-3 col-xs-3">
                        <label className="checkbox checkbox-inline m-r-20 f-14 m-t-0">
                            <input type="checkbox" id="" name="" value="" />
                            <i className="input-helper" />
                            <p className="c-gray"> Telefonico</p>
                        </label>
                    </div>
                    <div className="col-md-12 col-xs-12">
                        <label className="checkbox checkbox-inline m-r-20 f-14 m-t-0">
                            <input type="checkbox" id="" name="" value="" />
                            <i className="input-helper" />
                            <p className="c-gray"> Huella digital</p>
                        </label>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="row">
                    <p className="c-black f-14"><b>Accesos Autorizados</b></p>
                </div>
                <div className="row">
                    <div className="col-md-3 col-xs-3">
                        <label className="checkbox checkbox-inline m-r-20 f-14 m-t-0">
                            <input type="checkbox" id="" name="" value="" />
                            <i className="input-helper" />
                            <p className="c-gray"> Estacionamiento</p>
                        </label>
                    </div>
                    <div className="col-md-12 col-xs-12">
                        <label className="checkbox checkbox-inline m-r-20 f-14 m-t-0">
                            <input type="checkbox" id="" name="" value="" />
                            <i className="input-helper" />
                            <p className="c-gray"> Paso Peatonal</p>
                        </label>
                    </div>
                </div>
            </div>
        </div>);
    }

    toggleDay(e) {
        const index = e.target.value;
        var arr = this.state.listdays;
        if (this.state.listdays[index] === 1) {
            arr[index] = 0;
        } else {
            arr[index] = 1;
        }
        this.setState({
            listdays: arr,
            persontime: {
                ...this.state.persontime,
                Dias: GetWeekDays(arr)
            }
        });
    }
    weekDaysEmpl() {
        const days = ["Lun ", "Mar ", "Mie ", "Jue ", "Vie ", "Sab ", "Dom "];
        return <table><tr>
            {days.map((item, index) => (
                <td>
                    {item}<input type="checkbox" value={index} checked={this.isCheckedDay(index)} onChange={this.toggleDay.bind(this)} />
                </td>
            ))}
        </tr></table>;
    }
    weekDaysEmpl_() {
        var days = ["L", "M", "M", "J", "V", "S", "D"];
        let dias = this.state.listdays;
        return (<div className="row">
            <div className="col-md-6">
                <p className="c-black f-14"><b>Dias de la semana</b></p>
                {days.map((item, index) => (
                    <div className="col-md-1 col-xs-1">
                        <p className="c-gray f-14"> {item}</p>
                        <label className="checkbox checkbox-inline input-sm">
                            <input type="checkbox" className="form-control input-sm" value={index} checked={this.isCheckedDay(dias[index])} onChange={this.toggleCheckbox.bind(this)} />

                        </label>
                    </div>
                ))}
            </div>
        </div>);

    }
    showDiasSemanasGuardia(DiasSemanasGuardia) {
        const days = ["L", "M", "M", "J", "V", "S", "D"];
        const arDays = SetWeekDays(DiasSemanasGuardia);
        return (<div className="col-md-8">
            <div className="row">
                {days.map((item, index) => (
                    <div className="col-md-1 col-xs-1">
                        <p className="c-gray f-16"> {item}</p>
                        <label className="checkbox checkbox-inline">
                            <input type="checkbox" value={index} defaultChecked={this.isCheckedDay(arDays[index])} />
                            <i className="input-helper" />
                        </label>
                    </div>
                ))}
            </div>
        </div>);

    }
    showConfigTurns() {
        let _configturns = this.props.configturns ? (this.props.configturns.map !== undefined ? this.props.configturns : []) : [];
        if (_configturns.length === 0) {
            return [];
        } else {
            return (<div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">

                        <p className="c-black f-14"><b>Guardias</b></p>
                        <Link className='btn btn-default pull-left' to={`/configturns/`}>Agregar</Link>

                    </div>
                </div>
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                            {/*<th></th>*/}
                            <th>Dias de la Semana</th>
                            <th>Hora Inicio</th>
                            <th>Hora Fin</th>
                        </thead>
                        <tbody>
                            {_configturns.map(_configturn =>
                                <tr>
                                    {/*<td>
                                        <Link className='btn btn-default pull-left' to={`/configturns/${_configturn.IdGuardia}`}>Editar</Link>
                                    </td>*/}
                                    <td>
                                        {this.showDiasSemanasGuardia(_configturn.DiasSemanasGuardia)}
                                    </td>
                                    <td>
                                        {_configturn.HoraInicioGuardia}
                                    </td>
                                    <td>
                                        {_configturn.HoraFinGuardia}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>);
        }
    }

    EmpresaVigilancia() {
        return (<div className="card">
            <div className="card-header bgm-BlueSeguricel">
                <h2>Empresa de Vigilancia</h2>
            </div>
            <div className="card-body card-padding">
                <div className="row">
                    <div className="input-group input-sm">
                        <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-tower" /></span>
                        <div className="fg-line">
                            <input type="text" className="form-control input-sm" name="descEmpresaVigilancia" defaultValue={this.props.surveillancecompany.descEmpresaVigilancia} placeholder="Nombre" />
                        </div>
                    </div>
                    <div className="input-group input-sm">
                        <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-earphone" /></span>
                        <div className="fg-line">
                            <input type="text" className="form-control input-sm" name="TelefonosEmpresaVigilancia" defaultValue={this.props.surveillancecompany.TelefonosEmpresaVigilancia} placeholder="Telefono" />
                        </div>
                    </div>
                    <div className="input-group input-sm">
                        <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-envelope" /></span>
                        <div className="fg-line">
                            <input type="text" className="form-control input-sm" name="EmailEmpresaVigilancia" defaultValue={this.props.surveillancecompany.EmailEmpresaVigilancia} placeholder="Email" />
                        </div>
                    </div>
                </div>
                <p className="c-black f-500 m-t-20 m-b-20">Direccion</p>
                <div className="row">
                    <div className="form-group">
                        <div className="fg-line">
                            <textarea className="form-control auto-size input-sm" name="DireccionEmpresaVigilancia" defaultValue={this.props.surveillancecompany.DireccionEmpresaVigilancia}
                                placeholder="Escribe aqui..." />
                        </div>
                    </div>
                </div>
                <p className="c-black f-500 m-t-20 m-b-20">Contactos</p>
                <div className="row">
                    <div className="input-group input-sm">
                        <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>
                        <div className="fg-line">
                            <input type="text" className="form-control input-sm" name="PersonaContactoEmpresaVigilancia1" defaultValue={this.props.surveillancecompany.PersonaContactoEmpresaVigilancia1} placeholder="Contacto" />
                        </div>
                    </div>
                    {/*<div className="col-xs-4">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className=" glyphicon glyphicon-credit-card"/></span>
                                        <div className="fg-line">
                                            <input type="text" className="form-control" placeholder="Cargo" />
                                        </div>
                                    </div>
                                </div>*/}

                    <div className="input-group input-sm">
                        <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-phone" /></span>
                        <div className="fg-line">
                            <input type="text" className="form-control input-sm" name="TelefonosPersonaContactoEmpresaVigilancia1" defaultValue={this.props.surveillancecompany.TelefonosPersonaContactoEmpresaVigilancia1} placeholder="Telefono" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="input-group input-sm">
                        <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>
                        <div className="fg-line">
                            <input type="text" className="form-control input-sm" name="PersonaContactoEmpresaVigilancia2" value={this.props.surveillancecompany.PersonaContactoEmpresaVigilancia2} placeholder="Contacto" />
                        </div>
                    </div>
                    {/*<div className="col-xs-4">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className=" glyphicon glyphicon-credit-card"/></span>
                                        <div className="fg-line">
                                            <input type="text" className="form-control" placeholder="Cargo" />
                                        </div>
                                    </div>
                                </div>*/}
                    <div className="input-group input-sm">
                        <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-phone" /></span>
                        <div className="fg-line">
                            <input type="text" className="form-control input-sm" name="TelefonosPersonaContactoEmpresaVigilancia2" defaultValue={this.props.surveillancecompany.TelefonosPersonaContactoEmpresaVigilancia2} placeholder="Telefono" />
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

    initializeRecords() {
        this.state.records = this.state.guardemployees || [];
    }
}
// Wire up the React component to the Redux store
export default connect(
    state => state.guardemployee, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(GuardEmployeeInfoStore.actionCreators, dispatch)             // Selects which action creators are merged into the component's props
)(GuardEmployeeInfoApp);
