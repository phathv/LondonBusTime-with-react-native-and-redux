/**
 * Created by phathv on 11/9/2016.
 */
import React, {Component} from "react";
import {View, Text, StyleSheet, Image, TouchableHighlight} from "react-native";
import {STOP_POINT_PAGE} from "../components/Constants";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }

});

class BusStopRow extends Component {
    constructor(props) {
        super(props);
        this._onSelectItem = this._onSelectItem.bind(this);
    }

    render() {
        return (
            <TouchableHighlight onPress={this._onSelectItem}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            {this.props.name}
                        </Text>
                    </View>

                </View>
            </TouchableHighlight>
        );
    }

    _onSelectItem() {
        const {navigator} = this.props;
        navigator.push({
            name: STOP_POINT_PAGE,
            title: this.props.name,
            busNumber: this.props.busNum,
            id: this.props.id
        });
    }

}

export default BusStopRow;