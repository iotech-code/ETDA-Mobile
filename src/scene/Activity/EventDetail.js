
import React, { Component, Fragment } from 'react';
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
    KeyboardAvoidingView,
    Platform,
    FlatList
} from 'react-native';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { apiServer } from '../../constant/util';
import Comment from '../../components/Comment'
export default class EventDetail extends Component {
    state = {
        visibleSearch: false,
        data: {},
        list_comment: [],
        comment: null,
        reply_to: null,
        default_avatar: require('../../assets/images/default_avatar.jpg'),
        etda_avatar: require('../../assets/images/etdaprofile.png'),
    }

    componentDidMount() {
        console.log(this.props)
    }


    render() {
        const { author, title, post_description, post_addition_data, comment_number, post_id, is_like, like } = this.props
        const { default_avatar, list_comment, comment } = this.state
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: '#F9FCFF', ...style.marginHeaderStatusBar }}>

                    <View style={{ ...styleScoped.shadowCard, backgroundColor: 'white' }}>
                        <View style={{ ...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{title}</Text>
                            <Icon name="magnify" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                        </View>
                        <View style={{
                            ...style.space__between,
                            alignItems: 'center',
                            paddingHorizontal: hp('2%'),
                            marginTop: hp('2%')
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{
                                    height: hp('5%'),
                                    width: hp('5%'),
                                    marginRight: hp('1%')
                                }}>
                                    <Image source={require('../../assets/images/avatar2.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                                </View>
                                <View >
                                    <Text style={{ fontSize: hp('2%'), color: "#707070" }}>{author.full_name}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => this.openOption()} >
                                <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                            </TouchableOpacity>
                        </View>


                        <View style={{ marginTop: hp('1.5%'), paddingHorizontal: hp('2%') }} >
                            <Text style={{ fontSize: hp('2%') }}>{title}</Text>
                            <Text style={{ fontSize: hp('2%'), color: '#707070', marginTop: hp('1%') }}>{post_addition_data.event_date}</Text>
                            <Text style={{ fontSize: hp('2%'), marginTop: hp('1%') }}>{post_description}</Text>



                            {/* <View style={{ height: hp('20%'), width: '100%', marginVertical: hp('2%') }}>
                                <Image source={require('../../assets/images/event_post.png')} style={{ height: '100%', width: '100%', resizeMode: 'stretch' }} />
                            </View> */}

                            <View style={{ marginTop: hp('3%'), marginBottom: hp('2%'), alignItems: 'flex-start', ...style.boxTextBorder }}>
                                <Text style={{ ...style.textOnBorder, fontSize: hp('2%'), color: '#B5B5B5', paddingLeft: 0, paddingRight: hp('1%') }}>Scheduler</Text>
                            </View>

                            {
                                post_addition_data.event_schedule ?
                                    post_addition_data.event_schedule.map((el, index) => {
                                        return (
                                            <Fragment key={`event_schedule_${index}`}>
                                                <View style={{ ...style.flex__start, marginTop: hp('1%'), alignItems: 'center' }}>
                                                    <Text style={{ fontSize: hp('2%'), color: '#4267B2', marginRight: hp('2%') }}>{el.time}</Text>
                                                    <Text style={{ fontSize: hp('2%') }}>{el.detail}</Text>
                                                </View>
                                            </Fragment>
                                        )
                                    })
                                    : null
                            }


                        </View>

                        <View style={{ ...styleScoped.sectionSocial }}>
                            <TouchableOpacity style={{ ...style.flex__start, alignItems: 'center', marginRight: hp('3%') }}>
                                <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: is_like ? '#4267B2' : '#B5B5B5' }} />
                                <Text style={{ color: is_like ? '#4267B2' : '#B5B5B5' }}>{like}</Text>
                            </TouchableOpacity>
                            <View style={{ ...style.flex__start, alignItems: 'center', marginRight: hp('3%') }}>
                                <Icon name="comment-outline" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />
                                <Text style={{ color: '#B5B5B5' }}>{comment_number}</Text>
                            </View>
                            <Icon name="share-outline" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />
                        </View>
                    </View>

                    {
                        list_comment.map((item, index) => {
                            return (
                                <Comment data={item} key={`comment_${index}`} fnPressButton={() => this.onPressButtonChildren.bind(this)}></Comment>
                            )
                        })
                    }
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
                            title="Send"
                            buttonStyle={{ ...style.btnPrimary }}
                            onPress={() => this.createComment()}
                        />
                    </View>
                </KeyboardAvoidingView>
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


