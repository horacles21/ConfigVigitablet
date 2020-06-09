import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ConfigTurnStore from '../store/ConfigTurn';
import { defaultPeriod } from '../store/Period';
import { defaultGuardEmployee } from '../store/GuardEmployeeInfo';
import { Mode, defaultListDays, SetWeekDays, onlyNumbers, GetWeekDays } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
import { isEmpty } from '../store/Utils';
import { DropdownButton } from 'react-bootstrap';

//import { WeekDays } from '../components/WeekDays';

// At runtime, Redux will merge together...
/*type ConfigTurnProps =
    ConfigTurnStore.ConfigTurnsState        // ... state we've requested from the Redux store
    & typeof ConfigTurnStore.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ id: string }>; // ... plus incoming routing parameters
*/
class ConfigTurnApp extends BaseApp {

    state = {
        ...this.defaultState,
        objeto: 'configturn',
        listObjetos: 'configturns',
        defaultObjeto: ConfigTurnStore.defaultConfigTurn,
        configturn: ConfigTurnStore.defaultConfigTurn,
        configturn_old: ConfigTurnStore.defaultConfigTurn,
        DiasSemanasGuardia: defaultListDays,
        guardemployees: [],
        idguardemployees: [],
        title: 'TURNOS',
        subtitle: 'Lista de Turnos',
        addNewTitle: 'Agregar Nueva Turno',
        editTitle: 'Editar Turno',
        listTitle: 'Lista de Turnos',
        fieldList: {
            IdContrato: this.fieldContract,
            //Contrato: { ...this.defaultField, description: "Contrato", isVisible: true, controlType: 'C', listFunction: 'showContractsFilter' },
            IdGuardia: { ...this.defaultField, description: "Id Guardia", isVisible: true, controlType: 'T', listFunction: '' },
            NombreGuardia: { ...this.defaultField, description: "Nombre Guardia", isVisible: true, controlType: 'T', listFunction: '' },
            PeriodoGuardia: { ...this.defaultField, description: "Periodo", isVisible: true, controlType: 'C', listFunction: 'showPeriodsFilter' },
            HoraInicioGuardia: { ...this.defaultField, description: "Hora Inicio", isVisible: true, controlType: 'T', listFunction: '' },
            HoraFinGuardia: { ...this.defaultField, description: "Hora Fin", isVisible: true, controlType: 'T', listFunction: '' },
            DiasSemanasGuardia: { ...this.defaultField, description: "Dias de la semana (L-M-M-J-V-S-D)", isVisible: true, controlType: 'T', listFunction: '' }
            //Vigilantes: "Vigilantes",
        },
        getObjetos: "getConfigTurns"
    }

    constructor() {
        super();
        this.state.title = 'TURNOS';
    }

