
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    TextInput
} from 'react-native';

import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { colors, apiServer } from '../../../constant/util'

export default class ForgetPassword extends Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            border: '#CADAFB',
            defaultBorder: '#CADAFB',
            disableSend: true
        }
    }

    callForgot = async () => {
        const data = {
            "user_email": this.state.email
        }
        axios.post(apiServer.url + '/api/backend/user/login', data)
            .then((response) => {
                console.log('come in ', response)
                if (response.data.status == "success") {
                    Actions.replace('Login')
                } else {

                }
            })
    };

    async emailValidate (value) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(value) === false) {
            await this.setState({border: 'red', email: value, disableSend: true });
        } else {
            await this.setState({border: this.state.defaultBorder, email: value, disableSend: false });
        }
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                <KeyboardAvoidingView behavior="position">
                    <View style={{
                        marginTop: hp('3%'),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        ...style.container
                    }}>

                        <Icon name="question-circle" size={hp('30%')} color="#708CC5" />


                    </View>
                    <View style={{ marginTop: hp('3%'), ...style.container }}>
                        <Text style={styleScoped.textWelcome}>Enter your email address associated with your account. We will send you password reset instructions. </Text>
                    </View>
                    <View style={style.container}>
                        <View style={{ marginTop: hp('3%') }}>
                            <View style={{ ...style.customInput }}>
                                <TextInput
                                    value={this.state.email}
                                    style={{ ...style.input, borderColor: this.state.border }}
                                    placeholder="Email address"
                                    keyboardType='email-address'
                                    onChangeText={ value => this.emailValidate( value.toLowerCase() ) }
                                />
                            </View>

                        </View>
                        <View style={{ marginTop: hp('3%') }}>
                            <Button
                                title="Send Email"
                                disabled={ this.state.disableSend }
                                buttonStyle={{
                                    padding: hp('1.5%'),
                                    ...style.btnRounded,
                                    ...style.btnPrimary
                                }}
                                onPress={() =>
                                    this.callForgot()
                                }
                            />
                        </View>

                    </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    textWelcome: {
        fontSize: hp('2%'),
        lineHeight: 30
    },
    inputCustom: {
        height: hp('5%'),
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: hp('1%')
    }
});


