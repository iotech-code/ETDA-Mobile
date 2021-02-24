import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import style from '../styles/base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterail from 'react-native-vector-icons/MaterialIcons';
import { Fragment } from 'react';
import HttpRequest from '../Service/HttpRequest'
import translate from '../constant/lang'
import { getListNoti } from '../Service/PostService'
const http = new HttpRequest();
export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: {},
            dataEvent: [
            {}
            ],
            dataNoti: [

            ]
        }
    }

    async UNSAFE_componentWillMount() {
        await this.getLang();
    }

    async getLang() {
        this.setState({ isFetching: true })
        let vocap = await translate()
        this.setState({ lng: vocap })
        this.setState({ isFetching: false })
    }

    componentDidMount() {
        this.getListNotification();
    }

    async getListNotification() {
        try {
            let { data } = await getListNoti()
            this.setState({})
        } catch (error) {
            console.log('Error list Notification : ', error)
        }

    }

    render() {
        const { dataEvent, dataNoti, lng } = this.state
        return (
            <View
                style={{
                    flex: 1,
                    ...style.marginHeaderStatusBar,
                    backgroundColor: '#F9FCFF'
                }}>
                <View style={{ ...style.navbar }}>
                    <TouchableOpacity onPress={() => Actions.replace('Main')}>
                        <Icon name="chevron-left" size={hp('3%')} color="white" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>
                        {lng.notifications}
                    </Text>
                    <View></View>
                </View>
                <View
                    style={{
                        ...style.container,
                        paddingTop: hp('2%'),
                        backgroundColor: 'white',
                        paddingBottom: hp('2%'),
                        ...styleScoped.shadowCard
                    }}>
                    <View style={{ ...style.space__between }}>
                        <View style={{ ...style.flex__start }}>
                            <Icon
                                name="calendar"
                                size={hp('2.5%')}
                                color="#427AA1"
                                style={{ marginRight: hp('1%') }}
                            />
                            <Text style={{ fontSize: hp('2%'), color: '#427AA1' }}>{lng.event_today}</Text>
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
                        <Text style={{ ...styleScoped.textSeeMore }}>{lng.see_upcomming_events}</Text>
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
                        <Text style={{ fontSize: hp('2%'), color: '#427AA1' }}>{lng.notifications}</Text>
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
