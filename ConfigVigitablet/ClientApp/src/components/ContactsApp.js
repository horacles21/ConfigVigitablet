import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ContactStore from '../store/Contacts';
import { BaseApp } from '../components/BaseApp';
import { Mode, isEmpty, defaultListDays, GetWeekDays, SetWeekDays, Now } from '../store/Utils';
import * as Settings from '../store/MyConfig';
// At runtime, Redux will merge together...
/*type ContactProps =
    ContactStore.ContactsState        // ... state we've requested from the Redux store
    & typeof ContactStore.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ id: string, IdIncidentType: string }>; // ... plus incoming routing parameters
*/
class ContactsApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'contact',
        listObjetos: 'contacts',
        defaultObjeto: ContactStore.defaultContact,
        contacts: [],
        contact: ContactStore.defaultContact,
        contact_old: ContactStore.defaultContact,
        mode: Mode.Read,
        IdIncidentType: 0,
        imagePreviewUrl: '',
        weekdays: defaultListDays,
        contacttime: ContactStore.defaultContactTime,
        title: 'CONTACTOS',
        subtitle: 'Lista de Contactos',
        addNewTitle: 'Agregar Nuevo Contacto',
        editTitle: 'Editar Contacto',
        listTitle: 'Lista de Contactos',
        fieldList: {
            IdContrato: this.fieldContract,
            IdContacto: { ...this.defaultField, description: "Id Contacto", isVisible: true, controlType: 'T', listFunction: '', touched: false, handlekeyPress: "handleOnlyNumbers" },
            NombreContacto: { ...this.defaultField, description: "Nombre Contacto", isVisible: true, controlType: 'T', listFunction: '', touched: false, handlekeyPress: "" },
            IdCargo: { ...this.defaultField, description: "Cargo Contacto", controlType: 'C', listFunction: 'showJobTitlesFilter', displayFunction: 'showDescJobTitle' },
            TelefonPrincipal: { ...this.defaultField, description: "Telefono Principal", handlekeyPress: "handleOnlyNumbers" },
            TelefonSecundario: { ...this.defaultField, description: "Telefono Secundario", handlekeyPress: "handleOnlyNumbers" },
            TelefonoMovil: { ...this.defaultField, description: "Telefono Movil", handlekeyPress: "handleOnlyNumbers" },
            CorreoElectronico: { description: "Correo Electronico", isVisible: true, controlType: 'T' },
        },
        getObjetos: "getContacts"
    }
    validate = (contact) => {
        // true means invalid, so our conditions got reversed
        return {
            IdContrato: { errorMessage: "Falta Id Contrato", isRequired: true, valid: contact.IdContrato > 0, isEmpty: contact.IdContrato === 0 },
            IdTipoContacto: { errorMessage: "Falta Tipo Contacto", isRequired: true, valid: contact.IdTipoContacto > 0, isEmpty: contact.IdTipoContacto === 0 },
            NombreContacto: { errorMessage: "Falta Nombre Contacto", isRequired: true, valid: true, isEmpty: isEmpty(contact.NombreContacto) },
            IdCargo: { errorMessage: "Falta Cargo", isRequired: true, valid: contact.IdCargo > 0, isEmpty: contact.IdCargo === 0 },
            TelefonoMovil: { errorMessage: "Falta Telefono Movil", isRequired: true, valid: true, isEmpty: isEmpty(contact.TelefonoMovil) },
            TelefonPrincipal: { errorMessage: "Falta Telefon Principal", isRequired: true, valid: true, isEmpty: isEmpty(contact.TelefonPrincipal) },
            TelefonSecundario: { errorMessage: "Falta Telefono Secundario", isRequired: true, valid: true, isEmpty: isEmpty(contact.TelefonSecundario) },
            CorreoElectronico: { errorMessage: "Falta Correo Electronico", isRequired: true, valid: this.validateEmail(contact.CorreoElectronico), isEmpty: isEmpty(contact.CorreoElectronico) },
        };
    };

    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            const IdIncidentType = parseInt(this.props.match.params.id, 10) || 0;
            this.props.getContacts();
            this.props.getJobTitles();
        } catch (reason) {
            console.log('Error in componentWillMount - ContactsApp:' + reason);
        }

    }
    componentDidMount() {

    }

    procesarResponse(nextProps) {
        // This method runs when incoming props (e.g., route params) change
        if (nextProps.contacttimes !== this.props.contacttimes) {
            if (nextProps.contacttimes.length > 0) {
                this.setState({
                    contacttime: nextProps.contacttimes[0],
                    weekdays: SetWeekDays(nextProps.contacttimes[0].DiasSemanasHorario)
                });
            }
            else {
                this.setState({
                    contacttime: ContactStore.defaultContactTime,
                    weekdays: defaultListDays
                });
            }
        }
        if (nextProps.contacttime !== this.props.contacttime) {
            this.setState({
                contacttime: nextProps.contacttime,
                weekdays: SetWeekDays(nextProps.contacttime.DiasSemanasHorario)
            });
        }
    }
    /*componentWillUnmount() {
        this.props.setDefault();
    }*/

    _handleSubmit(e) {
        e.preventDefault();
    }

    //EVENTO QUE MANEJA LA CARGA Y SUBIDA DE LA IMAGEN
    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        this.props.changeImage(e.target.files[0]);
        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file);
    }

    prepareObjeto() {
        this.state.contacttime.DiasSemanasHorario = GetWeekDays(this.state.weekdays);
        this.state.contacttime.IdContacto = this.state.contact.IdContacto;
        this.state.contacttime.IdUsuario = Settings.default.key.user;
        this.state.contacttime.FechaUltActualizacion = Now();
    }

    processSubmit = () => {
        try {
            this.prepareObjeto();
            switch (this.state.mode) {
                case Mode.Create:
                    this.props.create(this.state.contact, this.state.contacttime);
                    break;
                case Mode.Update:
                    this.props.update(this.state.contact, this.state.contacttime);
                    break;
                case Mode.Delete:
                    this.props.delete(this.state.contact, this.state.contacttime);
                    break;
                default:
                    break;
            }
        }
        catch (reason) {

        }
    }


    //EVENTO CHANGE DE LOS INPUTS
    handleInputChange = event => {
        this.setState({
            contacttime: {
                ...this.state.contacttime,
                [event.currentTarget.name]: event.currentTarget.value,
            }
        });
    }


    handleTest = contact => {
        this.props.sendSMS(contact);
    }

    showTest(contact) {
        return (<div className="col-md-6" style={{ textAlign: 'right' }}>
            <button className="btn btn-default pull-right btn-lg bgm-OrangeSeguricel" /*width="120px" height="50px"*/ onClick={this.handleTest.bind(this, contact)}>Test</button>
        </div>);
    }

    FileUpload() {
        const imagePreviewUrl = this.state.contact.RutaImagen;
        //let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = <img src={imagePreviewUrl} width="150px" height="150px" />;
        } else {
            $imagePreview = <div className="previewText">Please select an Image for Preview</div>;
        }
        return (<div className="col-md-4">
            <div className="previewComponent">
                <form onSubmit={(e) => this._handleSubmit(e)} action="/upload/image" method="post">
                    <input className="fileInput" type="file" required onChange={(e) => this._handleImageChange(e)} />
                    <button className="submitButton"
                        type="submit"
                        onClick={(e) => this._handleSubmit(e)}
                    >Upload Image</button>
                </form>
                <div className="imgPreview">
                    {$imagePreview}
                </div>
            </div>
        </div>);

    }
    //METODO PARA MOSTRAR EL SELECT
    showConfigIncidentTypes() {
        const defaultOption = 'Seleccione...';
        let options = this.props.incidentTypes === null ? '' : (this.props.incidentTypes !== undefined ? this.props.incidentTypes.map(function (option) {
            return (
                <option key={option.IdTipo} value={option.IdTipo}>
                    {option.DescTipo}
                </option>
            );
        }) : []);
        return (<select className='form-control' name="IdTipo" onChange={this.handleChange.bind(this)} value={this.state.IdIncidentType}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);

    }

    showJobTitlesFilter() {
        const defaultOption = 'Seleccione Cargo del Contacto...';
        const _jobtitles = this.props.jobtitles === null ? [] : this.props.jobtitles !== undefined ? this.props.jobtitles : [];
        let options = _jobtitles.length > 0 ? _jobtitles.map(function (option) {
            return (
                <option key={option.IdCargo} value={option.IdCargo}>
                    {option.DescCargo}
                </option>
            );
        }) : [];
        return (<select className='form-control input-sm' name={"IdCargo"} onChange={this._onFilterChange.bind(this, "IdCargo")} value={this.state.contact.IdCargo}>
            <option key={0} value={''}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    showJobTitles(name_, value_) {
        const defaultOption = 'Seleccione Cargo del Contacto...';
        const _jobtitles = this.props.jobtitles === null ? [] : this.props.jobtitles !== undefined ? this.props.jobtitles : [];
        let options = _jobtitles.length > 0 ? _jobtitles.map(function (option) {
            return (
                <option key={option.IdCargo} value={option.IdCargo}>
                    {option.DescCargo}
                </option>
            );
        }) : [];
        return (<div>
            <select className='form-control' name={name_} onChange={this.handleChange.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
            </select>
        <br/>
        </div>);
    }

    showDescJobTitle(IdCargo) {
        return this.showDescription(IdCargo, "IdCargo", "DescCargo", "jobtitles");
    }

    showDescIncident() {
        let x = this.props.incidentTypes.find(x => x.IdTipo === this.props.IdIncidentType);
        return x !== undefined ? x.DescTipo : '';
    }

    renderNew() {
        const contact = this.state.contact;
        return (<div>
            {this.showContracts_(contact.IdContrato)}
            {this.fieldGroup("NombreContacto", "glyphicon glyphicon-user")}
            {this.showJobTitles("IdCargo", contact.IdCargo || 0)}
            {this.fieldGroup("TelefonPrincipal", "glyphicon glyphicon-phone")}
            {this.fieldGroup("TelefonSecundario", "glyphicon glyphicon-phone")}
            {this.fieldGroup("TelefonoMovil", "glyphicon glyphicon-phone")}
            {this.fieldGroup("CorreoElectronico", "glyphicon glyphicon-envelope")}
            <input type='time' className="form-control time-picker" name="HoraInicioHorario" value={this.state.contacttime.HoraInicioHorario} onChange={this.handleInputChange.bind(this)} />
            <br/>
            <input type='time' className="form-control time-picker" name="HoraFinHorario" value={this.state.contacttime.HoraFinHorario} onChange={this.handleInputChange.bind(this)} />
            <br />
            <div className="input-group form-control">
                {this.weekDays(this.state.weekdays)}
            </div>
        </div>);
    }

    handleUpdateFunctions(contact) {
        this.props.getContactTime(contact.IdContacto);
    }

    initializeRecords() {
        this.state.records = this.state.contacts || [];
    }

    getListByContract(idContrato) {
        this.props.getContactsByContract(idContrato);
    }
}
export default connect(
    state => state.contact, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(ContactStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(ContactsApp);