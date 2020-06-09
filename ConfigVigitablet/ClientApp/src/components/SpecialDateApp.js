import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SpecialDatesStore from '../store/SpecialDate';
import { Mode, onlyNumbers, isEmpty } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
import * as Settings from '../store/MyConfig';


class SpecialDateApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'specialdate',
        listObjetos: 'specialdates',
        defaultObjeto: SpecialDatesStore.defaultSpecialDate,
        specialdates: [],
        specialdate: SpecialDatesStore.defaultSpecialDate,
        specialdate_old: SpecialDatesStore.defaultSpecialDate,
        datetypes: [],
        fieldList: {
            //IdContrato: this.fieldContract,//{ ...this.defaultField, description: 'Contrato' },
            IdFecha: { ...this.defaultField, description: 'Codigo Fecha' },
            Fecha: { ...this.defaultField, description: 'Fecha' },
            DescFecha: { ...this.defaultField, description: 'Nombre Fecha' },
            IdTipoFecha: { ...this.defaultField, description: 'Tipo Fecha', controlType: 'C', listFunction: 'showDateTypesFilter', displayFunction: 'showDateTypeDesc' }
        },
        getObjetos: 'getSpecialDates'
    }

    validate = specialdate => {
        return {
            /*IdContrato: {
                errorMessage: "Falta IdContrato", isRequired: true, valid: true, isEmpty: isEmpty(specialdate.IdContrato)
            },*/
            Fecha: {
                errorMessage: "Falta Fecha", isRequired: true, valid: true, isEmpty: isEmpty(specialdate.Fecha)
            },
            DescFecha: {
                errorMessage: "Falta Descripcion Fecha", isRequired: true, valid: true, isEmpty: isEmpty(specialdate.DescFecha)
            },
            IdTipoFecha: {
                errorMessage: "Falta Tipo Fecha", isRequired: true, valid: specialdate.IdTipoFecha > 0, isEmpty: false
            },
        };

    };
    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            this.props.getSpecialDates();
            this.props.getDateTypes();
        } catch (reason) {
            console.log('Error in componentWillMount - ContactsApp:' + reason);
        }

    }
    procesarResponse(nextProps) {
        // This method runs when incoming props (e.g., route params) change
        if (nextProps.response !== this.props.response) {
            console.log(nextProps.response.status);
        }
        if (nextProps.datetypes !== this.props.datetypes) {
            this.setState({
                datetypes: nextProps.datetypes
            });
        }
    }

    getOptionsDateTypes() {
        const _datetypes = this.props.datetypes || [];
        const options = _datetypes.length > 0 ? _datetypes.map(function (option) {
            return (
                <option key={option.IdTipoFecha} value={option.IdTipoFecha}>
                    {option.DescTipoFecha}
                </option>
            );
        }) : [];
        return options;
    }

    showDateTypes(name_, value_) {
        const defaultOption = 'Seleccione tipo de Fecha...';
        const options = this.getOptionsDateTypes();
        return (<select className='form-control input-sm' name={name_} onChange={this.handleChange.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }
    showDateTypesFilter() {
        const defaultOption = 'Mostrar Todos...';
        const options = this.getOptionsDateTypes();
        return (<select className='form-control input-sm' name={"IdTipoFecha"} onChange={this._onFilterChange.bind(this, "IdTipoFecha")} value={this.state.specialdate.IdTipoFecha}>
            <option key={0} value={''}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    showDateTypeDesc(IdTipoFecha) {
        return this.showDescription(IdTipoFecha, "IdTipoFecha", "DescTipoFecha", "datetypes");
    }

    renderNew() {
        const specialdate = this.state.specialdate || SpecialDatesStore.defaultSpecialDate;
        return (<div>
            <input type="date" className="form-control" name="Fecha" value={specialdate.Fecha} onChange={this.handleChange.bind(this)} placeholder="Nombre Fecha" required />
            <input type="text" className="form-control" name="DescFecha" value={specialdate.DescFecha} onChange={this.handleChange.bind(this)} placeholder="Descripcion Fecha" required />
            {this.showDateTypes('IdTipoFecha', specialdate.IdTipoFecha)}
        </div>);
    }

    renderListBody(list) {
        return (
            list.map((specialdate, index) =>
                (<tr key={index} onDoubleClick={this.handleUpdate.bind(this, specialdate)}>
                    <td>{specialdate.IdFecha}</td>
                    <td>{this.showDate(specialdate.Fecha)}</td>
                    <td>{specialdate.DescFecha}</td>
                    <td>{specialdate.IdTipoFecha}</td>
                </tr>)));
    }
    showDate(fecha) {
        return fecha.substring(5, 10).split("-").reverse().join("-");
    }
    processSubmit() {
        this.state.specialdate.IdUsuario = Settings.default.key.user;
        switch (this.state.mode) {
            case Mode.Create:
                this.props.create(this.state.specialdate);
                break;
            case Mode.Update:
                this.props.update(this.state.specialdate);
                break;
            case Mode.Delete:
                this.props.delete(this.state.specialdate);
                break;
            default:
                break;
        }
    }
}
export default connect(
    state => state.specialdate, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(SpecialDatesStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(SpecialDateApp);