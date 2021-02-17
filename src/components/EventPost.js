
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
    Platform
} from 'react-native';


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import { actionLikePost } from '../Service/PostService'

export default class MessagsPost extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        visibleBottomSheet: false,
        default_avatar: require('../assets/images/default_avatar.jpg'),
        is_like: 0,
        like_count: 0
    }

    openOption() {
        this.setState({ visibleBottomSheet: true })
        this.RBSheet.open()
    }

    componentDidMount() {
        // this.RBSheet.open()
        const { is_like, like } = this.props.data
        this.setState({
            is_like,
            like_count: like
        })

    }

    onEdit() {
        this.RBSheet.close()
        Actions.push('EventEdit')
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

    renderBottomSheet() {
        const { visibleBottomSheet } = this.state

        return (
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
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
                }}>
                    <Icon name="star" size={hp('3%')} color="#FED449" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Join event</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>
                <TouchableOpacity style={{
                    ...styleScoped.listMore
                }}>
                    <Icon name="star-outline" size={hp('3%')} color="#FED449" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Unjoin event</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>
                {/* section admin */}
                <TouchableOpacity style={{ ...styleScoped.listMore }} onPress={() => this.onEdit()}>
                    <Icon name="pencil" size={hp('3%')} color="#29B100" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Edit Event</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>

                <TouchableOpacity style={{ ...styleScoped.listMore }}>
                    <Icon name="delete" size={hp('3%')} color="#003764" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Delete Event</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>
                {/* section admin */}


            </RBSheet>
        )
    }
    render() {
        // console.log(this.props.data)
        const { default_avatar, is_like, like_count } = this.state
        const { author, title, post_description, post_addition_data, comment_number, post_id } = this.props.data
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
                                marginRight: hp('1%')
                            }}>
                                <Image
                                    source={author.photo ? { uri: author.photo } : default_avatar}
                                    style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 50 }} />
                            </View>
                            <View >
                                <Text style={{ fontSize: hp('2%'), }}>{author.full_name}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.openOption()} >
                            <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity style={{ marginTop: hp('1.5%') }} onPress={() => Actions.push('EventDetail',{...this.props.data})}>
                        <Text style={{ fontSize: hp('2%') }}>{title}</Text>
                        <Text style={{ fontSize: hp('2%'), color: '#707070', marginTop: hp('1%') }}>{post_addition_data.event_date}</Text>
                        {
                            post_addition_data.event_schedule ?
                                post_addition_data.event_schedule.map((el, index) => {
                                    return (
                                        <View style={{ ...style.flex__start, alignItems: 'center', marginTop: hp('1%') }} key={`event_schedule__${index}`}>
                                            <Text style={{ fontSize: hp('2%'), color: '#4267B2', marginRight: hp('2%') }}>{el.time}</Text>
                                            <Text style={{ fontSize: hp('2%') }}>{el.detail}</Text>
                                        </View>
                                    )
                                })
                                : null
                        }

                    </TouchableOpacity>
                </View>

                <View style={{ ...style.sectionSocial }}>
                    <TouchableOpacity
                        style={{ ...style.flex__start, alignItems: 'center', marginRight: hp('3%') }}
                        onPress={() => this.callPostLike(post_id)}>
                        <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: is_like ? '#4267B2' : '#B5B5B5' }} />
                        <Text style={{ color: '#B5B5B5' }}>{like_count}</Text>
                    </TouchableOpacity>
                    <View style={{ ...style.flex__start, alignItems: 'center', marginRight: hp('3%') }}>
                        <Icon name="comment-outline" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />
                        <Text style={{ color: '#B5B5B5' }}>{comment_number}</Text>
                    </View>
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


