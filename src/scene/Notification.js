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
import moment from 'moment'
import { Avatar } from 'react-native-elements';
const http = new HttpRequest();
export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: {},
            dataEvent: [
            ],
            dataNoti: [

            ],
            default_avatar: require('../assets/images/default_avatar.jpg')
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
            this.setState({ dataEvent: data.post_data.event })
            this.setState({ dataNoti: data.post_data.notification })
        } catch (error) {
            console.log('Error list Notification : ', error)
        }

    }

    render() {
        const { dataEvent, dataNoti, lng, default_avatar } = this.state
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
                                    <TouchableOpacity style={{ ...styleScoped.warpperTitleEvent }} key={`event_${index}`} onPress={() => Actions.EventDetail({ data: el })}>
                                        <View style={{ marginRight: hp('1.5%') }}>
                                            <Avatar source={!el.author.photo ? default_avatar : { uri: el.author.photo }} rounded size="medium" />
                                            {/* <Image source={el.imageAvatar} style={{ ...styleScopsed.imageAvatar }} /> */}
                                        </View>
                                        <View >
                                            <Text style={{ ...styleScoped.textTtile }}>
                                                {el.title}
                                            </Text>
                                            <Text style={{ ...styleScoped.textTime }}>
                                                {
                                                    el.post_addition_data ?
                                                        moment(el.post_addition_data.event_date).format('DD/MM/YYYY')
                                                        : ''
                                                } {el.post_addition_data && el.post_addition_data.event_schedule[0].time}

                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    {/* <View style={{ ...style.divider, marginVertical: hp('1%') }}></View>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ ...styleScoped.textSeeMore }}>{lng.see_upcomming_events}</Text>
                        <Icon name="chevron-right" size={hp('2.5%')} color="#707070" />
                    </TouchableOpacity> */}
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
                                let action_to = null
                                if (el.post_type == 'blog') {
                                    action_to = 'PostDetail'
                                } else if (el.post_type == 'poll') {
                                    action_to = 'PollDetail'
                                } else if (el.post_type == 'event') {
                                    action_to = 'EventDetail'
                                } else if (el.post_type == 'survey') {
                                    action_to = 'SurveyDetail'
                                }
                                let post_type = el.post_type.toUpperCase()
                                return (
                                    <Fragment>
                                        <TouchableOpacity style={{ ...styleScoped.warpperTitleEvent }} key={`event_${index}`} onPress={() => Actions.push(action_to, { data: el })}>
                                            <View style={{ marginRight: hp('1%') }}>
                                                <Avatar source={!el.author.photo ? default_avatar : { uri: el.author.photo }} rounded size="medium" />
                                            </View>
                                            <View >
                                                <Text style={{ ...styleScoped.textTtile, color: '#0D1F2D' }}>
                                                    {el.author.full_name} <Text style={{ fontWeight: '400' }} ellipsizeMode="tail" numberOfLines={0.5}>CREATE {post_type} </Text>
                                                </Text>
                                                <Text style={{ ...styleScoped.textTime, fontWeight: '300' }}>
                                                    {el.post_date}
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
