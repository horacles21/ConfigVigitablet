import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CallRecordStore from '../store/CallRecord';
import { Mode } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
//import * as FFMPEG from 'ffmpeg';
/*
type CallRecordProps =
    CallRecordStore.CallRecordState
    & typeof CallRecordStore.actionCreators
    & RouteComponentProps<{}>;
    */
class CallRecordApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'callrecord',
        listObjetos: 'callrecords',
        defaultObjeto: CallRecordStore.defaultCallRecord,
        callrecord: CallRecordStore.defaultCallRecord,
        callrecord_old: CallRecordStore.defaultCallRecord,
        callrecords: [],
        fieldList: {
            Contrato: { ...this.defaultField, description: 'Contrato' },
            FechaLlamada: { ...this.defaultField, description: 'Fecha Llamada' },
            PrimerApellido: { ...this.defaultField, description: 'Primer Apellido' },
            PrimerNombre: { ...this.defaultField, description: 'Primer Nombre' },
            TipoLlamada: { ...this.defaultField, description: 'Tipo Llamada' }
        },
        title: 'Registro de Llamadas',
        subtitle: 'Registro de Llamadas',
        addNewTitle: 'Agregar Registro de Llamadas',
        editTitle: 'Editar Registro de Llamadas',
        listTitle: 'Lista de Registro de Llamadas',
    }
    playAudio() {
        // var ffmpeg = ffmpeg.ffmpeg("");
    }

    componentWillMount() {
        try {
            super.componentWillMount();
            this.props.getCallRecords();
        } catch (reason) {
            console.log('Error in componentWillMount - CallRecordApp:' + reason);
        }
    }

    procesarResponse(nextProps) {

    }

    handleSubmit = () => {
        if (this.canBeSubmitted()) {
            switch (this.state.mode) {
                case Mode.Create:
                    this.props.create(this.state.callrecord);
                    break;
                case Mode.Update:
                    this.props.update(this.state.callrecord);
                    break;
                default:
                    break;
            }
        }
    }

    showAudio(call) {
        return <audio autoplay controls src={`data:video/3gpp;;base64,${call}`} type="video/3gpp">
            The “audio” tag is not supported by your browser. Click [here] to download the sound file.
        </audio>;
    }
    initializeRecords() {
        this.state.records = this.state.callrecords || [];
    }
    renderListBody(callrecords) {
        this.state.records = this.state.callrecords || [];
        return (callrecords.map((callrecord, index) =>
            <tr key={index}>
                <td>{callrecord.Contrato}</td>
                <td>{callrecord.FechaLlamada}</td>
                <td>{callrecord.DuracionLlamada}</td>
                <td>{callrecord.TipoContacto}</td>
                <td>{this.showAudio(callrecord.Llamada)}</td>
            </tr>
        ));
    }
    getListByContract(idContrato) {

    }
    handleUpdateFunctions(area) {

    }
    renderNew(_callrecord) {
        return (<div className="col-md-12">
            <div className="row">
                <div className="col-md-1">
                    <div className="row">
                        <div className="col-xs-12">
                            <b><p><span>Contrato</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="text" className="form-control" name="Contrato" onChange={this.handleChange.bind(this)} value={_callrecord.Contrato} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Fecha Llamada</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="time" className="form-control" name="FechaLlamada" onChange={this.handleChange.bind(this)} value={_callrecord.FechaLlamada} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Imagen QR</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="time" className="form-control" name="PrimerApellido" onChange={this.handleChange.bind(this)} value={_callrecord.PrimerApellido} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Eventos</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="number" className="form-control" name="PrimerNombre" onChange={this.handleChange.bind(this)} value={_callrecord.PrimerNombre} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Notificacion</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="text" className="form-control" name="NotifificacionAR" onChange={this.handleChange.bind(this)} value={_callrecord.NotifificacionAR} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Envio</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="time" className="form-control" name="EnvioAR" onChange={this.handleChange.bind(this)} value={_callrecord.EnvioAR} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Contenido del mensaje</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="text" className="form-control" name="MensajeAR" onChange={this.handleChange.bind(this)} value={_callrecord.MensajeAR} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

// Wire up the React component to the Redux store
export default connect(
    state => state.callrecord, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(CallRecordStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(CallRecordApp);