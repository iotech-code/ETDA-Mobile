
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default class Comment extends Component {
    render() {
        return (
            <View style={{
                ...styleScoped.shadowCard,
                backgroundColor: 'white',
                paddingVertical: hp('1%'),
                marginBottom: hp('2%')
            }}>
                <View style={{ paddingHorizontal: hp('2%') }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{
                                height: hp('5%'),
                                width: hp('5%'),
                                marginRight: hp('1%')
                            }}>
                                <Image source={require('../assets/images/avatar2.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                            </View>
                            <View >
                                <Text style={{ fontSize: hp('2%'), color: '#707070' }}>John</Text>
                                <Text style={{ fontSize: hp('2%'), color: "#B5B5B5" }}>2 minutes ago</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ marginTop: hp('1%') }} onPress={() => Actions.PostDetail()}>
                        <Text style={{ fontSize: hp('2%'), fontWeight: '300' }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: hp('1%') }}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: hp('2%'), color: '#003764' }}>Replay</Text>
                        </TouchableOpacity>
                    </View>

                </View>



            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    imageLogo: {
        height: hp('15%'),
        width: hp('23%')
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
    shadowCard: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
});


