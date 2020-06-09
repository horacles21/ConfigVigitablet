import React, { Component } from 'react';
import { PageLoader } from '../components/PageLoader';
import { Mode, SetWeekDays, defaultListDays, defaultResponse } from '../store/Utils';
import { Table, DropdownButton, Button, Overlay, Alert } from 'reactstrap';
/*import './pagination.css';
import './toolTip.css';*/
import './error.css';
import * as Settings from '../store/MyConfig';
import { onlyNumbers } from '../store/Utils';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink, Spinner, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Tooltip } from 'reactstrap';

export class BaseApp extends Component {
    state = {
        ...this.defaultState,
        weekdays: defaultListDays,
        processResponse: false,
        tooltipOpen: false
    }

    componentWillMount() {
        try {
            this.props.getSession();
            this.props.getContracts();
        } catch (reason) {
            console.log('Error in componentWillMount base:' + reason);
        }
    }


    componentWillReceiveProps(nextProps) {
        try {
            if (nextProps.login.access_token === '') {
                this.props.history.push('/login');
            }
            else {
                const response = nextProps.response;
                if (response !== defaultResponse) {
                    this.processResponse = false;
                    if (response) {
                        if (response.status) {
                            switch (response.status) {
                                case 200:
                                    this.processResponse = true;
                                    break;
                                case 400:
                                    alert(response.statusText);
                                    break;
                                case 401:
                                    this.props.history.push('/login');
                                    break;
                                default:
                                    break;
                            }

                        }
                        else {
                            alert("response.status SIN RESPUESTA");
                        }
                    }
                    else {
                        alert("response SIN RESPUESTA");
                    }
                }
                else {
                    this.processResponse = true;
                }
                if (this.props.response !== nextProps.response) {
                    console.log('nextProps.response = ' + nextProps.response.status);
                    this.setState({
                        response: nextProps.response
                    });
                }
                if (this.processResponse) {
                    this.updateList(nextProps);
                    this.procesarResponse(nextProps);
                }
            }
        }
        catch (reason) {
            const _reason = reason;
            console.log("Reason in BaseApp componentWillReceiveProps =" + _reason);
        }
    }

    defaultField = { description: '', isVisible: true, controlType: 'T', listFunction: '', touched: false, handlekeyPress: '', displayFunction: '' };

    defaultState = {
        IdContrato: 0,
        currentPage: 1,
        todosPerPage: 5,
        sortBy: 'id',
        sortDir: null,
        records: [],
        filteredDataList: [],
        mode: Mode.Read,
        title: '',
        subtitle: '',
        modal: false,
        modalOk: false,
        messageModal: '',
        isVisibleAddButton: true,
        getObjetos: '',
        nroCols: 1
    };

    updateList(nextProps) {
        const objeto = this.state.objeto;
        const listObjetos = this.state.listObjetos;

        if (nextProps[objeto] !== this.props[objeto]) {
            /*const objeto_old = `${objeto}_old`;
            let objetos = this.state[listObjetos];
            var number_of_elements_to_remove = 1;
            switch (this.state.mode) {
                case Mode.Create:
                    objetos.push(nextProps[objeto]);
                    break;
                case Mode.Update:
                    objetos.splice(objetos.indexOf(this.state[objeto_old]), number_of_elements_to_remove, nextProps[objeto]);
                    break;
                case Mode.Delete:
                    objetos.splice(objetos.indexOf(this.state[objeto_old]), number_of_elements_to_remove);
                    break;
                default:
                    break;
            }*/
            this.setState({
                mode: Mode.Read,
                subtitle: this.state.listTitle,
                //[listObjetos]: objetos,
                //filteredDataList: objetos,
                //records: objetos,
            });
            this.props[this.state.getObjetos]();
        }

        if (nextProps[listObjetos] !== this.props[listObjetos]) {
            let objetos = nextProps[listObjetos];
            this.setState({
                [listObjetos]: objetos,
                filteredDataList: objetos,
                records: objetos,
            });

        }
    }

