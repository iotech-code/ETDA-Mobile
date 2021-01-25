
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
import Comment from '../../components/Comment'
import { fonts } from '../../constant/util'
export default class EventDetail extends Component {
    state = {
        visibleSearch: false,
        data: {
            title: 'E-commerce new gen By ETDA official',
            time: '11/11/2020  3:30 pm',
            detail: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur',
            image: require('../../assets/images/post_1.png')
        },
        socail: {

        }
    }
    render() {
        const { data } = this.state
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: '#F9FCFF', ...style.marginHeaderStatusBar }}>

                    <View style={{
                        ...styleScoped.shadowCard, backgroundColor: 'white', paddingBottom: hp('2%'),
                        marginBottom: hp('2%'),
                    }}>
                        <View style={{ ...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Blog Detail</Text>
                            <View></View>
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
                                    height: hp('7%'),
                                    width: hp('7%'),
                                    marginRight: hp('1%')
                                }}>
                                    <Image source={require('../../assets/images/avatar2.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                                </View>
                                <View >
                                    <Text style={{ fontSize: hp('2%') }}>{data.title}</Text>
                                    {/* <Text style={{ fontSize: hp('2%') }}>By ETDA official</Text> */}
                                    <Text style={{ fontSize: hp('2%'), color: fonts.color.secondary }}>{data.time}</Text>
                                </View>
                            </View>
                        </View>


                        <View style={style.container}>
                            <View style={{ marginTop: hp('2%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Button
                                    title="E-commerce"
                                    titleStyle={{ fontSize: hp('1.5%') }}
                                    buttonStyle={{ ...style.btnTagPrimary }}
                                />
                            </View>


                            <View style={{ height: hp('24%'), width: '100%', marginTop: hp('1%') }}>
                                <Image source={data.image} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
                            </View>
                            <View style={{ marginTop: hp('1%') }}>
                                <Text style={{ fontSize: hp('1.8%') }}>
                                    {data.detail}
                                </Text>
                            </View>

                            <View style={{
                                marginTop: hp('2%'),
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#4267B2' }} />
                                <Text style={{ marginRight: hp('3%'), color: '#B5B5B5' }}>22</Text>
                                <Icon name="eye" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />
                                <Text style={{ color: '#B5B5B5' }}>22</Text>
                            </View>
                        </View>

                        <View style={{
                            marginTop: hp('2%'),
                            paddingTop: hp('1.5%'),
                            borderTopWidth: 1,
                            borderTopColor: '#B5B5B5',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingHorizontal: hp('2%'),
                        }}>
                            <Icon name="comment-outline" size={hp('2.5%')} style={{ marginRight: hp('2%'), color: '#B5B5B5' }} />
                            <Text style={{ fontSize: hp('2%'), fontWeight: '300', color: '#707070' }}>3 comments</Text>
                        </View>
                    </View>


                    {/* comment */}
                    <View style={{ ...style.container }}>
                        <Comment></Comment>
                    </View>
                </ScrollView>
            </View >
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


