import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as EmployeeInfoStore from '../store/EmployeeInfo';
import { ErrorClass, DefaultClass } from '../store/Errors';
import { defaultMaintenanceCompany } from '../store/MaintenanceCompany';
import { defaultConfigTurn } from '../store/ConfigTurn';
import { Mode, SetWeekDays, defaultListDays, Now, onlyNumbers, GetWeekDays, setDate, isEmpty } from '../store/Utils';
import * as Access from '../store/Access';
import { BaseApp } from '../components/BaseApp';
import * as Utils from '../store/Utils';


/*type EmployeeInfoProps =
    EmployeeInfoStore.EmployeeState
    & typeof EmployeeInfoStore.actionCreators
    & RouteComponentProps<{ id: string }>;

type HtmlEvent = React.ChangeEvent<HTMLSelectElement>;
*/

class EmployeeInfoApp extends BaseApp {
    constructor(props) {
        super(props);
        this.state = {
            employee: EmployeeInfoStore.defaultEmployee,
            listdays: defaultListDays,
            file: '',
            imagePreviewUrl: '',
            fileName: '',
            errorMessage: [''],
            errors: EmployeeInfoStore.ErrorsInit,
            touched: EmployeeInfoStore.touchedInit,
            configturn: defaultConfigTurn,
            persontime: Access.defaultUnidadPersonaHorario,
            persontimeaccess: [],
            arAccesses: [],
            arAccesos: [],
            objeto: 'employee',
            getObjetos: "getEmployees"
        };
        /*        state = {
                    employee: EmployeeInfoStore.defaultEmployee,
                    listdays: defaultListDays,
                    file: '', imagePreviewUrl: '', fileName: '', errorMessage: [''],
                    errors: EmployeeInfoStore.ErrorsInit,
                    touched: EmployeeInfoStore.touchedInit,
                    configturn: defaultConfigTurn,
                    persontime: Access.defaultUnidadPersonaHorario,
                    persontimeaccess: [],
                    arAccesses: [],
                    arAccesos: []
                }*/
        //this.props.handleChange = this.props.handleChange.bind(this);
        //this.props.getRelationship();
    }
    validate = employee => {
        // true means invalid, so our conditions got reversed
        return {
            ContactoEmp1: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(employee.ContactoEmp1) },
            ContactoEmp2: { errorMessage: "Falta nombre segundo contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(employee.ContactoEmp2) },
            IdParentescoEmp1: { errorMessage: "Falta Parentesco", isRequired: true, valid: true, isEmpty: employee.IdParentescoEmp1 === 0 },
            IdParentescoEmp2: { errorMessage: "Falta Parentesco", isRequired: true, valid: true, isEmpty: employee.IdParentescoEmp2 === 0 },
            TelefonosContactoEmp1: { errorMessage: "Falta telefono contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(employee.TelefonosContactoEmp1) },
            TelefonosContactoEmp2: { errorMessage: "Falta telefono contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(employee.TelefonosContactoEmp2) },
            EmailEmp: { errorMessage: "Falta email contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(employee.EmailEmp) },
            DireccionEmp: { errorMessage: "Falta direcion contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(employee.DireccionEmp) },
            RutaImagenEmp: { errorMessage: "Falta imagen contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(employee.RutaImagenEmp) },
            IdEmpresaMantenimiento: { errorMessage: "Falta empresa contacto", isRequired: true, valid: true, isEmpty: employee.IdEmpresaMantenimiento === 0 },
            FechaUltActualizacion: { errorMessage: "Falta fecha contacto", isRequired: true, valid: true, isEmpty: Utils.isEmpty(employee.FechaUltActualizacion) },
            IdUsuario: { errorMessage: "Falta usuario", isRequired: true, valid: true, isEmpty: employee.IdUsuario === 0 }
        };
    }
    getInitialState() {
    }
    componentWillMount() {
        // This method runs when the component is first added to the page
        // let startDateIndex = parseInt(this.props.match.params.startDateIndex) || 0;
        console.log('componentWillMount in EmployeeInfoApp');
        try {
            super.componentWillMount();
            this.props.getEmployees();
            this.props.getMaintenanceCompanys();
            this.props.setModeRead();
            //const idContract = 22;
            this.props.getAccesos(/*idContract*/);
            let IdPersonaEmp = parseInt(this.props.match.params.id) || 0;
            if (IdPersonaEmp !== 0) {
                this.props.getEmployee(IdPersonaEmp);
                const idUnit = 10;
                const idType = 7;
                this.props.getHorarios(idUnit, idType, IdPersonaEmp);
                this.setState({
                    employee: this.props.employee,
                    imagePreviewUrl: this.props.employee.RutaImagenEmp,
                });
                this.props.getCompany(this.state.employee.IdEmpresaMantenimiento);
            } else {
                //this.props.getCompany(-1);
            }

        } catch (ex) {
            console.log('Error in Component Will Mount EmployeeInfo:' + ex);
        }

    }
    processSubmit = () => {
        try {
            switch (this.props.mode) {
                case Mode.Create:
                    this.props.create(this.state.employee, this.state.persontime, this.getAccesos());
                    this.setState({
                        persontime: {
                            ...this.state.persontime,
                            IdPersona: this.props.employee.IdPersonaEmp
                        }
                    });
                    //this.props.createPersonTime(this.state.persontime);
                    this.getAccesos();
                    this.props.setModeRead();
                    break;
                case Mode.Update:
                    this.setState({
                        persontime: {
                            //FechaInicio: new Date().toISOString().split('T')[0],
                            //FechaFinal: new Date().toISOString().split('T')[0],
                            FechaUltActualizacion: new Date().toISOString().split('T')[0]
                        }
                    });
                    this.props.update(this.state.employee, this.state.persontime, this.getAccesos());
                    break;
                default:
                    break;
            }
            switch (this.state.mode) {
                case Mode.Create:
                    this.props.create(this.state.employee);
                    break;
                case Mode.Update:
                    this.props.update(this.state.employee);
                    break;
                default:
                    break;
            }
        }
        catch (reason) {

        }
    }
    componentDidMount() {
        console.log('componentDidMount in EmployeeInfoApp');
        try {
            // if (!this.props.relationshipTypes) {

            this.props.getRelationship();
            this.props.getOccupations();
            // }
        } catch (reason) {
            console.log("Reason in ComponentDidMount GuardEmployeeInfoApp:" + reason);
        }

    }

    procesarResponse(nextProps) {
        let id = parseInt(nextProps.match.params.id) || 0;
        if (id !== 0) {
            this.props.getEmployee(id);

            if (this.props.mode !== Mode.Update) {
                this.props.setModeEdit();
            }
        }
        if (this.props.employee !== nextProps.employee) {
            const idUnit = 10;
            const idType = 7;
            this.props.getHorarios(idUnit, idType, id);
        }

        if (this.props.fileName !== nextProps.fileName) {
            this.setState({
                employee: {
                    ...this.state.employee,
                    ['RutaImagenEmp']: nextProps.fileName
                }
            });
        }
        if (this.props.persontime !== nextProps.persontime) {
            const persontime = nextProps.persontime[0] || Access.defaultUnidadPersonaHorario;
            this.setState({
                persontime: persontime,
                listdays: SetWeekDays(persontime.Dias || '0000000')
            });
            (persontime.IdHorario !== 0) && this.props.GetPersonAccessByTime(persontime.IdHorario);
        }
        if (this.props.persontimeaccess !== nextProps.persontimeaccess) {
            this.setState({
                persontimeaccess: nextProps.persontimeaccess
            });
            this.setAccesos();
        }
        switch (nextProps.mode) {
            case Mode.Read:
                if (this.state.employee !== EmployeeInfoStore.defaultEmployee)
                    this.setState({
                        employee: EmployeeInfoStore.defaultEmployee,
                        file: '',
                        imagePreviewUrl: '',
                        fileName: '',
                        persontime: Access.defaultUnidadPersonaHorario,
                        persontimeaccess: []
                    });
                break;
            case Mode.Create:
                break;
            case Mode.Update:
                if (this.props.employee !== nextProps.employee || this.state.employee === EmployeeInfoStore.defaultEmployee) {
                    this.setState({
                        employee: nextProps.employee,
                        imagePreviewUrl: nextProps.employee.RutaImagenEmp
                    });
                    //this.props.getCompany(nextProps.employee.IdEmpresaMantenimiento);
                }
                break;
            default:
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.employee !== nextProps.employee
            && ((nextProps.employee === nextState.employee)
                || (nextState.employee === EmployeeInfoStore.defaultEmployee))) {
            this.props.getEmployees();
            //const idUnit = 10;
            //const idType = 7;
            //this.props.getHorarios(idUnit, idType, nextProps.employee.IdPersonaEmp);
            if (nextProps.employee.IdEmpresaMantenimiento !== 0) this.props.getCompany(nextProps.employee.IdEmpresaMantenimiento);
        }
        //if (/*this.state.arAccesses.length == 0 || */this.props.persontimeaccess != nextProps.persontimeaccess) {
        //           this.setAccesos();

        //}
        //if (this.props.IdEmpresaVigilancia !== nextProps.IdEmpresaVigilancia) {
        //    this.props.getGuardEmployees(nextProps.IdEmpresaVigilancia);
        //}
        console.log('shouldComponentUpdate');
        return true;
    }


    componentWillUpdate() {
        console.log('componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    //        this.props.getRelationship();
    setDefaultEmployee() {
        if (this.state.employee !== EmployeeInfoStore.defaultEmployee) {
            this.setState({
                employee: EmployeeInfoStore.defaultEmployee,
                file: '',
                imagePreviewUrl: '',
                fileName: ''
            });
        }
    }
    setDefaultPersontime() {
        if (this.state.persontime !== Access.defaultUnidadPersonaHorario) {
            this.setState({
                persontime: Access.defaultUnidadPersonaHorario,
                listdays: defaultListDays,
                arAccesos: []
            });
        }
    }
    /*handleSubmit = event => {
        event.preventDefault();
        if (this.canBeSubmitted()) {
           
        }
    }*/
    handleNew = () => {
        this.setDefaultEmployee();
        this.setDefaultPersontime();
        this.props.setModeCreate();
        this.props.history.push('/employee/');
    }

    handleDelete = () => {
        this.props.delete(this.state.employee.IdPersonaEmp);
        this.props.getEmployees();
        this.setDefaultEmployee();
        this.props.setModeRead();
        this.props.history.push('/employee/');
    }
    /////////////EVENTO AL CAMBIAR LOS COMBOS
    handleComboChangeRT(e) {
        this.setState({
            [e.target.name]: e.target.value,
            employee: {
                ...this.state.employee,
                ['Id' + e.target.name]: e.target.value//node.getAttribute('data-id'),
            }
        });
    }
    /////////////EVENTO AL CAMBIAR LOS COMBOS
    handleComboChangeOccupation(e) {
        for (let node of e.target.children) {
            console.log(e.target.name);
            if (node.value === e.target.value) {
                this.setState({
                    [e.target.name]: e.target.value,
                    employee: {
                        ...this.state.employee,
                        [e.target.name]: node.value
                    }
                });
            }
        }
    }

    //METODO PARA MOSTRAR EL SELECT
    showRelationships(name_, value_) {
        const defaultOption = 'Seleccione...';
        const _relationshipTypes = this.props.relationshipTypes === null ? [] : (this.props.relationshipTypes !== undefined ? this.props.relationshipTypes : []);
        let options = _relationshipTypes.length > 0 ? _relationshipTypes.map(function (option) {
            return (
                <option key={option.IdParentesco} value={option.IdParentesco}>
                    {option.DescParentesco}
                </option>
            )
        }) : [];
        return <select className='form-control input-sm' name={name_} onChange={this.handleComboChangeRT.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }
    //METODO PARA MOSTRAR EL SELECT OFICIO
    showOccupations(name_, value_) {
        const defaultOption = 'Seleccione...';
        const _occupations = this.props.occupations === null ? [] : (this.props.occupations !== undefined ? this.props.occupations : []);
        let options = _occupations.length > 0 ? _occupations.map(function (option) {
            return (
                <option key={option.IdOficio} value={option.IdOficio}>
                    {option.DescOficio}
                </option>
            )
        }) : [];
        return <select className='form-control input-sm' name={name_} onChange={this.handleComboChangeOccupation.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }
    //EVENTO PARA LA CAPTURA DE CAMBIOS EN LOS INPUT
    handleChange = event => {
        event.preventDefault();
        console.log(event.currentTarget.name + ':' + event.currentTarget.value);
        this.setState({
            employee: {
                ...this.state.employee,
                [event.currentTarget.name]: event.currentTarget.value,
                FechaUltActualizacion: new Date().toISOString().split('T')[0],
            }
        });
    }

    handleChangePersonTime(e) {
        e.preventDefault();

        //this.setState({ guardemployee: { [e.target.name]: e.target.value } })
        console.log(e.target.name + ':' + e.target.value);
        this.setState({
            persontime: {
                ...this.state.persontime,
                [e.target.name]: e.target.value,
                FechaUltActualizacion: new Date().toISOString().split('T')[0],
            }
        });
    }
    //EVENTO QUE MANEJA LA CARGA Y SUBIDA DE LA IMAGEN
    _handleImageChange(event) {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        this.props.changeImage(event.target.files[0]);
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                fileName: this.props.fileName,
            });
        }
        reader.readAsDataURL(file);
    }

    handleBlur = field => (evt) => {
        this.setState({
            touched: {
                ...this.state.touched,
                [field]: true
            }
        });
    }
    getAccesos = () => {
        const arr = this.state.arAccesos;
        const arr_ = this.state.arAccesses;
        let arResult = [];
        let persontimeaccess = {
            IdHorario: this.props.IdHorario,
            IdAcceso: 0,
            Acceso: '',
            IdUsuario: 3972,
            FechaActivacion: Now(),
            Usuario: ''
        };
        arr.forEach((element, index) => {
            if (element) {
                console.log(arr_[index]);
                arResult.push(arr_[index]);
            }
            //persontimeaccess.IdAcceso = arr_[index];
            //this.props.AddPersonTimeAccess(persontimeaccess);
        });
        return arResult;
    }
    _handleSubmit(e) {
        // if (this.canBeSubmitted()) {
        e.preventDefault();
        //this.props.create(this.state.employee);
        return;
        //   }
    }

    //onlyNumbers(e) {
    //    const re = /[0-9A-F:]+/g;
    //    if (!re.test(e.key)) {
    //        e.preventDefault();
    //    }
    //}

    FileUpload() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} width="150px" height="150px" />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return <div className="col-md-4">
            <div className="previewComponent">
                <form onSubmit={(e) => this._handleSubmit(e)} action="/upload/image" method="post">
                    <input className="fileInput" type="file" accept="image/*" onChange={(e) => this._handleImageChange(e)} />
                    {/*<button className="submitButton"
                        type="submit"
                        onClick={(e) => this._handleSubmit(e)}>Upload Image</button>*/}

                </form>
                <div className="imgPreview">
                    {$imagePreview}
                </div>
            </div>
        </div>;

    }
    shouldMarkError = field => {
        const hasError = this.state.errors[field] ? this.state.errors[field].isEmpty : false;
        let touched = this.state.touched;
        const shouldShow = touched[field];
        return hasError ? shouldShow : false;
    };
    toggleCheckboxAccesses(e) {
        const index = e.target.name;
        let arr = this.state.arAccesos;
        arr[index] = !arr[index];
        this.setState({
            arAccesos: arr
        });
    }
    setAccesos() {
        let arr = [];
        let arr_ = [];
        const idContract = 22;
        this.props.accesses.forEach !== undefined ? this.props.accesses.forEach(access => {
            arr.push(access.Id);
            arr_.push(this.selectedAccesses(this.props.persontimeaccess, access.Id));
        }) : this.props.getAccesos(/*idContract*/);
        this.setState({
            arAccesses: arr,
            arAccesos: arr_,
        });
    }
    selectedAccesses(persontimeaccess, IdAccess) {
        return persontimeaccess.find(persontimeaccess_ => persontimeaccess_.IdAcceso === IdAccess) !== undefined;
    }

    initializeAccesses() {

        this.state.arAccesos.forEach(
            (element, index) => {

            }
        );
    }

    //METODO PARA MOSTRAR EL SELECT
    show_ddlMaintenanceCompanys() {
        const defaultOption = 'Seleccione...';
        let options = this.props.maintenancecompanys === null ? '' : (this.props.maintenancecompanys !== undefined ? this.props.maintenancecompanys.map(function (option) {
            return (
                <option key={option.IdEmpresaMantenimiento} value={option.IdEmpresaMantenimiento}>
                    {`${option.descEmpresaMantenimiento}`}
                </option>
            )
        }) : []);
        return <select className='form-control input-sm' name="IdEmpresaMantenimiento" onChange={this.handleChange.bind(this)} value={this.state.employee.IdEmpresaMantenimiento}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }
    renderBody() {
       // this.state.errors = validate(this.state.employee);
        return <div className="container" style={{ marginTop: '5.32%' }}>
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-6">
                        <h3 style={{ fontFamily: 'Oswald, sans-serif' }}>Empleados - Informacion del personal de mantenimiento</h3>
                    </div>
                    <div className="col-sm-12 col-md-6 ">

                        <div className="col-xs-6 col-md-3 pull-right" >
                            <button type="button" className="btn btn-danger " onClick={() => { this.props.history.push('/'); }}>Salir</button>
                            <button name="submit" className="btn btn-lg bgm-OrangeSeguricel" /*width="120px" height="50px"*/ onClick={this.handleSubmit.bind(this, this.state.employee)}>Guardar</button>
                        </div>
                    </div>
                </div>
                <div className="card-header bgm-BlueSeguricel">
                    {/*<h2>Informacion del personal de mantenimiento</h2>*/}
                </div>
                {this.props.errorMessage /* this.state.errors.length ¨*/ &&
                    <span>
                        {/*this.state.errors.map((error, i) => <p key={i}>HEllo{error.value}</p>)*/}
                        <p>this.props.errorMessage</p>
                    </span>
                }
                <div className="card-body card-padding">

                    {this.renderList()}
                    {this.props.mode !== Mode.Read ? this.datos() : []}
                    <br />
                    <br />
                    <br />
                    {this.props.mode !== Mode.Read && this.tipoAcceso()}
                    {this.props.mode !== Mode.Read && this.weekDays()}
                    <br />
                    <br />
                    <br />
                    {this.props.mode !== Mode.Read && this.showPersonTime()}
                    {(this.props.company && this.props.mode === Mode.Update) ? this.EmpresaMantenimiento() : []}
                    <br />
                </div>
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
                                <h2>Personal de Mantenimiento</h2>
                                <div className="col-md-9" style={{ textAlign: 'right' }}>
                                    <button name="New" className="btn bgm-OrangeSeguricel" onClick={this.handleNew.bind(this)}>Agregar</button>
                                </div>
                            </div>
                        </div>
                        {/*this.props.mode == Utils.Mode.Read ? */this.showEmployees() /*: []*/}
                    </div>
                </div>
            </div>
        </div>;
    }
    summary() {
        const arrErrors = this.state.errorMessage;
        {
            arrErrors.forEach(error => {
                return <li>{error}</li>;
            });
        }
    }

 

    //DATOS EMPLEADOS
    datos() {
        const _employee = this.state.employee;
        return <div className="container">
            <div className="col-md-12">
                <div>
                    <fieldset><legend>Informacion del Empleado</legend> <hr /></fieldset>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-9">
                        <div className="col-xs-12 col-md-6">
                            <div className="input-group input-sm">
                                <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>

                                <input type="text" className="form-control input-sm" name="PrimerApellido" value={_employee.PrimerApellido} placeholder="Primer Apellido" onChange={this.handleChange.bind(this)} />

                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="input-group input-sm">
                                <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>

                                <input type="text" className="form-control input-sm" name="SegundoApellido" value={_employee.SegundoApellido} onChange={this.handleChange.bind(this)} placeholder="Segundo Apellido" />

                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="input-group input-sm">
                                <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>

                                <input type="text" className="form-control input-sm" name="PrimerNombre" value={_employee.PrimerNombre} placeholder="Primer Nombre" onChange={this.handleChange.bind(this)} />

                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="input-group input-sm">
                                <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>

                                <input type="text" className="form-control input-sm" name="SegundoNombre" value={_employee.SegundoNombre} onChange={this.handleChange.bind(this)} placeholder="Segundo Nombre" />

                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="input-group input-sm">
                                <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-credit-card" /></span>

                                <input type="text" className="form-control input-sm" name="IdDocIdentidad" value={_employee.IdDocIdentidad} onChange={this.handleChange.bind(this)} placeholder="Documento de Identidad" />

                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="input-group input-sm">
                                <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-envelope" /></span>

                                <input type="email" className="form-control input-sm" name="EmailEmp" value={_employee.EmailEmp} onChange={this.handleChange.bind(this)} placeholder="Email" />

                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="input-group input-sm">
                                <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-calendar" /></span>

                                <input type="date" name="FechaNacimiento" value={setDate(_employee.FechaNacimiento)} onChange={this.handleChange.bind(this)} className="form-control input-sm" placeholder="Fecha de Nacimiento" />

                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6">
                            <div className="input-group input-sm">
                                <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-earphone" /></span>

                                <input type="text" className="form-control input-sm" name="TelefonoMovil1" onKeyPress={(e) => onlyNumbers(e)} value={_employee.TelefonoMovil1} onChange={this.handleChange.bind(this)} placeholder="Telefono" />

                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-3">
                        {this.FileUpload()}
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-9">
                            <div className="input-group input-sm">
                                <span className="input-group-addon input-sm">Direccion</span>
                                <input className="form-control input-sm " style={{ maxHeight: '50px' }} name="DireccionEmp" value={this.state.employee.DireccionEmp} onChange={this.handleChange.bind(this)}
                                    placeholder="Escribe aqui..." />

                            </div>
                        </div>
                    </div>
                </div>
                {this.showOccupations('IdOficio', this.state.employee.IdOficio)}
                {this.contactos()}
                <hr />
            </div>
            {/*AQUIIIIII*/}
            <div className="row">
                <div className="col-md-6">
                    {this.show_ddlMaintenanceCompanys()}
                </div>
                <div className="col-md-3">
                    {this.props.mode === Mode.Update ? this.DeleteButton() : []}
                </div>

            </div>
            {/*this.props.mode == Mode.Update ? this.DeleteButton() : []*/}
        </div>;

    }
    DeleteButton() {
        return <div className="col-md-9" style={{ textAlign: 'right' }}>
            <button className="btn btn-warning" onClick={this.handleDelete.bind(this)}>Eliminar</button>
        </div>;
    }
    getPlaceHolder(key, defaultString) {
        return this.state.errors[key].errorMessage ? this.state.errors[key].errorMessage : defaultString;
    }


    getClassName(key) {
        return this.shouldMarkError(key) ? ErrorClass : DefaultClass;
    }

    contactos() {
        //const isDisabled = Object.keys(errors).some(x => errors[x]);
        //const isDisabled = Object.keys(this.state.errors).some(x => this.state.errors[x]);
        const errors = this.state.errors;
        return <div className="container">
            <fieldset><legend>Personas Contacto del Empleado <hr /> </legend></fieldset>
            <div className="row">
                <div className="col-md-12">
                    <div className="col-xs-4 col-md-4">
                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>

                            <input type="text" maxLength={200} pattern=".{3,}" required title="3 characters minimum" minLength={3} className={this.getClassName('ContactoEmp1')} ref="ContactoEmp1" name="ContactoEmp1" onBlur={this.handleBlur('ContactoEmp1')} onChange={this.handleChange.bind(this)} value={this.state.employee.ContactoEmp1} placeholder={this.getPlaceHolder('ContactoEmp1', "Contacto")} />

                        </div>
                    </div>
                    <div className="col-xs-4 col-md-4">
                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>


                            {this.showRelationships("ParentescoEmp1", this.state.employee.IdParentescoEmp1 || 0)}

                        </div>
                    </div>
                    <div className="col-xs-4 col-md-4">
                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-phone" /></span>

                            <input type="text" className={this.getClassName('TelefonosContactoEmp1')} name="TelefonosContactoEmp1" onKeyPress={(e) => onlyNumbers(e)} value={this.state.employee.TelefonosContactoEmp1} onBlur={this.handleBlur('TelefonosContactoEmp1')} onChange={this.handleChange.bind(this)} placeholder="Telefono" />

                        </div>
                    </div>
                    <div className="col-xs-4 col-md-4">
                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>

                            <input type="text" className={this.getClassName('ContactoEmp2')} name="ContactoEmp2" value={this.state.employee.ContactoEmp2} onBlur={this.handleBlur('ContactoEmp2')} onChange={this.handleChange.bind(this)} placeholder={this.getPlaceHolder('ContactoEmp2', '"Contacto"')} />
                        </div>
                    </div>
                    <div className="col-xs-4 col-md-4">
                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-user" /></span>


                            {this.showRelationships("ParentescoEmp2", this.state.employee.IdParentescoEmp2 || 0)}
                        </div>
                    </div>
                    <div className="col-xs-4 col-md-4">
                        <div className="input-group input-sm">
                            <span className="input-group-addon input-sm"><i className="glyphicon glyphicon-phone" /></span>

                            <input type="text" className={this.getClassName('TelefonosContactoEmp2')} name="TelefonosContactoEmp2" onKeyPress={(e) => onlyNumbers(e)} value={this.state.employee.TelefonosContactoEmp2} onBlur={this.handleBlur('TelefonosContactoEmp2')} onChange={this.handleChange.bind(this)} placeholder={this.getPlaceHolder('TelefonosContactoEmp2', 'Telefono')} />

                        </div>
                    </div>
                </div>
            </div>
            {/*<button disabled={isDisabled}>Sign up</button>*/}
        </div>;
    }
    cargaArchivo() {
        return <div className="col-md-4">
            <div className="fileinput fileinput-new" data-provides="fileinput">
                <div className="fileinput-preview thumbnail" data-trigger="fileinput"></div>
                <div>
                    <span className="btn btn-info btn-file">
                        <span className="fileinput-new">Select image</span>
                        <span className="fileinput-exists">Change</span>
                        <input type="file" name="..." />
                    </span>
                    <a href="#" className="btn btn-danger fileinput-exists"
                        data-dismiss="fileinput">Remove</a>
                </div>
            </div>
            <p className="c-black f-500 m-t-20 m-b-20">Pasos para subir la foto</p>
            <p>1)Seleccione la foto</p>
            <p>2)Subela al servidor</p>
            <p>3)Cuando llegue al 100% refresque la pantalla y haga clic para verla</p>
        </div>;

    }

    tipoAcceso() {
        return <div className="col-md-12">
            {/*<div className="col-md-6">
                <div className="row">
                    <p className="c-black f-14"><b>Tipo de acceso permitido</b></p>
                </div>
                <div className="row">
                    <div className="col-md-3 col-xs-3">
                        <label className="checkbox checkbox-inline m-r-20 f-14 m-t-0">
                            <input type="checkbox" id="" name="" value="" />
                            <i className="input-helper"/>
                            <p className="c-gray"> Telefonico</p>
                        </label>
                    </div>
                    <div className="col-md-12 col-xs-12">
                        <label className="checkbox checkbox-inline m-r-20 f-14 m-t-0">
                            <input type="checkbox" id="" name="" value="" />
                            <i className="input-helper"/>
                            <p className="c-gray"> Huella digital</p>
                        </label>
                    </div>
                </div>
            </div>*/}
            <div className="col-md-6">
                <div className="row">
                    <p className="c-black f-14"><b>Accesos Autorizados</b></p>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <p className="c-black f-16"><b>Tipo de acceso permitido</b></p>
                        {this.props.accesses.map((access, index) =>
                            <div className="row">
                                <div className="col-md-3 col-xs-3">
                                    <label className="checkbox checkbox-inline m-r-20 f-16 m-t-0">
                                        <input type="checkbox" id="" checked={this.state.arAccesos[index]/*this.selectedAccesses(this.state.persontimeaccess, access.Id)*/} name={index.toString()} value={access.Id} onChange={this.toggleCheckboxAccesses.bind(this)} />
                                        <i className="input-helper" />
                                        <p className="c-gray"> {access.NombreAcceso}</p>
                                    </label>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>;
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
    isChecked(value) {
        return (value === 1);
    }
    weekDays() {
        var days = ["L", "M", "M", "J", "V", "S", "D"];
        let dias = this.state.listdays;
        return <div className="col-md-12">
            <div className="col-md-4">
                <div className="row">
                    <p className="c-black f-14"><b>Dias de la semana</b></p>
                </div>
            </div>
            <div className="col-md-8">
                <div className="row">
                    <div className="row">
                        {days.map((item, index) => (
                            <div className="col-md-1 col-xs-1">
                                <p className="c-gray f-14"> {item}</p>
                                <label className="checkbox checkbox-inline m-r-20 f-14 m-t-0">
                                    <input type="checkbox" value={index} checked={this.isChecked(dias[index])} onChange={this.toggleCheckbox.bind(this)}/*onChange={this.dayChange.bind(this)}*/ />
                                    <i className="input-helper" />
                                </label>
                            </div>
                        ))}
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        </div>;

    }
    showPersonTime() {
        let _persontime = this.state.persontime || Access.defaultUnidadPersonaHorario;
        return <div className="col-md-12">
            <div className="col-md-3">
                <div className="row">
                    <p className="c-black f-14"><b>Horario Permitido</b></p>
                </div>
            </div>
            <div className="col-md-9">
                <div className="row">
                    <div className="col-xs-6">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-calendar" /></span>
                            <div className="fg-line">
                                <input type="date" name="FechaInicio" value={setDate(_persontime.FechaInicio)} onChange={this.handleChangePersonTime.bind(this)} className="form-control" placeholder="Fecha Inicio" />
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-calendar" /></span>
                            <div className="fg-line">
                                <input type="date" name="FechaFinal" value={setDate(_persontime.FechaFinal)} onChange={this.handleChangePersonTime.bind(this)} className="form-control" placeholder="Fecha Final" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-2 col-xs-2">
                        <p className="c-black f-14"> <b>Primer intervalo</b></p>
                    </div>
                    <div className="col-md-2 col-xs-2">
                        <p className="c-gray f-14">Hora Inicio</p>
                    </div>
                    <div className="col-md-3 col-xs-3">
                        <div className="input-group form-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-time" /></span>
                            <div className="dtp-container">
                                <input type="time" step="1" className="form-control" placeholder="Time" name="HoraInicio1"
                                    value={_persontime.HoraInicio1} onChange={this.handleChangePersonTime.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-xs-2">
                        <p className="c-gray f-14">Duracion</p>
                    </div>
                    <div className="col-md-3 col-xs-3">
                        <div className="input-group form-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-time" /></span>
                            <div className="dtp-container">
                                <input type='number' className="form-control" name="Duracion1"
                                    value={_persontime.Duracion1} onChange={this.handleChangePersonTime.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 col-xs-2">
                        <p className="c-black f-14"> <b>Segundo intervalo</b></p>
                    </div>
                    <div className="col-md-2 col-xs-2">
                        <p className="c-gray f-14">Hora Inicio</p>
                    </div>
                    <div className="col-md-3 col-xs-3">
                        <div className="input-group form-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-time" /></span>
                            <div className="dtp-container">
                                <input type='time' className="form-control" name="HoraInicio2" value={_persontime.HoraInicio2} onChange={this.handleChangePersonTime.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-xs-2">
                        <p className="c-gray f-14">Duracion</p>
                    </div>
                    <div className="col-md-3 col-xs-3">
                        <div className="input-group form-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-time" /></span>
                            <div className="dtp-container">
                                <input type='number' className="form-control" name="Duracion2" value={_persontime.Duracion2} onChange={this.handleChangePersonTime.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }

    EmpresaMantenimiento() {
        let _company = (this.props.company !== null ? this.props.company : defaultMaintenanceCompany);
        return <div className="col-md-12">
            <div className="card">
                <div className="card-header bgm-BlueSeguricel">
                    <h2>Empresa de mantenimiento</h2>
                </div>
                <div className="card-body card-padding">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-xs-4">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-tower" /></span>
                                        <div className="fg-line">
                                            <input type="text" className="form-control" name="descEmpresaMantenimiento" defaultValue={_company.descEmpresaMantenimiento} placeholder="Nombre" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-earphone" /></span>
                                        <div className="fg-line">
                                            <input type="text" className="form-control" name="TelefonosEmpresaMantenimiento" defaultValue={_company.TelefonosEmpresaMantenimiento} placeholder="Telefono" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span>
                                        <div className="fg-line">
                                            <input type="text" className="form-control" name="" defaultValue={_company.EmailEmpresaMantenimiento} placeholder="Email" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="c-black f-500 m-t-20 m-b-20">Direccion</p>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <div className="fg-line">
                                            <textarea className="form-control auto-size" name="DireccionEmpresaMantenimiento" defaultValue={_company.DireccionEmpresaMantenimiento}
                                                placeholder="Escribe aqui..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-4">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                                        <div className="fg-line">
                                            <input type="text" className="form-control" name="PersonaContactoMant1" defaultValue={_company.PersonaContactoMant1} placeholder="Contacto" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className=" glyphicon glyphicon-credit-card" /></span>
                                        <div className="fg-line">
                                            <input type="text" className="form-control" placeholder="Cargo" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-phone" /></span>
                                        <div className="fg-line">
                                            <input type="text" className="form-control" name="TelefonosPersonaContactoMant1" defaultValue={_company.TelefonosPersonaContactoMant1} placeholder="Telefono" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-4">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                                        <div className="fg-line">
                                            <input type="text" className="form-control" name="PersonaContactoMant2" defaultValue={_company.PersonaContactoMant2} placeholder="Contacto" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className=" glyphicon glyphicon-credit-card" /></span>
                                        <div className="fg-line">
                                            <input type="text" className="form-control" placeholder="Cargo" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-4">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-phone" /></span>
                                        <div className="fg-line">
                                            <input type="text" name="TelefonosPersonaContactoMant2" defaultValue={_company.TelefonosPersonaContactoMant2} className="form-control" placeholder="Telefono" />
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
    //render empleados
    showEmployees() {
        const employees = this.props.employees || [];
        return <div className="list-group lg-odd-black">
            {employees.map(employee =>
                <div className="list-group-item">
                    <div className="pull-right">
                        <div className="actions dropdown">
                            <a href="" data-toggle="dropdown" aria-expanded="true">
                                <i className="glyphicon glyphicon-option-vertical" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                    <Link to={`/employee/${employee.IdPersonaEmp}`} >Editar</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="media-body">
                        <div className="lgi-heading">{employee.PrimerApellido + " " + employee.PrimerNombre}</div>
                    </div>
                </div>
            )}
        </div>;
    }
}
// Wire up the React component to the Redux store
export default connect(
    state => state.employee, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(EmployeeInfoStore.actionCreators, dispatch)               // Selects which action creators are merged into the component's props
)(EmployeeInfoApp);