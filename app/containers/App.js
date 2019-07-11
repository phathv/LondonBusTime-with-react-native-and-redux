import React, {Component} from "react";
import {Provider} from "react-redux";
import BusArrivalTimeApp from "./BusArrivalTimeApp";
import configureStore from '../store/configureStore';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            store: configureStore(),
        };
    }
    render() {
        return (
            <Provider store={this.state.store}>
                <BusArrivalTimeApp />
            </Provider>
        );
    }
}


