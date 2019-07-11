import {fork} from "redux-saga/effects";
import searchBusSaga from "./SearchBusSaga";

export default function* rootSaga() {
    console.log('rootSaga!')
    yield fork(searchBusSaga);
}
