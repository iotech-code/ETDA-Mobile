
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
    FlatList,
    AsyncStorage
} from 'react-native';

import { Button, BottomSheet } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import HeaderNavbar from '../../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../../components/MenuFooter'
import MenuFooterUser from '../../components/MenuFooterUser'
import MessagePost from '../../components/MessagePost'
import { colors } from '../../constant/util'


export default class MessageBoard extends Component {
    constructor() {
        super();
        this.state = { visibleSearch: false, type: 'create', user_type: '', board: 'community' }
    }


    async componentDidMount() {
        try {
            const user_type = await AsyncStorage.getItem('user_type');
            console.log('user type : ', user_type)
            this.setState({
                user_type: user_type
            })
        } catch (err) {
            console.log('err : ', err)
            // handle errors
        }
    }

    setBoard = (value) => {
        this.setState({
            board: value
        })
    }

    render() {
        const { dataList } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                <ScrollView>
                    <View style={{ flex: 1 }}>
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
                            {this.state.user_type == 'read, post_read' ?
                                <View style={{ ...style.container }}>
                                    <Button
                                        title="Write New Blog"
                                        Outline={true}
                                        titleStyle={{ color: '#003764', }}
                                        buttonStyle={{
                                            padding: hp('1.5%'),
                                            ...style.btnPrimaryOutline,
                                            ...style.btnRounded
                                        }}
                                        onPress={() => Actions.CreatePost({ 'type': this.props.type })}
                                    />
                                </View>
                                :
                                <View style={{ ...style.container, marginBottom: hp('1%') }}></View>
                            }


                            <View style={{ ...styleScoped.wrapperButtonGroup }}>
                                <TouchableOpacity style={this.state.board == 'community' ? { ...styleScoped.btnGroupActive } : { ...styleScoped.btnGroup }}
                                    onPress={() => {
                                        this.setBoard('community')
                                    }}
                                >
                                    <Text style={this.state.board == 'community' ? { ...styleScoped.textBtnGroupActive } : { ...styleScoped.textBtnGroup }}>Community board</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.board == 'my' ? { ...styleScoped.btnGroupActive } : { ...styleScoped.btnGroup }}
                                    onPress={() => {
                                        this.setBoard('my')
                                    }}
                                >
                                    <Text style={this.state.board == 'my' ? { ...styleScoped.textBtnGroupActive } : { ...styleScoped.textBtnGroup }}>My board</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: hp('2%') }}>
                                <MessagePost></MessagePost>
                                <MessagePost></MessagePost>

                            </View>

                        </View>
                    </View>
                </ScrollView>
                <MenuFooterUser value={'message'}></MenuFooterUser>
                {/* <MenuFooter></MenuFooter> */}
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
        borderColor: colors.primary,
    },
    textBtnGroup: {
        fontSize: hp('2%'),
        fontWeight: "300",
        textAlign: 'center',
        color: colors.primary,
    },
    btnGroupActive: {
        padding: hp('1.5%'),
        width: '50%',
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    textBtnGroupActive: {
        fontSize: hp('2%'),
        textAlign: 'center',
        color: 'white',

    }
});


