
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
import { fonts, apiServer } from '../constant/util'



export default class Comment extends Component {
    state = {
        data: {
            avatar: require('../assets/images/avatar2.png'),
            name: 'John',
            time: '2 minutes ago',
            detail: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod '
        }

    }
    render() {
        const { data } = this.state

        const onPress = (reply_to) =>  {
           this.props.fnPressButton(reply_to)
        }
        return (
            <View style={{
                ...styleScoped.shadowCard,
                backgroundColor: 'white',
                paddingVertical: hp('2%'),
                marginBottom: hp('2%'),
                borderRadius: 10
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
                                <Image source={{ uri: this.props.data.User.Photo }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                            </View>
                            <View >
                                <Text style={{ fontSize: hp('2%'), color: '#707070' }}>{this.props.data.User.Fullname}</Text>
                                <Text style={{ fontSize: hp('2%'), color: "#B5B5B5" }}>{this.props.data.create_date}</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: hp('1.5%') }} >
                        <Text style={{ fontSize: hp('2%'), fontWeight: '300'  }}>{this.props.data.Message}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: hp('1%') }}>
                        <TouchableOpacity onPress={() => onPress( this.props.data.Reply_to.User_id)}>
                            <Text style={{ fontSize: hp('2%'), color: fonts.color.primary }}>Replay</Text>
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
        shadowColor: "rgba(0,0,0,0.16)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2.62,
        elevation: 4,
    }
});


