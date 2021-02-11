
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Platform,
    View,
    Text,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import { apiServer } from '../../constant/util';
import HttpRequest from '../../Service/HttpRequest';
import { Button, Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions } from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';


const http = new HttpRequest();
export default class Login extends Component {
    constructor() {
        super();
        this.state = { 
            email: '', 
            pass: '', 
            statusSecureText: true, 
            emailBorder: '#CADAFB', 
            passwordBorder: '#CADAFB', 
            defaultBorder: '#CADAFB', 
            emailEnable: false, 
            passwordEnable: false, 
            disableLogin: true,
            spinner: false
        }
    }

    componentDidMount () {
        this.checkLogin();
    }

    async checkLogin() {
        let token = await AsyncStorage.getItem('token');
        
        if(token) {
            await this.callInfomation();
        }
    }

    async callLogin () {
        if( this.state.email === '' || this.state.pass === '' ) {
            Alert.alert('Please fill your user name and password.');
            return false;
        }

        const data = {
            "user_email": this.state.email,
            "user_password": this.state.pass,
            "authen_method": "local",
            "device": Platform.OS
        }
        this.setState({ spinner: true });
        try {
            let loginRequest = await http.post(apiServer.url + '/api/backend/user/login', data);
            let {token, status} = loginRequest.data;
   
            await AsyncStorage.setItem('token', token);
            await this.callInfomation();
        } catch (e) {
            if(e.response.status === 401) {
                Alert.alert("Wrong email or password.");
                this.setState({ spinner: false });
            }
        }
         
    };

    callInfomation = async () => {
        await http.setTokenHeader();
        let response = await http.post(apiServer.url + '/api/backend/user/information');
        let {status, data} = response.data;

        if (status == "success") {
            await AsyncStorage.setItem( 'user_data', JSON.stringify(data) );
            await this.setState({ spinner: false });
            await Actions.replace('Main');
        } else {
            Alert.alert('Can\'t login: issue about server response data please try again.');
            this.setState({ spinner: false });
        }
    };

    emailValidate = async value => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(value) === false) {
            await this.setState({emailBorder: 'red', email: value.toLowerCase(), emailEnable: false });
            await this.setState({disableLogin: true});
        } else {
            await this.setState({emailBorder: this.state.defaultBorder, email: value.toLowerCase(), emailEnable: true });
            await this.loginCheck();
        }
    }

    passwordValidate = async (value) => {
        if (value.length <= 3) {
            await this.setState({passwordBorder: 'red', pass: value, passwordEnable: false });
            await this.setState({disableLogin: true});
        } else {
            await this.setState({passwordBorder: this.state.defaultBorder, pass: value, passwordEnable: true });
            await this.loginCheck();
        }
    }

    loginCheck = () => {
        if(this.state.emailEnable && this.state.passwordEnable) {
            this.setState({disableLogin: false});
        }
    }
    
    render() {
        const {spinner} = this.state;
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : "height"}>
                    <View style={{
                        marginTop: hp('8%'),
                        flexDirection: 'row',
                        justifyContent: 'center',
                        ...style.container
                    }}>
                        <Spinner
                            visible={spinner}
                        />
                        <View style={styleScoped.imageLogo}>
                            <Image
                                source={ require('../../assets/images/logo.png') }
                                style={style.imageContain}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: hp('5%') }}>
                        <Text style={styleScoped.textWelcome}>Welcome</Text>
                    </View>
                    <View style={style.container}>
                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{...style.customInput, borderColor: this.state.emailBorder}}>
                                <TextInput
                                    value={this.state.email}
                                    style={[style.input, { color: 'black', paddingVertical: 3, paddingHorizontal: 8 }]}
                                    placeholder="Email address"
                                    keyboardType='email-address'
                                    onChangeText={ text => this.emailValidate(text) }
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: hp('1%') }}>
                            <View style={{...style.customInput, borderColor: this.state.passwordBorder, display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                                <TextInput
                                    value={this.state.pass}
                                    style={[style.input, { color: 'black', width: wp(70) }]}
                                    placeholder="Password"
                                    secureTextEntry={this.state.statusSecureText}
                                    onChangeText={ text => this.passwordValidate(text) }
                                />
                                <Icon color={this.state.statusSecureText ? "#ccc" : "#333"} type="font-awesome" name={"eye"} onPress={ () => this.setState({statusSecureText: this.state.statusSecureText?false:true }) } />
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
                                disabled={ this.state.disableLogin }
                                buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                                onPress={ () => this.callLogin() }
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


