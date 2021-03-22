
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
    Platform,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Linking
} from 'react-native';

import { Button, CheckBox, Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../../styles/base';
import { Actions } from 'react-native-router-flux';
import { configs } from '../../../constant/util';
import { 
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager, } from "react-native-fbsdk";
import {
    GoogleSignin,
    statusCodes } from '@react-native-community/google-signin';
import Line from '@xmartlabs/react-native-line'

export default class Register extends Component {

    constructor() {
        super();
        this.state = { 
            rEmail: '', 
            fullname: '',
            rPass: '', 
            rCPass: '', 
            rPolicy: false, 
            statusSecureText: true, 
            statusSecureConfirmText: true,
            disable: true,
            emailBorder: '#CADAFB',
            nameBorder: '#CADAFB',
            passwordBorder: '#CADAFB',
            passwordConfirmBorder: '#CADAFB',
            defaultBorder: '#CADAFB'
        }
    }

    componentDidMount () {
        GoogleSignin.configure({
            webClientId: configs.firebaseWebClientID, // client ID of type WEB for your server(needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            accountName: '', // [Android] specifies an account name on the device that should be used
        });
    }

    async LineAuthen () {
        try{
            const result = await Line.login({
                scopes: ['profile'],
                botPrompt: 'normal'
            })
            const {userProfile} = result

            const userInfo = {
                'email': userProfile.userID, 
                'password': '',
                'source': 'line',
                'fullname': userProfile.displayName 
            }

            // console.log(userInfo)
            
            await Actions.push('ChooseUserType', userInfo)
        } catch (e) {
            console.log(e)
        }
    }

    async GoogleLogin () {
        try {
            await GoogleSignin.hasPlayServices();
            const info = await GoogleSignin.signIn();
            const {user} = info

            const userInfo = {
                'email': user.id, 
                'password': '',
                'source': 'google',
                'fullname': user.givenName 
            }
            // console.log(userInfo)
            await Actions.push('ChooseUserType', userInfo)
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
    }

    async facebookRegister(error, result) {
        if (error) {
            console.log('Error fetching data: ' + error.toString());
            return false;
        }

        const userInfo = {
            'email': result.id, 
            'password': '', 
            'source': 'facebook', 
            'fullname': result.name 
        }
        // console.log(userInfo)
        Actions.push('ChooseUserType', userInfo)
    }

    async facebookLogin () {
        const LoginRequest = await LoginManager.logInWithPermissions(["public_profile"])
        if (LoginRequest.isCancelled) {
            console.log("Login cancelled");
          } else {
              const getAccessToken = await AccessToken.getCurrentAccessToken()
              const fbToken = await getAccessToken.accessToken.toString();
              const profileRequest = await new GraphRequest( 
                  '/me', 
                  {
                      accessToken: fbToken, 
                      parameters: {
                          fields: {
                              string: 'email, id, name,  first_name, last_name',
                          }
                      }
                  }, 
                  this.facebookRegister
              );
              new GraphRequestManager().addRequest(profileRequest).start();
        }
    }

    async nextStep () {
        if (this.state.rEmail === '') {
            Alert.alert('Please fill your email address.')
            return false
        }
        if( this.state.rPass !== this.state.rCPass ) {
            Alert.alert('Password and confirm password does not match!')
            return false
        }
        if (!this.state.rPolicy) {
            Alert.alert('Please agree term and condition before continue.')
            return false
        }
        const userInfo = { 
            'email': this.state.rEmail, 
            'password': this.state.rPass, 
            'fullname': this.state.fullname, 
            'source': 'local'
        }
        // console.log(userInfo)
        Actions.push('ChooseUserType', userInfo)
    }

    async emailValidate (value) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        if (reg.test(value) === false) {
            await this.setState({emailBorder: 'red', rEmail: value.toLowerCase(), disable: true });
        } else {
            await this.setState({emailBorder: this.state.defaultBorder, rEmail: value.toLowerCase() });
            this.validate();
        }
    }

    async nameValidate (value) {
        if (value == '') {
            await this.setState({nameBorder: 'red', disable: true, fullname: value });
        } else {
            await this.setState({nameBorder: this.state.defaultBorder, fullname: value });
            await this.validate();
        }
    }

    async passwordValidate (value) {
        if (value.length <= 3) {
            await this.setState({passwordBorder: 'red', rPass: value, disable: true });
        } else {
            await this.setState({passwordBorder: this.state.defaultBorder, rPass: value });
            await this.validate();
        }
    }
    async passwordConfirmValidate (value) {
        if (value.length <= 3) {
            await this.setState({passwordConfirmBorder: 'red', rCPass: value, disable: true });
        } else {
            await this.setState({passwordConfirmBorder: this.state.defaultBorder, rCPass: value });
            await this.validate();
        }
    }

    async checkboxValidate() {
        await this.setState({rPolicy: !this.state.rPolicy});
        await this.validate();
    }

    validate () {
        if ( this.state.rEmail === '' || this.state.rPass !== this.state.rCPass || !this.state.rPolicy ) {
            this.setState({ disable: true });
            return false
        } else {
            this.setState({ disable: false });
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView>
                        <View style={{
                            marginTop: hp('3%'),
                            flexDirection: 'row',
                            justifyContent: 'center',
                            ...style.container
                        }}>
                            <View style={styleScoped.imageLogo}>
                                <Image
                                    source={require('../../../assets/images/logo.png')}
                                    style={ style.imageContain }
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: hp('3%') }}>
                            <Text style={styleScoped.textWelcome}>Register</Text>
                        </View>
                        <View style={style.container}>
                            <View style={{ marginTop: hp('3%') }}>
                                <View style={{...style.customInput, borderColor: this.state.emailBorder}}>
                                    <TextInput
                                        value={this.state.rEmail}
                                        style={[style.input, { color: 'black', width: wp(81), paddingVertical: 3, paddingHorizontal: 10 }]}
                                        keyboardType='email-address'
                                        placeholder="Email address"
                                        placeholderTextColor="#ccc"
                                        onChangeText={ value =>  this.emailValidate(value) }
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: hp('1%') }}>
                                <View style={{...style.customInput, borderColor: this.state.nameBorder}}>
                                    <TextInput
                                        value={this.state.fullname}
                                        style={[style.input, { color: 'black', width: wp(81), paddingVertical: 3, paddingHorizontal: 10 }]}
                                        placeholder="Name"
                                        placeholderTextColor="#ccc"
                                        onChangeText={ value =>  this.nameValidate(value) }
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: hp('1%') }}>
                                <View style={{...style.customInput, display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', borderColor: this.state.passwordBorder}}>
                                    <TextInput
                                        style={[style.input, { color: 'black', width: wp(70) }]}
                                        value={this.state.rPass}
                                        placeholder="Password"
                                        placeholderTextColor="#ccc"
                                        secureTextEntry={this.state.statusSecureText}
                                        onChangeText={ value =>  this.passwordValidate(value) }
                                    />
                                    <Icon color={this.state.statusSecureText ? "#ccc" : "#333"} type="font-awesome" name={"eye"} onPress={ () => this.setState({statusSecureText: this.state.statusSecureText?false:true }) } />
                                </View>
                            </View>
                            <View style={{ marginTop: hp('1%') }}>
                                <View style={{...style.customInput, display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', borderColor: this.state.passwordConfirmBorder}}>
                                    <TextInput
                                        style={[style.input, { color: 'black', width: wp(70) }]}
                                        value={this.state.rCPass}
                                        placeholder="Confirm Password"
                                        placeholderTextColor="#ccc"
                                        secureTextEntry={this.state.statusSecureConfirmText}
                                        onChangeText={ value =>  this.passwordConfirmValidate(value) }
                                    />
                                    <Icon color={this.state.statusSecureConfirmText ? "#ccc" : "#333"} type="font-awesome" name={"eye"} onPress={() => this.setState({statusSecureConfirmText: this.state.statusSecureConfirmText?false:true })} />
                                </View>
                            </View>
                            <View style={{ marginTop: hp('2%') }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}> 
                                    <CheckBox
                                    title='To continue, you agree to ETDA app’s'
                                    checked={this.state.rPolicy}
                                    containerStyle={{ borderWidth: 0, backgroundColor: '#fff' }}
                                    onPress={ () => this.checkboxValidate() }
                                    />
                                </View>

                                <TouchableOpacity
                                    onPress={() => Linking.openURL( configs.privacy )} >
                                    <Text
                                    style={{
                                        marginTop: hp('1%'),
                                        color: '#003764',
                                        textAlign: 'center',
                                        textDecorationLine: 'underline',
                                        fontSize: hp('1.7%')
                                    }}>Privacy policy.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: hp('3%') }}>
                                <Button
                                    disabled={this.state.disable}
                                    title="Continue"
                                    buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                                    onPress={ () => this.nextStep() }
                                />
                            </View>
                            <View style={{ marginTop: hp('4%'), alignItems: 'center', ...style.boxTextBorder }}>
                                <Text style={{ ...style.textOnBorder, fontSize: hp('2%'), color: '#B5B5B5' }}>Or</Text>
                            </View>
                            <View style={{ marginTop: hp('4%') }}>
                                <Button
                                    onPress={()=>this.LineAuthen()}
                                    title="Continue with Line"
                                    buttonStyle={{ padding: hp('1.5%'), ...style.btnLine, ...style.btnRounded }}
                                />
                            </View>
                            <View style={{ marginTop: hp('2%') }}>
                                <Button
                                    title="Continue with Facebook"
                                    onPress={ () => this.facebookLogin() }
                                    buttonStyle={{ padding: hp('1.5%'), ...style.btnFacebook, ...style.btnRounded }}
                                />
                            </View>
                            <View style={{ marginTop: hp('2%') }}>
                                <Button
                                    onPress={() => this.GoogleLogin()}
                                    title="Continue with Google"
                                    buttonStyle={{ padding: hp('1.5%'), ...style.btnGoogle, ...style.btnRounded }}
                                />
                            </View>

                            <View style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                                <Text style={{ color: '#707070', fontSize: hp('1.7%'), marginRight: hp('1%') }}>Do have an account?</Text>
                                <TouchableOpacity onPress={() => Actions.Login()}>
                                    <Text style={{ color: '#4267B2', textDecorationLine: 'underline', fontSize: hp('1.7%') }} >Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    imageLogo: {
        height: hp('10%'),
        width: hp('17%')
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


