import React, { NavLink } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ConfigIncidentsStore from '../store/ConfigIncident';
import * as Utils from '../store/Utils';
import { BaseApp } from '../components/BaseApp';

// At runtime, Redux will merge together...
/*type ConfigIncidentProps =
    ConfigIncidentsStore.ConfigIncidentsState        // ... state we've requested from the Redux store
    & typeof ConfigIncidentsStore.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ IdContrato: string }>; // ... plus incoming routing parameters*/
//const idContract = 22;
class ConfigIncidentApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: "configincident",
        listObjetos: "configincidents",
        configincidents: [],
        configincident: ConfigIncidentsStore.defaultConfigIncident,
        configincident_old: ConfigIncidentsStore.defaultConfigIncident,
        isModeEdit: false,
        arIdIncidentes: [],
        chkIncidentes: [],
        fieldList: {
            IdTipoIncidente: { ...this.defaultField, description: "Tipo incidente" }
        },
        getObjetos: "getIncidentTypes"
    }
    validate = ConfigIncident => {
        return {
            IdTipoIncidente: { errorMessage: "Falta tipo de Incidente", isRequired: true, valid: ConfigIncident.IdTipoIncidente > 0, isEmpty: false },

        };

    }


    /*constructor() {
        super();
    }*/
    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            //this.props.requestIn.idents(IdContrato);
            this.props.getIncidentTypes();
            let IdContrato = parseInt(this.props.match.params.IdContrato) || 0;
            this.props.getIncidentsByContract(IdContrato);
        }
        catch (reason) {
            const msg = reason;
        }
    }

    procesarResponse(nextProps) {
        try {
            if (nextProps.configincidents !== this.props.configincidents) {
                this.setState({
                    configincidents: nextProps.configincidents
                });
                this.initialize(nextProps.configincidents);
            }
        }
        catch (reason) {
            var error = reason;
        }
    }

    isCheckedType(IdTipoIncidente) {
        if (this.state.chkIncidentes.length > 0)
            return (this.state.configincidents.findIndex(incident => incident.IdTipoIncidente === IdTipoIncidente) !== -1);
        else
            return false;
    }

    isCheckedState(IdTipoIncidente) {
        if (this.state.chkIncidentes.length > 0)
            return (this.state.chkIncidentes[IdTipoIncidente]);
        else
            return false;
    }
    //METODO PARA MOSTRAR EL SELECT
    showConfigIncidentTypes() {
        const defaultOption = 'Seleccione Tipo Incidente...';
        const incidentTypes = this.props.incidentTypes || [];
        //let options = this.props.incidentTypes === null ? '' : (this.props.incidentTypes !== undefined ? this.props.incidentTypes.map(function (option) {

        const options = incidentTypes.map(function (option) {
            return (
                <option key={option.IdTipoIncidente} value={option.IdTipoIncidente}>
                    {option.DescTipoIncidente}
                </option>
            );
        });
        return <select className='form-control' name="IdTipoIncidente" onChange={this.handleChange.bind(this)} value={this.state.configincident.IdTipoIncidente}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }
    renderNew() {
        const configincident = ConfigIncidentsStore.defaultConfigIncident;
        return <div>
            <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                {this.showConfigIncidentTypes()}
            </div>
            <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                <input type="text" className="form-control" name="PersonaContactoVT" value={configincident.TipoIncidente} onChange={this.handleChange.bind(this)} placeholder="Persona Contacto" required />
            </div>
            <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-briefcase" /></span>
                <input type="text" className="form-control" name="CargoPersonaContactoVT" value={configincident.TipoIncidente} onChange={this.handleChange.bind(this)} placeholder="Cargo" />
            </div>
            <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-phone" /></span>
                <input type="text" className="form-control" onKeyPress={(e) => Utils.onlyNumbers(e)} name="TelefonoContactoVT" value={configincident.TipoIncidente} onChange={this.handleChange.bind(this)} placeholder="Telefono" />
            </div>
        </div>;
    }


    initialize(configincidents) {
        let arr = this.state.arIdIncidentes || [];
        let arr_ = this.state.chkIncidentes || [];
        if (arr.length === 0) {
            const incidentTypes = this.props.incidentTypes || [];
            incidentTypes.forEach(incident => {
                arr.push(incident.IdTipoIncidente);

                arr_.push(configincidents.findIndex(configincident => configincident.IdTipoIncidente === incident.IdTipoIncidente) !== -1);
            });
            this.setState({
                arIdIncidentes: arr,
                chkIncidentes: arr_,

            });
        }
    }

    toggleCheckbox(e) {
        const index = e.target.value;
        let arr = this.state.arIdIncidentes;
        let arr_ = this.state.chkIncidentes;
        if (arr.length === 0) {
            this.initialize(this.state.configincidents);
        }
        arr_[index] = !arr_[index];
        //this.state.chkIncidentes;
        this.setState({
            chkIncidentes: arr_
        });
    }
    handleAddType() {
        this.props.history.push('/incidenttypes');
    }

    handleSubmit() {
        let arr = [];
        const arIdIncidentes = this.state.arIdIncidentes || [];
        arIdIncidentes.map((incident, key) => {
            if (this.state.chkIncidentes[key]) {
                arr.push(incident);
            }
        });
        if (arr.length > 0) {
            this.props.createIncidents(arr);
        }
    }
    /*renderBody() {
        const _incidentTypes = this.props.incidentTypes || [];
        if (_incidentTypes.length === 0) {
            return [];
        }
        //const _incidentTypes = this.props.incidentTypes.map !== undefined ? this.props.incidentTypes : [];
        //_incidentTypes.map != undefined ? _incidentTypes.map(incidentType => console.log(incidentType.DescTipoIncidente)) : [];
        const categorias = [{ id: 'A', Desc: 'A' }, { id: 'D', Desc: 'Desastres' }, { id: 'E', Desc: 'Exteriores' }, { id: 'I', Desc: 'Interiores' }, { id: 'F', Desc: 'Fallas' }, { id: 'O', Desc: 'Otros' }];
        var index = 0;
        return categorias.map(categoria =>
                       {categoria.Desc}
                <div>
.map(incidentType =>
                   
                                                       
                                                      
                        </div>
                    )}*/
                         
      
  
}
export default connect(
    state => state.configincident,
    dispatch => bindActionCreators(ConfigIncidentsStore.actionCreators, dispatch)
)(ConfigIncidentApp);
