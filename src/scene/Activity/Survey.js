
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


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import MenuFooter from '../../components/MenuFooter'
import MenuFooterUser from '../../components/MenuFooterUser'
import SurveyPost from '../../components/Survey'
import { Button } from 'react-native-elements'
import translate from '../../constant/lang'
import { getListPostSurvey } from '../../Service/PostService'
export default class Survey extends Component {
    constructor() {
        super()
        this.state = {
            user_type: '',
            user_role: '',
            lng: {},
            list_data: []
        }
    }

    async UNSAFE_componentWillMount() {
        await this.getLang();
        await this.onGetlistSurvey()
        this.getUserInfo()
    }

    async getUserInfo() {
        let user_json = await AsyncStorage.getItem('user_data');
        let user_data = JSON.parse(user_json);

        this.setState({
            user_type: user_data.user_type,
            user_role: user_data.user_role
        })
    }

    async getLang() {
        let vocap = await translate()
        this.setState({ lng: vocap })
    }

    componentDidMount() {
        
    }


    async onGetlistSurvey() {
        try {
            await this.setState({ list_data: [] })
            let { data } = await getListPostSurvey()
            this.setState({ list_data: data.post_data })
        } catch (error) {
            console.log('Get list Post survey error : ', error)
        }
    }

    render() {
        const { lng, list_data } = this.state
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ ...style.navbar }}>
                        <TouchableOpacity onPress={() => Actions.replace('MainScene', { menu: 'activity' , sub_menu: 'no' })}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.survey}</Text>
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
                            <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>{lng.survey}</Text>
                            <Icon name="compare-vertical" size={hp('3%')} color="#707070" />
                        </View>
                        {
                            this.state.user_role == 'Admin' &&
                            <View style={{ ...style.container }}>
                                <Button
                                    title={lng.create_new_survey}
                                    Outline={true}
                                    titleStyle={{ color: '#003764', }}
                                    buttonStyle={{
                                        padding: hp('1%'),
                                        ...style.btnPrimaryOutline,
                                        ...style.btnRounded,
                                    }}
                                    onPress={() => Actions.replace('SurveyCreate')}
                                />
                            </View>
                        }
                        <View style={{ marginTop: hp('2%') }}>
                            {
                                list_data.map((el, index) => {
                                    return (
                                        <SurveyPost
                                            data={el}
                                            key={`survey_${index}`}
                                            onDeletePost={() => this.onGetlistSurvey()}
                                        ></SurveyPost>
                                    )
                                })
                            }
                        </View>



                    </View>
                </ScrollView>
                {/* {this.state.user_role == "Member" ?
                    <MenuFooterUser value={'activity'}></MenuFooterUser>
                    :
                    <MenuFooter value={'activity'}></MenuFooter>
                } */}
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