    handleContracts = event => {
        event.preventDefault();
        const objeto = this.state.objeto;
        const idContrato = event.target.value;
        this.setState({
            [objeto]: {
                ...this.state[objeto],
                [event.target.name]: idContrato,
                currentPage: 1,
            },
            IdContrato: idContrato
        });
        this.state.mode === Mode.Read && this.getListByContract(idContrato);
    }

    getListByContract(idContrato) { }

    handleSubmit = (objeto, event) => {
        //event.preventDefault();
        this.setState({
            response: defaultResponse
        });
        if (this.canBeSubmitted(objeto)) {
            this.setState({
                [this.state.objeto]: {
                    ...this.state[this.state.objeto],
                    IdUsuario: Settings.default.key.user
                },
                modal: true,
                messageModal: "¿Desea guardar?"
            });

            //var r = window.confirm("¿Desea guardar?");
            //if (r === true) {
            //    this.processSubmit();
            //}
        }
        else {
            var errorMessages = ' ';
            const errors = this.validate(objeto);
            if (Object.keys(errors).length > 0) {
                Object.keys(errors).map(error => {
                    if (errors[error].isEmpty || !errors[error].valid) {
                        errorMessages += (errors[error].errorMessage + ' ');
                    }
                });
            }
            this.setState({
                response: {
                    statusText: 'Faltan datos:' + errorMessages
                }
            });
        }
    }

    toggleCheckbox = (index, weekdays) => {
        let arr = weekdays || [];
        if (arr.length > 0) {
            if (index < arr.length) {
                if (arr[index] === 1) {
                    arr[index] = 0;
                } else {
                    arr[index] = 1;
                }
                weekdays = arr;
                this.setState({
                    weekdays: arr,
                    /*contact: {
                        ... this.state.contact,
                        DiasSemanasGuardia: GetWeekDays(arr)
                    }*/
                });
            }
        }
    }

    handleBlur = (event) => {
        const field = event.target.name;
        this.setState({
            fieldList: {
                ...this.state.fieldList,
                [field]: {
                    ...this.state.fieldList[field],
                    touched: true
                }
            }
        });
    }

    handleQuit() {
        this.props.history.goBack();
    }

    handleBack = event => {
        event.preventDefault();
        this.setState({
            mode: Mode.Read,
            subtitle: this.state.listTitle,
            response: defaultResponse
        });
    }

    processSubmit() { }

    DeleteButton() {
        return (<div style={{ textAlign: 'left' }}>
            <button className="btn btn-outline-danger btn-sm" onClick={this.handleDelete.bind(this)}>Eliminar</button>
        </div>);
    }

    initTouched() {
        Object.keys(this.state.fieldList).map(field =>
            this.state.fieldList[field].touched = false);
    }

    getPlaceHolder = (key) => {
        const errors = this.validate(this.state[this.state.objeto]);
        if (errors[key])
            return errors[key].errorMessage && this.state.fieldList[key].touched ? errors[key].errorMessage : this.state.fieldList[key].description/*defaultString*/;
    };

    getClassName = key => {
        return this.shouldMarkError(key) ? this.ErrorClass : this.DefaultClass;
    };

    shouldMarkError = (field) => {
        const errors = this.validate(this.state[this.state.objeto]);
        const hasError = errors[field] ? errors[field].isEmpty || !errors[field].valid : false;
        const touched = this.state.fieldList[field].touched;
        return hasError ? touched : false;
    };

    ErrorClass = "form-control error";
    DefaultClass = "form-control";

    canBeSubmitted = objeto => {
        const errors = this.validate(objeto);
        const isDisabled = Object.keys(errors).some(x => errors[x].isEmpty);
        return !isDisabled;
    };

