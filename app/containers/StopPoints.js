/**
 * Created by phathv on 11/9/2016.
 */
import React, {Component} from "react";
import {ListView, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import Row from "../components/StopPointItem";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadStopPoint} from "../actions/StopPointActions";

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
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center'
    },

    backIcon: {
        paddingLeft: 10,
        width: 20,
        height: 20
    },
    titleContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'red',
        fontSize: 20,
        justifyContent: 'center',

    },
    homeIcon: {
        marginRight: 10,
        paddingRight: 10,
        width: 20,
        height: 20
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
    emptyDataContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    emptyData: {
        color: 'gray',
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',

    }
});

class StopPoints extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.data.result.items),
        };
    }

    componentWillMount() {
        const {id, busNum} = this.props;
        this.props.loadStopPoint(id, busNum);
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
                        <Text style={styles.title}
                              numberOfLines={1}>{this.props.title}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.props.navigator.pop();
                        this.props.navigator.pop()
                    }}>
                        <Image style={styles.homeIcon}
                               source={require('./../components/icons/btn-home.png')}>
                        </Image>
                    </TouchableOpacity>
                </View>


                {	//show progressbar when loading data
                    this.props.data.isFetching ?
                        <View style={styles.indicatorContainer}>
                            <ActivityIndicator
                                style={styles.preload}
                                animating={this.props.data.isFetching}
                                color="#111"
                                size="large"/>
                        </View> :
                        <View style={styles.container}>
                            {
                                //display data if available or show message if empty data
                                this.state.dataSource.getRowCount() > 0 ?
                                    <ListView
                                        style={styles.container}
                                        dataSource={this.state.dataSource}
                                        renderRow={(dataRow) => <Row {...dataRow} busNumber={this.props.busNum}/>}
                                        renderSeparator={this._renderSeparator}
                                    /> :
                                    <View style={styles.emptyDataContainer}>
                                        <Text style={styles.emptyData}> Data not found :(</Text>
                                    </View>
                            }
                        </View>
                }
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


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadStopPoint,
    }, dispatch)

}

function mapStateToProps(state) {
    return {
        data: state.loadStopPoint,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StopPoints);
