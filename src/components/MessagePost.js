
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
    Platform,
    AsyncStorage
} from 'react-native';

import { Button, ListItem } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import axios from 'axios';
import FbGrid from "react-native-fb-image-grid";
import ImageView from 'react-native-image-view';
import { apiServer } from '../constant/util';

export default class MessagsPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            postId: '1',
            type: 'edit',
            visibleBottomSheet: false,
            data: {
                title: 'E-commerce new gen',
                time: ' 11/11/2020  3:30 pm',
                image: require('../assets/images/post_1.png'),
                detail: ' Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et',
                tag: ['E-commerce', 'Digital Law']
            },
            socail: {
                like: 22,
                view: 22
            },
            default_avatar: require('../assets/images/default_avatar.jpg'),
            isImageViewVisible: false,
            isIndeximageForshow: 0,
            like: 0
        }
    }




    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token')
            const like = this.props.data.like
            console.log('token : ', token)
            this.setState({
                token: token,
                like: like
            })
        } catch (err) {
            // handle errors
        }
    }

    openOption() {
        this.setState({ visibleBottomSheet: true })
        this.RBSheet.open()
    }


    callDeletePost = async (post_id) => {
        this.setState({ visibleBottomSheet: false }),
            this.RBSheet.close()
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }

        axios.delete(apiServer.url + '/api/backend/post/delete/' + post_id, {
            headers
        })
            .then((response) => {
                console.log('data : ', response.data)
                if (response.data.status == "success") {
                    Actions.MessageBoard()
                } else {

                }
            })
            .catch((error) => {
                console.log('data : ', error)
            })
            .finally(function () {
            });

    };



    callPostLike = async (post_id) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }

        const data = {
            "post_id": post_id
        }

        axios.post(apiServer.url + '/api/backend/post/like', data, {
            headers
        })
            .then((response) => {
                if (response.data.status == "success") {
                    var like_result = this.state.like + 1

                    this.setState({
                        like: like_result
                    })

                    console.log('data success post like : ', response.data)
                } else {

                }
            })
            .catch((error) => {
                console.log('data : ', error)
            })
            .finally(function () {
            });

    };


    callPostFollow = async (post_id) => {
        this.setState({ visibleBottomSheet: false }),
            this.RBSheet.close()
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }

        const data = {
            "post_id": post_id
        }

        axios.post(apiServer.url + '/api/backend/post/follow', data, {
            headers
        })
            .then((response) => {
                if (response.data.status == "success") {

                } else {

                }
            })
            .catch((error) => {
                console.log('data : ', error)
            })
            .finally(function () {
            });

    };

    async imageViewer(url, index) {
        await this.setState({ isIndeximageForshow: index })
        await this.setState({ isImageViewVisible: true })
    }

    renderBottomSheet() {
        const { visibleBottomSheet } = this.state
        return (
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                height={Platform.OS === 'ios' ? hp('25%') : hp('23%')}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                        paddingTop: hp('1%'),
                        backgroundColor: 'white',
                        ...style.shadowCard
                    }
                }}
            >
                <TouchableOpacity style={{
                    ...styleScoped.listMore
                }}
                    onPress={() => this.callPostFollow(this.props.data.post_id)}
                >
                    <Icon name="heart" size={hp('3%')} color="#FF0066" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Follow Blog</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>
                <TouchableOpacity style={{
                    ...styleScoped.listMore
                }}
                    onPress={() => {
                           Actions.CreatePost({
                            'type_value' : 'edit',
                            'title': this.props.data.title,
                            'description': this.props.data.description,
                            'post_images': this.props.data.post_images
                        })
                            this.setState({ visibleBottomSheet: false }),
                            this.RBSheet.close()
                    }}
                >
                    <Icon name="pencil" size={hp('3%')} color="#29B100" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Edit blog</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>

                <TouchableOpacity style={{
                    ...styleScoped.listMore
                }}
                    onPress={() => this.callDeletePost(this.props.data.post_id)}
                >
                    <Icon name="delete" size={hp('3%')} color="#003764" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Delete blog</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>

            </RBSheet>
        )
    }
    render() {
        const { data, socail, default_avatar } = this.state
        let { post_images } = this.props.data
        let image_viewer = []
        for (let index = 0; index < post_images.length; index++) {
            const element = post_images[index];
            let obj = {
                source: {
                    uri: element,
                },
                width: 806,
                height: 720,
            }
            image_viewer.push(obj)
        }
        return (
            <View style={{
                ...styleScoped.shadowCard,
                backgroundColor: 'white',
                paddingVertical: hp('1%'),
                marginBottom: hp('2%')
            }}>
                <View style={{ paddingHorizontal: hp('2%') }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{
                                height: hp('5%'),
                                width: hp('5%'),
                                marginRight: hp('1%'),
                                borderRadius: 50
                            }}>

                                <Image source={this.props.data.user_image ? { uri: this.props.data.user_image } : default_avatar} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 50 }} />
                            </View>
                            <View >
                                <Text style={{ fontSize: hp('2%'), }}>{this.props.data.user_name}</Text>
                                <Text style={{ fontSize: hp('1.5%'), fontWeight: '300', color: '#B5B5B5' }} >{this.props.data.date}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.openOption()} >
                            <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: hp('1%') }}>
                        <Text style={{ fontSize: hp('2%') }}>{this.props.data.title}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: hp('1%'), flexWrap: 'wrap' }}>
                            {
                                this.props.data.tags.map((item, index) => {
                                    return (
                                        <Button
                                            title={item}
                                            titleStyle={{ fontSize: hp('1.5%') }}
                                            buttonStyle={{ ...style.btnTagPrimary, marginTop: hp('1%') }}
                                            key={index}
                                        />
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={{ height: hp('23%'), marginTop: hp('1%') }}>
                        {/* <Image
                            source={{ uri: this.props.data.post_images[0] }}
                            style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
                        /> */}
                        <FbGrid
                            images={post_images}
                            onPress={(url, index) => this.imageViewer(url, index)}
                        />
                        <ImageView
                            images={image_viewer}
                            imageIndex={this.state.isIndeximageForshow}
                            isVisible={this.state.isImageViewVisible}
                            onClose={() => this.setState({ isImageViewVisible: false })}
                        />

                    </View>
                    <TouchableOpacity 
                        onPress={() => {
                            Actions.CreatePost({
                                'type_value' : 'detail',
                                'title': this.props.data.title,
                                'description': this.props.data.description,
                                'post_images': this.props.data.post_images
                            })
                          //  Actions.CreatePost({ 'type': this.props.type , 'type_value' : 'detail' , 'data' : item })
                        }}
                    >
                    <View style={{ marginTop: hp('1%') }}>
                        <Text style={{ fontSize: hp('2%'), fontWeight: '300' }}>{this.props.data.description}</Text>
                    </View>

                    </TouchableOpacity>

                    <View style={{
                        marginTop: hp('2%'),
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        {/* <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "flex-start" }}> */}
                        <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#4267B2' }} />
                        <Text style={{ marginRight: hp('3%'), color: '#B5B5B5', marginTop: hp('0.4%') }}>{this.state.like}</Text>
                        {/* </TouchableOpacity> */}
                        {/* <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "flex-start" }}> */}
                        <Icon name="eye" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />
                        <Text style={{ color: '#B5B5B5', marginTop: hp('0.4%') }}>{this.props.data.comment}</Text>
                        {/* </TouchableOpacity> */}
                    </View>
                </View>

                <View style={{ ...style.sectionSocial }}>
                    <TouchableOpacity
                        onPress={() => this.callPostLike(this.props.data.post_id)}
                    >
                        <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('2%'), color: '#4267B2' }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Actions.PostDetail({
                                'user_image': this.props.data.user_image,
                                'user_name': this.props.data.user_name,
                                'user_date': this.props.data.date,
                                'user_title': this.props.data.title,
                                'user_tags': this.props.data.tags,
                                'user_images': this.props.data.post_images[0],
                                'user_description': this.props.data.description,
                                'user_like': this.props.data.like,
                                'user_comment': this.props.data.comment,
                                'user_post_id': this.props.data.post_id
                            })
                            AsyncStorage.setItem('post_id', this.props.data.post_id.toString())
                        }}
                    >
                        <Icon name="comment-outline" size={hp('2.5%')} style={{ marginRight: hp('2%'), color: '#B5B5B5' }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="share-outline" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />
                    </TouchableOpacity>
                </View>
                {this.renderBottomSheet()}
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
    },
    listMore: {
        width: '100%',
        padding: hp('2%'),
        flexDirection: 'row',
        alignItems: 'center',

    }
});


