
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

import { Button, BottomSheet } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



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
    }

    renderBottomSheet() {
        const { visibleBottomSheet } = this.state
        return (
            <BottomSheet
                isVisible={visibleBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
            >
                <Text>asjdhjkasdhjkahsjd</Text>
            </BottomSheet>
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
                                <Image source={require('../assets/images/avatar.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                            </View>
                            <View >
                                <Text style={{ fontSize: hp('2%'), }}>E-commerce new gen</Text>
                                <Text style={{ fontSize: hp('1.5%'), fontWeight: '300', color: '#B5B5B5' }} > 11/11/2020  3:30 pm </Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.openOption()} >
                            <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: hp('1%') }}>
                        <Text style={{ fontSize: hp('2%') }}>First time of Digital Law</Text>
                        <Button
                            title="Digital Law"
                            titleStyle={{ fontSize: hp('1.5%') }}
                            buttonStyle={{ backgroundColor: '#003764', padding: hp('0.5%') }}
                            containerStyle={{ width: '30%', marginTop: hp('1%') }}
                        />
                    </View>
                    <View style={{ height: hp('23%'), marginTop: hp('1%') }}>
                        <Image
                            source={require('../assets/images/post_1.png')}
                            style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
                        />
                    </View>
                    <View style={{ marginTop: hp('1%') }}>
                        <Text style={{ fontSize: hp('2%'), fontWeight: '300' }}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
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


