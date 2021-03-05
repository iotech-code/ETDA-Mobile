
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

import { Button, BottomSheet, CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fonts } from '../../constant/util';
import * as Progress from 'react-native-progress';
import { Fragment } from 'react';
import { postAction, getSurveyStat } from '../../Service/PostService'
import ProgressCircle from 'react-native-progress-circle'

export default class SurveyDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visibleSearch: false,
            data: null,
            answer_id: [],
            progress: 0,
            is_play: 0,
            answer_data: [],
            survey_data: [],
            survey_data_stat: []
        }
    }



    async UNSAFE_componentWillMount() {
        const { data } = this.props
        await this.setState({ data })
        await this.setState({ is_play: data.is_play })
        if (this.state.is_play) {
            await this.onGetSurveyStat()
        }
    }

    async componentDidMount() {
        const { data } = this.props
        let survey_data = []
        for (let index = 0; index < data.post_addition_data.survey_date.length; index++) {
            const element = data.post_addition_data.survey_date[index];
            for (let i = 0; i < element.answer.length; i++) {
                const el = element.answer[i];
                el.choose = false
            }
            survey_data.push(element)
        }

        await this.setState({ survey_data })
    }


    async onGetSurveyStat() {
        try {
            const { post_id } = this.props.data
            let { data } = await getSurveyStat(post_id)
            if (data.status == 'success') {
                this.setState({ survey_data_stat: data.datas.survey_stat })
            }
        } catch (error) {
            console.log('Get survey stat error : ', error)
        }
    }

    async onChooseAnswer(question_id, answer_id) {
        let { survey_data } = this.state
        let countProgress = 0
        for (let index = 0; index < survey_data.length; index++) {
            const element = survey_data[index];

            for (let i = 0; i < element.answer.length; i++) {
                const el = element.answer[i];
                if (el.id == answer_id && element.id == question_id) {
                    el.choose = true
                } else if (element.id == question_id && el.id != answer_id) {
                    el.choose = false
                }
                if (el.choose == true) {
                    countProgress++
                }
            }
        }
        let progress = (countProgress / survey_data.length) * 100
        await this.setState({ survey_data })
        await this.setState({ progress: progress })
    }

    async onSaveAnswer() {
        try {
            const { post_id, post_addition_data } = this.state.data
            const { survey_data } = this.state
            let data = {
                post_id: post_id,
                post_type: 'survey',
                datas: []
            }
            for (let index = 0; index < survey_data.length; index++) {
                const element = survey_data[index];
                for (let i = 0; i < element.answer.length; i++) {
                    const el = element.answer[i];
                    if (el.choose) {
                        data.datas.push({
                            question_id: element.id,
                            answer_id: el.id
                        })
                    }
                }
            }
            let response = await postAction(data)
            if (response.data.status == 'success') {
                this.setState({ is_play: 1 })
                this.onGetSurveyStat()
            }
        } catch (error) {
            console.log('Save anser error : ', error)
        }

    }


    renderTakeSurvey() {
        const { answer_id, progress, answer_data, survey_data } = this.state
        const { title, author, post_date, post_addition_data } = this.state.data
        return (
            <View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', ...style.container }}>

                    {/* <Progress.Circle
                            size={80}
                            thickness={4}
                            color={fonts.color.primary}
                            progress={progress}
                            indeterminate={false}
                            showsText={true}
                            style={{ marginRight: hp('3%') }}

                        /> */}

                    <View style={{ marginRight: hp('3%') }}>
                        <ProgressCircle
                            percent={progress}
                            radius={50}
                            borderWidth={8}
                            color={fonts.color.primary}
                            shadowColor="#999"
                            bgColor="#fff"

                        >
                            <Text style={{ fontSize: 18 }}>{`${progress}%`}</Text>

                        </ProgressCircle>
                    </View>


                    <Text style={{ fontSize: hp('3%') }}>{title}</Text>
                </View>
                {/* section content */}



                <View style={{ ...style.container, marginTop: hp('3%') }}>

                    <View style={{ ...styleScoped.warpperList }}>
                        {
                            survey_data.map((element, i) => {

                                return (
                                    <Fragment key={`survey_data_${i}`}>
                                        <Text style={{
                                            fontSize: hp('2%'),
                                            marginTop: hp('2%'),
                                            marginBottom: hp('1%')
                                        }}>{element.question}</Text>
                                        {
                                            element.answer.map((el, index) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={{ ...styleScoped.listItem }}
                                                        key={`answer_${index}`}
                                                        onPress={() => this.onChooseAnswer(element.id, el.id)}>
                                                        <Icon name={el.choose ? "checkbox-blank-circle" : 'checkbox-blank-circle-outline'} size={hp('2.5%')} style={{ marginRight: hp('1%'), color: colors.primary }} />
                                                        <Text style={{ fontSize: hp('2%'), color: fonts.color.primary }}>{el.detail}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </Fragment>
                                )

                            })
                        }

                    </View>
                </View>



                <View style={{ ...style.container, marginTop: hp('3%') }}>
                    <Button
                        title="Done"
                        buttonStyle={{ padding: hp('1.5%'), ...style.btnRounded, ...style.btnPrimary }}
                        onPress={() => this.onSaveAnswer()}
                    />
                </View>


            </View>

        )
    }

    renderFinishSurvey() {
        const { title, post_addition_data } = this.state.data
        const { survey_data, survey_data_stat } = this.state
        return (
            <View style={{ ...style.container, marginTop: hp('1%'), marginBottom: hp('10%') }}>

                {/* {
                    survey_data_stat.map((element, i) => {
                        return (
                            <Fragment key={`qqq_${i}`}>
                                <Text style={{
                                    fontSize: hp('2%'), marginTop: hp('3%'),
                                    marginBottom: hp('1%')
                                }}>{element.question}</Text>
                                {
                                    element.answer.map((el, index) => {
                                        return (
                                            <View style={{ marginTop: hp('2%'), ...style.space__between, alignItems: 'flex-start' }} key={`percen_${index}`}>
                                                <Text style={{ fontSize: hp('2%') }}>{el.detail}</Text>
                                                <Text style={{ fontSize: hp('2%'), color: fonts.color.primary }}>{el.percent}%</Text>
                                            </View>
                                        )
                                    })
                                }
                            </Fragment>
                        )
                    })
                }
 */}

                {
                    survey_data_stat.map((element, i) => {
                        return (
                            <Fragment key={`qq_${i}`}>
                                <Text style={{
                                    fontSize: hp('3%'), marginTop: hp('3%'),
                                    marginBottom: hp('1%')
                                }}>{element.question}</Text>
                                {
                                    element.answer.map((el, index) => {
                                        return (
                                            <View style={{marginTop: 10}} key={`progressbar_${index}`}>
                                                <Text style={{ fontSize: hp('2%') }}>{el.detail}</Text>
                                                <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 8}}>
                                                <Progress.Bar progress={parseInt(el.percent) / 100} width={wp('80%')} height={20} />
                                                <Text style={{ fontSize: hp('2%'), color: fonts.color.primary }}>{el.percent}%</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </Fragment>
                        )
                    })
                }


            </View>
        )
    }


    render() {
        const { title, author, post_date, post_addition_data, } = this.state.data

        return (
            <View style={{
                flex: 1,
                backgroundColor: "#F9FCFF"
            }}>

                <ScrollView style={{ flex: 1, ...style.marginHeaderStatusBar }}>
                    <View style={{ ...style.navbar }}>
                        <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                        <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Survey detail</Text>
                        <Icon name="magnify" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                    </View>
                    <View style={{
                        backgroundColor: 'white',
                        paddingVertical: hp('1%'),
                        paddingTop: hp('2%'),
                        paddingBottom: hp('2%'),
                        marginBottom: hp('2%'),
                        ...styleScoped.shadowCard,
                    }}>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: hp('2%'),
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View >
                                    <Text style={{ fontSize: hp('2%'), }}>{author.full_name}</Text>
                                    <Text style={{ fontSize: hp('1.5%'), fontWeight: '300', color: '#B5B5B5' }} > {post_date} </Text>
                                </View>
                            </View>
                            <TouchableOpacity  >
                                <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...style.divider, marginVertical: hp('2%') }}></View>


                        {
                            !this.state.is_play ? this.renderTakeSurvey() : this.renderFinishSurvey()
                        }

                    </View>
                </ScrollView>
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
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    warpperList: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        marginVertical: hp('1%')
    },
    borderStep: {
        width: hp('10%'),
        height: hp('10%'),
        backgroundColor: 'white',
        borderRadius: 50,
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
        borderColor: colors.primary,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: 'center',
        marginRight: hp('3%')
    }
});