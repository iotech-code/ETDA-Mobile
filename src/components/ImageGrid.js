
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native';


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { Image } from 'react-native-elements';
import FastImage from 'react-native-fast-image'


export default class ImageGrid extends Component {
    state = {
        img: [{}, {}, {}],

    }
    onPressImage(index) {
        const { getIndexImage } = this.props
        getIndexImage ? this.props.onPressImage(index) : null
    }
    render() {
        const { data } = this.props
        let width = '0%'

        if (data.length == 1) {
            width = '100%'
        }
        else if (data.length == 2 || data.length == 4) {
            width = '48%'
        }
        else if (data.length == 3 || data.length == 5 || data.length == 6) {
            width = '32%'
        }
        else if (data.length >= 7) {
            width = '23%'
        }

        return (
            <View style={style.warpper}>
                {
                    data.map((el, index) => {
                        return (
                            <View
                                style={{
                                    height: width == '100%' ? hp('30%') : hp('15%'),
                                    width: width,
                                    margin: 2
                                }}
                                key={`Image_${index}`}
                            >

                                <TouchableOpacity onPress={() => this.onPressImage(index)}>
                                    <FastImage
                                        source={{ uri: el ,  priority: FastImage.priority.normal}}
                                        style={{ height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 4 }}
                                        PlaceholderContent={<ActivityIndicator color="white" />}
                                    />
                                </TouchableOpacity>

                            </View>
                        )
                    })
                }
            </View>
        );
    }
};

const style = StyleSheet.create({
    warpper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    }
});


