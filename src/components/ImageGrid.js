
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


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




export default class ImageGrid extends Component {
    state = {
        img: [{}, {}, {}],

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
                    data.map((el,index) => {
                        return (
                            <View style={{ height: width == '100%' ? hp('23%') : hp('10%'), width: width, margin: 1 }}>
                                <Image
                                    source={{ uri: el }}
                                    style={{ height: '100%', width: '100%', resizeMode: 'cover' }}
                                />
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


