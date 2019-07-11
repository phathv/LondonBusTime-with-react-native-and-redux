import {LOAD_STOPPOINT_STARTED, LOAD_STOPPOINT_RESULT, LOAD_STOPPOINT_FAILED} from "./actionTypes";

export const loadStopPoint = (id, busNum) => (dispatch) => _loadStopPoint(dispatch, id, busNum)
const loadStopPointStarted = (id) => ({type: LOAD_STOPPOINT_STARTED, id})
const loadResultReceived = (data) => ({type: LOAD_STOPPOINT_RESULT, data})
const loadFailed = (message) => ({type: LOAD_STOPPOINT_FAILED, message})

const _loadStopPoint = (dispatch, id, busNum) => {
    dispatch(loadStopPointStarted(id))

    let url = `https://api.tfl.gov.uk/StopPoint/${id}/arrivals`;
    console.log(url);
    return fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            return data;
        })
        .then((data) => {
            let stopPoint;
            let stopPointArray = [];
			//only show the bus number we searched for
            for (var i = 0; i < data.length; i++) {
                stopPoint = data[i];
                if (stopPoint.lineId == busNum) {
                    stopPointArray.push(stopPoint);
                }
            }
			//ordered by the earliest arrival time 
            if (stopPointArray != null) {
                stopPointArray.sort((a, b) => (parseInt(a.timeToStation) - parseInt(b.timeToStation)));
            }
            dispatch(loadResultReceived(stopPointArray))
        })
        .catch((err) => {
            console.log(err);
            dispatch(loadFailed(err))

        })
}

