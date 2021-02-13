
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
import { apiServer } from '../../constant/util';

export default class ProfileSetting extends Component {
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
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Setting</Text>
                            <View></View>
                        </View>
                    </View>
                    <View >
                        <TouchableOpacity style={{ padding: hp('2%'), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
                            onPress={() => Actions.replace('ChangePassword')}
                        >
                            <Icon name="key" size={hp('2.5%')} style={{ marginRight: hp('2%'), color: '#707070' }} />
                            <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Change password</Text>
                        </TouchableOpacity>
                        <View style={{ ...style.divider }}></View>
                        <TouchableOpacity
                            style={{
                                padding: hp('2%'),
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}
                            onPress={() => Actions.replace('DeleteAccount')}
                        >
                            <Icon name="close-octagon" size={hp('2.5%')} style={{ marginRight: hp('2%'), color: '#FF0000' }} />
                            <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Delete account</Text>
                        </TouchableOpacity>
                        <View style={{ ...style.divider }}></View>

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