    /////////////////////////////////////////
    ////            TABLA
    _onFilterChange(cellDataKey, event) {
        const records = this.state.records || [];
        if (!event.target.value) {
            this.setState({
                filteredDataList: records,
            });
        }
        var filterBy = event.target.value.toString().toLowerCase();
        var size = records.length;
        var filteredList = [];
        for (var index = 0; index < size; index++) {
            var v = records[index][cellDataKey];
            if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
                filteredList.push(records[index]);
            }
        }
        this.setState({
            filteredDataList: filteredList,
            [this.state.objeto]: {
                ...this.state[this.state.objeto],
                [cellDataKey]: event.target.value
            }
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
        const filteredDataList = this.state.filteredDataList || [];
        var rows = filteredDataList.slice();
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

    renderTodos() {
        const todos = this.state.filteredDataList || [];
        const { currentPage, todosPerPage } = this.state;
        // Logic for displaying todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
        return this.renderTable(currentTodos);
    }

    showAddButton() {
        return <div style={{ textAlign: 'left' }}>
            <button className="btn btn-outline-secondary btn-sm" onClick={this.handleNew.bind(this)}>Agregar</button>
        </div>
    }
    renderTable(list) {
        return (<div className="card">
            <div className="card-header">
                <div className="row">
                    {(this.state.isVisibleAddButton) && this.showAddButton()}
                </div>
            </div>
            <Table responsive hover striped bordered dark/*className='table'variant="dark"*/>
                <thead>

                    {this.renderHeaderTable()}
                    {this.renderSearcherTable()}
                </thead>
                <tbody>

                    {this.renderListBody(list)}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={Object.keys(this.state.fieldList).length || 1}>
                            <Pagination aria-label="Page navigation example">
                                {this.renderPageNumbers()}
                            </Pagination>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="1">
                            <label htmlFor="sel1">Nro. de registros por página:</label>
                            <select className="form-control" id="sel1" defaultValue={5} onChange={(event) => this.setState({ todosPerPage: event.target.value, currentPage: 1 })}>
                                <option key={0} value={3}>3</option>
                                <option key={1} value={5}>5</option>
                                <option key={2} value={10}>10</option>
                                <option key={3} value={20}>20</option>
                            </select>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </div>);
    }
    ////////////////////////////////////////////////////////////
    handleClick(id, event) {

        if (/*event.target.*/id) {
            if (this.state.currentPage === Number(/*event.target.*/id)) return;
            this.setState({
                currentPage: Number(/*event.target.*/id)
            });
        }
    }

    renderHeaderTable() {
        const fieldList = this.state.fieldList || [];
        var sortDirArrow = '';
        if (this.state.sortDir !== null) {
            sortDirArrow = this.state.sortDir === 'DESC' ? ' ↓' : ' ↑';
        }
        return <tr>{Object.keys(fieldList).map(key =>
            <th key={key} onClick={this._sortRowsBy.bind(this, key)}>
                {fieldList[key].description + (this.state.sortBy === key ? sortDirArrow : '')}
            </th>
        )}</tr>;
    }

    renderSearcherTable() {
        const fieldList = Object.keys(this.state.fieldList || []);
        if (fieldList.length > 0) {
            return <tr className="toolTip">{fieldList.map(key =>
                this.state.fieldList[key].isVisible ?
                    ((this.state.fieldList[key].controlType === 'T' ? <th key={key}><input type='text' onChange={this._onFilterChange.bind(this, key)} /></th>
                        : <th key={key}>{this[this.state.fieldList[key].listFunction]()}</th>)) : <th> </th>
            )}</tr>;
        }
    }

    renderPageNumbers() {
        const todos = this.state.filteredDataList || [];
        const { currentPage, todosPerPage } = this.state;
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            pageNumbers.map(number => {
                return (<PaginationItem
                    active={currentPage === number}
                    key={number}
                    id={number.toString()}
                    onClick={this.handleClick.bind(this, number.toString())}>
                    <PaginationLink>
                        {number}
                    </PaginationLink>
                </PaginationItem>)
            })
        );
    }

    handleNew = () => {
        const objeto = this.state.defaultObjeto;
        this.setState({
            [this.state.objeto]: objeto,
            mode: Mode.Create,
            subtitle: this.state.addNewTitle,
            response: defaultResponse
        });
        this.handleNewFunctions();
        this.initTouched();
    }

    handleNewFunctions() { }

    handleUpdateFunctions(objeto) { }

    handleUpdate(objeto) {
        this.setState({
            mode: Mode.Update,
            [this.state.objeto]: objeto,
            [`${this.state.objeto}_old`]: objeto,
            IdContrato: objeto.IdContrato || 0,
            subtitle: this.state.editTitle,
            response: defaultResponse
        });
        this.handleUpdateFunctions(objeto);
    }

    handleDelete = (event) => {
        const objeto = this.state[this.state.objeto];
        this.setState({
            mode: Mode.Delete,
            [this.state.objeto]: this.state[this.state.objeto],
            [`${this.state.objeto}_old`]: this.state[this.state.objeto],
            messageModal: "¿Deselea eliminar?",
            modal: true
        });

        //this.props.delete(objeto);
    }
    //////////////////////////////////////////////////
    renderListBody(list) {
        //this.setState({ records: this.state[this.state.listObjetos] || [] });
        const fieldList = Object.keys(this.state.fieldList || []);
        if (list.length === 0) {
            return <Spinner color="primary" />
        }
        else {
            return list.map((element, index) =>
                (<tr key={index} onDoubleClick={this.handleUpdate.bind(this, element)}>{
                    fieldList.map(key => <td>{this.state.fieldList[key].displayFunction ? this[this.state.fieldList[key].displayFunction](element[key]) : element[key]}</td>)
                }
                </tr>));
        }
    }
    //////////////////////////////////////////////////
    renderList() {
        return (<section id="content">
            <div className="container">
                {this.renderTodos()}
            </div>
        </section >);
    }

    handleChange = event => {
        event.preventDefault();
        console.log(event.currentTarget.name + ':' + event.currentTarget.value);
        const objeto = this.state.objeto || {};
        this.setState({
            [objeto]: {
                ...this.state[objeto],
                [event.currentTarget.name]: event.currentTarget.value,
                FechaUltActualizacion: new Date().toISOString().split('T')[0]
            }
        });
    }
    /////////////////////////////////////////////////////
    renderBodyApp() {
        return (<section id="main">
            <div className="block-header">
                {/*<div className="row">
                    <h2>Configurador Vigitablet</h2>
                    <button className="btn  btn-lg" onClick={this.handleQuit.bind(this)}>Inicio</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>*/}
            </div>
            {this.state.response && this.state.response.statusText}
            {/*this.showContracts(this.state.IdContrato)*/}
            {this.renderBody()}
        </section>);
    }

    renderBody() {
        return (
            <div className="container-fluid bg-dark text-white">
                <div className="block-header">
                    <h2>{this.state.title}</h2>
                </div>
                <h3>{this.state.subtitle}</h3>
                <div className="card-body card-padding">
                    {this.showModal()}
                    {(this.state.mode === Mode.Create || this.state.mode === Mode.Update || this.state.mode === Mode.Delete) ? this.renderElement() : this.renderList()}
                </div>
            </div>
        );
    }


    renderElement() {
        return <div>
            <button id="backButton" className="btn btn-link" onClick={this.handleBack.bind(this)}>Volver a la lista</button>
            {this.renderNew()}
            <div className="row">
                <button className="btn btn-outline-primary btn-sm" onClick={this.handleSubmit.bind(this, this.state[this.state.objeto])}>Guardar</button>
                {(this.state.mode === Mode.Update || this.state.mode === Mode.Delete) && this.DeleteButton()}
            </div>
        </div>;
    }

    showPeriods(name_, value_) {
        const defaultOption = 'Seleccione el periodo...';
        const _periods = this.props.periods || [];
        let options = _periods.length > 0 ? _periods.map(function (option) {
            return (
                <option key={option.IdPeriodo} value={option.IdPeriodo}>
                    {option.DescPeriodo}
                </option>
            )
        }) : [];
        return <select className='form-control input-sm' name={name_} onChange={this.handleChange.bind(this)} value={value_.trim()}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>;
    }

    showContracts(value_) {
        const defaultOption = 'Seleccione contrato...';
        const _contracts = this.props.contracts || [];
        const options = _contracts.length > 0 ? _contracts.map(function (option) {
            return (
                <option key={option.Id} value={option.Id}>
                    {option.NombreCompletoContrato}
                </option>
            );
        }) : [];
        return (<select className='form-control input-sm' name="IdContrato" onChange={this.handleContracts.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }

    showContracts_(value_) {
        const defaultOption = 'Seleccione contrato...';
        const _contracts = this.props.contracts || [];
        const options = _contracts.length > 0 ? _contracts.map(function (option) {
            return (
                <option key={option.Id} value={option.Id}>
                    {option.NombreCompletoContrato}
                </option>
            );
        }) : [];
        return (<div><select className='form-control input-sm' name="IdContrato" onChange={this.handleChange.bind(this)} value={value_}>
            <option key={0} value={0}>
                {defaultOption}
            </option>
            {options}
        </select>
            <br />
        </div>);
    }

    showDescContracts(IdContrato) {
        return this.showDescription(IdContrato, "Id", "NombreCompletoContrato", "contracts");
    }

    fieldContract = { ...this.defaultField, description: 'Contrato', controlType: 'C', listFunction: 'showContractsFilter', displayFunction: 'showDescContracts' };

    showDescription(id, idName, descName, listObjects) {
        const list = this.props[listObjects] || [];
        const x = list.find(x => x[idName] === id);
        return x !== undefined ? x[descName] : '';
    }

    showDiasSemana = daysArgs => {
        const arDaysTurn = SetWeekDays(daysArgs);
        const days = ["L", "M", "Mi", "J", "V", "S", "D"];
        return <div>
            {days.map((item, index) => (
                <div className="col-md-1 col-xs-1">
                    <label className="checkbox checkbox-inline">
                        <input type="checkbox" value={index} checked={arDaysTurn[index] === 1} />
                    </label>
                </div>
            ))}
        </div>;
    }
    weekDays = (weekdays) => {
        const days = ["L", "M", "Mi", "J", "V", "S", "D"];
        return (
            <Form>
                {days.map((item, index) => (
                    <FormGroup check inline>
                        <Label check>
                            <input type="checkbox" value={index} checked={this.isChecked(index, weekdays)} onChange={this.toggleCheckbox.bind(this, index, weekdays)} /> {item}
                        </Label>
                    </FormGroup>
                ))}
            </Form>
        );

    }
    weekDays_ = (weekdays) => {
        const days = ["L", "M", "M", "J", "V", "S", "D"];

        return <div className="row">
            <div style={{ textAlign: 'center' }} className="card">
                <h3 style={{ fontFamily: 'Anton, sans-serif' }}>DIAS DE LA SEMANA</h3>
            </div>
            {days.map((item, index) => (
                <div className="col-md-1 col-xs-1">
                    <p className="c-gray f-16"> {item}</p>
                    <label className="checkbox checkbox-inline">
                        <input type="checkbox" value={index} checked={this.isChecked(index, weekdays)} onChange={this.toggleCheckbox.bind(this, index, weekdays)} />
                        <i className="input-helper" />
                    </label>
                </div>
            ))}
            {/*days.map((item, index) => (
                <div className="col-md-1 col-xs-1">
                    <p className="c-gray f-16"> {item}</p>
                    <label className="checkbox checkbox-inline">
                        <input type="checkbox" value={index} checked={this.isChecked(index, weekdays)} onChange={this.toggleCheckbox.bind(this, index, weekdays)} />
                        <i className="input-helper" />
                    </label>
                </div>
            ))*/}
        </div>;
    }

    isChecked = (index, weekdays) => {
        if (weekdays) {
            return weekdays[index] === 1;
        }
        else {
            return false;
        }
    }
    render() {
        return this.props.isLoading ? <PageLoader /> : this.renderBodyApp();
    }

    showContractsFilter() {
        const defaultOption = '(Mostrar todos)';
        const _contracts = this.props.contracts || [];
        const options = _contracts.length > 0 ? _contracts.map(function (option) {
            return (
                <option key={option.Id} value={option.Id}>
                    {option.NombreCompletoContrato}
                </option>
            );
        }) : [];
        return (<select className='form-control input-sm' name="IdContrato" onChange={this._onFilterChange.bind(this, 'IdContrato')} value={this.state[this.state.objeto].IdContrato}>
            <option key={0} value={''}>
                {defaultOption}
            </option>
            {options}
        </select>);
    }
    toggleField(event) {
        const key = event.target.name;
        this.setState({
            [this.state.objeto]: {
                ...this.state[this.state.objeto],
                [key]: !this.state[this.state.objeto][key]
            }
        });
    }
    fieldGroup(fieldName, glyphiconClass) {
        return <div className="">
            <span className="input-group-addon"><i className={glyphiconClass} /></span>
            {/*<div className="fg-line">*/}
            {this.fieldInput(fieldName)}
            <br />
            {/*</div>*/}
        </div>;
    }

    fieldInput(fieldName) {
        const fieldList = this.state.fieldList[fieldName] || '';
        const desc = this.state[this.state.objeto][fieldName];
        if (fieldList) {
            const handlekeyPress = fieldList ? fieldList.handlekeyPress : '';
            return <input type="text" className={this.getClassName(fieldName)} name={fieldName} value={desc} onBlur={this.handleBlur.bind(this)} onKeyPress={handlekeyPress ? this[handlekeyPress].bind(this) : (e) => { }} onChange={this.handleChange.bind(this)} placeholder={this.getPlaceHolder(fieldName)} title={this.getPlaceHolder(fieldName)} required />;
        } else {
            return <input type="text" className="form-control" name={fieldName} value={desc} onChange={this.handleChange.bind(this)} placeholder={''} />;
        }
    }

    handleOnlyNumbers(e) { onlyNumbers(e); }

    showDiasSemanaStr(days_) {
        const arDays = SetWeekDays(days_);
        const days = ["L", "M", "Mi", "J", "V", "S", "D"];
        const strWeek = days.map((item, index) => {
            return arDays[index] === 1 ? item : ' ';
        }).join('-');
        return strWeek;
    }



    validateEmail(value) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    }
    Example() {
        const show = false;// useState(false);
        //const setShow = false;
        const target = "boton1";//useRef(null);

        return (
            <div>
                <Button variant="danger" id="boton1" name="boton1" ref={target} onClick={() => this.setShow(!show)}>
                    Click me to see
      </Button>

            </div>
        );
    }



    setShow(show) {
        return <Alert /*key={1} variant={variant}*/>
            This is a  alert—check it out!
  </Alert>;
        /*return <Overlay target={"boton1"} show={show} placement="right">
            {({
                placement,
                scheduleUpdate,
                arrowProps,
                outOfBoundaries,
                show: _show,
                ...props
            }) => (
                    <div
                        {...props}
                        style={{
                            backgroundColor: 'rgba(255, 100, 100, 0.85)',
                            padding: '2px 10px',
                            color: 'white',
                            borderRadius: 3,
                            ...props.style,
                        }}
                    >
                        Simple tooltip
          </div>
                )}
        </Overlay>*/
    }

    toggleModal = (e) => this.setState({ modal: !this.state.modal });
    toggleModalOk = (e) => {
        this.processSubmit();
        this.setState({
            modalOk: true,
            modal: !this.state.modal
        })
    };
    showModal() {
        //<Button color="danger" onClick={this.toggleModal.bind(this)}>{"buttonLabel"}</Button> * /}
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggleModal.bind(this)} className={"className"}>
                <ModalHeader toggle={this.toggleModal.bind(this)}>Vigitablet</ModalHeader>
                <ModalBody>
                    {this.state.messageModal}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggleModalOk.bind(this)}>Aceptar</Button>{' '}
                    <Button color="secondary" onClick={this.toggleModal.bind(this)}>Cancelar</Button>
                </ModalFooter>
            </Modal>);
    }
}
