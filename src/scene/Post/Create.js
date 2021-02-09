
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
    FlatList,
    AsyncStorage
} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

import { Button, BottomSheet, ThemeConsumer } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import HeaderNavbar from '../../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../../components/MenuFooter'
import { fonts } from '../../constant/util';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import { apiServer } from '../../constant/util';
import ImageGrid from '../../components/ImageGrid'
export default class CreatePost extends Component {
    constructor() {
        super();
        this.state = { visibleSearch: false, token: '', title: '', type: 'blog', image: [], description: '', tag: ["tag1", "tag2"], addition: '', postId: '', images: [] }
    }

    async componentDidMount() {
        try {
            console.log('data : ', this.props.title)
            const token = await AsyncStorage.getItem('token')
            this.setState({
                token: token,
                title: this.props.title,
                description: this.props.description,
                image: this.props.post_images
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
            "post_images": this.state.images,
            "post_description": this.state.description,
            "post_tag": this.state.tag,
            "post_addition_data": this.state.addition
        }


        console.log('post : ', this.state.images)

        axios.post(apiServer.url + '/api/backend/post/create', data, {
            headers
        })
            .then((response) => {
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



    callUpdatePost = async (title, type, images, description, tags, addition, post_id) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }

        const data = {
            "post_title": title,
            "post_type": type,
            "post_images": images,
            "post_description": description,
            "post_tag": tags,
            "post_addition_data": addition
        }


        axios.put(apiServer.url + '/api/backend/post/update/' + post_id, data, {
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

    async pickImage() {
        let images = await ImagePicker.openPicker({
            multiple: true,
            includeBase64: true,
            maxFiles: 8
        })
        var image = []
        var image_base64 = []
        for (let index = 0; index < images.length; index++) {
            const element = images[index];
            if (index < 7) {
                image.push(element.path)
                var image_send = 'data:image/jpeg;base64,' + element.data
                image_base64.push(image_send)
            }
        }
        this.setState({
            image: image,
            images: image_base64
        })
    }

    render() {
        const { dataList } = this.state

        onChangeTextTitle = async (value) => {
            this.setState({
                title: value
            })
        }

        onChangeTextDescription = async (value) => {
            this.setState({
                description: value
            })
        }

        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                <View style={{ ...style.navbar }}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon name="chevron-left" size={hp('3%')} color="white" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{this.props.type_value == 'detail' ? 'Detail Blog' : this.props.type_value == 'create' ? 'Create Blog' : 'Edit Blog'}</Text>
                    {this.props.type_value == 'detail' ?
                        <View>
                        </View>

                        :
                        <TouchableOpacity onPress={() => {
                            if (this.props.type_value == 'create') {
                                this.callCreatePost()
                            } else {
                                this.callUpdatePost(this.state.title,
                                    'blog',
                                    this.state.images,
                                    this.state.description,
                                    this.state.tag,
                                    this.state.addition,
                                    this.props.data.post_id,
                                )
                            }
                        }
                        }>
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Post</Text>
                        </TouchableOpacity>
                    }

                </View>
                {/* content */}
                <View>
                    <View style={{ height: hp('7%') }}>
                        <TextInput placeholder="Enter your topic here…" style={{ paddingVertical: hp('2%'), paddingHorizontal: hp('2%'), fontSize: hp('2.2%') }}
                            defaultValue={this.state.title}
                            editable={this.props.type_value == 'detail' ? false : true} selectTextOnFocus={this.props.type_value == 'detail' ? false : true}
                            onChangeText={(value) => {
                                onChangeTextTitle(value)
                            }}
                        >



                        </TextInput>
                    </View>
                    <View style={{ ...style.divider }}></View>
                    <View style={{ height: hp('25%') }}>
                        <TextInput placeholder="Enter your post here…" style={{ paddingVertical: hp('2%'), paddingHorizontal: hp('2%'), fontSize: hp('2.2%') }} multiline={true}
                            defaultValue={this.state.description}
                            editable={this.props.type_value == 'detail' ? false : true} selectTextOnFocus={this.props.type_value == 'detail' ? false : true}
                            onChangeText={(value) => {
                                onChangeTextDescription(value)
                            }}
                        ></TextInput>
                    </View>

                    {this.state.image.length == 0 ? null :

                        <View style={{ maxHeight: hp('30%'), alignItems: 'center' }}>
                            <ImageGrid data={this.state.image} />
                            {/* <SliderBox
                                images={this.state.image}
                                sliderBoxHeight={hp('30%')}
                            /> */}
                        </View>
                    }



                    <View style={{ ...style.divider }}></View>
                    <TouchableOpacity onPress={() => this.pickImage()}>
                        {this.props.type_value == 'detail' ?
                            <View>

                            </View>

                            :
                            <View style={{
                                marginTop: hp('1%'),
                                marginBottom: hp('1%'),
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: hp('2%')
                            }}>
                                <Icon name="camera" style={{ marginRight: hp('2%') }} color="#003764" size={hp('3%')} />
                                <Text style={{ fontSize: hp('2.5%'), color: '#003764' }}>Pick picture</Text>

                            </View>
                        }


                    </TouchableOpacity>
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
                    {this.props.type_value == 'detail' ? null :
                        <Fragment>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: hp('2%') , alignItems:'center' }}>
                                <View style={{ paddingHorizontal: hp('2%') ,width:'80%' }}>
                                    <TextInput
                                        style={{...style.customInput  }}
                                        placeholder="Add tag by yourself…"
                                    />
                                </View>
                                <Button
                                    title="Add Tag"
                                    titleStyle={{ fontSize: hp('1.5%') }}
                                    buttonStyle={{ ...style.btnPrimary }}
                                    onPress={() => {

                                    }}
                                />
                            </View>

                            <View style={{ paddingHorizontal: hp('2%') }}>
                                <View style={{ marginTop: hp('4%'), alignItems: 'center', ...style.boxTextBorder }}>
                                    <Text style={{ ...style.textOnBorder, fontSize: hp('2%'), color: '#B5B5B5' }}>Or</Text>
                                </View>
                            </View>
                        </Fragment>

                    }



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
                            buttonStyle={{ ...style.btnPrimaryOutline, margin: hp('0.5%'), marginBottom: hp('10%') }}
                        />

                    </View>



                </View>

            </ScrollView>
        );
    }
};

const styleScoped = StyleSheet.create({

});


