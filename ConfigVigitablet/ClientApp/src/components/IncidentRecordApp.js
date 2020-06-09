import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as IncidentRecordStore from '../store/IncidentRecord';
import { Mode } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
/*
type IncidentRecordProps =
    IncidentRecordStore.IncidentRecordState
    & typeof IncidentRecordStore.actionCreators
    & RouteComponentProps<{}>;
    */
class IncidentRecordApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'incidentrecord',
        listObjetos: 'incidentrecords',
        defaultObjeto: IncidentRecordStore.defaultIncidentRecord,
        incidentrecords: [],
        incidentrecord: IncidentRecordStore.defaultIncidentRecord,
        incidentrecord_old: IncidentRecordStore.defaultIncidentRecord,
        fieldList: {
            Contrato: { ...this.defaultField, description: 'Contrato' },
            FechaIncidente: { ...this.defaultField, description: 'Fecha Incidente' },
            PrimerApellido: { ...this.defaultField, description: 'Primer Apellido' },
            PrimerNombre: { ...this.defaultField, description: 'Primer Nombre' },
            TipoIncidente: { ...this.defaultField, description: 'Tipo Incidente' },
        },
        isVisibleAddButton: false
    }

    constructor() {
        super();
        this.state.title = 'REGISTRO INCIDENTES';
        //this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        try {
            //super.componentWillMount();
            this.props.getSession();
            const searchVigitabletRounds = {
                IdContract: undefined,
                IdRound: undefined,
                FromRoundDate: undefined,
                ToRoundDate: undefined
            };
            this.props.getIncidentRecords(searchVigitabletRounds);
        } catch (reason) {
            console.log('Error in componentWillMount - IncidentRecordApp:' + reason);
        }
    }

    procesarResponse(nextProps) {

    }

    handleSubmit = () => {
        if (this.canBeSubmitted()) {
            switch (this.state.mode) {
                case Mode.Create:
                    this.props.create(this.state.incidentrecord);
                    break;
                case Mode.Update:
                    this.props.update(this.state.incidentrecord);
                    break;
                default:
                    break;
            }
        }
    }

    showImage(imagen) {
        return <img src={`data:image/jpeg;base64,${imagen}`} width="150px" height="150px" alt="Imagen Incidente" />;
    }

    renderListBody(incidentrecords) {
        this.state.records = this.props.incidentrecords || [];
        return (incidentrecords.map((incidentrecord, index) =>
            (<tr key={index}>
                <td>{incidentrecord.Contrato}</td>
                <td>{incidentrecord.FechaIncidente}</td>
                <td>{incidentrecord.PrimerApellido}</td>
                <td>{incidentrecord.PrimerNombre}</td>
                <td>{incidentrecord.TipoIncidente}</td>
                {/*<td>{incidentrecord.NombreImagenIncidente}</td>*/}
                <td>{this.showImage(incidentrecord.imagen)}</td>
            </tr>)
        ));
    }
}

// Wire up the React component to the Redux store
export default connect(
    state => state.incidentrecord, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(IncidentRecordStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(IncidentRecordApp);