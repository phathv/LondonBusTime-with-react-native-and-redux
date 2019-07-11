'use strict'

import {LOAD_STOPPOINT_STARTED, LOAD_STOPPOINT_RESULT, LOAD_STOPPOINT_FAILED} from "../actions/actionTypes";

const initialSearchState = {
    error: '',
    isFetching: false,
    busNumber: '',
    result: {
        resultState: '',
        items: []
    }
}

const loadStopPoint = (state = initialSearchState, action) => {
    try {
        switch (action.type) {
            case LOAD_STOPPOINT_STARTED:
                console.log("LOAD_STOPPOINT_STARTED");
                return Object.assign({}, state, {
                    isFetching: true,
                    result: Object.assign({}, state.result, {
                        items: [],

                    })
                })
            case LOAD_STOPPOINT_RESULT:
                console.log("LOAD_STOPPOINT_RESULT");
                console.log(action.data);

                return Object.assign({}, state, {
                    isFetching: false,
                    result: Object.assign({}, state.result, {
                        resultState: LOAD_STOPPOINT_RESULT,
                        items: action.data,

                    })
                })
            case LOAD_STOPPOINT_FAILED:
                console.log("LOAD_STOPPOINT_FAILED " + action.message);
                return Object.assign({}, state, {
                    error: action.message,
                    isFetching: false,
                    result: {
                        resultState: LOAD_STOPPOINT_FAILED,
                        items: [],

                    }
                })
            default:
                return state
        }
    } catch (err) {
        console.log("exception " + err);
        return Object.assign({}, state, {
            error: err,
            isFetching: false,
            result: {
                resultState: LOAD_STOPPOINT_FAILED,
                items: [],

            }
        })
    }

}

export default loadStopPoint
