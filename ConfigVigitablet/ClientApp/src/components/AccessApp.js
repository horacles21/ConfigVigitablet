import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AccessesStore from '../store/Access';
import { Mode, onlyNumbers } from '../store/Utils';
import { AccessType } from '../store/Access';
import { BaseApp } from '../components/BaseApp';
import { isEmpty } from '../store/Utils';

// At runtime, Redux will merge together...
/*type AccessProps =
    AccessesStore.AccessesState        // ... state we've requested from the Redux store
    & typeof AccessesStore.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ idContract: string }>; // ... plus incoming routing parameters*/
/*
interface VigitabletTipoLlamada {
    IdVigitabletTipoLlamadas: number;
    DescVigitabletTipoLlamadas: string;
}
interface VigitabletLlamadas {
    [key: string]: AccessesStore.Access[];

}*/
class AccessApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'access',
        listObjetos: 'accesses',
        defaultObjeto: AccessesStore.defaultAccess,
        accesses: [],
        access: AccessesStore.defaultAccess,
        access_old: AccessesStore.defaultAccess,
        title: 'ACCESOS',
        subtitle: 'Lista de Accesos',
        addNewTitle: 'Agregar Nuevo Acceso',
        editTitle: 'Editar Acceso',
        listTitle: 'Lista de Accesos',
        fieldList: {
            IdContrato: this.fieldContract,
            Id: {
                ...this.defaultField,
                description: 'Id',
            },
            DescAcceso: {
                ...this.defaultField,
                description: 'DescAcceso',
            },
            NombreAcceso: {
                ...this.defaultField,
                description: 'NombreAcceso',
            },
            NroInvitados: {
                ...this.defaultField,
                description: 'NroInvitados',
            },
            IdTipoAcceso: {
                ...this.defaultField,
                description: 'IdTipoAcceso',
                isVisible: true,
                controlList: 'C',
                listFunction: 'showAccessTypeFilter',
                displayFunction : 'showAccessTypeDesc'
            },
            DescTipoAcceso: {
                ...this.defaultField,
                description: 'DescTipoAcceso',
            }
        },
        getObjetos: "getAccesses",
        nroCols: 7
    };
    validate = (access) => {
        return {
            //IdGuardia: 0,
            //DescRonda: { errorMessage: "Falta Descripcion ronda", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configcontrolpoint.DescRonda) },
            DescAcceso: { isVisible: false, title: 'Ubicacion', errorMessage: "Falta Ubicacion QR", isRequired: true, valid: true },
            NombreAcceso: { isVisible: true, title: 'Descripcion', errorMessage: "Falta Descripcion QR", isRequired: true, valid: true },
            NroInvitados: { isVisible: true, title: 'Codigo QR', errorMessage: "Falta Codigo QR", isRequired: true, valid: true },
            IdTipoAviso: { errorMessage: "Falta nombre guardia", isRequired: true, valid: true, isEmpty: isEmpty(access.IdTipoAviso) },
            //DiasSemanasRonda: { errorMessage: "Falta nombre guardia", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configcontrolpoint.DiasSemanasRonda) },
        }
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            //const idContract = parseInt(this.props.match.params.idContract) || 22;
            this.props.getAccessTypes();
            this.props.getAccesses();
            //this.props.GetAccessByContract(22);

        } catch (reason) {
            console.log('Error in componentWillMount - AccessApp:' + reason);
        }
    }

    procesarResponse(nextProps) {

    }
    showAccessTypesFiter() {
        const defaultOption = 'Mostrar todos...';
        const options = this.props.accesstypes === null ? '' : this.props.accesstypes !== undefined ? this.props.accesstypes.map(function (option) {
            return (
                <option key={option.IdTipoAcceso} value={option.IdTipoAcceso}>
                    {option.DescTipoAcceso}
                </option>
            );
        }) : [];
        return <select className='form-control' name="IdTipoAcceso" onChange={this._onFilterChange.bind(this, "IdTipoAcceso")} value={this.state.access.IdTipoAcceso}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }
    //METODO PARA MOSTRAR EL SELECT
    showAccessTypes() {
        const defaultOption = 'Seleccione Tipo Acceso...';
        const options = this.props.accesstypes === null ? '' : this.props.accesstypes !== undefined ? this.props.accesstypes.map(function (option) {
            return (
                <option key={option.IdTipoAcceso} value={option.IdTipoAcceso}>
                    {option.DescTipoAcceso}
                </option>
            );
        }) : [];
        return <select className='form-control' name="IdTipoAcceso" onChange={this.handleChange.bind(this)} value={this.state.access.IdTipoAcceso}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }
    showAccessTypeDesc(IdTipoAcceso) {
        return this.showDescription(IdTipoAcceso, "IdTipoAcceso", "DescTipoAcceso", "accesstypes");
    }

    renderNew() {
        const access = this.state.access;//AccessesStore.defaultAccess;
        return <div className="row">
            <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                <div className="fg-line">
                    {this.showAccessTypes()}
                    {/*<span style={{ color: "red" }}>{this.state.errors["contacto"]}</span>*/}
                </div>
            </div>
            {this.fieldGroup("NombreAcceso", "glyphicon glyphicon-plane")}
            <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-briefcase" /></span>
                <div className="fg-line">
                    <input type="text" className="form-control" name="DescAcceso" value={access.DescAcceso} onChange={this.handleChange.bind(this)} placeholder="Descripcion Acceso" />
                </div>
            </div>
            <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-phone" /></span>
                <div className="fg-line">
                    <input type="text" className="form-control" onKeyPress={(e) => onlyNumbers(e)} name="NroPersonas" value={access.NroPersonas} onChange={this.handleChange.bind(this)} placeholder="Nro. Personas" />
                </div>
            </div>
        </div>;
    }

    renderListBody_(list) {
        this.state.records = this.state.accesses || [];
        return list.map((access, index) => (
            <tr key={index} onDoubleClick={this.handleUpdate(this, access)}>
                <td>{access.Id}</td>
            </tr>));

    }
    initializeRecords() {
        this.state.records = this.state.accesses || [];
    }
    handleNewFunctions() { }
    handleUpdateFunctions(access) {

    }
    getListByContract(idContrato) {
        //this.props.getAreasByContract(idContrato);
    }
}

export default connect(
    state => state.access, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(AccessesStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(AccessApp);