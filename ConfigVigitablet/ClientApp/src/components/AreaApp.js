import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AreasStore from '../store/Area';
import { Mode, isEmpty } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
import { Form } from 'reactstrap';
import * as Settings from '../store/MyConfig';

class AreaApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'area',
        listObjetos: 'areas',
        defaultObjeto: AreasStore.defaultArea,
        areas: [],
        area: AreasStore.defaultArea,
        area_old: AreasStore.defaultArea,
        fieldList: {
            IdContrato: this.fieldContract,
            IdArea: { ...this.defaultField, description: 'Id Area' },
            CodigoArea: { ...this.defaultField, description: 'Codigo Area' },
            NombreArea: { ...this.defaultField, description: 'Nombre Area' },
        },
        title: 'Areas',
        subtitle: 'Lista de Areas',
        addNewTitle: 'Agregar Nueva Area',
        editTitle: 'Editar Area',
        listTitle: 'Lista de Areas',
        getObjetos: "getAreas",
        nroCols: 4
    }

    validate = area => {
        return {
            IdContrato: {
                errorMessage: "Falta IdContrato", isRequired: true, valid: true, isEmpty: isEmpty(area.IdContrato)
            },
            NombreArea: {
                errorMessage: "Falta Area", isRequired: true, valid: true, isEmpty: isEmpty(area.NombreArea)
            },
            CodigoArea: {
                errorMessage: "Falta Codigo", isRequired: true, valid: true, isEmpty: isEmpty(area.CodigoArea)
            },
        };
    };

    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            this.props.getAreas();
        } catch (reason) {
            console.log('Error in componentWillMount - ContactsApp:' + reason);
        }
    }

    procesarResponse(nextProps) {
        // This method runs when incoming props (e.g., route params) change
    }

    renderNew() {
        const area = this.state.area || AreasStore.defaultArea;
        return (
            <Form>
                {this.showContracts_(area.IdContrato)}
                {this.fieldGroup("NombreArea", "glyphicon glyphicon-user")}
                {this.fieldGroup("CodigoArea", "glyphicon glyphicon-envelope")}
            </Form>
        );
    }

    processSubmit() {
        //this.state.area.IdContrato = this.state.idContract;
        switch (this.state.mode) {
            case Mode.Create:
                this.props.create(this.state.area);
                break;
            case Mode.Update:
                this.props.update(this.state.area);
                break;
            case Mode.Delete:
                this.props.delete(this.state.area);
                break;
            default:
                break;
        }

    }
    handleUpdateFunctions(area) {

    }

    initializeRecords() {
        this.state.records = this.state.areas || [];
    }

    getListByContract(idContrato) {
        this.props.getAreasByContract(idContrato);
    }
}

export default connect(
    state => state.area, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(AreasStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(AreaApp);