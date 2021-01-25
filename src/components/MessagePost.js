
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
            }
        }
    }




    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token')
            console.log('token : ', token)
            this.setState({
                token: token
            })
        } catch (err) {
            // handle errors
        }
    }

    openOption() {
        this.setState({ visibleBottomSheet: true })
        this.RBSheet.open()
    }

    // componentDidMount() {
    //     // this.RBSheet.open()

    // }

    callDeletePost = async () => {
        this.setState({ visibleBottomSheet: false }),
            this.RBSheet.close()
        console.log('data come in : ', this.state.token)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }

        axios.delete('https://etda.amn-corporation.com/api/backend/post/delete/1', {
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
                }}>
                    <Icon name="heart" size={hp('3%')} color="#FF0066" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Follow Blog</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>
                <TouchableOpacity style={{
                    ...styleScoped.listMore
                }}
                    onPress={() => {
                        Actions.CreatePost({ 'type': this.props.type }),
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
                    onPress={() => this.callDeletePost()}
                >
                    <Icon name="delete" size={hp('3%')} color="#003764" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Delete blog</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>

            </RBSheet>
        )
    }
    render() {
        const { data, socail } = this.state
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
                                <Image source={data.image} style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 50 }} />
                            </View>
                            <View >
                                <Text style={{ fontSize: hp('2%'), }}>{data.title}</Text>
                                <Text style={{ fontSize: hp('1.5%'), fontWeight: '300', color: '#B5B5B5' }} >{data.time}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.openOption()} >
                            <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: hp('1%') }}>
                        <Text style={{ fontSize: hp('2%') }}>First time of Digital Law</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: hp('1%') }}>
                            {
                                data.tag.map((item, index) => {
                                    return (
                                        <Button
                                            title={item}
                                            titleStyle={{ fontSize: hp('1.5%') }}
                                            buttonStyle={{ ...style.btnTagPrimary }}
                                            key={index}
                                        />
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={{ height: hp('23%'), marginTop: hp('1%') }}>
                        <Image
                            source={data.image}
                            style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
                        />
                    </View>
                    <View style={{ marginTop: hp('1%') }}>
                        <Text style={{ fontSize: hp('2%'), fontWeight: '300' }}>{data.detail}</Text>
                    </View>

                    <View style={{
                        marginTop: hp('2%'),
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "flex-start" }}>
                            <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#4267B2' }} />
                            <Text style={{ marginRight: hp('3%'), color: '#B5B5B5' }}>{socail.like}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "flex-start" }}>
                            <Icon name="eye" size={hp('2.5%')} style={{ marginRight: hp('1%'), color: '#B5B5B5' }} />
                            <Text style={{ color: '#B5B5B5' }}>{socail.view}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ ...style.sectionSocial }}>
                    <TouchableOpacity>
                        <Icon name="thumb-up" size={hp('2.5%')} style={{ marginRight: hp('2%'), color: '#4267B2' }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
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


