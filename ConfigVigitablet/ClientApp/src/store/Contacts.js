import * as Settings from '../store/MyConfig';
import { NullImage, defaultResponse, HandleChangeImageAction, Now } from '../store/Utils';
import { getIncidentTypes, GetIncidentTypesAction } from '../store/IncidentType';
import { defaultLogin, GetSessionAction, getSession } from '../store/Login';
import { GetJobTitlesAction, getJobTitles } from '../store/JobTitle';
import { defaultContrato, GetContractsAction, defaultContract, getContracts } from '../store/Contracts';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface ContactsState {
    isLoading: boolean;
    IdContact?: number;
    contacts: Contact[];
    contact: Contact;
    response: Resp;
    incidentTypes: IncidentType[];
    login: LogIn;
    IdIncidentType: number;
    fileName: string;
    jobtitles: JobTitle[];
}

export interface Contact {
    [key: string]: any
    IdContacto: number;
    IdTipoContacto: number;
    TipoContacto: string;
    NombreContacto: string;
    IdCargo: number;
    CargoContacto: string;
    CorreoElectronico: string;
    FechaUltActualizacion: string;
    IdUsuario: number;
    IdContrato: number;
    TelefonoMovil: string;
    TelefonPrincipal: string;
    TelefonSecundario: string;
    Usuario: string;
}
*/

export const defaultContact = {
    IdContacto: 0,
    IdTipoContacto: 1,
    TipoContacto: '',
    NombreContacto: '',
    IdCargo: 0,
    CargoContacto: '',
    TelefonoMovil: '',
    TelefonPrincipal: '',
    TelefonSecundario: '',
    CorreoElectronico: '',
    FechaUltActualizacion: Now(),
    IdUsuario: 0,
    Usuario: '',
    IdContrato: 0
};

export const defaultContactTime = {
    IdContacto: 0,
    IdHorario: 0,
    DiasSemanasHorario: '0000000',
    HoraInicioHorario: '00:00:00',
    HoraFinHorario: '00:00:00',
    FechaUltActualizacion: Now(),
    IdUsuario: 0
};
/*
export interface SMS {
    [key: string]: string
    tlf: string;
    sms: string;
}
*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

const RequestContactsAction = 'REQUEST_CONTACTS';
const GetContactAction = 'GET_CONTACT';
const GetContactTimeAction = 'GET_CONTACT_TIME';
export const GetContactsAction = 'GET_CONTACTS';
const GetContactsByTypeAction = 'GET__CONTACTS_BY_TYPE';
const ReceiveContactsAction = 'RECEIVE_CONTACT';
const UpdateContactAction = 'UPDATE_CONTACT';
const CreateContactAction = 'CREATE_CONTACT';
const UpdateContactTimeAction = 'UPDATE_CONTACT_TIME';
const CreateContactTimeAction = 'CREATE_CONTACT_TIME';
const DeleteContactAction = 'DELETE_CONTACT';
const ErrorRequestContactAction = 'ERROR_REQUEST_CONTACT';
const TestAction = 'TEST';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestContactsAction | UpdateContactAction | GetContactAction | ErrorRequestContactAction
    | CreateContactAction | ReceiveContactsAction | DeleteContactAction | GetContactsAction
    | GetIncidentTypesAction | GetSessionAction | GetContactsByTypeAction | HandleChangeImageAction
    | GetJobTitlesAction | TestAction;
*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const getContacts = () => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        // if (IdIncidentType !== getState().contacts.IdIncidentType) {
        dispatch({ type: RequestContactsAction, IdContact: 0 });
        const response = await fetch(url + `api/VigitabletConfig/GetAllConfigContacts/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const contacts = await response.json();
            dispatch({ type: GetContactsAction, contacts });
        }
        else {
            dispatch({ type: GetContactsAction, contacts: [] });
        }
    }
    else {
        return;
    }
};

export const getContactsByContract = (IdContract) => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        // if (IdIncidentType !== getState().contacts.IdIncidentType) {
        dispatch({ type: RequestContactsAction, IdContact: 0 });
        const response = await fetch(url + `api/VigitabletConfig/GetConfigContactsByContract/${IdContract}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const contacts = await response.json();
            dispatch({ type: GetContactsAction, contacts });
        }
        else {
            dispatch({ type: GetContactsAction, contacts: [] });
        }
    }
    else {
        return;
    }
    /* }).catch(reason => {
         dispatch({ type: ErrorRequestContactAction, IdContact: 0, response: reason });
     });*/

};

