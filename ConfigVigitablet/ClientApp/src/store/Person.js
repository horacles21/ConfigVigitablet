import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface CounterState {
    //count: number;
    listdays: number[];
    response: Utils.Resp;
}*/
/*
export interface Person {
    [key: string]: any
    IdPersona: number;
    IdDocIdentidad: string;
    IdTipoIdentificacion: number;
    TipoIdentificacion: string;
    PrimerApellido: string;
    SegundoApellido: string;
    PrimerNombre: string;
    SegundoNombre: string;
    FechaNacimiento: string;
    Email: string;
    DireccionHabitacion: string;
    DireccionOficina: string;
    TelefonoHabitacion: string;
    TelefonoOficina: string;
    TelefonoMovil1: string;
    TelefonoMovil2: string;
    TelefonoMovil3: string;
    Imagen: ByteString;
    TipoPersonalSC: string;
    IdUsuarioCrea: number;
    UsuarioCrea: string;
    FechaUltActualizacion: string;
}*/

export const defaultPerson = {
    IdPersona: 0,
    IdDocIdentidad: '',
    IdTipoIdentificacion: 1,
    TipoIdentificacion: '',
    PrimerApellido: '',
    SegundoApellido: '',
    PrimerNombre: '',
    SegundoNombre: '',
    FechaNacimiento: '',
    Email: '',
    DireccionHabitacion: '',
    DireccionOficina: '',
    TelefonoHabitacion: '',
    TelefonoOficina: '',
    TelefonoMovil1: '',
    TelefonoMovil2: '',
    TelefonoMovil3: '',
    Imagen: '',
    TipoPersonalSC: '',
    IdUsuarioCrea: 0,
    UsuarioCrea: '',
    FechaUltActualizacion: new Date().toISOString().split('T')[0]
};


// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

const CreatePersonAction = 'CREATE_PERSON';
const ErrorCreatePersonAction = 'ERROR_CREATE_PERSON';

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
//type KnownAction = CreatePersonAction | ErrorCreatePersonAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const create = async (objeto, token) => {
    const searchParams = Object.keys(objeto).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
    }).join('&');
    const response = await fetch(Settings.default.key.url + "api/person/Create", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'bearer ' + token
        },
        body: searchParams
    });
    return response;
    //if (response.ok) {
    //    return response;
        //const data = await response.json();
        //return data;
    //}
};

export const update = async (objeto, token) => {
    const searchParams = Object.keys(objeto).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
    }).join('&');
    const response = await fetch(Settings.default.key.url + "api/person/Update", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'bearer ' + token
        },
        body: searchParams
    });
    //const data = await response.json();
    return response;
    /*}).catch(reason => {
        console.log('Get Token Error: ' + reason);
        return reason;
    });*/
};
export const actionCreators = {
    create: (objeto) => (dispatch, getState) => {
        const searchParams = Object.keys(objeto).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]);
        }).join('&');
        let params = {
            url: Settings.default.key.url,
            action: "api/person/Create",
            method: "POST",
            access_token: getState().login.login.access_token,
            searchParams: searchParams
        };
        let response = Utils.defaultResponse;
        let fetchTask = Utils.exec(params).then(val => {
            console.log(JSON.stringify(val));
            //response = JSON.parse(JSON.stringify(val));
            response = val;
            console.log(response.status + ": " + response.statusText);
            dispatch({ type: 'CREATE_PERSON', response: response });
        }).catch(reason => {
            console.log('Error in create:' + reason);
            dispatch({ type: 'ERROR_CREATE_PERSON', response: reason });
        });

    }
    //decrement: () => <DecrementCountAction>{ type: 'DECREMENT_COUNT' }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state, incomingAction) => {
    const action = incomingAction;
    switch (action.type) {
        case 'CREATE_PERSON':
            console.log('CREATE PERSON');
            return {
                ...state,
                response: action.response
            };
        case 'ERROR_CREATE_PERSON':
            return {
                ...state,
                response: action.response
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { count: 0, response: Utils.defaultResponse };
};
