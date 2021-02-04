
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
    Platform
} from 'react-native';
import axios from 'axios';
import { Button, BottomSheet } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import HeaderNavbar from '../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MenuFooter from '../components/MenuFooter'
import BlogManager from '../components/ManageBlog'
import { fonts } from '../constant/util';

export default class ManageBlog extends Component {
    state = {
        visibleSearch: false
    }



    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token');
            const user_type = await AsyncStorage.getItem('user_type');
            this.setState({
                user_type: user_type,
                token : token
            })
            this.callApproveList(token)
        } catch (err) {

        }
    }



    callApproveList = async (token) => {
        axios.post('https://etda.amn-corporation.com/api/backend/post/approve-list',{
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((response) => {
                console.log('come in approve list : ', response.data)
            })
            .catch((error) => {
            })
            .finally(function () {
            });

    };
    render() {
        const { dataList } = this.state
        return (
            <View style={{ flex: 1, ...style.marginHeaderStatusBar }}>
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
                                <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>Manage Blogs</Text>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: hp('2%'),
                                alignItems: 'center',
                                marginBottom: hp('2%')
                            }}>
                                <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>Waiting for publish(5)</Text>
                                <Button
                                    title="Select all"
                                    titleStyle={{ fontSize: hp('1.5%'), fontWeight: '300', padding: hp('1%') }}
                                    buttonStyle={{ ...style.btnTagPrimary, padding: hp('1%') }}
                                />
                            </View>

                            <BlogManager></BlogManager>
                            <BlogManager></BlogManager>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ ...styleScoped.containerSelectOption }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: hp('2%'), color: fonts.color.primary, }}>Cancle</Text>
                        <Text style={{ fontSize: hp('2%'), color: fonts.color.primary }}>Blog selected(1)</Text>
                        <Text></Text>
                    </View>
                    <View style={{ marginTop: hp('1%') }}>
                        <Button
                            title="Publish"
                            buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                        />
                    </View>
                    <View style={{ marginTop: hp('1%') }}>
                        <Button
                            title="Reject"
                            Outline={true}
                            titleStyle={{ color: fonts.color.primary }}
                            buttonStyle={{
                                padding: hp('1.5%'),
                                ...style.btnPrimaryOutline,
                                ...style.btnRounded
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    containerSelectOption: {
        paddingBottom: Platform.OS === 'ios' ? hp('4%') : hp('1%'),
        paddingHorizontal: hp('2%'),
        paddingVertical: hp('1.5%'),
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    }
});


