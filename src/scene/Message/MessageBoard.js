
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Clipboard,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    KeyboardAvoidingView,
    TextInput,
    Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Overlay } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import HeaderNavbar from '../../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../../components/MenuFooter'
import MenuFooterUser from '../../components/MenuFooterUser'
import Post from '../../components/Post'
import { communityFeed, myFeed } from '../../Service/PostService'
import { colors, fonts } from '../../constant/util'
import FlashMessage, { showMessage } from "react-native-flash-message";
import translate from '../../constant/lang'

export default class MessageBoard extends Component {
    constructor() {
        super();
        this.state = {
            visibleSearch: false,
            type: 'create',
            user_type: '',
            board: 'community',
            token: '',
            list_data: [],
            lng: {},
            user_role: '',
            communityFeedCurrentPage: 0,
            myFeedCurrentPage: 0,
            visibleModalReport: false,
            loading: false,
            feedCurrentPage: 0,
            isFinish: false,
            isFetching: false
        }
    }

    async componentDidMount() {

    }

    async getLang() {
        this.setState({ isFetching: true })
        let vocap = await translate()
        this.setState({ lng: vocap })
        this.setState({ isFetching: false })
    }

    async UNSAFE_componentWillMount() {
        try {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user_data');
            const { user_type, user_role } = JSON.parse(user);
            await this.getLang();
            this.setState({
                user_type: user_type,
                token: token,
                user_role: user_role
            })

            this.callCommunityFeed(token);

        } catch (err) {
            console.log('err : ', err)
        }
    }


    async componentWillUnmount () {
        await this.setState({list_data: false})
    }

    setBoard = (value) => {
        this.setState({
            board: value,
            isFinish: false
        })
    }

    callMYFeed = async () => {
        await this.setState({ list_data: false });
        let { data } = await myFeed(0, 0);
        await this.setState({ list_data: data.post_data });
    }

    callCommunityFeed = async () => {
        await this.setState({ list_data: false });
        let { data } = await communityFeed(0, 0);
        await this.setState({ list_data: data.post_data });
    };

    async updateCommunityFeed() {
  
        try {
            let {communityFeedCurrentPage, isFinish} = this.state
            await this.setState({loading: true})
            if(isFinish === false) {
                let { data } = await communityFeed(communityFeedCurrentPage, communityFeedCurrentPage + 1);
                if(communityFeedCurrentPage < Math.ceil(data.post_count/10)) {
                    let new_data = [...this.state.list_data, ...data.post_data]
                    await this.setState({
                        list_data: new_data,
                        communityFeedCurrentPage: communityFeedCurrentPage + 1
                    })
                } else {
                    this.setState({isFinish: true})
                }
            }
                
            await this.setState({loading: true})
        } catch (error) {
            console.log("Main scene error : ", error)
        }
    }

    async updateMyFeed() {
       
        try {
            let {myFeedCurrentPage, isFinish} = this.state
            await this.setState({loading: true})
            if(isFinish === false) {
                let { data } = await communityFeed(myFeedCurrentPage, myFeedCurrentPage + 1);
                if(myFeedCurrentPage < Math.ceil(data.post_count/10)) {
                    let new_data = [...this.state.list_data, ...data.post_data]
                    await this.setState({
                        list_data: new_data,
                        myFeedCurrentPage: myFeedCurrentPage + 1
                    })
                } else {
                    this.setState({isFinish: true})
                }
            }
                
            await this.setState({loading: true})
        } catch (error) {
            console.log("Main scene error : ", error)
        }
    }

    sortFeed(feed) {
        this.setState({ list_data: feed.reverse() });
    }

    shareCallback(url) {
        showMessage({
            message: "Share url copied!",
            description: url,
            type: "info",
        });
        Clipboard.setString(url)
    }

    openReport(data) {
        console.log('open report : ', data)
        this.setState({ visibleModalReport: true })
    }

