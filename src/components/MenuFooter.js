
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
    Platform
} from 'react-native';

import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MenuFooter extends Component {
    render() {
        return (
            <View style={styleScoped.container}>
                <TouchableOpacity style={{ width: '33.33%' }} onPress={()=>Actions.Main()}> 
                    <Icon name="home" size={hp('2.6%')} color="#B5B5B5" style={{ alignSelf: 'center' }} />
                    <Text style={{ textAlign: 'center', fontSize: hp('1.2%'), color: '#B5B5B5' }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '33.33%' }} onPress={()=>Actions.MessageBoard()}>
                    <Icon name="globe" size={hp('2.6%')} color="#B5B5B5" style={{ alignSelf: 'center' }} />
                    <Text style={{ textAlign: 'center', fontSize: hp('1.2%'), color: '#B5B5B5' }}>Message Board</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '33.33%' }} onPress={() => Actions.Activity()}>
                    <Icon name="calendar" size={hp('2.6%')} color="#B5B5B5" style={{ alignSelf: 'center' }} />
                    <Text style={{ textAlign: 'center', fontSize: hp('1.2%'), color: '#B5B5B5' }}>Activity</Text>
                </TouchableOpacity>

            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    container: {
        paddingBottom: Platform.OS === 'ios' ? hp('4%') : hp('1%'),
        flexDirection: 'row',
        paddingHorizontal: hp('2%'),
        paddingVertical: hp('1.5%'),
        backgroundColor: 'white',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },

});


