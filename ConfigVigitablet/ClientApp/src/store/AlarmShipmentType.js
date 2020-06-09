import * as Settings from '../store/MyConfig';


export const GetAlarmShipmentTypesAction = 'GET_ALARM_SHIPMENT_TyPES';

export const getAlarmShipmentTypes = () => async (dispatch, getState) => {//(access_token: string): GetAlarmActivationTypesAction | void => {
    const access_token = getState().login.login.access_token;
    if (access_token !== '') {
        const url = Settings.default.key.url;
        const response = await fetch(url + `api/VigitabletConfig/GetAlarmShipmentTypes`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'bearer ' + access_token
            }
        });
        const data = await response.json();
        dispatch({ type: GetAlarmShipmentTypesAction, alarmshipmenttypes: data });
    }
    else {
        dispatch({ type: GetAlarmShipmentTypesAction, alarmshipmenttypes: [] });
    }
};