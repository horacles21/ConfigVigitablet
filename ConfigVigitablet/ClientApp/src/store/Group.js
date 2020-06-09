import * as Settings from '../store/MyConfig';
import { NullImage, defaultResponse, HandleChangeImageAction } from '../store/Utils';
import { getIncidentTypes, GetIncidentTypesAction } from '../store/IncidentType';
import { defaultLogin, GetSessionAction, getSession } from '../store/Login';
import { GetJobTitlesAction, getJobTitles } from '../store/JobTitle';
import { defaultContrato, GetContractsAction, defaultContract, getContracts } from '../store/Contracts';
import { getContacts, GetContactsAction, getContactsByContract } from '../store/Contacts';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface GroupsState {
    isLoading: boolean;
    IdGroup?: number;
    groups: Group[];
    group: Group;
    response: Resp;
    incidentTypes: IncidentType[];
    login: LogIn;
    IdIncidentType: number;
    fileName: string;
    jobtitles: JobTitle[];
}

export interface Group {
    [key: string]: any
    IdGroupo: number;
    IdTipoGroupo: number;
    TipoGroupo: string;
    NombreGroupo: string;
    IdCargo: number;
    CargoGroupo: string;
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

export const defaultGroup = {
    IdGrupo: 0,
    IdContrato : 0,
    NombreGrupo: '',
    CodigoGrupo: '',
    AreaCompetencia: '',
    FechaUltActualizacion: '',
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

const RequestGroupsAction = 'REQUEST_GroupS';
const GetGroupAction = 'GET_Group';
export const GetGroupsAction = 'GET_GroupS';
const GetGroupsByTypeAction = 'GET__GroupS_BY_TYPE';
const ReceiveGroupsAction = 'RECEIVE_Group';
const UpdateGroupAction = 'UPDATE_Group';
const UpdateContactGroups = 'UPDATE_CONTACT_GROUPS';
const CreateGroupAction = 'CREATE_Group';
const DeleteGroupAction = 'DELETE_Group';
const ErrorRequestGroupAction = 'ERROR_REQUEST_Group';
const TestAction = 'TEST';
const GetConfigContactGroups = 'GET_CONFIG_CONTACT_GROUPS';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
/*type KnownAction = RequestGroupsAction | UpdateGroupAction | GetGroupAction | ErrorRequestGroupAction
    | CreateGroupAction | ReceiveGroupsAction | DeleteGroupAction | GetGroupsAction
    | GetIncidentTypesAction | GetSessionAction | GetGroupsByTypeAction | HandleChangeImageAction
    | GetJobTitlesAction | TestAction;
*/
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
export const getGroups = () => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        dispatch({ type: RequestGroupsAction, IdGroup: 0 });
        try {
            const response = await fetch(`${url}api/VigitabletConfig/GetAllGroups`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const groups = await response.json();
                dispatch({ type: GetGroupsAction, groups });
            }
            else {
                dispatch({ type: ErrorRequestGroupAction, IdGroup: 0, response });
            }
        } catch (reason) {
            dispatch({ type: ErrorRequestGroupAction, IdGroup: 0, response: reason });
        }
    }
    else {
        console.log('no tiene token');
        dispatch({ type: GetGroupsAction, groups: [] });
    }
};
export const getGroupsByContract = (IdContract) => async (dispatch, getState) => {
    const access_token = getState().login.login.access_token;
    if (access_token) {
        const url = Settings.default.key.url;
        // if (IdIncidentType !== getState().groups.IdIncidentType) {
        dispatch({ type: RequestGroupsAction, IdGroup: 0 });
        const response = await fetch(url + `api/VigitabletConfig/GetGroupsByContract/${IdContract}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            }
        });
        if (response.ok) {
            const groups = await response.json();
            dispatch({ type: GetGroupsAction, groups });
        }
        else {
            dispatch({ type: ErrorRequestGroupAction, IdGroup: 0, response });
        }
    }
    else {
        dispatch({ type: GetGroupsAction, groups: [] });
    }
};

async function updateContactGroups(IdGroup, contactgroups, access_token) {
    if (access_token) {
        const url = Settings.default.key.url;
        const IdUsuario = Settings.default.key.user;
        const str = contactgroups.join(',');
        const searchParams = `IdGrupo=${IdGroup}&contactgroups=${str}&IdUsuario=${IdUsuario}`;
        //return({ type: RequestConfigControlPointAction, idContract: 0 });
        const response = await fetch(url + 'api/VigitabletConfig/UpdateContactGroups', {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'bearer ' + access_token
            },
            body: searchParams
        });
        if (response.ok) {
            contactgroups = await response.json();
            return { type: UpdateContactGroups, contactgroups };
        }
        else {
            return { type: 'ERROR_RESPONSE', response };
        }
    }
}

export const actionCreators = {
    setDefault: () => ({ type: 'GET_CONTACTS_BY_TYPE', IdIncidentType: 0, groups: [] }),
    getGroups: getGroups,
    getGroupsByContract: getGroupsByContract,
    getGroup: IdGroup => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //if (IdGroup !== getState().groups.IdGroup) {
            dispatch({ type: RequestGroupsAction, IdGroup: IdGroup });
            const response = await fetch(url + `api/VigitabletConfig/GetGroupById/${IdGroup}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            const data = await response.json();
            dispatch({ type: GetGroupAction, IdGroup: IdGroup, group: data });
            /*}).catch(reason => {
                dispatch({ type: ErrorRequestGroupAction, IdGroup: IdGroup, response: reason });
            });*/
        }
    },
    getGroupsByIncident: IdIncident => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //  if (IdIncident !== getState().groups.IdGroup) {
            dispatch({ type: RequestGroupsAction, IdGroup: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetAllsGroupsByIncident/${IdIncident}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const groups = await response.json();
                dispatch({ type: GetGroupsAction, groups });
            }
            else {
                dispatch({ type: ErrorRequestGroupAction, IdGroup: 0, response });
            }
        }
        else {
            return;
        }
        /*    }).catch(reason => {
                
            });*/
    },

    requestGroups: IdGroup => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)

        //    if (IdGroup !== getState().groups.IdGroup) {
        //        const response = await fetch(`api/VigitabletConfig/CreateGroup=${IdGroup}`)
        //        })const data = await response.json() as Promise<Group[]>)
        //            
        //                dispatch({ type: 'RECEIVE__CONTACTS', IdGroup: IdGroup, groups: data });
        //            });
        //        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        //        dispatch({ type: RequestGroupsAction, IdGroup: IdGroup });
        //    }
        //}
    },
    create: (objeto, contactgroups) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestGroupsAction, IdGroup: 0 });
            const response = await fetch(url + "api/VigitabletConfig/CreateGroup", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                const IdGroup = await response.json();
                objeto.IdGrupo = IdGroup;
                updateContactGroups(IdGroup, contactgroups, access_token);
                dispatch({ type: CreateGroupAction, group: objeto, IdGroup: IdGroup });
            }
            else {
                const IdGroup = 0;
                dispatch({ type: CreateGroupAction, group: objeto, response, IdGroup });
            }
        }
        else {
            return;
        }

    },
    update: (objeto, contactgroups) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const searchParams = Object.keys(objeto).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestGroupsAction, IdGroup: objeto.IdGroup });
            const response = await fetch(url + "api/VigitabletConfig/UpdateGroup", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                },
                body: searchParams
            });
            if (response.ok) {
                updateContactGroups(objeto.IdGrupo, contactgroups, access_token);
                dispatch({ type: UpdateGroupAction, group: objeto, response, IdGroup: objeto.IdGroup });
            }
            else {
                dispatch({ type: UpdateGroupAction, group: objeto, response, IdGroup: objeto.IdGroup });
            }
        }
    },
    delete: (group) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            dispatch({ type: RequestGroupsAction, IdGroup: group.IdGrupo });
            const response = await fetch(url + `api/VigitabletConfig/DeleteGroup/${group.IdGrupo}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/x-www-form-urlencoded",
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
            dispatch({ type: DeleteGroupAction, group: defaultGroup, response, IdGroup: group.IdGrupo });
            }
            else {
                dispatch({ type: DeleteGroupAction, group: defaultGroup, response, IdGroup: group.IdGrupop });
            }
        }
    },
   
    getSession: getSession,
    getJobTitles: getJobTitles,
    sendSMS: (objeto) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            let _sms = {
                sms: objeto.MensajeSMSIncidente,
                tlf: objeto.TelefonoGroupoIncidente
            };
            const searchParams = Object.keys(_sms).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(_sms[key]);

            }).join('&');
            const url = Settings.default.key.url;
            dispatch({ type: RequestGroupsAction, IdGroup: 0 });
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
    getConfigContactGroups: (IdGrupo) => async (dispatch, getState) => {
        const access_token = getState().login.login.access_token;
        if (access_token) {
            const url = Settings.default.key.url;
            //dispatch({ type: RequestConfigRoundsAction, IdRonda: 0 });
            const response = await fetch(url + `api/VigitabletConfig/GetConfigContactGroups/${IdGrupo}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + access_token
                }
            });
            if (response.ok) {
                const contactgroups = await response.json();
                dispatch({ type: GetConfigContactGroups, contactgroups });
            }
            else {
                dispatch({ type: GetConfigContactGroups, contactgroups: [] });
            }
        }
    },
    getContracts: getContracts,
    getContactsByContract: getContactsByContract,
    getContacts: getContacts,
    updateContactGroups: updateContactGroups
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState = {
    groups: [],
    isLoading: false,
    group: defaultGroup,
    response: defaultResponse,
    IdGroup: 0,
    incidentTypes: [],
    login: defaultLogin,
    jobtitles: [],
    contacts: [],
};

