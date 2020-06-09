import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ContractsStore from '../store/Contracts';
import { Modal } from '../components/Modal';
import { Mode, onlyNumbers, isEmpty } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
import * as Utils from '../store/Utils';
// At runtime, Redux will merge together...
/*
type ContractProps =
    ContractsStore.ContractsState        // ... state we've requested from the Redux store
    & typeof ContractsStore.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ idContract: string }>; // ... plus incoming routing parameters

interface VigitabletTipoLlamada {
    IdVigitabletTipoLlamadas: number;
    DescVigitabletTipoLlamadas: string;
}
interface VigitabletLlamadas {
    [key: string]: ContractsStore.Contract[];

}*/
class ContractsApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'contract',
        listObjetos: 'contracts',
        defaultObjeto: ContractsStore.defaultContract,
        contracts: [],
        contract: ContractsStore.defaultContract,
        contract_old: ContractsStore.defaultContract,
        title: "CONTRATOS",
        subtitle: "Lista de Contratos",
        addNewTitle: 'Agregar Nuevo Contrato',
        editTitle: 'Editar Contrato',
        listTitle: 'Lista de Contratos',
        fieldList: {
            Id: { ...this.defaultField, description: 'Id Contrato' },
            NombreCompletoContrato: { ...this.defaultField, description: 'Nombre Completo' },
            IdTipoContrato: { ...this.defaultField, description: 'Tipo Contrato', controlType: 'C', listFunction: 'showContractTypesFilter', displayFunction: 'showDescContractType' },
            Direccion: { ...this.defaultField, description: 'Direccion' },
            NroContrato: { ...this.defaultField, description: 'Nro. Contrato' },
        },
        getObjetos: "getContracts"
    }

    validate = (contract) => {
        return {
            IdTipoContrato: { errorMessage: "Falta Tipo Contrato", isRequired: true, valid: contract.IdTipoContrato > 0, isEmpty: contract.IdTipoContrato === 0 },
            Contratante: { errorMessage: "Falta contratante", isRequired: true, valid: true, isEmpty: isEmpty(contract.Contratante) },
            NombreCompletoContrato: { errorMessage: "Falta Nombre Completo", isRequired: true, valid: true, isEmpty: isEmpty(contract.NombreCompletoContrato) },
            Direccion: { errorMessage: "Falta direccion", isRequired: true, valid: true, isEmpty: isEmpty(contract.Direccion) },
            FechaContrato: { errorMessage: "Falta Fecha", isRequired: true, valid: true, isEmpty: Utils.isEmpty(contract.FechaContrato) },
            CorreoElectronicoJunta: { errorMessage: "Falta Correo Electronico Junta", isRequired: true, valid: true, isEmpty: isEmpty(contract.CorreoElectronicoJunta) },
            CorreoElectronicoComunidad: { errorMessage: "Falta Correo Electronico Comunidad", isRequired: true, valid: true, isEmpty: isEmpty(contract.CorreoElectronicoComunidad) },
            NroContrato: { errorMessage: "Falta numero de Contrato", isRequired: true, valid: true, isEmpty: isEmpty(contract.NroContrato) },
        };
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            //let idContract = parseInt(this.props.match.params.idContract) || 0;
            this.props.getContractTypes();
        }
        catch (reason) {
            console.log('Error in componentWillMount - ContractsApp:' + reason);
        }
    }

    procesarResponse(nextProps) {
    }

    processSubmit = () => {
        try {
            switch (this.state.mode) {
                case Mode.Create:
                    this.props.create(this.state.contract);
                    break;
                case Mode.Update:
                    this.props.update(this.state.contract);
                    break;
                case Mode.Delete:
                    this.props.delete(this.state.delete);
                default:
                    break;
            }
        }
        catch (reason) {
            console.log("Algo");
        }
    }

    //METODO PARA MOSTRAR EL SELECT
    showContractTypes() {
        const defaultOption = 'Seleccione Tipo de Contrato  ...'
        let options = this.props.contracttypes === null ? '' : (this.props.contracttypes !== undefined ? this.props.contracttypes.map(function (option) {
            return (
                <option key={option.IdTipoContrato} value={option.IdTipoContrato}>
                    {option.DescTipoContrato}
                </option>
            )
        }) : []);
        return (<select className='form-control' name="IdTipoContrato" onChange={this.handleChange.bind(this)} value={this.state.contract.IdTipoContrato}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    showDescContractType(IdTipoContrato) {
        return this.showDescription(IdTipoContrato, "IdTipoContrato", "DescTipoContrato", "contracttypes");
    }

    showContractTypesFilter() {
        const defaultOption = 'Mostrar todos...'
        let options = this.props.contracttypes === null ? '' : (this.props.contracttypes !== undefined ? this.props.contracttypes.map(function (option) {
            return (
                <option key={option.IdTipoContrato} value={option.IdTipoContrato}>
                    {option.DescTipoContrato}
                </option>
            )
        }) : []);
        return (<select className='form-control' name="IdTipoContrato" onChange={this._onFilterChange.bind(this, "IdTipoContrato")} value={this.state.contract.IdTipoContrato}>
            <option key={0} value={''}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }


    renderNew() {
        const contract = this.state.contract || ContractsStore.defaultContract;
        return (<div className="row">
            <div className="input-group form-control">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                <div className="fg-line">
                    {this.showContractTypes()}
                    {/*<span style={{ color: "red" }}>{this.state.errors["contacto"]}</span>*/}
                </div>
            </div>
            <div className="input-group form-control">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>
                <div className="fg-line">
                    <input type="text" className="form-control" name="Contratante" value={contract.Contratante} onChange={this.handleChange.bind(this)} placeholder="Contratante" required />
                    {/*<span style={{ color: "red" }}>{this.state.errors["contacto"]}</span>*/}
                </div>
            </div>
            <div className="input-group form-control">
                <span className="input-group-addon"><i className="glyphicon glyphicon-briefcase" /></span>
                <div className="fg-line">
                    <input type="text" className="form-control" name="NombreCompletoContrato" value={contract.NombreCompletoContrato} onChange={this.handleChange.bind(this)} placeholder="Nombre Completo Contrato" />
                </div>
            </div>
            <div className="input-group form-control">
                <span className="input-group-addon"><i className="glyphicon glyphicon-briefcase" /></span>
                <div className="fg-line">
                    <input type="text" className="form-control" name="Direccion" value={contract.Direccion} onChange={this.handleChange.bind(this)} placeholder="Direccion" />
                </div>
            </div>
            <div className="input-group form-control">
                <span className="input-group-addon"><i className="glyphicon glyphicon-calendar" /></span>
                <div className="fg-line">
                    <input type="date" className="form-control" name="FechaContrato" value={contract.FechaContrato} onChange={this.handleChange.bind(this)} placeholder="Fecha Contrato" />
                </div>
            </div>
            <div className="input-group form-control">
                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span>
                <div className="fg-line">
                    <input type="text" className="form-control" name="CorreoElectronicoJunta" value={contract.CorreoElectronicoJunta} onChange={this.handleChange.bind(this)} placeholder="Correo Electronico Junta" />
                </div>
            </div>
            <div className="input-group form-control">
                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope" /></span>
                <div className="fg-line">
                    <input type="text" className="form-control" name="CorreoElectronicoComunidad" value={contract.CorreoElectronicoComunidad} onChange={this.handleChange.bind(this)} placeholder="Correo Electronico Comunidad" />
                </div>
            </div>
            <div className="input-group form-control">
                <span className="input-group-addon"><i className="glyphicon glyphicon-phone" /></span>
                <div className="fg-line">
                    <input type="text" className="form-control" onKeyPress={(e) => onlyNumbers(e)} name="NroContrato" value={contract.NroContrato} onChange={this.handleChange.bind(this)} placeholder="Nro. Contrato" />
                </div>
            </div>
        </div>);
    }

    handleUpdateFunctions(contract) {

    }

    initializeRecords() {
        this.state.records = this.state.contracts || [];
    }

    getListByContract(idContrato) {
    }
}

export default connect(
    (state) => state.contract, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(ContractsStore.actionCreators, dispatch)// Selects which action creators are merged into the component's props
)(ContractsApp);