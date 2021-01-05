
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

import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ForgetPassword extends Component {
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

                        <Icon name="question-circle" size={hp('30%')} color="#708CC5" />


                    </View>
                    <View style={{ marginTop: hp('3%'), ...style.container }}>
                        <Text style={styleScoped.textWelcome}>Enter your email address associated with your account. We will send you password reset instructions. </Text>
                    </View>
                    <View style={style.container}>
                        <View style={{ marginTop: hp('3%') }}>
                            <TextInput
                                style={styleScoped.inputCustom}
                                placeholder="Email address"
                            />
                        </View>
                        <View style={{ marginTop: hp('3%') }}>
                            <Button
                                title="Send Email"
                                buttonStyle={{ padding: hp('1.5%'), backgroundColor: '#003764' }}
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
        fontSize: hp('2%'),
        lineHeight: 30
    },
    inputCustom: {
        height: hp('5%'),
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: hp('1%')
    }
});


