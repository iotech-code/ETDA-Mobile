
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';
import translate from '../constant/lang'
import { colors, fonts, apiServer } from '../constant/util';

export default class MenuFooterUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: {}
        }
    }
    async UNSAFE_componentWillMount () {
        await this.getLang();
    }

    async getLang() {
        this.setState({ isFetching: true })
        let vocap = await translate()
        this.setState({ lng: vocap })
        this.setState({ isFetching: false })
    }

    render() {
        const { lng } = this.state
        return (
            <View >
                <View style={styleScoped.container}>
                    <TouchableOpacity style={{ width: '33.33%' }} onPress={() => {
                        Actions.replace('Main')
                    }}>
                        <Icon name="home" size={hp('2.6%')} color={this.props.value == 'home' ? colors.primary : color = "#B5B5B5"} style={{ alignSelf: 'center' }} />
                        <Text style={{ textAlign: 'center', fontSize: hp('1.2%'), color: this.props.value == 'home' ? fonts.color.primary : color = "#B5B5B5" }}>{lng.home}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '33.33%' }} onPress={() => {
                        Actions.replace('MessageBoard')
                    }}>
                        <Icon name="globe" size={hp('2.6%')} color={this.props.value == 'message' ? colors.primary : color = "#B5B5B5"} style={{ alignSelf: 'center' }} />
                        <Text style={{ textAlign: 'center', fontSize: hp('1.2%'), color: this.props.value == 'message' ? fonts.color.primary : color = "#B5B5B5" }}>{lng.message_board}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '33.33%' }} onPress={() => {
                        Actions.replace('Activity')
                    }}>
                        <Icon name="calendar" size={hp('2.6%')} color={this.props.value == 'activity' ? colors.primary : color = "#B5B5B5"} style={{ alignSelf: 'center' }} />
                        <Text style={{ textAlign: 'center', fontSize: hp('1.2%'), color: this.props.value == 'activity' ? fonts.color.primary : color = "#B5B5B5" }}>{lng.activity}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    container: {
        paddingBottom: Platform.OS === 'ios' ? hp('4%') : hp('1%'),
        flexDirection: 'row',
        paddingHorizontal: hp('2%'),
        paddingVertical: hp('1.5%'),
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },

});


