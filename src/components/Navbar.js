
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
    TouchableOpacity
} from 'react-native';

import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HeaderNavbar extends Component {
    render() {
        return (
            <View style={styleScoped.container}>
                {/* left side  */}
                <View style={styleScoped.leftSide}>
                    <View style={styleScoped.avatar}>
                        <Image
                            source={require('../assets/images/avatar.png')}
                            style={styleScoped.imageAvatar}
                        />
                    </View>
                    <Text style={styleScoped.textName}>John McMan</Text>
                </View>

                {/* right side */}
                <View style={styleScoped.rightSide}>
                    <Icon name="search" size={hp('2.4%')} color="white" style={{ marginRight: hp('2.5%') }} />
                    <Icon name="bell" size={hp('2.4%')} color="white" />

                </View>


            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: hp('2%'),
        paddingVertical: hp('1.5%'),
        backgroundColor: '#003764',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        height: hp('5%'),
        width: hp('5%'),
        marginRight: hp('1%')
    },
    imageAvatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    textName: {
        fontSize: hp('2.2%'),
        color: 'white',
        fontWeight: '500'
    }
});


