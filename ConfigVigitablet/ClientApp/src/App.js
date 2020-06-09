import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import LoginPage from './components/LoginPage';
import ConfigAlarmApp from './components/ConfigAlarmApp';
import ConfigControlPointApp from './components/ConfigControlPointApp';
import ConfigRoundApp from './components/ConfigRoundApp';
import EmployeeInfoApp from './components/EmployeeInfoApp';
import GuardEmployeeInfoApp from './components/GuardEmployeeInfoApp';
import AccessApp from './components/AccessApp';
import ContractsApp from './components/ContractsApp';
import ContactsApp from './components/ContactsApp';
import ConfigRoundAlarmApp from './components/ConfigRoundAlarmApp';
import MaterialUI from './components/MaterialUI';
import MapsApp from './components/MapsApp';
import ConfigGeneral from './components/ConfigGeneralApp';
import ConfigIncidentApp from './components/ConfigIncidentApp';
import IncidentTypesApp from './components/IncidentTypesApp';
//import ConfigDeviceApp from './components/ConfigDeviceApp';
import ServiceUnitManagementApp from './components/ServiceUnitManagementApp';
import SurveillanceCompanyApp from './components/SurveillanceCompanyApp';
import MaintenanceCompanyApp from './components/MaintenanceCompanyApp';
import RoundRecordApp from './components/RoundRecordApp';
import IncidentRecordApp from './components/IncidentRecordApp'; 
import ConfigTurnApp from './components/ConfigTurnApp'; 
import GroupApp from './components/GroupApp';
import AlarmEventTypeApp from './components/AlarmEventTypeApp';
import AreaApp from './components/AreaApp';
import ConfigGroupIncidentApp from './components/ConfigGroupIncidentApp';
import SpecialDateApp from './components/SpecialDateApp';
import CallRecordApp from './components/CallRecordApp';
import GeoApp from './components/GeoApp';
import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
        <Route path='/login/' component={LoginPage} />
        <Route path='/configcontrolpoint/' component={ConfigControlPointApp} />
        <Route path='/configgroupincident/' component={ConfigGroupIncidentApp} />
        <Route path='/configround/' component={ConfigRoundApp} />
        <Route path='/guardemployee/:id?' component={GuardEmployeeInfoApp} />
        <Route path='/employee/:id?' component={EmployeeInfoApp} />
        <Route path='/access/' component={AccessApp} />
        <Route path='/contract/' component={ContractsApp} />
        <Route path='/contact/' component={ContactsApp} />
        <Route path='/configalarm/' component={ConfigAlarmApp} />
        <Route path='/configroundalarm/' component={ConfigRoundAlarmApp} />
        <Route path='/materialui/' component={MaterialUI} />
        <Route path='/map/' component={MapsApp} />
        <Route path='/configgeneral/:entity?' component={ConfigGeneral} />
        <Route path='/configincident/:id?' component={ConfigIncidentApp} />
        <Route path='/incidenttypes/' component={IncidentTypesApp} />
        <Route path='/serviceunitmanagements/:IdContract?/:IdUnit?' component={ServiceUnitManagementApp} />
        <Route path='/surveillancecompany/:id?' component={SurveillanceCompanyApp} />
        <Route path='/maintenancecompany/:id?' component={MaintenanceCompanyApp} />
        <Route path='/roundrecord' component={RoundRecordApp} />
        <Route path='/incidentrecord' component={IncidentRecordApp} />
        <Route path='/configturn/' component={ConfigTurnApp} />
        <Route path='/group/' component={GroupApp} />
        <Route path='/alarmeventtype/' component={AlarmEventTypeApp} />
        <Route path='/area/' component={AreaApp} />
        <Route path='/specialdate/' component={SpecialDateApp} />
        <Route path='/callrecord/' component={CallRecordApp} />
        <Route path='/geo/' component={GeoApp} />
    </Layout>
);
