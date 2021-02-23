
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fonts } from '../constant/util';
import translate from '../constant/lang'
import { getTagsList, searchPost } from '../Service/PostService'
import { Button, ListItem, Avatar } from 'react-native-elements'


let timeoutId = null
export default class Poll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            text: '',
            visibleSearch: false,
            list_search: [],
            originalTag: [],
            lng: {},
            listTags: [],
            tags: [],
            default_avatar: require('../assets/images/default_avatar.jpg'),
            keyword: ''
        }
    }

    async UNSAFE_componentWillMount() {
        await this.getLang();
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
            this.setState({
                token: token
            })
        } catch (err) {
            // handle errors
        }
    }

    async UNSAFE_componentWillMount() {
        this.onGetListTags()
    }

    async onGetListTags() {
        try {
            let { data } = await getTagsList()
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
            console.log('Get list tags in search error : ', error)
        }
    }

    async selectTag(indexTag) {
        let { originalTag } = this.state
        let listTagSelected = []
        for (let index = 0; index < originalTag.length; index++) {
            const element = originalTag[index];
            if (index == indexTag) {
                element.selected = element.selected ? false : true
            }
            if (element.selected) {
                listTagSelected.push(element.tag)
            }
        }
        await this.setState({ originalTag })
        await this.setState({ tags: listTagSelected })
        this.onSearchPost()
    }

    async onSearchPost(text) {
        try {
            clearTimeout(timeoutId);
            let self = this
            if (text) {
                await self.setState({ keyword: text })
            }
            timeoutId = setTimeout(async () => {
                let { tags, keyword } = self.state
                let { data } = await searchPost(keyword, tags)
                self.setState({ list_search: data.post_data })
            }, 500);

        } catch (error) {
            console.log('Get search post error : ', error)
        }
    }

    render() {
        const { lng, listTags, list_search, default_avatar, keyword } = this.state
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ ...style.navbar }}>
                        <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                        <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.search}</Text>
                        <TouchableOpacity onPress={() => Actions.pop()}>
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.done}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...style.container, marginTop: hp('2%') }}>
                        <View style={{ ...styleScoped.customInputSearch }}>
                            <Icon name="magnify" size={hp('2.2%')} style={{ marginRight: hp('1%'), }} color={'rgba(0,0,0,0.16)'} />
                            <TextInput style={{ padding: 0, fontSize: hp('2%'), width: '100%' }} placeholder="Search..."
                                onChangeText={(value) => { this.onSearchPost(value) }}
                            ></TextInput>
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: hp('2%'), ...style.divider }}></View>
                <ScrollView >
                    <View style={{
                        ...style.container,
                        ...style.flex__start,
                        alignItems: 'center',
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
                    <View style={{ marginVertical: hp('2%'), ...style.divider }}></View>
                    <View style={{ ...style.container }}>
                        {
                            list_search.map((l, i) => {
                                let action_to = null
                                if (l.post_type == 'blog') {
                                    action_to = 'PostDetail'
                                } else if (l.post_type == 'poll') {
                                    action_to = 'PollDetail'
                                } else if (l.post_type == 'event') {
                                    action_to = 'EventDetail'
                                } else if (l.post_type == 'survey') {
                                    action_to = 'SurveyDetail'
                                }
                                return (
                                    <ListItem key={i} bottomDivider onPress={() => Actions.push(action_to, { data: l })}>
                                        <Avatar source={!l.author.photo ? default_avatar : { uri: l.author.photo }} rounded />
                                        <ListItem.Content >
                                            <ListItem.Title>{l.title}</ListItem.Title>
                                            <ListItem.Subtitle style={{ color: fonts.color.secondary }}>{l.post_date}</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    customInputSearch: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.16)',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: hp('1%')
    },
    textList: {
        fontSize: hp('2%'),
        color: '#707070',
        fontWeight: '300',
        marginTop: hp('2%')
    }
});


