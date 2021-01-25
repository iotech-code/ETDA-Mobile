
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

import { Button, BottomSheet } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fonts } from '../../constant/util';


export default class EventCreate extends Component {
    state = {
        visibleSearch: false,
        selected: false
    }
    render() {
        const { dataList, selected } = this.state
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                <View style={{ ...style.navbar }}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon name="chevron-left" size={hp('3%')} color="white" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Create event</Text>
                    <Text style={{ fontSize: hp('2.2%'), color: 'white' }}></Text>
                </View>
                {/* content */}
                <View>
                    <View style={{ height: hp('7%') }}>
                        <TextInput placeholder="Enter your topic event here…" style={{ paddingVertical: hp('2%'), paddingHorizontal: hp('2%'), fontSize: hp('2.2%') }} ></TextInput>
                    </View>
                    <View style={{ ...style.divider }}></View>
                    <View style={{ height: hp('30%') }}>
                        <TextInput placeholder="Enter your  event detail here…" style={{ paddingVertical: hp('2%'), paddingHorizontal: hp('2%'), fontSize: hp('2.2%') }} ></TextInput>
                    </View>
                    <View style={{ ...style.divider }}></View>


                    <View style={{ ...style.container, marginTop: hp('2%') }}>
                        <Text style={{ fontSize: hp('2%') }}>Event schedule</Text>
                        <View style={{ marginTop: hp('3%'), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: hp('2%') }}>Add event date</Text>
                            <Button
                                title="Date"
                                titleStyle={{ padding: hp('2%') }}
                                buttonStyle={{ ...style.btnTagPrimary, padding: hp('3%'), ...style.btnRounded }}
                            />
                        </View>
                    </View>

                    <View style={{ ...style.divider, marginTop: hp('3%') }}></View>

                    <View style={{ ...style.container }}>
                        <TextInput placeholder="Enter your  event detail here…" style={{ fontSize: hp('2.2%') }} ></TextInput>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Button
                                title="Time"
                                titleStyle={{ padding: hp('2%') }}
                                buttonStyle={{ ...style.btnTagPrimary, padding: hp('3%'), ...style.btnRounded }}
                            />
                        </View>
                        <View style={{ marginTop: hp('2%') }}>
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
                    <View style={{ ...style.divider, marginVertical: hp('3%') }}></View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', ...style.container, alignItems: 'center' }}>
                        {
                            !selected ?
                                <TouchableOpacity onPress={() => this.setState({ selected: true })}>
                                    <Icon name="checkbox-blank-circle-outline" size={hp('3%')} color="rgba(0,0,0,0.16)" />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.setState({ selected: false })}>
                                    <Icon name="checkbox-marked-circle" size={hp('3%')} color="#4267B2" />
                                </TouchableOpacity>
                        }
                        <Text style={{ fontSize: hp('2%'), marginLeft: hp('2%') }}>Post to ETDA feed</Text>

                    </View>

                    <View style={{ marginTop: hp('2%'), ...style.container }}>
                        <Button
                            title="Create"
                            buttonStyle={{
                                padding: hp('1%'),
                                ...style.btnPrimary,
                                ...style.btnRounded
                            }}
                            onPress={() => Actions.push('EventCreate')}
                        />
                    </View>







                </View>
            </ScrollView>
        );
    }
};

const styleScoped = StyleSheet.create({

});


