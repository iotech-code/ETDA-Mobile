
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
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-community/google-signin';
import axios from 'axios';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
// GoogleSignin.configure({
//     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//     webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
//     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//     hostedDomain: '', // specifies a hosted domain restriction
//     loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
//     forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//     accountName: '', // [Android] specifies an account name on the device that should be used
//     iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   });
export default class Login extends Component {
    constructor() {
        super();
        this.state = { email: '', pass: '' }
    }


    componentDidMount = () =>{
        GoogleSignin.configure({
            webClientId: '146795595892-q5e7v9jjg39gfdp5c7a9310iob9butdq.apps.googleusercontent.com', 
            offlineAccess: true,
          });
    }

    callLogin = async (type , email  , pass , social_id ) => {
        console.log('come in ')
        const data = {
            "user_email": email,
            "user_password": pass,
            "authen_method": type,
            "social_id" : social_id
        }
        // console.log(apiServer.url + '/api/backend/user/login',data)
        axios.post(apiServer.url + '/api/backend/user/login', data)
            .then((response) => {
                console.log(response.data)
                if (response.data.status == "success") {
                    if (response.data.token != "") {
                        AsyncStorage.setItem('token', response.data.token);
                        this.callInfomation(response.data.token)
                    }
                } else {
                    alert("Wrong email or password.")
                }
            })
            .catch((error) => {
            })
            .finally(function () {
            });

    };



    initUser(token) {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
        .then((response) => response.json())
        .then((json) => {
            console.log('email : ' , json.email) 
            // this.setState({
            //     email : json.email
            // }) 
            this.callLogin('facebook' , json.email , '' , json.id)
        })
        .catch(() => {
          reject('ERROR GETTING DATA FROM FACEBOOK')
        })
      }


      signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          this.callLogin('google' , userInfo.user.email , '' , userInfo.user.id)
        } catch (error) {
            console.log('error info : ' , error)
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
      };

    callInfomation = async (token) => {
        console.log('come in ')
        const data = {
            "Token": token
        }
        axios.post(apiServer.url + '/api/backend/user/information', data)
            .then((response) => {


                if (response.data.status == "success") {
                    var name = ''
                    var image = ''
                    if (response.data.data.fullname == null){
                        name = ''
                    }else{
                        name = response.data.data.fullname 
                    }

                    if (response.data.data.photo == null){
                        image = ''
                    }else{
                        image = response.data.data.photo
                    }
                    AsyncStorage.setItem('user_type', response.data.data.user_type)
                    AsyncStorage.setItem('user_role', response.data.data.user_role)
                    AsyncStorage.setItem('fullname', name)
                    AsyncStorage.setItem('photo', image)
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
                                    this.callLogin('local' , this.state.email , this.state.pass , '')
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
                                onPress={() => {
                                    LoginManager.logInWithPermissions(["public_profile", "email"])
                                    .then((response) => {
                                        if (response.isCancelled) {
                                            return null
                                        } else {
                                            return AccessToken.getCurrentAccessToken().then(
                                                (data) => {
                                                    this.initUser(data.accessToken.toString())
                                                }
                                            )
                                        }
                                    }).catch((error) => {
                                        return error
                                    }).finally(function () {
                                    });
                                }
                                }
                            />
                        </View>
                        <View style={{ marginTop: hp('2%') }}>
                            <Button
                                title="Continue with Google"
                                buttonStyle={{ padding: hp('1.5%'), ...style.btnGoogle, ...style.btnRounded }}
                                onPress={() => {
                                        this.signIn()
                                }}
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


