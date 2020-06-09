import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ConfigGeneralStore from '../store/ConfigGeneral';
import { Mode, defaultResponse } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
// At runtime, Redux will merge together...
/*type ConfigGeneralProps =
    ConfigGeneralStore.ConfigGeneralState        // ... state we've requested from the Redux store
    & typeof ConfigGeneralStore.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ entity: string }>; // ... plus incoming routing parameters
*/
class ConfigGeneralApp extends BaseApp {
    state = {
        ...this.defaultState,
        configgeneral: ConfigGeneralStore.defaultConfigGeneral,
        configgeneral_old: ConfigGeneralStore.defaultConfigGeneral,
        configgenerals: [],
        path: '',
        entity: '',
        response: defaultResponse,
        IdContrato: 0,
        subtitle: '',
        listTH: {
            //IdContrato: "Id Contrato",
            //Desc: "Descripcion",
        },
    };
    validate = configgeneral => {

        // true means invalid, so our conditions got reversed
        return {
            IdContrato: { errorMessage: "Falta Contrato", isRequired: true, valid: true, isEmpty: false/*isEmpty(configgeneral.IdContrato)*/ },
        };
    }
    /*constructor() {
        super();
    }*/
    componentWillMount() {
        // This method runs when the component is first added to the page
        super.componentWillMount();
        let path = this.props.match.params.entity || '';
        this.props.requestConfigGeneral(path);
        //this.props.requestConfigGeneral(startDateIndex);
    }

    procesarResponse(nextProps) {
        const path = nextProps.match.params.entity || '';
        this.props.requestConfigGeneral(path);
        if (this.props.configgenerals !== nextProps.configgenerals) {
            const _entity = this.setEntity(path)
            this.setState({
                configgenerals: nextProps.configgenerals,
                filteredDataList: nextProps.configgenerals,
                entity: _entity,
                fieldList: {
                     [`Desc${_entity}`]: { ...this.defaultField, description: `Descripcion ${_entity}` }
                },
            });
        }
        if (this.props.path !== nextProps.path) {
            const _entity = this.setEntity(nextProps.path || '');
            this.setState({
                path: nextProps.path,
                entity: _entity,
                fieldList: {
                    [`Desc${_entity}`]: { ...this.defaultField, description: `Descripcion ${_entity}` }
                },
            });
        }
        if (this.props.configgeneral !== nextProps.configgeneral) {
            const configgenerals = this.state.configgenerals;
            switch (this.state.mode) {
                case Mode.Create:
                    configgenerals.push(nextProps.configgeneral);
                    break;
                case Mode.Update:
                    configgenerals.splice(configgenerals.indexOf(this.state.configgeneral_old), 1, nextProps.configgeneral);
                    break;
                case Mode.Delete:
                    configgenerals.splice(configgenerals.indexOf(this.state.configgeneral_old), 1);
                    break;
                default:
                    break;
            }

            this.setState({
                configgenerals: configgenerals,
                filteredDataList: configgenerals,
                mode: Mode.Read
            });
        }
        if (this.props.response !== nextProps.response) {
            this.setState({
                response: nextProps.response,
                mode: Mode.Read
            });
        }
    }
    //this.props.requestConfigGeneral(startDateIndex);

    componentWillUnmount() {
        //this.props.setPath('');

    }
    setEntity(path) {
        switch (path) {
            case 'Job':
            case 'job':
                return 'Tarea';
            case 'News':
            case 'news':
                return 'Novedad';
            case 'JobTitle':
                return 'Cargo';
            case 'RelationshipType':
                return 'Parentesco';
            default:
                return '';
        }
    }

    handleChangeGeneral(event) {
        event.preventDefault();
        const entity = this.state.entity;
        this.setState({
            configgeneral: {
                ...this.state.configgeneral,
                [`Desc${entity}`]: event.currentTarget.value
            }
        });
    }
    processSubmit() {
        const entity = this.state.entity;
        const path = this.state.path;
        switch (this.state.mode) {
            case Mode.Create:
                this.props.create(this.state.configgeneral, entity, path);
                break;
            case Mode.Update:
                this.props.update(this.state.configgeneral, entity, path);
                break;
            case Mode.Delete:
                this.props.delete(this.state.configgeneral, entity, path);
                break;
            default:
                break;
        }

    }
    showList() {

    }
    handleNew(e) {
        const entity = this.state.entity;
        const id = `Id${entity}`;
        const desc = `Desc${entity}`;
        this.setState({
            configgeneral: {
                [id]: 0,
                [desc]: ''
            },
            mode: Mode.Create,
            response: defaultResponse,
            addNewTitle: this.state.addNewTitle
        });
    }
    handleUpdate(configgeneral) {
        this.setState({
            configgeneral: configgeneral,
            configgeneral_old: configgeneral,
            mode: Mode.Update,
            response: defaultResponse
        });
    }
    handleDelete(/*configgeneral: ConfigGeneralStore.ConfigGeneral*/) {
        const entity = this.state.entity;
        const path = this.state.path;
        const configgeneral = this.state.configgeneral;
        this.setState({
            //configgeneral_old: configgeneral,
            response: defaultResponse,
            mode: Mode.Delete
        });
        this.props.delete(configgeneral, entity, path);
    }

    renderNew() {
        const entity = this.state.entity;
        let _configgeneral = this.state.configgeneral;
        return <div>
            <input type="text" name="Desc" value={_configgeneral[`Desc${entity}`]} onChange={this.handleChangeGeneral.bind(this)} />
        </div>
    }

    renderListBody(_configgenerals) {
        const entity = this.state.entity;
        const path = this.state.path;
        this.state.records = this.state.configgenerals || [];
        return _configgenerals.map((__configgeneral, index) =>
            (<tr key={index} onDoubleClick={this.handleUpdate.bind(this, __configgeneral)}>
                <td>{__configgeneral[`Desc${entity}`]}</td>
            </tr>)
        );
    }

}

export default connect(
    state => state.configgeneral, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(ConfigGeneralStore.actionCreators, dispatch)// Selects which action creators are merged into the component's props
)(ConfigGeneralApp);
