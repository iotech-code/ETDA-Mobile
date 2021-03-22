import React, { Component, Fragment } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fonts } from '../../constant/util';
import ImagePicker from 'react-native-image-crop-picker';
import ImageGrid from '../../components/ImageGrid'
import { getTagsList, createPost, updatePost } from '../../Service/PostService'
import Spinner from 'react-native-loading-spinner-overlay';
import translate from '../../constant/lang'
export default class CreatePost extends Component {
    constructor() {
        super();
        this.state = {
            visibleSearch: false,
            token: '',
            title: null,
            type: 'blog',
            image: [],
            description: null,
            tag: [],
            editTag: false,
            addition: {
                "event_date": "",
                "event_schedule": [],
                "post_to_etda": true
            },
            postId: '',
            images: [],
            loadingImage: false,
            listTags: [],
            originalTag: [],
            spinner: false,
            lng: {},
            loadingTags: false
        }
    }

    async UNSAFE_componentWillMount() {
        await this.getLang();
        this.setState({})
    }
    
    async getLang() {
        this.setState({ isFetching: true })
        let vocap = await translate()
        this.setState({ lng: vocap })
        this.setState({ isFetching: false })
    }

    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token')
            let { title, description, post_images, post_tag } = this.props
            await this.setState({
                token: token,
                title: title,
                description: description,
                image: post_images,
                tag: post_tag
            })
            this.getListTag();
        } catch (err) {
            // handle errors
        }
    }

    async getListTag() {
        this.setState({ loadingTags: true })
        try {
            let { data } = await getTagsList();
            for (let index = 0; index < data.post_data.length; index++) {
                const element = data.post_data[index];
                let result = await this.state.listTags.find(el => {
                    return el == element.tag
                })
                element.selected = result ? true : false
            }
            await this.setState({ listTags: data.post_data })
            await this.setState({ originalTag: data.post_data })
        } catch (error) {
            console.log('Get list tags error : ', error)
        }
        this.setState({ loadingTags: false })
    }

    selectTag(indexTag) {
        let { originalTag } = this.state
        let listTagSelected = []
        if (indexTag) {
            this.setState({ editTag: true })
        }
        for (let index = 0; index < originalTag.length; index++) {
            const element = originalTag[index];
            if (index == indexTag) {
                element.selected = element.selected ? false : true
            }
            if (element.selected) {
                listTagSelected.push(element.tag)
            }
        }
        this.setState({ originalTag })
        this.setState({ tag: listTagSelected })
    }

    validateFrom() {
        let pass = true
        let { title, description } = this.state
        if (!title) {
            Alert.alert('Please enter your topic')
            pass = false
        }
        else if (!description) {
            Alert.alert('Please enter your description')
            pass = false
        }
        return pass
    }

    async callCreatePost() {
        this.setState({ spinner: true })
        try {
            let { title, type, images, description, tag, addition } = this.state
            if(!tag) 
            {
                tag = [];
            }
            
            if (this.validateFrom()) {
                let res = await createPost(title, type, images, description, tag, addition)
                let { status } = res.data
                if (status == 'success') {
                    Actions.replace('MainScene',{menu:'main'})
                }
            }

        } catch (error) {
            console.log('Create post error: ', error)
            Alert.alert('Someting wrong!')
        }
        this.setState({ spinner: false })
    }

    async callUpdatePost(title, type, images, description, tags, addition, post_id) {
        this.setState({ spinner: true })
        try {
            const data = {
                "post_title": title,
                "post_type": type,
                "post_images": images,
                "post_description": description,
                "post_tag": tags,
                "post_addition_data": addition,
                "post_id": post_id
            }
            console.log('data', data)
            let result = await updatePost(data)
            console.log('result', result)
        } catch (error) {
            console.log('Update post error : ', error)
        }
        this.setState({ spinner: false })
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

    searchTags(text) {
        let { originalTag } = this.state
        let result = originalTag.filter((option) => {
            return option.tag
                .toString()
                .toLowerCase()
                .indexOf(text.toLowerCase()) >= 0
        })
        this.setState({ listTags: result })
    }

    createPost() {

        if (this.props.type_value == 'create') {
            this.callCreatePost()
        } else {
            const { title, image, images, description, tag, addition ,editTag } = this.state
            this.callUpdatePost(
                title,
                'blog',
                images,
                description,
                editTag ?  tag : [],
                addition,
                this.props.post_id,
            )
        }
    }

    render() {
        const { loadingImage, listTags, spinner, loadingTags, lng } = this.state
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                <Spinner visible={spinner} />
                <View style={{ ...style.navbar }}>
                    <TouchableOpacity onPress={() => Actions.replace('MainScene')}>
                        <Icon name="chevron-left" size={hp('3%')} color="white" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>
                        {
                            this.props.type_value == 'detail'
                                ? lng.detail
                                : this.props.type_value == 'create'
                                    ? lng.create_blog
                                    : lng.edit_blog
                        }
                    </Text>
                    {this.props.type_value == 'detail' ? null
                        :
                        <TouchableOpacity onPress={() => this.createPost()}>
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.post}</Text>
                        </TouchableOpacity>
                    }

                </View>
                {/* content */}
                <View>
                    <View style={{ height: hp('7%') }}>
                        <TextInput placeholder={lng.enter_topic} style={{ paddingVertical: hp('2%'), paddingHorizontal: hp('2%'), fontSize: hp('2.2%') }}
                            defaultValue={this.state.title}
                            placeholderTextColor="#ccc"
                            editable={this.props.type_value == 'detail' ? false : true} selectTextOnFocus={this.props.type_value == 'detail' ? false : true}
                            onChangeText={(value) => { this.setState({ title: value }) }}
                        >
                        </TextInput>
                    </View>
                    <View style={{ ...style.divider }}></View>
                    <View style={{ minHeight: hp('10%') }}>
                        <TextInput
                            placeholder={lng.enter_post_detail==null?"Enter post description":lng.enter_post_detail}
                            style={{
                                paddingVertical: hp('2%'),
                                paddingHorizontal: hp('2%'),
                                fontSize: hp('2.2%')
                            }}
                            placeholderTextColor="#ccc"
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
                        {
                            this.props.type_value == 'detail' ?
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
                                    <Text style={{ fontSize: hp('2.5%'), color: '#003764' }}>{lng.pick_picture}</Text>

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
                        <Text style={{ fontSize: hp('2.5%'), color: '#003764' }}>{lng.tag}</Text>
                    </View>
                    {
                        this.props.type_value == 'detail'
                            ? null
                            : <Fragment>
                                <View style={{ paddingHorizontal: hp('2%'), marginTop: hp('2%') }}>
                                    <TextInput
                                        style={{ ...style.customInput }}
                                        placeholder={lng.search_tags}
                                        placeholderTextColor="#ccc"
                                        onChangeText={(text) => this.searchTags(text)}
                                    />
                                </View>

                                <View style={{ paddingHorizontal: hp('2%') }}>
                                    <View style={{ marginTop: hp('4%'), alignItems: 'center', ...style.boxTextBorder }}>
                                        <Text style={{ ...style.textOnBorder, fontSize: hp('2%'), color: '#B5B5B5' }}>{lng.or}</Text>
                                    </View>
                                </View>
                            </Fragment>
                    }


                    {
                        loadingTags ?
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('2%') }}>
                                <ActivityIndicator color="#003764" />
                            </View>
                            : null
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
                                        title={el.tag}
                                        titleStyle={{
                                            fontSize: hp('2%'),
                                            color: !el.selected ? fonts.color.primary : 'white'
                                        }}
                                        buttonStyle={{ ...tagStyle, margin: hp('0.5%') }}
                                        onPress={() => { this.selectTag(index) }}
                                        key={`tags_${index}`}
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


