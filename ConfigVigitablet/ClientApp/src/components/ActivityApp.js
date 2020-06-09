import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActivitiesStore from '../store/Activity';
import { Mode, isEmpty } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';

/*
type ContractProps =
    ActivitiesStore.ActivitiesState        // ... state we've requested from the Redux store
    & typeof ActivitiesStore.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ idContract: string }>; // ... plus incoming routing parameters

interface VigitabletTipoLlamada {
    IdVigitabletTipoLlamadas: number;
    DescVigitabletTipoLlamadas: string;
}
interface VigitabletLlamadas {
    [key: string]: ActivitiesStore.Contract[];

}*/
class ActivitiesApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: "activity",
        listObjetos: "activities",
        defaultObjeto: ActivitiesStore.defaultActivity,
        activities: [],
        activity: ActivitiesStore.defaultActivity,
        activity_old: ActivitiesStore.defaultActivity,
        fieldList: {

        },
        getObjetos: "getAccesses"
    }

    validate = (activity) => {
        return {

            IdTipoActividad: { errorMessage: "Falta Tipo Actividad", isRequired: true, valid: activity.IdTipoActividad > 0, isEmpty: activity.IdTipoActividad === 0 },
            //Contratante: { errorMessage: "Falta contratante", isRequired: true, valid: true, isEmpty: isEmpty(activity.Contratante) },
            DescActividad: { errorMessage: "Falta Nombre Completo", isRequired: true, valid: true, isEmpty: isEmpty(activity.DescActividad) },
            //Direccion: { errorMessage: "Falta direccion", isRequired: true, valid: true, isEmpty: isEmpty(activity.Direccion) },
            //FechaActividad: { errorMessage: "Falta Fecha", isRequired: true, valid: activity.FechaActividad > 0, isEmpty: activity.FechaActividad === 0 },
            FechaActividad: { errorMessage: "Falta Fecha", isRequired: true, valid: true, isEmpty: isEmpty(activity.FechaActividad) },
            //CorreoElectronicoJunta: { errorMessage: "Falta Correo Electronico Junta", isRequired: true, valid: true, isEmpty: isEmpty(activity.CorreoElectronicoJunta) },
            //CorreoElectronicoComunidad: { errorMessage: "Falta Correo Electronico Comunidad", isRequired: true, valid: true, isEmpty: isEmpty(activity.CorreoElectronicoComunidad) },
            // NroActividad: { errorMessage: "Falta numero de Actividad", isRequired: true, valid: true, isEmpty: isEmpty(activity.NroActividad) },
        };
    }

    /*constructor() {
        super();
    }*/
    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            this.props.getActivities();
        } catch (reason) {
            console.log('Error in componentWillMount - ActivitiesApp:' + reason);
        }
    }

    procesarResponse(nextProps) {
    }

    processSubmit = () => {
        try {
            switch (this.state.mode) {
                case Mode.Create:
                    this.props.create(this.state.activity);
                    break;
                case Mode.Update:
                    this.props.update(this.state.activity);
                    break;
                case Mode.Delete:
                    this.props.delete(this.state.activity);
                    break;
                default:
                    break;
            }
        }
        catch (reason) {
            console.log("Algo");
        }
    }
    showControlPoints(_activity) {
        return (<div className="form-group" >
            <div className="col-xs-12 col-md-12">
                <label className="col-sm-4 control-label">Puntos de Control</label>
                <div className="col-sm-8 input-group input-sm">
                    <select className="form-control input-sm" name="IdPuntoControl" onChange={this.toggleCheckbox.bind(this, "IdPuntoControl")} value={_activity.IdPuntoControl}>
                        <option key={0} value={0}>Seleccione...</option>
                        {this.props.controlpoints.map(controlpoint =>
                            <option key={controlpoint.IdPuntoControl} value={controlpoint.IdPuntoControl}>{controlpoint.UbicacionQR}</option>
                        )}
                    </select>
                </div>
            </div>
        </div>);
    }

    renderNew() {
        //const createMode = true;
        const _activity = "";
        return (  <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-6">
                                    <div className="col-md-3">
                                        <h4>Hora de inicio: </h4>
                                    </div>
                                    <div className="col-md-3">
                                        <input type='time' className="form-control time-picker input-sm" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="col-md-3">
                                        <h4>Tiempo Traslado: </h4>
                                    </div>
                                    <div className="col-md-3">
                                        <input type='number' className="form-control number" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="col-md-3">
                                        <h4>Tiempo Actividad: </h4>
                                    </div>
                                    <div className="col-md-3">
                                        <input type='number' className="form-control number" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-3">
                                    <h4>Descripcion: </h4>
                                </div>
                                <div className="col-md-9">
                                    <textarea className="form-control auto-size" name="DescActividad" value={_activity.DescActividad} onChange={this.handleChange.bind(this)} placeholder="Escribe aqui..." />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6" style={{ paddingLeft: '350px', paddingTop: '60px' }}>
                            <button className="btn btn-info" /*width="120px" height="50px"*/ onClick={this.handleSubmit.bind(this, this.state.activity)}>Guardar</button>
                            <button className="btn btn-warning" /*width="120px" height="50px"*/ onClick={this.handleBack.bind(this)}>Volver</button>
                        </div>);
    }
    //METODO PARA MOSTRAR EL SELECT
    showContractTypes() {
    }

    setModeEdit(_contract) {

    }
    renderActivities() {

    }

    handleNew(e) {

    }


    renderList() {
        const _activities = this.state.activities.length !== 0 ? this.state.activities : [];
        return (<div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="card">
                        <div className="card-header bgm-BlueSeguricel">
                            <div className="row">
                                {/*<h2>Areas</h2>*/}
                                <div className="col-lg-16" style={{ textAlign: 'center' }}>
                                    <button className="btn bgm-OrangeSeguricel" onClick={this.handleNew.bind(this)}>Agregar</button>
                                </div>
                            </div>
                        </div>
                        {/*<div className="list-area lg-odd-black*/}
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Actividad</th>
                                    <th>IdContrato</th>
                                    <th>Descripcion Actividad</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {_activities.map(activity =>
                                    (<tr key={activity.IdActividad}>
                                        <td>{activity.DescActividad}</td>
                                        <td>{activity.IdContrato}</td>
                                        <td>{activity.DescActividad}</td>
                                        <td><button className="btn  bgm-white" onClick={this.handleUpdate.bind(this, activity)}>Editar</button>
                                            <button className="btn  bgm-white" onClick={this.handleDelete.bind(this, activity)}>Borrar</button></td>
                                    </tr>)

                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default connect(
    (state) => state.activity, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(ActivitiesStore.actionCreators, dispatch)// Selects which action creators are merged into the component's props
)(ActivitiesApp);