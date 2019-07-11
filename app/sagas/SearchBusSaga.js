// import React from 'react';
import {take, put, call, fork} from "redux-saga/effects";
import {REQUEST_SEARCH_BUS} from "../actions/actionTypes";
import {searchResultReceived, searchFailed} from "../actions/BusActions";


function fetchDataApi(busNum) {
    let url = `https://api.tfl.gov.uk/line/${busNum}/route/sequence/outbound`;
    console.log("fetchDataApi " + url)
    return fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            return data;
        })

}

function *watchSearchBusRequest() {
    while (true) {

        try {
            const {busNum} = yield take(REQUEST_SEARCH_BUS);
            const response = yield call(fetchDataApi, busNum);
            if (response.message != null && response.message.length > 0) {
                console.log('SAGA SEARCH ERR message: ', response.message);
                yield put(searchFailed(response.message));
            } else {
                console.log('SAGA SEARCH OK: ')
                let data = [];
                //loop array stopPointSequences to get all stoppoint array
                for (var i = 0; i < response.stopPointSequences.length; i++) {
                    data.push.apply(data, response.stopPointSequences[i].stopPoint);
                }
                yield put(searchResultReceived(data));
            }
        } catch (err) {
            console.log('SAGA SEARCH ERR: ', err);
            yield put(searchFailed(err.toString()));
        }
    }
}

export default function* root() {
    yield fork(watchSearchBusRequest);
}
