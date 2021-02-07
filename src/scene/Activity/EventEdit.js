
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


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fonts, apiServer } from '../../constant/util';
import { Button, BottomSheet } from 'react-native-elements';

export default class EventEdit extends Component {
    state = {
        visibleSearch: false
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: '#F9FCFF', ...style.marginHeaderStatusBar }}>

                    <View style={{ ...styleScoped.shadowCard, backgroundColor: 'white', paddingBottom: hp('2%') }}>
                        <View style={{ ...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Edit Event</Text>
                            <View></View>
                        </View>

                        <View style={{ ...style.container, paddingTop: hp('2%') }}>
                            <Text style={{ fontSize: hp('2%'), color: fonts.color.primary }}>Event topic</Text>
                        </View>

                        <View style={{ marginVertical: hp('2%'), ...style.divider }}></View>
                        <View style={{ ...style.container }}>
                            <Text style={{ fontSize: hp('2%') }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</Text>
                            <Text style={{ marginTop: hp('2%'), color: fonts.color.primary }}>
                                Link : <Text style={{ textDecorationLine: 'underline' }}>facebook.com/</Text>
                            </Text>
                        </View>
                        <View style={{ marginVertical: hp('2%'), ...style.divider }}></View>
                        <View style={{ ...style.container }}>
                            <Text style={{ fontSize: hp('2%') }}>Event schedule</Text>

                            <View style={{ marginTop: hp('3%'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%'), color: fonts.color.secondary }}>Add event date</Text>
                                <Button
                                    title="Change"
                                    titleStyle={{ padding: hp('2%') }}
                                    buttonStyle={{ ...style.btnTagPrimary, padding: hp('3%'), ...style.btnRounded }}
                                />
                            </View>
                        </View>

                        <View style={{ marginVertical: hp('2%'), ...style.divider }}></View>

                        <View style={{ ...style.container }}>
                            <Text style={{ fontSize: hp('2%') }}>Start event</Text>

                            <View style={{ marginTop: hp('3%'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%'), color: fonts.color.primary }}>10:00</Text>
                                <Button
                                    title="Change"
                                    titleStyle={{ padding: hp('2%') }}
                                    buttonStyle={{ ...style.btnTagPrimary, padding: hp('3%'), ...style.btnRounded }}
                                />
                            </View>
                        </View>

                        <View style={{ marginVertical: hp('2%'), ...style.divider }}></View>

                        <View style={{ ...style.container }}>
                            <Text style={{ fontSize: hp('2%') }}>Work shop</Text>

                            <View style={{ marginTop: hp('3%'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%'), color: fonts.color.primary }}>10:00</Text>
                                <Button
                                    title="Change"
                                    titleStyle={{ padding: hp('2%') }}
                                    buttonStyle={{ ...style.btnTagPrimary, padding: hp('3%'), ...style.btnRounded }}
                                />
                            </View>
                        </View>

                        <View style={{ marginVertical: hp('2%'), ...style.divider }}></View>

                        <View style={{ marginTop: hp('2%') , ...style.container }}>
                            <Button
                                title="Add schedule"
                                Outline={true}
                                titleStyle={{ color: '#003764', }}
                                buttonStyle={{
                                    padding: hp('1%'),
                                    ...style.btnPrimaryOutline,
                                    ...style.btnRounded
                                }}
                            />
                        </View>

                    </View>
                    <View style={{ marginTop: hp('2%'), ...style.container }}>
                        <Button
                            title="Edit"
                            buttonStyle={{
                                padding: hp('1%'),
                                ...style.btnPrimary,
                                ...style.btnRounded
                            }}
                            onPress={()=>Actions.pop()}
                        />
                    </View>





                </ScrollView>
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
    },
    sectionSocial: {
        marginTop: hp('2%'),
        paddingTop: hp('2.5%'),
        borderTopWidth: 0.5,
        borderTopColor: '#B5B5B5',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: hp('2%'),
        paddingBottom: hp('1%')
    }
});