export const createContactTime = (contacttime, access_token) => async (dispatch, getState) => {
    const searchParams = Object.keys(contacttime).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(contacttime[key]);
    }).join('&');
    const url = Settings.default.key.url;
    dispatch({ type: RequestContactsAction, IdContact: 0 });
    const response = await fetch(url + "api/VigitabletConfig/CreateContactTime", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'bearer ' + access_token
        },
        body: searchParams
    });
    if (response.ok) {
        const IdHorario = await response.json();
        contacttime.IdHorario = IdHorario;

        dispatch({ type: CreateContactTimeAction, contacttime });
    }
    else {
        dispatch({ type: CreateContactTimeAction, contacttime });
    }
};

export const updateContactTime = (contacttime, access_token) => async (dispatch, getState) => {
    const searchParams = Object.keys(contacttime).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(contacttime[key]);
    }).join('&');
    const url = Settings.default.key.url;

    //dispatch({ type: RequestContactsAction, IdContact: 0 });
    const response = await fetch(url + "api/VigitabletConfig/UpdateContactTime", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'bearer ' + access_token
        },
        body: searchParams
    });

    if (response.ok) {
        dispatch({ type: UpdateContactTimeAction, contacttime });
    }
    else {
        dispatch({ type: UpdateContactTimeAction, contacttime });
    }
};

