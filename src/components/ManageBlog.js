
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
    TouchableOpacity
} from 'react-native';

import { Button, Overlay } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from "react-native-raw-bottom-sheet";
import { fonts } from '../constant/util';
import FbGrid from "react-native-fb-image-grid";
import ImageView from 'react-native-image-view';
import { apiServer } from '../constant/util';

export default class ManageBlog extends Component {
    state = {
        data: {
            title: 'E-commerce new gen',
            time: '2 minutes ago',
            image: require('../assets/images/post_1.png'),
            detail: ' Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et',
            tag: ['E-commerce', 'Test Tag']
        },
        socail: {
            like: 22,
            view: 22
        },
        selected: false

    }
    render() {
        const { data, socail, selected } = this.state
        let { post_images } = this.props.data
        let image_viewer = []
        for (let index = 0; index < post_images.length; index++) {
            const element = post_images[index];
            let obj = {
                source: {
                    uri: element,
                },
                width: 806,
                height: 720,
            }
            image_viewer.push(obj)
        }
        return (
            <View style={{
                ...styleScoped.shadowCard,
                backgroundColor: 'white',
                paddingVertical: hp('1%'),
                marginBottom: hp('2%')
            }}>
                <View style={{ paddingHorizontal: hp('2%'), paddingBottom: hp('1%') }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: hp('2%'), }}>{this.props.data.title}</Text>
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

                    </View>
                    <Text style={{ fontSize: hp('1.5%'), fontWeight: '300', color: '#B5B5B5' }} >{this.props.data.date}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: hp('1%'), flexWrap: 'wrap' }}>
                        {
                            this.props.data.tags.map((item, index) => {
                                return (
                                    <Button
                                        title={item}
                                        titleStyle={{ fontSize: hp('1.5%') }}
                                        buttonStyle={{ ...style.btnTagPrimary, marginTop: hp('1%') }}
                                        key={index}
                                    />
                                )
                            })
                        }
                    </View>
                    <View style={{ height: hp('23%'), marginTop: hp('1%') }}>
                        <FbGrid
                            images={post_images}
                            onPress={(url, index) => console.log('url : ', url)}
                        />
                    </View>
                    <TouchableOpacity style={{ marginTop: hp('1%') }} >
                        <Text style={{ fontSize: hp('2%'), fontWeight: '300' }}>{this.props.data.description}</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
};

const styleScoped = StyleSheet.create({

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
    listMore: {
        width: '100%',
        padding: hp('2%'),
        flexDirection: 'row',
        alignItems: 'center',

    }
});


