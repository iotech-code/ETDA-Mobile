
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
import MenuFooterUser from '../../components/MenuFooterUser'
import { colors, apiServer } from '../../constant/util'

export default class Activity extends Component {
    state = {
        visibleSearch: false,
        user_type: '' , token : '' , user_role : ''
    }

    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token');
            const user_type = await AsyncStorage.getItem('user_type');
            const user_role = await AsyncStorage.getItem('user_role');
            this.setState({
                user_type: user_type,
                token : token,
                user_role : user_role
            })
            this.callCommunityFeed(token)
        } catch (err) {
            console.log('err : ', err)
        }
    }
    render() {
        const { dataList } = this.state
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
                                Event
                            </Text>
                            <Icon name="account-plus" color="white" style={{ ...styleScoped.menuIcon }} size={hp('6%')} />
                            <Text style={{ ...styleScoped.description }}>
                                Lorem ipsum dolor sit amet, consetetur
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{ ...styleScoped.warpperMenuEvent, marginTop: hp('2%') }} onPress={()=>Actions.replace('Poll')}>
                            <Text style={{ ...styleScoped.menuName }}>
                                Poll
                            </Text>
                            <Icon name="checkbox-marked-outline" color="white" style={{ ...styleScoped.menuIcon }} size={hp('6%')} />
                            <Text style={{ ...styleScoped.description }}>
                                Lorem ipsum dolor sit amet, consetetur
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ ...styleScoped.warpperMenuEvent, marginTop: hp('2%') }} onPress={()=>Actions.replace('Survey')}>
                            <Text style={{ ...styleScoped.menuName }}>
                                Survey
                            </Text>
                            <Icon name="flag" color="white" style={{ ...styleScoped.menuIcon }} size={hp('6%')} />
                            <Text style={{ ...styleScoped.description }}>
                                Lorem ipsum dolor sit amet, consetetur
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


