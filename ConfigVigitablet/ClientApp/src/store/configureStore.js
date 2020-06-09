import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as Accesses from './Access';
import * as ConfigControlPoints from './ConfigControlPoint';
import * as ConfigRounds from './ConfigRound';
import * as ConfigAlarms from './ConfigAlarm';
import * as ConfigRoundAlarms from './ConfigRoundAlarm';
import * as ConfigGeneral from './ConfigGeneral';
import * as ConfigIncidents from './ConfigIncident';
import * as ConfigTurns from './ConfigTurn';
import * as Contacts from './Contacts';
import * as Contracts from './Contracts';
import * as Routines from './Routines';
import * as Activities from './Activity';
import * as GuardEmployees from './GuardEmployeeInfo';
import * as Employees from './EmployeeInfo';
import * as Login from './Login';
import * as MaintenanceCompany from './MaintenanceCompany';
import * as Maps from './Maps';
import * as SurveillanceCompany from './SurveillanceCompany';
import * as RoundRecord from './RoundRecord';
import * as IncidentRecord from './IncidentRecord';
import * as IncidentType from './IncidentType';
import * as Group from './Group';
import * as AlarmEventType from './AlarmEventType';
import * as Area from './Area';
import * as ConfigGroupIncident from './ConfigGroupIncident';
import * as SpecialDate from './SpecialDate';
import * as DateType from './DateType';
import * as CallRecord from './CallRecord';
import * as NewsRecord from './NewsRecord';
import * as Geo from './Geo';



export default function configureStore(history, initialState) {
    const reducers = {
        access: Accesses.reducer,
        configalarm: ConfigAlarms.reducer,
        configcontrolpoint: ConfigControlPoints.reducer,
        configround: ConfigRounds.reducer,
        configroundalarm: ConfigRoundAlarms.reducer,
        contract: Contracts.reducer,
        contact: Contacts.reducer,
        guardemployee: GuardEmployees.reducer,
        employee: Employees.reducer,
        maintenancecompany: MaintenanceCompany.reducer,
        surveillancecompany: SurveillanceCompany.reducer,
        login: Login.reducer,
        map: Maps.reducer,
        configgeneral: ConfigGeneral.reducer,
        configincident: ConfigIncidents.reducer,
        configturn: ConfigTurns.reducer,
        roundrecord: RoundRecord.reducer,
        incidentrecord: IncidentRecord.reducer,
        incidenttypes: IncidentType.reducer,
        group: Group.reducer,
        alarmeventtype: AlarmEventType.reducer,
        area: Area.reducer,
        configgroupincident: ConfigGroupIncident.reducer,
        specialdate: SpecialDate.reducer,
        callrecord: CallRecord.reducer,
        newsrecord: NewsRecord.reducer,
        routine: Routines.reducer,
        activity: Activities.reducer,
        geo: Geo.reducer
    };

    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    const rootReducer = combineReducers({
        ...reducers,
        routing: routerReducer
    });

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}
