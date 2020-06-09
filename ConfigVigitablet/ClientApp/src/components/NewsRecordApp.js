import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NewsRecordStore from '../store/NewsRecord';
import { Mode } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
/*
type NewsRecordProps =
    NewsRecordStore.NewsRecordState
    & typeof NewsRecordStore.actionCreators
    & RouteComponentProps<{}>;
    */
class NewsRecordApp extends BaseApp {
    state = {
        ...this.defaultState,
        objeto: "newsrecord",
        listObjetos: "newsrecords",
        defaultObjeto: NewsRecordStore.defaultNewsRecord,
        newsrecords: [],
        newsrecord: NewsRecordStore.defaultNewsRecord,
        newsrecord_old: NewsRecordStore.defaultNewsRecord,
        mode: Mode.Read,
        currentPage: 1,
        todosPerPage: 3,
        sortBy: 'id',
        sortDir: null,
        filteredDataList: [],
        isVisibleAddButton: false
    }

   /* validate = RegistroNewses => {
        return {
            IdContrato: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: isEmpty(RegistroNewses.IdContrato) },
            IdRonda: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: isEmpty(NewsRecord.IdContrato) },
            FechaRonda: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: isEmpty(NewsRecord.IdContrato) },
            ImagenLLuviaQR: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: isEmpty(NewsRecord.IdContrato) },
            IdPuntoControl: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: isEmpty(NewsRecord.IdContrato) },
            OrdenRondas: { errorMessage: "Falta nombre primer contacto", isRequired: true, valid: true, isEmpty: isEmpty(NewsRecord.IdContrato) },

       };

    }*/
    /*constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }*/
    componentWillMount() {
        try {
            super.componentWillMount();
            const searchVigitabletNews = {
                IdRonda: undefined,
                IdPuntoControl: undefined,
                IdNovedad: undefined,
                IdPersonaVig: undefined,
                FromNewsDate: undefined,
                ToNewsDate: undefined
            };
            this.props.getNewsRecords(searchVigitabletNews);
        } catch (reason) {
            console.log('Error in componentWillMount - NewsRecordApp:' + reason);
        }
    }