export const actionCreators = {
    setDefault: () => ({ type: 'GET_CONTACTS_BY_TYPE', IdIncidentType: 0, contacts: [] }),
    getContacts: getContacts,
    getContact: IdContact => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //if (IdContact !== getState().contacts.IdContact) {
            dispatch({ type: RequestContactsAction, IdContact: IdContact });
            const response = await fetch(url + `api/VigitabletConfig/GetContactById/${IdContact}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            const data = await response.json();
            dispatch({ type: GetContactAction, IdContact: IdContact, contact: data });
            /*}).catch(reason => {
                dispatch({ type: ErrorRequestContactAction, IdContact: IdContact, response: reason });
            });*/
        }
    },
    getContactsByIncident: IdIncident => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //  if (IdIncident !== getState().contacts.IdContact) {
            dispatch({ type: RequestContactsAction, IdContact: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetAllsContactsByIncident/${IdIncident}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const contacts = await response.json();
                dispatch({ type: GetContactsAction, contacts });
            }
            else {
                dispatch({ type: ErrorRequestContactAction, IdContact: 0, response });
            }
        }
        else {
            return;
        }
        /*    }).catch(reason => {
                
            });*/
    },

    requestContacts: IdContact => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        //    if (IdContact !== getState().contacts.IdContact) {
        //        const response = await fetch(`api/VigitabletConfig/CreateContact=${IdContact}`)
        //        })const data = await response.json() as Promise<Contact[]>)
        //            
        //                dispatch({ type: 'RECEIVE__CONTACTS', IdContact: IdContact, contacts: data });
        //            });
        //        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        //        dispatch({ type: RequestContactsAction, IdContact: IdContact });
        //    }
        //}
    },
    create: (objeto, contacttime) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestContactsAction, IdContact: 0 });
            const response = await fetch(url + "api/VigitabletConfig/AddConfigContact", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdContact = await response.json();
                objeto.IdContacto = IdContact;
                contacttime.IdContacto = IdContact;
                const searchParams = Object.keys(contacttime).map((key) => {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(contacttime[key]);
                }).join('&');
                //await createContactTime(contacttime, access_token);
                const responseContactTime = await fetch(url + "api/VigitabletConfig/CreateContactTime", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': "application/x-www-form-urlencoded",
                        'Authorization': 'bearer ' + access_token
                    },
                    body: searchParams
                });
                if (responseContactTime.ok) {
                    const IdHorario = responseContactTime.json();
                    contacttime.IdHorario = IdHorario;
                }
                else {

                }
                dispatch({ type: CreateContactAction, contact: objeto, response, IdContact: IdContact });
            }
            else {
                const IdContact = 0;
                dispatch({ type: CreateContactAction, contact: objeto, response, IdContact });
            }
        }
        else {
            return;
        }

    },
    update: (objeto, contacttime) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestContactsAction, IdContact: objeto.IdContact });
            const response = await fetch(url + "api/VigitabletConfig/UpdateConfigContact", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                if (!contacttime.IdHorario) {
                    contacttime.IdContacto = objeto.IdContacto;
                    const searchParams2 = Object.keys(contacttime).map((key) => {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(contacttime[key]);
                    }).join('&');
                    const response2 = await fetch(url + "api/VigitabletConfig/UpdateContactTime", {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': "application/x-www-form-urlencoded",
                            'Authorization': 'bearer ' + access_token
                        },
                        body: searchParams2
                    });

                    if (response2.ok) {
                        contacttime.IdHorario = response2.json();
                        dispatch({ type: UpdateContactTimeAction, contacttime });
                    }
                    else {
                        dispatch({ type: UpdateContactTimeAction, contacttime });
                    }

                    dispatch({ type: UpdateContactAction, contact: objeto, contacttime, response, IdContact: objeto.IdContacto });
                } else {
                    contacttime.IdContacto = objeto.IdContacto;
                    const searchParams2 = Object.keys(contacttime).map((key) => {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(contacttime[key]);
                    }).join('&');
                    const response2 = await fetch(url + "api/VigitabletConfig/UpdateContactTime", {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': "application/x-www-form-urlencoded",
                            'Authorization': 'bearer ' + access_token
                        },
                        body: searchParams2
                    });

                    if (response2.ok) {
                        contacttime.IdHorario = response2.json();
                        dispatch({ type: UpdateContactTimeAction, contacttime });
                    }
                    else {
                        dispatch({ type: UpdateContactTimeAction, contacttime });
                    }

                    dispatch({ type: UpdateContactAction, contact: objeto, contacttime, response, IdContact: objeto.IdContacto });

                }
            }

            else {
                dispatch({ type: UpdateContactAction, contact: objeto, contacttime, response, IdContact: objeto.IdContacto });
            }
        }
    },
    delete: (/*IdContact*/objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestContactsAction, IdContact: objeto.IdContacto });
            const response = await fetch(url + `api/VigitabletConfig/DeleteConfigContact/${objeto.IdContacto}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                dispatch({ type: DeleteContactAction, contact: objeto/*, response, IdContact: objeto.IdContacto*/ });
            }
            else {
                //dispatch({ type: ErrorRequestContactAction, contact: defaultContact, response, IdContact });
                dispatch({ type: ErrorRequestContactAction, response /*contact: defaultContact*/ });
            }
        }
    },
    getIncidents: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const IdContrato = 22;
            const url = Settings.default.key.url;
            dispatch({ type: RequestContactsAction, IdContact: 0 });
            const response = await fetch(url + `api/VigitabletConfig/DeleteContact}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            const data = await response.json();
            dispatch({ type: 'RECEIVE_S', IdContrato: IdContrato, configincidents: data });
            /* }).catch(reason => {
                 console.log('Error in Update:' + reason);
                 //   dispatch({ type: 'RECEIVE_S', IdContrato: IdContrato, configincidents: [] });
             }*/
        }
    },
    getIncidentTypes: () => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestContactsAction, IdContact: 0 });
            const data = getIncidentTypes(access_token);
            dispatch({ type: 'GET_INCIDENT_TYPES', incidentTypes: data });
            /*.catch(reason => {
                    console.log('Error in GET_INCIDENT_TYPES:' + reason);
                    dispatch({ type: 'GET_INCIDENT_TYPES', incidentTypes: [] });
                });*/
        }
    },
    changeImage: (file) => async (dispatch, getState) => {
        dispatch({ type: RequestContactsAction, IdContact: 0 });
        const response = await fetch('api/Upload', {
            credentials: 'same-origin',
            method: 'post',
            headers: {
                'Content-Type': 'false',
                'processData': 'false'
            },
            body: file//e.target.files[0]
        });
        const data = await response.json();
        dispatch({ type: 'ON_CHANGE_IMAGE', file: data });
        /*}).catch(reason => {
            console.log('Error en Change Image:' + reason);
            dispatch({ type: 'ON_CHANGE_IMAGE', file: NullImage });
        });*/
    },
    getSession: getSession,
    getJobTitles: getJobTitles,
    sendSMS: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            let _sms = {
                sms: objeto.MensajeSMSIncidente,
                tlf: objeto.TelefonoContactoIncidente
            };
            const searchParams = Object.keys(_sms).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(_sms[key]);

            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestContactsAction, IdContact: 0 });
            const response = await fetch(`api/SMS?sms=${_sms.sms}&tlf=${_sms.tlf}`, {
                method: 'PUT',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            });
            //const data = await {
            dispatch({ type: 'TEST', response });
            /*}).catch(reason => {
                dispatch({ type: 'TEST', response: reason });
            });*/
        }
    },
    getContactTime: (IdContacto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        const url = Settings.default.key.url;
        const response = await fetch(url + `api/VigitabletConfig/GetConfigContactScheduleByContact/${IdContacto}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const contacttimes = await response.json();
            dispatch({ type: GetContactTimeAction, contacttimes });
        }
        else {
            dispatch({ type: GetContactTimeAction, contacttimes: [] });
        }
    },
    getContracts: getContracts,
    getContactsByContract: getContactsByContract
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = {
    contacts: [],
    isLoading: false,
    contact: defaultContact,
    response: defaultResponse,
    IdContact: 0,
    incidentTypes: [],
    login: defaultLogin,
    IdIncidentType: 0,
    fileName: '',
    jobtitles: []
};

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case RequestContactsAction:
            return {
                ...state,
                IdContact: action.IdContact,
                isLoading: true
            };
        case GetContactAction:
            return {
                ...state,
                isLoading: false,
                IdContact: action.IdContact,
                contact: action.contact
            };
        case GetContactsAction:
            return {
                ...state,
                isLoading: false,
                contacts: action.contacts
            };
        case ReceiveContactsAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.IdContact === state.IdContact) {
                return {
                    ...state,
                    //IdContact: action.IdContact,
                    //contact: action.contact,
                    isLoading: false

                };
            }
            break;
        case CreateContactAction:
            return {
                ...state,
                IdContact: action.IdContact,
                contact: action.contact,
                isLoading: false
            };
        case UpdateContactAction:
            return {
                ...state,
                IdContact: action.IdContact,
                contact: action.contact,
                isLoading: false
            };
        case DeleteContactAction:
            return {
                ...state,
                contact: action.contact,
                //response: action.response,
                isLoading: false
            };
        case CreateContactTimeAction:
            return {
                ...state,
                contacttime: action.contacttime,
                isLoading: false
            };
        case UpdateContactTimeAction:
            return {
                ...state,
                contacttime: action.contacttime,
                isLoading: false
            };
        case ErrorRequestContactAction:
            return {
                ...state,
                response: action.response,
                //IdContact: action.IdContact,
                isLoading: false
            };
         case GetSessionAction:
            return {
                ...state,
                isLoading: false,
                login: action.login
            };
        case GetContactsByTypeAction:
            return {
                ...state,
                isLoading: false,
                contacts: action.contacts,
                IdIncidentType: action.IdIncidentType
            };
        case 'ON_CHANGE_IMAGE':

            return {
                ...state,
                isLoading: false,
                fileName: JSON.parse(String(action.file)).fileName
            };
        case GetJobTitlesAction:
            return {
                ...state,
                isLoading: false,
                jobtitles: action.jobtitles
            };
        case 'TEST':
            return {
                ...state,
                isLoading: false,
                response: action.response
            };
        case GetContractsAction:
            return {
                ...state,
                contracts: action.contracts
            };
        case GetContactTimeAction:
            return {
                ...state,
                contacttimes: action.contacttimes
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    return state;
};