
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
    FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, BottomSheet } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import HeaderNavbar from '../../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../../components/MenuFooter'
import MenuFooterUser from '../../components/MenuFooterUser'
import { colors, apiServer } from '../../constant/util'
import translate from '../../constant/lang'
export default class Activity extends Component {
    state = {
        visibleSearch: false,
        user_type: '' , 
        token : '' , 
        user_role : '',
        lng: {}
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

    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token');
            const user = await AsyncStorage.getItem('user_data');
            const user_data = JSON.parse(user);
            this.setState({
                user_type: user_data.user_type,
                token : token,
                user_role : user_data.user_role
            })
        } catch (err) {
            console.log('err : ', err)
        }
    }
    
    render() {
        const { dataList, lng } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                <StatusBar barStyle="dark-content" />
                <View style={{ flex: 1, paddingBottom: hp('10%') }}>
                {this.state.user_role == "Member" ? 
                    <HeaderNavbar  value={'member'}></HeaderNavbar>
                    :
                    <HeaderNavbar  value={'admin'}></HeaderNavbar>
        }
                    <View style={{ ...style.container, marginTop: hp('4%') }}>
                        <TouchableOpacity style={{ ...styleScoped.warpperMenuEvent }} onPress={() => Actions.replace('Event')}>
                            <Text style={{ ...styleScoped.menuName }}>
                                {lng.event}
                            </Text>
                            <Icon name="account-plus" color="white" style={{ ...styleScoped.menuIcon }} size={hp('6%')} />
                            <Text style={{ ...styleScoped.description }}>
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{ ...styleScoped.warpperMenuEvent, marginTop: hp('2%') }} onPress={()=>Actions.replace('Poll')}>
                            <Text style={{ ...styleScoped.menuName }}>
                                {lng.poll}
                            </Text>
                            <Icon name="checkbox-marked-outline" color="white" style={{ ...styleScoped.menuIcon }} size={hp('6%')} />
                            <Text style={{ ...styleScoped.description }}>
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ ...styleScoped.warpperMenuEvent, marginTop: hp('2%') }} onPress={()=>Actions.replace('Survey')}>
                            <Text style={{ ...styleScoped.menuName }}>
                                {lng.survey}
                            </Text>
                            <Icon name="flag" color="white" style={{ ...styleScoped.menuIcon }} size={hp('6%')} />
                            <Text style={{ ...styleScoped.description }}>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.state.user_role == "Member" ? 
                         <MenuFooterUser value={'activity'}></MenuFooterUser>
                        :
                        <MenuFooter value={'activity'}></MenuFooter>
                    }
               
                {/* <MenuFooter></MenuFooter> */}
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    warpperMenuEvent: {
        padding: hp('2%'),
        borderRadius: 10,
        backgroundColor: colors.primary
    },
    menuIcon: {
        textAlign: 'center',
        marginTop: hp('2%')
    },
    description: {
        fontSize: hp('1.2%'),
        marginTop: hp('2%'),
        color: 'white',
        textAlign: 'center',
        fontWeight: '300'
    },
    menuName: {
        fontSize: hp('2%'),
        color: 'white',
        textAlign: 'center'
    }
});


