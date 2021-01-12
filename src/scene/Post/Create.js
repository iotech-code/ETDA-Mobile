
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
import HeaderNavbar from '../../components/Navbar'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuFooter from '../../components/MenuFooter'


export default class CreatePost extends Component {
    state = {
        visibleSearch: false
    }
    render() {
        const { dataList } = this.state
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                <View style={{ padding: hp('2%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#003764' }}>
                    <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                    <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Create Blog</Text>
                    <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Post</Text>
                </View>
                {/* content */}
                <View>
                    <View style={{ height: hp('7%') }}>
                        <TextInput placeholder="Enter your topic here…" style={{ paddingVertical: hp('2%'), paddingHorizontal: hp('2%'), fontSize: hp('2.2%') }} ></TextInput>
                    </View>
                    <View style={{ ...style.divider }}></View>
                    <View style={{ height: hp('30%') }}>
                        <TextInput placeholder="Enter your post here…" style={{ paddingVertical: hp('2%'), paddingHorizontal: hp('2%'), fontSize: hp('2.2%') }} ></TextInput>
                    </View>
                    <View style={{ ...style.divider }}></View>

                    <View style={{
                        marginTop: hp('2%'),
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: hp('2%')
                    }}>
                        <Icon name="tag" style={{ marginRight: hp('2%') }} color="#003764" size={hp('2.5%')} />
                        <Text style={{ fontSize: hp('2.5%'), color: '#003764' }}>Tag</Text>
                    </View>

                    <View style={{ marginTop: hp('2%'), paddingHorizontal: hp('2%') }}>
                        <TextInput
                            style={style.customInput}
                            placeholder="Add tag by yourself…"
                        />
                    </View>


                    <View style={{ paddingHorizontal: hp('2%') }}>
                        <View style={{ marginTop: hp('4%'), alignItems: 'center', ...style.boxTextBorder }}>
                            <Text style={{ ...style.textOnBorder, fontSize: hp('2%'), color: '#B5B5B5' }}>Or</Text>
                        </View>
                    </View>


                    <View style={{ marginTop: hp('2%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: hp('2%') }}>
                        <View style={{ ...style.tagActive }}>
                            <Text style={{ ...style.textTagActive }}>E-commerce</Text>
                        </View>
                        <View style={{ ...style.tag }}>
                            <Text style={{ ...style.textTag }}>E-commerce</Text>
                        </View>
                    </View>



                </View>
            </ScrollView>
        );
    }
};

const styleScoped = StyleSheet.create({

});


