
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
import { createPost, updateEvent } from '../../Service/PostService'
import translate from '../../constant/lang'
import { Alert } from 'react-native';
import ImageGrid from '../../components/ImageGrid';
import { Platform } from 'react-native';

export default class EventCreate extends Component {
    state = {
        visibleSearch: false,
        post_to_feed: false,
        topic: null,
        detail: null,
        date_event: null,
        date_event_to_show: null,
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
        timepicker: new Date(),
        lng: {}
    }

    async UNSAFE_componentWillMount() {
        await this.getLang();
        this.checkEditEvent();
    }

    async checkEditEvent() {
        const { data } = this.props
        if (!data) return
        await data.post_addition_data.event_schedule.map(el => {
            el.time_default = new Date()
            return el
        })
        this.setState({
            topic: data.title,
            detail: data.post_description,
            date_event: moment(data.post_addition_data.event_date).format(),
            date_event_to_show: moment(data.post_addition_data.event_date).format('DD/MM/YYYY'),
            schedule: data.post_addition_data.event_schedule,
            post_to_feed: data.post_addition_data.post_to_etda
        })
    }

    async getLang() {
        this.setState({ isFetching: true })
        let vocap = await translate()
        this.setState({ lng: vocap })
        this.setState({ isFetching: false })
    }

    onChangeDate(event, date, btn) {
        let newDate = moment(date).format()
        let date_arr = newDate.split('+')
        const { date_event, date_event_to_show } = this.state
        this.setState({ date_event: date_arr[0] })
        if (btn) {
            if (!date_event_to_show) {
                this.setState({ date_event_to_show: moment(newDate).format('DD/MM/YYYY') })
            }
            this.setState({ showDatePicker: false })
        } else {
            this.setState({ datepicker: date })
            this.setState({ date_event_to_show: moment(newDate).format('DD/MM/YYYY') })
        }
        if (Platform.os != 'ios') {
            console.log('YES')

            this.setState({ showDatePicker: false })
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
        if (Platform.os != 'ios') {
            this.setState({ showTimePicker: false })
        }
        if (btn) {
            this.setState({ showTimePicker: false })
        }
    }

    addSchedule(t) {
        const { schedule } = this.state
        console.log(t)
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

    async onCreateEvent() {
        try {

            const { data } = this.props
            let { topic, detail, post_to_feed, schedule, event_date, date_event } = this.state
            if (!date_event) {
                Alert.alert('Please input event date')
                return
            }
            let post_addition_data = {
                event_date: date_event,
                event_schedule: schedule,
                post_to_etda: post_to_feed
            }
            let response = null
            if (data) {
                response = await updateEvent(data.post_id, topic, 'event', [], detail, [], post_addition_data)
            } else {
                response = await createPost(topic, 'event', [], detail, [], post_addition_data)
            }
            let { status } = response.data
            if (status == 'success') {
                Actions.replace('Event')
            }
        } catch (error) {
            console.log('Create event error : ', error)
        }
    }


    renderTimeOverlay() {
        const { showTimePicker, timepicker, lng } = this.state
        return (

            <View>
                {
                    Platform.os === 'ios' ?
                        <Overlay
                            isVisible={showTimePicker}
                            overlayStyle={{
                                width: wp('90%'),
                                paddingVertical: hp('2%'),
                                paddingHorizontal: hp('2%'),
                                borderRadius: 10
                            }}
                        >

                            <View>
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
                            </View>



                        </Overlay>
                        : showTimePicker ?  <DateTimePicker
                            testID="dateTimePicker"
                            value={timepicker}
                            mode="time"
                            display="spinner"
                            is24Hour={true}
                            onChange={(event, selectedDate) => this.onChangeTime(event, selectedDate)}
                        /> : null
                }
            </View>
        )
    }

    renderDateOverlay() {
        const { datepicker, showDatePicker } = this.state
        return (
            <View>
                {
                    Platform.os === 'ios' ?
                        <Overlay
                            isVisible={showDatePicker}
                            overlayStyle={{
                                width: wp('90%'),
                                paddingVertical: hp('2%'),
                                paddingHorizontal: hp('2%'),
                                borderRadius: 10
                            }}
                        >

                            <View>

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

                            </View>


                        </Overlay>
                        :
                        showDatePicker ? <DateTimePicker
                            testID="dateTimePicker"
                            value={datepicker}
                            mode="date"
                            display="spinner"
                            onChange={(event, selectedDate) => this.onChangeDate(event, selectedDate)}
                        /> : null
                }
            </View>

        )

    }
    render() {
        const {
            post_to_feed,
            topic,
            detail,
            schedule,
            date_event,
            date_event_to_show,
            lng
        } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <ScrollView style={{ flex: 1, backgroundColor: 'white', marginBottom: hp('3%') }}>

                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <View style={{ ...style.navbar }}>
                            <TouchableOpacity onPress={() => Actions.pop()}>
                                <Icon name="chevron-left" size={hp('3%')} color="white" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.create_event}</Text>
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
                                <Text style={{ fontSize: hp('2%') }}>{lng.event_schedule}</Text>
                                <View style={{ marginTop: hp('3%'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {
                                        !date_event_to_show ?
                                            <Text style={{ fontSize: hp('2%') }}>{lng.add_event_date}</Text>
                                            : <Text style={{ fontSize: hp('2%'), color: '#707070' }}>{date_event_to_show}</Text>
                                    }
                                    <Button
                                        title={lng.date}
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
                                                        title={el.time ? lng.change : lng.time}
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
                                        title={lng.add_schedule}
                                        Outline={true}
                                        titleStyle={{ color: '#003764', }}
                                        buttonStyle={{
                                            padding: hp('1%'),
                                            ...style.btnPrimaryOutline,
                                            ...style.btnRounded
                                        }}
                                        onPress={(t) => this.addSchedule(t)}
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
                                <Text style={{ fontSize: hp('2%'), marginLeft: hp('2%') }}>{lng.post_to_etda}</Text>

                            </View>
                            <View style={{ marginTop: hp('2%'), ...style.container }}>
                                <Button
                                    title={lng.create}
                                    buttonStyle={{
                                        padding: hp('1%'),
                                        ...style.btnPrimary,
                                        ...style.btnRounded
                                    }}
                                    onPress={() => this.onCreateEvent()}
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



