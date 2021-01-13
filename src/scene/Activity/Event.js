
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';

import { Button, BottomSheet } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import HeaderNavbar from '../../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../../components/MenuFooter'
import EventPost from '../../components/EventPost'

export default class Activity extends Component {
    state = {
        visibleSearch: false
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ padding: hp('2%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#003764' }}>
                        <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                        <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Event</Text>
                        <Icon name="magnify" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                    </View>
                    <View style={{ backgroundColor: '#F9FCFF', paddingBottom: hp('8%') }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: hp('2%'),
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>Event</Text>
                            <Icon name="compare-vertical" size={hp('3%')} color="#707070" />
                        </View>

                        {/* calendar*/}

                        {/* end calendar */}

                        <View>
                            <View style={{ ...style.container }}>
                                <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>My events(1)</Text>
                            </View>
                            <View style={{ marginTop: hp('2%') }}>
                                <EventPost></EventPost>
                            </View>

                            <View style={{ ...style.container, marginTop: hp('2%') }}>
                                <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>All events(2)</Text>
                            </View>
                            <View style={{ marginTop: hp('2%') }}>
                                <EventPost></EventPost>
                                <EventPost></EventPost>
                            </View>
                        </View>




                    </View>
                </ScrollView>
                <MenuFooter></MenuFooter>
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    imageLogo: {
        height: hp('15%'),
        width: hp('23%')
    },
    textWelcome: {
        textAlign: 'center',
        fontSize: hp('2%'),
        color: '#003764'
    },
    inputCustom: {
        height: hp('5%'),
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: hp('1%')
    },
    shadowCard: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
});


