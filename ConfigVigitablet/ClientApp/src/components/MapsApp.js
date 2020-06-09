import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as MapsStore from '../store/Maps';
import { Modal } from '../components/Modal';
import { Mode, onlyNumbers, defaultResponse } from '../store/Utils';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { compose, withProps, lifecycle } from "recompose";
import { GeolocatedProps, geolocated, geoPropTypes } from 'react-geolocated';
import { BaseApp } from '../components/BaseApp';

const MyMapComponent = compose(
    //AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDmJ26j37f8vPmARpOlxesfTqhRajG__Pg&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};
            this.setState({
                position: null,
                /*onMarkerMounted: ref  => {
                    refs.marker = ref;
                },*/
                onPositionChanged: () => {
                    //const position = refs.marker.getPosition();
                    //console.log(position.toString());
                }
            });
        }
    }),
    withScriptjs,
    withGoogleMap)((props) =>
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
            {/*props.isMarkerShown &&*/ <Marker position={{ lat: -34.397, lng: 150.644 }} draggable={true} />}
        </GoogleMap>
        //{.../*ref={props.onMarkerMounted} onPositionChanged={props.onPositionChanged}*/}
    );

/*type MapsProps =
    MapsStore.MapState
    & typeof MapsStore.actionCreators
    & RouteComponentProps<{ id: string }>;
*/
class MapsApp extends BaseApp {

    state = {
        isMarkerShown: false
    }
    //coordinates
    componentWillMount() {
        // This method runs when the component is first added to the page
        try {
            super.componentWillMount();
            this.delayedShowMarker();
            //let idContract = 22;//parseInt(this.props.match.params.idContract) || 0;
            this.props.start();

            /*this.props.setModeRead();
            this.props.getConfigCallTypes();
            this.props.getConfigCalls(idContract);*/
            //this.

        } catch (reason) {
            console.log('Error in componentWillMount - ConfigCallApp:' + reason);
        }
    }
    componentWillReceiveProps(nextProps) {
        try {
            if (nextProps.login.access_token === '') {
                this.props.history.push('/login');
            }
            else {
                const response = nextProps.response;
                if (response !== defaultResponse) {
                    this.processResponse = false;
                    if (response) {
                        if (response.status) {
                            switch (response.status) {
                                case 200:
                                    this.processResponse = true;
                                    break;
                                case 400:
                                    alert(response.statusText);
                                    break;
                                case 401:
                                    this.props.history.push('/login');
                                    break;
                                default:
                                    break;
                            }

                        }
                        else {
                            alert("response.status SIN RESPUESTA");
                        }
                    }
                    else {
                        alert("response SIN RESPUESTA");
                    }
                }
                else {
                    this.processResponse = true;
                }
                if (this.props.response !== nextProps.response) {
                    console.log('nextProps.response = ' + nextProps.response.status);
                    this.setState({
                        response: nextProps.response
                    });
                }
                if (this.processResponse) {
                    this.updateList(nextProps);
                    this.procesarResponse(nextProps);
                }
            }
        }
        catch (reason) {
            const reason_ = reason;
            console.log(reason);
        }
    }

    updateList(nextProps) {
        if(this.props.lat !== nextProps.lat) {

        } 

        if (this.props.markers !== nextProps.markers) {
            this.setState({
                markers: nextProps.markers
            });
        } 
    }

    componentDidMount() {
        //this.interval = setInterval(() => this.setState({ time: Date.now() }), 1 * 60 * 1000);
    }

    shouldComponentUpdate(nextProps, nextState) {
        //this.props.start();
        return true;
    }


