
import React, { Component, Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
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
import { createSurvey } from '../../Service/PostService'
import translate from '../../constant/lang'

export default class PollCreate extends Component {
    constructor() {
        super()
        this.state = {
            visibleSearch: false,
            post_to_feed: false,
            topic: null,
            lng: {},
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
                    question: '',
                    answer: [
                        {
                            detail: null,
                        },
                    ]
                }
            ]

        }
    }


    async UNSAFE_componentWillMount() {
        await this.getLang();
    }

    async getLang() {
        let vocap = await translate()
        this.setState({ lng: vocap })
    }


    async onCreateSurvey() {
        try {
            let { topic, detail, question } = this.state
            let post_addition_data = {
                survey_date: question,
                post_to_etda: true
            }
            console.log(question)
            let is_validate = true
            for (let index = 0; index < question.length; index++) {
                const el = question[index];
                if (el.question == '') {
                    is_validate = false
                }
                for (let index = 0; index < el.answer.length; index++) {
                    const element = el.answer[index];
                    if (!element.detail) {
                        is_validate = false
                    }
                }
            }
            if (!is_validate) {
                Alert.alert('Please check data again.')
                return
            }
            let { data } = await createSurvey(topic, 'survey', [], '', [], post_addition_data)
            let { status } = data
            if (status == 'success') {
                Actions.replace('Survey')
            }
        } catch (error) {
            console.log('Create survey error : ', error)
        }
    }

    onAddQuestion() {
        let { question } = this.state
        let objQuestion = {
            question: '',
            answer: [
                {
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
            detail: null
        }
        question[index].answer.push(objAnswer)
        this.setState({ question: question })
    }
    onChangeTextQuestion(text, index) {
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
            lng
        } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', marginBottom: hp('3%') }}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <View style={{ ...style.navbar }}>
                            <TouchableOpacity onPress={() => Actions.replace('Survey')}>
                                <Icon name="chevron-left" size={hp('3%')} color="white" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.create_new_survey}</Text>
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}></Text>
                        </View>
                        {/* content */}
                        <View>
                            <View style={{ height: hp('7%') }}>
                                <TextInput
                                    placeholder={lng.survey_topic_here}
                                    style={{ paddingVertical: hp('2%'), paddingHorizontal: hp('2%'), fontSize: hp('2.2%') }}
                                    value={topic}
                                    onChangeText={(text) => this.setState({ topic: text })}
                                ></TextInput>
                            </View>
                            <View style={{ ...style.divider }}></View>

                            <View style={{ minHeight: hp('30%') }}>

                                <View style={{ ...style.container }}>
                                    <Text style={{ marginTop: hp('3%'), fontSize: hp('2%') }}>
                                        {lng.survey_question}
                                    </Text>
                                </View>

                                {
                                    question.map((element, index) => {
                                        return (
                                            <Fragment key={`question_${index}`}>
                                                <View style={{ ...style.container, marginTop: hp('3%') }}>
                                                    <TextInput
                                                        placeholder={lng.survey_question_here}
                                                        style={{ paddingVertical: hp('2%'), fontSize: hp('2%') }}
                                                        value={element.question}
                                                        multiline
                                                        onChangeText={(text) => this.onChangeTextQuestion(text, index)}
                                                    ></TextInput>
                                                    <View style={{ ...style.divider }}></View>
                                                    {
                                                        element.answer.map((e, i) => {
                                                            return (
                                                                <View key={`answer_${i}`}>
                                                                    <TextInput
                                                                        placeholder={lng.survey_answer_here}
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
                                                                title={lng.add_answer}
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
                                    title={lng.add_new_question}
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
                                    title={lng.create}
                                    buttonStyle={{
                                        padding: hp('1%'),
                                        ...style.btnPrimary,
                                        ...style.btnRounded
                                    }}
                                    onPress={() => this.onCreateSurvey()}
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



