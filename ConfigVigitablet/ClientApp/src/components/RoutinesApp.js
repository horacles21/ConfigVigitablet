import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RoutinesStore from '../store/Routines';
import { Modal } from '../components/Modal';
import { Mode, onlyNumbers, isEmpty } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
import * as Utils from '../store/Utils';




// At runtime, Redux will merge together...
/*
type ContractProps =
    RoutinesStore.RoutinesState        // ... state we've requested from the Redux store
    & typeof RoutinesStore.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ idContract: string }>; // ... plus incoming routing parameters

interface VigitabletTipoLlamada {
    IdVigitabletTipoLlamadas: number;
    DescVigitabletTipoLlamadas: string;
}
interface VigitabletLlamadas {
    [key: string]: RoutinesStore.Contract[];

}*/
class RoutinesApp extends BaseApp {
    state = {
        objeto: "routine",
        listObjetos: "routines",
        defaultObjeto: RoutinesStore.defaultRoutine,
        routines: [],
        routine: RoutinesStore.defaultRoutine,
        routine_old: RoutinesStore.defaultRoutine,
        mode: Mode.Read,
        isModeEdit: false,
        getObjetos: 'getRoutines',
        listField: {
        }
    }


    validate = (routine) => {
        return {

            IdTipoRutina: { errorMessage: "Falta Tipo Rutina", isRequired: true, valid: routine.IdTipoRutina > 0, isEmpty: routine.IdTipoRutina === 0 },
            //Contratante: { errorMessage: "Falta contratante", isRequired: true, valid: true, isEmpty: isEmpty(routine.Contratante) },
            DescRutina: { errorMessage: "Falta Nombre Completo", isRequired: true, valid: true, isEmpty: isEmpty(routine.DescRutina) },
            Direccion: { errorMessage: "Falta direccion", isRequired: true, valid: true, isEmpty: isEmpty(routine.Direccion) },
            //FechaRutina: { errorMessage: "Falta Fecha", isRequired: true, valid: routine.FechaRutina > 0, isEmpty: routine.FechaRutina === 0 },
            FechaRutina: { errorMessage: "Falta Fecha", isRequired: true, valid: true, isEmpty: Utils.isEmpty(routine.FechaRutina) },
            //CorreoElectronicoJunta: { errorMessage: "Falta Correo Electronico Junta", isRequired: true, valid: true, isEmpty: isEmpty(routine.CorreoElectronicoJunta) },
            //CorreoElectronicoComunidad: { errorMessage: "Falta Correo Electronico Comunidad", isRequired: true, valid: true, isEmpty: isEmpty(routine.CorreoElectronicoComunidad) },
            // NroRutina: { errorMessage: "Falta numero de Rutina", isRequired: true, valid: true, isEmpty: isEmpty(routine.NroRutina) },
        };
    }

