import {createStore, applyMiddleware} from "redux";
import reducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import sagas from "../sagas";
import thunk from "redux-thunk";

export default function configureStore() {

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducer,
        applyMiddleware(sagaMiddleware, thunk)
    )
    sagaMiddleware.run(sagas);
    return store;
}