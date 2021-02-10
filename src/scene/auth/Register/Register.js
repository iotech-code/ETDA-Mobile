
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
    Alert,
    KeyboardAvoidingView,
    Linking
} from 'react-native';

import { Button, CheckBox, Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../../styles/base';
import { Actions } from 'react-native-router-flux';
import { colors } from '../../../constant/util';
export default class Register extends Component {

    constructor() {
        super();
        this.state = { 
            rEmail: '', 
            rPass: '', 
            rCPass: '', 
            rPolicy: false, 
            statusSecureText: true, 
            statusSecureConfirmText: true 
        }
    }

    render() {
        const nextStep = () => {
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
            } else {

            }
            Actions.push('ChooseUserType', { 'email': this.state.rEmail, 'password': this.state.rPass, 'accept_term': 'active'})
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
                                        style={[style.input, { color: 'black', width: wp(81), paddingVertical: 3, paddingHorizontal: 10 }]}
                                        keyboardType='email-address'
                                        placeholder="Email address"
                                        onChangeText={ value =>  this.setState({ rEmail: value.toLowerCase() }) }
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: hp('1%') }}>
                                <View style={{...style.customInput, display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                                    <TextInput
                                        style={[style.input, { color: 'black', width: wp(70) }]}
                                        value={this.state.rPass}
                                        placeholder="Password"
                                        secureTextEntry={this.state.statusSecureText}
                                        onChangeText={ value =>  this.setState({ rPass: value.toLowerCase() }) }
                                    />
                                    <Icon color={this.state.statusSecureText ? "#ccc" : "#333"} type="font-awesome" name={"eye"} onPress={ () => this.setState({statusSecureText: this.state.statusSecureText?false:true }) } />

                                </View>
                            </View>
                            <View style={{ marginTop: hp('1%') }}>
                                <View style={{...style.customInput, display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                                    <TextInput
                                        style={[style.input, { color: 'black', width: wp(70) }]}
                                        value={this.state.rCPass}
                                        placeholder="Confirm Password"
                                        secureTextEntry={this.state.statusSecureConfirmText}
                                        onChangeText={ value =>  this.setState({ rCPass: value.toLowerCase() }) }
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
                                    onPress={() => this.setState({rPolicy: !this.state.rPolicy})}
                                    />
                                </View>

                                <TouchableOpacity
                                onPress={() => Linking.openURL("https://www.etda.or.th/th/privacy/term-of-use.aspx")} >
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
                                    title="Continue"
                                    buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                                    onPress={ () => nextStep() }
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


