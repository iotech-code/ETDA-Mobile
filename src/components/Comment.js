
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../constant/util'

export default class Comment extends Component {
    state = {
        default_avatar: require('../assets/images/default_avatar.jpg'),
    }

    replyCommentTo(reply_to) {
        this.props.fnPressButton(reply_to)
    }

    render() {
        const { User, Message, create_date, Reply_to } = this.props.data
        const { default_avatar } = this.state
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
                                <Image
                                    source={!User.Photo ? default_avatar : { uri: User.Photo }}
                                    style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 50 }}

                                />
                            </View>
                            <View >
                                <Text style={{ fontSize: hp('2%'), color: '#707070' }}>{User.Fullname}</Text>
                                <Text style={{ fontSize: hp('2%'), color: "#B5B5B5" }}>{create_date}</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: hp('1.5%') }} >
                        <Text style={{ fontSize: hp('2%'), fontWeight: '300' }}>{Message}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: hp('1%') }}>
                        <TouchableOpacity onPress={ () => this.replyCommentTo(User) }
                        style={{flexDirection: 'row'}}>
                            <Icon name="reply" style={{ fontSize: hp('2%'), color: fonts.color.primary }}/>
                            <Text style={{ fontSize: hp('2%'), color: fonts.color.primary }}>Reply</Text>
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


