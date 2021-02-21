
import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    Clipboard,
    FlatList
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import HeaderNavbar from '../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../components/MenuFooter'
import MenuFooterUser from '../components/MenuFooterUser'
import Post from '../components/Post'
import { homeFeed } from '../Service/PostService'
import EventPost from '../components/EventPost'
import tr from '../constant/lang'
import FlashMessage, { showMessage } from "react-native-flash-message";
export default class Main extends Component {
    state = {
        visibleSearch: false,
        user_type: '',
        token: '',
        list_data: [],
        user_role: '',
        isFetching: false,
        lng: {},
        feedCurrentPage: 0
    }

    async componentWillUnmount() {
        await this.setState({ list_data: false })
    }

    async UNSAFE_componentWillMount() {
        // console.log('test : ',  global.lng) // แสดงค่า gobal testGobal
        await this.getUserInfo();
        await this.callHomeFeed();
        await this.getLang();
    }

    async getLang() {
        this.setState({ isFetching: true })
        let lng = await tr()
        this.setState({ lng })
        this.setState({ isFetching: false })
    }

    async getUserInfo() {
        let user_json = await AsyncStorage.getItem('user_data');
        let user_data = JSON.parse(user_json);

        this.setState({
            user_type: user_data.user_type,
            user_role: user_data.user_role
        })
    };

    async callHomeFeed() {
        this.setState({ isFetching: true })
        try {
            let { data } = await homeFeed(0, 0);
            await this.setState({ list_data: data.post_data });
        } catch (error) {
            console.log("Main scene error : ", error)
        }
        this.setState({ isFetching: false })
    };

    shareCallback(url) {
        showMessage({
            message: "Share url copied!",
            description: url,
            type: "info",
        });
        Clipboard.setString(url)
    }

    async updateHomeFeed() {
        try {
            let { data } = await homeFeed(this.stat.feedCurrentPage, this.stat.feedCurrentPage + 1);
            await this.setState({
                ...this.state.list_data,
                list_data: data.post_data,
                feedCurrentPage: this.stat.feedCurrentPage + 1
            });
        } catch (error) {
            console.log("Main scene error : ", error)
        }
    }

    createPost() {
        Actions.replace('CreatePost', {
            'type_value': 'create', 'title': '',
            'description': '',
            'post_images': []
        })
    }

    sortFeed(feed) {
        this.setState({ list_data: feed.reverse() });
    }

    renderTypeInFlatlist({item}) {
        console.log(item)
        if (item.post_type == 'event') {
            return (
                <EventPost data={item} ></EventPost>
            )
        } else if (item.post_type == 'blog') {
            return (
                <Post data={item} page="main" sharePressButton={(url) => this.shareCallback(url)} onPostUpdate={() => this.callHomeFeed} ></Post>
            )
        }
    }

    render() {
        const { isFetching, user_role, list_data } = this.state
        return (
            <View style={{ flex: 1, ...style.marginHeaderStatusBar, backgroundColor: '#F9FCFF' }}>
                <StatusBar barStyle="dark-content" />
                <FlashMessage position="top"
                    style={{
                        backgroundColor: '#5b5b5b'
                    }} />
                <ScrollView>
                    <View style={{ flex: 1, paddingBottom: hp('1%') }}>
                        {
                            user_role == "Member" ?
                                <HeaderNavbar value={'member'}></HeaderNavbar>
                                :
                                <HeaderNavbar value={'admin'}></HeaderNavbar>
                        }


                        {/* loading data */}

                        {
                            isFetching ?
                                <ActivityIndicator color="#003764" style={{ marginTop: hp('35%') }} />
                                : <Fragment>
                                    <View style={{ ...style.space__between, padding: hp('2%'), alignItems: 'center' }}>
                                        <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}> ETDA Blogs </Text>
                                        <TouchableOpacity onPress={() => this.sortFeed(list_data)}>
                                            <Icon name="compare-vertical" size={hp('3%')} color="#707070" />
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        user_role !== 'Member' &&
                                        <View style={{ ...style.container, marginBottom: hp('1%') }}>
                                            <Button
                                                title={global.lng.new_post}
                                                Outline={true}
                                                titleStyle={{ color: '#003764', }}
                                                buttonStyle={{
                                                    padding: hp('1%'),
                                                    ...style.btnPrimaryOutline,
                                                    ...style.btnRounded
                                                }}
                                                onPress={() => this.createPost()}
                                            />
                                        </View>
                                    }
                                    {/* end section create post  */}


                                    {/*   show post  */}
                                    <FlatList
                                        data={this.state.list_data}
                                        renderItem={this.renderTypeInFlatlist}
                                        keyExtractor={item => item.id}
                                    />
                                    {/* {

                                        this.state.list_data.map((item, index) => {
                                            if (item.post_type == 'event') {
                                                return (
                                                    <EventPost data={item} key={`event_${index}`}></EventPost>
                                                )
                                            } else if (item.post_type == 'blog') {
                                                return (
                                                    <Post data={item} page="main" sharePressButton={(url) => this.shareCallback(url)} onPostUpdate={() => this.callHomeFeed} key={`blog_${index}`}></Post>
                                                )
                                            }
                                        })
                                    } */}
                                    {/* end  show post */}


                                </Fragment>
                        }
                        {/* end loading data */}

                    </View>
                </ScrollView>

                <View style={{ backgroundColor: null }}>
                    {this.state.user_role == "Member" ?
                        <MenuFooterUser value={'home'}></MenuFooterUser>
                        :
                        <MenuFooter value={'home'}></MenuFooter>
                    }
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


