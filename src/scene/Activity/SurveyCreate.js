
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
        timepicker: new Date(),
        question: [
            {
                id: 1,
                question: '',
                answer: [
                    {
                        id: 1,
                        detail: null,
                    },
                ]
            }
        ]

    }



    async onCreatePoll() {
        try {
            let { topic, detail, question } = this.state
            let post_addition_data = {
                question,
                post_to_etda: true
            }
            let { data } = await createPost(topic, 'survey', [], '', [], post_addition_data)
            console.log('create poll : ', data)
            let { status } = data
            if (status == 'success') {
                Actions.replace('Poll')
            }
        } catch (error) {
            console.log('Create poll error : ', error)
        }
    }

    onAddQuestion() {
        let { question } = this.state
        let objQuestion = {
            id: question.length + 1,
            question: '',
            answer: [
                {
                    id: 1,
                    detail: null,
                },
            ]
        }
        question.push(objQuestion)
        this.setState({ question })
    }

    addAnswer(index) {
        let { question } = this.state
        let objAnswer = {
            id: question[index].answer.length + 1,
            detail: null
        }
        question[index].answer.push(objAnswer)
        this.setState({ question: question })
    }
    onChangeTextQuestion(text , index) {
        let { question } = this.state
        question[index].question = text
        this.setState({ question })
    }
    async onChangeTextAnswer(text, index_question, index_answer) {

        let { question } = this.state
        question[index_question].answer[index_answer].detail = text
        await this.setState({ question })
    }

    render() {
        const {
            post_to_feed,
            topic,
            detail,
            question,
        } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', marginBottom: hp('3%') }}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <View style={{ ...style.navbar }}>
                            <TouchableOpacity onPress={() => Actions.replace('Poll')}>
                                <Icon name="chevron-left" size={hp('3%')} color="white" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Create Survey</Text>
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
                                    <Text style={{ marginTop: hp('3%'), fontSize: hp('2%') }}>
                                        Survey question
                                    </Text>
                                </View>

                                {
                                    question.map((element, index) => {
                                        return (
                                            <Fragment key={`question_${index}`}>
                                                <View style={{ ...style.container, marginTop: hp('3%') }}>
                                                    <TextInput
                                                        placeholder="Enter your question here…"
                                                        style={{ paddingVertical: hp('2%'), fontSize: hp('2%') }}
                                                        value={element.question}
                                                        multiline
                                                        onChangeText={(text) => this.onChangeTextQuestion(text , index)}
                                                    ></TextInput>
                                                    <View style={{ ...style.divider }}></View>
                                                    {
                                                        element.answer.map((e, i) => {
                                                            return (
                                                                <View key={`answer_${i}`}>
                                                                    <TextInput
                                                                        placeholder="Enter your answer here…"
                                                                        style={{ paddingVertical: hp('2%'), fontSize: hp('2%'), marginTop: hp('2%') }}
                                                                        value={e.detail}
                                                                        multiline
                                                                        onChangeText={(text) => this.onChangeTextAnswer(text, index, i)}
                                                                    ></TextInput>
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                    <View style={{ marginVertical: hp('2%'), ...style.flex__start }}>
                                                        {
                                                            element.answer.length >= 6 ? null : <Button
                                                                title="Add answer"
                                                                buttonStyle={{
                                                                    padding: hp('1%'),
                                                                    paddingHorizontal: hp('2%'),
                                                                    ...style.btnPrimary,
                                                                    ...style.btnRounded
                                                                }}
                                                                onPress={() => this.addAnswer(index)}
                                                            />
                                                        }

                                                    </View>
                                                </View>
                                                <View style={{ ...style.divider }}></View>
                                            </Fragment>
                                        )
                                    })
                                }

                            </View>


                            <View style={{ ...style.container, marginTop: hp('2%') }}>
                                <Button
                                    title="Add new question"
                                    Outline={true}
                                    titleStyle={{ color: '#003764', }}
                                    buttonStyle={{
                                        padding: hp('1%'),
                                        ...style.btnPrimaryOutline,
                                        ...style.btnRounded,
                                    }}
                                    onPress={() => this.onAddQuestion()}
                                />

                            </View>

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



