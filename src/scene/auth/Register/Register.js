
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
    TextInput,
    KeyboardAvoidingView
} from 'react-native';

import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../../styles/base'
import { Actions } from 'react-native-router-flux'
import CheckBox from '@react-native-community/checkbox';
import { colors } from '../../../constant/util'
export default class Register extends Component {

    constructor() {
        super();
        this.state = { rEmail: '', rPass: '', rCPass: '', rPolicy: 'in-active' }
    }

    render() {
        onChangeTextEmail = async (value) => {
            this.setState({
                rEmail: value
            })
        }

        onChangeTextPassword = async (value) => {
            this.setState({
                rPass: value
            })
        }


        onChangeTextConfirmPassword = async (value) => {
            this.setState({
                rCPass: value
            })
        }


        // on change checkbox 

        onChangeCheckBox = (value) => {
            var policy = ""
            if (value) {
                policy = "active"
            } else {
                policy = "in-active"
            }

            this.setState({
                rPolicy: policy
            })
        }
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                <KeyboardAvoidingView behavior="position">
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
                                    style={style.imageContain}
                                />
                            </View>

                        </View>
                        <View style={{ marginTop: hp('3%') }}>
                            <Text style={styleScoped.textWelcome}>Register</Text>
                        </View>
                        <View style={style.container}>
                            <View style={{ marginTop: hp('3%') }}>
                                <View style={style.customInput}>
                                    <TextInput
                                        value={this.state.rEmail}
                                        style={style.input}
                                        keyboardType='email-address'
                                        placeholder="Email address"
                                        onChangeText={(value) => {
                                            onChangeTextEmail(value.toLowerCase())
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: hp('1%') }}>
                                <View style={style.customInput}>
                                    <TextInput
                                        style={style.input}
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        onChangeText={(value) => {
                                            onChangeTextConfirmPassword(value)
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: hp('1%') }}>
                                <View style={style.customInput}>
                                    <TextInput
                                        style={style.input}
                                        placeholder="Confirm Password"
                                        secureTextEntry={true}
                                        onChangeText={(value) => {
                                            onChangeTextPassword(value)
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: hp('2%') }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <CheckBox
                                        disabled={false}
                                        tintColors={{ true: colors.primary }}
                                        boxType="square"
                                        style={{ marginRight: hp('1%'), }}
                                        value={this.state.rPolicy == 'in-active' ? false : true}
                                        onValueChange={(newValue) => {
                                            onChangeCheckBox(newValue)
                                        }}
                                    />

                                    <Text style={{
                                        color: '#B5B5B5',
                                        textAlign: 'center',
                                        fontSize: hp('1.7%')
                                    }}>To continue, you agree to ETDA app’s</Text>
                                </View>

                                <Text style={{
                                    marginTop: hp('1%'),
                                    color: '#003764',
                                    textAlign: 'center',
                                    textDecorationLine: 'underline',
                                    fontSize: hp('1.7%')
                                }}>Terms of service, Privacy policy.</Text>
                            </View>
                            <View style={{ marginTop: hp('3%') }}>
                                <Button
                                    title="Continue"
                                    buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                                    onPress={() => {
                                            if (this.state.rEmail === '') {
                                                alert('Please fill your email address.')
                                                return false
                                            }
                                            if( this.state.rPass !== this.state.rCPass ) {
                                                alert('Password and confirm password does not match!')
                                                return false
                                            }
                                            if (this.state.rPolicy === 'in-active') {
                                                alert('Please agree term and condition before continue.')
                                                return false
                                            }
                                            
                                            Actions.push('ChooseUserType', { 'email': this.state.rEmail, 'password': this.state.rPass, 'accept_term': this.state.rPolicy })
                                        }
                                    }
                                />
                            </View>
                            <View style={{ marginTop: hp('4%'), alignItems: 'center', ...style.boxTextBorder }}>
                                <Text style={{ ...style.textOnBorder, fontSize: hp('2%'), color: '#B5B5B5' }}>Or</Text>
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


