
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
    FlatList,
    AsyncStorage
} from 'react-native';

import { Button, BottomSheet } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import HeaderNavbar from '../../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../../components/MenuFooter'
import { fonts } from '../../constant/util';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';


export default class CreatePost extends Component {
    constructor() {
        super();
        this.state = { visibleSearch: false, token: '', title: '', type: '', image: [], description: '', tag: [], addition: '', postId: '' }
    }

    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token')
            this.setState({
                token: token
            })
        } catch (err) {
            // handle errors
        }
    }

    callCreatePost = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }

        const data = {
            "post_title": this.state.title,
            "post_type": this.state.type,
            "post_images": this.state.image,
            "post_description": this.state.description,
            "post_tag": this.state.tag,
            "post_addition_data": this.state.addition
        }


        console.log('post : ' , data )

        // axios.post('https://etda.amn-corporation.com/api/backend/post/create', data, {
        //     headers
        // })
        //     .then((response) => {
        //         console.log('data : ', response.data)
        //         if (response.data.status == "success") {
        //             Actions.MessageBoard()
        //         } else {

        //         }
        //     })
        //     .catch((error) => {
        //         console.log('data : ', error)
        //     })
        //     .finally(function () {
        //     });

    };



    callUpdatePost = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }

        const data = {
            "post_title": this.state.title,
            "post_type": this.state.type,
            "post_images": this.state.image,
            "post_description": this.state.description,
            "post_tag": this.state.tag,
            "post_addition_data": this.state.addition
        }

        axios.put('https://etda.amn-corporation.com/api/backend/post/update' + this.props.postId, data, {
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

    render() {
        const { dataList } = this.state
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                <View style={{ ...style.navbar }}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon name="chevron-left" size={hp('3%')} color="white" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Create Blog</Text>
                    <TouchableOpacity onPress={() => this.callCreatePost()}>
                    <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Post</Text>
                    </TouchableOpacity>
                </View>
                {/* content */}
                <View>
                    <View style={{ height: hp('7%') }}>
                        <TextInput placeholder="Enter your topic here…" style={{ paddingVertical: hp('2%'), paddingHorizontal: hp('2%'), fontSize: hp('2.2%') }} ></TextInput>
                    </View>
                    <View style={{ ...style.divider }}></View>
                    <View style={{ height: hp('30%') }}>
                        <TextInput placeholder="Enter your post here…" style={{ paddingVertical: hp('2%'), paddingHorizontal: hp('2%'), fontSize: hp('2.2%') }} ></TextInput>
                    </View>
                    <View style={{ ...style.divider }}></View>

                    <View style={{
                        marginTop: hp('2%'),
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: hp('2%')
                    }}>
                        <Icon name="tag" style={{ marginRight: hp('2%') }} color="#003764" size={hp('2.5%')} />
                        <Text style={{ fontSize: hp('2.5%'), color: '#003764' }}>Tag</Text>
                    </View>

                    <View style={{ marginTop: hp('2%'), paddingHorizontal: hp('2%') }}>
                        <TextInput
                            style={style.customInput}
                            placeholder="Add tag by yourself…"
                        />
                    </View>


                    <View style={{ paddingHorizontal: hp('2%') }}>
                        <View style={{ marginTop: hp('4%'), alignItems: 'center', ...style.boxTextBorder }}>
                            <Text style={{ ...style.textOnBorder, fontSize: hp('2%'), color: '#B5B5B5' }}>Or</Text>
                        </View>
                    </View>


                    <View style={{
                        marginTop: hp('2%'),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingHorizontal: hp('2%'),
                        flexWrap: 'wrap'

                    }}>
                    
                        <Button
                            title="E-commerce"
                            titleStyle={{ fontSize: hp('2%') }}
                            buttonStyle={{ ...style.btnPrimary, margin: hp('0.5%') }}
                            onPress={() => { 
                                ImagePicker.openPicker({
                                    multiple: true
                                  }).then(images => {
                                    console.log(images);
                                  });
                            }} 
                        />
                        <Button
                            title="E-commerce"
                            titleStyle={{ fontSize: hp('2%') }}
                            buttonStyle={{ ...style.btnPrimary, margin: hp('0.5%') }}
                        />
                        <Button
                            title="E-commerce"
                            titleStyle={{ fontSize: hp('2%'), color: fonts.color.primary }}
                            buttonStyle={{ ...style.btnPrimaryOutline, margin: hp('0.5%') }}
                        />

                    </View>



                </View>

            </ScrollView>
        );
    }
};

const styleScoped = StyleSheet.create({

});


