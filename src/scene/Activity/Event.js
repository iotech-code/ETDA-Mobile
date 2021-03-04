
import React, { Component, Fragment } from 'react';
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
    ActivityIndicator
} from 'react-native';

import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../../components/MenuFooter'
import MenuFooterUser from '../../components/MenuFooterUser'
import EventPost from '../../components/EventPost'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { allEvent, myEvent } from '../../Service/PostService'
import moment from 'moment'
import translate from '../../constant/lang'
import FlashMessage, { showMessage } from "react-native-flash-message";

LocaleConfig.locales['en'] = {
    formatAccessibilityLabel: "dddd d 'of' MMMM 'of' yyyy",
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    monthNamesShort: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};

LocaleConfig.defaultLocale = 'en';

export default class Activity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleSearch: false,
            eventList: [],
            myeventList: [],
            markedDates: null,
            isFetching: false,
            user_role: '',
            user_type: '',
            lng: {}
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
        this.onGetEventList();
        this.getUserInfo();
    }

    async getUserInfo() {
        let user_json = await AsyncStorage.getItem('user_data');
        let user_data = JSON.parse(user_json);

        this.setState({
            user_type: user_data.user_type,
            user_role: user_data.user_role
        })
    };

    async onGetEventList() {
        this.setState({ isFetching: true })
        try {
            let res = await allEvent();
            let { post_data } = res.data
            let event = []
            let markedDates = {}
            for (let index = 0; index < post_data.length; index++) {
                const element = post_data[index];
                if (element.post_type == 'event') {
                    event.push(element)
                    if (element.post_addition_data.event_date) {
                        let data = new Date(element.post_addition_data.event_date)
                        let date_converted = moment(data).format('YYYY-MM-DD')
                        markedDates[date_converted] = { marked: true, selectedColor: 'blue' }
                    }
                }
            }
            await this.setState({ markedDates })
            await this.setState({ eventList: event })
        } catch (error) {
            console.log('Get list Event error : ', error)
        }
        this.setState({ isFetching: false })
    }

    async getMyEventList() {
        this.setState({ isFetching: true })
        try {
            let res = await myEvent();
            let { post_data } = res.data
            let event = []
            let markedDates = {}
            for (let index = 0; index < post_data.length; index++) {
                const element = post_data[index];
                if (element.post_type == 'event') {
                    event.push(element)
                    if (element.post_addition_data.event_date) {
                        let data = new Date(element.post_addition_data.event_date)
                        let date_converted = moment(data).format('YYYY-MM-DD')
                        markedDates[date_converted] = { marked: true, selectedColor: 'blue' }
                    }
                }
            }
            await this.setState({ markedDates })
            await this.setState({ myeventList: event })
        } catch (error) {
            console.log('Get list Event error : ', error)
        }
        this.setState({ isFetching: false })
    }

    shareCallback(url) {
        showMessage({
            message: "Share url copied!",
            description: url,
            type: "info",
        });
        Clipboard.setString(url)
    }


    render() {
        const { eventList, myeventList, markedDates, isFetching, lng } = this.state
        return (
            <View style={{ flex: 1 }}>
                <FlashMessage position="top"
                    style={{
                        backgroundColor: '#5b5b5b'
                    }} />
                <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ ...style.navbar }}>
                        <TouchableOpacity onPress={() => Actions.replace('Activity')}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.event}</Text>
                        <TouchableOpacity onPress={() => Actions.push('Search')}>
                            <Icon name="magnify" size={hp('3%')} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ backgroundColor: '#F9FCFF', paddingBottom: hp('8%') }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: hp('2%'),
                            alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>{lng.event}</Text>
                            <Icon name="compare-vertical" size={hp('3%')} color="#707070" />
                        </View>
                        
                        {
                            this.state.user_role == 'Admin' &&
                            <View style={{ ...style.container, marginBottom: hp('1%') }}>
                                <Button
                                    title={lng.create_new_event}
                                    Outline={true}
                                    titleStyle={{ color: '#003764', }}
                                    buttonStyle={{
                                        padding: hp('1%'),
                                        ...style.btnPrimaryOutline,
                                        ...style.btnRounded
                                    }}
                                    onPress={() => Actions.push('EventCreate')}
                                />
                            </View>
                        }


                        {/* calendar*/}
                        <View style={style.container}>
                            <Calendar
                                markingType={'period'}
                                markedDates={markedDates}
                                onDayPress={(day) => {console.log('selected day', day)}}
                                enableSwipeMonths={true}
                            />

                        </View>

                        {/* end calendar */}



                        <View style={{ marginTop: hp('2%') }}>
                            {
                                isFetching ?
                                    <ActivityIndicator color="#003764" style={{ marginTop: hp('10%') }} />
                                    : <Fragment>
                                        <View style={{ ...style.container }}>
                                            <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>{lng.my_events}</Text>
                                        </View>
                                        <View style={{ marginTop: hp('2%') }}>
                                            {
                                                myeventList.map((el, index) => {
                                                    return (
                                                        <EventPost key={`myEventList_${index}`} data={el} sharePressButton={(url) => this.shareCallback(url)}></EventPost>
                                                    )
                                                })
                                            }
                                        </View>

                                        <View style={{ ...style.container, marginTop: hp('2%') }}>
                                            <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>{lng.all_events}</Text>
                                        </View>

                                        <View style={{ marginTop: hp('2%') }}>
                                            {
                                                eventList.map((el, index) => {
                                                    return (
                                                        <EventPost key={`EventList_${index}`} data={el}></EventPost>
                                                    )
                                                })
                                            }
                                        </View>
                                        
                                    </Fragment>
                            }
                        </View>
                    </View>
                </ScrollView>
                    {this.state.user_role == "Member" ?
                        <MenuFooterUser value={'activity'}></MenuFooterUser>
                        :
                        <MenuFooter value={'activity'}></MenuFooter>
                    }
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


