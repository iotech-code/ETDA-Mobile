
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
import axios from 'axios';
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
        this.state = { visibleSearch: false, type: 'create', user_type: '', board: 'community' , token : '' , list_data : []  }
    }


    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token');
            const user_type = await AsyncStorage.getItem('user_type');
            console.log('user type : ', user_type)
            console.log('token : ', token)
            this.setState({
                user_type: user_type,
                token : token 
            })
            this.callCommunityFeed(token)
        } catch (err) {
            console.log('err : ', err)
        }
    }

    setBoard = (value) => {
        this.setState({
            board: value
        })
    }

    callMYFeed = async (token) => {
        this.setState({
            list_data : []
        })
        axios.get('https://etda.amn-corporation.com/api/backend/post/my',{
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((response) => {
                var i  
                var objectFeed = {}
                var list = []
                for (i = 0 ; i < response.data.post_data.length ; i++){
                    objectFeed = {
                        post_id : response.data.post_data[i].post_id,
                        title : response.data.post_data[i].title,
                        date : response.data.post_data[i].post_date,
                        description : response.data.post_data[i].post_description,
                        tags : response.data.post_data[i].tags,
                        post_images : response.data.post_data[i].post_images,
                        comment :  response.data.post_data[i].comment_number,
                        like :  response.data.post_data[i].like,
                        user_name : '',
                        user_image : ''
                    }
                    list.push(objectFeed)
                    this.setState({
                        list_data : list
                    })
                }
            })
            .catch((error) => {
                console.log('e 2 : ' ,error)
            })
            .finally(function () {
            });

    };



    callCommunityFeed = async (token) => {
        this.setState({
            list_data : []
        })
        axios.get('https://etda.amn-corporation.com/api/backend/post/community-feed',{
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((response) => {
                var i  
                var objectFeed = {}
                var list = []
                for (i = 0 ; i < response.data.post_data.length ; i++){
                   
                    
                    objectFeed = {
                        post_id : response.data.post_data[i].post_id,
                        title : response.data.post_data[i].title,
                        date : response.data.post_data[i].post_date,
                        description : response.data.post_data[i].post_description,
                        tags : response.data.post_data[i].tags,
                        post_images : response.data.post_data[i].post_images,
                        comment :  response.data.post_data[i].comment_number,
                        like :  response.data.post_data[i].like,
                        user_name : '',
                        user_image : ''
                    }
                    list.push(objectFeed)
                    this.setState({
                        list_data : list
                    })
                    // this.callUserData(
                    //              response.data.post_data[i].post_id ,
                    //              response.data.post_data[i].author_id , 
                    //              response.data.post_data[i].title,
                    //              response.data.post_data[i].post_date,
                    //              response.data.post_data[i].post_description,
                    //              response.data.post_data[i].tags,
                    //              response.data.post_data[i].post_images,
                    //              response.data.post_data[i].comment_number,
                    //              response.data.post_data[i].like
                    //              )
                }
            })
            .catch((error) => {
                console.log('e 1 : ' ,error)
            })
            .finally(function () {
            });

    };

  

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
                                        onPress={() => Actions.CreatePost({ 'type_value' : 'create' , 'title': '',
                                        'description': '',
                                        'post_images': []})}
                                    />
                                </View>
                                :
                                <View style={{ ...style.container, marginBottom: hp('1%') }}></View>
                            }


                            <View style={{ ...styleScoped.wrapperButtonGroup }}>
                                <TouchableOpacity style={this.state.board == 'community' ? { ...styleScoped.btnGroupActive } : { ...styleScoped.btnGroup }}
                                    onPress={() => {
                                        this.setBoard('community')
                                        this.callCommunityFeed(this.state.token)
                                    }}
                                >
                                    <Text style={this.state.board == 'community' ? { ...styleScoped.textBtnGroupActive } : { ...styleScoped.textBtnGroup }}>Community board</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.board == 'my' ? { ...styleScoped.btnGroupActive } : { ...styleScoped.btnGroup }}
                                    onPress={() => {
                                        this.setBoard('my')
                                        this.callMYFeed(this.state.token)
                                    }}
                                >
                                    <Text style={this.state.board == 'my' ? { ...styleScoped.textBtnGroupActive } : { ...styleScoped.textBtnGroup }}>My board</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: hp('2%') }}>
                            <ScrollView style={{ marginBottom: 24 }}>
                                {this.state.list_data.map((item, index) => {
                                return (
                               
                                    <View>
                                        <MessagePost data={item}>   </MessagePost>
                                    </View>
                                    )}
                                )}
                            </ScrollView>
                                

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