    renderTypeInFlatlist ({item}) {
        if(this.state.board === 'community') {
            return(
                <Post 
                    data={item} 
                    page="message_board"
                    sharePressButton={(url) => this.shareCallback(url)}
                    onPostUpdate={() => this.callCommunityFeed()}
                    onDeletePost={() => this.callCommunityFeed()}
                    onPostReport={(data) => this.openReport(data)}
                    report={true}
                ></Post>
            )
        } else {
            return(
                <Post 
                    data={item} 
                    page="message_board"
                    sharePressButton={(url) => this.shareCallback(url)}
                    onPostUpdate={() => this.callMYFeed()}
                    onDeletePost={() => this.callMYFeed()}
                    onPostReport={(data) => this.openReport(data)}
                    report={true}
                ></Post>
            )
        }
    }

    renderFooter = () => {
         if (!this.state.loading) return null;
         return (
           <ActivityIndicator
             style={{ color: '#000' }}
           />
         );
       };

    renderModalReport() {
        const { visibleModalReport, lng } = this.state
        return (
            <Overlay
                isVisible={visibleModalReport}
                overlayStyle={{
                    width: wp('90%'),
                    paddingVertical: hp('2%'),
                    paddingHorizontal: hp('2%')
                }}
                onBackdropPress={() => this.setState({ visibleModalReport: false })}
            >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={{
                        borderBottomColor: '#707070',
                        borderBottomWidth: 1,
                        paddingBottom: hp('1.5%')
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: fonts.color.primary,
                            fontSize: hp('2%'),
                            fontWeight: '600'
                        }}>{lng.report}</Text>
                    </View>

                    <View style={{ marginVertical: hp('1%') }}>
                        <Text style={{ fontSize: hp('2%') }}>{lng.select_topic_for_report}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                            <Button
                                title={lng.fake_news}
                                titleStyle={{ fontSize: hp('2%') }}
                                buttonStyle={{ ...style.btnPrimary, margin: hp('0.5%') }}
                            />
                            <Button
                                title={lng.cyber_bully}
                                titleStyle={{ fontSize: hp('2%') }}
                                buttonStyle={{ ...style.btnPrimary, margin: hp('0.5%') }}
                            />
                            <Button
                                title={lng.threat}
                                titleStyle={{ fontSize: hp('2%'), color: fonts.color.primary }}
                                buttonStyle={{ ...style.btnPrimaryOutline, margin: hp('0.5%') }}
                            />
                        </View>
                        <Text style={{ fontSize: hp('2%'), marginTop: hp('2%') }}>{lng.report_reason}</Text>
                    </View>

                    <View style={{ ...style.customInput, height: hp('20%'), flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <TextInput
                            style={{ fontSize: hp('2%'), padding: 0 }}
                            placeholder={lng.enter_reason}
                            multiline={true}
                        />
                    </View>


                    <View style={{ marginTop: hp('1%') }}>
                        <Button
                            title={lng.report}
                            buttonStyle={{
                                padding: hp('1.5%'),
                                ...style.btnRounded,
                                ...style.btnPrimary
                            }}
                            onPress={() => this.setState({ visibleModalReport: false })}
                        />
                    </View>
                </KeyboardAvoidingView>
            </Overlay>
        )
    }

    render() {
        const { lng } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                <FlashMessage position="top"
                style={{
                    backgroundColor: '#5b5b5b'
                }} />
                <View style={{ flex: 1 }}>
                    {this.state.user_role == "Member" ?
                        <HeaderNavbar value={'member'}></HeaderNavbar>
                        :
                        <HeaderNavbar value={'admin'}></HeaderNavbar>
                    }
                    <View style={{ backgroundColor: '#F9FCFF', paddingBottom: hp('1%') }}>
                        
                        <>
                                <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: hp('2%'),
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>{lng.message_board}</Text>
                                <TouchableOpacity onPress={() => this.sortFeed(this.state.list_data)}>
                                    <Icon name="compare-vertical" size={hp('3%')} color="#707070" />
                                </TouchableOpacity>
                            </View>
                            {
                                this.state.user_type != 'read' || this.state.user_role == 'Admin' &&
                                <View  style={{ ...style.container }}>
                                    <Button
                                        title={lng.new_post}
                                        Outline={true}
                                        titleStyle={{ color: '#003764', }}
                                        buttonStyle={{
                                            padding: hp('1.5%'),
                                            ...style.btnPrimaryOutline,
                                            ...style.btnRounded
                                        }}
                                        onPress={() => Actions.CreatePost({ 'type_value' : 'create' , 'title': '',
                                        'description': '',
                                        'post_images': []})}
                                    />
                                </View>
                            }
                        </>

                        <View style={{ ...styleScoped.wrapperButtonGroup }}>
                            <TouchableOpacity style={this.state.board == 'community' ? { ...styleScoped.btnGroupActive } : { ...styleScoped.btnGroup }}
                                onPress={() => {
                                    this.setBoard('community')
                                    this.callCommunityFeed(this.state.token)
                                }}
                            >
                                <Text style={this.state.board == 'community' ? { ...styleScoped.textBtnGroupActive } : { ...styleScoped.textBtnGroup }}>{lng.community_board}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={this.state.board == 'my' ? { ...styleScoped.btnGroupActive } : { ...styleScoped.btnGroup }}
                                onPress={() => {
                                    this.setBoard('my')
                                    this.callMYFeed(this.state.token)
                                }}
                            >
                                <Text style={this.state.board == 'my' ? { ...styleScoped.textBtnGroupActive } : { ...styleScoped.textBtnGroup }}>{lng.my_board}</Text>
                            </TouchableOpacity>
                        </View>

                        {
                            this.state.isFetching ?
                            <ActivityIndicator color="#003764" style={{ marginTop: hp('35%') }} />
                            : 
                            <View style={{marginTop: 20}}>
                                <FlatList
                                    data={this.state.list_data}
                                    renderItem={this.renderTypeInFlatlist.bind(this)}
                                    keyExtractor={item => item.id}
                                    onEndReached={() => {
                                        if(this.state.board == 'community')
                                            !this.state.isFinish&&this.updateCommunityFeed.bind(this)
                                        else
                                            !this.state.isFinish&&this.updateMyFeed.bind(this)
                                    }}
                                    ListFooterComponent={this.renderFooter.bind(this)}
                                    onEndThreshold={0.4}
                                    refreshControl={
                                        <RefreshControl
                                        refreshing={this.state.isFetching}
                                        onRefresh={() => {
                                            if(this.state.board == 'community')
                                                !this.state.isFinish&&this.updateCommunityFeed.bind(this)
                                            else
                                                !this.state.isFinish&&this.updateMyFeed.bind(this)
                                        }}
                                        />
                                    }
                                />
                            </View>
                        }       
                    </View>
                </View>
                {this.renderModalReport()}
                {this.state.user_role == "Member" ?
                    <MenuFooterUser value={'message'}></MenuFooterUser>
                    :
                    <MenuFooter value={'message'}></MenuFooter>
                }
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    wrapperButtonGroup: {
        marginTop: hp('1%'),
        flexDirection: 'row'
    },
    btnCreateNewBlog: {
        padding: hp('1.5%'),
        width: '50%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#003764',
        width: '100%'
    },
    textCreateNewBlog: {
        fontSize: hp('2%'),
        fontWeight: "300",
        textAlign: 'center',
        color: '#003764',
    },
    btnGroup: {
        padding: hp('1.5%'),
        width: '50%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    textBtnGroup: {
        fontSize: hp('2%'),
        fontWeight: "300",
        textAlign: 'center',
        color: colors.primary,
    },
    btnGroupActive: {
        padding: hp('1.5%'),
        width: '50%',
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    textBtnGroupActive: {
        fontSize: hp('2%'),
        textAlign: 'center',
        color: 'white',

    }
});


