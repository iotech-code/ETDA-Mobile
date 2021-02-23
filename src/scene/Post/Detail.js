
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Clipboard,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Comment from '../../components/Comment'
import { fonts } from '../../constant/util'
import { KeyboardAvoidingView } from 'react-native';
import { getListCommentPost, createCommentPost } from '../../Service/PostService'
import ImageGrid from '../../components/ImageGrid'
import ImageView from 'react-native-image-view';
import ImagePicker from 'react-native-image-crop-picker';
import FlashMessage, { showMessage } from "react-native-flash-message";
import translate from '../../constant/lang'
import { actionLikePost } from '../../Service/PostService'

export default class EventDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visibleSearch: false,
            token: '',
            post_id: 0,
            list_comment: [],
            default_avatar: require('../../assets/images/default_avatar.jpg'),
            reply_to: null,
            comment: null,
            indeximageView: 0,
            isImageViewVisible: false,
            commentImage: null,
            commentImage64: null,
            lng: {},
            is_like: 0, 
            like_count: this.props.data.like 
        }
    }

    async UNSAFE_componentWillMount() {
        await this.getLang();
    }
    
    async getLang() {
        this.setState({ isFetching: true })
        let vocap = await translate()
        this.setState({ lng: vocap })
        this.setState({ isFetching: false })
    }

    async componentDidMount() {
        const { post_id } = this.props.data
        await this.setState({ post_id })
        this.callGetComment(post_id)
    }
    async callGetComment(post_id) {

        try {
            let response = await getListCommentPost({ post_id })
            this.setState({ list_comment: response.data.comments })
        } catch (error) {
            console.log('Get list comment error : ', error)
        }

    };
    async createComment() {
        try {
            const { post_id, reply_to, comment } = this.state
            let res = await createCommentPost(post_id, reply_to, comment)
            let { status } = res.data
            console.log(status)
            if (status == "success") {
                await this.callGetComment(post_id)
                this.setState({ comment: '' })
            }
        } catch (error) {
            console.log('Create comment error : ', error)
        }
    };
    onPressButtonChildren(data) {
        this.setState({ reply_to: data.User_id, comment: '@'+data.Fullname +' ' })
        this.secondTextInput.focus()

    }

    async pickImage() {
        this.setState({ loadingImage: true })
        let images = await ImagePicker.openPicker({
            multiple: false,
            includeBase64: true
        })
        var image_base64 = 'data:image/jpeg;base64,' + images.data

        await this.setState({
            commentImage: images.sourceURL,
            commentImage64: image_base64
        });
        console.log(this.state)
    }

    showImage(index) {
        this.setState({
            indeximageView: index,
            isImageViewVisible: true
        })
    }

    sharePOST(post_url) {
        console.log(post_url)
        showMessage({
            message: "Share url copied!",
            description: post_url,
            type: "info",
        });
        Clipboard.setString(post_url)
    }

    async callPostLike(post_id) {
        try {
            let { is_like, like_count } = this.state
            let response = await actionLikePost({ post_id })
            let { status } = response.data
            if (status == 'success') {
                this.setState({
                    is_like: is_like ? 0 : 1,
                    like_count: is_like ? like_count - 1 : like_count + 1
                })
            }
        } catch (error) {
            console.log('Like post error : ', error)
        }
    };

    render() {
        const { author, post_date, tags, post_description, post_images, post_id, title, share_url, view } = this.props.data;
        // console.log(this.props.data)
        const { default_avatar, list_comment, comment, indeximageView, isImageViewVisible, lng, is_like, like_count } = this.state
        let imageForView = []
        for (let index = 0; index < post_images.length; index++) {
            const element = post_images[index];
            let objImage = {
                source: {
                    uri: element,
                },
                width: 806,
                height: 720,
            }
            imageForView.push(objImage)
        }
        
        return (
            <View style={{ flex: 1 }}>
                <FlashMessage position="top"
                    style={{
                        backgroundColor: '#5b5b5b'
                    }} />
                <ScrollView style={{ flex: 1, backgroundColor: '#F9FCFF', ...style.marginHeaderStatusBar }}>
                    
                    <View style={{
                        ...styleScoped.shadowCard,
                        backgroundColor: 'white',
                        paddingBottom: hp('2%'),
                        marginBottom: hp('2%'),
                    }}>
                        <View style={{ ...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }} numberOfLines={1}>{title}</Text>
                            <View></View>
                        </View>
                        <View style={{
                            ...style.space__between,
                            alignItems: 'center',
                            paddingHorizontal: hp('2%'),
                            marginTop: hp('2%')
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{
                                    height: hp('7%'),
                                    width: hp('7%'),
                                    marginRight: hp('1%')
                                }}>
                                    <Image source={!author.photo ? default_avatar : { uri: author.photo }} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 50 }} />
                                </View>
                                <View >
                                    <Text style={{ fontSize: hp('2%') }}>{author.full_name}</Text>
                                    <Text style={{ fontSize: hp('2%'), color: fonts.color.secondary }}>{post_date}</Text>
                                </View>
                            </View>
                        </View>


                        <View style={style.container}>
                            <Text style={{ fontSize: hp('2.2%'), color: '#333', marginTop: 20, fontWeight: 'bold' }}>{title}</Text>
                            <View style={{ marginTop: hp('1%'), ...style.flex__start, alignItems: 'center', flexWrap: 'wrap' }}>
                                {
                                    tags.map((item, index) => {
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


                            <View style={{ maxHeight: hp('31%'), width: '100%', marginTop: hp('1%') }}>
                                <ImageGrid
                                    data={post_images}
                                    getIndexImage={true}
                                    onPressImage={(index) => this.showImage(index)} />
                                <ImageView
                                    images={imageForView}
                                    imageIndex={indeximageView}
                                    isVisible={isImageViewVisible}
                                    onClose={() => this.setState({ isImageViewVisible: false })}
                                />
                            </View>
                            <View style={{ marginTop: hp('1%') }}>
                                <Text style={{ fontSize: hp('1.8%') }}>
                                    {post_description}
                                </Text>
                            </View>

                        </View>

                        <View style={{
                            ...style.flex__start,
                            marginTop: hp('2%'),
                            paddingTop: hp('1.5%'),
                            alignItems: 'center',
                            width: wp('100%'),
                            paddingHorizontal: hp('2%'),
                        }}>
                            <TouchableOpacity onPress={() => this.callPostLike(post_id)} style={{flexDirection: 'row'}}>
                                <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: is_like ? '#4267B2' : '#B5B5B5' }} />
                                <Text style={{ marginRight: hp('3%'), color: '#B5B5B5' }}> {like_count}</Text>
                            </TouchableOpacity>

                            <Icon name="eye" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />
                            <Text style={{ marginRight: hp('3%'), color: '#B5B5B5' }}> {view === undefined?0:view}</Text>

                            <TouchableOpacity onPress={() => this.sharePOST(share_url)}>
                                <Icon name="share-outline" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                        onPress={() => this.secondTextInput.focus()}
                        style={{
                            ...style.flex__start,
                            marginTop: hp('2%'),
                            paddingTop: hp('1.5%'),
                            borderTopWidth: 1,
                            borderTopColor: '#B5B5B5',
                            alignItems: 'center',
                            paddingHorizontal: hp('2%'),
                        }}>
                            <Icon name="comment-outline" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />
                            <Text style={{ color: '#B5B5B5' }}>{list_comment.length}  {lng.comments}</Text>
                        </TouchableOpacity>
                    </View>


                    {/* comment */}
                    <ScrollView style={{ marginBottom: 24 }}>
                        {
                            list_comment.map((item, index) => {
                                return (
                                    <Comment data={item} key={`comment_${index}`} fnPressButton={(data) => this.onPressButtonChildren(data)}></Comment>
                                )
                            })
                        }
                    </ScrollView>
                    {/* end comment */}
                </ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={{ ...styleScoped.warpperComment }}>
                        <View>
                            {
                                this.state.commentImage &&
                                <Image source={{uri: this.state.commentImage}}
                                style={{ width: '50%', height: '25%', resizeMode: 'cover', borderRadius: 4 }} />
                                
                            }
                        </View>
                        {/* <TouchableOpacity onPress={() => this.pickImage()}>
                            <Icon name="camera" size={hp('4%')} color="#707070" style={{ marginRight: hp('2%') }} />
                        </TouchableOpacity> */}
                        <View style={{ ...styleScoped.boxInputCommment }}>
                            <TextInput
                                placeholder={lng.comment_here}
                                style={{ padding: 0, fontSize: hp('2%') }}
                                value={comment}
                                ref={(input) => { this.secondTextInput = input; }}
                                onChangeText={(comment) => this.setState({ comment })} >
                            </TextInput>
                        </View>
                        <Button
                            title={lng.send}
                            buttonStyle={{ ...style.btnPrimary, minWidth: wp('13%') }}
                            onPress={() => this.createComment()}
                        />

                    </View>
                </KeyboardAvoidingView>
            </View >
        );
    }
};

const styleScoped = StyleSheet.create({
    warpperComment: {
        paddingHorizontal: hp('3%'),
        paddingTop: hp('1%'),
        paddingBottom: hp('4%'),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    boxInputCommment: {
        padding: hp('1%'),
        borderColor: '#C8C8CC',
        borderWidth: 1,
        borderRadius: 5,
        width: '83%',
        marginRight: hp('1%')
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


