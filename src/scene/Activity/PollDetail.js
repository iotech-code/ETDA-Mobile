
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

import { Button, BottomSheet, CheckBox } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import HeaderNavbar from '../../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../../components/MenuFooter'
export default class PollDetail extends Component {
    state = {
        visibleSearch: false
    }
    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#F9FCFF"
            }}>
                <ScrollView style={{ flex: 1, ...style.marginHeaderStatusBar }}>
                    <View style={{...style.navbar}}>
                        <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                        <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Poll Detail</Text>
                        <Icon name="magnify" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                    </View>
                    <View style={{
                        backgroundColor: 'white',
                        paddingVertical: hp('1%'),
                        paddingTop: hp('2%'),
                        paddingBottom: hp('2%'),
                        marginBottom: hp('2%'),
                        ...styleScoped.shadowCard,
                    }}>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: hp('2%'),
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View >
                                    <Text style={{ fontSize: hp('2%'), }}>ETDA official</Text>
                                    <Text style={{ fontSize: hp('1.5%'), fontWeight: '300', color: '#B5B5B5' }} > 11/11/2020  3:30 pm </Text>
                                </View>
                            </View>
                            <TouchableOpacity  >
                                <Icon name="dots-horizontal" size={hp('3%')} color="#707070" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...style.divider, marginVertical: hp('2%') }}></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', ...style.container }}>
                            <View style={{
                                // height: hp('10%'),
                                // width: hp('10%'),
                                width: hp('10%'),
                                height: hp('10%') ,
                                backgroundColor: 'white',
                                borderRadius:50,
                                borderTopRightRadius: 50,
                                borderBottomRightRadius: 50,
                                borderColor: '#003764',
                                borderWidth: 1
                                // borderStartColor: 'rgba(0,0,0,0.16)',
                                // borderEndColor: '#003764',
                                // borderTopColor:'rgba(0,0,0,0.16)',
                                // borderBottomColor:'rgba(0,0,0,0.16)',
                                // borderRightColor: "#003764",
                                // // borderLeftColor: 'rgba(0,0,0,0.16)',
                                // borderRadius: 1,
                                // borderWidth: 1

                            }}>

                            </View>
                        </View>
                        {/* section content */}

                        <View style={{ ...style.container, marginTop: hp('8%') }}>
                            <Text style={{ fontSize: hp('2%') }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%') }}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Icon name="checkbox-blank-circle-outline" size={hp('2.5%')} style={{ marginRight: hp('1%') }} />
                                    <Text style={{ fontSize: hp('2%') }}>None</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Icon name="checkbox-blank-circle-outline" size={hp('2.5%')} style={{ marginRight: hp('1%') }} />
                                    <Text style={{ fontSize: hp('2%') }}>SomeTime</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Icon name="checkbox-blank-circle-outline" size={hp('2.5%')} style={{ marginRight: hp('1%') }} />
                                    <Text style={{ fontSize: hp('2%') }}>Always</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ ...style.container, marginTop: hp('3%') }}>
                            <Text style={{ fontSize: hp('2%') }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%') }}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Icon name="checkbox-blank-circle-outline" size={hp('2.5%')} style={{ marginRight: hp('1%') }} />
                                    <Text style={{ fontSize: hp('2%') }}>None</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Icon name="checkbox-blank-circle-outline" size={hp('2.5%')} style={{ marginRight: hp('1%') }} />
                                    <Text style={{ fontSize: hp('2%') }}>SomeTime</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Icon name="checkbox-blank-circle-outline" size={hp('2.5%')} style={{ marginRight: hp('1%') }} />
                                    <Text style={{ fontSize: hp('2%') }}>Always</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ ...style.container, marginTop: hp('3%') }}>
                            <Text style={{ fontSize: hp('2%') }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: hp('1%') }}>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Icon name="checkbox-blank-circle-outline" size={hp('2.5%')} style={{ marginRight: hp('1%') }} />
                                    <Text style={{ fontSize: hp('2%') }}>None</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Icon name="checkbox-blank-circle-outline" size={hp('2.5%')} style={{ marginRight: hp('1%') }} />
                                    <Text style={{ fontSize: hp('2%') }}>SomeTime</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <Icon name="checkbox-blank-circle-outline" size={hp('2.5%')} style={{ marginRight: hp('1%') }} />
                                    <Text style={{ fontSize: hp('2%') }}>Always</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ ...style.container, marginTop: hp('3%') }}>
                            <Button
                                title="Done"
                                buttonStyle={{ padding: hp('1.5%'), ...style.btnRounded, ...style.btnPrimary }}
                            />
                        </View>


                    </View>
                </ScrollView>
                <MenuFooter></MenuFooter>
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


