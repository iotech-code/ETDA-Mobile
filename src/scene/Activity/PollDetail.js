
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
    Alert
} from 'react-native';

import { Button, BottomSheet, CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fonts } from '../../constant/util';
import * as Progress from 'react-native-progress';
import { postAction } from '../../Service/PostService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from "react-native-raw-bottom-sheet";
import { actionDeletePost, getPollStat } from '../../Service/PostService'
import ProgressCircle from 'react-native-progress-circle'
export default class PollDetail extends Component {
    constructor(props) {
        super()
        this.state = {
            visibleSearch: false,
            data: null,
            answer_id: null,
            progress: 0,
            is_play: 0,
            user_id: null,
            data_stat_poll: {
                question: '',
                answer: []
            }
        }
    }


    async UNSAFE_componentWillMount() {
        const { data } = this.props
        await this.setState({ data })
        await this.setState({ is_play: data.is_play })
        await this.getUserId()
        if (data.is_play) {
            this.onGetPollStat()
        }
    }

    async getUserId() {
        let user = await AsyncStorage.getItem('user_data')
        user = JSON.parse(user)
        this.setState({ user_id: user.userid })
    }

    async onGetPollStat() {
        try {
            let { post_id } = this.props.data
            let { data } = await getPollStat(post_id)
            this.setState({ data_stat_poll: data.datas })
        } catch (error) {
            console.log('Get poll stat : ', error)
        }
    }


    onChooseAnswer(answer) {
        this.setState({ answer_id: answer.id })
        this.setState({ progress: 100 })
    }

    async onSaveAnswer() {
        try {
            const { post_id, post_addition_data, answer_id } = this.state.data
            let data = {
                post_id: post_id,
                post_type: 'poll',
                datas: [
                    {
                        question_id: post_addition_data.question_id,
                        answer_id: this.state.answer_id
                    }
                ]
            }
            let response = await postAction(data)
            if (response.data.status == 'success') {
                this.setState({ is_play: 1 })
                this.onGetPollStat()
            }
        } catch (error) {
            console.log('Save anwser error : ', error)
        }

    }

    openBottomOption() {
        this.RBSheet.open()
    }


    async onConfirmDeletePost() {
        Alert.alert(
            "Confirm",
            "Are you sure to delete this post ? ",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel delete post"),
                    style: "cancel"
                },
                {
                    text: "Confirm",
                    onPress: () => this.onDeletePost(),
                }
            ],
            { cancelable: false }
        );
        this.RBSheet.close()
    }

    async onDeletePost() {
        try {
            const { post_id } = this.props.data
            let { data } = await actionDeletePost(post_id)
            if (data.status == 'success') {
                Actions.pop({ refresh: {} })
            }
        } catch (error) {
            console.log('Delete poll error : ', error)
        }
    }

    renderBottomSheet() {
        return (
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                height={Platform.OS === 'ios' ? hp('10%') : hp('8%')}
                openDuration={250}
                customStyles={{
                    container: {
                        paddingTop: hp('1%'),
                        backgroundColor: 'white',
                        ...style.shadowCard
                    }
                }}
            >
                <TouchableOpacity style={{ ...styleScoped.listMore }} onPress={() => this.onConfirmDeletePost()}>
                    <Icon name="delete" size={hp('3%')} color="#003764" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Delete</Text>
                </TouchableOpacity>
            </RBSheet>
        )
    }


    renderTakePoll() {
        const { answer_id, progress } = this.state
        const { title, author, post_date, post_addition_data } = this.state.data
        console.log('post_addition_data', this.state.data)
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
                    <Text style={{ fontSize: hp('2%') }}>{post_addition_data.question}</Text>
                    <View style={{ ...styleScoped.warpperList }}>
                        {
                            post_addition_data.answer.map((el, index) => {
                                return (
                                    <TouchableOpacity style={{ ...styleScoped.listItem }} key={`answer_${index}`} onPress={() => this.onChooseAnswer(el)}>
                                        <Icon name={el.id == answer_id ? "checkbox-blank-circle" : 'checkbox-blank-circle-outline'} size={hp('2.5%')} style={{ marginRight: hp('1%'), color: colors.primary }} />
                                        <Text style={{ fontSize: hp('2%'), color: fonts.color.primary }}>{el.detail}</Text>
                                    </TouchableOpacity>
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

    renderFinishPoll() {
        const { title, post_addition_data, } = this.state.data
        const { data_stat_poll } = this.state
        return (
            <View style={{ ...style.container, marginTop: hp('1%') }}>
                <Text style={{ fontSize: hp('2%') }}>{data_stat_poll.question}</Text>

                <View style={{ ...style.divider, marginVertical: hp('2%') }}></View>

                {
                    data_stat_poll.answer.map((el, index) => {
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
            </View>
        )
    }


    render() {
        const { title, author, post_date, post_addition_data } = this.state.data
        const { user_id } = this.state
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#F9FCFF"
            }}>

                <ScrollView style={{ flex: 1, ...style.marginHeaderStatusBar }}>
                    <View style={{ ...style.navbar }}>
                        <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.replace('MainScene',{menu:'activity',sub_menu:'poll'})} />
                        <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Poll detail</Text>
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
                            {
                                user_id == author.id ?
                                    <TouchableOpacity onPress={() => this.openBottomOption()}>
                                        <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                                    </TouchableOpacity>
                                    : null
                            }

                        </View>
                        <View style={{ ...style.divider, marginVertical: hp('2%') }}></View>
                        {
                            !this.state.is_play ? this.renderTakePoll() : this.renderFinishPoll()
                        }
                    </View>
                </ScrollView>
                {this.renderBottomSheet()}
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
    },
    listMore: {
        width: '100%',
        padding: hp('2%'),
        flexDirection: 'row',
        alignItems: 'center',

    }
});


