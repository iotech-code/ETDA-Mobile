
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
import HeaderNavbar from '../../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../../components/MenuFooter'
import MessagePost from '../../components/MessagePost'


export default class MessageBoard extends Component {
    state = {
        visibleSearch: false
    }
    render() {
        const { dataList } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                <ScrollView>
                    <View style={{ flex: 1}}>
                        <HeaderNavbar></HeaderNavbar>
                        <View style={{ backgroundColor: '#F9FCFF', paddingBottom: hp('1%') }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: hp('2%'),
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>Message Board(Read only)</Text>
                                <Icon name="compare-vertical" size={hp('3%')} color="#707070" />
                            </View>

                            <View style={{ ...style.container }}>
                                <TouchableOpacity style={{ ...style.btnCreateNewBlog }} onPress={() => Actions.CreatePost()}>
                                    <Text style={{ ...style.textCreateNewBlog }}>Write New Blog</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ ...styleScoped.wrapperButtonGroup }}>
                                <TouchableOpacity style={{ ...styleScoped.btnGroupActive }}>
                                    <Text style={{ ...styleScoped.textBtnGroupActive }}>Community board</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ ...styleScoped.btnGroup }}>
                                    <Text style={{ ...styleScoped.textBtnGroup }}>My board</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: hp('2%') }}>
                                <MessagePost></MessagePost>
                                <MessagePost></MessagePost>

                            </View>

                        </View>
                    </View>
                </ScrollView>
                <MenuFooter></MenuFooter>
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    wrapperButtonGroup: {
        marginTop: hp('1%'),
        flexDirection: 'row'
    },
    btnCreateNewBlog: {
        padding: hp('1.5%'),
        width: '50%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#003764',
        width: '100%'
    },
    textCreateNewBlog: {
        fontSize: hp('2%'),
        fontWeight: "300",
        textAlign: 'center',
        color: '#003764',
    },
    btnGroup: {
        padding: hp('1.5%'),
        width: '50%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#003764',
    },
    textBtnGroup: {
        fontSize: hp('2%'),
        fontWeight: "300",
        textAlign: 'center',
        color: '#003764',
    },
    btnGroupActive: {
        padding: hp('1.5%'),
        width: '50%',
        backgroundColor: '#003764',
        borderWidth: 1,
        borderColor: '#003764',
    },
    textBtnGroupActive: {
        fontSize: hp('2%'),
        textAlign: 'center',
        color: 'white',

    }
});


