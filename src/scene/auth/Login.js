
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
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';

import axios from 'axios';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
export default class Login extends Component {
    constructor() {
        super();
        this.state = { email: '', pass: '' }
    }

    callLogin = async () => {
        console.log('come in ')
        const data = {
            "user_email": this.state.email,
            "user_password": this.state.pass,
            "authen_method": "local"
        }
        console.log('come in ', data)
        axios.post('https://etda.amn-corporation.com/api/backend/user/login', data)
            .then((response) => {
                console.log('come in 1 ', response.data.status)
                console.log('come in 1 ', response.data.token)
                if (response.data.status == "success") {
                    if (response.data.token != "") {
                        AsyncStorage.setItem('token', response.data.token);
                        this.callInfomation(response.data.token)
                    }

                } else {

                }
            })
            .catch((error) => {
            })
            .finally(function () {
            });

    };


    callInfomation = async (token) => {
        console.log('come in ')
        const data = {
            "Token": token
        }
        axios.post('https://etda.amn-corporation.com/api/backend/user/information', data)
            .then((response) => {


                if (response.data.status == "success") {
                    AsyncStorage.setItem('user_type', response.data.data.user_type)
                    Actions.replace('Main')

                } else {

                }
            })
            .catch((error) => {
            })
            .finally(function () {
            });

    };
    
    render() {
        // on change text
        onChangeTextEmail = async (value) => {
            this.setState({
                email: value
            })
        }

        onChangeTextPassword = async (value) => {
            this.setState({
                pass: value
            })
        }
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                <KeyboardAvoidingView behavior="position">
                    <View style={{
                        marginTop: hp('8%'),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        ...style.container
                    }}>
                        <View style={styleScoped.imageLogo}>
                            <Image
                                source={require('../../assets/images/logo.png')}
                                style={style.imageContain}
                            />
                        </View>

                    </View>
                    <View style={{ marginTop: hp('5%') }}>
                        <Text style={styleScoped.textWelcome}>Welcome</Text>
                    </View>
                    <View style={style.container}>
                        <View style={{ marginTop: hp('2%') }}>
                            <View style={style.customInput}>
                                <TextInput
                                    value={this.state.email}
                                    style={[style.input, { color: 'black' }]}
                                    placeholder="Email address"
                                    keyboardType='email-address'
                                    onChangeText={(value) => {
                                        onChangeTextEmail( value.toLowerCase() )
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: hp('1%') }}>
                            <View style={style.customInput}>
                                <TextInput
                                    style={[style.input, { color: 'black' }]}
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    onChangeText={(value) => {
                                        onChangeTextPassword(value)
                                    }}
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => Actions.push('ForgetPassword')}>
                                <Text style={{
                                    color: '#4267B2',
                                    textAlign: 'right',
                                    textDecorationLine: 'underline',
                                    fontSize: hp('1.7%')
                                }}>Forgot password?</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ marginTop: hp('3%') }}>
                            <Button
                                title="Login"
                                buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                                onPress={() =>
                                    this.callLogin()
                                }
                            />
                        </View>
                        <View style={{ marginTop: hp('4%'), alignItems: 'center', ...style.boxTextBorder }}>
                            <Text style={{ ...style.textOnBorder, fontSize: hp('2%'), color: '#B5B5B5' }}>Or Login with</Text>
                        </View>
                        <View style={{ marginTop: hp('4%') }}>
                            <Button
                                title="Continue with Line"
                                buttonStyle={{ padding: hp('1.5%'), ...style.btnLine, ...style.btnRounded }}
                            />
                        </View>
                        <View style={{ marginTop: hp('2%') }}>
                            <Button
                                title="Continue with Facebook"
                                buttonStyle={{ padding: hp('1.5%'), ...style.btnFacebook, ...style.btnRounded }}
                            />
                        </View>
                        <View style={{ marginTop: hp('2%') }}>
                            <Button
                                title="Continue with Google"
                                buttonStyle={{ padding: hp('1.5%'), ...style.btnGoogle, ...style.btnRounded }}
                            />
                        </View>

                        <View style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ color: '#707070', fontSize: hp('1.7%'), marginRight: hp('1%') }}>Do not have an account?</Text>
                            <TouchableOpacity onPress={() => Actions.push('Register')}>
                                <Text style={{ color: '#4267B2', textDecorationLine: 'underline', fontSize: hp('1.7%') }} >Register</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
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
    }
});


