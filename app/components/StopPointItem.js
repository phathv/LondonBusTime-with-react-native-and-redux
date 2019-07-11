/**
 * Created by phathv on 11/9/2016.
 */
import React, {Component} from "react";
import {View, Text, StyleSheet, Image, TouchableHighlight} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 6,

    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    redText: {
        color: 'red',
        marginLeft: 12,
        fontSize: 20,
        fontWeight: 'bold'
    },
    text: {
        flex: 8,
        marginLeft: 12,
        fontSize: 16,
    },
    blueText: {
        flex: 2,
        marginLeft: 12,
        fontSize: 16,
        color: '#87CEFA'
    },
});

class StopPointRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let date = new Date(this.props.expectedArrival);
        let hour = date.getHours();
        let min = date.getMinutes();
        let minToSt = Math.floor(this.props.timeToStation / 60);
        let secToSt = this.props.timeToStation % 60;
        return (
            <View style={styles.container}>

                <View style={styles.textContainer}>
                    <Text style={styles.redText}>
                        {this.props.busNumber}
                    </Text>
                    <View style={styles.container}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>
                                {this.props.destinationName}
                            </Text>
                            <Text style={styles.blueText}>
                                {" " + hour + ":" + min}
                            </Text>
                        </View>
                        <Text style={styles.blueText}>
                            {minToSt + " min " + secToSt}
                        </Text>
                    </View>
                </View>

            </View>
        );
    }

}

export default StopPointRow;