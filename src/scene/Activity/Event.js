
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
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';

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
    state = {
        visibleSearch: false
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ ...style.navbar}}>
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
                        <View style={style.container}>
                            <Calendar
                                markingType={'period'}
                                markedDates={{
                                    '2021-01-15': { marked: true, dotColor: '#50cebb' },
                                    '2021-01-16': { marked: true, dotColor: '#50cebb' },
                                    '2021-01-21': { startingDay: true, color: '#50cebb', textColor: 'white' },
                                    '2021-01-22': { color: '#70d7c7', textColor: 'white' },
                                    '2021-01-23': { color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white' },
                                    '2021-01-24': { color: '#70d7c7', textColor: 'white' },
                                    '2021-01-25': { endingDay: true, color: '#50cebb', textColor: 'white' },
                                }}
                            />

                        </View>

                        {/* end calendar */}

                        <View style={{ marginTop: hp('2%') }}>
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


