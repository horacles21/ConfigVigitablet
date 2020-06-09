import * as Settings from '../store/MyConfig';


export const GetAlarmActivationTypesAction = 'GET_ALARM_ACTIVATION_TyPES';

export const getAlarmActivationTypes = () => async (dispatch, getState) => {//(access_token: string): GetAlarmActivationTypesAction | void => {
    const access_token = getState().login.login.access_token;
    if (access_token !== '') {
        const url = Settings.default.key.url;
        const response = await fetch(url + `api/VigitabletConfig/GetAlarmActivationTypes`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        });
        const data = await response.json();
        dispatch({ type: GetAlarmActivationTypesAction, alarmactivationtypes: data });
    }
    else {
        dispatch({ type: GetAlarmActivationTypesAction, alarmactivationtypes: [] });
    }
};