    constructor() {
        super();
        this.state.title = 'Conf. Rutinas';
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            //let idContract = parseInt(this.props.match.params.idContract) || 0;
            super.componentWillMount();
            //this.props.getContractTypes();
            this.props.getRoutines();
            this.props.getActivities();


        } catch (reason) {
            console.log('Error in componentWillMount - RoutinesApp:' + reason);
        }
    }

    procesarResponse(nextProps) {
        if (nextProps.routines !== this.props.routines) {
            this.setState({
                routines: nextProps.routines
            });
        }
        if (nextProps.routine !== this.props.routine) {
            let routines = this.state.routines;
            var number_of_elements_to_remove = 1;
            switch (this.state.mode) {
                case Mode.Create:
                    routines.push(nextProps.routine);
                    break;
                case Mode.Update:
                    routines.splice(routines.indexOf(this.state.routine_old), number_of_elements_to_remove, nextProps.routine);
                    break;
                case Mode.Delete:
                    routines.splice(routines.indexOf(this.state.routine_old), number_of_elements_to_remove);
                    break;
                default:
                    break;
            }
            this.setState({
                routines: nextProps.routines,
                mode: Mode.Read
            });
        }
        if (nextProps.response.status === '200') {
            //const idContract = 22;
            //this.props.getRoutines(idContract);
        }
    }

    processSubmit = () => {
        try {
            switch (this.state.mode) {
                case Mode.Create:
                    this.props.create(this.state.routine);
                    break;
                case Mode.Update:
                    this.props.update(this.state.routine);
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
    //BODY
    renderBody() {


    }
    renderNew() {
        //const createMode = true;
        const _activity = "";
        return (<section id="main">
            <section id="content">
                <div className="container">
                    <div className="block-header">
                        <div className="row">
                            <h2>Rutina Unica</h2>

                        </div>
                        <div className="row">
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
                            <button className="btn btn-info" /*width="120px" height="50px"*/ onClick={this.handleSubmit.bind(this, this.state.routine)}>Guardar</button>
                            <button className="btn btn-warning" /*width="120px" height="50px"*/ onClick={this.handleBack.bind(this)}>Volver</button>
                        </div>
                    </div>
                </div>
            </section>
        </section >);
    }

    handleChange = event => {
        event.preventDefault();
        console.log(event.currentTarget.name + ':' + event.currentTarget.value);
        this.setState({
            routine: {
                ...this.state.routine,
                [event.currentTarget.name]: event.currentTarget.value,
                FechaUltActualizacion: new Date().toISOString().split('T')[0]
            }
        });
    }
    //METODO PARA MOSTRAR EL SELECT
    showContractTypes() {
    }

    setModeEdit(_contract) {

    }
    renderRoutines() {


    }

    handleNew(e) {

    }



    renderList() {
        const _routines = this.state.routines.length !== 0 ? this.state.routines : [];
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
                                    <th>Rutina</th>
                                    <th>IdContrato</th>
                                    <th>Descripcion Rutina</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {_routines.map(routine =>
                                    (<tr key={routine.IdRutina}>
                                        <td>{routine.DescRutina}</td>
                                        <td>{routine.IdContrato}</td>
                                        <td>{routine.DescRutina}</td>
                                        <td><button className="btn  bgm-white" onClick={this.handleUpdate.bind(this, routine)}>Editar</button>
                                            <button className="btn  bgm-white" onClick={this.handleDelete.bind(this, routine)}>Borrar</button></td>
                                    </tr>)

                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>);
    }

    handleUpdate(routine) {
        this.setState({
            mode: Mode.Update,
            routine: routine,
            routine_old: routine

        });

    }

    handleDelete(routine) {


    }

    renderEmergency() {
        return (<div className="col-xs-18">
            <div className="row">
                <div className="col-xs-3">
                    <div className="col-md-12 col-xs-12 ">
                        <p className="c-black f-16"><b></b></p>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className="card-body card-padding bgm-WhiteSeguricel">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                                                    <div className="fg-line">
                                                        <input type="text" className="form-control" placeholder="Policia" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                                                    <div className="fg-line">
                                                        <input type="text" className="form-control" placeholder="Policia" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                                                    <div className="fg-line">
                                                        <input type="text" className="form-control" placeholder="Bomberos" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <div className="input-group">
                                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                                                    <div className="fg-line">
                                                        <input type="text" className="form-control" placeholder="Ambulancia" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="row">
                <div className="col-md-12" >
                    <button className="btn bgm-white">Editar</button>
                    <button className="btn bgm-white">Salir</button>
                    <button className="btn bgm-white">Guardar</button>
                </div>
            </div>
            <br />

            <div className="row">
                <div className="col-md-12" >
                    <button className="btn bgm-OrangeSeguricel " /*width="120px" height="50px"*/>Salir</button>
                    <button className="btn bgm-OrangeSeguricel" /*width="120px" height="50px"*/>Guardar</button>
                </div>
            </div>
        </div>);
    }
    handleRoutines = event => {
        event.preventDefault();
        this.setState({
            routine: {
                ...this.state.routine,
                [event.target.name]: event.target.value
            }
        });
        // this.props.getContactsByContract(event.target.value);
    }

}

export default connect(
    (state) => state.routine, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(RoutinesStore.actionCreators, dispatch)// Selects which action creators are merged into the component's props
)(RoutinesApp);