
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
    KeyboardAvoidingView,
    Alert
} from 'react-native';

import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createPoll } from '../../Service/PostService'
import { colors } from '../../constant/util';
import Picker from 'react-native-picker';

export default class PollCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            timepicker: new Date(),
            type_of_poll: ['For general'],
            question: {
                question: null,
                type_of_poll: 'for general',
                answer: [
                    {
                        detail: null,
                    },
                ]
            }
        }
    }


    componentDidMount() {

    }


    openSelectType() {
        const { type_of_poll } = this.state
        let self = this
        Picker.init({
            pickerData: ['For general', 'For student'],
            selectedValue: [type_of_poll],
            pickerTextEllipsisLen: 100,
            pickerTitleText: 'Type of Poll',
            onPickerConfirm: data => {
                self.setState({ type_of_poll: data })
            },
        });
        Picker.show();
    }

    async onCreatePoll() {
        const { type_of_poll } = this.state
        try {
            let { topic, detail, question } = this.state
            question.type_of_poll = type_of_poll[0]
            let post_addition_data = {
                ...question,
                post_to_etda: true
            }
            let { data } = await createPoll(topic, 'poll', [], '', [], post_addition_data)
            console.log('create poll : ', data)
            let { status } = data
            if (status == 'success') {
                Actions.replace('Poll')
            }
        } catch (error) {
            Alert.alert('Something worng!')
            console.log('Create poll error : ', error)
        }
    }


    addAnswer() {
        let { question } = this.state
        let objAnswer = {
            detail: null
        }
        question.answer.push(objAnswer)
        this.setState({ question: question })
    }
    onChangeTextQuestion(text) {
        let { question } = this.state
        question.question = text
        this.setState({ question })
    }
    async onChangeTextAnswer(text, index_answer) {
        let { question } = this.state
        question.answer[index_answer].detail = text
        await this.setState({ question })
    }

    render() {
        const {
            post_to_feed,
            topic,
            detail,
            question,
            type_of_poll
        } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', marginBottom: hp('3%') }}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <View style={{ ...style.navbar }}>
                            <TouchableOpacity onPress={() => Actions.replace('Poll')}>
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


                                    <View>
                                        <TextInput
                                            placeholder="Enter your question here…"
                                            style={{ paddingVertical: hp('2%'), fontSize: hp('2%') }}
                                            value={question.question}
                                            multiline
                                            onChangeText={(text) => this.onChangeTextQuestion(text)}
                                        ></TextInput>
                                        <View style={{ ...style.divider }}></View>
                                        {
                                            question.answer.map((e, i) => {
                                                return (
                                                    <View key={`answer_${i}`}>
                                                        <TextInput
                                                            placeholder="Enter your answer here…"
                                                            style={{ paddingVertical: hp('2%'), fontSize: hp('2%'), marginTop: hp('2%') }}
                                                            value={e.detail}
                                                            multiline
                                                            onChangeText={(text) => this.onChangeTextAnswer(text, i)}
                                                        ></TextInput>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>


                                    <View style={{ marginVertical: hp('2%'), ...style.flex__start }}>
                                        {
                                            question.answer.length >= 6 ? null : <Button
                                                title="Add answer"
                                                buttonStyle={{
                                                    padding: hp('1%'),
                                                    paddingHorizontal: hp('2%'),
                                                    ...style.btnPrimary,
                                                    ...style.btnRounded
                                                }}
                                                onPress={() => this.addAnswer()}
                                            />
                                        }

                                    </View>
                                </View>

                            </View>
                            <View style={{ ...style.divider }}></View>

                            <View style={{ ...style.container, marginVertical: hp('2%') }}>
                                <Text style={{ fontSize: hp('2%'), }}>Type of Poll</Text>
                                <TouchableOpacity style={{ marginTop: hp('2%'), ...styleScoped.boxSelectionType }} onPress={() => this.openSelectType()}>
                                    <Text style={{ fontSize: hp('1.8%') }}>{type_of_poll[0]}</Text>
                                    <Icon name="chevron-down" style={{ fontSize: hp('2%') }} color={colors.primary} />
                                </TouchableOpacity>
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
        borderRadius: 50,
        ...style.space__between,
        alignItems: 'center'
    }
});



