
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
    Platform
} from 'react-native';
import axios from 'axios';

import { Button, Overlay } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fonts, colors } from '../../../constant/util'

export default class ChooseUserType extends Component {

    constructor(props) {
        super(props)
        this.state = { rType: 'read', rReason: '', rExp: [], rExp1: '', rExp2: '', rExp3: '', visible: false }

    }




    renderModalPostandRead() {
        const { visible } = this.state
        onChangeTextReason = async (value) => {
            this.setState({
                rReason: value
            })
        }

        onChangeTextExp1 = async (value) => {
            this.setState({
                rExp1: value
            })
        }


        onChangeTextExp2 = async (value) => {
            this.setState({
                rExp2: value
            })
        }

        onChangeTextExp3 = async (value) => {
            this.setState({
                rExp3: value
            })
        }
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
                        style={{ fontSize: hp('2%'), padding: 0 }}
                        placeholder="Enter your reason…"
                        multiline={true}
                        onChangeText={(value) => {
                            onChangeTextReason(value)
                        }}
                    // numberOfLines={ Platform.OS === 'ios' ? 50 : 0}
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
                        style={{ ...style.customInput, fontSize: hp('2%') }}
                        placeholder="Enter your experience…"
                        onChangeText={(value) => {
                            onChangeTextExp1(value)
                        }}
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <TextInput
                        style={{ ...style.customInput, fontSize: hp('2%') }}
                        placeholder="Enter your experience…"
                        onChangeText={(value) => {
                            onChangeTextExp2(value)
                        }}
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <TextInput
                        style={{ ...style.customInput, fontSize: hp('2%') }}
                        placeholder="Enter your experience…"
                        onChangeText={(value) => {
                            onChangeTextExp3(value)
                        }}
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <Button
                        title="Confirm"
                        buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                        onPress={() => { this.setState({ visible: false }) }}
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
            </Overlay>
        )
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
                        <View style={styleScoped.imageLogo}>
                            <Image
                                source={require('../../../assets/images/logo_etda-default-1.png')}
                                style={style.imageContain}
                            />
                        </View>

                    </View>
                    <View style={{ marginTop: hp('3%') }}>
                        <Text style={styleScoped.textWelcome}>Please, select type of your account</Text>
                    </View>
                    <View style={style.container}>

                        <View style={{ marginTop: hp('5%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={{ width: '49%' }}
                                onPress={() => {
                                    this.setState({
                                        rType: 'read',
                                        visible: false
                                    })
                                }}

                            >
                                <View style={{ ...styleScoped.option, backgroundColor: colors.primary }}>
                                    <Icon name="description" size={hp('12%')} style={{ alignSelf: "center" }} color="white" />
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
                                onPress={() => this.setState({ visible: true, rType: 'post_read' })}
                            >
                                <View style={styleScoped.option}>
                                    <Icon name="create" size={hp('12%')} style={{ alignSelf: "center" }} color={colors.primary} />
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
                                buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                                onPress={() => {
                                    this.callRegister()
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
                </SafeAreaView>
                {this.renderModalPostandRead()}
            </View>
        );
    }

    callRegister = async () => {
        const { navigation } = this.props;
        this.state.rExp.push(this.state.rExp1)
        this.state.rExp.push(this.state.rExp2)
        this.state.rExp.push(this.state.rExp3)

        const data = {
            "user_email": navigation.getParam('email', ''),
            "user_password": navigation.getParam('password', ''),
            "user_rq_type": this.state.rType,
            "rq_reason": this.state.rReason,
            "rq_exp": this.state.rExp,
            "accept_term": navigation.getParam('accept_term', '')
        }

        axios.post('https://etda.amn-corporation.com/api/backend/user/register', data)
            .then((response) => {
                if (response.data.status == "success") {
                    Actions.RegisterSuccess({ 'email': navigation.getParam('email', ''), 'password': navigation.getParam('password', '') })
                } else {

                }
            })
            .catch((error) => {

            })
            .finally(function () {
            });

    };
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


