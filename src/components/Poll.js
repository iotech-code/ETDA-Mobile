
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ListItem } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import axios from 'axios';
import { apiServer } from '../constant/util';
export default class MessagsPost extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visibleBottomSheet: false,
            postId: '',
            type: '',
            question: [],
            answer: [],
            choice: [],
            token: '',
            default_avatar: require('../assets/images/default_avatar.jpg'),
        }
    }

    openOption() {
        this.setState({ visibleBottomSheet: true })
        this.RBSheet.open()
    }

    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token')
            console.log('token 1 : ', token)
            this.setState({
                token: token
            })
        } catch (err) {
            // handle errors
        }
    }

    renderBottomSheet() {
        const { visibleBottomSheet } = this.state
        return (
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                height={Platform.OS === 'ios' ? hp('18%') : hp('16%')}
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
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Join Poll</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>
                <TouchableOpacity style={{
                    ...styleScoped.listMore
                }}>
                    <Icon name="pencil" size={hp('3%')} color="#29B100" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Unjoin Poll</Text>
                </TouchableOpacity>
                <View style={{ ...style.divider }}></View>

            </RBSheet>
        )
    }


    render() {
        const { default_avatar } = this.state
        const { title, author, post_date } = this.props.data
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
                                    source={!author.photo ? default_avatar : { uri: author.photo }}
                                    style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 50 }} />
                            </View>
                            <View >
                                <Text style={{ fontSize: hp('2%'), }}>{author.full_name}</Text>
                                <Text style={{ fontSize: hp('1.5%'), fontWeight: '300', color: '#B5B5B5' }} > {post_date}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.openOption()} >
                            <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: hp('2%') }}>
                        <Text style={{ fontSize: hp('2%') }}>{title}</Text>
                        <TouchableOpacity onPress={() => Actions.PollDetail()}>
                            <Text style={{ fontSize: hp('2%'), color: '#707070', marginVertical: hp('1%') }}>Detail</Text>
                        </TouchableOpacity>
                    </View>
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