    componentWillUnmount() {
        clearInterval(this.interval);
    }
    interval = 1;
    procesarResponse(nextProps) {

    }
    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true });
        }, 3000);
    }
    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false });
        this.delayedShowMarker();
    }

    handleAdd(e) {
        const objeto = { latitude: 3, longitude: 4 }
        this.props.create(objeto);
    }
    /*componentWillReceiveProps(nextProps: ConfigCallProps) {
        // This method runs when incoming props (e.g., route params) change
        //let startDateIndex = parseInt(nextProps.match.params.startDateIndex) || 0;
        //this.props.requestConfigCalls(startDateIndex); vc v
        try {
            /*if (nextProps.login.access_token == '') {

                this.props.history.push('/login');
            }
            else {
                if (nextProps.configcalls !== this.props.configcalls) {
                    this.setState({
                        configcalls: nextProps.configcalls,
                    });
                    
                }
                if (nextProps.configcall !== this.props.configcall) {
                    let configcalls = this.state.configcalls;
                    var number_of_elements_to_remove = 1;
                    switch (this.state.mode) {
                        case Mode.Create:
                            configcalls.push(nextProps.configcall);
                            break;
                        case Mode.Update:
                            configcalls.splice(configcalls.indexOf(this.state.configcall_old), number_of_elements_to_remove, nextProps.configcall);
                            break;
                        case Mode.Delete:
                            configcalls.splice(configcalls.indexOf(this.state.configcall_old), number_of_elements_to_remove);
                            break;
                        default:
                            break;
                    }
                    this.setState({
                        configcalls: nextProps.configcalls,
                        mode: Mode.Read,
                    });
                }
                if (nextProps.response.status == '200') {
                    //const idContract = 22;
                    //this.props.getConfigCalls(idContract);
                }
               
            } 
        } catch (reason) {

        }
    }
    */
    renderGeo() {
        return /*!*/this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : /*!*/this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <table>
                <tbody>
                    <tr>
                        <td>latitude</td>
                        <td>{this.props.coords.latitude}</td>
                    </tr>
                    <tr>
                        <td>longitude</td>
                        <td>{this.props.coords.longitude}</td>
                    </tr>
                    <tr>
                        <td>altitude</td>
                        <td>{this.props.coords.altitude}</td>
                    </tr>
                    <tr>
                        <td>heading</td>
                        <td>{this.props.coords.heading}</td>
                    </tr>
                    <tr>
                        <td>speed</td>
                        <td>{this.props.coords.speed}</td>
                    </tr>
                </tbody>
            </table>
        ) : (
                        <div>Getting the location data&hellip; </div>
                    );
    }
    //BODY
    renderBody() {
        const markers = this.props.markers || [];
        const center = markers[0] || { latitude: 10.496, longitude: -66.8535 };
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            (<GoogleMap defaultZoom={18} defaultCenter={{ lat: Number(center.latitude), lng: Number(center.longitude) }}>
                {markers.map(marker => (/*props.isMarkerShown &&*/ <Marker position={{ lat: Number(marker.latitude), lng: Number(marker.longitude) }} />))}
            </GoogleMap>)
        ));
        /*return <div>
            label: {"Coordenadas:"}
            lattitude: {this.props.coords && this.props.coords.latitude}
        </div>;*/
        /*return !this.props.isGeolocationAvailable
            ? <div>Your browser does not support Geolocation</div>
            : !this.props.isGeolocationEnabled
                ? <div>Geolocation is not enabled</div>
                : this.props.coords
                    ? <table>
                        <tbody>
                            <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
                            <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
                            <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
                            <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
                            <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
                        </tbody>
                    </table>
                    : <div>Getting the location data&hellip; </div>;*/

        return (<section id="main"><MyMapComponent isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDmJ26j37f8vPmARpOlxesfTqhRajG__Pg&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />} />{this.renderGeo()}<button className="btn btn-lg bgm-OrangeSeguricel" /*width="120px" height="50px"*/ onClick={this.handleAdd.bind(this)}>Agregar</button></section>);// Map with a Marker*/
        //< MyMapComponent isMarkerShown = { false} />// Just only Map
        /*return <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
            {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
        </GoogleMap>;*/
    }
}
// Using Object.assign
MapsApp.propTypes = Object.assign({}, MapsApp.propTypes, geoPropTypes);
// Using ES6 object spread syntax
MapsApp.propTypes = { ...MapsApp.propTypes, ...geoPropTypes };
export default connect(
    state => state.map, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(MapsStore.actionCreators, dispatch)                  // Selects which action creators are merged into the component's props
)(MapsApp);