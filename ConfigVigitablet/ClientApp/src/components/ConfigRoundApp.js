import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ConfigRoundsStore from '../store/ConfigRound';
import { ConfigControlPoint } from '../store/ConfigControlPoint';
import { Mode, defaultListDays, GetWeekDays, SetWeekDays, sendEmail } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
import * as Utils from '../store/Utils';
import { Table, DropdownButton, Button, Collapse, Card, CardHeader, CardBody, Tooltip } from 'reactstrap';

/*type ConfigRoundsProps =
    ConfigRoundsStore.ConfigRoundsState
    & typeof ConfigRoundsStore.actionCreators
    & RouteComponentProps<{ id: string }>;*/
//const[modal, setModal] = useState(false);

class ConfigRoundsApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'configround',
        listObjetos: 'configrounds',
        defaultObjeto: ConfigRoundsStore.defaultConfigRound,
        configroundjobs: [],
        configround: ConfigRoundsStore.defaultConfigRound,
        configround_old: ConfigRoundsStore.defaultConfigRound,
        listdays: defaultListDays,
        IdTipoRonda: 0,
        configrounds: [],
        chkControlPoints: [],
        arIdControlPoints: [],
        ordenpuntos: '',
        controlpoints: [],
        arJobs: [],
        arPriorities: [],
        arActionTypes: [],
        arDivJobs: [],
        specialdates: [],
        title: 'RUTINAS',
        subtitle: 'Lista de Rutinas',
        addNewTitle: 'Agregar Nueva Rutina',
        editTitle: 'Editar Rutina',
        listTitle: 'Lista de Rutinas',
        fieldList: {
            IdContrato: this.fieldContract,
            IdRonda: { ...this.defaultField, description: "Id Rutina" },
            DescRonda: { ...this.defaultField, description: 'Nombre de la Rutina' },
            Prioridad: { ...this.defaultField, description: 'Prioridad' },
            IdTipoRonda: { ...this.defaultField, description: 'Tipo de Rutina' },
            RondaFija: { ...this.defaultField, description: 'Fija/ Movil' },
            TipoAviso: { ...this.defaultField, description: 'Tipo de Aviso' },
            HoraInicioRonda: { ...this.defaultField, description: 'Hora Inicio' },
            HoraFinRonda: { ...this.defaultField, description: 'Hora Fin' },
            /*ValidarPresencia: {
                description: 'Validar Inicio Rutina',
                isVisible: true,
                controlType: 'T',
                listFunction: ''
            },*/
            OrdenAleatorio: {
                ...this.defaultField,
                description: 'Tipo Recorrido',
            },
            DiasSemanasRonda: {
                ...this.defaultField,
                description: 'Dias de la Semana',
            },

        },
        isOpen: [],
        isOpenJob: [],
        getObjetos: "getAllConfigRounds"

    }
    validate = configround => {
        // true means invalid, so our conditions got reversed
        return {
            IdRonda: { errorMessage: "Falta:  IdRonda", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.IdRonda) },
            DescRonda: { errorMessage: "Falta DescRonda", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.DescRonda) },
            IdContrato: { errorMessage: "Falta IdContrato", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.IdContrato) },
            IdTipoRonda: { errorMessage: "Falta IdTipoRonda", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.IdTipoRonda) },
            RondaFija: { errorMessage: "Falta RondaFija", isRequired: true, valid: true, isEmpty: false /*Utils.isEmpty(configround.RondaFija)*/ },
            DiasSemanasRonda: { errorMessage: "Falta DiasSemanasRonda", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.DiasSemanasRonda) },
            HoraInicioRonda: { errorMessage: "Falta HoraInicioRonda", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.HoraInicioRonda) },
            HoraFinRonda: { errorMessage: "Falta HoraFinRonda", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.HoraFinRonda) },
            IntervaloRonda: { errorMessage: "Falta IntervaloRonda", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.IntervaloRonda) },
            VariariacionAleatoriaRonda: { errorMessage: "Falta VariariacionAleatoriaRonda", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.VariariacionAleatoriaRonda) },
            MargenToleranciaRonda: { errorMessage: "Falta MargenToleranciaRonda", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.MargenToleranciaRonda) },
            IdTipoAviso: { errorMessage: "Falta IdTipoAviso", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.IdTipoAviso) },
            CantidadPuntos: { errorMessage: "Falta CantidadPuntos", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.CantidadPuntos) },
            FechaUltActualizacion: { errorMessage: "Falta FechaUltActualizacion", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.FechaUltActualizacion) },
            IdUsuario: { errorMessage: "Falta IdUsuario", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configround.IdUsuario) }
        };
    };

    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            this.props.getAllConfigRounds();
            this.props.getSpecialDates();
            this.props.getAdviceTypes();
            this.props.getJobs();
            this.props.getNews();
            this.props.GetJobActionTypes();
            this.props.GetAllConfigControlPoints();
            //this.props.getValidationTypes();
            //const IdRonda = parseInt(this.props.match.params.id) || 0;
            //if (IdRonda !== 0) {
            //    this.props.GetConfigRoundById(IdRonda);
            //this.setModeUpdate();
            //}
            //else {
            //    console.log();
            //}

        }
        catch (reason) {
            const error = reason;
        }
    }
    componentDidMount() {
        //if (this.props.advicetypes.length == 0)
        //    this.props.getAdviceTypes();
        //if (this.state.configrounds.length == 0)
        //    this.props.getConfigRoundsByContract(22);
    }
    procesarResponse(nextProps) {
        try {
            //const IdRonda = parseInt(nextProps.match.params.id) || 0;
            //if (IdRonda !== 0) {
            //    this.props.GetConfigRoundById(IdRonda);
            //}
            if (nextProps.configcontrolpoints !== this.props.configcontrolpoints) {
                this.initialize(nextProps.configcontrolpoints);
            }
            if (nextProps.ConfigRondasTareas !== this.props.ConfigRondasTareas) {
                this.initializeConfigRondasTareas(nextProps.ConfigRondasTareas);
                this.setState({
                    configroundjobs: nextProps.ConfigRondasTareas
                });
            }
            if (nextProps.configroundcontrolpoints !== this.props.configroundcontrolpoints) {
                this.initialize(nextProps.configroundcontrolpoints || []);
            }
            if (nextProps.configroundjobs !== this.props.configroundjobs) {
                this.setState({
                    configroundjobs: nextProps.configroundjobs
                });
            }
            if (nextProps.specialdates !== this.props.specialdates) {
                let arr = [];
                nextProps.specialdates.map(specialdate => {
                    arr.push(false);
                });
                this.setState({
                    specialdates: arr
                });
            }
        }
        catch (reason) {
            const reason_ = reason;
            console.log(reason)
        }
    }

    /*componentWillUpdate() {

    }
    componentDidUpdate() {

    }

    componentWillUnmount() {
        
    }
    */
    initialize(configroundcontrolpoints) {
        try {
            let arr = [];// this.state.arIdControlPoints;
            let arr_ = [];// this.state.chkControlPoints;
            let arr___ = [];
            let strOrdenPuntos = '';
            //const idContract = this.props.contract.Id;
            //if (arr.length == 0) {
            const configcontrolpoints = this.props.configcontrolpoints || [];
            const _configroundcontrolpoints = configroundcontrolpoints === undefined ? [] : configroundcontrolpoints;
            configcontrolpoints.forEach(configcontrolpoint => {
                arr.push(configcontrolpoint.IdPuntoControl);
                arr_.push(_configroundcontrolpoints.findIndex(configroundcontrolpoint_ => configroundcontrolpoint_.IdPuntoControl === configcontrolpoint.IdPuntoControl) !== -1);
                arr___.push(true);
            });
            this.state.configround.controlpoints.map(element_ =>
                strOrdenPuntos = strOrdenPuntos + '-' + (1 + (configcontrolpoints.findIndex(configroundcontrolpoint_ => configroundcontrolpoint_.IdPuntoControl === element_)))
            );
            this.setState({
                arIdControlPoints: arr,
                chkControlPoints: arr_,
                ordenpuntos: strOrdenPuntos,
                arDivJobs: arr___,
            });
        }
        catch (reason) {
            const error = reason;
        }
    }

    initializeConfigRondasTareas(ConfigRondasTareas) {
        try {
            let arr = [];
            let arr2 = [];
            let arr3 = [];
            if (ConfigRondasTareas && ConfigRondasTareas.length > 0) {
                ConfigRondasTareas.forEach !== undefined ? this.props.ConfigRondasTareas.forEach(configroundjob => {
                    arr[`${configroundjob.IdPuntoControl}:${configroundjob.IdTarea}`] = configroundjob.IdTipoAccionTarea;
                    arr2[`${configroundjob.IdPuntoControl}:${configroundjob.IdTarea}`] = configroundjob.Prioridad;
                    arr3[`${configroundjob.IdPuntoControl}:${configroundjob.IdTarea}`] = 1;
                }) : this.props.GetConfigControlPointsByContract(this.state.IdContrato);
                this.setState({
                    arActionTypes: arr,
                    arPriorities: arr2,
                    arJobs: arr3
                });
            }
        }
        catch (reason) {
            const error = reason;
        }
    }


    isCheckedDay = index => {
        return this.state.listdays[index] === 1;
    }

    isCheckedState = idControlPoint => {
        return (this.state.chkControlPoints.length > 0 ? this.state.chkControlPoints[idControlPoint] : false);
    }

    toggleCheckboxControlPoints(e) {
        const index = e.target.value;
        let arr = this.state.arIdControlPoints;
        let arr_ = this.state.chkControlPoints;
        if (arr.length === 0) {
            //this.initialize();
        }
        let index_ = index;
        index_++;
        arr_[index] = !arr_[index];
        this.setState({
            ordenpuntos: arr_[index] ? this.state.ordenpuntos + '-' + index_.toString() : this.state.ordenpuntos.replace('-' + index_.toString(), ''),
            chkControlPoints: arr_,
            configround: {
                ...this.state.configround,
                CantidadPuntos: arr_.filter(x => x).length
            }
        });
    }

    togglePresencia(e) {
        this.setState({
            configround: {
                ...this.state.configround,
                ValidarPresencia: !this.state.configround.ValidarPresencia
            }
        });
    }

    toggleRoundDay(e) {
        let index = e.target.value;
        var arr = this.state.listdays;
        if (this.state.listdays[index] === 1) {
            arr[index] = 0;

        } else {
            arr[index] = 1;
        }
        this.setState({
            listdays: arr,
            configround: {
                ... this.state.configround,
                DiasSemanasRonda: GetWeekDays(arr)
            }
        });
    }
    toggleCheckbox1(e) {
        const index = e.target.value;
        const parametros = index.split(':');
        var arr = this.state.arJobs;
        var configroundjobs = this.state.configroundjobs;
        const configroundjob = configroundjobs.filter(x => x.IdPuntoControl === parseInt(parametros[0], 10) && x.IdTarea === parseInt(parametros[1], 10));
        if (configroundjob.length > 0) {
            configroundjobs.splice(configroundjobs.indexOf(configroundjob[0]), 1);
        }
        else {
            configroundjobs.push({
                IdPuntoControl: parseInt(parametros[0], 10),
                IdTarea: parseInt(parametros[1], 10),
                Prioridad: parseInt(1, 10),
                IdTipoAccionTarea: parseInt(1, 10)
            });
        }
        //configroundjobs.splice(configroundjobs.indexOf(configroundjobs.filter(x => x.IdPuntoControl === 1 && x.IdTarea === 5)), number_of_elements_to_remove);
        //configroundjobs.splice(configroundjobs.filter(x => x.IdPuntoControl === 1 && x.IdTarea === 5), number_of_elements_to_remove);
        if (this.state.arJobs[index] === 1) {
            arr[index] = 0;

        } else {
            arr[index] = 1;
        }
        this.setState({
            //listdays: arr,
            configround: {
                ... this.state.configround,

                //DiasSemanasRonda: GetWeekDays(arr)
            },
            configroundjobs: configroundjobs
        });
    }

    toggleCheckbox2(index, e) {
        var arr = this.state.arPriorities;
        arr[index] = e.target.value;
        this.setState({
            configround: {
                ... this.state.configround,
                //DiasSemanasRonda: GetWeekDays(arr)
            }
        });
    }


    toggleCheckbox3_(index, e) {
        var arr = this.state.arActionTypes;
        arr[index] = e.target.value;
        this.setState({
            configround: {
                ... this.state.configround,
                //DiasSemanasRonda: GetWeekDays(arr)
            }
        });
    }
    toggleCheckbox3(parametros, e) {
        const index = `${parametros[0]}:${parametros[1]}`;
        //const parametros = index.split(':');
        var arr = this.state.arJobs;
        var configroundjobs = this.state.configroundjobs || [];
        var configroundjob = configroundjobs.filter(x => x.IdPuntoControl === parseInt(parametros[0], 10) && x.IdTarea === parseInt(parametros[1], 10));
        const IdTipoAccionTarea = e.target.value || 0;
        if (configroundjob.length > 0) {
            const configroundjob_old = configroundjob[0];
            var configroundjob_new = configroundjob[0];
            configroundjob_new.IdTipoAccionTarea = IdTipoAccionTarea;
            configroundjobs.splice(configroundjobs.indexOf(configroundjob_old), 1, configroundjob_new);
        }
        else {
            configroundjobs.push({
                IdPuntoControl: parseInt(parametros[0], 10),
                IdTarea: parseInt(parametros[1], 10),
                Prioridad: 1,
                IdTipoAccionTarea: parseInt(IdTipoAccionTarea, 10)
            });
        }
        //configroundjobs.splice(configroundjobs.indexOf(configroundjobs.filter(x => x.IdPuntoControl === 1 && x.IdTarea === 5)), number_of_elements_to_remove);
        //configroundjobs.splice(configroundjobs.filter(x => x.IdPuntoControl === 1 && x.IdTarea === 5), number_of_elements_to_remove);
        if (this.state.arJobs[index] === 1) {
            arr[index] = 0;

        } else {
            arr[index] = 1;
        }
        this.setState({
            //listdays: arr,
            configround: {
                ... this.state.configround,

                //DiasSemanasRonda: GetWeekDays(arr)
            },
            configroundjobs: configroundjobs
        });
    }

    toggleCheckbox4(index, e) {
        //const index = e.target.value;
        const parametros = index.split(':');
        //var arr = this.state.arJobs;
        var configroundjobs = this.state.configroundjobs || [];
        var configroundjob = configroundjobs.filter(x => x.IdPuntoControl === parseInt(parametros[0], 10) && x.IdTarea === parseInt(parametros[1], 10));
        const prioridad = e.target.value || 0;
        if (configroundjob.length > 0) {
            const configroundjob_old = configroundjob[0];
            var configroundjob_new = configroundjob[0];
            configroundjob_new.Prioridad = prioridad;
            configroundjobs.splice(configroundjobs.indexOf(configroundjob_old), 1, configroundjob_new);
        }
        else {
            configroundjobs.push({
                IdPuntoControl: parseInt(parametros[0], 10),
                IdTarea: parseInt(parametros[1], 10),
                Prioridad: prioridad,
                IdTipoAccionTarea: 0
            });
        }
        //configroundjobs.splice(configroundjobs.indexOf(configroundjobs.filter(x => x.IdPuntoControl === 1 && x.IdTarea === 5)), number_of_elements_to_remove);
        //configroundjobs.splice(configroundjobs.filter(x => x.IdPuntoControl === 1 && x.IdTarea === 5), number_of_elements_to_remove);
        /*if (this.state.arJobs[index] === 1) {
            arr[index] = 0;

        } else {
            arr[index] = 1;
        }*/
        this.setState({
            //listdays: arr,
            configround: {
                ... this.state.configround,

                //DiasSemanasRonda: GetWeekDays(arr)
            },
            configroundjobs: configroundjobs
        });
    }

    //toggleJobs(e) {
    toggleJobs(e, IdControlPoint, IdTarea, IdAccion, Prioridad) {
        //const index = 0;
        //const value = parseInt(e.target.value);
        //const IdTarea = parseInt(1);
        const configroundjobs = this.state.configroundjobs;
        /*configroundjobs.indexOf([IdControlPoint, IdTarea, 1, 2]) === -1 ?
            configroundjobs.push([IdControlPoint,IdTarea,3,4]) :
            configroundjobs.splice(configroundjobs.indexOf([IdControlPoint, IdTarea]), 1);*/
        var i;
        var j;
        var x;
        var y;
        //const IdAccion = 0;
        //const Prioridad = 0;
        var continuar = true;
        for (i = 0; i < configroundjobs.length; i++) {
            var configroundjob = configroundjobs[i];
            for (j = 0; j < 2; j++) {
                if (j === 0) {
                    if (IdControlPoint === configroundjob[j]) {
                        x = 1;
                    }
                    else {
                        break;
                        // x = 0;
                    }
                }
                else {
                    if (IdTarea === configroundjob[j]) {
                        if (x === 1) {
                            y = 1;
                            continuar = false;
                        }
                        else {
                            y = 2;
                        }
                    }
                }

            }
            if (!continuar) {
                configroundjobs.splice(i, 1, [IdControlPoint, IdTarea, IdAccion, Prioridad]);
                break;
            }
        }
        if (i === configroundjobs.length) {
            configroundjobs.push([IdControlPoint, IdTarea, IdAccion, Prioridad]);
        }

        const ConfigRoundTarea = configroundjobs.join(',');

        this.setState({
            configroundjobs: configroundjobs,
            configcontrolpoint: {
                ...this.state.configcontrolpoint,
                ConfigRoundTareas: configroundjobs.join(',')
            }
        });
    }

    processSubmit() {
        try {
            const configroundjobs_ = this.state.configroundjobs;
            var configroundjobs = [];
            configroundjobs_.map(x => {
                configroundjobs.push([x.IdPuntoControl, x.IdTarea, x.IdTipoAccionTarea, x.Prioridad]);
            });
            let arr = [];
            let arr_ = [];
            this.state.arIdControlPoints.map((controlpoint, key) => {
                if (this.state.chkControlPoints[key]) {
                    arr.push(controlpoint);
                }
            });
            const arr__ = this.state.ordenpuntos.substring(1).split('-');
            arr__.map(punto =>
                arr_.push(this.state.arIdControlPoints[Number.parseInt(punto) - 1])
            );
            switch (this.state.mode) {
                case Mode.Create:
                    this.props.create(this.state.configround, arr_, this.state.ordenpuntos.substring(1), configroundjobs/* this.state.configroundjobs*/);
                    break;
                case Mode.Update:
                    this.props.update(this.state.configround, arr_, this.state.ordenpuntos.substring(1), configroundjobs);
                    break;
                case Mode.Delete:
                    this.props.delete(this.state.configround, arr_, this.state.ordenpuntos.substring(1), configroundjobs);
                    break;
                default:
                    break;
            }
        }
        catch (reason) {
            const error = reason;
        }
        finally {
            //
        }
    }

    handleNewFunctions() {
        let arr = [];
        let arr_ = [];
        const configcontrolpoints = this.props.configcontrolpoints || [];
        if (configcontrolpoints.length > 0) {
            configcontrolpoints.map((controlpoint, key) => {
                arr_.push(controlpoint.IdPuntoControl);
                arr.push(false);
            });
        }

        this.setState({
            arIdControlPoints: arr_,
            chkControlPoints: arr,
            listdays: defaultListDays,
            ordenpuntos: '',
        });
    }

    handleUpdateFunctions(configround) {
        if (configround.IdRonda !== undefined) {
            this.props.getConfigRoundControlPointsByRound(configround.IdRonda);
            this.props.getConfigRoundJobs(configround.IdRonda);
        }
        this.setState({
            listdays: SetWeekDays(configround.DiasSemanasRonda),
            ordenpuntos: ''
        });
    }


    handleTestAleatorio = () => {
        //this.props.getConfigRoundControlPointsByRoundRandom(this.state.configround.IdRonda);
        const controlpoints = this.props.configroundcontrolpoints || [];
        let n = controlpoints.length;
        while (n > 1) {
            n--;
            const k = Math.floor(Math.random() * n);
            const value = controlpoints[k];
            controlpoints[k] = controlpoints[n];
            controlpoints[n] = value;
        }
        this.setState({
            controlpoints: controlpoints
        });
    }

    weekDaysTable(strDays) {
        const arDays = SetWeekDays(strDays);
        const days = [" L ", " M ", " Mi ", " J ", " V ", " S ", " D "];
        return days.map((item, index) => (<div>
            <label className="checkbox ">
                <p > {item}</p>
            </label>
            <input type="checkbox" checked={arDays[index] === 1} />
        </div>
        ));
    }
    isSpecialDate(index) {
        return this.state.specialdates[index];
    }
    toogleSpecialDate(e) {
        let index = e.target.value;
        var arr = this.state.specialdates;
        if (this.state.specialdates[index]) {
            arr[index] = false;

        } else {
            arr[index] = true;
        }
        this.setState({
            specialdates: arr,
            /*configround: {
                ... this.state.specialdates,
               // DiasSemanasRonda: GetWeekDays(arr)
            }*/
        });
    }
    showSpecialDates(strDays) {
        const specialdates = this.props.specialdates || [];
        return (<table><tr>
            {specialdates.map((item, index) => (
                <td>
                    <label>{item.DescFecha}</label>
                    <input type="checkbox" value={index} checked={this.isSpecialDate(index)} onChange={this.toogleSpecialDate.bind(this)}/>
                </td>
            ))}
        </tr></table>);
    }


    weekRoundDays() {
        const days = [" L ", " M ", " Mi ", " J ", " V ", " S ", " D "];
        return (<table>
            <th colSpan="7"><td>Días de la semana</td></th>
            <tr>
                {days.map((item, index) => (
                    <td>
                        <label>
                            <p > {item}</p>
                        </label>
                        <input type="checkbox" value={index} checked={this.isCheckedDay(index)} onChange={this.toggleRoundDay.bind(this)} />
                    </td>
                ))}
            </tr>
        </table>);
    }

    renderJobs(IdPuntoControl, index_) {
        const _jobs = this.props.jobs;
        return (<Card>
            <CardHeader className="container-fluid bg-dark text-white">
                <button className="btn btn-primary btn-sm " onClick={() => {
                    let arr = this.state.arDivJobs || [];
                    if (arr.length > index_) {
                        if (arr[index_]) {
                            arr[index_] = !arr[index_];
                        }
                        else {
                            arr[index_] = true;
                        }
                        this.setState({
                            arDivJobs: arr
                        });
                    }
                }}>Agregar</button>
            </CardHeader>
            <CardBody className="container-fluid bg-dark text-white">
                <div hidden={this.state.arDivJobs ? this.state.arDivJobs[index_] : true}>
                    {_jobs === null ? '' : (_jobs.map !== undefined ? _jobs.map((job, index) =>
                        (<div className="media-body">
                            <input type="checkbox" checked={this.state.configroundjobs.findIndex(x => x.IdPuntoControl === IdPuntoControl && x.IdTarea === job.IdTarea) !== -1} onChange={this.toggleCheckbox1.bind(this)} value={`${IdPuntoControl}:${job.IdTarea}`} />
                            <div className="lgi-heading">{job.DescTarea}</div>
                            <div hidden={this.state.arDivJobs ? this.state.arDivJobs[index_] : true}>
                                {this.showJobActionTypes(`${IdPuntoControl}:${job.IdTarea}`)}
                                <input type="number" value={this.show____(`${IdPuntoControl}:${job.IdTarea}`)/*this.state.arPriorities[`${IdPuntoControl}:${job.IdTarea}`]*/} onChange={this.toggleCheckbox4.bind(this, `${IdPuntoControl}:${job.IdTarea}`)} name="quantity" min="1" max="5" />
                            </div>
                        </div>
                        )) : [])}
                </div>
            </CardBody>
        </Card>);
    }

    renderNews() {
        const _news = this.props.news;
        return (<div className="card">
            <div className="card-header">
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-6">
                            <h4 style={{ fontFamily: 'Alegreya Sans, sans-serif' }}>Novedades</h4>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary btn-sm " >Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="list-group lg-odd-black">
                {_news === null ? '' : _news.map !== undefined ? _news.map(news =>
                    (<div className="list-group-item">
                        <div className="pull-right">
                            <div className="actions dropdown">
                                <a href="" data-toggle="dropdown" aria-expanded="true">
                                    <i className="glyphicon glyphicon-option-vertical" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <a href="">Edit</a>
                                    </li>
                                    <li>
                                        <a href="">Delete</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="media-body">
                            <div className="lgi-heading">{news.DescNovedad}</div>
                        </div>
                    </div>)
                ) : []}
            </div>
        </div>);
    }

    show___(parametros) {
        const configroundjobs_ = this.state.configroundjobs.filter(x => x.IdPuntoControl === parseInt(parametros[0], 10) && x.IdTarea === parseInt(parametros[1], 10));
        if (configroundjobs_.length > 0) {
            const configroundjob = configroundjobs_[0];
            return configroundjob.IdTipoAccionTarea;
        }
        else {
            return 0;
        }
    }

    show____(index) {
        const parametros = index.split(':');
        const configroundjobs = this.state.configroundjobs || [];
        if (configroundjobs.length > 0) {
            const configroundjobs_ = configroundjobs.filter(x => x.IdPuntoControl === parseInt(parametros[0], 10) && x.IdTarea === parseInt(parametros[1], 10));
            if (configroundjobs_.length > 0) {
                const configroundjob = configroundjobs_[0];
                return configroundjob.Prioridad;
            }
            else {
                return 0;
            }
        }
    }

    showJobActionTypes(index) {
        const parametros = index.split(':');
        return (<div className="form-group">
            <label>Tipo de Accion</label>
            <select className="form-control" name="IdTipoAccionTarea" onChange={this.toggleCheckbox3.bind(this, parametros)} value={this.show___(parametros)}>
                <option key={0} value={0}>Seleccione...</option>
                {this.props.jobactiontypes.map(jobactiontype =>
                    <option key={jobactiontype.IdTipoAccionTarea} value={jobactiontype.IdTipoAccionTarea}>{jobactiontype.DescTipoAccionTarea}</option>
                )}
            </select>
        </div>);
    }


    showControlPointDesc(controlpoint) {
        const controlpoints = this.props.configcontrolpoints || [];
        const _controlpoint = controlpoints.find(x => x.IdPuntoControl === controlpoint) || ConfigControlPoint;
        return _controlpoint.DescripcionQR;
    }

    toggleShowPoints(index, event) {
        let open = this.state.isOpen;
        if (open[index] == undefined) {
            open[index] = true;
        }
        else {
            open[index] = !open[index];
        }
        this.setState({ isOpen: open });
    }
    toggleShowJobs(index, event) {
        let open = this.state.isOpenJob;
        if (open[index] == undefined) {
            open[index] = true;
        }
        else {
            open[index] = !open[index];
        }
        this.setState({ isOpenJob: open });
    }

    showComboAdviceType(_configround) {
        return (<div className="form-group">
            <label>Tipo de aviso</label>
            <select className="form-control" name="IdTipoAviso" value={_configround.IdTipoAviso} onChange={this.handleChange.bind(this)}>
                <option key={0} value={0}>Seleccione tipo de anuncio...</option>
                {this.props.advicetypes.map(advicetype =>
                    <option key={advicetype.IdTipoAviso} value={advicetype.IdTipoAviso}>{advicetype.DescTipoAviso}</option>
                )}
            </select>
        </div>);
    }
    handleContractsRound(event) {
        const idContrato = event.target.value;
        this.props.GetConfigControlPointsByContract(idContrato);
    }
    showContractsRound(value_) {
        const defaultOption = 'Seleccione contrato...';
        const _contracts = this.props.contracts || [];
        const options = _contracts.length > 0 ? _contracts.map(function (option) {
            return (
                <option key={option.Id} value={option.Id}>
                    {option.NombreCompletoContrato}
                </option>
            );
        }) : [];
        return (<select className='form-control input-sm' name="IdContrato" onChange={this.handleContractsRound.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }


    renderListBody(_configrounds) {
        this.state.records = this.state.configrounds || [];
        return _configrounds.map((configround, index) =>
            (<tr key={index} onDoubleClick={this.handleUpdate.bind(this, configround)}>
                <td>{this.showDescContracts(configround.IdContrato)}</td>
                <td>{configround.IdRonda}</td>
                <td>{configround.DescRonda}</td>
                <td>{configround.IdTipoRonda === 1 ? 'Programada' : 'Libre'}</td>
                <td>{configround.RondaFija ? 'Fija' : 'Movil'}</td>
                <td>{configround.TipoAviso}</td>
                <td>{configround.HoraInicioRonda}</td>
                <td>{configround.HoraFinRonda}</td>
                <td>{configround.ValidarPresencia ? 'Si' : 'No'}</td>
                <td>{configround.OrdenAleatorio ? 'Aleatorio' : 'Fijo'}</td>
                <td>{this.showDiasSemanaStr(configround.DiasSemanasRonda)}</td>
                <td> <Button color="primary" onClick={this.toggleShowPoints.bind(this, index)} style={{ marginBottom: '1rem' }}>Mostrar...</Button>
                    <Collapse isOpen={this.state.isOpen[index]}>
                        <Card>
                            <CardBody className="container-fluid bg-dark text-white">
                                {configround.controlpoints.map(controlpoint =>
                                    <li>{this.showControlPointDesc(controlpoint)}</li>
                                )}
                            </CardBody>
                        </Card>
                    </Collapse></td>
            </tr>)
        );

    }
    renderControlPoints() {
        const _controlpoints = this.props.configcontrolpoints || [];
        return (<Table responsive hover striped bordered dark>
            <thead>
                <th></th>
                <th></th>
                <th>Ubicacion</th>
                <th>Descripcion</th>
                <th>Coordenadas GPS</th>
                <th>QR</th>
                <th>Lluvia</th>
                <th>Tareas</th>
            </thead>
            <tbody>
                {_controlpoints.length === 0 ? [] : _controlpoints.map((_controlpoint, index) =>
                    (<tr>
                        <td>
                            {index + 1}
                        </td>
                        <td>
                            <div className="lgi-heading"><input type="checkbox" checked={this.isCheckedState(index)} value={index} onChange={this.toggleCheckboxControlPoints.bind(this)} /></div>
                        </td>
                        <td>
                            {_controlpoint.UbicacionQR}
                        </td>
                        <td>
                            {_controlpoint.DescripcionQR}
                        </td>
                        <td>
                            {_controlpoint.CoordenadasGPS}
                        </td>
                        <td>
                            {_controlpoint.CodigoQR}
                        </td>
                        <td>
                            <input type="checkbox" name="LluviaQR" checked={_controlpoint.LluviaQR} onChange={this.toggleCheckbox.bind(this)} />
                        </td>
                        <td>
                            <Button color="primary" onClick={this.toggleShowJobs.bind(this, index)} style={{ marginBottom: '1rem' }}>Mostrar...</Button>
                            <Collapse isOpen={this.state.isOpenJob[index]}>
                                {this.renderJobs(_controlpoint.IdPuntoControl, index)}
                            </Collapse>
                        </td>
                    </tr>)
                )}
            </tbody>
        </Table>);
    }

    renderNew() {
        const _configround = this.state.configround;
        return (<div>
            <div className="form-group" title="Fechas Especiales">
                <label>Fechas Especiales</label>
                {this.showSpecialDates()}
            </div>
            {this.showContractsRound(_configround.IdContrato)}
            {this.fieldGroup("DescRonda", "glyphicon glyphicon-time")}
            {this.fieldGroup("Prioridad", "glyphicon glyphicon-time")}
            <select className="form-control" name="IdTipoRonda" value={_configround.IdTipoRonda} onChange={this.handleChange.bind(this)}>
                <option key="0" value="0">Tipo de Ronda</option>
                <option key="Programada" value="1">Programada</option>
                <option key="Libre" value="2">Libre</option>
            </select>
            <select className="form-control" id="RondaFija" name="RondaFija" value={_configround.RondaFija} onChange={this.handleChange.bind(this)}>
                <option key="0" value="00" /*checked*/>Ronda Fija/Móvil</option>
                <option key="Movil" value="false" /*checked*/>Movil</option>
                <option key="Fija" value="true">Fija</option>
            </select>
            {this.showValidationType(_configround)}
            <div hidden={_configround.IdTipoRonda === 1}>
                {this.fieldGroup("IntervaloRonda", "glyphicon glyphicon-time")}
                <div className="form-group">
                    <label> Variacion aleatoria </label>
                    <input type="text" className="form-control" name="VariariacionAleatoriaRonda" value={_configround.VariariacionAleatoriaRonda} onChange={this.handleChange.bind(this)} placeholder="" />
                </div>
                <div className="form-group">
                    <label> Margen de tolerancia </label>
                    <input type="text" className="form-control" name="MargenToleranciaRonda" value={_configround.MargenToleranciaRonda} onChange={this.handleChange.bind(this)} placeholder="" />
                </div>
            </div>
            {this.showComboAdviceType(_configround)}
            <div hidden={_configround.RondaFija}>
                <div className="form-group">
                    <label>Cantidad de puntos</label>
                    <input type="text" className="form-control" name="CantidadPuntos" value={_configround.CantidadPuntos} placeholder="" />
                </div>
                <div className="form-group">
                    <label>Orden Aleatorio</label>

                    <input type="checkbox" className="form-control" name="OrdenAleatorio" checked={_configround.OrdenAleatorio} onChange={
                        () => this.setState({
                            configround:
                            {
                                ...this.state.configround,
                                OrdenAleatorio: !_configround.OrdenAleatorio,
                            }
                        })} />
                </div>
                <div className="form-group">
                    <label>Postergable</label>
                    <input type="checkbox" className="form-control" name="Postergable" checked={_configround.Postergable} onChange={
                        () => this.setState({
                            configround:
                            {
                                ...this.state.configround,
                                Postergable: !_configround.Postergable,
                            }
                        })} />
                </div>
                <div hidden={_configround.OrdenAleatorio}>
                    <label>Orden de los Puntos</label>
                    <input type="text" className="form-control" value={this.state.ordenpuntos} />
                </div>
            </div>
            <br/>
            {this.weekRoundDays()}
            <div className="input-group">
                <label>Inicio </label>
                <input type='time' className="form-control time-picker" name="HoraInicioRonda" value={_configround.HoraInicioRonda} onChange={this.handleChange.bind(this)}
                    placeholder="Hora Inicio..." />
            </div>
            <div className="input-group">
                <label>Fin </label>
                <input type='time' className="form-control time-picker" name="HoraFinRonda" value={_configround.HoraFinRonda} onChange={this.handleChange.bind(this)}
                    placeholder="Hora Fin..." />
            </div>
            <div className="input-group">
                <label>Validar presencia de los Vigilantes</label>
                <input type="checkbox" name="ValidarPresencia" checked={_configround.ValidarPresencia} onChange={this.togglePresencia.bind(this)} />
            </div>
            <div hidden={!_configround.ValidarPresencia}>
                <select className="form-control" name="IdTipoValidacion" value={_configround.IdTipoValidacion} onChange={this.handleChange.bind(this)}>
                    <option key={0} value={0}>Seleccione una opciòn...</option>
                    <option key={1} value={1}>Tonmar Foto</option>
                    <option key={2} value={2}>Escanear QR</option>
                    <option key={3} value={3}>Ambas</option>
                </select>
            </div>
            {!_configround.RondaFija && this.renderControlPoints()}
            <div className="pull-right" >
                <button className="btn btn-success" onClick={this.handleTestAleatorio.bind(this)}>Test Mostrar orden aleatorio</button>
            </div>
            <div>
                {this.state.controlpoints.map(controlpoint =>
                    <li>{this.showControlPointDesc(controlpoint.IdPuntoControl)}</li>
                )}
            </div>
        </div >);
    }

    getListByContract(idContrato) {
        this.props.GetConfigControlPointsByContract(idContrato);
        this.props.getConfigRoundsByContract(idContrato);
    }

    showValidationType(_configround) {
        const validationtypes = this.props.validationtypes || [];
        return (<div className="form-group">
            <label>Tipo de Validacion</label>
            <select className="form-control" name="IdTipoValidacion" value={_configround.IdTipoValidacion} onChange={this.handleChange.bind(this)}>
                <option key={0} value={0}>Seleccione tipo de anuncio...</option>
                {validationtypes.map(validationtype =>
                    <option key={validationtype.IdTipoValidacion} value={validationtype.IdTipoValidacion}>{validationtype.DescTipoValidacion}</option>
                )}
            </select>
        </div>);
    }
}
// Wire up the React component to the Redux store
export default connect(
    state => state.configround,
    dispatch => bindActionCreators(ConfigRoundsStore.actionCreators, dispatch)
)(ConfigRoundsApp);