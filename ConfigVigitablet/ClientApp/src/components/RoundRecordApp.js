import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RoundRecordStore from '../store/RoundRecord';
import { BaseApp } from '../components/BaseApp';

/*type RoundRecordProps =
    RoundRecordStore.RoundRecordState
    & typeof RoundRecordStore.actionCreators
    & RouteComponentProps<{}>;
*/
class RoundRecordApp extends BaseApp {
    state = {
        ... this.defaultState,
        objeto: "roundrecord",
        listObjetos: "roundrecords",
        defaultObjeto: RoundRecordStore.defaultRoundRecord,
        roundrecords: [],
        roundrecord: RoundRecordStore.defaultRoundRecord,
        roundrecord_old: RoundRecordStore.defaultRoundRecord,
        fieldList: {
            Contrato: { ...this.defaultField, description: "Contrato" },
            FechaRonda: { ...this.defaultField, description: "Fecha Ronda" },
            IdRonda: { ...this.defaultField, description: "IdRonda" },
            IdPuntoControl: { ...this.defaultField, description: "" },
            OrdenRonda: { ...this.defaultField, description: "" },
            ImagenLluviaQR: { ...this.defaultField, description: "" },
        },
        isVisibleAddButton: false
    }

    componentWillMount() {
        try {
            this.props.getSession();
            const searchVigitabletRounds = {
                IdContract: 0,
                IdRound: undefined,
                FromRoundDate: undefined,
                ToRoundDate: undefined
            };
            this.props.getRoundRecords(searchVigitabletRounds);
        } catch (reason) {
            console.log('Error in componentWillMount - RoundRecordApp:' + reason);
        }
    }

    renderListBody(roundrecords) {
        return (roundrecords.map((roundrecord, index) =>
            (<tr key={index}>
                <td>{roundrecord.Contrato}</td>
                <td>{roundrecord.FechaRonda}</td>
                <td>{roundrecord.IdRonda}</td>
                <td>{roundrecord.IdPuntoControl}</td>
                <td>{roundrecord.OrdenRonda}</td>
                <td>{roundrecord.ImagenLluviaQR}</td>
            </tr>)
        ));
    }
}

// Wire up the React component to the Redux store
export default connect(
    state => state.roundrecord, // Selects which state properties are merged into the component's props
    dispatch => bindActionCreators(RoundRecordStore.actionCreators, dispatch)                 // Selects which action creators are merged into the component's props, 
)(RoundRecordApp);