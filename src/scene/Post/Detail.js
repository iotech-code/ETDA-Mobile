
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, BottomSheet } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Comment from '../../components/Comment'
import { fonts, apiServer } from '../../constant/util'
import axios from 'axios';
import { KeyboardAvoidingView } from 'react-native';

export default class EventDetail extends Component {
    state = {
        visibleSearch: false,
        data: {
            title: 'E-commerce new gen By ETDA official',
            time: '11/11/2020  3:30 pm',
            detail: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur',
            image: require('../../assets/images/post_1.png')
        },
        socail: {

        },
        comment: '',
        post_id: 0,
        reply_to: 0
    }






    constructor(props) {
        super(props)
        this.state = {
            visibleSearch: false,
            data: {
                title: 'E-commerce new gen By ETDA official',
                time: '11/11/2020  3:30 pm',
                detail: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur',
                image: require('../../assets/images/post_1.png')
            },
            token: '',
            post_id: 0,
            list_comment: [],
            default_avatar: require('../../assets/images/default_avatar.jpg'),
        }
    }


    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token')
            const post_id = await AsyncStorage.getItem('post_id')
            this.setState({
                token: token,
                post_id: post_id
            })

            this.callGetComment(post_id)

        } catch (err) {
            // handle errors
        }
    }


    callGetComment = async (post_id) => {
        const data = {
            "post_id": post_id
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }

        axios.post(apiServer.url + '/api/backend/post/get-comment', data, {
            headers
        })
            .then((response) => {
                console.log('data : ', response.data)
                if (response.data.status == "success") {
                    this.setState({
                        list_comment: response.data.comments
                    })
                } else {

                }
            })
            .catch((error) => {
                console.log('data : ', error)
            })
            .finally(function () {
            });

    };


    callPostComment = async () => {
        const data = {
            "post_id": this.state.post_id,
            "reply_to": this.state.reply_to,
            "message": this.state.comment
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }

        axios.post(apiServer.url + '/api/backend/post/comment', data, {
            headers
        })
            .then((response) => {
                if (response.data.status == "success") {
                    this.callGetComment(this.state.post_id)
                } else {

                }
            })
            .catch((error) => {
                console.log('data : ', error)
            })
            .finally(function () {
            });

    };


    onPressButtonChildren(data) {
        this.setState({
            reply_to: data
        })
        console.log(data)
    }


    render() {
        const { data, default_avatar } = this.state
        const { navigation } = this.props;

        onChangeTextComment = async (value) => {
            this.setState({
                comment: value
            })
        }

        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: '#F9FCFF', ...style.marginHeaderStatusBar }}>

                    <View style={{
                        ...styleScoped.shadowCard, backgroundColor: 'white', paddingBottom: hp('2%'),
                        marginBottom: hp('2%'),
                    }}>
                        <View style={{ ...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Blog Detail</Text>
                            <View></View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
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
                                    <Image source={navigation.getParam('user_image') ? { uri: navigation.getParam('user_image') } : default_avatar} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 50 }} />
                                </View>
                                <View >
                                    <Text style={{ fontSize: hp('2%') }}>{navigation.getParam('user_name', '')}</Text>
                                    {/* <Text style={{ fontSize: hp('2%') }}>By ETDA official</Text> */}
                                    <Text style={{ fontSize: hp('2%'), color: fonts.color.secondary }}>{navigation.getParam('user_date', '')}</Text>
                                </View>
                            </View>
                        </View>


                        <View style={style.container}>
                            <View style={{ marginTop: hp('2%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                                {/* <Button
                                    title="E-commerce"
                                    titleStyle={{ fontSize: hp('1.5%') }}
                                    buttonStyle={{ ...style.btnTagPrimary }}
                                /> */}
                                {
                                    navigation.getParam('user_tags', '').map((item, index) => {
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


                            <View style={{ height: hp('24%'), width: '100%', marginTop: hp('1%') }}>
                                <Image source={{ uri: navigation.getParam('user_images', '') }} style={{ width: '100%', height: '100%', resizeMode: 'stretch' }} />
                            </View>
                            <View style={{ marginTop: hp('1%') }}>
                                <Text style={{ fontSize: hp('1.8%') }}>
                                    {navigation.getParam('user_description', '')}
                                </Text>
                            </View>

                            <View style={{
                                marginTop: hp('2%'),
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#4267B2' }} />
                                <Text style={{ marginRight: hp('3%'), color: '#B5B5B5', marginTop: hp('0.4%') }}> {navigation.getParam('user_like', '')}</Text>
                                <Icon name="eye" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />
                                <Text style={{ color: '#B5B5B5', marginTop: hp('0.4%') }}>{navigation.getParam('user_comment', '')}</Text>
                            </View>
                        </View>

                        <View style={{
                            marginTop: hp('2%'),
                            paddingTop: hp('1.5%'),
                            borderTopWidth: 1,
                            borderTopColor: '#B5B5B5',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            paddingHorizontal: hp('2%'),
                        }}>
                            <Icon name="comment-outline" size={hp('2.5%')} style={{ marginRight: hp('2%'), color: '#B5B5B5' }} />
                            <Text style={{ fontSize: hp('2%'), fontWeight: '300', color: '#707070' }}>{this.state.list_comment.length} comments</Text>
                        </View>
                    </View>


                    {/* comment */}
                    <ScrollView style={{ marginBottom: 24 }}>
                        {this.state.list_comment.map((item, index) => {
                            return (
                                <Comment data={item} fnPressButton={this.onPressButtonChildren.bind(this)}></Comment>
                            )
                        }
                        )}
                    </ScrollView>
                    {/* <View style={{ ...style.container }}>
                       
                    </View> */}
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
                                onChangeText={(value) => {
                                    onChangeTextComment(value)
                                }}>
                            </TextInput>
                        </View>
                        <Button
                            title="send"
                            buttonStyle={{...style.btnPrimary }}
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
        marginRight:hp('1%')
    },
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
    sectionSocial: {
        marginTop: hp('2%'),
        paddingTop: hp('2.5%'),
        borderTopWidth: 0.5,
        borderTopColor: '#B5B5B5',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: hp('2%'),
        paddingBottom: hp('1%')
    }
});


