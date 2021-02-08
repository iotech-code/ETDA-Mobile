
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
    KeyboardAvoidingView
} from 'react-native';

import { Button, BottomSheet, Overlay } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fonts } from '../../constant/util';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Fragment } from 'react';
import moment from 'moment'


export default class EventCreate extends Component {
    state = {
        visibleSearch: false,
        post_to_feed: false,
        topic: null,
        detail: null,
        date_event: null,
        schedule: [
            {
                time: null,
                detail: null,
                time_default: new Date()
            }
        ],
        showDatePicker: false,
        showTimePicker: false,
        indexSchedule: 0,
        datepicker: new Date(),
        timepicker: new Date()


    }

    onChangeDate(event, date, btn) {
        const { date_event } = this.state
        if (btn) {
            if (!date_event) {
                this.setState({ date_event: moment(date).format('DD/MM/YYYY') })
            }
            this.setState({ showDatePicker: false })
        } else {
            this.setState({ datepicker: date })
            this.setState({ date_event: moment(date).format('DD/MM/YYYY') })
        }
    }

    onChangeTime(event, time, btn) {
        let { schedule, indexSchedule } = this.state
        for (let index = 0; index < schedule.length; index++) {
            const element = schedule[index];
            if (index == indexSchedule) {
                element.time = moment(time).format('HH:mm')
                element.time_default = time
            }
        }
        this.setState({ timepicker: time })
        this.setState({ schedule })
        if (btn) {
            this.setState({ showTimePicker: false })
        }
    }

    addSchedule() {
        const { schedule } = this.state
        schedule.push({
            time: null,
            detail: null,
            time_default: new Date()
        })
        this.setState({ schedule })
    }

    setEventSchedule(text, index) {
        let { schedule } = this.state
        for (let i = 0; i < schedule.length; i++) {
            const element = schedule[i];
            if (index == i) {
                element.detail = text
            }
        }
        this.setState({ schedule })
    }

    async setIndexIimeSchedule(index, time) {
        await this.setState({ timepicker: time })
        await this.setState({ indexSchedule: index })
        await this.setState({ showTimePicker: true })
    }


    renderTimeOverlay() {
        const { showTimePicker, timepicker } = this.state
        return (
            <Overlay
                isVisible={showTimePicker}
                overlayStyle={{
                    width: wp('90%'),
                    paddingVertical: hp('2%'),
                    paddingHorizontal: hp('2%'),
                    borderRadius: 10
                }}
            >

                <DateTimePicker
                    testID="dateTimePicker"
                    value={timepicker}
                    mode="time"
                    display="spinner"
                    is24Hour={true}
                    onChange={(event, selectedDate) => this.onChangeTime(event, selectedDate)}
                />


                <Button
                    title="Confirm"
                    buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                    onPress={() => this.onChangeTime(null, timepicker, true)}
                />

            </Overlay>
        )
    }

    renderDateOverlay() {
        const { datepicker, showDatePicker } = this.state
        return (
            <Overlay
                isVisible={showDatePicker}
                overlayStyle={{
                    width: wp('90%'),
                    paddingVertical: hp('2%'),
                    paddingHorizontal: hp('2%'),
                    borderRadius: 10
                }}
            >

                <DateTimePicker
                    testID="dateTimePicker"
                    value={datepicker}
                    mode="date"
                    display="spinner"
                    onChange={(event, selectedDate) => this.onChangeDate(event, selectedDate)}
                />


                <Button
                    title="Confirm"
                    buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                    onPress={() => this.onChangeDate(null, datepicker, true)}
                />

            </Overlay>
        )

    }
    render() {
        const {
            post_to_feed,
            topic,
            detail,
            schedule,
            date_event
        } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', marginBottom: hp('3%') }}>
                    <KeyboardAvoidingView behavior="position">
                        <View style={{ ...style.navbar }}>
                            <TouchableOpacity onPress={() => Actions.pop()}>
                                <Icon name="chevron-left" size={hp('3%')} color="white" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Create event</Text>
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}></Text>
                        </View>
                        {/* content */}
                        <View>
                            <View style={{ height: hp('7%') }}>
                                <TextInput
                                    placeholder="Enter your topic event here…"
                                    style={{ paddingVertical: hp('2%'), paddingHorizontal: hp('2%'), fontSize: hp('2.2%') }}
                                    value={topic}
                                    onChangeText={(text) => this.setState({ topic: text })}
                                ></TextInput>
                            </View>
                            <View style={{ ...style.divider }}></View>
                            <View style={{ height: hp('30%') }}>
                                <TextInput
                                    placeholder="Enter your  event detail here…"
                                    style={{ paddingVertical: hp('2%'), paddingHorizontal: hp('2%'), fontSize: hp('2.2%') }}
                                    value={detail}
                                    multiline
                                    onChangeText={(text) => this.setState({ detail: text })}
                                ></TextInput>
                            </View>
                            <View style={{ ...style.divider }}></View>


