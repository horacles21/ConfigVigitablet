import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Mode, onlyNumbers } from '../store/Utils';
import * as ConfigGroupIncidentStore from '../store/ConfigGroupIncident';
import { defaultContact } from '../store/Contacts';
import { BaseApp } from '../components/BaseApp';
import { defaultGroup } from '../store/Group';
import { isEmpty } from '../store/Utils';
// At runtime, Redux will merge together...
/*type ConfigGroupIncidentProps =
    ConfigGroupIncidentStore.ConfigGroupIncidentsState        // ... state we've requested from the Redux store
    & typeof ConfigGroupIncidentStore.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ id: string, IdIncidentType: string }>; // ... plus incoming routing parameters
*/
class ConfigGroupIncidentApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'configgroupincident',
        listObjetos: 'configgroupincidents',
        defaultObjeto: ConfigGroupIncidentStore.defaultConfigGroupIncident,
        configgroupincidents: [],
        configgroupincident: ConfigGroupIncidentStore.defaultConfigGroupIncident,
        configgroupincident_old: ConfigGroupIncidentStore.defaultConfigGroupIncident,
        IdIncidentType: 0,
        imagePreviewUrl: '',
        idcontacts: [],
        configgroupsincidents: [],
        title: 'GRUPOS POR INCIDENTES',
        subtitle: 'Lista de grupos por incidentes',
        addNewTitle: 'Agregar grupos por incidente',
        editTitle: 'Editar grupos por incidentes',
        listTitle: 'Lista de grupos por incidentes',
        fieldList: {
            IdContrato: this.fieldContract,
            IdIncidente: { ...this.defaultField, description: 'Incidente' },
            IdTipoIncidente: { ...this.defaultField, description: 'Tipo Incidente', controlType: 'C', listFunction: 'showConfigIncidentTypesFilter' },
            MensajeSMSIncidente: { ...this.defaultField, description: 'Mensaje SMS' },
            MensajeEmailIncidente: { ...this.defaultField, description: 'MensajeEmail' },
        },
        getObjetos: "getConfigGroupIncidents"
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            this.props.getIncidentTypes();
            this.props.getGroups();
            this.props.getConfigGroupIncidents();
            const IdIncidentType = parseInt(this.props.match.params.id, 10) || 0;
            //this.props.getConfigGroupIncident(IdIncidentContact);
            if (IdIncidentType !== 0) {
                this.props.getConfigGroupIncidentsByType(IdIncidentType || 0);
            }
        }
        catch (reason) {
            const error = reason;
        }
    }
    componentDidMount() {
        //
    }

    validate = configgroupincident => {
        // true means invalid, so our conditions got reversed
        return {

            IdTipoIncidente: {
                errorMessage: "Falta tipo incidente", isRequired: true, valid: configgroupincident.IdTipoIncidente > 0, isEmpty: false
            },
            MensajeEmailIncidente: {
                errorMessage: "Falta email", isRequired: true, valid: true, isEmpty: isEmpty(configgroupincident.MensajeEmailIncidente)
            },
            MensajeSMSIncidente: {
                errorMessage: "Falta sms", isRequired: true, valid: true, isEmpty: isEmpty(configgroupincident.MensajeSMSIncidente)
            },
        };
    };
    procesarResponse(nextProps) {
        // This method runs when incoming props (e.g., route params) change
        let IdIncidentType = parseInt(nextProps.match.params.IdIncidentType, 10) || 0;
        if (IdIncidentType !== 0) {
            this.props.getConfigGroupIncidentsByType(IdIncidentType);
        }
        if (this.props.IdIncidentType !== nextProps.IdIncidentType) {
            this.setState({
                IdIncidentType: nextProps.IdIncidentType,
            });
        }
        if (nextProps.response !== this.props.response) {
            console.log(nextProps.response.status);

        }
        else {
            //this.state.configgroupincident
        }
        if (nextProps.fileName !== this.props.fileName) {
            this.setState({
                configgroupincident: {
                    ...this.state.configgroupincident,
                    RutaImagenIncidente: nextProps.fileName,
                }
            });
        }
        if (this.props.idcontacts !== nextProps.idcontacts) {
            let arIDs = this.props.contacts.filter(x => nextProps.idcontacts.indexOf(x.IdContacto) !== -1);
            this.setState({
                //guardemployees: arIDs,
                idcontacts: nextProps.idcontacts
            });
        }
    }

    componentWillUnmount() {
        //this.props.setDefault();
    }

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

    processSubmit = () => {
        try {
            //this.state.configalarm.IdContrato = this.state.IdContrato;
            const configgroupsincidents_ = this.state.configgroupsincidents || [];
            var configgroupsincidents = [];
            configgroupsincidents_.map(x => {
                configgroupsincidents.push([x.IdGrupo, x.RecibirLlamada ? 1 : 0, x.RecibirSMS ? 1 : 0, x.RecibirEmail ? 1 : 0, x.Orden]);
            });
            switch (this.state.mode) {
                case Mode.Create:
                    this.props.create(this.state.configgroupincident, configgroupsincidents);
                    break;
                case Mode.Update:
                    this.props.update(this.state.configgroupincident, configgroupsincidents);
                    break;
                case Mode.Delete:
                    this.props.delete(this.state.configgroupincident);
                    break;
                default:
                    break;
            }
        } catch (reason) {
            alert('FALTAN DATOS');
        }
    }
    isCheckedGroup(IdGrupo) {
        const configgroupsincidents = this.state.configgroupsincidents || [];
        const configgroupsincident = configgroupsincidents.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        return configgroupsincident.length > 0;
    }

    isCheckedSMS(IdGrupo) {
        const configgroupsincidents = this.state.configgroupsincidents || [];
        const configgroupsincident = configgroupsincidents.filter(x => x.IdGrupo === IdGrupo);
        if (configgroupsincident.length > 0) {
            return configgroupsincident[0].RecibirSMS;
        }
        else {
            return false;
        }
    }
    isCheckedEmail(IdGrupo) {
        const configgroupsincidents = this.state.configgroupsincidents || [];
        const configgroupsincident = configgroupsincidents.filter(x => x.IdGrupo === IdGrupo);
        if (configgroupsincident.length > 0) {
            return configgroupsincident[0].RecibirEmail;
        }
        else {
            return false;
        }
    }
    isCheckedCall(IdGrupo) {
        const configgroupsincidents = this.state.configgroupsincidents || [];
        const configgroupsincident = configgroupsincidents.filter(x => x.IdGrupo === IdGrupo);
        if (configgroupsincident.length > 0) {
            return configgroupsincident[0].RecibirLlamada;
        }
        else {
            return false;
        }
    }
    showGruposDestinatarios(groups) {
        const _groups = groups || [];
        return _groups.map(group =>
            <li>{this.showGrupoDestinatario(group)}</li>
        );
    }
    showGrupoDestinatario(IdGrupo) {
        const grupo = this.props.groups.find(x => x.IdGrupo === IdGrupo) || defaultGroup;
        return grupo.NombreGrupo;

    }
    GetValueOrden(IdGrupo) {
        const configgroupsincidents = this.state.configgroupsincidents || [];
        const configgroupsincident = configgroupsincidents.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        if (configgroupsincident.length > 0) {
            return configgroupsincident[0].Orden;
        }
        else {
            return 0;
        }
    }
    showGroups() {
        const _groups = this.props.groups === null ? [] : this.props.groups !== undefined ? this.props.groups : [];
        const options = _groups.length > 0 ? _groups.map(group => {
            return (
                <tr>
                    <td><input type="checkbox" value={group.IdGrupo} checked={this.isCheckedGroup(group.IdGrupo)} onChange={this.toggleGroups.bind(this, group.IdGrupo)} /></td>
                    <td><label>{group.NombreGrupo} - ({group.AreaCompetencia})</label></td>
                    <td><input type="checkbox" value={group.IdGrupo} checked={this.isCheckedCall(group.IdGrupo)} onChange={this.toggleCall.bind(this, group.IdGrupo)} /></td>
                    <td><input type="checkbox" value={group.IdGrupo} checked={this.isCheckedSMS(group.IdGrupo)} onChange={this.toggleSMS.bind(this, group.IdGrupo)} /></td>
                    <td><input type="checkbox" value={group.IdGrupo} checked={this.isCheckedEmail(group.IdGrupo)} onChange={this.toggleEmail.bind(this, group.IdGrupo)} /></td>
                    <td><input type="number" value={this.GetValueOrden(group.IdGrupo)} onChange={this.toggleOrden.bind(this, group.IdGrupo)} /></td>
                </tr>);
        }) : [];
        return (<div>
            <table responsive>
                <tr>
                    <th> </th>
                    <th>Grupo</th>
                    <th>Permitir Llamar</th>
                    <th>Enviar SMS</th>
                    <th>Enviar Email</th>
                    <th>Orden</th>
                </tr>
                {options}
            </table>
        </div>);
    }
    toggleGroups(IdGrupo, e) {
        var configgroupsincidents = this.state.configgroupsincidents;
        var configgroupsincident = configgroupsincidents.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        if (configgroupsincident.length > 0) {
            configgroupsincidents.splice(configgroupsincidents.indexOf(configgroupsincident[0]), 1);
        }
        else {
            configgroupsincidents.push(
                {
                    IdGrupo: IdGrupo,
                    RecibirSMS: true,
                    RecibirEmail: true,
                    RecibirLlamada: true,
                    Orden: 0
                }
            );
        }
        this.setState({
            configgroupsincidents: configgroupsincidents
        });
    }
    toggleSMS(IdGrupo, e) {
        var configgroupsincidents = this.state.configgroupsincidents;
        var configgroupsincident = configgroupsincidents.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        if (configgroupsincident.length > 0) {
            var configgroupsincident_new = {
                IdGrupo: configgroupsincident[0].IdGrupo,
                RecibirSMS: !configgroupsincident[0].RecibirSMS,
                RecibirEmail: configgroupsincident[0].RecibirEmail,
                RecibirLlamada: configgroupsincident[0].RecibirLlamada,
                Orden: configgroupsincident[0].Orden
            };
            configgroupsincidents.splice(configgroupsincidents.indexOf(configgroupsincident[0]), 1, configgroupsincident_new);
        }
        else {
            configgroupsincidents.push(
                {
                    IdGrupo: IdGrupo,
                    RecibirSMS: true,
                    RecibirEmail: false,
                    RecibirLlamada: false,
                    Orden: 0
                }
            );
        }
        this.setState({
            configgroupsincidents: configgroupsincidents
        });
    }
    toggleEmail(IdGrupo, e) {
        var configgroupsincidents = this.state.configgroupsincidents;
        var configgroupsincident = configgroupsincidents.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        if (configgroupsincident.length > 0) {
            var configgroupsincident_new = {
                IdGrupo: configgroupsincident[0].IdGrupo,
                RecibirSMS: configgroupsincident[0].RecibirSMS,
                RecibirEmail: !configgroupsincident[0].RecibirEmail,
                RecibirLlamada: configgroupsincident[0].RecibirLlamada,
                Orden: configgroupsincident[0].Orden
            };
            configgroupsincidents.splice(configgroupsincidents.indexOf(configgroupsincident[0]), 1, configgroupsincident_new);
        }
        else {
            configgroupsincidents.push(
                {
                    IdGrupo: IdGrupo,
                    RecibirSMS: false,
                    RecibirEmail: true,
                    RecibirLlamada: false,
                    Orden: 0
                }
            );
        }
        this.setState({
            configgroupsincidents: configgroupsincidents
        });
    }
    toggleCall(IdGrupo, e) {
        var configgroupsincidents = this.state.configgroupsincidents || [];
        var configgroupsincident = configgroupsincidents.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        if (configgroupsincident.length > 0) {
            var configgroupsincident_new = {
                IdGrupo: configgroupsincident[0].IdGrupo,
                RecibirSMS: configgroupsincident[0].RecibirSMS,
                RecibirEmail: configgroupsincident[0].RecibirEmail,
                RecibirLlamada: !configgroupsincident[0].RecibirLlamada,
                Orden: configgroupsincident[0].Orden
            };
            configgroupsincidents.splice(configgroupsincidents.indexOf(configgroupsincident[0]), 1, configgroupsincident_new);
        }
        else {
            configgroupsincidents.push(
                {
                    IdGrupo: IdGrupo,
                    RecibirSMS: false,
                    RecibirEmail: false,
                    RecibirLlamada: true,
                    Orden: 0
                }
            );
        }
        this.setState({
            configgroupsincidents: configgroupsincidents
        });
    }
    toggleOrden(IdGrupo, e) {
        var configgroupsincidents = this.state.configgroupsincidents;
        var configgroupsincident = configgroupsincidents.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        if (configgroupsincident.length > 0) {
            var configgroupsincident_new = {
                IdGrupo: configgroupsincident[0].IdGrupo,
                RecibirSMS: configgroupsincident[0].RecibirSMS,
                RecibirEmail: configgroupsincident[0].RecibirEmail,
                RecibirLlamada: configgroupsincident[0].RecibirLlamada,
                Orden: parseInt(e.target.value, 10)
            };
            configgroupsincidents.splice(configgroupsincidents.indexOf(configgroupsincident[0]), 1, configgroupsincident_new);
        }
        else {
            configgroupsincidents.push(
                {
                    IdGrupo: IdGrupo,
                    RecibirSMS: true,
                    RecibirEmail: true,
                    RecibirLlamada: true,
                    Orden: parseInt(e.target.value, 10)
                }
            );
        }
        this.setState({
            configgroupsincidents: configgroupsincidents
        });
    }

    handleUpdateFunctions(configgroupincident) {
        this.props.getConfigGroupIncidentsByIncident(configgroupincident.IdIncidente);
    }

    handleTest = configgroupincident => {
        //this.props.sendSMS(configgroupincident);
        this.props.sendEmail(configgroupincident);
    }

    toggleContacts(e) {
        var index = parseInt(e.target.value, 10);
        var arr = this.state.idcontacts;
        //var arr = this.state.configgroupincident.contacts;
        arr.indexOf(index) == -1 ? arr.push(index) : arr.splice(arr.indexOf(index), 1);
        this.setState({
            idcontacts: arr,
            configgroupincident:
            {
                ...this.state.configgroupincident,
                contacts: arr,
            }
        });
    }

    showTest(configgroupincident) {
        return <div className="col-md-6" style={{ textAlign: 'right' }}>
            <button className="btn btn-default pull-right btn-lg bgm-OrangeSeguricel" /*width="120px" height="50px"*/ onClick={this.handleTest.bind(this, configgroupincident)}>Test</button>
        </div>;
    }

    FileUpload() {
        const imagePreviewUrl = this.state.configgroupincident.RutaImagenIncidente;
        //let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} width="150px" height="150px" />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return <div className="col-md-4">
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
        </div>;
    }
    //METODO PARA MOSTRAR EL SELECT
    showConfigIncidentTypes(IdTipoIncidente) {
        const defaultOption = 'Seleccione Tipo Incidente...';
        let options = this.props.incidentTypes === null ? '' : (this.props.incidentTypes != undefined ? this.props.incidentTypes.map(function (option) {
            return (
                <option key={option.IdTipoIncidente} value={option.IdTipoIncidente}>
                    {option.DescTipoIncidente}
                </option>
            )
        }) : []);
        return <select className='form-control' name="IdTipoIncidente" onChange={this.handleChange.bind(this)} value={IdTipoIncidente}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;

    }
    showConfigIncidentTypesFilter() {
        const defaultOption = 'Mostrar todos...';
        let options = this.props.incidentTypes === null ? '' : (this.props.incidentTypes != undefined ? this.props.incidentTypes.map(function (option) {
            return (
                <option key={option.IdTipoIncidente} value={option.IdTipoIncidente}>
                    {option.DescTipoIncidente}
                </option>
            )
        }) : []);
        return <select className='form-control' name="IdTipoIncidente" onChange={this._onFilterChange.bind(this, "IdTipoIncidente")} value={this.state.configgroupincident.IdTipoIncidente}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }

    showJobTitles(name_, value_) {
        const defaultOption = 'Seleccione...';
        const _jobtitles = this.props.jobtitles === null ? [] : (this.props.jobtitles !== undefined ? this.props.jobtitles : []);
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
    showDescIncident() {
        let x = this.props.incidentTypes.find(x => x.IdTipoIncidente == this.props.IdIncidentType);
        return x != undefined ? x.DescTipoIncidente : '';
    }
    showDescContact(IdContact) {
        const contact = this.props.contacts.find(x => x.IdContacto == IdContact) || defaultContact;
        return <li>{contact.NombreContacto} - {contact.CargoContacto} - {contact.CorreoElectronico} - {contact.TelefonPrincipal} </li>;

    }

    showDescGroup(IdIncidente) {
        const configgroupincidents = this.state.configgroupincidents || [];
        const configgroupsincident = configgroupincidents.filter(x => x.IdIncidente === IdIncidente);

        if (configgroupsincident.length > 0) {
            const configgroupsincident_ = configgroupsincident[0];
            const groups = this.props.groups || [];
            const group = groups.filter(g => g.IdGrupo === configgroupsincident_.IdGrupo)
            if (group.length > 0)
                return group[0].NombreGrupo;
        }
        else
            return 'NO NAME';
    }

    renderListBody(_configgroupincidents) {
        this.state.records = this.state.configgroupincidents || [];
        return _configgroupincidents.map((configgroupincident, index) =>
            <tr key={index} onDoubleClick={this.handleUpdate.bind(this, configgroupincident)}>
                <td>{configgroupincident.IdContrato}</td>
                <td>{configgroupincident.IdIncidente}</td>
                <td>{configgroupincident.TipoIncidente}</td>
                <td>{configgroupincident.MensajeSMSIncidente}</td>
                <td>{configgroupincident.MensajeEmailIncidente}</td>
            </tr>);
    }

    handleChangeContract(event) {
        const idContrato = event.target.value; 
        this.setState({
            configgroupincident: {
                ...this.state.configgroupincident,
                IdContrato: idContrato
            }
        });
        this.props.getGroupsByContract(idContrato);
    }

    showContractsGroupIncidenta(value_) {
        const defaultOption = 'Seleccione contrato...';
        const _contracts = this.props.contracts || [];
        const options = _contracts.length > 0 ? _contracts.map(function (option) {
            return (
                <option key={option.Id} value={option.Id}>
                    {option.NombreCompletoContrato}
                </option>
            );
        }) : [];
        return (<div><select className='form-control input-sm' name="IdContrato" onChange={this.handleChangeContract.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>
            <br />
        </div>);
    }
    renderNew() {
        const configgroupincident = this.state.configgroupincident;
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} width="150px" height="150px" />);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return <div>
            {this.showContractsGroupIncidenta(configgroupincident.IdContrato)}
            {this.showConfigIncidentTypes(configgroupincident.IdTipoIncidente)}
            {this.showGroups()}
            <textarea className="form-control auto-size" name="MensajeEmailIncidente" value={configgroupincident.MensajeEmailIncidente} onChange={this.handleChange.bind(this)}
                placeholder="Escribe aqui Mensaje Email..." />
            <textarea className="form-control auto-size" name="MensajeSMSIncidente" value={configgroupincident.MensajeSMSIncidente} onChange={this.handleChange.bind(this)}
                placeholder="Escribe aqui Mensaje SMS..." />
        </div>
    }

    getListByContract(idContrato) {
        this.props.getConfigGroupIncidentsByContract(idContrato);
    }
}

export default connect(
    state => state.configgroupincident, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(ConfigGroupIncidentStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(ConfigGroupIncidentApp);