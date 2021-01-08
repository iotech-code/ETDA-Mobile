
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


export default class Activity extends Component {
    state = {
        visibleSearch: false
    }
    render() {
        const { dataList } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: hp('4.5%') }}>
                <StatusBar barStyle="dark-content" />
                <View style={{ flex: 1, paddingBottom: hp('10%') }}>
                    <HeaderNavbar></HeaderNavbar>
                    <View style={{ ...style.container, marginTop: hp('4%') }}>
                        <View style={{
                            padding: hp('2%'),
                            borderRadius: 10,
                            backgroundColor: '#003764'
                        }}>
                            <Text style={{ fontSize: hp('2%'), color: 'white', textAlign: 'center' }}>
                                Event
                            </Text>
                            <Icon name="account-plus" color="white" style={{
                                textAlign: 'center',
                                marginTop: hp('2%')
                            }} size={hp('6%')} />
                            <Text style={{
                                fontSize: hp('1.2%'),
                                marginTop: hp('2%'),
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: '300'

                            }}>
                                Lorem ipsum dolor sit amet, consetetur
                            </Text>
                        </View>

                        <View style={{
                            padding: hp('2%'),
                            borderRadius: 10,
                            backgroundColor: '#003764',
                            marginTop: hp('2%')
                        }}>
                            <Text style={{ fontSize: hp('2%'), color: 'white', textAlign: 'center' }}>
                                Event
                            </Text>
                            <Icon name="checkbox-marked-outline" color="white" style={{
                                textAlign: 'center',
                                marginTop: hp('2%')
                            }} size={hp('6%')} />
                            <Text style={{
                                fontSize: hp('1.2%'),
                                marginTop: hp('2%'),
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: '300'

                            }}>
                                Lorem ipsum dolor sit amet, consetetur
                            </Text>
                        </View>

                        <View style={{
                            padding: hp('2%'),
                            borderRadius: 10,
                            backgroundColor: '#003764',
                            marginTop: hp('2%')
                        }}>
                            <Text style={{ fontSize: hp('2%'), color: 'white', textAlign: 'center' }}>
                                Event
                            </Text>
                            <Icon name="flag" color="white" style={{
                                textAlign: 'center',
                                marginTop: hp('2%')
                            }} size={hp('6%')} />
                            <Text style={{
                                fontSize: hp('1.2%'),
                                marginTop: hp('2%'),
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: '300'

                            }}>
                                Lorem ipsum dolor sit amet, consetetur
                            </Text>
                        </View>
                    </View>
                </View>
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


