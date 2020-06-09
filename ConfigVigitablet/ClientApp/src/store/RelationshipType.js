import * as Settings from '../store/MyConfig';
import * as Utils from '../store/Utils';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
/*
export interface RelationshipTypeState {
    relationships: RelationshipType[];
    response: Utils.Resp;
    isLoading: boolean;
}

export interface RelationshipType {
    [key: string]: any
    IdParentesco: number;
    DescParentesco: string;
}
*/
export const getRelationship = async (access_token) => {
    const url = Settings.default.key.url;
    const response = await fetch(url + 'api/RelationshipType/GetAll', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'bearer ' + access_token
        }
    });
    const data = await response.json();
    return data;

};
// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.
//interface RequestRelationshipTypeAction { type: 'REQUEST_RELATIONSHIPS', isLoading: boolean, response: Utils.Resp, relationships: RelationshipType[]}
//interface ErrorRequestAction { type: 'ERROR_REQUEST', response: Utils.Resp, isLoading: boolean, relationships: RelationshipType[]}
//interface GetRelationshipTypesAction { type: 'GET_RELATIONSHIPS', relationships: RelationshipType[], isLoading: boolean, response: Utils.Resp,}

//// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
//// declared type strings (and not any other arbitrary string).
//type KnownAction = /*ErrorRequestAction |*/ GetRelationshipTypesAction /*| RequestRelationshipTypeAction;*/;

//// ----------------
//// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
//// They don't directly mutate state, but they can have external side-effects (such as loading data).

//export const actionRelationshipType = {
//    getRelationship: () => async(dispatch, getState) => {
//        const url = Settings.default.key.url;
//        const response = await fetch(url + 'api/RelationshipType/GetAll', {
//            method: "GET",
//            headers: {
//                'Accept': 'application/json',
//                'Authorization': 'bearer ' + getState().login.login.access_token,
//            },
//        })
//            const data = await  response.json() as Promise<RelationshipType[]>)
//            
//                dispatch({ type: 'GET_RELATIONSHIPS', response: Utils.defaultResponse, relationships: data, isLoading: false });
//            }).catch(reason => {
//                dispatch({ type: 'GET_RELATIONSHIPS', response: reason, relationships:[], isLoading: false  })
//            });


//        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete



//    },
//};

//// ----------------
//// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

//export const reducer: Reducer<RelationshipTypeState> = (state: RelationshipTypeState, action: KnownAction) => {
//    const defaultResponse = Utils.defaultResponse;
//    switch (action.type) {
//        //case 'ERROR_REQUEST':
//        //    return {
//        //        relationships: [],
//        //        response: action.response,
//        //        isLoading: false,
//        //    };
//        case 'GET_RELATIONSHIPS':
//            return {
//                response: action.response,
//                relationships: action.relationships,
//                isLoading: false,
//            };
//        //case 'REQUEST_RELATIONSHIPS':
//        //    return {
//        //        response: defaultResponse,
//        //        relationships: state.relationships,
//        //        isLoading: true,
//        //    };
//        default:

//            // The following line guarantees that every action in the KnownAction union has been covered by a case above
//            //const exhaustiveCheck = action;
//    }

//    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
//    //  (or default initial state if none was supplied)
//    return state || { isLoading: false, relationships:[], response: Utils.defaultResponse  };
//};
