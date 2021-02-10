
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
    TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { colors, apiServer } from '../../../constant/util'

export default class RegisterSuccess extends Component {



    callLogin = async () => {
        const { navigation } = this.props;
        const data = {
            "user_email": navigation.getParam('email', ''),
            "user_password": navigation.getParam('password', ''),
            "authen_method": "local"
        }
        axios.post(apiServer.url+'/api/backend/user/login', data)
            .then((response) => {
                if (response.data.status == "success") {
                    AsyncStorage.setItem('token', response.data.token);
                    Actions.replace('Main')
                } else {

                }
            })
            .catch((error) => {

                // setLoading(false)
                // console.log('data error : ', error)
            })
            .finally(function () {
            });

    };
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

                        <Icon name="check-circle" size={hp('30%')} color="#30D100" />


                    </View>
                    <View style={{ marginTop: hp('3%') }}>
                        <Text style={styleScoped.textWelcome}>Your registration has been submitted,</Text>
                        <Text style={styleScoped.textWelcome}>to post please wait for administrator approval.</Text>

                    </View>
                    <View style={style.container}>

                        <View style={{ marginTop: hp('3%') }}>
                            <Button
                                title="Start"
                                buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                                onPress={() => this.callLogin()}
                            />
                        </View>

                    </View>
                </SafeAreaView>
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    textWelcome: {
        textAlign: 'center',
        fontSize: hp('1.7%'),
    },
    inputCustom: {
        height: hp('5%'),
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: hp('1%')
    }
});


