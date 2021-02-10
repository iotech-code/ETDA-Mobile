
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
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fonts } from '../../constant/util';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import { apiServer } from '../../constant/util';
import ImageGrid from '../../components/ImageGrid'
import { getTagsList } from '../../Service/PostService'

export default class CreatePost extends Component {
    constructor() {
        super();
        this.state = {
            visibleSearch: false,
            token: '',
            title: '',
            type: 'blog',
            image: [],
            description: '',
            tag: ["tag1", "tag2"],
            addition: '',
            postId: '',
            images: [],
            loadingImage: false,
            listTags: []
        }
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
            this.getListTag();
        } catch (err) {
            // handle errors
        }
    }

    async getListTag() {
        try {
            let { data } = await getTagsList();
            for (let index = 0; index < data.post_data.length; index++) {
                const element = data.post_data[index];
                element.selected = false
            }
            this.setState({ listTags: data.post_data })
        } catch (error) {

        }
    }

    selectTag(indexTag) {
        let { listTags } = this.state
        for (let index = 0; index < listTags.length; index++) {
            const element = listTags[index];
            if (index == indexTag) {
                element.selected = element.selected ? false : true
            }
        }
        this.setState({ listTags })
    }

    async callCreatePost() {
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



    async callUpdatePost(title, type, images, description, tags, addition, post_id) {
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
        this.setState({ loadingImage: true })
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
        await this.setState({
            image: image,
            images: image_base64
        })
        this.setState({ loadingImage: false })

    }


    render() {
        const { dataList, loadingImage, listTags } = this.state


        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                <View style={{ ...style.navbar }}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon name="chevron-left" size={hp('3%')} color="white" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{this.props.type_value == 'detail' ? 'Detail Blog' : this.props.type_value == 'create' ? 'Create Blog' : 'Edit Blog'}</Text>
                    {this.props.type_value == 'detail' ? null
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
                            onChangeText={(value) => { this.setState({ title: value }) }}
                        >
                        </TextInput>
                    </View>
                    <View style={{ ...style.divider }}></View>
                    <View style={{ height: hp('25%') }}>
                        <TextInput
                            placeholder="Enter your post here…"
                            style={{
                                paddingVertical: hp('2%'),
                                paddingHorizontal: hp('2%'),
                                fontSize: hp('2.2%')
                            }}
                            multiline={true}
                            defaultValue={this.state.description}
                            editable={this.props.type_value == 'detail' ? false : true}
                            selectTextOnFocus={this.props.type_value == 'detail' ? false : true}
                            onChangeText={(value) => {
                                this.setState({ description: value })
                            }}
                        ></TextInput>
                    </View>

                    {
                        loadingImage ?
                            <ActivityIndicator color="#003764" style={{ marginVertical: hp('3%') }} />
                            : null
                    }



                    {this.state.image.length == 0 ? null :

                        <View style={{ maxHeight: hp('30%'), alignItems: 'center' }}>
                            <ImageGrid data={this.state.image} />
                        </View>
                    }



                    <View style={{ ...style.divider }}></View>
                    <TouchableOpacity onPress={() => this.pickImage()}>
                        {this.props.type_value == 'detail' ?
                            null
                            :
                            <View style={{
                                marginTop: hp('1%'),
                                marginBottom: hp('1%'),
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: hp('2%')
                            }}>
                                <Icon
                                    name="camera"
                                    style={{ marginRight: hp('2%') }}
                                    color="#003764"
                                    size={hp('3%')} />
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
                            <View style={{ ...style.flex__start, marginTop: hp('2%'), alignItems: 'center' }}>
                                <View style={{ paddingHorizontal: hp('2%'), width: '80%' }}>
                                    <TextInput
                                        style={{ ...style.customInput }}
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
                        {
                            listTags.map((el, index) => {
                                let tagStyle = el.selected ? style.btnPrimary : style.btnPrimaryOutline
                                return (
                                    <Button
                                        title="E-commerce"
                                        titleStyle={{
                                            fontSize: hp('2%'),
                                            color: !el.selected ? fonts.color.primary : 'white'
                                        }}
                                        buttonStyle={{
                                            ...tagStyle,
                                            margin: hp('0.5%')
                                        }}
                                        onPress={() => {
                                            this.selectTag(index)
                                        }}
                                    />
                                )
                            })
                        }

                    </View>



                </View>

            </ScrollView>
        );
    }
};

const styleScoped = StyleSheet.create({

});


