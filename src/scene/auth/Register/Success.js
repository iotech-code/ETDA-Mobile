
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Platform
} from 'react-native';
import HttpRequest from '../../../Service/HttpRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import { apiServer } from '../../../constant/util';

const http = new HttpRequest();
export default class RegisterSuccess extends Component {

    callLogin = async () => {
        const data = {
            "user_email": this.props.email,
            "user_password": this.props.password,
            "authen_method": "local",
            "device": Platform.OS
        }
        let loginRequest = await http.post(apiServer.url+'/api/backend/user/login', data);
        let {status, token} = await loginRequest.data

        if (status == "success") {
            await AsyncStorage.setItem('token', token);
            this.callInfomation();
        }
    }

    callInfomation = async () => {
        await http.setTokenHeader();
        let request = await http.post(apiServer.url + '/api/backend/user/information', data);
        let {status, data} = await request.data

        if (status == "success") {
            await AsyncStorage.setItem('user_data', JSON.stringify(data));
            Actions.replace('Main');
        } else {
            alert('Can\'t login: issue about server response data please try again.')
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <View style={{
                        marginTop: hp('3%'),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        ...style.container
                    }}>
                        <Icon name="check-circle" size={hp('30%')} color="#30D100" />
                    </View>
                    <View style={{ marginTop: hp('3%') }}>
                        <Text style={styleScoped.textWelcome}>Your registration has been submitted,</Text>
                        <Text style={styleScoped.textWelcome}>to post please wait for administrator approval.</Text>

                    </View>
                    <View style={style.container}>

                        <View style={{ marginTop: hp('3%') }}>
                            <Button
                                title="Start"
                                buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                                onPress={() => this.callLogin()}
                            />
                        </View>

                    </View>
                </SafeAreaView>
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    textWelcome: {
        textAlign: 'center',
        fontSize: hp('1.7%'),
    },
    inputCustom: {
        height: hp('5%'),
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: hp('1%')
    }
});