export const reducer = (state, action) => {
    state = state || unloadedState;
    switch (action.type) {
        case RequestGroupsAction:
            return {
                ...state,
                IdGroup: action.IdGroup,
                isLoading: true
            };
        case GetGroupAction:
            return {
                ...state,
                isLoading: false,
                IdGroup: action.IdGroup,
                group: action.group
            };
        case GetGroupsAction:
            return {
                ...state,
                isLoading: false,
                groups: action.groups
            };
        case ReceiveGroupsAction:
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.IdGroup === state.IdGroup) {
                return {
                    ...state,
                    //IdGroup: action.IdGroup,
                    //group: action.group,
                    isLoading: false

                };
            }
            break;
        case CreateGroupAction:
            return {
                ...state,
                IdGroup: action.IdGroup,
                group: action.group,
                isLoading: false
            };
        case UpdateGroupAction:
            return {
                ...state,
                IdGroup: action.IdGroup,
                group: action.group,
                isLoading: false
            };
        case DeleteGroupAction:
            return {
                ...state,
                group: action.group,
                response: action.response,
                isLoading: false
            };
        case ErrorRequestGroupAction:
            return {
                ...state,
                response: action.response,
                IdGroup: action.IdGroup,
                //group: action.group,
                isLoading: false
            };
        case GetIncidentTypesAction:
            return {
                ...state,
                incidentTypes: action.incidentTypes,
                isLoading: false
            };
        case GetSessionAction:
            return {
                ...state,
                isLoading: false,
                login: action.login
            };
        case GetGroupsByTypeAction:
            return {
                ...state,
                isLoading: false,
                groups: action.groups,
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
        case GetContactsAction:
            return {
                ...state,
                contacts: action.contacts
            };
        case UpdateContactGroups:
            return {
                ...state,
                isLoading: false,
                contactgroups: action.contactgroups
            };
        case GetConfigContactGroups:
            return {
                ...state,
                contactgroups: action.contactgroups
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    return state;
};