/**
 * Created by phathv on 11/9/2016.
 */
'use strict'
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native";
import {searchBusStarted, setSearchBusNum} from "../actions/BusActions";
import {connect} from "react-redux";
import {SEARCH_BUS_RESULT, SEARCH_BUS_FAILED} from "../actions/actionTypes";
import {BUS_STOP_PAGE} from "../components/Constants";
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F1F1F1',
        paddingTop: 100,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelText: {
        fontSize: 20,
        color: 'red',
        margin: 5,
        alignSelf: 'center'
    },
    searchInput: {
        marginTop: 20,
        padding: 10,
        width: 280,
        height: 90,
        color: 'orange',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 50,
        fontWeight: 'bold',
        textAlign : 'center',
        alignSelf: 'center'
    },
    buttonBg: {
        width: 280,
        marginTop: 20,
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 5

    },
    btnText: {
        fontSize: 35,
        color: 'red',
        margin: 5,
        alignSelf: 'center'
    },
    indicatorContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    preload: {
        marginTop: 20,
        height: 50,
        width: 50,
    },
    guideContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        margin: 5,
        alignSelf: 'center'
    },
})

class Home extends Component {
    //init component state
    state = {
        busNumber: ''
    }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //handle submit search when user press button search or submit key on keyboard
    handleSubmit() {
    	if(this.props.data.isFetching)
    		return
        const {busNumber} = this.state;
        console.log("handleSubmit " + busNumber);
        if (busNumber.length > 0) {
            this.props.dispatch(searchBusStarted(busNumber));
            this.props.dispatch(setSearchBusNum(busNumber))
        }


    }

    //handle search result from reducer if success then display the result
    componentWillReceiveProps(nextProps) {
        const {busNumber} = this.props.data.busNumber;
        if (nextProps.data.result.resultState == SEARCH_BUS_RESULT) {
            this.props.navigator.push({name: BUS_STOP_PAGE, busNumber: busNumber})
        }
    }

    render() {
        const {busNumber} = this.state;
        return (
            <View style={styles.container}>

                <View style={styles.indicatorContainer}>
                    {	//show progressbar if searching
                        this.props.data.isFetching ?
                            <ActivityIndicator
                                style={styles.preload}
                                animating={this.props.data.isFetching}
                                color="#111"
                                size="large"/> : <View />
                    }
                </View>
                <View style={styles.guideContainer}>
                    {	//show error message
                        this.props.data.result.resultState == SEARCH_BUS_FAILED ?
                            <Text style={styles.errorText}>{this.props.data.error}</Text> : <View />
                    }
                </View>
                <Text>Enter bus number</Text>
                <TextInput
                    style={styles.searchInput}
                    value={busNumber}
                    keyboardType={'numeric'}
                    onChangeText={busNumber => this.setState({busNumber})}
                    onSubmitEditing={this.handleSubmit}
                />

                <TouchableOpacity onPress={this.handleSubmit}>
                    <View style={styles.buttonBg}>
                        <Text style={styles.btnText}>Search</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.searchBus,
    };
}

export default connect(mapStateToProps)(Home)
