import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GroupsStore from '../store/Group';
import { Mode, isEmpty } from '../store/Utils';
import { BaseApp } from '../components/BaseApp';
import { defaultContact } from '../store/Contacts';
import { Table, Button, Collapse, Card, CardBody } from 'reactstrap';

class GroupApp extends BaseApp {
    state = {
        ... this.defaultState,
        objeto: "group",
        listObjetos: "groups",
        defaultObjeto: GroupsStore.defaultGroup,
        groups: [],
        group: GroupsStore.defaultGroup,
        group_old: GroupsStore.defaultGroup,
        mode: Mode.Read,
        isModeEdit: false,
        groupcontacts: [],
        contactgroups: [],
        title: 'GRUPOS',
        subtitle: 'Lista de Grupos',
        addNewTitle: 'Agregar Nuevo Grupo',
        editTitle: 'Editar Grupo',
        listTitle: 'Lista de Grupos',
        fieldList: {
            IdContrato: this.fieldContract,
            //Contrato: { description: 'Contrato', isVisible: true, controlType: 'C', listFunction: 'showContractsFilter', errorMessage: "Falta Area", isRequired: true, valid: true, touched: false, handlekeyPress:"" },
            IdGrupo: { ...this.defaultField, description: 'Id Grupo' },
            CodigoGrupo: { ...this.defaultField, description: "Codigo Grupo" },
            NombreGrupo: { ...this.defaultField, description: "Nombre Grupo" },
            AreaCompetencia: { ...this.defaultField, description: 'Area Competencia' },
        },
        isOpen: false,
        getObjetos: 'getGroups',
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            //const IdIncidentType = parseInt(this.props.match.params.id, 10) || 0;
            this.props.getGroups();
            this.props.getContacts();
        } catch (reason) {
            console.log('Error in componentWillMount - ContactsApp:' + reason);
        }

    }
    /*shouldComponentUpdate(nextProps, nextState) {
        if (nextState.groups !== this.state.groups) {
            return true;
        }
    }*/
    procesarResponse(nextProps) {
        // This method runs when incoming props (e.g., route params) change
        if (nextProps.contacts !== this.props.contacts) {
            this.setState({
                contacts: nextProps.contacts
            });
        }
        if (nextProps.contactgroups !== this.props.contactgroups) {
            this.setState({
                contactgroups: nextProps.contactgroups
            });
        }

        /*if (nextProps.group !== this.props.group) {
            this.props.getGroups();
        }*/
    }

    toggleShowContacts = (event) => this.setState({isOpen: !this.state.isOpen});
    renderNew() {
        const group = this.state[this.state.objeto] || this.state.defaultObjeto;
        return (<div>
            {this.showContracts_(group.IdContrato)}
            {this.fieldGroup("NombreGrupo", "glyphicon glyphicon-user")}
            {this.fieldGroup("CodigoGrupo", "glyphicon glyphicon-envelope")}
            {this.fieldGroup("AreaCompetencia", "glyphicon glyphicon-envelope")}
            <div className="fg-line">
                <Button color="primary" onClick={this.toggleShowContacts.bind(this)} style={{ marginBottom: '1rem' }}>Contactos</Button>
                <Collapse isOpen={this.state.isOpen}>
                    <Card>
                        <CardBody>
                            {this.showContacts()}
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        </div>
        );
    }

    processSubmit() {
        //this.state.group.IdContrato = this.state.IdContrato;
        const contactgroups_ = this.state.contactgroups;
        var contactgroups = [];
        contactgroups_.map(x => {
            contactgroups.push([x.IdContacto, x.RecibirLlamada ? 1 : 0, x.RecibirSMS ? 1 : 0, x.RecibirEmail ? 1 : 0, x.Orden]);
        });
        switch (this.state.mode) {
            case Mode.Create:
                this.props.create(this.state.group, contactgroups);
                break;
            case Mode.Update:
                this.props.update(this.state.group, contactgroups);
                break;
            case Mode.Delete:
                this.props.delete(this.state.group, contactgroups);
                break;
            default:
                break;
        }
    }

    validate = group => {
        return {
            NombreGrupo: {
                errorMessage: "Falta Nombre Grupo", isRequired: true, valid: true, isEmpty: isEmpty(group.NombreGrupo)
            },
            CodigoGrupo: {
                errorMessage: "Falta  Codigo de Grupo", isRequired: true, valid: true, isEmpty: isEmpty(group.CodigoGrupo)
            },
            AreaCompetencia: {
                errorMessage: "Falta  Area Competencia", isRequired: true, valid: true, isEmpty: isEmpty(group.AreaCompetencia)
            },
        };
    }

    toggleContacts(IdContacto, e) {
        var contactgroups = this.state.contactgroups || [];
        //const valor = e.target.value || 0;
        var contactgroup = contactgroups.filter(x => x.IdContacto === parseInt(IdContacto, 10));
        if (contactgroup.length > 0) {
            contactgroups.splice(contactgroups.indexOf(contactgroup[0]), 1);
        }
        else {
            contactgroups.push(
                {
                    IdContacto: parseInt(IdContacto, 10),
                    RecibirSMS: true,
                    RecibirEmail: true,
                    RecibirLlamada: true,
                    Orden: 0
                }
            );
        }
        this.setState({
            contactgroups: contactgroups
        });
    }


    toggleContactCall(IdContacto, e) {
        var contactgroups = this.state.contactgroups || [];
        var contactgroup = contactgroups.filter(x => x.IdContacto === parseInt(IdContacto, 10));
        if (contactgroup.length > 0) {
            const contactgroup_new = {
                IdContacto: contactgroup[0].IdContacto,
                RecibirLlamada: !contactgroup[0].RecibirLlamada,
                RecibirSMS: contactgroup[0].RecibirSMS,
                RecibirEmail: contactgroup[0].RecibirEmail,
                Orden: contactgroup[0].Orden
            };
            contactgroups.splice(contactgroups.indexOf(contactgroup[0]), 1, contactgroup_new);
        }
        else {
            contactgroups.push(
                {
                    IdContacto: IdContacto,
                    RecibirSMS: false,
                    RecibirEmail: false,
                    RecibirLlamada: true,
                    Orden: 0
                }
            );
        }
        this.setState({
            contactgroups: contactgroups
        });
    }

    toggleContactSMS(IdContacto, e) {
        var contactgroups = this.state.contactgroups || [];
        var contactgroup = contactgroups.filter(x => x.IdContacto === parseInt(IdContacto, 10));
        if (contactgroup.length > 0) {
            const contactgroup_new = {
                IdContacto: contactgroup[0].IdContacto,
                RecibirLlamada: contactgroup[0].RecibirLlamada,
                RecibirSMS: !contactgroup[0].RecibirSMS,
                RecibirEmail: contactgroup[0].RecibirEmail,
                Orden: contactgroup[0].Orden
            };
            contactgroups.splice(contactgroups.indexOf(contactgroup[0]), 1, contactgroup_new);
        }
        else {
            contactgroups.push(
                {
                    IdContacto: IdContacto,
                    RecibirSMS: true,
                    RecibirEmail: false,
                    RecibirLlamada: false,
                    Orden: 0
                }
            );
        }
        this.setState({
            contactgroups: contactgroups
        });
    }

    toggleContactEmail(IdContacto, e) {
        var contactgroups = this.state.contactgroups || [];
        var contactgroup = contactgroups.filter(x => x.IdContacto === parseInt(IdContacto, 10));
        if (contactgroup.length > 0) {
            const contactgroup_new = {
                IdContacto: contactgroup[0].IdContacto,
                RecibirLlamada: contactgroup[0].RecibirLlamada,
                RecibirSMS: contactgroup[0].RecibirSMS,
                RecibirEmail: !contactgroup[0].RecibirEmail,
                Orden: contactgroup[0].Orden
            };
            contactgroups.splice(contactgroups.indexOf(contactgroup[0]), 1, contactgroup_new);
        }
        else {
            contactgroups.push(
                {
                    IdContacto: IdContacto,
                    RecibirSMS: false,
                    RecibirEmail: true,
                    RecibirLlamada: false,
                    Orden: 0
                }
            );
        }
        this.setState({
            contactgroups: contactgroups
        });
    }

    toggleContactOrden(IdContacto, e) {
        var contactgroups = this.state.contactgroups || [];
        var contactgroup = contactgroups.filter(x => x.IdContacto === IdContacto);
        if (contactgroup.length > 0) {
            const contactgroup_new = {
                IdContacto: contactgroup[0].IdContacto,
                RecibirLlamada: contactgroup[0].RecibirLlamada,
                RecibirSMS: contactgroup[0].RecibirSMS,
                RecibirEmail: contactgroup[0].RecibirEmail,
                Orden: parseInt(e.target.value, 10)
            };
            contactgroups.splice(contactgroups.indexOf(contactgroup[0]), 1, contactgroup_new);
        }
        else {
            contactgroups.push(
                {
                    IdContacto: IdContacto,
                    RecibirSMS: true,
                    RecibirEmail: true,
                    RecibirLlamada: true,
                    Orden: parseInt(e.target.value, 10)
                }
            );
        }
        this.setState({
            contactgroups: contactgroups
        });
    }
    GetValueOrden(IdContacto) {
        const contactgroup = this.findContact(IdContacto);
        if (contactgroup) {
            return contactgroup.Orden;
        }
        else {
            return 0;
        }
    }
    findContact(IdContacto) {
        const contactgroups = this.state.contactgroups || [];
        const contactgroup = contactgroups.filter(x => x.IdContacto === parseInt(IdContacto, 10));
        if (contactgroup.length > 0) {
            return contactgroup[0];
        }
        else {
            return null;
        }
    }

    showContacts() {
        const _contacts = this.state.contacts || [];
        const options = _contacts.map(contact => {
            return (
                <tr>
                    <td><input type="checkbox" value={contact.IdContacto} checked={this.isCheckedContact(contact.IdContacto)} onChange={this.toggleContacts.bind(this, contact.IdContacto)} /></td>
                    <td><label>{contact.NombreContacto} - ({contact.CargoContacto})</label></td>
                    <td><input type="checkbox" value={contact.IdContacto} checked={this.isCheckedElement("RecibirLlamada", contact.IdContacto)} onChange={this.toggleContactCall.bind(this, contact.IdContacto)} /></td>
                    <td><input type="checkbox" value={contact.IdContacto} checked={this.isCheckedElement("RecibirSMS", contact.IdContacto)} onChange={this.toggleContactSMS.bind(this, contact.IdContacto)} /></td>
                    <td><input type="checkbox" value={contact.IdContacto} checked={this.isCheckedElement("RecibirEmail", contact.IdContacto)} onChange={this.toggleContactEmail.bind(this, contact.IdContacto)} /></td>
                    <td><input type="numeric" value={this.GetValueOrden(contact.IdContacto)} onChange={this.toggleContactOrden.bind(this, contact.IdContacto)} /></td>
                </tr>);
        });
        return (
            <Table responsive striped bordered hover variant="dark">
                <thead className="thead-dark">
                    <tr>
                        <th> </th>
                        <th>Contacto</th>
                        <th>Permitir Llamar</th>
                        <th>Enviar SMS</th>
                        <th>Enviar Email</th>
                        <th>Orden</th>
                    </tr>
                </thead>
                <tbody>
                    {options}
                </tbody>
            </Table>
        );
    }

    getContact(IdContacto) {
        const contactgroups = this.state.contactgroups || [];
        var contactgroup = contactgroups.filter(x => x.IdContacto === parseInt(IdContacto, 10));
        if (contactgroup.length > 0) {
            return contactgroup[0];
        } else {
            return null;
        }
    }

    isCheckedContact(IdContacto) {
        return this.getContact(IdContacto) !== null;
    }

    isCheckedElement(Recibir, IdContacto) {
        const contactgroup = this.getContact(IdContacto);
        return contactgroup ? contactgroup[Recibir] : false;
    }

    handleUpdateFunctions(group) {
        this.props.getContactsByContract(group.IdContrato);
        this.props.getConfigContactGroups(group.IdGrupo);
    }

    getListByContract(idContrato) {
        this.props.getGroupsByContract(idContrato);
    }

}
export default connect(
    state => state.group, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(GroupsStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props
)(GroupApp);