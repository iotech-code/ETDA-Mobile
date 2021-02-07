
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

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { apiServer } from '../../constant/util';
export default class EventDetail extends Component {
    state = {
        visibleSearch: false
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: '#F9FCFF', ...style.marginHeaderStatusBar }}>

                    <View style={{ ...styleScoped.shadowCard  , backgroundColor:'white'}}>
                        <View style={{...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Event Detail</Text>
                            <Icon name="magnify" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: hp('2%'),
                            marginTop: hp('2%')
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{
                                    height: hp('5%'),
                                    width: hp('5%'),
                                    marginRight: hp('1%')
                                }}>
                                    <Image source={require('../../assets/images/avatar2.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                                </View>
                                <View >
                                    <Text style={{ fontSize: hp('2%'), color: "#707070" }}>Name</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => this.openOption()} >
                                <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                            </TouchableOpacity>
                        </View>


                        <View style={{ marginTop: hp('1.5%'), paddingHorizontal: hp('2%') }} >
                            <Text style={{ fontSize: hp('2%') }}>Event Topic</Text>
                            <Text style={{ fontSize: hp('2%'), color: '#707070', marginTop: hp('1%') }}>10/11/2020</Text>

                            <View style={{ height: hp('20%'), width: '100%', marginVertical: hp('2%') }}>
                                <Image source={require('../../assets/images/event_post.png')} style={{ height: '100%', width: '100%', resizeMode: 'stretch' }} />
                            </View>

                            <View style={{ marginVertical: hp('2%'), alignItems: 'flex-start', ...style.boxTextBorder }}>
                                <Text style={{ ...style.textOnBorder, fontSize: hp('2%'), color: '#B5B5B5', paddingLeft: 0, paddingRight: hp('1%') }}>Scheduler</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: hp('1%') }}>
                                <Text style={{ fontSize: hp('2%'), color: '#4267B2', marginRight: hp('2%') }}>10:00 am</Text>
                                <Text style={{ fontSize: hp('2%') }}>Start event</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: hp('1%') }}>
                                <Text style={{ fontSize: hp('2%'), color: '#4267B2', marginRight: hp('2%') }}>10:00 am</Text>
                                <Text style={{ fontSize: hp('2%') }}>Workshop</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: hp('1%') }}>
                                <Text style={{ fontSize: hp('2%'), color: '#4267B2', marginRight: hp('2%') }}>10:00 am</Text>
                                <Text style={{ fontSize: hp('2%') }}>Workshop</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: hp('1%') }}>
                                <Text style={{ fontSize: hp('2%'), color: '#4267B2', marginRight: hp('2%') }}>10:00 am</Text>
                                <Text style={{ fontSize: hp('2%') }}>Workshop</Text>
                            </View>
                        </View>

                        <View style={{ ...styleScoped.sectionSocial }}>
                            <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('3%'), color: '#4267B2' }} />
                            <Icon name="comment-outline" size={hp('2.5%')} style={{ marginRight: hp('3%'), color: '#B5B5B5' }} />
                            <Icon name="share-outline" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />

                        </View>
                    </View>





                </ScrollView>
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
    },
    sectionSocial: {
        marginTop: hp('2%'),
        paddingTop: hp('2.5%'),
        borderTopWidth: 0.5,
        borderTopColor: '#B5B5B5',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: hp('2%'),
        paddingBottom: hp('1%')
    }
});


