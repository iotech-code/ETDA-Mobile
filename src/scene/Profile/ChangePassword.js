
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import HttpRequest from '../../Service/HttpRequest';
import { apiServer } from '../../constant/util';
import { Alert } from 'react-native';
import translate from '../../constant/lang'

const http = new HttpRequest();
export default class ChangePassword extends Component {
    constructor() {
        super();
        this.state = {
            visibleSearch: false,
            oldPass: '',
            newPass: '',
            confirmPass: '',
            user_data: '',
            passwordBorder: '#CADAFB',
            statusSecureTextOld: true,
            statusSecureTextNew: true,
            statusSecureTextConfirm: true,
            lng: {}
        }
    }

    async UNSAFE_componentWillMount() {
        await this.getLang();
    }

    async getLang() {
        this.setState({ isFetching: true })
        let vocap = await translate()
        this.setState({ lng: vocap })
        this.setState({ isFetching: false })
    }

    async componentDidMount() {
        try {
            const userInfo = await AsyncStorage.getItem('user_data');
            this.setState({
                user_data: JSON.parse(userInfo)
            })
        } catch (e) {
            console.log(e)
        }
    }

    componentWillUnmount() {
        this.setState({})
    }

    callChangePassword = async () => {
        const data = {
            "old_ps": this.state.oldPass,
            "new_ps": this.state.newPass
        }
        await this.verifyPassword();
        await http.setTokenHeader();
        const changeRequest = await http.post( apiServer.url + '/api/backend/user/change-password', data);
        const { status } = await changeRequest.data;
        if (status == "success") {
            alert("Change password success!")
            Actions.pop();
        } else {
            Alert.alert("Error", "Invalid password.")
        
        }
    };

    verifyPassword () {
        if( this.state.confirmPass !== this.state.newPass ) {
            Alert.alert('Password and confirm password does not match!')
            return false
        }

        if( this.state.old === ''|| this.state.newPass === '' || this.state.confirmPass === '' ) {
            Alert.alert('Password can not empty!')
            return false
        }
        return true;
    }

    render() {
        const {lng} = this.state
        return (
            <View style={{flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ backgroundColor: 'white', paddingBottom: hp('2%') }}>
                        <View style={{ ...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.replace('ProfileSetting')} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.change_password}</Text>
                            <TouchableOpacity onPress={() => this.callChangePassword()}>
                                <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.save}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{...style.container, marginTop: 20}}>
                        <Text style={{ fontSize: hp('2%'), marginBottom: hp('1%') }}>{lng.current_password}</Text>
                        <View style={{...style.customInput, borderColor: this.state.passwordBorder, display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                            <TextInput
                                value={this.state.oldPass}
                                maxLength={20}
                                style={[style.input, { color: 'black', width: wp(70) }]}
                                placeholder={lng.current_password}
                                placeholderTextColor="#ccc"
                                secureTextEntry={this.state.statusSecureTextOld}
                                onChangeText={text => this.setState({ oldPass: text })}
                            />
                            <Icon color={this.state.statusSecureTextOld ? "#ccc" : "#333"} type="font-awesome" name={"eye"} onPress={() => this.setState({statusSecureTextOld: this.state.statusSecureTextOld?false:true })} />
                        </View>
                        <Text style={{ textAlign: 'right', color: '#4267B2', marginRight: hp('2%'), marginTop: 5 }}> {this.state.oldPass.length}/20 </Text>

                        <Text style={{ fontSize: hp('2%'), marginBottom: hp('1%') }}>{lng.new_password}</Text>
                        <View style={{...style.customInput, borderColor: this.state.passwordBorder, display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                            <TextInput
                                value={this.state.newPass}
                                maxLength={20}
                                style={[style.input, { color: 'black', width: wp(70) }]}
                                placeholder={lng.enter_new_password}
                                placeholderTextColor="#ccc"
                                secureTextEntry={this.state.statusSecureTextNew}
                                onChangeText={text => this.setState({ newPass: text })}
                            />
                            <Icon color={this.state.statusSecureTextNew ? "#ccc" : "#333"} type="font-awesome" name={"eye"} onPress={() => this.setState({statusSecureTextNew: this.state.statusSecureTextNew?false:true })} />
                        </View>
                        <Text style={{ textAlign: 'right', color: '#4267B2', marginRight: hp('2%'), marginTop: 5 }}>{this.state.newPass.length}/20</Text>

                        <Text style={{ fontSize: hp('2%'), marginBottom: hp('1%') }}>{lng.confirm_new_password}</Text>
                        <View style={{...style.customInput, borderColor: this.state.passwordBorder, display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                            <TextInput
                                value={this.state.confirmPass}
                                maxLength={20}
                                style={[style.input, { color: 'black', width: wp(70) }]}
                                placeholder={lng.confirm_your_password}
                                placeholderTextColor="#ccc"
                                secureTextEntry={this.state.statusSecureTextConfirm}
                                onChangeText={text => this.setState({ confirmPass: text })}
                            />
                            <Icon color={this.state.statusSecureTextConfirm ? "#ccc" : "#333"} type="font-awesome" name={"eye"} onPress={() => this.setState({statusSecureTextConfirm: this.state.statusSecureTextConfirm?false:true })} />
                        </View>
                        <Text style={{ textAlign: 'right', color: '#4267B2', marginRight: hp('2%'), marginTop: 5 }}>{this.state.confirmPass.length}/20</Text>
                    </View>

                </ScrollView>
            </View >
        );
    }
};

const styleScoped = StyleSheet.create({
    btnImageProfile: {
        // padding: hp('1%'),
        width: hp('4%'),
        height: hp('4%'),
        borderRadius: 100,
        // borderWidth: 1,
        // borderColor: 'black',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#003764',
        position: 'absolute',
        right: 2,
        bottom: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
});


