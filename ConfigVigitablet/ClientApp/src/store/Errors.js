import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface CounterState {
    //count: number;
    listdays: number[];
}
export interface AttrField {
    errorMessage: string, isRequired: boolean, valid: boolean, isEmpty: boolean
}
export interface Errors {
    [key: string]: AttrField
    ContactoEmp1: AttrField,
    ContactoEmp2: AttrField,
    IdParentescoEmp1: AttrField,
    IdParentescoEmp2: AttrField,
    TelefonosContactoEmp1: AttrField,
    TelefonosContactoEmp2: AttrField,
    EmailEmp: AttrField,
    DireccionEmp: AttrField,
    RutaImagenEmp: AttrField,
    IdEmpresaMantenimiento: AttrField,
    FechaUltActualizacion: AttrField,
    IdUsuario: AttrField
}
*/
export const defaultErrors = { errorMessage: "", isRequired: false, valid: true, isEmpty: false }
/*
export interface Touched {
    [key: string]: boolean
    ContactoEmp1: boolean,
    ContactoEmp2: boolean,
    IdParentescoEmp1: boolean,
    IdParentescoEmp2: boolean,
    TelefonosContactoEmp1: boolean,
    TelefonosContactoEmp2: boolean,
    EmailEmp: boolean,
    DireccionEmp: boolean,
    RutaImagenEmp: boolean,
    IdEmpresaMantenimiento: boolean,
    FechaUltActualizacion: boolean,
    IdUsuario: boolean
}
*/
export const ErrorClass = "form-control input-sm error";
export const DefaultClass = "form-control input-sm";
///////////////////////////////////////////////////////////////////////////////////
/*
                                <TextInput
                                    location={}
                                    match= {}
                                    uniqueName="EmailEmp"
                                    required={true}
                                    minCharacters={6}
                                    validate={this.validateEmail}
                                    errorMessage="Email is invalid"
                                    errorVisible={true}
                                    emptyMessage={"Email is required"}
                                    value="aaa"
                                    valid={true}
                                    isEmpty={false}/>
*/
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

//interface IncrementCountAction { type: 'INCREMENT_COUNT' }
//interface DecrementCountAction { type: 'DECREMENT_COUNT' }

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
//type KnownAction = IncrementCountAction /*| DecrementCountAction*/;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    increment: () => { type: 'INCREMENT_COUNT' },
    //decrement: () => { type: 'DECREMENT_COUNT' }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT_COUNT':
            console.log('counter - increment');
            return { ...state };

        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            //const exhaustiveCheck = action;
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || { count: 0 };
};
