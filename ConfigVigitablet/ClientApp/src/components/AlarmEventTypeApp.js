import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AlarmEventTypesStore from '../store/AlarmEventType';
import { Mode, isEmpty } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';

class AlarmEventTypeApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'alarmeventtype',
        listObjetos: 'alarmeventtypes',
        defaultObjeto: AlarmEventTypesStore.defaultAlarmEventType,
        alarmeventtypes: [],
        alarmeventtype: AlarmEventTypesStore.defaultAlarmEventType,
        alarmeventtype_old: AlarmEventTypesStore.defaultAlarmEventType,
        title: 'Tipos de Eventos de Alarmas',
        subtitle: 'Lista de Tipos de Eventos de Alarmas',
        addNewTitle: 'Agregar Nuevo Tipo de Evento de Alarma',
        editTitle: 'Editar Tipo de Evento de Alarma',
        listTitle: 'Lista de Tipos de Eventos de Alarmas',
        fieldList: {
            DescTipoEventoAlarma: { ...this.defaultField, description: 'Tipo Evento Alarma' }
        }
    }

    validate = alarmeventtype => {
        return {
            //IdAlarma: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: isEmpty(configalarm.IdAlarma) },
            DescTipoEventoAlarma: {
                errorMessage: "Falta  Tipo Evento Alarma", isRequired: true, valid: true, isEmpty: isEmpty(alarmeventtype.DescTipoEventoAlarma)
            },
        }
    }
    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            //const IdAlarmEventType = parseInt(this.props.match.params.id, 10) || 0;
            this.props.getAlarmEventTypes();
        } catch (reason) {
            console.log('Error in componentWillMount - ContactsApp:' + reason);
        }

    }
    procesarResponse(nextProps) {
        // This method runs when incoming props (e.g., route params) change
        const IdAlarmEventType = parseInt(nextProps.match.params.IdAlarmEventType, 10) || 0;
        //if (IdAlarmEventType !== 0) this.props.getContactsByType(IdAlarmEventType);
        if (this.props.IdAlarmEventType !== nextProps.IdAlarmEventType) {
            this.setState({
                IdAlarmEventType: nextProps.IdAlarmEventType
            });
        }
    }

    renderNew() {
        return (<div className="row">
            {this.fieldGroup("DescTipoEventoAlarma", "glyphicon glyphicon-bell")}
        </div>);
    }

    processSubmit = () => {
        try {
            switch (this.state.mode) {
                case Mode.Create:
                    this.props.create(this.state.alarmeventtype);
                    break;
                case Mode.Update:
                    this.props.update(this.state.alarmeventtype);
                    break;
                case Mode.Delete:
                    this.props.delete(this.state.alarmeventtype);
                    break;
                default:
                    break;
            }
        } catch (reason) {
            alert('FALTAN DATOS');
        }
    }

}

export default connect(
    state => state.alarmeventtype, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(AlarmEventTypesStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(AlarmEventTypeApp);