                            <View style={{ ...style.container, marginTop: hp('2%') }}>
                                <Text style={{ fontSize: hp('2%') }}>Event schedule</Text>
                                <View style={{ marginTop: hp('3%'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {
                                        !date_event ?
                                            <Text style={{ fontSize: hp('2%') }}>Add event date</Text>
                                            : <Text style={{ fontSize: hp('2%'), color: '#707070' }}>{date_event}</Text>
                                    }
                                    <Button
                                        title="Date"
                                        titleStyle={{ padding: hp('2%') }}
                                        buttonStyle={{ ...style.btnTagPrimary, padding: hp('3%'), ...style.btnRounded }}
                                        onPress={() => this.setState({ showDatePicker: true })}
                                    />
                                </View>
                            </View>

                            <View style={{ ...style.divider, marginTop: hp('3%') }}></View>

                            <View style={{ ...style.container }}>
                                {
                                    schedule.map((el, index) => {
                                        return (
                                            <Fragment key={`schedule_${index}`}>
                                                <TextInput
                                                    placeholder="Enter your event schedule here…"
                                                    style={{ fontSize: hp('2.2%'), marginVertical: hp('2%') }}
                                                    value={el.detail}
                                                    onChangeText={(text) => this.setEventSchedule(text, index)}
                                                ></TextInput>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: hp('2%'), color: '#4267B2' }}>{el.time}</Text>
                                                    <Button
                                                        title={el.time ? 'Change' : 'Time'}
                                                        titleStyle={{ padding: hp('2%') }}
                                                        buttonStyle={{ ...style.btnTagPrimary, padding: hp('3%'), ...style.btnRounded }}
                                                        onPress={() => this.setIndexIimeSchedule(index, el.time_default)}
                                                    />
                                                </View>
                                                {
                                                    schedule.length == index + 1 ?
                                                        null
                                                        :
                                                        <View style={{ ...style.divider, marginTop: hp('3%') }}></View>
                                                }
                                            </Fragment>
                                        )
                                    })
                                }

                                <View style={{ marginTop: hp('2%') }}>
                                    <Button
                                        title="Add schedule"
                                        Outline={true}
                                        titleStyle={{ color: '#003764', }}
                                        buttonStyle={{
                                            padding: hp('1%'),
                                            ...style.btnPrimaryOutline,
                                            ...style.btnRounded
                                        }}
                                        onPress={() => this.addSchedule()}
                                    />
                                </View>

                            </View>
                            <View style={{ ...style.divider, marginVertical: hp('3%') }}></View>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', ...style.container, alignItems: 'center' }}>
                                {
                                    !post_to_feed ?
                                        <TouchableOpacity onPress={() => this.setState({ post_to_feed: true })}>
                                            <Icon name="checkbox-blank-circle-outline" size={hp('3%')} color="rgba(0,0,0,0.16)" />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => this.setState({ post_to_feed: false })}>
                                            <Icon name="checkbox-marked-circle" size={hp('3%')} color="#4267B2" />
                                        </TouchableOpacity>
                                }
                                <Text style={{ fontSize: hp('2%'), marginLeft: hp('2%') }}>Post to ETDA feed</Text>

                            </View>
                            <View style={{ marginTop: hp('2%'), ...style.container }}>
                                <Button
                                    title="Create"
                                    buttonStyle={{
                                        padding: hp('1%'),
                                        ...style.btnPrimary,
                                        ...style.btnRounded
                                    }}
                                    onPress={() => Actions.push('EventCreate')}
                                />
                            </View>
                        </View>

                    </KeyboardAvoidingView>

                    {this.renderDateOverlay()}
                    {this.renderTimeOverlay()}

                </ScrollView>
            </SafeAreaView>

        );
    }
};

const styleScoped = StyleSheet.create({

});



