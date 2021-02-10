
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
    FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, BottomSheet, Icon } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import IconFonAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import { colors, apiServer } from '../../constant/util'

export default class ChangePassword extends Component {
    constructor() {
        super();
        this.state = {
            visibleSearch: false,
            oldPass: '',
            newPass: '',
            confirmPass: '',
            token: '',
            statusSecureTextOld: true,
            statusSecureTextNew: true,
            statusSecureTextConfirm: true
        }
    }


    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token')
            this.setState({
                token: token
            })
        } catch (err) {
            // handle errors
        }
    }


    callChangePassword = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }

        const data = {
            "old_ps": this.state.oldPass,
            "new_ps": this.state.newPass
        }
        axios.post(apiServer.url + '/api/backend/user/change-password', data, {
            headers
        })
            .then((response) => {
                if (response.data.status == "success") {
                    Actions.MyProfile()
                } else {

                }
            })
            .catch((error) => {
            })
            .finally(function () {
            });

    };

    render() {

        onChangeTextOldPass = async (value) => {
            this.setState({
                oldPass: value
            })
        }

        onChangeTextNewPass = async (value) => {
            this.setState({
                newPass: value
            })
        }
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ backgroundColor: 'white', paddingBottom: hp('2%') }}>
                        <View style={{ ...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.replace('ProfileSetting')} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Chnage Password</Text>
                            <TouchableOpacity onPress={() => this.callChangePassword()}>
                                <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ ...style.container, marginTop: hp('2%') }}>
                        <Text style={{ fontSize: hp('2%'), marginBottom: hp('1%') }}>Current password</Text>
                        <TextInput
                            value={this.state.oldPass}
                            style={[style.input, { color: 'black', width: wp(70) }]}
                            placeholder="Current password"
                            secureTextEntry={this.state.statusSecureTextOld}
                            onChangeText={text => this.setState({ oldPass: text })}
                        />
                        <Icon color={this.state.statusSecureTextOld ? "#ccc" : "#333"} type="font-awesome" name={this.state.statusSecureTextOld ? "eye-slash" : "eye"} onPress={() => this.CheckPass()} />
                        <Text style={{ textAlign: 'right', color: '#4267B2', marginRight: hp('2%') }}>1/20</Text>
                    </View>

                    <View style={{ ...style.container, marginTop: hp('5%') }}>
                        <Text style={{ fontSize: hp('2%'), marginBottom: hp('1%') }}>New password</Text>
                        <TextInput
                            value={this.state.newPass}
                            style={[style.input, { color: 'black', width: wp(70) }]}
                            placeholder="Enter new password"
                            secureTextEntry={this.state.statusSecureTextNew}
                            onChangeText={text => this.setState({ newPass: text })}
                        />
                        <Icon color={this.state.statusSecureTextNew ? "#ccc" : "#333"} type="font-awesome" name={"eye"} onPress={() => this.setState({statusSecureTextNew: this.state.statusSecureTextNew?false:true })} />
                        <Text style={{ textAlign: 'right', color: '#4267B2', marginRight: hp('2%') }}>1/20</Text>
                    </View>

                    <View style={{ ...style.container, marginTop: hp('5%') }}>
                        <Text style={{ fontSize: hp('2%'), marginBottom: hp('1%') }}>Confirm-New password</Text>
                        <TextInput
                            value={this.state.confirmPass}
                            style={[style.input, { color: 'black', width: wp(70) }]}
                            placeholder="Confirm your password"
                            secureTextEntry={this.state.statusSecureTextConfirm}
                            onChangeText={text => this.setState({ confirmPass: text })}
                        />
                        <Icon color={this.state.statusSecureTextConfirm ? "#ccc" : "#333"} type="font-awesome" name={"eye"} onPress={() => this.setState({statusSecureTextConfirm: this.state.statusSecureTextConfirm?false:true })} />
                        <Text style={{ textAlign: 'right', color: '#4267B2', marginRight: hp('2%') }}>1/20</Text>
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


