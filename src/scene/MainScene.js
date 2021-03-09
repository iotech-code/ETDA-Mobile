
import React, { Component, Fragment } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    Clipboard,
    SafeAreaView,
    FlatList,
    RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import translate from '../constant/lang'
import { colors, fonts, apiServer } from '../constant/util';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMaterail from 'react-native-vector-icons/MaterialCommunityIcons';
import Main from './Main'
import MessageBoard from './Message/MessageBoard'
import Activity from './Activity/Activity'
import ManageBlog from './ManageBlog'
import Event from './Activity/Event'
import Poll from './Activity/Poll'
import Survey from './Activity/Survey'
export default class MainScene extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lng: {},
            menu: 'main',
            user_role: '',
            sub_menu:null
        }
    }
    async UNSAFE_componentWillMount() {
        const user = await AsyncStorage.getItem('user_data');
        const user_data = JSON.parse(user);
        await this.setState({ user_role: user_data.user_role })
        await this.getLang();
        if (this.props.menu) {
            await this.setState({ menu: this.props.menu })
        }
        if(this.props.sub_menu){
            await this.setState({sub_menu:this.props.sub_menu})
        }
    }

    async getLang() {
        this.setState({ isFetching: true })
        let vocap = await translate()
        this.setState({ lng: vocap })
        this.setState({ isFetching: false })
    }

    async onChangeMenu(value) {
        await this.setState({ menu: value })
        if(value == 'activity'){
            await this.setState({ sub_menu: null })
        }
    }
    async UNSAFE_componentWillReceiveProps(props){
        await this.setState({sub_menu:null})
        if (props.menu) {
            await this.setState({ menu: this.props.menu })
        }
        if(props.sub_menu !=  undefined){
            await this.setState({sub_menu:this.props.sub_menu})
        }
       
    }
    renderSubMenu(sub_menu){
        if(sub_menu == 'event'){
            return (  <Event />)
        }else if(sub_menu == 'poll'){
            return (  <Poll />)
        }else if(sub_menu == 'survey'){
            return (  <Survey />)
        }else{
           return (  <Activity />)
        }
    }



    render() {
        const { lng, menu, user_role ,sub_menu } = this.state
        return (
            <View style={{ flex: 1 }}>

                <ScrollView style={{ flex: 1 }}>
                    {
                        menu === 'main' ? <Main></Main> : null
                    }
                    {
                        menu === 'message' ? <MessageBoard /> : null
                    }
                    {
                        menu === 'activity' ? this.renderSubMenu(sub_menu)  : null
                    }
                    {
                        menu === 'manage' ? <ManageBlog /> : null
                    }
                </ScrollView>
                <View style={styleScoped.container}>
                    <TouchableOpacity style={{ width: '25%' }} onPress={() => {
                        this.onChangeMenu('main')
                    }}>
                        <Icon name="home" size={hp('2.6%')} color={menu === 'main' ? colors.primary : color = "#B5B5B5"} style={{ alignSelf: 'center' }} />
                        <Text style={{ textAlign: 'center', fontSize: hp('1.2%'), color: menu == 'main' ? fonts.color.primary : color = "#B5B5B5" }}>{lng.home}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '25%' }} onPress={() => {
                        this.onChangeMenu('message')
                    }}>
                        <Icon name="globe" size={hp('2.6%')} color={menu == 'message' ? colors.primary : color = "#B5B5B5"} style={{ alignSelf: 'center' }} />
                        <Text style={{ textAlign: 'center', fontSize: hp('1.2%'), color: menu == 'message' ? fonts.color.primary : color = "#B5B5B5" }}>{lng.message_board}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '25%' }} onPress={() => {
                        this.onChangeMenu('activity')
                    }}>
                        <Icon name="calendar" size={hp('2.6%')} color={menu == 'activity' ? colors.primary : color = "#B5B5B5"} style={{ alignSelf: 'center' }} />
                        <Text style={{ textAlign: 'center', fontSize: hp('1.2%'), color: menu == 'activity' ? fonts.color.primary : color = "#B5B5B5" }}>{lng.activity}</Text>
                    </TouchableOpacity>
                    {
                        user_role == 'Member' ?
                            null
                            : <TouchableOpacity style={{ width: '25%' }} onPress={() => this.onChangeMenu('manage')}>
                                <IconMaterail name="view-carousel" size={hp('2.6%')} color={menu == 'manage' ? colors.primary : color = "#B5B5B5"} style={{ alignSelf: 'center' }} />
                                <Text style={{ textAlign: 'center', fontSize: hp('1.2%'), color: menu == 'manage' ? fonts.color.primary : color = "#B5B5B5" }}>{lng.manage_blogs}</Text>
                            </TouchableOpacity>
                    }

                </View>
            </View>
        )
    }

}



const styleScoped = StyleSheet.create({
    container: {
        paddingBottom: Platform.OS === 'ios' ? hp('4%') : hp('1%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: hp('2%'),
        paddingVertical: hp('1.5%'),
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        zIndex: 999,
        position: 'relative'
    },

});


