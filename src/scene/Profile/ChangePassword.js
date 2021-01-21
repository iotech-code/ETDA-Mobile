
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

import { Button, BottomSheet } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFonAwesome from 'react-native-vector-icons/FontAwesome'


export default class ChangePassword extends Component {
    state = {
        visibleSearch: false
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ backgroundColor: 'white', paddingBottom: hp('2%') }}>
                        <View style={{ ...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Chnage Password</Text>
                            <TouchableOpacity onPress={() => Actions.MyProfile()}>
                                <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ ...style.container, marginTop: hp('2%') }}>
                        <Text style={{ fontSize: hp('2%'), marginBottom: hp('1%') }}>Current password</Text>
                        <TextInput
                            style={{ ...style.customInput, width: '100%', borderRadius: 30 }}
                            placeholder="Enter your password here…"
                        />
                        <Text style={{ textAlign: 'right', color: '#4267B2', marginRight: hp('2%') }}>1/20</Text>
                    </View>

                    <View style={{ ...style.container, marginTop: hp('5%') }}>
                        <Text style={{ fontSize: hp('2%'), marginBottom: hp('1%') }}>New password</Text>
                        <TextInput
                            style={{ ...style.customInput, width: '100%', borderRadius: 30 }}
                            placeholder="Enter your password here…"
                        />
                        <Text style={{ textAlign: 'right', color: '#4267B2', marginRight: hp('2%') }}>1/20</Text>
                    </View>

                    <View style={{ ...style.container, marginTop: hp('5%') }}>
                        <Text style={{ fontSize: hp('2%'), marginBottom: hp('1%') }}>Confirm-New password</Text>
                        <TextInput
                            style={{ ...style.customInput, width: '100%', borderRadius: 30 }}
                            placeholder="Enter your password here…"
                        />
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


