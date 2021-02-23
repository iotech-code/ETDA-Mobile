
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';

import { Button, BottomSheet } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import MenuFooter from '../../components/MenuFooter'
import MenuFooterUser from '../../components/MenuFooterUser'
import translate from '../../constant/lang'
import PostPoll from '../../components/Poll'
import { getListPostPoll } from '../../Service/PostService'
export default class Poll extends Component {
    constructor() {
        super()
        this.state = {
            user_type: '',
            user_role: '',
            list_data_general: [],
            list_data_student: [],
            lng: {},
            userInfo: null
        }
    }

    async UNSAFE_componentWillMount() {
        await this.getUserInfo()
        await this.getLang();
        await this.onGetListPoll()
    }

    async getLang() {
        let vocap = await translate()
        this.setState({ lng: vocap })
    }

    async UNSAFE_componentWillReceiveProps(props) {
        await this.onGetListPoll()
    }

    componentDidMount() {
    }

    async getUserInfo() {
        let userInfo = await AsyncStorage.getItem('user_data');
        userInfo = JSON.parse(userInfo)
        this.setState({ user_role : userInfo.user_role })
    };

    async onGetListPoll() {
        try {
            let { data } = await getListPostPoll();
            let list_data_student = []
            let list_data_general = []
            for (let index = 0; index < data.post_data.length; index++) {
                const element = data.post_data[index];
                if (element.post_addition_data.type_of_poll == 'For general') {
                    list_data_general.push(element)
                } else if (element.post_addition_data.type_of_poll == 'For student') {
                    list_data_student.push(element)
                }
            }

            this.setState({ list_data_student, list_data_general })
        } catch (error) {
            console.log('Get list poll error : ' , error)
        }
    }

    render() {
        const { list_data_student, list_data_general, lng, user_role } = this.state
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ ...style.navbar }}>
                        <TouchableOpacity onPress={() => Actions.replace('Activity')}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.poll}</Text>
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
                            <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>{lng.poll}</Text>
                            <Icon name="compare-vertical" size={hp('3%')} color="#707070" />
                        </View>

                        {
                            user_role == 'Admin' ?
                                <View style={{ ...style.container }}>
                                    <Button
                                        title={lng.create_new_poll}
                                        Outline={true}
                                        titleStyle={{ color: '#003764', }}
                                        buttonStyle={{
                                            padding: hp('1%'),
                                            ...style.btnPrimaryOutline,
                                            ...style.btnRounded,
                                        }}
                                        onPress={() => Actions.replace('PollCreate')}
                                    />
                                </View> : null
                        }



                        <View style={{ ...style.container, marginTop: hp('3%') }}>
                            <Text style={{ fontSize: hp('2%') }}>{lng.for_student}</Text>
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            {
                                list_data_student.map((el, index) => {
                                    return (
                                        <PostPoll
                                            onDeletePost={() => this.onGetListPoll()}
                                            key={`student_${index}`}
                                            data={el}
                                        ></PostPoll>
                                    )
                                })
                            }
                        </View>


                        <View style={{ ...style.container, marginTop: hp('3%') }}>
                            <Text style={{ fontSize: hp('2%') }}>{lng.for_general}</Text>
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            {
                                list_data_general.map((el, index) => {
                                    return (
                                        <PostPoll
                                            onDeletePost={() => this.onGetListPoll()}
                                            key={`general_${index}`}
                                            data={el}></PostPoll>
                                    )
                                })
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


