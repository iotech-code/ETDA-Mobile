
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
            isImageViewVisible: false
        }
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
        this.setState({ reply_to: data })
    }

    showImage(index) {
        this.setState({
            indeximageView: index,
            isImageViewVisible: true
        })
    }


    render() {
        const { author, post_date, tags, post_description, post_images, like, title } = this.props.data;
        const { default_avatar, list_comment, comment, indeximageView, isImageViewVisible } = this.state
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


                            <View style={{ maxHeight: hp('24%'), width: '100%', marginTop: hp('1%') }}>
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
                            borderTopWidth: 1,
                            borderTopColor: '#B5B5B5',
                            alignItems: 'center',
                            paddingHorizontal: hp('2%'),
                        }}>
                            <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#4267B2' }} />
                            <Text style={{ marginRight: hp('3%'), color: '#B5B5B5' }}> {like}</Text>
                            <Icon name="comment-outline" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />
                            <Text style={{ color: '#B5B5B5' }}>{list_comment.length}  comments</Text>
                        </View>
                    </View>


                    {/* comment */}
                    <ScrollView style={{ marginBottom: 24 }}>
                        {
                            list_comment.map((item, index) => {
                                return (
                                    <Comment data={item} key={`comment_${index}`} fnPressButton={() => this.onPressButtonChildren.bind(this)}></Comment>
                                )
                            })
                        }
                    </ScrollView>
                    {/* end comment */}
                </ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={{ ...styleScoped.warpperComment }}>
                        <TouchableOpacity>
                            <Icon name="camera" size={hp('4%')} color="#707070" style={{ marginRight: hp('2%') }} />
                        </TouchableOpacity>
                        <View style={{ ...styleScoped.boxInputCommment }}>
                            <TextInput
                                placeholder="Comment here"
                                style={{ padding: 0, fontSize: hp('2%') }}
                                value={comment}
                                onChangeText={(comment) => this.setState({ comment })} >
                            </TextInput>
                        </View>
                        <Button
                            title="send"
                            buttonStyle={{ ...style.btnPrimary }}
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
        width: '70%',
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


