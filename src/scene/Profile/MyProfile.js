
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fonts } from '../../constant/util'

export default class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dafault_avatar: require('../../assets/images/default_avatar.jpg') 
        }

        
    }

    async UNSAFE_componentWillMount() {
        await this.getUserInfo();
        await console.log("before_render", this.state)
    }

    UNSAFE_componentWillReceiveProps(props){
        this.getUserInfo();
    }

    async getUserInfo () {
        let json_data = await AsyncStorage.getItem('user_data');
        let data = await JSON.parse(json_data);
        await this.setState({
            ...this.state,
            ...data
        });
        
    }

    async logout () {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user_data');
        await AsyncStorage.removeItem('social_network');
        Actions.replace('Login');
    }

    render() {
        const user_data = this.state;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ backgroundColor: 'white', paddingBottom: hp('2%'), marginBottom: hp('2%') }}>
                        <View style={{ ...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.replace('Main')} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>My Profile</Text>
                            <TouchableOpacity onPress={() => Actions.push('ProfileSetting')}>
                                <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Setting</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ ...style.container }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={{ width: hp('15%'), height: hp('15%'), borderRadius: 100 }}>
                                {user_data.photo == null || user_data.photo == '' ?
                                <Image source={ user_data.dafault_avatar } style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                    borderRadius: 100
                                }} />
                                :
                                <Image source={{ uri: user_data.photo }} style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                    borderRadius: 100
                                }} />
                            }
                            </View>
                            <View style={{ marginLeft: hp('2%') }}>
                                <Text style={{ fontSize: hp('2%')}}>{ user_data.fullname }</Text>
                            </View>

                        </View>

                        <View style={{ marginTop: hp('4%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="phone" size={hp('3%')} color="#29B100" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Contact me</Text>
                            </View>
                            <Text style={{ fontSize: hp('2%'), color: '#707070', fontWeight: '300' }}>TH 66+ {user_data.mobile_number}</Text>
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="lightbulb-outline" size={hp('3%')} color="#FED449" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Professional</Text>
                            </View>
                            <Text style={{ fontSize: hp('2%'), color: '#707070', fontWeight: '300' }}>{user_data.professional}</Text>
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="domain" size={hp('3%')} color="#EE3397" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Organization</Text>
                            </View>
                            <Text style={{ fontSize: hp('2%'), color: '#707070', fontWeight: '300' }}>{user_data.organization}</Text>
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="bag-checked" size={hp('3%')} color="#427AA1" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Position</Text>
                            </View>
                            <Text style={{ fontSize: hp('2%'), color: '#707070', fontWeight: '300' }}>{user_data.position}</Text>
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="account-group" size={hp('3%')} color="#003764" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Type of user</Text>
                            </View>
                            <Text style={{ fontSize: hp('2%'), color: '#707070', fontWeight: '300' }}> {user_data.user_type} </Text>
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <Button
                                title="Edit Profile"
                                buttonStyle={{ padding: hp('1%'), ...style.btnRounded, ...style.btnPrimary }}
                                onPress={() => Actions.push('EditProfile', {user_data})}
                            />
                        </View>
                        <View style={{ marginTop: hp('2%') }}>
                            <Button
                                title="Logout"
                                titleStyle={{ color: fonts.color.primary }}
                                buttonStyle={{ padding: hp('1%'), ...style.btnRounded, ...style.btnPrimaryOutline }}
                                onPress={ () => this.logout() }
                            />
                        </View>


                    </View>
                </ScrollView>
            </View >
        );
    }
};

const styleScoped = StyleSheet.create({
});


