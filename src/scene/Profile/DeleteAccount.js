
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { apiServer } from '../../constant/util';
import HttpRequest from '../../Service/HttpRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import translate from '../../constant/lang'

const http = new HttpRequest();

export default class DeleteAccount extends Component {
    constructor() {
        super();
        this.state = {
            password: '',
            user_data: {},
            lng: {}
        }
    }

    async componentDidMount () {
        try {
            const userInfo = await AsyncStorage.getItem('user_data');
            this.setState({
                user_data: JSON.parse(userInfo)
            })
        } catch (e) {
            console.log(e)
        }
    }

    async UNSAFE_componentWillMount() {
        await this.getLang();
    }

    async getLang() {
        this.setState({ isFetching: true })
        let vocap = await translate()
        this.setState({ lng: vocap })
        this.setState({ isFetching: false })
    }

    callDelete = async () => {
        await http.setTokenHeader();
        const deleteAcc = await http.post( apiServer.url + '/api/backend/post/delete/' + this.state.user_data.userid , data);
        const { status } = await deleteAcc.data;
        if (status == "success") {
            Alert.alert("Your account has been requested for deletion. If you wish to activate this account, Please contact ETDA within 90 days after deletion request has been submitted.")
            await this.logout();
            Actions.replace('Login');
        }
    };

    async logout () {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user_data');
        await AsyncStorage.removeItem('social_network');
    }


    render() {
        const {lng} = this.state
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ backgroundColor: 'white', paddingBottom: hp('2%') }}>
                        <View style={{ ...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.delete_account}</Text>
                            <TouchableOpacity onPress={() => Actions.replace('MainScene')}>
                                <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.confirm}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={style.container}>
                        <Text style={{ fontSize: hp('2%'), fontWeight: '600' }}>{lng.delete_account_title}</Text>
                        <Text style={{ fontSize: hp('2%'), marginTop: hp('1%'), color: "#707070", fontWeight: '300' }}>
                            {lng.delete_account_detail}
                        </Text>
                        <View style={{ marginVertical: hp('2%'), ...style.divider }}></View>
                        <Text style={{ fontSize: hp('2%'), marginTop: hp('1%'), color: "#707070", fontWeight: '300' }}>
                            {lng.delete_account_detail2}
                        </Text>
                    </View>
                    <View style={{ ...style.container, marginTop: hp('2%') }}>
                        <Text style={{ fontSize: hp('2%'), marginBottom: hp('1%') }}>{lng.password}</Text>
                        <TextInput
                            value={this.state.password}
                            maxLength={20}
                            placeholderTextColor="#ccc"
                            style={{ ...style.customInput, width: '100%', borderRadius: 30 }}
                            placeholder={lng.enter_password}
                            onChangeText = { v => this.setState({password: v}) }
                        />
                        <Text style={{ textAlign: 'right', color: '#4267B2', marginRight: hp('2%') }}>{this.state.password.length}/20</Text>
                    </View>

                </ScrollView>
            </View >
        );
    }
};

const styleScoped = StyleSheet.create({
    btnImageProfile: {
        width: hp('4%'),
        height: hp('4%'),
        borderRadius: 100,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#003764',
        position: 'absolute',
        right: 2,
        bottom: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
});


