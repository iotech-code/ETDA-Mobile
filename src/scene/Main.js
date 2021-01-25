
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
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import HeaderNavbar from '../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MenuFooter from '../components/MenuFooter'
import Post from '../components/Post'

export default class Main extends Component {
    state = {
        visibleSearch: false
    }

    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log('token : ', token)
        } catch (err) {
            // handle errors
        }
    }




    render() {

        const { dataList } = this.state
        return (
            <View style={{ flex: 1, ...style.marginHeaderStatusBar }}>
                <StatusBar barStyle="dark-content" />
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: '#F9FCFF', paddingBottom: hp('1%') }}>
                        <HeaderNavbar></HeaderNavbar>
                        <View style={{ backgroundColor: '#F9FCFF', paddingBottom: hp('8%') }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: hp('2%'),
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: hp('2.2%'), color: '#003764' }}> ETDA Blogs </Text>
                                <Icon name="compare-vertical" size={hp('3%')} color="#707070" />
                            </View>

                            {/* section admin */}
                            <View style={{ ...style.container, marginBottom: hp('1%') }}>
                                <Button
                                    title="Write New Blog"
                                    Outline={true}
                                    titleStyle={{ color: '#003764', }}
                                    buttonStyle={{
                                        padding: hp('1%'),
                                        ...style.btnPrimaryOutline,
                                        ...style.btnRounded
                                    }}
                                    onPress={() => Actions.CreatePost()}
                                />
                            </View>
                            {/* end section admin */}

                            <View style={{ paddingHorizontal: hp('2%'), marginBottom: hp('1%'), flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <Button
                                    title="E-commerce"
                                    titleStyle={{ fontSize: hp('1.5%') }}
                                    buttonStyle={{ ...style.btnTagPrimary }}
                                />
                            </View>
                            <Post></Post>
                            <Post></Post>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: null }}>
                    <MenuFooter></MenuFooter>
                </View>
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    imageLogo: {
        height: hp('15%'),
        width: hp('23%')
    },
    textWelcome: {
        textAlign: 'center',
        fontSize: hp('2%'),
        color: '#003764'
    },
    inputCustom: {
        height: hp('5%'),
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: hp('1%')
    },
    shadowCard: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
});


