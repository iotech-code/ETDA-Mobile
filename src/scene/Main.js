
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
    RefreshControl,
    ActivityIndicator
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, BottomSheet } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import HeaderNavbar from '../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../components/MenuFooter'
import MenuFooterUser from '../components/MenuFooterUser'
import Post from '../components/Post'
import { homeFeed } from '../Service/PostService'
export default class Main extends Component {
    state = {
        visibleSearch: false,
        user_type: '',
        token: '',
        list_data: [],
        user_role: '',
        isFetching: false
    }

    async componentDidMount() {

        await this.getUserInfo();
        await this.callHomeFeed();
        // const [refreshing, setRefreshing] = React.useState(false);
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
            let { data } = await homeFeed();
            let list_data = []
            for (let index = 0; index < data.post_data.length; index++) {
                const element = data.post_data[index];
                let objectHomeFeed = {
                    post_id: element.post_id,
                    title: element.title,
                    date: element.post_date,
                    description: element.post_description,
                    tags: element.tags,
                    post_images: element.post_images,
                    comment: element.comment_number,
                    like: element.like,
                    autor: element.author
                }
                list_data.push(objectHomeFeed)
            }
            await this.setState({ list_data: data.post_data });
        } catch (error) {
            console.log("Main scene error : ", error)
        }
        this.setState({ isFetching: false })
    };

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

    render() {
        const { isFetching, user_type, user_role, list_data } = this.state

        return (
            <View style={{ flex: 1, ...style.marginHeaderStatusBar, backgroundColor: '#F9FCFF' }}>
                <StatusBar barStyle="dark-content" />
                <ScrollView>
                    <View style={{ flex: 1, paddingBottom: hp('1%') }}>
                        {
                            user_role == "Member" ?
                                <HeaderNavbar value={'member'}></HeaderNavbar>
                                :
                                <HeaderNavbar value={'admin'}></HeaderNavbar>
                        }

                        <View style={{ ...style.space__between, padding: hp('2%'), alignItems: 'center' }}>
                            <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}> ETDA Blogs </Text>
                            <TouchableOpacity onPress={() => this.sortFeed(list_data)}>
                                <Icon name="compare-vertical" size={hp('3%')} color="#707070" />
                            </TouchableOpacity>
                        </View>


                        {/* section create post  */}
                        {
                            user_role !== 'Member' &&
                            <View style={{ ...style.container, marginBottom: hp('1%') }}>
                                <Button
                                    title="Write New Blog"
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

                        {/* loading data */}
                        {
                            isFetching ?
                                <ActivityIndicator color="#003764" style={{ marginTop: hp('27%') }} />
                                : null
                        }
                        {/* end loading data */}


                        {/*   show post  */}
                        {

                            this.state.list_data.map((item, index) => {
                                return (
                                    <Post data={item} key={`post_${index}`}></Post>
                                )
                            })
                        }
                        {/* end  show post */}
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


