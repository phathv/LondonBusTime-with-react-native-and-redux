'use strict';

import React, {Component} from "react";
import {Navigator, View, StyleSheet} from "react-native";
import BusStops from "./BusStops";
import Home from "./Home";
import StopPoints from "./StopPoints";
import {HOME_PAGE, BUS_STOP_PAGE, STOP_POINT_PAGE} from "../components/Constants";
class BusArrivalTimeApp extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <Navigator
                style={{flex: 1}}
                initialRoute={{name: HOME_PAGE}}
                renderScene={ this.renderScene }/>

        );
    }

    renderScene(route, navigator) {
        if (route.name == HOME_PAGE) {
            return <Home navigator={navigator}/>
        }
        else if (route.name == BUS_STOP_PAGE) {
            return <BusStops navigator={navigator} busNum={route.busNumber}/>
        }
        else if (route.name == STOP_POINT_PAGE) {
            return <StopPoints busNum={route.busNumber} id={route.id}
                               navigator={navigator} title={route.title}/>
        }
    }
}

export default BusArrivalTimeApp;
