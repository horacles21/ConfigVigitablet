import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GeosStore from '../store/Geo';
import { Mode, isEmpty } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
import { Form } from 'reactstrap';
import * as Settings from '../store/MyConfig';

class GeoApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'geo',
        listObjetos: 'geos',
        defaultObjeto: GeosStore.defaultGeo,
        geos: [],
        geo: GeosStore.defaultGeo,
        geo_old: GeosStore.defaultGeo,
        fieldList: {
            //IdContrato: this.fieldContract,
            Id: { ...this.defaultField, description: 'Id Geo' },
            longitude: { ...this.defaultField, description: 'Codigo Geo' },
            latitude: { ...this.defaultField, description: 'Nombre Geo' },
        },
        title: 'Geos',
        subtitle: 'Lista de Geos',
        addNewTitle: 'Agregar Nueva Geo',
        editTitle: 'Editar Geo',
        listTitle: 'Lista de Geos',
    }

    validate = geo => {
        return {
            id: {
                errorMessage: "Falta IdContrato", isRequired: true, valid: true, isEmpty: isEmpty(geo.IdContrato)
            },
            GeogCol1: {
                errorMessage: "Falta Geo", isRequired: true, valid: true, isEmpty: isEmpty(geo.NombreGeo)
            },
            GeogCol2: {
                errorMessage: "Falta Codigo", isRequired: true, valid: true, isEmpty: isEmpty(geo.CodigoGeo)
            },
        };
    };

    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            //super.componentWillMount();
            this.props.sendWhatsApp();
            this.props.getSession();
            this.props.getGeos();
        } catch (reason) {
            console.log('Error in componentWillMount - ContactsApp:' + reason);
        }
    }

    procesarResponse(nextProps) {
        // This method runs when incoming props (e.g., route params) change
    }

    renderNew() {
        const geo = this.state.geo || GeosStore.defaultGeo;
        return (
            <Form>
                {/*this.showContracts_(geo.IdContrato)}
                {this.fieldGroup("NombreGeo", "glyphicon glyphicon-user")}
                {this.fieldGroup("CodigoGeo", "glyphicon glyphicon-envelope")*/}
                {this.renderMap(geo.latitude, geo.longitude)}
            </Form>
        );
    }
    /*renderListBody(list) {
        return list.map((geo, index) =>
            (<tr key={index} onDoubleClick={this.handleUpdate(this, geo)}>
                <td>{geo.id}</td>
                <td>{geo.GeogCol1}</td>
                <td>{geo.GeogCol2}</td>
        </tr>));
    }*/
    renderMap(latitude, longitude) {
        const _2d = longitude;
        const _3d = latitude;
        const src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.197674360641!2d" + _2d + "!3d" + _3d + "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDI5JzA2LjMiTiA2NsKwNDgnMTkuOCJX!5e0!3m2!1ses-419!2sve!4v1589402951874!5m2!1ses-419!2sve";
        return <iframe src={src} width="100%" height="450" frameBorder="0" style={{ border: "0" }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
    }


    processSubmit() {
        //this.state.geo.IdContrato = this.state.idContract;
        switch (this.state.mode) {
            case Mode.Create:
                this.props.create(this.state.geo);
                break;
            case Mode.Update:
                this.props.update(this.state.geo);
                break;
            case Mode.Delete:
                this.props.delete(this.state.geo);
                break;
            default:
                break;
        }

    }
    handleUpdateFunctions(geo) {

    }

    initializeRecords() {
        this.state.records = this.state.geos || [];
    }

    getListByContract(idContrato) {
        this.props.getGeosByContract(idContrato);
    }
}

export default connect(
    state => state.geo, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(GeosStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(GeoApp);