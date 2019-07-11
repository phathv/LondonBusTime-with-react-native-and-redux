import { combineReducers } from 'redux';
import searchBus from "./BusReducers";
import loadStopPoint from "./StopPointReducers";
export default combineReducers({
    searchBus,
    loadStopPoint,
    //entities,
});
