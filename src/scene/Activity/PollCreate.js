
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

import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment'
import { createPost } from '../../Service/PostService'
import { colors } from '../../constant/util';

export default class PollCreate extends Component {
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

    async onCreatePoll() {
        try {
            let { topic, detail, post_to_feed, schedule, date_event } = this.state
            let post_addition_data = {
                event_date: date_event,
                event_schedule: schedule,
                post_to_etda: post_to_feed
            }
            let response = await createPost(topic, 'event', [], detail, [], post_addition_data)
            let { status } = response.data
            if (status == 'success') {
                Actions.replace('Event')
            }
        } catch (error) {
            console.log('Create event error : ', error)
        }
    }


    addAnswer() {

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
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <View style={{ ...style.navbar }}>
                            <TouchableOpacity onPress={() => Actions.pop()}>
                                <Icon name="chevron-left" size={hp('3%')} color="white" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Create Poll</Text>
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
                            <View style={{ minHeight: hp('30%') }}>
                                <View style={{ ...style.container }}>
                                    <Text style={{ marginVertical: hp('3%'), fontSize: hp('2%') }}>
                                        Poll question
                                    </Text>
                                    <TextInput
                                        placeholder="Enter your question here…"
                                        style={{ paddingVertical: hp('2%'), fontSize: hp('2%') }}
                                        value={detail}
                                        multiline
                                        onChangeText={(text) => this.setState({ detail: text })}
                                    ></TextInput>
                                    <View style={{ ...style.divider }}></View>
                                    <TextInput
                                        placeholder="Enter your question here…"
                                        style={{ paddingVertical: hp('2%'), fontSize: hp('2%'), marginTop: hp('2%') }}
                                        value={detail}
                                        multiline
                                        onChangeText={(text) => this.setState({ detail: text })}
                                    ></TextInput>

                                    <View style={{ marginTop: hp('2%'), ...style.flex__start }}>
                                        <Button
                                            title="Add answer"
                                            buttonStyle={{
                                                padding: hp('1%'),
                                                paddingHorizontal: hp('2%'),
                                                ...style.btnPrimary,
                                                ...style.btnRounded
                                            }}
                                            onPress={() => this.addAnswer()}
                                        />
                                    </View>
                                </View>

                            </View>
                            <View style={{ ...style.divider }}></View>

                            <View style={{ ...style.container, marginVertical: hp('2%') }}>
                                <Text style={{ fontSize: hp('2%'), }}>Type of Poll</Text>
                                <View style={{ marginTop: hp('2%'), ...styleScoped.boxSelectionType }}>
                                    <Text style={{ fontSize: hp('1.8%') }}>For general</Text>
                                    <Icon name="chevron-down" style={{fontSize:hp('2%')}} color={colors.primary}/>
                                </View>
                            </View>

                            <View style={{ ...style.divider }}></View>

                            <View style={{ marginTop: hp('2%'), ...style.container }}>
                                <Button
                                    title="Create"
                                    buttonStyle={{
                                        padding: hp('1%'),
                                        ...style.btnPrimary,
                                        ...style.btnRounded
                                    }}
                                    onPress={() => this.onCreatePoll()}
                                />
                            </View>
                        </View>

                    </KeyboardAvoidingView>

                </ScrollView>
            </SafeAreaView>

        );
    }
};

const styleScoped = StyleSheet.create({
    boxSelectionType: {
        padding: hp('1.5%'),
        borderColor: '#427AA1',
        borderWidth: 1,
        borderRadius:50,
        ...style.space__between,
        alignItems:'center'
    }
});



