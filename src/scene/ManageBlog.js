
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
    Platform,
    AsyncStorage
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
        visibleSearch: false,
        user_type: '' , token : '' , user_role : '',
        list_data : [],
    }



    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token');
            const user_type = await AsyncStorage.getItem('user_type');
            const user_role = await AsyncStorage.getItem('user_role');
            this.setState({
                user_type: user_type,
                token : token,
                user_role : user_role
            })
            this.callApproveList(token)
        } catch (err) {

        }
    }


    callPostApprove = async (token) => {
        console.log('token : ' , token)

        const data = {
            "post_id": [],
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }


        axios.post('https://etda.amn-corporation.com/api/backend/post/approve', data, {
            headers
        })
            .then((response) => {
                console.log('response : ' , response)
                if (response.data.status == "success"){
                    this.callApproveList(token)
                }else{

                }
            })
            .catch((error) => {
                console.log('error : ' , error)
            })
            .finally(function () {
            });

    };


    callApproveList = async (token) => {
        console.log('token : ' , token)
        axios.get('https://etda.amn-corporation.com/api/backend/post/approve-list',{
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((response) => {
                console.log('response : ' , response)
                var i  
                var objectHomeFeed = {}
                var list = []
                for (i = 0 ; i < response.data.post_data.length ; i++){
                    objectHomeFeed = {
                        post_id : response.data.post_data[i].post_id,
                        title : response.data.post_data[i].title,
                        date : response.data.post_data[i].post_date,
                        description : response.data.post_data[i].post_description,
                        tags : response.data.post_data[i].tags,
                        post_images :  response.data.post_data[i].post_images
                    }
                    list.push(objectHomeFeed)
                }
                console.log('list detail : ' , list.length)
                this.setState({
                    list_data : list
                })
            })
            .catch((error) => {
                console.log('error : ' , error)
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
                    {this.state.user_role == "Member" ? 
                    <HeaderNavbar  value={'member'}></HeaderNavbar>
                    :
                    <HeaderNavbar  value={'admin'}></HeaderNavbar>
                    }
                        <View style={{ backgroundColor: '#F9FCFF', }}>
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
                                <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>Waiting for publish({this.state.list_data.length})</Text>
                                <Button
                                    title="Select all"
                                    titleStyle={{ fontSize: hp('1.5%'), fontWeight: '300', padding: hp('1%') }}
                                    buttonStyle={{ ...style.btnTagPrimary, padding: hp('1%') }}
                                />
                            </View>

                            <ScrollView >
                                {this.state.list_data.map((item, index) => {
                                return (
                                    <BlogManager data={item}></BlogManager>
                                    )}
                                )}
                            </ScrollView>

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
           
                {this.state.user_role == "Member" ? 
                         <MenuFooterUser value={'home'}></MenuFooterUser>
                        :
                        <MenuFooter value={'manage'}></MenuFooter>
                    }
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