    validate = (configturn) => {
        // true means invalid, so our conditions got reversed
        return {
            IdContrato: { errorMessage: "Falta Contrato", isRequired: true, valid: configturn.IdContrato > 0, isEmpty: configturn.IdContrato === 0 },
            NombreGuardia: { errorMessage: "Falta nombre guardia", isRequired: true, valid: true, isEmpty: isEmpty(configturn.NombreGuardia) },
            PeriodoGuardia: { errorMessage: "Falta Periodo", isRequired: true, valid: configturn.PeriodoGuardia > 0, isEmpty: false },
            DiasSemanasGuardia: { errorMessage: "Falta dias semana", isRequired: true, valid: true, isEmpty: isEmpty(configturn.DiasSemanasGuardia) },
            HoraInicioGuardia: { errorMessage: "Hora Inicio Guardia", isRequired: true, valid: true, isEmpty: isEmpty(configturn.HoraInicioGuardia) },
            HoraFinGuardia: { errorMessage: "Hora Fin Guardia", isRequired: true, valid: true, isEmpty: isEmpty(configturn.HoraFinGuardia) },
            EventoInicio: { errorMessage: "Falta Evento Inicio", isRequired: true, valid: configturn.EventoInicio > 0, isEmpty: false },
            EventoFin: { errorMessage: "Falta Evento Fin", isRequired: true, valid: configturn.EventoFin > 0, isEmpty: false },
        };
    };

    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            this.props.getConfigTurns();
            this.props.getTurnEventTypes();
            //this.props.getConfigTurnsGuardsByContract(1160);
            this.props.getGuardEmployees();
            this.props.getPeriods();
            //this.props.getConfigTurnGuards(3);
            //this.props.getIDsConfigTurnGuards(3);
            let IdGuardia = parseInt(this.props.match.params.id, 10) || 0;
            if (IdGuardia !== 0) {
                const configturn_ = this.state.configturns.find(x => x.IdGuardian === IdGuardia);
                this.setState({
                    configturn: configturn_,
                    mode: Mode.Update
                });
            }
            else {
            }

        } catch (reason) {
            const msg = reason;
            console.log('Error configTurn componentWillMount =' + msg);
        }
    }

    procesarResponse(nextProps) {
        try {
            let IdGuardia = parseInt(nextProps.match.params.id, 10) || 0;
            if (IdGuardia !== 0) {
                const configturn_ = this.state.configturns.find(x => x.IdGuardia === IdGuardia);
                this.setState({
                    configturn: configturn_,
                    mode: Mode.Update
                });
            }

            if (nextProps.configturn !== this.props.configturn) {
                this.setState({
                    DiasSemanasGuardia: SetWeekDays(nextProps.configturn.DiasSemanasGuardia),
                });
                this.props.getIDsConfigTurnGuards(nextProps.configturn.IdGuardia);
            }

            if (this.props.idguardemployees !== nextProps.idguardemployees) {
                let arIDs = this.props.guardemployees.filter(x => nextProps.idguardemployees.indexOf(x.IdPersonaVig) !== -1);
                this.setState({
                    guardemployees: arIDs,
                    idguardemployees: nextProps.idguardemployees
                });
            }
            if (this.props.guardemployees !== nextProps.guardemployees) {
                //if (this.props.idguardemployees.length != 0) {
                //    let arIDs = nextProps.guardemployees.filter(x => this.props.idguardemployees.indexOf(x.IdPersonaVig) != -1);
                //}
                //else {
                //   this.props.getIDsConfigTurnGuards(3);
                //}
            }
        }
        catch (reason) {
            console.log('Error in procesarResponse ConfigTurn:' + reason);
        }
    }
    /*
    componentWillUpdate() {
    }
    componentDidUpdate() {
    }
    componentWillUnmount() {
    }*/
    processSubmit() {
        switch (this.state.mode) {
            case Mode.Create:
                this.props.create(this.state.configturn, this.state.idguardemployees);
                break;
            case Mode.Update:
                this.props.update(this.state.configturn, this.state.idguardemployees);
                break;
            case Mode.Delete:
                this.props.delete(this.state.configturn, this.state.idguardemployees);
                break;
            default:
                break;
        }
    }

    handleUpdateFunctions(configturn) {
        this.props.getIDsConfigTurnGuards(configturn.IdGuardia);
        this.setState({
            DiasSemanasGuardia: SetWeekDays(configturn.DiasSemanasGuardia),
        });
    }

    handleNewFunctions() {
        this.setState({
            idguardemployees: []
        });
    }

    /*handleDelete = configturn => {
        this.setState({
            mode: Mode.Delete,
            configturn_old: configturn,
            DiasSemanasGuardia: defaultListDays
        });
        this.props.delete(this.state.configturn.IdGuardia);
    }*/

    toggleDay(e) {
        const index = e.target.value;
        var arr = this.state.DiasSemanasGuardia;
        if (this.state.DiasSemanasGuardia[index] === 1) {
            arr[index] = 0;
        } else {
            arr[index] = 1;
        }
        this.setState({
            DiasSemanasGuardia: arr,
            configturn: {
                ... this.state.configturn,
                DiasSemanasGuardia: GetWeekDays(arr)
            }
        });
    }

    isCheckedDay(index) {
        return this.state.DiasSemanasGuardia[index] === 1;
    }

    weekDaysTurn() {
        const days = ["Lun ", "Mar ", "Mie ", "Jue ", "Vie ", "Sab ", "Dom "];
        return <table><tr>
            {days.map((item, index) => (
                <td>
                    {item}<input type="checkbox" value={index} checked={this.isCheckedDay(index)} onChange={this.toggleDay.bind(this)} />
                </td>
            ))}
        </tr></table>;
    }


    showPeriodsFilter() {
        const defaultOption = '(Mostrar todos)';
        const _periods = this.props.periods || [];
        let options = _periods.length > 0 ? _periods.map(function (option) {
            return (
                <option key={option.IdPeriodo} value={option.IdPeriodo}>
                    {option.DescPeriodo}
                </option>
            )
        }) : [];
        return <select className='form-control input-sm' name="PeriodoGuardia" onChange={this._onFilterChange.bind(this, "PeriodoGuardia")} value={this.state.configturn.PeriodoGuardia}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }

    showTurnEventTypes(name_, value_) {
        const defaultOption = 'Seleccione...';
        const _turneventtypes = this.props.turneventtypes || [];
        let options = _turneventtypes.length > 0 ? _turneventtypes.map(function (option) {
            return (
                <option key={option.IdTipoEventoGuardia} value={option.IdTipoEventoGuardia}>
                    {option.DescTipoEventoGuardia}
                </option>
            );
        }) : [];
        return <select className='form-control input-sm' name={name_} onChange={this.handleChange.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }

    showDiasSemana(daysTurn) {
        const arDaysTurn = SetWeekDays(daysTurn);
        const days = ["L", "M", "M", "J", "V", "S", "D"];
        return <div>
            {days.map((item, index) => (
                <div className="col-md-1 col-xs-1">
                    {/*<p className="c-gray f-16"> {item}</p>*/}
                    <label className="checkbox checkbox-inline">
                        <input type="checkbox" value={index} checked={arDaysTurn[index] === 1} />
                    </label>
                </div>
            ))}
        </div>;
    }

    showConfigTurnGuard(id) {
        const guardemployees = this.props.guardemployees || [];
        const guardemployee = guardemployees.find(x => x.IdPersonaVig === id) || defaultGuardEmployee;
        return guardemployee.PrimerNombre + ' ' + guardemployee.SegundoNombre + ' ' + guardemployee.PrimerApellido + ' ' + guardemployee.SegundoApellido;
    }

    showDescPeriod(id) {
        const periods = this.props.periods || [];
        const descPeriod = periods.find(x => Number.parseInt(x.IdPeriodo) === Number.parseInt(id)) || defaultPeriod;
        return descPeriod.DescPeriodo;
    }

    toggleGuards(e) {
        const index = parseInt(e.target.value, 10);
        var arr = this.state.idguardemployees;
        arr.indexOf(index) === -1 ? arr.push(index) : arr.splice(arr.indexOf(index), 1);
        this.setState({
            idguardemployees: arr,
            configturn: {
                ...this.state.configturn
            }
        });
    }

    renderNew() {
        const _configturn = this.state.configturn;
        return <div className="card-body card-padding">
            {this.showContracts_(_configturn.IdContrato)}
            <div className="col-md-2 col-xs-1">
                <p className="c-gray f-16">Periodo</p>
            </div>
            <div className="col-md-10 col-xs-1">
                <div className="input-group form-group">
                    <div className="dtp-container">
                        {this.showPeriods('PeriodoGuardia', _configturn.PeriodoGuardia)}
                    </div>
                </div>
            </div>
            <div className="col-md-2 col-xs-1">
                <p className="c-gray f-16">Nombre</p>
            </div>
            <div className="col-md-10 col-xs-1">
                <div className="input-group form-group">
                    <div className="dtp-container">
                        <input type='text' className={this.getClassName('NombreGuardia')}
                            name="NombreGuardia" value={_configturn.NombreGuardia}
                            onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this, 'NombreGuardia')}
                            placeholder={this.getPlaceHolder(this.state.configturn, 'NombreGuardia', "Nombre de Guardia")} />
                    </div>
                </div>
            </div>
            {this.weekDaysTurn()/*weekDays(_configturn.DiasSemanasGuardia)*/}
            <br />
            <br />
            <p className="c-gray f-16">Hora Inicio</p>
            <span className="input-group-addon"><i className="glyphicon glyphicon-time" /></span>
            <div className="dtp-container">
                <input type='time' className="form-control time-picker" name="HoraInicioGuardia" value={_configturn.HoraInicioGuardia} onChange={this.handleChange.bind(this)} />
            </div>
            <p className="c-gray f-16">Hora Fin</p>
            <span className="input-group-addon"><i className="glyphicon glyphicon-time" /></span>
            <div className="dtp-container">
                <input type='time' className="form-control time-picker" name="HoraFinGuardia" value={_configturn.HoraFinGuardia} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this, 'HoraFinGuardia')} />
            </div>
            <label for="EventoInicio">Recepcion al incio</label>
            {this.showTurnEventTypes('EventoInicio', _configturn.EventoInicio)}
            <label for="EventoFin">Entrega al final</label>
            {this.showTurnEventTypes('EventoFin', _configturn.EventoFin)}
            {this.showChkGuardEmployeesByTurn()}
        </div>;
    }

    initializeRecords() {
        this.state.records = this.state.configturns;
    }

    getListByContract(idContrato) {
        this.props.getConfigTurnsByContract(idContrato);
    }

    //METODO PARA MOSTRAR EL SELECT
    showGuardEmployees() {
        const defaultOption = 'Seleccione...';
        let options = this.props.guardemployees === null ? '' : (this.props.guardemployees !== undefined ? this.props.guardemployees.map(function (option) {
            return (
                <option key={option.IdPersonaVig} value={option.IdPersonaVig}>
                    {`${option.PrimerApellido} ${option.PrimerNombre}`}
                </option>
            )
        }) : []);
        return <select className='form-control' name="IdPersonaVig" onChange={this.handleChange.bind(this)} value={this.state.configturn.IdPersonaVig}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }

    showGuardEmployeesByTurn() {
        const defaultOption = 'Seleccione...';
        let options = this.state.guardemployees === null ? '' : (this.state.guardemployees !== undefined ? this.state.guardemployees.map(function (option) {
            return (
                <option key={option.IdPersonaVig} value={option.IdPersonaVig}>
                    {`${option.PrimerApellido} ${option.PrimerNombre}`}
                </option>
            )
        }) : []);
        return <select className='form-control' name="IdPersonaVig" onChange={this.handleChange.bind(this)} value={this.state.configturn.IdPersonaVig}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }

    renderListBody(list) {
        this.initializeRecords();
        return (
            list.map((configturn, index) =>
                (<tr key={index} onDoubleClick={this.handleUpdate.bind(this, configturn)}>
                    <td>{this.showDescContracts(configturn.IdContrato)}</td>
                    <td>{configturn.IdGuardia}</td>
                    <td>{configturn.NombreGuardia}</td>
                    <td>{this.showDescPeriod(configturn.PeriodoGuardia)}</td>
                    <td>{configturn.HoraInicioGuardia}</td>
                    <td>{configturn.HoraFinGuardia}</td>
                    <td>{this.showDiasSemanaStr(configturn.DiasSemanasGuardia)}</td>
                    <td>
                        {configturn.ConfigGuardiasVigilantes.map(x =>
                            <li>{this.showConfigTurnGuard(x)}</li>)}
                    </td>
                </tr>)
            ));
    }

    showChkGuardEmployeesByTurn() {
        const idguardemployees = this.state.idguardemployees || [];
        return <div>
            {(this.props.guardemployees || []).map(option =>
                <div className="row">
                    <input type="checkbox" key={option.IdPersonaVig} checked={idguardemployees.indexOf(option.IdPersonaVig) !== -1} onChange={this.toggleGuards.bind(this)} value={option.IdPersonaVig} />{option.PrimerApellido + ' ' + option.PrimerNombre}
                    <div className="imgPreview">
                        <img src={option.RutaImagenVig} width="50px" height="50px" />
                    </div>
                </div>
            )}
        </div>
            ;
    }
}

export default connect(
    state => state.configturn, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(ConfigTurnStore.actionCreators, dispatch)// Selects which action creators are merged into the component's props
)(ConfigTurnApp);
