import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ConfigControlPointStore from '../store/ConfigControlPoint';
import * as QRCode from 'qrcode.react';
import { Mode } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
import * as Utils from '../store/Utils';
import { Table, DropdownButton, Button, FormGroup, Label, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
//import { getContract } from '../store/Login';

/*type ConfigControlPointProps =
    ConfigControlPointStore.unloadedState        // ... state we've requested from the Redux store
    & typeof ConfigControlPointStore.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ id: string }>; // ... plus incoming routing parameters
*/

class ConfigControlPointApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: 'configcontrolpoint',
        listObjetos: 'configcontrolpoints',
        defaultObjeto: ConfigControlPointStore.ConfigControlPoint,
        isLoading: false,
        configcontrolpoint: ConfigControlPointStore.ConfigControlPoint,
        configcontrolpoint_old: ConfigControlPointStore.ConfigControlPoint,
        isModeEdit: false,
        mode: Mode.Read,
        configcontrolpoints: [],
        configcontrolpointjobs: [],
        configcontrolpointnews: [],
        areas: [],
        configcontrolpointtimes: [],
        configgroupnews: [],
        currentPage: 1,
        todosPerPage: 3,
        sortBy: 'id',
        sortDir: null,
        records: [],
        title: 'PUNTOS DE CONTROL',
        subtitle: 'Lista de Puntos de Control',
        addNewTitle: 'Agregar Nuevo Punto de Control',
        editTitle: 'Editar Punto de Control',
        listTitle: 'Lista de Puntos de Control',
        fieldList: {
            IdContrato: this.fieldContract,
            IdPuntoControl: { ...this.defaultField, description: 'IdPuntoControl' },
            IdArea: { ...this.defaultField, description: 'Area', controlType: 'C', listFunction: 'showAreasFilter' },
            UbicacionQR: { ...this.defaultField, description: 'UbicacionQR' },
            DescripcionQR: { ...this.defaultField, description: 'Descripcion' },
            CoordenadasGPS: { ...this.defaultField, description: 'Coordenadas GPS' },
            CodigoQR: { ...this.defaultField, description: 'Codigo QR', },
            LluviaQR: { ...this.defaultField, description: 'Lluvia' },
            Interno: { ...this.defaultField, description: 'Interno' },
            //IdTipoAviso: { errorMessage: "Falta nombre guardia", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configcontrolpoint.IdTipoAviso) },
            //DiasSemanasRonda: { errorMessage: "Falta nombre guardia", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configcontrolpoint.DiasSemanasRonda) },
        },
        modalNews: false,
        modalNewsOk: false,
        getObjetos: "GetAllConfigControlPoints"
    }

    validate = (configcontrolpoint) => {
        return {
            //IdGuardia: 0,
            //DescRonda: { errorMessage: "Falta Descripcion ronda", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configcontrolpoint.DescRonda) },
            UbicacionQR: { isVisible: false, title: 'Ubicacion', errorMessage: "Falta Ubicacion QR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configcontrolpoint.UbicacionQR) },
            DescripcionQR: { isVisible: true, title: 'Descripcion', errorMessage: "Falta Descripcion QR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configcontrolpoint.DescripcionQR) },
            CodigoQR: { isVisible: true, title: 'Codigo QR', errorMessage: "Falta Codigo QR", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configcontrolpoint.CodigoQR) },
            //IdTipoAviso: { errorMessage: "Falta nombre guardia", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configcontrolpoint.IdTipoAviso) },
            //DiasSemanasRonda: { errorMessage: "Falta nombre guardia", isRequired: true, valid: true, isEmpty: Utils.isEmpty(configcontrolpoint.DiasSemanasRonda) },
        };
    };


    downloadQR = () => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "123456.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    /*constructor() {
        super();
    }*/
    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            this.props.getJobs();
            this.props.getNews();
            this.props.getAreas();
            this.props.getGroups();
            //const idContract = getContract();
            this.props.GetAllConfigControlPoints();
            //this.props.GetConfigControlPointsByContract();
            const IdControlPoint = parseInt(this.props.match.params.id, 10) || 0;
            if (IdControlPoint !== 0) {
                //  this.props.(IdControlPoint);
            }
        } catch (reason) {
            console.log('Error in componentWillMount - ConfigControlPointApp:' + reason);
        }

    }
    componentDidMount() {
        //if (this.props.jobs.length === 0) {
        //    console.log("jobs");
        //    this.props.getJobs();
        //}();
        //if (this.props.news.length === 0) {
        //    console.log("news");
        //    this.props.getNews();
        //}
    }

    procesarResponse(nextProps) {
        const IdControlPoint = parseInt(nextProps.match.params.id, 10) || 0;
        if (IdControlPoint !== 0) {
            //  this.props.(IdControlPoint);
        }
        if (nextProps.configcontrolpointjobs !== this.props.configcontrolpointjobs) {
            this.setState({
                configcontrolpointjobs: nextProps.configcontrolpointjobs
            });
        }
        if (nextProps.areas !== this.props.areas) {
            this.setState({
                areas: nextProps.areas
            });
        }
        if (nextProps.configcontrolpointnews !== this.props.configcontrolpointnews) {
            this.setState({
                configcontrolpointnews: nextProps.configcontrolpointnews
            });
        }
        if (nextProps.configgroupnews !== this.props.configgroupnews) {
            this.setState({
                configgroupnews: nextProps.configgroupnews
            });
        }
        if (nextProps.configcontrolpointtimes !== this.props.configcontrolpointtimes) {
            this.setState({
                configcontrolpointtimes: nextProps.configcontrolpointtimes
            });
        }
    }

    handleUpdateFunctions(configcontrolpoint) {
        if (configcontrolpoint.IdContrato > 0) {
            this.props.getGroupsByContract(configcontrolpoint.IdContrato);
        }
        this.props.getConfigControlPointJobs(configcontrolpoint.IdPuntoControl);
        this.props.getConfigControlPointNews(configcontrolpoint.IdPuntoControl);
        this.props.getConfigGroupNews(configcontrolpoint.IdPuntoControl);
    }

    isCheckedGroup(clave) {
        const ids = clave.split('-');
        const IdPuntoControl = parseInt(ids[0], 10);
        const IdNovedad = parseInt(ids[1], 10);
        const IdGrupo = parseInt(ids[2], 10);
        var configgroupnews = this.state.configgroupnews || [];
        const configgroupnew = configgroupnews.filter(x => x.IdPuntoControl === IdPuntoControl && x.IdNovedad === IdNovedad && x.IdGrupo === IdGrupo);
        if (configgroupnew.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    toggleGroups(clave, e) {
        var ids = clave.split('-');
        const IdPuntoControl = parseInt(ids[0], 10);
        const IdNovedad = parseInt(ids[1], 10);
        const IdGrupo = parseInt(ids[2], 10);
        var configgroupnews = this.state.configgroupnews || [];
        const configgroupnew = configgroupnews.filter(x => x.IdPuntoControl === IdPuntoControl && x.IdNovedad === IdNovedad && x.IdGrupo === IdGrupo);

        if (configgroupnew.length > 0) {
            configgroupnews.splice(configgroupnews.indexOf(configgroupnew[0]), 1);
        }
        else {
            const configgroupnew_ = {
                IdPuntoControl,
                IdNovedad,
                IdGrupo,
                RecibirSMS: true,
                RecibirEmail: true,
                RecibirLlamada: true,
                Orden: 1
            };
            configgroupnews.push(configgroupnew_);
        }
        this.setState({
            configgroupnews: configgroupnews
        });
    }

    toggleCheckBox(clave, e) {
        var ids = clave.split('-');
        const IdPuntoControl = parseInt(ids[0], 10);
        const IdNovedad = parseInt(ids[1], 10);
        const IdGrupo = parseInt(ids[2], 10);
        const campo = e.target.name;
        var configgroupnews = this.state.configgroupnews || [];
        const configgroupnew = configgroupnews.filter(x => x.IdPuntoControl === IdPuntoControl && x.IdNovedad === IdNovedad && x.IdGrupo === IdGrupo);

        if (configgroupnew.length > 0) {
            var configgroupnew_ = configgroupnew[0];
            configgroupnew_[campo] = !configgroupnew_[campo];
            configgroupnew.splice(configgroupnew.indexOf(configgroupnew[0]), 1, configgroupnew_);
        }
        else {
            var _configgroupnew = {
                IdPuntoControl: IdPuntoControl,
                IdNovedad: IdNovedad,
                IdGrupo: IdGrupo,
                RecibirSMS: false,
                RecibirEmail: false,
                RecibirLlamada: false,
                Orden: 0
            };
            _configgroupnew[campo] = !_configgroupnew[campo];
            configgroupnews.push(_configgroupnew);
        }
        this.setState({
            configgroupnews: configgroupnews
        });
    }

    toggleOrden(clave, e) {
        const ids = clave.split('-');
        const IdPuntoControl = parseInt(ids[0], 10);
        const IdNovedad = parseInt(ids[1], 10);
        const IdGrupo = parseInt(ids[2], 10);
        const campo = e.target.name;
        const value = e.target.value;
        var configgroupnews = this.state.configgroupnews || [];
        const configgroupnew = configgroupnews.filter(x => x.IdPuntoControl === IdPuntoControl && x.IdNovedad === IdNovedad && x.IdGrupo === IdGrupo);
        if (configgroupnew.length > 0) {
            configgroupnew[0][campo] = value;
        }
        else {
            var configgroupnew_ = {
                IdPuntoControl: IdPuntoControl,
                IdNovedad: IdNovedad,
                IdGrupo: IdGrupo,
                RecibirSMS: true,
                RecibirEmail: true,
                RecibirLlamada: true
            };
            configgroupnew_[campo] = value;
            configgroupnews.push(configgroupnew_);
        }
        this.setState({
            configgroupnews: configgroupnews
        });
    }

    GetValueOrden(clave) {
        const ids = clave.split('-');
        const IdPuntoControl = parseInt(ids[0], 10);
        const IdNovedad = parseInt(ids[1], 10);
        const IdGrupo = parseInt(ids[2], 10);
        var configgroupnews = this.state.configgroupnews || [];
        const configgroupnew = configgroupnews.filter(x => x.IdPuntoControl === IdPuntoControl && x.IdNovedad === IdNovedad && x.IdGrupo === IdGrupo);
        if (configgroupnew.length > 0) {
            return configgroupnew[0].Orden;
        }
        else {
            return 0;
        }
    }

    isCheckedField(clave, campo) {
        const ids = clave.split('-');
        const IdPuntoControl = parseInt(ids[0], 10);
        const IdNovedad = parseInt(ids[1], 10);
        const IdGrupo = parseInt(ids[2], 10);
        var configgroupnews = this.state.configgroupnews || [];
        const configgroupnew = configgroupnews.filter(x => x.IdPuntoControl === IdPuntoControl && x.IdNovedad === IdNovedad && x.IdGrupo === IdGrupo);
        if (configgroupnew.length > 0) {
            return configgroupnew[0][campo];
        }
        else {
            return false;
        }
    }

    showGroups(IdPuntoControl, IdNovedad) {
        const _groups = this.props.groups === null ? [] : this.props.groups !== undefined ? this.props.groups : [];
        const options = _groups.length > 0 ? _groups.map(group => {
            const campo = `${IdPuntoControl}-${IdNovedad}-${group.IdGrupo}`;
            return (
                <tr>
                    <td><input type="checkbox" value={group.IdGrupo} checked={this.isCheckedGroup(campo)} onChange={this.toggleGroups.bind(this, `${IdPuntoControl}-${IdNovedad}-${group.IdGrupo}`)} /></td>
                    <td><label>{group.NombreGrupo} - ({group.AreaCompetencia})</label></td>
                    <td><input type="checkbox" name="RecibirLlamada" value={group.IdGrupo} checked={this.isCheckedField(campo, "RecibirLlamada")} onChange={this.toggleCheckBox.bind(this, campo)} /></td>
                    <td><input type="checkbox" name="RecibirSMS" value={group.IdGrupo} checked={this.isCheckedField(campo, "RecibirSMS")} onChange={this.toggleCheckBox.bind(this, campo)} /></td>
                    <td><input type="checkbox" name="RecibirEmail" value={group.IdGrupo} checked={this.isCheckedField(campo, "RecibirEmail")} onChange={this.toggleCheckBox.bind(this, campo)} /></td>
                    <td><input type="numeric" name="Orden" value={this.GetValueOrden(campo)} onChange={this.toggleOrden.bind(this, campo)} /></td>
                </tr>);
        }) : [];
        return (<div>
            <table>
                <tr>
                    <th> </th>
                    <th>Grupo</th>
                    <th>Permitir Llamar</th>
                    <th>Enviar SMS</th>
                    <th>Enviar Email</th>
                </tr>
                {options}
            </table>
        </div>);
    }

    processSubmit() {
        const configcontrolpointjobs = this.state.configcontrolpointjobs || [];
        const configcontrolpointnews = this.state.configcontrolpointnews || [];
        var jobs = [];
        var photos = [];
        var configcontrolpointnews_ = [];
        configcontrolpointjobs.map(x => {
            jobs.push(x.IdTarea);
            photos.push(x.Foto);
        });
        configcontrolpointnews.map(x => {
            configcontrolpointnews_.push([`${x.IdNovedad}`, `${x.MensajeSMSNovedad}`, `${x.MensajeEmailNovedad}`]);
        });
        const configgroupnews_ = this.state.configgroupnews;
        var configgroupnews = [];
        configgroupnews_.map(x => {
            configgroupnews.push([x.IdNovedad, x.IdGrupo, x.RecibirLlamada ? 1 : 0, x.RecibirSMS ? 1 : 0, x.RecibirEmail ? 1 : 0, x.Orden]);
        });
        switch (this.state.mode) {
            case Mode.Create:
                this.props.create(this.state.configcontrolpoint, configcontrolpointnews_, jobs, photos, configgroupnews);
                break;
            case Mode.Update:
                this.props.update(this.state.configcontrolpoint, configcontrolpointnews_, jobs, photos, configgroupnews);
                break;
            default:
                break;
        }
    }

    renderBody_() {
        return (<div>
            <h3>Tiempo entre Punto</h3>
            <div className="col-md-12">
                <button className="btn bgm-OrangeSeguricel" onClick={this.handleTiempo}>Agregar</button>
            </div>
        </div>);
    }

    handleTiempo = () => {
        this.props.GetTiemposPuntos(this.state.IdContrato);
    }

    getOptionAreas() {
        const _areas = this.props.areas || [];
        const options = _areas.length > 0 ? _areas.map(function (option) {
            return (
                <option key={option.IdArea} value={option.IdArea}>
                    {option.NombreArea}
                </option>
            );
        }) : [];
        return options;
    }

    showAreasFilter() {
        const defaultOption = 'Mostrar todos...';
        return (<select className='form-control input-sm' name="IdArea" onChange={this._onFilterChange.bind(this, "IdArea")} value={this.state.configcontrolpoint.IdArea}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {this.getOptionAreas()}
        </select>);

    }
    showAreas(value_) {
        const defaultOption = 'Seleccione Area...';
        const _areas = this.props.areas || [];
        const options = _areas.length > 0 ? _areas.map(function (option) {
            return (
                <option key={option.IdArea} value={option.IdArea}>
                    {option.NombreArea}
                </option>
            );
        }) : [];
        return (<select className='form-control input-sm' name="IdArea" onChange={this.handleChange.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {this.getOptionAreas()}
        </select>);
    }
    clickedQR(e) {
        var dataURL = document.getElementById('qrcode')/*.toDataURL(); */.toDataURL("image/png").replace("image/png", "aplication/octet-stream");
        window.location.href = /*'data:application/octet-stream;base64,' +*/ dataURL;
        /*var canvas = document.getElementById("canvas");
        canvas.setAttribute('download', 'MintyPaper.png');
        canvas.setAttribute('href', dataURL);
        canvas.click();
        var aLink = document.createElement('a');
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click");
        aLink.download = 'image123.png';
        aLink.href = dataURL;//image;
        aLink.dispatchEvent(evt);*/

    }

    renderNew() {
        const _controlpoint = this.state.configcontrolpoint;
        return (<div className="card-body card-padding">
            {this.showContracts(_controlpoint.IdContrato)}
            <br />
            {this.showAreas(_controlpoint.IdArea)}
            <br />
            {/*<b><p><span>Ubicacion</span></p></b>*/}
            {this.fieldGroup("UbicacionQR", "glyphicon glyphicon-time")}
            {/*<b><p><span>Descripcion</span></p></b>*/}
            {this.fieldGroup("DescripcionQR", "glyphicon glyphicon-time")}
            {/*<b><p><span>Coordenadas GPS</span></p></b>*/}
            {this.fieldGroup("CoordenadasGPS", "glyphicon glyphicon-map-marker")}
            {/*<p><span>QR</span></p>*/}
            {this.fieldGroup("CodigoQR", "glyphicon glyphicon-qrcode")}
            <QRCode id="qrcode" name="qrcode" value={_controlpoint.CodigoQR} onClick={this.clickedQR.bind(this)} />
            <i className="input-helper" />
            <br />
            <FormGroup check inline>
                <Label check>
                    Lluvia  <input type="checkbox" className="form-control" id="LluviaQR" name="LluviaQR" checked={_controlpoint.LluviaQR} onChange={this.toggleField.bind(this)} />
                </Label>
            </FormGroup>
            <br />
            <FormGroup check inline>
                <Label check>
                    Interior / Esterior <input type="checkbox" className="form-control" id="Interior" name="Interior" checked={_controlpoint.Interior} onChange={this.toggleField.bind(this)} />
                </Label>
            </FormGroup>
            <br />
            {this.renderJobs()}
            {this.renderNews(_controlpoint.IdPuntoControl)}
        </div >);
    }

    showDescTarea(configcontrolpointtasks) {
        if (configcontrolpointtasks) {
            const tareas = configcontrolpointtasks.split(',').map(configcontrolpointtask => {
                return this.getTarea(configcontrolpointtask);
            }
            );
            return tareas;
        } else return [];
    }

    showDescNovedad(configcontrolpointnews) {
        if (configcontrolpointnews) {
            const novedades = configcontrolpointnews.split(',').map(configcontrolpointnews_ => {
                return this.getNovedad(configcontrolpointnews_);
            }
            );
            return novedades;
        } else return [];
    }

    getTarea(configcontrolpointtask) {
        if (configcontrolpointtask) {
            const job = this.props.jobs.find(z => z.IdTarea === Number(configcontrolpointtask)) || ConfigControlPointStore.Job;
            return job.DescTarea;
        } else { return ''; }
    }

    getNovedad(configcontrolpointnews_) {
        if (configcontrolpointnews_) {
            const news = this.props.news.find(z => z.IdNovedad === Number(configcontrolpointnews_)) || ConfigControlPointStore.News;
            return news.DescNovedad;
        } else { return ''; }
    }

    renderListBody(configcontrolpoints) {
        this.state.records = this.state.configcontrolpoints;
        return configcontrolpoints.map((_controlpoint, index) =>
            (<tr key={index} onDoubleClick={this.handleUpdate.bind(this, _controlpoint)}>
                <td>
                    {_controlpoint.Contrato}
                </td>
                <td>
                    {_controlpoint.IdPuntoControl}
                </td>
                <td>
                    {_controlpoint.Area}
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
                    <QRCode value={_controlpoint.CodigoQR} />
                </td>
                <td>
                    <input type="checkbox" name="LluviaQR" checked={_controlpoint.LluviaQR} />
                </td>
                <td>
                    <input type="checkbox" name="Interno" checked={_controlpoint.Interno} />
                </td>
                <td>
                    {this.showDescTarea(_controlpoint.ConfigPuntosControlTareas).map(ConfigPuntosControlTarea =>
                        <li>{ConfigPuntosControlTarea}</li>
                    )}
                </td>
                <td>
                    {this.showDescNovedad(_controlpoint.ConfigPuntosControlNovedades).map(ConfigPuntosControlNovedad =>
                        <li>{ConfigPuntosControlNovedad}</li>
                    )}
                </td>
            </tr>));
    }

    renderSearcherTable() {
        const fieldList = Object.keys(this.state.fieldList || []);//["IdContrato", "IdGrupo", "CodigoGrupo", "NombreGrupo"];
        if (fieldList.length > 0) {
            return <tr className="toolTip">{fieldList.map(key =>
                this.state.fieldList[key].isVisible ?
                    ((this.state.fieldList[key].controlType === 'T' ? <th key={key}><input type='text' onChange={this._onFilterChange.bind(this, key)} /></th>
                        : <th key={key}>{this[this.state.fieldList[key].listFunction]()}</th>)) : <th> </th>
            )}</tr>;
        }
    }

    renderList_() {
        const configcontrolpoints = this.state.configcontrolpoints || [];
        if (configcontrolpoints.length === 0) {
            return [];
        }
        return (<div className="col-md-12">
            <div className="card-body card-padding bgm-WhiteSeguricel">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Contrato</th>
                            <th>Area</th>
                            <th>Ubicacion</th>
                            <th>Descripcion</th>
                            <th>Coordenadas GPS</th>
                            <th>QR</th>
                            <th>Lluvia</th>
                            <th>Interno</th>
                            <th>Tareas</th>
                            <th>Novedades</th>
                        </tr>
                    </thead>
                    <tbody>
                        {configcontrolpoints.length === 0 ? [] : configcontrolpoints.map((_controlpoint, index) =>
                            (<tr key={_controlpoint.IdPuntoControl}>
                                <td>
                                    {_controlpoint.IdPuntoControl}
                                </td>
                                <td>
                                    {_controlpoint.Contrato}
                                </td>
                                <td>
                                    {_controlpoint.Area}
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
                                    {/*<QRCode value={_controlpoint.CodigoQR} />*/}
                                </td>
                                <td>
                                    <input type="checkbox" name="LluviaQR" checked={_controlpoint.LluviaQR} />
                                </td>
                                <td>
                                    <input type="checkbox" name="Interno" checked={_controlpoint.Interno} />
                                </td>
                                <td>
                                    {this.showDescTarea(_controlpoint.ConfigPuntosControlTareas).map(ConfigPuntosControlTarea =>
                                        <li>{ConfigPuntosControlTarea}</li>
                                    )}
                                </td>
                                <td>
                                    {this.showDescNovedad(_controlpoint.ConfigPuntosControlNovedades).map(ConfigPuntosControlNovedad =>
                                        <li>{ConfigPuntosControlNovedad}</li>
                                    )}
                                </td>
                                <td>
                                    <div className="col-md-12" style={{ textAlign: 'right' }}>
                                        <button className="btn  bgm-white" onClick={this.handleUpdate.bind(this, _controlpoint)}>Editar</button>
                                        <button className="btn  bgm-white" onClick={this.handleDelete.bind(this, _controlpoint)}>Borrar</button>
                                    </div>
                                </td>
                            </tr>)
                        )}
                    </tbody>
                    <tfoot> TOTAL: {configcontrolpoints.length} </tfoot>
                </table>
                {this.renderControlPointDistances_()}
            </div>
        </div>);
    }
    toggleNews(clave, e) {
        const ids = clave.split('-');
        var IdPuntoControl = parseInt(ids[0], 10);
        var IdNovedad = parseInt(ids[1], 10);
        var configcontrolpointnews = this.state.configcontrolpointnews || [];
        var configcontrolpointnew = configcontrolpointnews.filter(x => x.IdPuntoControl === IdPuntoControl && x.IdNovedad === IdNovedad);
        if (configcontrolpointnew.length === 0) {
            const configcontrolpointnew_ = {
                IdPuntoControl: IdPuntoControl,
                IdNovedad: IdNovedad,
                MensajeEmailNovedad: '',
                MensajeSMSNovedad: ''
            };
            configcontrolpointnews.push(configcontrolpointnew_);
        }
        else {
            //this.state.modalNews = true,
            var r = window.confirm("Desea quitar? Se borrará la información...");
            if (r == true) {
                configcontrolpointnews.splice(configcontrolpointnews.indexOf(configcontrolpointnew[0]), 1);
            }
        }
        this.setState({
            configcontrolpointnews: configcontrolpointnews,
            configcontrolpoint: {
                ...this.state.configcontrolpoint,
                //ConfigPuntosControlNovedades: configcontrolpointnew.select(x => x.IdNovedad).join(',')
            }
        });
    }
    toggleModalNews(e) {
        this.setState({
            modalNews: !this.state.modalNews
        });
    }
    toggleModalNewsOk(e) {
        this.setState({
            modalNews: !this.state.modalNews,
            modalNewsOk: true
        });
    }
    showModalNews() {
        //<Button color="danger" onClick={this.toggleModal.bind(this)}>{"buttonLabel"}</Button> * /}
        return (
            <Modal isOpen={this.state.modalNews} toggle={this.toggleModalNews.bind(this)} className={"className"}>
                <ModalHeader toggle={this.toggleModalNews.bind(this)}>Vigitablet</ModalHeader>
                <ModalBody>
                    {this.state.messageModalNews}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggleModalNewsOk.bind(this)}>Aceptar</Button>{' '}
                    <Button color="secondary" onClick={this.toggleModalNews.bind(this)}>Cancelar</Button>
                </ModalFooter>
            </Modal>);
    }
    inicializarDistancias(IdContrato) {
        let i = 0;
        let j = 0;
        let arr = [];
        if (!this.state.configcontrolpointtimes || this.state.configcontrolpointtimes.length === 0) {
            const configcontrolpoints_ = this.state.configcontrolpoints || [];
            const configcontrolpoints = configcontrolpoints_.filter(x => x.IdContrato === IdContrato);
            for (i = 0; i < configcontrolpoints.length; i++) {
                for (j = i + 1; j < configcontrolpoints.length; j++) {
                    arr.push({
                        PuntoA: configcontrolpoints[i].IdPuntoControl,
                        PuntoB: configcontrolpoints[j].IdPuntoControl,
                        TiempoMaximo: 0,
                        TiempoMinimo: 0,
                    });
                }
            }
            this.state.configcontrolpointtimes = arr;
        }
    }
    renderControlPointDistances_() {
        return (<div className="col-md-12">
            <div className="card-body card-padding bgm-WhiteSeguricel">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Punto A</th>
                            <th>Punto B</th>
                            <th>Tiempo Minimo</th>
                            <th>Tiempo Maximo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.configcontrolpointtimes.map((puntoAB, index) => (<tr>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {puntoAB.PuntoA}
                            </td>
                            <td>
                                {puntoAB.PuntoB}
                            </td>
                            <td>
                                <input type="text" className="form-control" name={`${puntoAB.PuntoA}:${puntoAB.PuntoB}:Minimo`} value={this.state.configcontrolpointtimes.filter(x => x.PuntoA === puntoAB.PuntoA && x.PuntoB === puntoAB.PuntoB)[0].TiempoMinimo} onChange={this.changeTiempoMínimo.bind(this, puntoAB)} />
                            </td>
                            <td>
                                <input type="text" className="form-control" name={`${puntoAB.PuntoA}:${puntoAB.PuntoB}:Maximo`} value={this.state.configcontrolpointtimes.filter(x => x.PuntoA === puntoAB.PuntoA && x.PuntoB === puntoAB.PuntoB)[0].TiempoMaximo} onChange={this.changeTiempoMaximo.bind(this, puntoAB)} />
                            </td>
                        </tr>)
                        )}
                    </tbody>
                </table>
                <div><button className="btn bgm-OrangeSeguricel" onClick={this.saveConfigControlPointTimes.bind(this)} >GuardarTiempos</button></div>
            </div>
        </div>);
    }
    saveConfigControlPointTimes = event => {
        const value = event.target.value;
        let arPuntosA = [];
        let arPuntosB = [];
        let arMaximos = [];
        let arMinimos = [];
        const configcontrolpointtimes = this.state.configcontrolpointtimes || [];
        configcontrolpointtimes.map(configcontrolpointtime => {
            arPuntosA.push(configcontrolpointtime.PuntoA);
            arPuntosB.push(configcontrolpointtime.PuntoB);
            arMaximos.push(configcontrolpointtime.TiempoMaximo);
            arMinimos.push(configcontrolpointtime.TiempoMinimo);
        });
        const configcontrolpointtime = {
            IdContrato: this.state.IdContrato,
            arPuntosA: arPuntosA.join(','),
            arPuntosB: arPuntosB.join(','),
            arMaximos: arMaximos.join(','),
            arMinimos: arMinimos.join(','),
        };
        if (configcontrolpointtimes) {
            this.props.updateConfigControlPointTimes(configcontrolpointtime);
        }
    }

    changeTiempoMaximo(PuntoAB, e) {
        const value = parseFloat(e.target.value);

        let configcontrolpointtimes = this.state.configcontrolpointtimes;
        let configcontrolpointtimes_ = configcontrolpointtimes.filter(x => x.PuntoA === PuntoAB.PuntoA && x.PuntoB === PuntoAB.PuntoB);
        const configcontrolpointtime = configcontrolpointtimes_[0];
        const configcontrolpointtimes_old = configcontrolpointtimes_[0];
        const configcontrolpointtimes_new = {
            PuntoA: configcontrolpointtime.PuntoA,
            PuntoB: configcontrolpointtime.PuntoB,
            TiempoMaximo: value,
            TiempoMinimo: configcontrolpointtime.TiempoMinimo
        };
        configcontrolpointtimes.splice(configcontrolpointtimes.indexOf(configcontrolpointtimes_old), 1, configcontrolpointtimes_new);
        this.setState({
            configcontrolpointtimes: configcontrolpointtimes
        });
    }

    changeTiempoMínimo(PuntoAB, e) {
        const value = parseFloat(e.target.value);
        let configcontrolpointtimes = this.state.configcontrolpointtimes;
        let configcontrolpointtimes_ = configcontrolpointtimes.filter(x => x.PuntoA === PuntoAB.PuntoA && x.PuntoB === PuntoAB.PuntoB);
        const configcontrolpointtime = configcontrolpointtimes_[0];
        const configcontrolpointtimes_new = {
            PuntoA: configcontrolpointtime.PuntoA,
            PuntoB: configcontrolpointtime.PuntoB,
            TiempoMaximo: configcontrolpointtime.TiempoMaximo,
            TiempoMinimo: value
        };
        configcontrolpointtimes.splice(configcontrolpointtimes.indexOf(configcontrolpointtime), 1, configcontrolpointtimes_new);
        this.setState({
            configcontrolpointtimes: configcontrolpointtimes
        });
    }


    renderControlPointDistances() {
        const configcontrolpointtimes = this.state.configcontrolpointtimes || [];
        if (configcontrolpointtimes.length === 0) {
            return [];
        }

        return (<div className="col-md-12">
            <div className="card-body card-padding bgm-WhiteSeguricel">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Punto A</th>
                            <th>Punto B</th>
                            <th>Tiempo Maximo</th>
                            <th>Tiempo Minimo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {configcontrolpointtimes.length === 0 ? [] : configcontrolpointtimes.map((_controlpoint, index) =>
                            (<tr>
                                <td>
                                    {_controlpoint.PuntoA}
                                </td>
                                <td>
                                    {_controlpoint.PuntoB}
                                </td>
                                <td>
                                    {_controlpoint.TiempoMaximo}
                                </td>

                                <td>
                                    {_controlpoint.TiempoMinimo}
                                </td>
                            </tr>)
                        )}
                    </tbody>
                    <tfoot> TOTAL: {configcontrolpointtimes.length} </tfoot>
                </table>
            </div>
        </div>);
    }
    toggleJobs(e) {
        const IdTarea = parseInt(e.target.value, 10);
        const job = this.getJob(IdTarea) || [];
        const configcontrolpointjobs = this.state.configcontrolpointjobs || [];
        if (job.length > 0) {
            configcontrolpointjobs.splice(configcontrolpointjobs.indexOf(job[0]), 1);
        }
        else {
            const configcontrolpointjob =
            {
                IdTarea: IdTarea,
                Foto: false
            };
            configcontrolpointjobs.push(configcontrolpointjob);
        }
        this.setState({
            configcontrolpointjobs: configcontrolpointjobs,
            configcontrolpoint: {
                ...this.state.configcontrolpoint,
                //ConfigPuntosControlTareas: configcontrolpointjobs.join(',')
            }
        });
    }


    toggleJobsPhoto(e) {
        const configcontrolpointjobs = this.state.configcontrolpointjobs || [];
        const IdTarea = parseInt(e.target.value, 10);
        const job = this.getJob(IdTarea) || [];
        if (job.length > 0) {
            //const job_ = job[0];
            const job_new =
            {
                IdTarea: IdTarea,
                Foto: !job[0].Foto
            };
            configcontrolpointjobs.splice(configcontrolpointjobs.indexOf(job[0]), 1, job_new);
        }
        else {
            const configcontrolpointjob =
            {
                IdTarea: IdTarea,
                Foto: true
            };
            configcontrolpointjobs.push(configcontrolpointjob);
        }
        this.setState({
            configcontrolpointjobs: configcontrolpointjobs,
            configcontrolpoint: {
                ...this.state.configcontrolpoint,
                //ConfigPuntosControlTareas: configcontrolpointjobs.join(',')
            }
        });
    }

    renderJobs() {
        const _jobs = this.props.jobs || [];
        return (
            <Card>
                <CardHeader className="container-fluid bg-dark text-white">
                    <h2>Tareas</h2>
                    <button className="btn btn-primary btn-sm" onClick={this.handleAdd.bind(this, 'Job')}>Agregar</button>
                </CardHeader>
                <CardBody className="container-fluid bg-dark text-white">
                    {_jobs.map(job =>
                        (<div>
                            <input type="checkbox" checked={this.isCheckedJobEvent(job.IdTarea)} value={job.IdTarea} onChange={this.toggleJobs.bind(this)} />
                            {job.DescTarea}
                            <input type="checkbox" checked={this.isCheckedPhotoEvent(job.IdTarea)} value={job.IdTarea} onChange={this.toggleJobsPhoto.bind(this)} />Foto
                        </div>)
                    )}
                </CardBody>
            </Card>);
    }

    isCheckedJobEvent(IdTarea) {
        const job = this.getJob(IdTarea) || [];
        if (job.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    isCheckedPhotoEvent(IdTarea) {
        const job = this.getJob(IdTarea) || [];
        if (job.length > 0) {
            return job[0].Foto;
        }
        else {
            return false;
        }
    }

    getJob(IdTarea) {
        const configcontrolpointjobs = this.state.configcontrolpointjobs || [];
        const configcontrolpointjob = configcontrolpointjobs.filter(x => x.IdTarea === parseInt(IdTarea, 10));
        if (configcontrolpointjob.length > 0) {
            return configcontrolpointjob;
        }
        else {
            return [];
        }
    }

    handleAdd(entity) {
        this.props.history.push(`/configgeneral/${entity}`);
    }

    existsConfigControlPointNew(IdPuntoControl, IdNovedad) {
        var configcontrolpointnews = this.state.configcontrolpointnews || [];
        var configcontrolpointnew = configcontrolpointnews.filter(x => x.IdPuntoControl === parseInt(IdPuntoControl, 10) && x.IdNovedad === parseInt(IdNovedad, 10));
        return configcontrolpointnew.length > 0;
    }


    toggleNewsSMS = (clave, e) => {
        const sms = e.target.value;
        const ids = clave.split('-');
        var IdPuntoControl = parseInt(ids[0], 10);
        var IdNovedad = parseInt(ids[1], 10);
        var configcontrolpointnews = this.state.configcontrolpointnews;
        var configcontrolpointnew = configcontrolpointnews.filter(x => x.IdPuntoControl === IdPuntoControl && x.IdNovedad === IdNovedad);
        if (configcontrolpointnew.length > 0) {
            const configcontrolpointnew_new = {
                IdPuntoControl: configcontrolpointnew[0].IdPuntoControl,
                IdNovedad: configcontrolpointnew[0].IdNovedad,
                MensajeEmailNovedad: configcontrolpointnew[0].MensajeEmailNovedad,
                MensajeSMSNovedad: sms
            };
            configcontrolpointnews.splice(configcontrolpointnews.indexOf(configcontrolpointnew[0]), 1, configcontrolpointnew_new);
        }
        else {
            const configcontrolpointnew_new = {
                IdPuntoControl: IdPuntoControl,
                IdNovedad: IdNovedad,
                MensajeEmailNovedad: '',
                MensajeSMSNovedad: sms
            };
            configcontrolpointnews.push(configcontrolpointnew_new);
        }
        this.setState({
            configcontrolpointnews: configcontrolpointnews
        });
    }


    GetValueConfigNews(clave, campo) {
        const ids = clave.split('-');
        var IdPuntoControl = parseInt(ids[0], 10);
        var IdNovedad = parseInt(ids[1], 10);
        var configcontrolpointnews = this.state.configcontrolpointnews;
        var configcontrolpointnew = configcontrolpointnews.filter(x => x.IdPuntoControl === IdPuntoControl && x.IdNovedad === IdNovedad);
        if (configcontrolpointnew.length > 0) {
            return configcontrolpointnew[0][campo];
        }
        else {
            return '';
        }

    }
    toggleNewsEmail = (clave, e) => {
        const email = e.target.value;
        const ids = clave.split('-');
        var IdPuntoControl = parseInt(ids[0], 10);
        var IdNovedad = parseInt(ids[1], 10);
        var configcontrolpointnews = this.state.configcontrolpointnews;
        var configcontrolpointnew = configcontrolpointnews.filter(x => x.IdPuntoControl === IdPuntoControl && x.IdNovedad === IdNovedad);
        if (configcontrolpointnew.length > 0) {
            const configcontrolpointnew_new = {
                IdPuntoControl: configcontrolpointnew[0].IdPuntoControl,
                IdNovedad: configcontrolpointnew[0].IdNovedad,
                MensajeEmailNovedad: email,
                MensajeSMSNovedad: configcontrolpointnew[0].MensajeSMSNovedad
            };
            configcontrolpointnews.splice(configcontrolpointnews.indexOf(configcontrolpointnew[0]), 1, configcontrolpointnew_new);
        }
        else {
            const configcontrolpointnew_new = {
                IdPuntoControl: IdPuntoControl,
                IdNovedad: IdNovedad,
                MensajeEmailNovedad: '',
                MensajeSMSNovedad: email
            };
            configcontrolpointnews.push(configcontrolpointnew_new);
        }
        this.setState({
            configcontrolpointnews: configcontrolpointnews
        });
    }

    renderNews(IdPuntoControl) {
        const _news = this.props.news || [];
        return (
            <Card>
                <CardHeader className="container-fluid bg-dark text-white">
                    <h2>Novedades</h2>
                    <button className="btn btn-primary btn-sm" onClick={this.handleAdd.bind(this, 'News')}>Agregar</button>
                </CardHeader>
                <CardBody className="container-fluid bg-dark text-white">
                    {_news.map(news =>
                        (<div>
                            <input type="checkbox" checked={this.existsConfigControlPointNew(IdPuntoControl, news.IdNovedad)} value={news.IdNovedad} onChange={this.toggleNews.bind(this, `${IdPuntoControl}-${news.IdNovedad}`)} />
                            {this.showModalNews()}
                            <div className="lgi-heading">{news.DescNovedad}</div>
                            <div className="lgi-heading" hidden={!this.existsConfigControlPointNew(IdPuntoControl, news.IdNovedad)}>
                                <input type="text" className="form-control" name="MensajeSMSNovedad" placeholder="Mensaje SMS" value={this.GetValueConfigNews(`${IdPuntoControl}-${news.IdNovedad}`, 'MensajeSMSNovedad')} onChange={this.toggleNewsSMS.bind(this, `${IdPuntoControl}-${news.IdNovedad}`)} />
                                <input type="text" className="form-control" name="MensajeEmailNovedad" placeholder="Mensaje Email" value={this.GetValueConfigNews(`${IdPuntoControl}-${news.IdNovedad}`, 'MensajeEmailNovedad')} onChange={this.toggleNewsEmail.bind(this, `${IdPuntoControl}-${news.IdNovedad}`)} />
                            </div>
                            {this.existsConfigControlPointNew(IdPuntoControl, news.IdNovedad) && this.showGroups(IdPuntoControl, news.IdNovedad)}
                        </div>
                        )
                    )}
                </CardBody>
            </Card>);
    }
    initializeRecords() {
        this.state.records = this.state.configcontrolpoints;
    }

    getListByContract(idContrato) {
        this.props.GetConfigControlPointsByContract(idContrato);
        this.props.GetTiemposPuntos(idContrato);
        this.inicializarDistancias(idContrato);
    }
}

export default connect(
    state => state.configcontrolpoint,
    dispatch => bindActionCreators(ConfigControlPointStore.actionCreators, dispatch)
)(ConfigControlPointApp);