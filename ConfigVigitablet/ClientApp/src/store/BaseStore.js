const requestSettingsType = 'REQUEST_SETTING';
const receiveSettingsType = 'RECEIVE_SETTING';
const initialState = { settings: [], isLoading: false };

export const /*actionCreators = {*/
    requestSettings = () => async (/*dispatch, getState*/) => {
        try {
            /*if (startDateIndex === getState().settings.startDateIndex) {
                // Don't issue a duplicate request (we already have or are loading the requested data)
                return;
            }*/

            //dispatch({ type: requestSettingsType, startDateIndex });
            const url = `settings/Setting/GetUrl`;
            const response = await fetch(url);
            const settings = await response.json();
        } catch (reason) {
            console.log("Error en rquessettings:" + reason);
        }

        //dispatch({ type: receiveSettingsType, settings });
    };
//};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestSettingsType) {
        return {
            ...state,
            startDateIndex: action.startDateIndex,
            isLoading: true
        };
    }

    if (action.type === receiveSettingsType) {
        return {
            ...state,
            startDateIndex: action.startDateIndex,
            settings: action.settings,
            isLoading: false
        };
    }

    return state;
};
