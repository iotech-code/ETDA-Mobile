
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, apiServer } from '../constant/util'
export default class HeaderNavbar extends Component {
    state = {
        imageAvatar: require('../assets/images/default_avatar.jpg'),
        name: '',
        photo: ''
    }

    componentDidMount() {
        this.getUserInfo();
    }
    
    async getUserInfo () {
        try {
            let json_info = await AsyncStorage.getItem('user_data');
            let info = JSON.parse(json_info);

            this.setState({
                name: info.fullname,
                photo: info.photo
            })
        } catch (err) {
            console.log(err.message)
        }
    }
    render() {
        const { imageAvatar, name, photo } = this.state

        return (
            <View style={styleScoped.container}>
                <View style={styleScoped.leftSide}>
                    <TouchableOpacity style={styleScoped.avatar} onPress={() => { Actions.replace('MyProfile') }}>
                        {
                            photo == '' || photo == null ?
                                <Image
                                    source={imageAvatar}
                                    style={styleScoped.imageAvatar}
                                />
                                :
                                <Image
                                    source={{ uri: photo }}
                                    style={styleScoped.imageAvatar}
                                />
                        }
                    </TouchableOpacity>
                    <Text style={styleScoped.textName}>{name}</Text>
                </View>
                <View style={styleScoped.rightSide}>
                    <TouchableOpacity onPress={() => Actions.push('Search')}>
                        <Icon name="search" size={hp('3%')} color="white" style={{ marginRight: hp('1.5%') }} />
                    </TouchableOpacity>
                    <></>
                </View>
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: hp('2%'),
        paddingVertical: hp('1.5%'),
        backgroundColor: colors.primary,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        height: hp('5%'),
        width: hp('5%'),
        marginRight: hp('1%')
    },
    imageAvatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 50
    },
    textName: {
        fontSize: hp('2.2%'),
        color: 'white',
        fontWeight: '500'
    }
});


