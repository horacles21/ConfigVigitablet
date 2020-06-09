import * as Settings from '../store/MyConfig';


export const GetAlarmCallingTypesAction = 'GET_ALARM_CALLING_TyPES';

export const getAlarmCallingTypes = () => async (dispatch, getState) => {//(access_token: string): GetAlarmActivationTypesAction | void => {
    const access_token = getState().login.login.access_token;
    if (access_token !== '') {
        const url = Settings.default.key.url;
        const response = await fetch(url + `api/VigitabletConfig/GetAlarmCallingTypes`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        });
        const data = await response.json();
        dispatch({ type: GetAlarmCallingTypesAction, alarmcallingtypes: data });
    }
    else {
        dispatch({ type: GetAlarmCallingTypesAction, alarmcallingtypes: [] });
    }
};