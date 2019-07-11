/**
 * Created by phathv on 11/9/2016.
 */
import React, {Component} from "react";
import {ListView, StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import Row from "../components/BusStopItem";
import {connect} from "react-redux";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginTop: 5
    },
    topBarContainer: {
        flexDirection: 'row',
        height: 50,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'red'
    },

    backIcon: {
        paddingLeft: 10,
        alignItems: 'center',
        width: 20,
        height: 20
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20
    },
    guideContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    guideText: {
        color: 'red',
        fontSize: 25,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center'
    },

});

class BusStops extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.data.result.items),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.ds.cloneWithRows(nextProps.data.result.items)
        })
    }


    render() {

        return (
            <View style={styles.mainContainer}>
                <View style={styles.topBarContainer}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigator.pop()
                    }}>
                        <Image style={styles.backIcon}
                               source={require('./../components/icons/btn-back.png')}>
                        </Image>
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Select Stop</Text>
                    </View>
                </View>
                <View style={styles.guideContainer}>
                    <Text style={styles.guideText}>
                        {"Stops for " + this.props.data.busNumber}</Text>
                </View>
                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(dataRow) => <Row {...dataRow} navigator={this.props.navigator}
                                                 busNum={this.props.data.busNumber}/>}
                    renderSeparator={this._renderSeparator}
                />
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{
                    height: adjacentRowHighlighted ? 4 : 1,
                    backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
                }}
            />
        );
    }

}


function mapStateToProps(state) {
    return {
        data: state.searchBus,
    };
}

export default connect(mapStateToProps)(BusStops);
