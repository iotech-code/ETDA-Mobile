
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
import AsyncStorage from '@react-native-async-storage/async-storage'
import MenuFooter from '../../components/MenuFooter'
import MenuFooterUser from '../../components/MenuFooterUser'
import EventPost from '../../components/EventPost'
import PostPoll from '../../components/Poll'
import { getListPostPoll } from '../../Service/PostService'
export default class Poll extends Component {
    constructor() {
        super()
        this.state = {
            user_type: '',
            user_role: '',
            list_data_general: [],
            list_data_student: []
        }
    }
    async UNSAFE_componentWillMount() {
        await this.onGetListPoll()
    }

    componentDidMount() {
        this.getUserInfo()
    }

    async getUserInfo() {
        let user_json = await AsyncStorage.getItem('user_data');
        let user_data = JSON.parse(user_json);

        this.setState({
            user_type: user_data.user_type,
            user_role: user_data.user_role
        })
    };

    async onGetListPoll() {
        try {
            let { data } = await getListPostPoll();
            let list_data_student =  []
            let list_data_general = []
            for (let index = 0; index < data.post_data.length; index++) {
                const element = data.post_data[index];
                if (element.post_addition_data.type_of_poll == 'For general') {
                    list_data_general.push(element)
                } else if (element.post_addition_data.type_of_poll == 'For student') {
                    list_data_student.push(element)
                }
            }
            console.log(list_data_student,list_data_general)
            this.setState({ list_data_student, list_data_general })
        } catch (error) {

        }
    }

    render() {
        const { list_data_student, list_data_general } = this.state
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ ...style.navbar }}>
                        <TouchableOpacity onPress={() => Actions.replace('Activity')}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Poll</Text>
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
                            <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>Poll</Text>
                            <Icon name="compare-vertical" size={hp('3%')} color="#707070" />
                        </View>

                        <View style={{ ...style.container }}>
                            <Button
                                title="Create new poll"
                                Outline={true}
                                titleStyle={{ color: '#003764', }}
                                buttonStyle={{
                                    padding: hp('1%'),
                                    ...style.btnPrimaryOutline,
                                    ...style.btnRounded,
                                }}
                                onPress={() => Actions.replace('PollCreate')}
                            />
                        </View>

                        <View style={{ ...style.container, marginTop: hp('3%') }}>
                            <Text style={{ fontSize: hp('2%') }}>For student</Text>
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            {
                                list_data_student.map((el, index) => {
                                    return (
                                        <PostPoll key={`student_${index}`}></PostPoll>
                                    )
                                })
                            }
                        </View>


                        <View style={{ ...style.container, marginTop: hp('3%') }}>
                            <Text style={{ fontSize: hp('2%') }}>For general</Text>
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            {
                                list_data_general.map((el, index) => {
                                    return (
                                        <PostPoll key={`general_${index}`}></PostPoll>
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


