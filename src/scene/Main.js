
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
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import HeaderNavbar from '../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../components/MenuFooter'
import Post from '../components/Post'

export default class Main extends Component {
    state = {
        visibleSearch: false
    }
    render() {
        const { dataList } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                <StatusBar barStyle="dark-content" />
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: '#F9FCFF', paddingBottom: hp('1%') }}>
                        <HeaderNavbar></HeaderNavbar>
                        <View style={{ backgroundColor: '#F9FCFF', paddingBottom: hp('8%') }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: hp('2%'),
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}> ETDA Blogs </Text>
                                <Icon name="compare-vertical" size={hp('3%')} color="#707070" />
                            </View>

                            <View style={{ paddingHorizontal: hp('2%'), marginBottom: hp('1%'), width: '36%' }}>
                                <Button
                                    title="E-commerce"
                                    titleStyle={{ fontSize: hp('1.5%') }}
                                    buttonStyle={{ backgroundColor: '#003764', padding: hp('0.5%') }}
                                />
                            </View>
                            <Post></Post>
                            <Post></Post>
                        </View>
                    </View>
                </ScrollView>

                <MenuFooter></MenuFooter>
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


