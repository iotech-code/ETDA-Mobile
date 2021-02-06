
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
    KeyboardAvoidingView
} from 'react-native';

import { Button, Overlay } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import { fonts } from '../constant/util';
import axios from 'axios';
import FbGrid from "react-native-fb-image-grid";
import ImageView from 'react-native-image-view';



export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                title: 'E-commerce new gen',
                time: '2 minutes ago',
                image: require('../assets/images/post_1.png'),
                detail: ' Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et',
                tag: ['E-commerce', 'Test Tag']
            },
            socail: {
                like: 22,
                view: 22
            },
            visibleBottomSheet: false,
            visibleModalReport: false,
            imagesForView: [
                {
                    source: {
                        uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
                    },
                    width: 806,
                    height: 720,
                },
                {
                    source: {
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
                    },
                    width: 806,
                    height: 720,
                },
                {
                    source: {
                        uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
                    },
                    width: 806,
                    height: 720,
                },
                {
                    source: {
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
                    },
                    width: 806,
                    height: 720,
                },
                {
                    source: {
                        uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
                    },
                    width: 806,
                    height: 720,
                },
                {
                    source: {
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
                    },
                    width: 806,
                    height: 720,
                },
            ],
            isImageViewVisible: false,
            isIndeximageForshow: 0,
            imageForShow: [
                "https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg",
                "https://facebook.github.io/react-native/docs/assets/favicon.png",
                "https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg",
                "https://facebook.github.io/react-native/docs/assets/favicon.png",
                "https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg",
                "https://facebook.github.io/react-native/docs/assets/favicon.png",
            ],
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
        this.RBSheet.open()
    }

    openReport() {
        this.setState({ visibleModalReport: true })
        this.RBSheet.close()
    }
    async imageViewer(url, index) {
        await this.setState({ isIndeximageForshow: index })
        await this.setState({ isImageViewVisible: true })
    }
    renderModalReport() {
        const { visibleModalReport } = this.state
        return (
            <Overlay
                isVisible={visibleModalReport}
                overlayStyle={{
                    width: wp('90%'),
                    paddingVertical: hp('2%'),
                    paddingHorizontal: hp('2%')
                }}
            >
                <KeyboardAvoidingView behavior="position">
                    <View style={{
                        borderBottomColor: '#707070',
                        borderBottomWidth: 1,
                        paddingBottom: hp('1.5%')
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: fonts.color.primary,
                            fontSize: hp('2%'),
                            fontWeight: '600'
                        }}>Report</Text>
                    </View>

                    <View style={{ marginVertical: hp('1%') }}>
                        <Text style={{ fontSize: hp('2%') }}>Select topic for report</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                            <Button
                                title="Fake news"
                                titleStyle={{ fontSize: hp('2%') }}
                                buttonStyle={{ ...style.btnPrimary, margin: hp('0.5%') }}
                            />
                            <Button
                                title="Cyber bully"
                                titleStyle={{ fontSize: hp('2%') }}
                                buttonStyle={{ ...style.btnPrimary, margin: hp('0.5%') }}
                            />
                            <Button
                                title="Threat"
                                titleStyle={{ fontSize: hp('2%'), color: fonts.color.primary }}
                                buttonStyle={{ ...style.btnPrimaryOutline, margin: hp('0.5%') }}
                            />
                        </View>
                        <Text style={{ fontSize: hp('2%'), marginTop: hp('2%') }}>Give reason for report this post not suitable</Text>
                    </View>

                    <View style={{ ...style.customInput, height: hp('20%'), flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <TextInput
                            style={{ fontSize: hp('2%'), padding: 0 }}
                            placeholder="Enter your reason…"
                            multiline={true}
                        />
                    </View>


                    <View style={{ marginTop: hp('1%') }}>
                        <Button
                            title="Report"
                            buttonStyle={{
                                padding: hp('1.5%'),
                                ...style.btnRounded,
                                ...style.btnPrimary
                            }}
                            onPress={() => this.setState({ visibleModalReport: false })}
                        />
                    </View>
                </KeyboardAvoidingView>
            </Overlay>
        )
    }

    renderBottomSheet() {
        const { visibleBottomSheet } = this.state
        return (
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                height={Platform.OS === 'ios' ? hp('32%') : hp('30%')}
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
                            'description': this.props.data.detail,
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

                <TouchableOpacity style={{ ...styleScoped.listMore }} onPress={() => this.openReport()}>
                    <Icon name="file-document" size={hp('3%')} color="#003764" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Report</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>

            </RBSheet>
        )
    }


    callDeletePost = async (post_id) => {
        this.setState({ visibleBottomSheet: false }),
            this.RBSheet.close()
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }

        axios.delete('https://etda.amn-corporation.com/api/backend/post/delete/' + post_id, {
            headers
        })
            .then((response) => {
                console.log('data : ', response.data)
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



    callPostLike = async (post_id) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }

        const data = {
            "post_id": post_id
        }

        axios.post('https://etda.amn-corporation.com/api/backend/post/like', data, {
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

        axios.post('https://etda.amn-corporation.com/api/backend/post/follow', data, {
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

    render() {
        console.log('Post component Created ! ')
        const { data, socail } = this.state

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
                        <Text style={{ fontSize: hp('2%'), }}>{this.props.data.title}</Text>
                        <TouchableOpacity onPress={() => this.openOption()}>
                            <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: hp('1.5%'), fontWeight: '300', color: '#B5B5B5' }} >{this.props.data.post_date}</Text>
                    <View style={{ marginTop: hp('0.5%'), justifyContent: 'flex-start', flexDirection: 'row', flexWrap: 'wrap' }}>
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
                    <View style={{ height: hp('23%'), marginTop: hp('1%') }}>
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
                    {/* <TouchableOpacity style={{ marginTop: hp('1%') }} onPress={() => Actions.PostDetail()}> */}
                    <Text style={{ fontSize: hp('2%'), fontWeight: '300' }}>{this.props.data.detail}</Text>
                    {/* </TouchableOpacity> */}

                    <View style={{
                        marginTop: hp('2%'),
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        {/* <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "flex-start" }}> */}
                        <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#4267B2' }} />
                        <Text style={{ marginRight: hp('3%'), color: '#B5B5B5', marginTop: hp('0.4%') }}>{this.props.data.like}</Text>
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
                                'user_image': '',
                                'user_name': '',
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
                {this.renderModalReport()}
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({

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


