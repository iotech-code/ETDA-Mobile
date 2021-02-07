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
    FlatList,
    KeyboardAvoidingView,
    AsyncStorage,
} from 'react-native';

import { Button, BottomSheet } from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import style from '../styles/base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterail from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import HeaderNavbar from '../components/Navbar';
import { Fragment } from 'react';
import { apiServer } from '../constant/util';
export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataEvent: [
                {
                    imageAvatar: require('../assets/images/default_avatar.jpg'),
                    title: 'Events Topic',
                    time: '11/02/2020  3:30 pm'
                },
                {
                    imageAvatar: require('../assets/images/default_avatar.jpg'),
                    title: 'Events Topic',
                    time: '11/02/2020  5:30 pm'
                }
            ],
            dataNoti: [
                {
                    imageAvatar: require('../assets/images/default_avatar.jpg'),
                    user: 'ETDA',
                    title: 'commented on your blog.',
                    time: '2 minutes ago'
                },
                {
                    imageAvatar: require('../assets/images/default_avatar.jpg'),
                    user: 'ETDA',
                    title: 'commented on your blog.',
                    time: '2 minutes ago'
                },
                {
                    imageAvatar: require('../assets/images/default_avatar.jpg'),
                    user: 'ETDA',
                    title: 'commented on your blog.',
                    time: '2 minutes ago'
                },
                {
                    imageAvatar: require('../assets/images/default_avatar.jpg'),
                    user: 'ETDA',
                    title: 'commented on your blog.',
                    time: '2 minutes ago'
                },
                {
                    imageAvatar: require('../assets/images/default_avatar.jpg'),
                    user: 'ETDA',
                    title: 'commented on your blog.',
                    time: '2 minutes ago'
                }
            ]
        }
    }

    render() {
        const { dataEvent, dataNoti } = this.state
        return (
            <View
                style={{
                    flex: 1,
                    ...style.marginHeaderStatusBar,
                    backgroundColor: '#F9FCFF'
                }}>
                <HeaderNavbar value={'admin'}></HeaderNavbar>
                <View
                    style={{
                        ...style.container,
                        paddingTop: hp('2%'),
                        backgroundColor: 'white',
                        paddingBottom: hp('2%'),
                        ...styleScoped.shadowCard
                    }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Icon
                                name="calendar"
                                size={hp('2.5%')}
                                color="#427AA1"
                                style={{ marginRight: hp('1%') }}
                            />
                            <Text style={{ fontSize: hp('2%'), color: '#427AA1' }}>Your events today</Text>
                        </View>
                        <TouchableOpacity>
                            <Icon
                                name="chevron-down"
                                size={hp('2.5%')}
                                color="#B5B5B5"
                                style={{ marginRight: hp('1%') }}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* content */}
                    <View style={{ marginTop: hp('2%') }}>
                        {
                            dataEvent.map((el, index) => {
                                return (
                                    <TouchableOpacity style={{ ...styleScoped.warpperTitleEvent }} key={`event_${index}`}>
                                        <View style={{ ...styleScoped.wrapperImageAvatar }}>
                                            <Image source={el.imageAvatar} style={{ ...styleScoped.imageAvatar }} />
                                        </View>
                                        <View >
                                            <Text style={{ ...styleScoped.textTtile }}>
                                                {el.title}
                                            </Text>
                                            <Text style={{ ...styleScoped.textTime }}>
                                                {el.time}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View style={{ ...style.divider, marginVertical: hp('1%') }}></View>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...styleScoped.textSeeMore }}>See Upcoming Events</Text>
                        <Icon name="chevron-right" size={hp('2.5%')} color="#707070" />
                    </TouchableOpacity>
                </View>

                {/* Notification */}
                <View style={{
                    ...style.container,
                    paddingTop: hp('2%'),
                    backgroundColor: 'white',
                    paddingBottom: hp('50%'),
                    ...styleScoped.shadowCard,
                    marginTop: hp('2%')
                }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <IconMaterail name="notifications" size={hp('2.5%')} color="#427AA1" style={{ marginRight: hp('1%') }} />
                        <Text style={{ fontSize: hp('2%'), color: '#427AA1' }}>Notifications</Text>
                    </View>
                    <View style={{ ...style.divider, marginVertical: hp('2.5%') }}></View>
                    <ScrollView>
                        {
                            dataNoti.map((el, index) => {
                                return (
                                    <Fragment>
                                        <TouchableOpacity style={{ ...styleScoped.warpperTitleEvent }} key={`event_${index}`}>
                                            <View style={{ ...styleScoped.wrapperImageAvatar }}>
                                                <Image source={el.imageAvatar} style={{ ...styleScoped.imageAvatar }} />
                                            </View>
                                            <View >
                                                <Text style={{ ...styleScoped.textTtile, color: '#0D1F2D' }}>
                                                    {el.user} <Text style={{ fontWeight: '400' }}>{el.title}</Text>
                                                </Text>
                                                <Text style={{ ...styleScoped.textTime, fontWeight: '300' }}>
                                                    {el.time}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        {
                                            dataNoti.length == index + 1 ?
                                                null : <View style={{ ...style.divider, marginVertical: hp('1%') }}></View>
                                        }

                                    </Fragment>
                                )
                            })
                        }
                    </ScrollView>
                </View>

            </View>
        );
    }
}

const styleScoped = StyleSheet.create({
    warpperTitleEvent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: hp('1.5%')
    },
    wrapperImageAvatar: {
        height: hp('7%'),
        width: hp('7%'),
        borderRadius: 50,
        marginRight: hp('2%')
    },
    textTtile: {
        fontSize: hp('2%'),
        color: '#003764',
        marginBottom: hp('1%'),
        fontWeight: '500'
    },
    textTime: {
        fontSize: hp('1.8%'),
        color: '#003764'
    },
    imageAvatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 50
    },
    textSeeMore: {
        fontSize: hp('2%'),
        color: '#707070',
        textAlign: 'center'
    },
    shadowCard: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
});
