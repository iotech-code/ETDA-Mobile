
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Clipboard,
    ActivityIndicator,
    TouchableOpacity,
    FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import HeaderNavbar from '../../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../../components/MenuFooter'
import MenuFooterUser from '../../components/MenuFooterUser'
import Post from '../../components/Post'
import { communityFeed, myFeed } from '../../Service/PostService'
import EventPost from '../../components/EventPost'
import { colors, apiServer } from '../../constant/util'
import FlashMessage, { showMessage } from "react-native-flash-message";

export default class MessageBoard extends Component {
    constructor() {
        super();
        this.state = { 
            visibleSearch: false, 
            type: 'create', 
            user_type: '', 
            board: 'community' , 
            token : '' , 
            list_data : []  , 
            user_role : '',
            communityFeedCurrentPage: 0,
            myFeedCurrentPage: 0 
        }
    }

    async componentDidMount() {

    }

    async UNSAFE_componentWillMount () {
        try {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user_data');
            const {user_type, user_role, fullname} = JSON.parse(user);

            this.setState({
                user_type: user_type,
                token : token,
                user_role : user_role
            })
            
            this.callCommunityFeed(token);

        } catch (err) {
            console.log('err : ', err)
        }
    }

    async componentWillUnmount () {
        await this.setState({list_data: false})
    }

    setBoard = (value) => {
        this.setState({
            board: value
        })
    }

    callMYFeed = async (token) => {
        await this.setState({
            list_data : [],
        });
        let { data } = await myFeed(0, 0);

        await this.setState({
            list_data : data.post_data,
        });
    }

    callCommunityFeed = async (token) => {
        await this.setState({
            list_data : [],
        });
        let { data } = await communityFeed(0, 0);

        await this.setState({
            list_data : data.post_data,
        });
    };

    async updateCommunityFeed () {
        let { data } = await communityFeed(this.state.communityFeedCurrentPage, this.state.communityFeedCurrentPage+1);

        await this.setState({
            ...this.state.list_data,
            list_data : data.post_data,
            communityFeedCurrentPage: communityFeedCurrentPage+1
        });
    }

    async updateMyFeed () {
        let { data } = await communityFeed(this.state.myFeedCurrentPage, this.state.myFeedCurrentPage+1);

        await this.setState({
            ...this.state.list_data,
            list_data : data.post_data,
            myFeedCurrentPage: myFeedCurrentPage+1
        });
    }

    sortFeed(feed) {
        this.setState({ list_data: feed.reverse() });
    }

    shareCallback (url) {
        showMessage({
            message: "Share url copied!",
            description: url,
            type: "info",
        });
        Clipboard.setString(url)
    }

    render() {
        const { dataList } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                <FlashMessage position="top" 
                style={{
                    backgroundColor: '#5b5b5b'
                }}/>
                <ScrollView>
                    <View style={{ flex: 1 }}>
                    {this.state.user_role == "Member" ? 
                    <HeaderNavbar  value={'member'}></HeaderNavbar>
                    :
                    <HeaderNavbar  value={'admin'}></HeaderNavbar>
                    }
                        <View style={{ backgroundColor: '#F9FCFF', paddingBottom: hp('1%') }}>
                            
                            <>
                                    <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    padding: hp('2%'),
                                    alignItems: 'center'
                                }}>
                                    <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>Message Board</Text>
                                    <TouchableOpacity onPress={() => this.sortFeed(this.state.list_data)}>
                                        <Icon name="compare-vertical" size={hp('3%')} color="#707070" />
                                    </TouchableOpacity>
                                </View>
                                <View  style={{ ...style.container }}>
                                    <Button
                                        title={global.lng.new_post}
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
                            </>

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
                                {
                                    this.state.list_data.length === 0 ?
                                    <ActivityIndicator color="#003764" style={{ marginTop: hp('25%') }} />
                                    :
                                    this.state.list_data.map((item, index) => {
                                        if (item.post_type == 'event') {
                                            return (
                                                <EventPost data={item} key={`event_${index}`}></EventPost>
                                            )
                                        } else if (item.post_type == 'blog') {
                                            return (
                                                <Post data={item} page="message_board" 
                                                sharePressButton={(url) => this.shareCallback(url)} 
                                                onPostUpdate={() => this.callHomeFeed()} 
                                                key={`blog_${index}`}></Post>
                                            )
                                        }
                                    })
                                }
                                {/* end  show post */}
                                {/* {this.state.list_data.map((item, index) => {
                                return (
                               
                                    <View>
                                        
                                        <MessagePost data={item} key={`MessagePost_${index}`}>   </MessagePost>
                                    </View>
                                    )}
                                )} */}
                            </ScrollView>
                                

                            </View>

                        </View>
                    </View>
                </ScrollView>
                {this.state.user_role == "Member" ? 
                    <MenuFooterUser value={'message'}></MenuFooterUser>
                    :
                    <MenuFooter value={'message'}></MenuFooter>
                }
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


