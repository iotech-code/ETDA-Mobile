
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
    SafeAreaView,
    FlatList,
    RefreshControl
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
import translate from '../constant/lang'
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
        loading: false,
        feedCurrentPage: 0,
        isFinish: false,
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
        let vocap = await translate()
        this.setState({ lng: vocap })
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
            // let {feedCurrentPage} = this.state
            await this.setState({loading: true})
            console.log("finish", this.state.isFinish)
            if(!this.state.isFinish) {
                let { data } = await homeFeed(this.state.feedCurrentPage, this.state.feedCurrentPage + 1);
                console.log(this.state.feedCurrentPage, this.state.feedCurrentPage + 1, data.post_data.length)
                if(data.post_data.length !== 0) {
                    let new_data = [...this.state.list_data, ...data.post_data]
                    await this.setState({
                        list_data: new_data,
                        feedCurrentPage: this.state.feedCurrentPage + 1
                    })
                } else {
                    this.setState({isFinish: true})
                }
            }
            await this.setState({loading: true})
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
        // console.log(item)
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

    renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
         if (!this.state.loading) return null;
         return (
           <ActivityIndicator
             style={{ color: '#000' }}
           />
         );
       };

    render() {
        const { isFetching, user_role, list_data, lng } = this.state
 
        return (
            <View style={{ flex: 1, ...style.marginHeaderStatusBar, backgroundColor: '#F9FCFF' }}>
                <StatusBar barStyle="dark-content" />
                <FlashMessage position="top"
                    style={{
                        backgroundColor: '#5b5b5b'
                    }} />
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
                                    <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>{lng.etda_blog}</Text>
                                    <TouchableOpacity onPress={() => this.sortFeed(list_data)}>
                                        <Icon name="compare-vertical" size={hp('3%')} color="#707070" />
                                    </TouchableOpacity>
                                </View>
                                {
                                    user_role !== 'Member' &&
                                    <View style={{ ...style.container, marginBottom: hp('1%') }}>
                                        <Button
                                            title={lng.new_post}
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
                                <SafeAreaView style={{flex: 1}}>
                                    <FlatList
                                        data={this.state.list_data}
                                        renderItem={this.renderTypeInFlatlist}
                                        keyExtractor={item => item.id}
                                        // onEndReached={this.updateHomeFeed()}
                                        onEndReached={!this.state.isFinish&&this.updateHomeFeed.bind(this)}
                                        ListFooterComponent={this.renderFooter.bind(this)}
                                        onEndThreshold={0.4}
                                        refreshControl={
                                            <RefreshControl
                                              refreshing={this.state.isFetching}
                                              onRefresh={this.callHomeFeed.bind(this)}
                                            />
                                          }
                                    />
                                </SafeAreaView>

                            </Fragment>
                    }
                    {/* end loading data */}

                </View>

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


