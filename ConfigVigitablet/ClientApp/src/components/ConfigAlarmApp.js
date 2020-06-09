import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ConfigAlarmStore from '../store/ConfigAlarm';
import { Mode, isEmpty } from '../store/Utils';
import { defaultPeriod } from '../store/Period';
import { defaultContact } from '../store/Contacts';
import { defaultGroup } from '../store/Group';
import { BaseApp } from '../components/BaseApp';

/*type ConfigAlarmProps =
    ConfigAlarmStore.ConfigAlarmState
    & typeof ConfigAlarmStore.actionCreators
    & RouteComponentProps<{}>;
*/
class ConfigAlarmApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'configalarm',
        listObjetos: 'configalarms',
        defaultObjeto: ConfigAlarmStore.defaultConfigAlarm,
        configalarms: [],
        configalarm: ConfigAlarmStore.defaultConfigAlarm,
        configalarm_old: ConfigAlarmStore.defaultConfigAlarm,
        IdTipoEnvioAlarma: 1,
        configalarmgroups: [],
        title: 'ALARMAS',
        subtitle: 'Lista de Alarmas',
        addNewTitle: 'Agregar Nueva Alarma',
        editTitle: 'Editar Alarma',
        listTitle: 'Lista de Alarmas',
        fieldList: {
            IdContrato: this.fieldContract,
            IdAlarma: { ...this.defaultField, description: 'Id Alarma' },
            IdTipoAlarma: { ...this.defaultField, description: 'Tipo Alarma' },
            IdTipoEventoAlarma: { ...this.defaultField, description: 'Tipo Evento' },
            IdTipoActivacionAlarma: { ...this.defaultField, description: 'Tipo Activacion' },
            IdTipoEnvioAlarma: { ...this.defaultField, description: 'Tipo Envio' },
            IdTipoLlamadaAlarma: { ...this.defaultField, description: 'Tipo Llamada' },
            CantidadEventos: { ...this.defaultField, description: 'Nro. Eventos' },
            //IdTipoEnvioAlarma: 'Hora Envio',
            IdTipoNotificacionAlarma: { ...this.defaultField, description: 'Notificacion' },
            MensajeSMS: { ...this.defaultField, description: 'Contenido del mensaje SMS' },
            MensajeEmail: { ...this.defaultField, description: 'Contenido del mensaje Email' },
            //Destinatarios: { ...this.defaultField, description: 'Destinatario' }
        },
        getObjetos: "getConfigAlarms"
    }

    toggleGroups(IdGrupo, e) {
        var configalarmgroups = this.state.configalarmgroups;
        var configalarmgroup = configalarmgroups.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        if (configalarmgroup.length > 0) {
            var configalarmgroup_new = {
                IdGrupo: configalarmgroup[0].IdGrupo,
                RecibirSMS: configalarmgroup[0].RecibirSMS,
                RecibirEmail: configalarmgroup[0].RecibirEmail,
                RecibirLlamada: configalarmgroup[0].RecibirLlamada,
                Orden: configalarmgroup[0].Orden
            };
            configalarmgroups.splice(configalarmgroups.indexOf(configalarmgroup[0]), 1, configalarmgroup_new);
        }
        else {
            configalarmgroups.push(
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
            configalarmgroups: configalarmgroups
        });
    }
    toggleSMS(IdGrupo, e) {
        var configalarmgroups = this.state.configalarmgroups;
        var configalarmgroup = configalarmgroups.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        if (configalarmgroup.length > 0) {
            var configalarmgroup_new = {
                IdGrupo: configalarmgroup[0].IdGrupo,
                RecibirSMS: !configalarmgroup[0].RecibirSMS,
                RecibirEmail: configalarmgroup[0].RecibirEmail,
                RecibirLlamada: configalarmgroup[0].RecibirLlamada,
                Orden: configalarmgroup[0].Orden
            };
            configalarmgroups.splice(configalarmgroups.indexOf(configalarmgroup[0]), 1, configalarmgroup_new);
        }
        else {
            configalarmgroups.push(
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
            configalarmgroups: configalarmgroups
        });
    }
    toggleEmail(IdGrupo, e) {
        var configalarmgroups = this.state.configalarmgroups;
        var configalarmgroup = configalarmgroups.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        if (configalarmgroup.length > 0) {
            var configalarmgroup_new = {
                IdGrupo: configalarmgroup[0].IdGrupo,
                RecibirSMS: configalarmgroup[0].RecibirSMS,
                RecibirEmail: !configalarmgroup[0].RecibirEmail,
                RecibirLlamada: configalarmgroup[0].RecibirLlamada,
                Orden: configalarmgroup[0].Orden
            };
            configalarmgroups.splice(configalarmgroups.indexOf(configalarmgroup[0]), 1, configalarmgroup_new);
        }
        else {
            configalarmgroups.push(
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
            configalarmgroups: configalarmgroups
        });
    }
    toggleCall(IdGrupo, e) {
        var configalarmgroups = this.state.configalarmgroups || [];
        var configalarmgroup = configalarmgroups.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        if (configalarmgroup.length > 0) {
            var configalarmgroup_new = {
                IdGrupo: configalarmgroup[0].IdGrupo,
                RecibirSMS: configalarmgroup[0].RecibirSMS,
                RecibirEmail: configalarmgroup[0].RecibirEmail,
                RecibirLlamada: !configalarmgroup[0].RecibirLlamada,
                Orden: configalarmgroup[0].Orden
            };
            configalarmgroups.splice(configalarmgroups.indexOf(configalarmgroup[0]), 1, configalarmgroup_new);
        }
        else {
            configalarmgroups.push(
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
            configalarmgroups: configalarmgroups
        });
    }
    toggleOrden(IdGrupo, e) {
        var configalarmgroups = this.state.configalarmgroups;
        var configalarmgroup = configalarmgroups.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        if (configalarmgroup.length > 0) {
            var configalarmgroup_new = {
                IdGrupo: configalarmgroup[0].IdGrupo,
                RecibirSMS: configalarmgroup[0].RecibirSMS,
                RecibirEmail: configalarmgroup[0].RecibirEmail,
                RecibirLlamada: configalarmgroup[0].RecibirLlamada,
                Orden: parseInt(e.target.value, 10)
            };
            configalarmgroups.splice(configalarmgroups.indexOf(configalarmgroup[0]), 1, configalarmgroup_new);
        }
        else {
            configalarmgroups.push(
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
            configalarmgroups: configalarmgroups
        });
    }

    validate = configalarm => {
        // true means invalid, so our conditions got reversed
        return {
            //IdAlarma: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: isEmpty(configalarm.IdAlarma) },
            IdContrato: { errorMessage: "Falta Contrato", isRequired: true, valid: configalarm.IdContrato > 0, isEmpty: false/*isEmpty(configalarm.IdContrato)*/ },
            IdTipoAlarma: { errorMessage: "Falta Tipo Alarma", isRequired: true, valid: configalarm.IdTipoAlarma > 0, isEmpty: false/*isEmpty(configalarm.IdTipoAlarma)*/ },
            IdTipoActivacionAlarma: { errorMessage: "Falta Tipo Activacion Alarma", isRequired: true, valid: configalarm.IdTipoActivacionAlarma > 0, isEmpty: false/*isEmpty(configalarm.IdTipoActivacionAlarma)*/ },
            CantidadEventos: { errorMessage: "Falta Cantidad Eventos", isRequired: true, valid: configalarm.CantidadEventos > 0, isEmpty: false/*isEmpty(configalarm.CantidadEventos)*/ },
            IdTipoEventoAlarma: { errorMessage: "Falta Tipo Evento Alarma", isRequired: true, valid: configalarm.IdTipoEventoAlarma > 0, isEmpty: false/*isEmpty(configalarm.IdTipoEventoAlarma)*/ },
            IdTipoNotificacionAlarma: { errorMessage: "Falta Tipo Notificacion Alarma", isRequired: true, valid: configalarm.IdTipoNotificacionAlarma > 0, isEmpty: false/*isEmpty(configalarm.IdTipoNotificacionAlarma)*/ },
            IdTipoEnvioAlarma: { errorMessage: "Falta Tipo Envio Alarma", isRequired: true, valid: configalarm.IdTipoEnvioAlarma > 0, isEmpty: false/*isEmpty(configalarm.IdTipoEnvioAlarma)*/ },
            IdTipoLlamadaAlarma: { errorMessage: "Falta Tipo Llamada Alarma", isRequired: true, valid: configalarm.IdTipoLlamadaAlarma > 0, isEmpty: false/*isEmpty(configalarm.IdTipoLlamadaAlarma)*/ },
            MensajeEmail: { errorMessage: "Falta Mensaje Email", isRequired: true, valid: true, isEmpty: isEmpty(configalarm.MensajeEmail) },
            MensajeSMS: { errorMessage: "Falta Mensaje SMS", isRequired: true, valid: true, isEmpty: isEmpty(configalarm.MensajeSMS) },
            //IdTipoAviso: { errorMessage: "Falta Tipo Aviso", isRequired: true, valid: true, isEmpty: isEmpty(configalarm.IdTipoAviso) },
            //IdTipoEnvio: { errorMessage: "Falta Tipo Envio", isRequired: true, valid: true, isEmpty: isEmpty(configalarm.IdTipoEnvio) },
            //FechaUltActualizacion: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: isEmpty(configalarm.FechaUltActualizacion) },
            //IdUsuario: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: isEmpty(configalarm.IdUsuario) }
        };
    };

    constructor() {
        super();
        this.state.title = "ALARMAS";
    }

    componentWillMount() {
        try {
            super.componentWillMount();
            this.props.getConfigAlarms();
            this.props.getPeriods();
            this.props.getGroups();
            this.props.getAlarmTypes();
            this.props.getAlarmEventTypes();
            this.props.getAlarmNotificationTypes();
            this.props.getAlarmCallingTypes();
            this.props.getAlarmActivationTypes();
            this.props.getAlarmShipmentTypes();
            //this.props.getContactsByContract(22);
        } catch (reason) {
            console.log('Error in componentWillMount - ConfigAlarmApp:' + reason);
        }

    }

    procesarResponse(nextProps) {
        if (nextProps.configalarmgroups !== this.props.configalarmgroups) {
            this.setState({
                configalarmgroups: nextProps.configalarmgroups
            });
        }
    }

    handleUpdateFunctions(configalarm) {
        this.props.getConfigGroupAlarms(configalarm.IdAlarma);
    }

    processSubmit = () => {
        try {
            //this.state.configalarm.IdContrato = this.state.IdContrato;
            const configgroupalarms_ = this.state.configalarmgroups;
            var configgroupalarms = [];
            configgroupalarms_.map(x => {
                configgroupalarms.push([x.IdGrupo, x.RecibirLlamada ? 1 : 0, x.RecibirSMS ? 1 : 0, x.RecibirEmail ? 1 : 0, x.Orden]);
            });
            switch (this.state.mode) {
                case Mode.Create:
                    this.props.create(this.state.configalarm, configgroupalarms);
                    break;
                case Mode.Update:
                    this.props.update(this.state.configalarm, configgroupalarms);
                    break;
                case Mode.Delete:
                    this.props.delete(this.state.configalarm);
                    break;
                default:
                    break;
            }
        } catch (reason) {
            alert('FALTAN DATOS');
        }
    }

    isChecked(IdGrupo) {
        const configalarmgroups = this.state.configalarmgroups || [];
        const configalarmgroup = configalarmgroups.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        return configalarmgroup.length > 0;
    }

    isCheckedSMS(IdGrupo) {
        const configalarmgroups = this.state.configalarmgroups || [];
        const configalarmgroup = configalarmgroups.filter(x => x.IdGrupo === IdGrupo);
        if (configalarmgroup.length > 0) {
            return configalarmgroup[0].RecibirSMS;
        }
        else {
            return false;
        }
    }

    isCheckedEmail(IdGrupo) {
        const configalarmgroups = this.state.configalarmgroups || [];
        const configalarmgroup = configalarmgroups.filter(x => x.IdGrupo === IdGrupo);
        if (configalarmgroup.length > 0) {
            return configalarmgroup[0].RecibirEmail;
        }
        else {
            return false;
        }
    }
    isCheckedCall(IdGrupo) {
        const configalarmgroups = this.state.configalarmgroups || [];
        const configalarmgroup = configalarmgroups.filter(x => x.IdGrupo === IdGrupo);
        if (configalarmgroup.length > 0) {
            return configalarmgroup[0].RecibirLlamada;
        }
        else {
            return false;
        }
    }

    selectBody(_name, _value, defaultOption, options) {
        return (<select className='form-control input-sm' name={_name} onChange={this.handleChange.bind(this)} value={_value}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    showTipoEventoAlarma(name_, value_) {
        const defaultOption = 'Seleccione el tipo de alarma...';
        const _events = this.props.alarmeventtypes || [];
        const options = _events.length > 0 ? _events.map(function (option) {
            return (
                <option key={option.IdTipoEventoAlarma} value={option.IdTipoEventoAlarma}>
                    {option.DescTipoEventoAlarma}
                </option>
            );
        }) : [];
        return (<select className='form-control input-sm' name={name_} onChange={this.handleChange.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    showTipoEnvioAlarma(name_, value_) {
        const defaultOption = 'Seleccione...';
        const _tiposEnvio = this.props.alarmshipmenttypes || [];
        const options = _tiposEnvio.length > 0 ? _tiposEnvio.map(function (option) {
            return (
                <option key={option.IdTipoEnvioAlarma} value={option.IdTipoEnvioAlarma}>
                    {option.DescTipoEnvioAlarma}
                </option>
            );
        }) : [];
        return (<select className='form-control input-sm' name={name_} onChange={this.handleChange.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    showTipoAlarma(name_, value_) {
        const defaultOption = 'Seleccione...';
        const _tiposAlarmas = this.props.alarmtypes || [];
        const options = _tiposAlarmas.length > 0 ? _tiposAlarmas.map(function (option) {
            return (
                <option key={option.IdTipoAlarma} value={option.IdTipoAlarma}>
                    {option.DescTipoAlarma}
                </option>
            );
        }) : [];
        return (<select className='form-control input-sm' name={name_} onChange={this.handleChange.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    showTipoActivacionAlarma(name_, value_) {
        const defaultOption = 'Seleccione...';
        const _tiposActivacion = this.props.alarmactivationtypes || [];
        const options = _tiposActivacion.length > 0 ? _tiposActivacion.map(function (option) {
            return (
                <option key={option.IdTipoActivacionAlarma} value={option.IdTipoActivacionAlarma}>
                    {option.DescTipoActivacionAlarma}
                </option>
            );
        }) : [];
        return (<select className='form-control input-sm' name={name_} onChange={this.handleChange.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    showTipoNotificationAlarma(name_, value_) {
        const defaultOption = 'Seleccione...';
        const _notifications = this.props.alarmnotificationtypes;
        const options = _notifications.length > 0 ? _notifications.map(function (option) {
            return (
                <option key={option.IdTipoNotificacionAlarma} value={option.IdTipoNotificacionAlarma}>
                    {option.DescTipoNotificacionAlarma}
                </option>
            );
        }) : [];
        return (<select className='form-control input-sm' name={name_} onChange={this.handleChange.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    showTipoLlamadaAlarma(name_, value_) {
        const defaultOption = 'Seleccione...';
        const _callings = this.props.alarmcallingtypes || [];
        const options = _callings.length > 0 ? _callings.map(function (option) {
            return (
                <option key={option.IdTipoLlamadaAlarma} value={option.IdTipoLlamadaAlarma}>
                    {option.DescTipoLlamadaAlarma}
                </option>
            );
        }) : [];
        return (<select className='form-control input-sm' name={name_} onChange={this.handleChange.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    handleTipoEnvio = event => {
        event.preventDefault();
        this.setState({
            IdTipoEnvioAlarma: event.currentTarget.value,
            configalarm: {
                ...this.state.configalarm,
                IdTipoEnvioAlarma: event.currentTarget.value,
                HoraEnvio: event.currentTarget.value === '1' ? '00:00:00' : this.state.configalarm.HoraEnvio
            }
        });
    }

    renderNew() {
        const _configAlarm = this.state.configalarm;
        try {
            return (<div className="row">
                <div className="input-group">
                    <div className="fg-line">
                        {this.showContracts(_configAlarm.IdContrato)}
                    </div>
                </div>
                <div className="col-xs-12">
                    <b><p><span>Tipo Activacion</span></p></b>
                </div>
                <div className="input-group">
                    <div className="fg-line">
                        {this.showTipoActivacionAlarma('IdTipoActivacionAlarma', _configAlarm.IdTipoActivacionAlarma)}
                    </div>
                </div>
                <div className="col-xs-12">
                    <b><p><span>Grupos</span></p></b>
                </div>
                <div className="input-group">
                    <div className="fg-line">
                        {this.showGroups()}
                    </div>
                </div>
                <div className="col-md-12">
                    <b><p><span>Hora Envio</span></p></b>
                </div>
                <div className="input-group">
                    <div className="fg-line">
                        <input type="time" className="form-control" name="HoraEnvio" onChange={this.handleChange.bind(this)} value={_configAlarm.HoraEnvio} />
                    </div>
                </div>
                <div className="col-md-12">
                    <b><p><span>Eventos</span></p></b>
                </div>
                <div className="input-group">
                    <div className="fg-line">
                        <input type="number" className="form-control" name="CantidadEventos" onChange={this.handleChange.bind(this)} value={_configAlarm.CantidadEventos} />
                    </div>
                </div>
                <div className="col-md-12">
                    <b><p><span>Notificacion</span></p></b>
                </div>
                <div className="input-group">
                    <div className="fg-line">
                        {/*<input type="text" className="form-control" name="IdTipoNotificacionAlarma" onChange={this.handleChange.bind(this)} value={_configAlarm.IdTipoNotificacionAlarma} />*/}
                        {this.showTipoNotificationAlarma('IdTipoNotificacionAlarma', _configAlarm.IdTipoNotificacionAlarma)}
                    </div>
                </div>
                <div className="col-md-12">
                    <b><p><span>Tipo llamada</span></p></b>
                </div>
                <div className="input-group">
                    <div className="fg-line">
                        {/*<input type="text" className="form-control" name="IdTipoNotificacionAlarma" onChange={this.handleChange.bind(this)} value={_configAlarm.IdTipoNotificacionAlarma} />*/}
                        {this.showTipoLlamadaAlarma('IdTipoLlamadaAlarma', _configAlarm.IdTipoLlamadaAlarma)}
                    </div>
                </div>
                <div className="col-md-12">
                    <b><p><span>Tipo Alarma</span></p></b>
                </div>
                <div className="input-group">
                    <div className="fg-line">
                        {/*<input type="text" className="form-control" name="IdTipoNotificacionAlarma" onChange={this.handleChange.bind(this)} value={_configAlarm.IdTipoNotificacionAlarma} />*/}
                        {this.showTipoAlarma('IdTipoAlarma', _configAlarm.IdTipoAlarma)}
                    </div>
                </div>
                <div className="col-md-12">
                    <b><p><span>Tipo Evento</span></p></b>
                </div>
                <div className="input-group">
                    <div className="fg-line">
                        {/*<input type="text" className="form-control" name="IdTipoNotificacionAlarma" onChange={this.handleChange.bind(this)} value={_configAlarm.IdTipoNotificacionAlarma} />*/}
                        {this.showTipoEventoAlarma('IdTipoEventoAlarma', _configAlarm.IdTipoEventoAlarma)}
                    </div>
                </div>
                <div className="col-md-12">
                    <b><p><span>Tipo Envio</span></p></b>
                </div>
                <div className="input-group">
                    <div className="fg-line">
                        {/*<input type="text" className="form-control" name="IdTipoNotificacionAlarma" onChange={this.handleChange.bind(this)} value={_configAlarm.IdTipoNotificacionAlarma} />*/}
                        {this.showTipoEnvioAlarma('IdTipoEnvioAlarma', _configAlarm.IdTipoEnvioAlarma)}
                    </div>
                </div>
                {/*<div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Destinatario</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="time" className="form-control" name="IdTipoEnvioAlarma" onChange={this.handleChange.bind(this)} value={_configAlarm.} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>*/}
                <div className="input-group">
                    <div className="fg-line" hidden={_configAlarm.IdTipoEnvioAlarma !== 2}>
                        <input type="time" className="form-control" name="IdTipoEnvioAlarma" onChange={this.handleChange.bind(this)} value={_configAlarm.IdTipoEnvioAlarma} />
                    </div>
                </div>
                <div className="col-md-12">
                    <b><p><span>Contenido del mensaje SMS</span></p></b>
                </div>
                <div className="input-group">
                    <div className="fg-line">
                        <textarea className="form-control auto-size" name="MensajeSMS" value={_configAlarm.MensajeSMS} onChange={this.handleChange.bind(this)}
                            placeholder="Escribe aqui Mensaje de la alarma..."
                        />
                    </div>
                </div>
                <div className="col-md-12">
                    <b><p><span>Contenido del mensaje Email</span></p></b>
                </div>
                <div className="input-group">
                    <div className="fg-line">
                        <textarea className="form-control auto-size" name="MensajeEmail" value={_configAlarm.MensajeEmail} onChange={this.handleChange.bind(this)}
                            placeholder="Escribe aqui Mensaje de la alarma..."
                        />
                    </div>
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

    showGruposDestinatarios(groups) {
        const _groups = groups || [];
        return _groups.map(group =>
            <li>{this.showGrupoDestinatario(group)}</li>
        );
    }

    //renderElementTable(_configAlarm) {
    renderListBody(_configAlarms) {
        this.state.records = this.state.configAlarms;
        return _configAlarms.map((_configAlarm, index) => (<tr key={index} onDoubleClick={this.handleUpdate.bind(this, _configAlarm)}>
            <td>{this.showDescContracts(_configAlarm.IdContrato)}</td>
            <td>{this.showDescTipoAlarma(_configAlarm.IdTipoAlarma)} </td>
            <td>{this.showDescTipoEvento(_configAlarm.IdTipoEventoAlarma)} </td>
            <td>{this.showDescTipoActivacion(_configAlarm.IdTipoActivacionAlarma)} </td>
            <td>{this.showDescTipoEnvio(_configAlarm.IdTipoEnvioAlarma)} </td>
            <td>{this.showDescTipoLlamada(_configAlarm.IdTipoLlamadaAlarma)} </td>
            <td>{_configAlarm.CantidadEventos} </td>
            <td>{_configAlarm.IdTipoEnvioAlarma === 1 ? 'De inmediato' : _configAlarm.IdTipoEnvioAlarma} </td>
            <td>{this.showDescTipoNotificacion(_configAlarm.IdTipoNotificacionAlarma)} </td>
            <td>{_configAlarm.MensajeSMS} </td>
            <td>{_configAlarm.MensajeEmail} </td>
            <td>{this.showGruposDestinatarios(_configAlarm.groups)} </td>
        </tr>));
    }

    showDestinatario(IdContacto) {
        const contacto = this.props.contacts.find(x => x.IdContacto === IdContacto) || defaultContact;
        return contacto.NombreContacto + ' (' + contacto.CargoContacto + ')';

    }

    showGrupoDestinatario(IdGrupo) {
        const grupo = this.props.groups.find(x => x.IdGrupo === IdGrupo) || defaultGroup;
        return grupo.NombreGrupo;

    }

    showDescTipoAlarma(IdTipoAlarma) {
        const tipoalarma = this.props.alarmtypes.find(x => x.IdTipoAlarma === IdTipoAlarma) || 0;
        return tipoalarma.DescTipoAlarma;

    }

    showDescTipoNotificacion(IdTipoNotificacionAlarma) {
        const notificacion = this.props.alarmnotificationtypes.find(x => x.IdTipoNotificacionAlarma === IdTipoNotificacionAlarma) || 0;
        return notificacion.DescTipoNotificacionAlarma;

    }

    showDescTipoActivacion(IdTipoActivacionAlarma) {
        const activacion = this.props.alarmactivationtypes.find(x => x.IdTipoActivacionAlarma === IdTipoActivacionAlarma) || 0;
        return activacion.DescTipoActivacionAlarma;

    }

    showDescTipoEvento(IdTipoEventoAlarma) {
        const evento = this.props.alarmeventtypes.find(x => x.IdTipoEventoAlarma === IdTipoEventoAlarma) || 0;
        return evento.DescTipoEventoAlarma;

    }

    showDescTipoLlamada(IdTipoLlamadaAlarma) {
        var alarmcallingtypes = this.props.alarmcallingtypes || [];
        const llamada = alarmcallingtypes.find(x => x.IdTipoLlamadaAlarma === IdTipoLlamadaAlarma) || 0;
        return llamada.DescTipoLlamadaAlarma;

    }

    showDescTipoEnvio(IdTipoEnvioAlarma) {
        const Envio = this.props.alarmshipmenttypes.find(x => x.IdTipoEnvioAlarma === IdTipoEnvioAlarma) || 0;
        return Envio.DescTipoEnvioAlarma;

    }

    GetValueOrden(IdGrupo) {
        const configalarmgroups = this.state.configalarmgroups || [];
        const configalarmgroup = configalarmgroups.filter(x => x.IdGrupo === parseInt(IdGrupo, 10));
        if (configalarmgroup.length > 0) {
            return configalarmgroup[0].Orden;
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
                    <td><input type="checkbox" value={group.IdGrupo} checked={this.isChecked(group.IdGrupo)} onChange={this.toggleGroups.bind(this, group.IdGrupo)} /></td>
                    <td><label>{group.NombreGrupo} - ({group.AreaCompetencia})</label></td>
                    <td><input type="checkbox" value={group.IdGrupo} checked={this.isCheckedCall(group.IdGrupo)} onChange={this.toggleCall.bind(this, group.IdGrupo)} /></td>
                    <td><input type="checkbox" value={group.IdGrupo} checked={this.isCheckedSMS(group.IdGrupo)} onChange={this.toggleSMS.bind(this, group.IdGrupo)} /></td>
                    <td><input type="checkbox" value={group.IdGrupo} checked={this.isCheckedEmail(group.IdGrupo)} onChange={this.toggleEmail.bind(this, group.IdGrupo)} /></td>
                    <td><input type="numeric" value={this.GetValueOrden(group.IdGrupo)} onChange={this.toggleOrden.bind(this, group.IdGrupo)} /></td>
                </tr>);
        }) : [];
        return (<div>
            <table>
                <tr>
                    <th> </th>
                    <th>Grupo</th>
                    <th>Permitir Llamar</th>
                    <th>Enviar SMS</th>
                    <th>Enviar Email</th>
                </tr>
                {options}
            </table>
        </div>);
    }
}
// Wire up the React component to the Redux store
export default connect(
    state => state.configalarm, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(ConfigAlarmStore.actionCreators, dispatch)// Selects which action creators are merged into the component's props
)(ConfigAlarmApp);