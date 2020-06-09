import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ConfigRoundAlarmStore from '../store/ConfigRoundAlarm';
import { Mode } from '../store/Utils';
import { defaultPeriod } from '../store/Period';
import { defaultContact } from '../store/Contacts';
import { BaseApp } from '../components/BaseApp';
/*type ConfigRoundAlarmProps =
    ConfigRoundAlarmStore.ConfigRoundAlarmState
    & typeof ConfigRoundAlarmStore.actionCreators
    & RouteComponentProps<{}>;
*/
class ConfigRoundAlarmApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'configroundalarm',
        listObjetos: 'configroundalarms',
        defaultObjeto: ConfigRoundAlarmStore.defaultConfigRoundAlarm,
        configroundalarms: [],
        configroundalarm: ConfigRoundAlarmStore.defaultConfigRoundAlarm,
        configroundalarm_old: ConfigRoundAlarmStore.defaultConfigRoundAlarm,
        TipoEnvio: 1,
        fieldList: {
            IdAlarmaRonda: { ...this.defaultField, description: 'IdAlarmaRonda' },
            IdPeriodo: { ...this.defaultField, description: 'Periodo' },
            HorarioInicioAR: { ...this.defaultField, description: 'Horario Inicio' },
            HorarioFinAR: { ...this.defaultField, description: 'Horario Fin' },
            CantidadEventosAR: { ...this.defaultField, description: 'Nro. Eventos' },
            // <td>{this.showDestinatarios(_configRoundAlarm.contacts): '
            NotifificacionAR: { ...this.defaultField, description: 'Notificacion' },
            MensajeAR: { ...this.defaultField, description: 'Contenido del mensaje' },
        }
    }

    componentWillMount() {
        try {
            super.componentWillMount();
            this.props.getConfigRoundAlarms();
            this.props.getPeriods();
            this.props.getContacts();
        } catch (reason) {
            console.log('Error in componentWillMount - ConfigRoundAlarmApp:' + reason);
        }

    }

    procesarResponse(nextProps) {
        try {

        }
        catch (reason) {
            const msg = reason;
        }
    }

    processSubmit() {
        switch (this.state.mode) {
            case Mode.Create:
                this.props.create(this.state.configroundalarm);
                break;
            case Mode.Update:
                this.props.update(this.state.configroundalarm);
                break;
            case Mode.Delete:
                this.props.delete(this.state.configroundalarm);
                break;
            default:
                break;
        }
    }

    showContacts_(name_, value_) {
        const defaultOption = 'Seleccione Contacto...';
        const _contacts = this.props.contacts === null ? [] : this.props.contacts !== undefined ? this.props.contacts : [];
        const options = _contacts.length > 0 ? _contacts.map(function (option) {
            return (
                <option key={option.IdContacto} value={option.IdContacto}>
                    {option.NombreContacto} - ({option.CargoContacto})
                </option>
            );
        }) : [];
        return (<select className='form-control input-sm' name={name_} onChange={this.handleContacts.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    toggleContacts(e) {
        var index;
        index = parseInt(e.target.value);
        var arr = this.state.configroundalarm.contacts;
        //var arr = this.state.configincidentcontact.contacts;
        arr.indexOf(index) === -1 ? arr.push(index) : arr.splice(arr.indexOf(index), 1);
        this.setState({
            configroundalarm:
            {
                ...this.state.configroundalarm,
                contacts: arr
            }
        });
    }

    isChecked(IdContacto) {
        const contacts = this.state.configroundalarm.contacts || [];
        return contacts.indexOf(IdContacto) !== -1;
    }
    showContacts(name_, value_) {
        const defaultOption = 'Seleccione...';
        const _contacts = this.props.contacts === null ? [] : this.props.contacts !== undefined ? this.props.contacts : [];
        const options = _contacts.length > 0 ? _contacts.map(contact => {
            return (<div>
                <input type="checkbox" value={contact.IdContacto} checked={this.isChecked(contact.IdContacto)} onChange={this.toggleContacts.bind(this)} />
                <label>{contact.NombreContacto} - ({contact.CargoContacto})</label></div>);
        }) : [];
        return options;
    }

    showNotification(name_, value_) {
        const defaultOption = 'Seleccione Tipo Notificacion...';

        const _notifications = [{ id: '1', desc: 'SMS' }, { id: '2', desc: 'CORREO' }];
        const options = _notifications.length > 0 ? _notifications.map(function (option) {
            return (
                <option key={option.id} value={option.id}>
                    {option.desc}
                </option>
            );
        }) : [];
        return (<select className='form-control input-sm' name={name_} onChange={this.handleChange.bind(this)} value={value_.trim()}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    handleTipoEnvio = event => {
        event.preventDefault();
        this.setState({
            TipoEnvio: event.currentTarget.value,
            configroundalarm: {
                ...this.state.configroundalarm,
                IdTipoEnvio: event.currentTarget.value,
                EnvioAR: event.currentTarget.value === '1' ? '00:00:00' : this.state.configroundalarm.EnvioAR
            }
        });
    }

    renderNew() {
        try {
            const _configRoundAlarm = this.state.configroundalarm;
            return (<div className="card-body card-padding">
                <div className="input-group">
                    <b><p><span>Periodo</span></p></b>
                    {this.showPeriods('IdPeriodo', _configRoundAlarm.IdPeriodo)}
                </div>
                <div className="input-group">
                    <b><p><span>Contacto</span></p></b>
                    {this.showContacts('IdContacto', _configRoundAlarm.IdContacto)}
                    <button onClick={() => this.props.history.push('/contacts')}>Agregar</button>
                </div>
                <div className="input-group">
                    <b><p><span>Hora Inicio</span></p></b>
                    <input type="time" className="form-control" name="HorarioInicioAR" onChange={this.handleChange.bind(this)} value={_configRoundAlarm.HorarioInicioAR} />
                </div>
                <div className="input-group">
                    <b><p><span>Hora Fin</span></p></b>
                    <input type="time" className="form-control" name="HorarioFinAR" onChange={this.handleChange.bind(this)} value={_configRoundAlarm.HorarioFinAR} />
                </div>
                <div className="input-group">
                    <b><p><span>Eventos</span></p></b>
                    <input type="number" className="form-control" name="CantidadEventosAR" onChange={this.handleChange.bind(this)} value={_configRoundAlarm.CantidadEventosAR} />
                </div>
                <div className="input-group">
                    <b><p><span>Notificacion</span></p></b>
                    {this.showNotification('NotifificacionAR', _configRoundAlarm.NotifificacionAR)}
                </div>
                <div className="input-group">
                    <b><p><span>Envio</span></p></b>
                    <select className="form-control input-sm" value={_configRoundAlarm.IdTipoEnvio} onChange={this.handleTipoEnvio.bind(this)}>
                        <option key={0} value={0}>Seleccione una opcion...</option>
                        <option key={1} value={1}>De inmediato</option>
                        <option key={2} value={2}>Hora especifica</option>
                    </select>
                </div>
                <div className="input-group">
                    <input type="time" className="form-control" name="EnvioAR" onChange={this.handleChange.bind(this)} value={_configRoundAlarm.EnvioAR} />
                </div>
                <div className="input-group">
                    <b><p><span>Contenido del mensaje</span></p></b>
                    <textarea className="form-control auto-size" name="MensajeAR" value={_configRoundAlarm.MensajeAR} onChange={this.handleChange.bind(this)}
                        placeholder="Escribe aqui Mensaje de la alarma..."
                    />
                </div>
            </div>);
        } catch (reason) {
            const msg = reason;
        }
    }

    showDescPeriod(IdPeriodo) {
        if (IdPeriodo) {
            const period = this.props.periods.find(period => period.IdPeriodo === IdPeriodo) || defaultPeriod;
            return period.DescPeriodo;
        }
        else {
            return '';
        }
    }
    showDestinatarios(contacts) {
        return contacts.map(contact =>
            <li>{this.showDestinatario(contact)}</li>
        );
    }
    renderListBody(_configRoundAlarms) {
        this.state.records = this.state.configroundalarms || [];
        return (_configRoundAlarms.map((_configRoundAlarm, index) =>
            (<tr key={index} onDoubleClick={this.handleUpdate.bind(this, _configRoundAlarm)}>
            <td>{this.showDescPeriod(_configRoundAlarm.IdPeriodo)}</td>
            <td>{_configRoundAlarm.HorarioInicioAR} </td>
            <td>{_configRoundAlarm.HorarioFinAR} </td>
            <td>{_configRoundAlarm.CantidadEventosAR} </td>
            <td>{this.showDestinatarios(_configRoundAlarm.contacts)} </td>
            <td>{_configRoundAlarm.IdTipoEnvio === 1 ? 'De inmediato' : _configRoundAlarm.EnvioAR} </td>
            <td>{_configRoundAlarm.NotifificacionAR === '1' ? 'SMS' : 'CORREO'} </td>
            <td>{_configRoundAlarm.MensajeAR} </td>
        </tr>)));
    }
    showDestinatario(IdContacto) {
        const contacto = this.props.contacts.find(x => x.IdContacto === IdContacto) || defaultContact;
        return contacto.NombreContacto + ' (' + contacto.CargoContacto + ')';

    }
}

// Wire up the React component to the Redux store
export default connect(
    state => state.configroundalarm, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(ConfigRoundAlarmStore.actionCreators, dispatch)// Selects which action creators are merged into the component's props
)(ConfigRoundAlarmApp);