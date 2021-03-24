
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Platform,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, BottomSheet } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import HeaderNavbar from '../components/Navbar'
import MenuFooter from '../components/MenuFooter'
import BlogManager from '../components/ManageBlog'
import { fonts } from '../constant/util';
import { getListApprove, approvePost } from '../Service/PostService'
import translate from '../constant/lang'
export default class ManageBlog extends Component {
    state = {
        visibleSearch: false,
        user_type: '',
        token: '',
        user_role: '',
        list_data: [],
        lng: {},
        showMangeBlogControl: false,
        loadingList: false,
        count_selected: 0,
        selectAll: false
    }

    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token');
            const user_type = await AsyncStorage.getItem('user_type');
            const user_role = await AsyncStorage.getItem('user_role');
            this.setState({
                user_type: user_type,
                token: token,
                user_role: user_role
            })
            this.callApproveList(token)
        } catch (err) {

        }
    }


    async UNSAFE_componentWillMount () {
        await this.getLang();
    }

    async getLang() {
        this.setState({ isFetching: true })
        let vocap = await translate()
        this.setState({ lng: vocap })
        this.setState({ isFetching: false })
    }

    async callPostApprove() {

        try {
            const { list_data } = this.state
            let post_id = []
            for (let index = 0; index < list_data.length; index++) {
                const element = list_data[index];
                if (element.selected) {
                    post_id.push(element.post_id)
                }
            }
            let respons = await approvePost({ post_id })
            let { status } = respons.data
            if (status == 'success') {
                await this.setState({ list_data: [] })
                await this.setState({ count_selected: 0 })
                this.callApproveList()
                alert("Post was approved!")
            }
        } catch (error) {
            console.log('Approve post  error : ', error)
        }
    };

    async callPostReject() {
        try {
            const { list_data } = this.state
            let post_id = []
            for (let index = 0; index < list_data.length; index++) {
                const element = list_data[index];
                if (element.selected) {
                    post_id.push(element.post_id)
                }
            }
            let respons = await rejectPost({ post_id })
            let { status } = respons.data
            
            if (status == 'success') {
                await this.setState({ list_data: [] })
                await this.setState({ count_selected: 0 })
                this.callApproveList()
                alert("Post was rejected!")
            }
        } catch (error) {
            
            alert("Post rejection error!")
            console.log('Reject post is error : ', error)
        }
    }

    async callApproveList() {
        this.setState({ loadingList: true })
        try {
            let respons = await getListApprove();
            let { post_data } = respons.data
            for (let index = 0; index < post_data.length; index++) {
                const element = post_data[index];
                element.selected = false
            }
            await this.setState({ list_data: post_data })
        } catch (error) {
            console.log('Get list approve error : ', error)
        }
        this.setState({ loadingList: false })
    };

    async selectAll() {
        await this.setState({ selectAll: this.state.selectAll || this.state.count_selected > 0 ? false : true })
        let { list_data, selectAll } = this.state
        for (let index = 0; index < list_data.length; index++) {
            const element = list_data[index];
            element.selected = selectAll
        }
        await this.setState({ list_data })
        await this.setState({ count_selected: selectAll ?  list_data.length : 0 })
    }

    async updatePostSelected(id) {
        let { list_data, count_selected } = this.state
        for (let index = 0; index < list_data.length; index++) {
            const element = list_data[index];
            if (element.post_id == id) {
                element.selected = element.selected ? false : true
                count_selected = element.selected ? count_selected + 1 : count_selected - 1
            }
        }
        
        await this.setState({ list_data })
        await this.setState({ count_selected })
    }

    async cancleSelected() {
        let { list_data } = this.state
        for (let index = 0; index < list_data.length; index++) {
            const element = list_data[index];
            element.selected = false
        }
        await this.setState({ list_data })
        await this.setState({ count_selected: 0 })
    }

    render() {
        const { list_data, count_selected, loadingList, selectAll, lng } = this.state
        return (
            <View style={{ flex: 1, ...style.marginHeaderStatusBar }}>
                <StatusBar barStyle="dark-content" />
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: '#F9FCFF', paddingBottom: hp('1%') }}>
                        {this.state.user_role == "Member" ?
                            <HeaderNavbar value={'member'}></HeaderNavbar>
                            :
                            <HeaderNavbar value={'admin'}></HeaderNavbar>
                        }
                        <View style={{ backgroundColor: '#F9FCFF', }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: hp('2%'),
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>{lng.manage_blogs}</Text>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: hp('2%'),
                                alignItems: 'center',
                                marginBottom: hp('2%')
                            }}>
                                <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}>{lng.wait_for_publish} ({this.state.list_data.length})</Text>
                                <Button
                                    title={selectAll || count_selected == 0 ? lng.select_all : lng.select_all}
                                    titleStyle={{ fontSize: hp('1.5%'), fontWeight: '300', padding: hp('1%') }}
                                    buttonStyle={{ ...style.btnTagPrimary, padding: hp('1%') }}
                                    onPress={() => this.selectAll()}
                                />
                            </View>
                            {
                                loadingList ?
                                    <ActivityIndicator color="#003764" style={{ marginTop: hp('27%') }} />
                                    : null
                            }
                            <ScrollView >
                                {
                                    list_data.map((item, index) => {
                                        return (
                                            <BlogManager
                                                key={`blogManager_${index}`}
                                                data={item}
                                                onPressSelectBox={(i) => this.updatePostSelected(i)}></BlogManager>
                                        )
                                    })
                                }
                            </ScrollView>


                        </View>
                    </View>
                </ScrollView>

                {count_selected > 0 && this.renderManageBlgControl()}



                {/* {this.state.user_role == "Member" ?
                    <MenuFooterUser value={'home'}></MenuFooterUser>
                    :
                    <MenuFooter value={'manage'}></MenuFooter>
                } */}
            </View>
        );
    }

    renderManageBlgControl() {
        const { count_selected, lng } = this.state
        return (
            <View style={{ ...styleScoped.containerSelectOption }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => this.cancleSelected()}>
                        <Text style={{ fontSize: hp('2%'), color: fonts.color.primary, }}>{lng.cancle}</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('2%'), color: fonts.color.primary }}>{lng.blog_selected} ({count_selected})</Text>
                    <Text></Text>
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <Button
                        title={lng.publish}
                        buttonStyle={{ padding: hp('1.5%'), ...style.btnPrimary, ...style.btnRounded }}
                        onPress={() => this.callPostApprove()}
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <Button
                        title={lng.reject}
                        Outline={true}
                        titleStyle={{ color: fonts.color.primary }}
                        buttonStyle={{
                            padding: hp('1.5%'),
                            ...style.btnPrimaryOutline,
                            ...style.btnRounded
                        }}
                        onPress={() => this.callPostReject()}
                    />
                </View>
            </View>
        )
    }
};

const styleScoped = StyleSheet.create({
    containerSelectOption: {
        paddingBottom: Platform.OS === 'ios' ? hp('4%') : hp('1%'),
        paddingHorizontal: hp('2%'),
        paddingVertical: hp('1.5%'),
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        top: -4
    }
});


