
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
import RBSheet from "react-native-raw-bottom-sheet";



export default class Post extends Component {
    state = {
        data: {
            title: 'E-commerce new gen',
            time: '2 minutes ago',
            image: require('../assets/images/post_1.png'),
            detail: ' Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et',
            tag: ['E-commerce', 'Test Tag']
        },
        socail: {
            like: 22,
            view: 22
        },
        visibleBottomSheet: false
    }

    openOption() {
        this.RBSheet.open()
    }

    renderBottomSheet() {
        const { visibleBottomSheet } = this.state
        return (
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                height={Platform.OS === 'ios' ? hp('25%') : hp('23%')}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                        paddingTop: hp('1%'),
                        backgroundColor: 'white',
                        ...style.shadowCard
                    }
                }}
            >
                <TouchableOpacity style={{
                    ...styleScoped.listMore
                }}>
                    <Icon name="heart" size={hp('3%')} color="#FF0066" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Follow Blog</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>
                <TouchableOpacity style={{
                    ...styleScoped.listMore
                }}>
                    <Icon name="pencil" size={hp('3%')} color="#29B100" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Edit blog</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>

                <TouchableOpacity style={{
                    ...styleScoped.listMore
                }}>
                    <Icon name="delete" size={hp('3%')} color="#003764" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Delete blog</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>

            </RBSheet>
        )
    }
    render() {
        const { data, socail } = this.state
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
                        <Text style={{ fontSize: hp('2%'), }}>{data.title}</Text>
                        <TouchableOpacity onPress={() => this.openOption()}>
                            <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: hp('1.5%'), fontWeight: '300', color: '#B5B5B5' }} >{data.time}</Text>
                    <View style={{ marginTop: hp('0.5%'), justifyContent: 'flex-start', flexDirection: 'row' }}>
                        {
                            data.tag.map((item, index) => {
                                return (
                                    <Button
                                        title={item}
                                        titleStyle={{ fontSize: hp('1.5%') }}
                                        buttonStyle={{ ...style.btnTagPrimary }}
                                        key={index}
                                    />
                                )
                            })
                        }

                    </View>
                    <View style={{ height: hp('23%'), marginTop: hp('1%') }}>
                        <Image
                            source={data.image}
                            style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
                        />
                    </View>
                    <TouchableOpacity style={{ marginTop: hp('1%') }} onPress={() => Actions.PostDetail()}>
                        <Text style={{ fontSize: hp('2%'), fontWeight: '300' }}>{data.detail}</Text>
                    </TouchableOpacity>

                    <View style={{
                        marginTop: hp('2%'),
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#4267B2' }} />
                        <Text style={{ marginRight: hp('3%'), color: '#B5B5B5' }}>{socail.like}</Text>
                        <Icon name="eye" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />
                        <Text style={{ color: '#B5B5B5' }}>{socail.view}</Text>
                    </View>
                </View>

                <View style={{
                    marginTop: hp('2%'),
                    paddingTop: hp('2.5%'),
                    borderTopWidth: 1,
                    borderTopColor: '#B5B5B5',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingHorizontal: hp('2%'),
                    paddingBottom: hp('1%')
                }}>
                    <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('2%'), color: '#4267B2' }} />
                    <Icon name="comment-outline" size={hp('2.5%')} style={{ marginRight: hp('2%'), color: '#B5B5B5' }} />
                    <Icon name="share-outline" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />

                </View>
                {this.renderBottomSheet()}
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({

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
    listMore: {
        width: '100%',
        padding: hp('2%'),
        flexDirection: 'row',
        alignItems: 'center',

    }
});


