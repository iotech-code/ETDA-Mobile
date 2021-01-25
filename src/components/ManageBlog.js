
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

import { Button, Overlay } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import { fonts } from '../constant/util';



export default class ManageBlog extends Component {
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
        selected: false

    }


    render() {
        const { data, socail, selected } = this.state
        return (
            <View style={{
                ...styleScoped.shadowCard,
                backgroundColor: 'white',
                paddingVertical: hp('1%'),
                marginBottom: hp('2%')
            }}>
                <View style={{ paddingHorizontal: hp('2%'), paddingBottom: hp('1%') }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: hp('2%'), }}>{data.title}</Text>
                        {
                            !selected ?
                                <TouchableOpacity onPress={() => this.setState({ selected: true })}>
                                    <Icon name="checkbox-blank-circle-outline" size={hp('3%')} color="rgba(0,0,0,0.16)" />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.setState({ selected: false })}>
                                    <Icon name="checkbox-marked-circle" size={hp('3%')} color="#4267B2" />
                                </TouchableOpacity>
                        }

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

                </View>

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


