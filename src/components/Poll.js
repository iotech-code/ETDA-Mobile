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
    Alert,
    Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, ListItem } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import {actionDeletePost} from '../Service/PostService'
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
            userInfo: ''
        }
    }

    openOption() {
        this.setState({ visibleBottomSheet: true })
        this.RBSheet.open()
    }

    async UNSAFE_componentWillMount() {
        this.getUserInfo()
    }

    async getUserInfo() {
        let user = await AsyncStorage.getItem('user_data')
        user = JSON.parse(user)
        this.setState({ userInfo: user })
    }

    async onDeletePost() {
        Alert.alert(
            "Confirm",
            "Are you sure!",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Confirm", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
        this.RBSheet.close()
    }

    async onDeletePost(){
        try {
            const { post_id } = this.props.data
            console.log(post_id)
            // let {status} =  await actionDeletePost()

        } catch (error) {
            
        }
    }

    renderBottomSheet() {
        const { visibleBottomSheet } = this.state
        return (
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                height={Platform.OS === 'ios' ? hp('10%') : hp('8%')}
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
                <TouchableOpacity style={{ ...styleScoped.listMore }} onPress={() => this.onDeletePost()}>
                    <Icon name="delete" size={hp('3%')} color="#003764" style={{ marginRight: hp('2%') }} />
                    <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Delete</Text>
                </TouchableOpacity>
            </RBSheet>
        )
    }

    render() {
        const { default_avatar, userInfo } = this.state
        const { title, author, post_date } = this.props.data
        console.log('author', author, userInfo)
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
                        {
                            userInfo.userid == author.id ?
                                <TouchableOpacity onPress={() => this.openOption()} >
                                    <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                                </TouchableOpacity>
                                : null
                        }

                    </View>
                    <View style={{ marginTop: hp('2%') }}>
                        <Text style={{ fontSize: hp('2%') }}>{title}</Text>
                        <TouchableOpacity onPress={() => Actions.PollDetail({ data: this.props.data })}>
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