    procesarResponse(nextProps) {
        let newsrecords = nextProps.newsrecords;

        this.setState({
            mode: Mode.Read,
            filteredDataList: newsrecords
        });

        if (nextProps.newsrecord !== this.props.newsrecord) {
            //  let newsrecords = this.props.newsrecords;
            var number_of_elements_to_remove = 1;
            switch (this.state.mode) {
                case Mode.Create:
                    newsrecords.push(nextProps.newsrecord);
                    break;
                case Mode.Update:
                    newsrecords.splice(newsrecords.indexOf(this.state.newsrecord_old), number_of_elements_to_remove, nextProps.newsrecord);
                    break;
                case 3:
                    newsrecords.splice(newsrecords.indexOf(this.state.newsrecord_old), number_of_elements_to_remove);
                    break;
                default:
                    break;
            }
            this.setState({
                mode: Mode.Read,
                filteredDataList: newsrecords
            });
        }
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    handleNew = () => {
        this.setState({
            newsrecord: NewsRecordStore.defaultNewsRecord,
            mode: Mode.Create
        });
    }
    handleUpdate(newsrecord) {
        this.setState({
            mode: Mode.Update,
            newsrecord: newsrecord,
            newsrecord_old: newsrecord
        });
    }
    handleChange = event => {
        event.preventDefault();
        this.setState(
            {
                newsrecord: {
                    ...this.state.newsrecord,
                    [event.currentTarget.name]: event.currentTarget.value
                }
            }
        );
    }
    handleSubmit = () => {
        if (this.canBeSubmitted()) {
            switch (this.state.mode) {
                case Mode.Create:
                    this.props.create(this.state.newsrecord);
                    break;
                case Mode.Update:
                    this.props.update(this.state.newsrecord);
                    break;
                default:
                    break;
            }
        }
    }
    handleDelete = newsrecord => {
        this.setState({
            mode: 3,
            newsrecord: newsrecord,
            newsrecord_old: newsrecord
        });
        this.props.delete(newsrecord);
    }
    handleQuit() {
        this.props.history.goBack();
    }
    handleList() {
        this.setState({
            mode: Mode.Read,
            newsrecord: NewsRecordStore.defaultNewsRecord
        });
    }
    canBeSubmitted() {
        const errors = NewsRecordStore.validate(this.state.newsrecord);
        const isDisabled = Object.keys(errors).some(x => errors[x].isEmpty);
        return !isDisabled;
    }

    renderBody() {
        const todos = this.state.filteredDataList || [];
        const { currentPage, todosPerPage } = this.state;

        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        //const renderTodos = currentTodos.map((todo, index) => {
        //    return <li key={index}>{todo.Contrato}</li>;
        //});
        const renderTodos = this.renderNewsTable(currentTodos);
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number.toString()}
                    onClick={this.handleClick.bind(this)}
                >
                    {number}
                </li>
            );
        });

        return (<section id="main">
            <section id="content">
                <div className="container">
                    <div className="block-header">
                        <div className="row">
                            <h2>Registro de Novedades</h2>
                            <div>
                                <ul>
                                    {renderTodos}
                                </ul>
                                <ul id="page-numbers">
                                    {renderPageNumbers}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </section >);
    }

    renderBody_() {
        return (< section id="main" >
            <section id="content">
                <div className="container">
                    <div className="block-header">
                        <div className="row">
                            <h2>Registro de Rondas</h2>
                            <div className="col-md-9" style={{ textAlign: 'right' }}>
                                <button className="btn  bgm-info" /*width="120px" height="50px"*/ onClick={this.handleQuit.bind(this)}>Salir</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn bgm-info" /*width="120px" height="50px"*/ onClick={this.handleSubmit.bind(this)}>Guardar</button>
                            </div>
                        </div>
                    </div>
                    <div className="card bgm-GraySeguricel">
                        <div className="card-header bgm-BlueSeguricel">
                            <h2>Alarmas</h2>
                        </div>
                        <div className="card-body card-padding">
                            <div className="row">
                                <div className="col-md-12" style={{ textAlign: 'right' }}>
                                    <button className="btn  bgm-white" onClick={this.handleList.bind(this)}>Volver</button>
                                    <button className="btn  bgm-white" onClick={this.handleNew.bind(this)}>Agregar</button>
                                </div>
                            </div>
                            <br />
                            {this.state.mode !== Mode.Read ? this.renderEdit() : this.renderList()}
                        </div>
                    </div>
                </div>
            </section >
        </section >);

    }
    _onFilterChange(cellDataKey, event) {
        if (!event.target.value) {
            this.setState({
                filteredDataList: this.props.newsrecords,
            });
        }
        var filterBy = event.target.value.toString().toLowerCase();
        var size = this.props.newsrecords.length;
        var filteredList = [];
        for (var index = 0; index < size; index++) {
            var v = this.props.newsrecords[index][cellDataKey];
            if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
                filteredList.push(this.props.newsrecords[index]);
            }
        }
        this.setState({
            filteredDataList: filteredList
        });
    }
    _sortRowsBy(cellDataKey) {
        var sortDir = this.state.sortDir || '';
        var sortBy = cellDataKey;
        if (sortBy === this.state.sortBy) {
            sortDir = this.state.sortDir === 'ASC' ? 'DESC' : 'ASC';
        } else {
            sortDir = 'DESC';
        }
        const filteredDataList_ = this.state.filteredDataList || [];
        var rows = filteredDataList_.slice();
        rows.sort((a, b) => {
            var sortVal = 0;
            if (a[sortBy] > b[sortBy]) {
                sortVal = 1;
            }
            if (a[sortBy] < b[sortBy]) {
                sortVal = -1;
            }

            if (sortDir === 'DESC') {
                sortVal = sortVal * -1;
            }
            return sortVal;
        });

        this.setState({ sortBy, sortDir, filteredDataList: rows });
    }

    showImage(imagen) {
        return <img src={`data:image/jpeg;base64,${imagen}`} width="150px" height="150px"/>;
    }
    renderNewsTable(newsrecords) {
        var sortDirArrow = '';
        if (this.state.sortDir !== null) {
            sortDirArrow = this.state.sortDir === 'DESC' ? ' ↓' : ' ↑';
        }
        return (<table className='table'>
            <thead>
                <tr>
                    <th onClick={this._sortRowsBy.bind(this, "Contrato")}>Contrato</th>
                    <th onClick={this._sortRowsBy.bind(this, "FechaNovedad")}>{'Fecha Novedad' + (this.state.sortBy === 'FechaNovedad' ? sortDirArrow : '')} </th>
                    <th onClick={this._sortRowsBy.bind(this, "PrimerApellido")}>Primer Apellido</th>
                    <th onClick={this._sortRowsBy.bind(this, "PrimerNombre")}>Primer Nombre</th>
                    <th onClick={this._sortRowsBy.bind(this, "TipoNovedad")}>Tipo Novedad</th>
                    <th>Nombre Imagen Novedad</th>
                </tr>
                <tr>
                    <th><input type="text" onChange={this._onFilterChange.bind(this, "Contrato")} /></th>
                    <th><input type="text" onChange={this._onFilterChange.bind(this, "FechaNovedad")} /></th>
                    <th><input type="text" onChange={this._onFilterChange.bind(this, "PrimerApellido")} /></th>
                    <th><input type="text" onChange={this._onFilterChange.bind(this, "PrimerNombre")} /></th>
                    <th><input type="text" onChange={this._onFilterChange.bind(this, "TipoNovedad")} /></th>
                    <th/>
                </tr>
            </thead>
            <tbody>
                {newsrecords.map((newsrecord, index) =>
                    (<tr key={index}>
                        <td>{newsrecord.Contrato}</td>
                        <td>{newsrecord.FechaNovedad}</td>
                        <td>{newsrecord.PrimerApellido}</td>
                        <td>{newsrecord.PrimerNombre}</td>
                        <td>{newsrecord.TipoNovedad}</td>
                        <td>{newsrecord.NombreImagenNovedad}</td>
                        <td>{this.showImage(newsrecord.imagen)}</td>
                    </tr>)
                )}
            </tbody>
        </table>);
    }
    renderEdit() {
        let _newsrecord = this.state.newsrecord;
        return this.renderNew(_newsrecord);
    }
    renderNew(_newsrecord) {
        return (<div className="col-md-12">
            <div className="row">
                <div className="col-md-1">
                    <div className="row">
                        <div className="col-xs-12">
                            <b><p><span>Contrato</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="text" className="form-control" name="Contrato" onChange={this.handleChange.bind(this)} value={_newsrecord.Contrato} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Fecha Novedad</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="time" className="form-control" name="FechaNovedad" onChange={this.handleChange.bind(this)} value={_newsrecord.FechaNovedad} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Imagen QR</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="time" className="form-control" name="PrimerApellido" onChange={this.handleChange.bind(this)} value={_newsrecord.PrimerApellido} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Eventos</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="number" className="form-control" name="PrimerNombre" onChange={this.handleChange.bind(this)} value={_newsrecord.PrimerNombre} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Notificacion</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="text" className="form-control" name="NotifificacionAR" onChange={this.handleChange.bind(this)} value={_newsrecord.NotifificacionAR} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Destinatario</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="time" className="form-control" name="EnvioAR" onChange={this.handleChange.bind(this)} value={_newsrecord.} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>*/}
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Envio</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="time" className="form-control" name="EnvioAR" onChange={this.handleChange.bind(this)} value={_newsrecord.EnvioAR} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <b><p><span>Contenido del Mensaje</span></p></b>
                        </div>
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="fg-line">
                                    <input type="text" className="form-control" name="MensajeAR" onChange={this.handleChange.bind(this)} value={_newsrecord.MensajeAR} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }

    renderList() {
        const _newsrecords = this.props.newsrecords || [];
        return (<div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="card-body card-padding bgm-WhiteSeguricel">
                            {_newsrecords.map !== undefined ? _newsrecords.map(_newsrecord =>
                                <div> <div className="row">
                                    {this.renderNew(_newsrecord)}
                                </div>
                                    <div className="row">
                                        <div className="col-md-12" style={{ textAlign: 'right' }}>
                                            <button className="btn  bgm-white" onClick={
                                                this.handleUpdate.bind(this, _newsrecord)
                                            }>Editar</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button className="btn  bgm-white" onClick={this.handleDelete.bind(this, _newsrecord)}>Borrar</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </div>
                                    </div>
                                </div>
                            ) : []}
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </div>);
    }
}

// Wire up the React component to the Redux store
export default connect(
    state => state.newsrecord, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(NewsRecordStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(NewsRecordApp);