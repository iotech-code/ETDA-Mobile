
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

import { Button, ListItem } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from "react-native-raw-bottom-sheet";


export default class MessagsPost extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        visibleBottomSheet: false
    }

    openOption() {
        console.log('askdjkasjdkasjdk')
        this.setState({ visibleBottomSheet: true })
        this.RBSheet.open()
    }

    componentDidMount() {
        // this.RBSheet.open()

    }

    renderBottomSheet() {
        const { visibleBottomSheet } = this.state
        return (
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                height={Platform.OS === 'ios' ? hp('24%') : hp('22%')}
                openDuration={250}
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
                                <Text style={{ fontSize: hp('2%'), }}>Name</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.openOption()} >
                            <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity style={{ marginTop: hp('1.5%') }} onPress={()=>Actions.EventDetail()}>
                        <Text style={{ fontSize: hp('2%') }}>Event Topic</Text>
                        <Text style={{ fontSize: hp('2%'), color: '#707070', marginTop: hp('1%') }}>10/11/2020</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('2%'), color: '#4267B2', marginRight: hp('2%') }}>10:00 am</Text>
                            <Text style={{ fontSize: hp('2%') }}>Start event</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: hp('1%') }}>
                            <Text style={{ fontSize: hp('2%'), color: '#4267B2', marginRight: hp('2%') }}>10:00 am</Text>
                            <Text style={{ fontSize: hp('2%') }}>Start event</Text>
                        </View>
                    </TouchableOpacity>


                </View>

                <View style={{ ...styleScoped.sectionSocial }}>
                    <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('3%'), color: '#4267B2' }} />
                    <Icon name="comment-outline" size={hp('2.5%')} style={{ marginRight: hp('3%'), color: '#B5B5B5' }} />
                    <Icon name="share-outline" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />

                </View>
                {this.renderBottomSheet()}
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
    listMore: {
        width: '100%',
        padding: hp('2%'),
        flexDirection: 'row',
        alignItems: 'center',
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


