
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
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import HttpRequest from '../../../Service/HttpRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Overlay } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fonts, colors, apiServer } from '../../../constant/util';
import Spinner from 'react-native-loading-spinner-overlay';

const http = new HttpRequest();
export default class ChooseUserType extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            rType: '',
            rReason: '', 
            rExp: {
                exp1: '',
                exp2: '',
                exp3: ''
            },
            visible: false,
            spinner: false,
            registerButton: true,
            activeType: {
                readBg: '#fff',
                readTxt: colors.primary,
                postBg: '#fff',
                postTxt: colors.primary
            }
        }

    }

    confirmType (type) {
        this.setState({ 
            rType: type, 
            visible: false,
            registerButton: false,
            activeType: {
                readBg: type == 'read' ? colors.primary : '#fff',
                readTxt: type == 'read' ? '#fff' : colors.primary,
                postBg: type == 'read,post_read' ? colors.primary : '#fff',
                postTxt: type == 'read,post_read' ? '#fff' : colors.primary,
            }
        });

    }

    renderModalPostandRead() {
        const { visible } = this.state
        return (
            <Overlay
                isVisible={this.state.visible}
                overlayStyle={{
                    width: wp('90%'),
                    paddingVertical: hp('2%'),
                    paddingHorizontal: hp('2%'),
                    borderRadius: 5
                }}
            >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView>
                        <View style={{
                            borderBottomColor: '#707070',
                            borderBottomWidth: 1,
                            paddingBottom: hp('1.5%')
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: fonts.color.primary,
                                fontSize: hp('1.7%'),
                                fontWeight: '600'
                            }}>Register posts and read permission</Text>
                        </View>
                        <Text
                            style={{
                                marginVertical: hp('2%'),
                                textAlign: 'left',
                                fontSize: hp('1.8%'),
                                lineHeight: 27,
                                fontWeight: '300'
                            }}
                        >
                            Please, enter your reason for register
                            account in posts and read permission.
                    </Text>

                        <View style={{ ...style.customInput, height: hp('15%') }}>
                            <TextInput
                                style={{ fontSize: hp('2%'), padding: 0,  }}
                                placeholder="Enter your reason…"
                                multiline={true}
                                value={this.state.rReason}
                                onChangeText={ (value) => this.setState({rReason: value}) }
                                numberOfLines={Platform.OS === 'ios' ? 50 : 0}
                            />
                        </View>

                        <Text
                            style={{
                                marginTop: hp('2%'),
                                marginBottom: hp('1%'),
                                textAlign: 'left',
                                fontSize: hp('1.8%'),
                                lineHeight: 27,
                                fontWeight: '300'
                            }}
                        >
                            Please, enter your experience or
                            workmanship that will help make decision
                            for ETDA. (Give 3 experience or less than)
                    </Text>

                        <View >
                            <TextInput
                                value={this.state.rExp.exp1}
                                style={{ ...style.customInput, fontSize: hp('2%') }}
                                placeholder="Enter your experience…"
                                onChangeText={ (value) => this.setState({ rExp: { ...this.state.rExp, exp1: value } } ) }
                            />
                        </View>
                        <View style={{ marginTop: hp('1%') }}>
                            <TextInput
                                value={this.state.rExp.exp2}
                                style={{ ...style.customInput, fontSize: hp('2%') }}
                                placeholder="Enter your experience…"
                                onChangeText={ (value) => this.setState({ rExp: { ...this.state.rExp, exp2: value} } ) }
                            />
                        </View>
                        <View style={{ marginTop: hp('1%') }}>
                            <TextInput
                                value={this.state.rExp.exp3}
                                style={{ ...style.customInput, fontSize: hp('2%') }}
                                placeholder="Enter your experience…"
                                onChangeText={ (value) => this.setState({ rExp: { ...this.state.rExp, exp3: value} } ) }
                            />
                        </View>
                        <View style={{ marginTop: hp('1%') }}>
                            <Button
                                title="Confirm"
                                buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                                onPress={() => this.confirmType('read,post_read') }
                            />
                        </View>
                        <View style={{ marginTop: hp('1%') }}>
                            <Button
                                title="Cancle"
                                Outline={true}
                                titleStyle={{ color: '#003764', }}
                                buttonStyle={{
                                    padding: hp('1.5%'),
                                    ...style.btnPrimaryOutline,
                                    ...style.btnRounded
                                }}
                                onPress={() => this.setState({ visible: false })}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Overlay>
        )
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView>
                        <View style={{
                            marginTop: hp('3%'),
                            flexDirection: 'row',
                            justifyContent: 'center',
                            ...style.container
                        }}>
                            <Spinner visible={this.state.spinner} />
                            <View style={styleScoped.imageLogo}>
                                <Image
                                    source={require('../../../assets/images/logo.png')}
                                    style={style.imageContain}
                                />
                            </View>

                        </View>

                        <View style={style.container}>
                            <View style={{ marginTop: hp('3%') }}>
                                <Text style={styleScoped.textWelcome}>Please, select type of your account</Text>
                            </View>
                            <View style={{ marginTop: hp('5%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity style={{ width: '49%' }}
                                    onPress={() => this.confirmType('read') }
                                >
                                    <View style={{ ...styleScoped.option, backgroundColor: this.state.activeType.readBg } }>
                                        <Icon name="description" size={hp('12%')} style={{ alignSelf: "center" }} color={this.state.activeType.readTxt} />
                                    </View>
                                    <Text style={{
                                        marginTop: hp('3%'),
                                        textAlign: 'center',
                                        fontSize: hp('2%')
                                    }}>
                                        Read only
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ width: '49%' }}
                                    onPress={() => this.setState({ visible: true, rType: 'read,post_read' })}
                                >
                                    <View style={{ ...styleScoped.option, backgroundColor: this.state.activeType.postBg }}>
                                        <Icon name="create" size={hp('12%')} style={{ alignSelf: "center" }} color={this.state.activeType.postTxt} />
                                    </View>
                                    <Text style={{
                                        marginTop: hp('3%'),
                                        textAlign: 'center',
                                        fontSize: hp('2%')
                                    }}>
                                        Posts and Read
                                    </Text>
                                </TouchableOpacity>

                            </View>

                            <View style={{ marginTop: hp('3%') }}>
                                <Button
                                    title="Register"
                                    disabled={this.state.registerButton}
                                    buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                                    onPress={() => this.callRegister()}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
                {this.renderModalPostandRead()}
            </View>

        );
    }

    callRegister = async () => {
        const data = {
            "user_email": this.props.email,
            "user_password": this.props.password,
            "name": this.props.fullname,
            "user_rq_type": this.state.rType,
            "rq_reason": this.state.rReason,
            "rq_exp": {
                "exp1": this.state.rExp.exp1,
                "exp2": this.state.rExp.exp2,
                "exp3": this.state.rExp.exp3
            },
            "accept_term": 'yes',
            "authen_method": this.props.source
        }
        console.log(data)
        return false;
        let registerReq = await http.post(apiServer.url + '/api/backend/user/register', data);
        let { status } = await registerReq.data;
       
        if (status == 'success') {
            if (this.state.rType == 'read') {
                this.callLogin();
            } else {
                Actions.RegisterSuccess({ 'email': this.props.email, 'password': this.props.password });
            }
        }
    }

    callLogin = async () => {
        const data = {
            "user_email": this.props.email,
            "user_password": this.props.password,
            "authen_method": "local",
            "device": Platform.OS
        }
        this.setState({ spinner: true });
        let loginRequest = await http.post(apiServer.url + '/api/backend/user/login', data);
        let {status, token} = await loginRequest.data;

        if (status == "success") {
            await AsyncStorage.setItem('token', token);
            this.callInfomation();
        }
    }

    callInfomation = async () => {
        await http.setTokenHeader();
        let request = await http.post(apiServer.url + '/api/backend/user/information');
        let {status, data} = await request.data;
        this.setState({ spinner: false });
        if (status == "success") {
            await AsyncStorage.setItem('user_data', JSON.stringify(data));
            Actions.replace('Main');
        } else {
            alert('Can\'t login: issue about server response data please try again.')
        }
        
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
    },
    option: {
        padding: hp('3%'),
        borderRadius: 10,
        borderColor: colors.primary,
        borderWidth: 1,
        width: '100%',
        height: hp('20%')
    },
    optionActive: {
        padding: hp('3%'),
        borderRadius: 10,
        borderColor: '#003764',
        borderWidth: 1,
        width: '100%',
        height: hp('20%')
    }
});


