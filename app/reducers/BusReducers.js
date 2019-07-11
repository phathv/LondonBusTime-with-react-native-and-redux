'use strict'

import {SET_SEARCH_NUMBER, REQUEST_SEARCH_BUS, SEARCH_BUS_RESULT, SEARCH_BUS_FAILED} from "../actions/actionTypes";

const initialSearchState = {
    error: '',
    isFetching: false,
    busNumber: '',
    result: {
        resultState: '',
        items: []
    }
}

const searchBus = (state = initialSearchState, action) => {
    try {
        switch (action.type) {
            case SET_SEARCH_NUMBER:
                console.log("SET_SEARCH_NUMBER");
                return Object.assign({}, state, {busNumber: action.busNum})
            case REQUEST_SEARCH_BUS:
                console.log("REQUEST_SEARCH_BUS");
                return Object.assign({}, state, {
                    isFetching: true, result: {
                        resultState: '',
                        items: []
                    }
                })
            case SEARCH_BUS_FAILED:
                console.log("SEARCH_BUS_FAILED " + action.message);
                return Object.assign({}, state, {
                    error: action.message,
                    isFetching: false,
                    result: {
                        resultState: SEARCH_BUS_FAILED,
                        items: [],

                    }
                })
            case SEARCH_BUS_RESULT:
                console.log("SEARCH_BUS_RESULT");
                console.log(action.data);
                return Object.assign({}, state, {
                    isFetching: false,
                    result: Object.assign({}, state.result, {
                        resultState: SEARCH_BUS_RESULT,
                        items: action.data

                    })
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
                resultState: SEARCH_BUS_FAILED,
                items: [],

            }
        })
    }

}

export default searchBus
