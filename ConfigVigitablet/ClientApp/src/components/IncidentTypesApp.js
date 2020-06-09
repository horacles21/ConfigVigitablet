import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as IncidentTypeStore from '../store/IncidentType';
import { Mode } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
import { isEmpty } from '../store/Utils';
import { Form } from 'reactstrap';

// At runtime, Redux will merge together...
/*type IncidentTypeProps =
    IncidentTypeStore.IncidentTypeState        // ... state we've requested from the Redux store
    & typeof IncidentTypeStore.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters
*/
class IncidentTypesApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'incidenttype',
        listObjetos: 'incidenttypes',
        defaultObjeto: IncidentTypeStore.defaultIncidentType,
        incidenttype: IncidentTypeStore.defaultIncidentType,
        incidenttype_old: IncidentTypeStore.defaultIncidentType,
        incidenttypes: [],
        fieldList: {
            Categoria: { ...this.defaultField, description: "Categoria Tipo Incidente" },
            DescTipoIncidente: { ...this.defaultField, description: "Descripcion Tipo Incidente" }
        },
        getObjetos: "getIncidentType"
    }

    validate = (incidenttype) => {
        return {
            DescTipoIncidente: { errorMessage: "Falta Desc Tipo Incidente", isRequired: true, valid: true, isEmpty: isEmpty(incidenttype.DescTipoIncidente) },
        };
    };

    componentWillMount() {
        try {
            super.componentWillMount();
            this.props.getIncidentType();
        }
        catch (reason) {
            const error = reason;
            console.log(error);
        }
    }

    procesarResponse(nextProps) {

    }

    processSubmit() {
        const incidenttype = this.state.incidenttype;
        switch (this.state.mode) {
            case Mode.Create:
                this.props.create(incidenttype);
                break;
            case Mode.Update:
                this.props.update(incidenttype);
                break;
            case Mode.Delete:
                this.props.delete(incidenttype);
                break;
        }
    }
    renderNew() {
        const incidenttype = this.state.incidenttype || IncidentTypeStore.defaultIncidentType;
        return (
            <Form>
                <select name="Categoria" value={incidenttype.Categoria} onChange={this.handleChange.bind(this)}>
                    <option key='0' value='0'>Seleccione una opcion...</option>
                    <option key='O' value='E'>Exteriores</option>
                    <option key='I' value='I'>Interiores</option>
                    <option key='D' value='D'>Desastres</option>
                    <option key='F' value='F'>Fallas</option>
                    <option key='E' value='O'>Otros</option>
                </select>
                {this.fieldGroup("DescTipoIncidente", "glyphicon glyphicon-user")}
            </Form>
        );
    }
    renderListBody_(_incidenttypes) {
        this.state.records = this.state.incidenttypes || [];
        return
        /*<div className="container">
            <div className="card">
                        <div>
                            <select name="Categoria" value={_incidenttype.Categoria} onChange={this.handleChange.bind(this)}>
                                <option key='0' value='0'>Seleccione una opcion...</option>
                                <option key='O' value='E'>Exteriores</option>
                                <option key='I' value='I'>Interiores</option>
                                <option key='D' value='D'>Desastres</option>
                                <option key='F' value='F'>Fallas</option>
                                <option key='E' value='O'>Otros</option>
                            </select>
                        </div>*/


        _incidenttypes.map((_incidenttype, index) =>
            <tr key={index} onDoubleClick={this.handleUpdate.bind(this, _incidenttype)}>
                <td>{_incidenttype.DescTipoIncidente}</td>
            </tr>
        );
    }
}
export default connect(
    state => state.incidenttypes, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(IncidentTypeStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(IncidentTypesApp);
