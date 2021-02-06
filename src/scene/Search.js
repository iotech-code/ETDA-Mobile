
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
    KeyboardAvoidingView
} from 'react-native';

import { Button, BottomSheet } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Poll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: '',
            text: '',
            visibleSearch: false,
        }
    }


    async componentDidMount() {
        try {
            const token = await AsyncStorage.getItem('token')
            this.setState({
                token: token
            })
        } catch (err) {
            // handle errors
        }
    }

    callSearch = async () => {
        console.log('data come in : ', this.state.token)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
        }

        axios.get('https://etda.amn-corporation.com/api/backend/post/search?query=' + this.state.text, {
            headers
        })
            .then((response) => {
                console.log('data : ', response.data)
                if (response.data.status == "success") {

                } else {

                }
            })
            .catch((error) => {
                console.log('data : ', error)
            })
            .finally(function () {
            });

    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView behavior="position">
                    <View style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                        <View style={{ ...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Search</Text>
                            <TouchableOpacity onPress={() => Actions.replace('Main')}>
                                <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...style.container, marginTop: hp('2%') }}>
                            <View style={{ ...styleScoped.customInputSearch }}>
                                <Icon name="magnify" size={hp('2.2%')} style={{ marginRight: hp('1%'), }} color={'rgba(0,0,0,0.16)'} />
                                <TextInput style={{ padding: 0, fontSize: hp('2%') }} placeholder="Search..."></TextInput>
                            </View>
                            <View style={{ marginTop: hp('2%') }}>
                                <Text style={{ fontSize: hp('2%'), color: '#707070' }}>Search by tags</Text>
                            </View>
                        </View>
                        <View style={{ marginVertical: hp('2%'), ...style.divider }}></View>
                        <ScrollView style={{ ...style.container }}>
                            <Text style={{ ...styleScoped.textList }}>E-commerce</Text>
                            <Text style={{ ...styleScoped.textList }}>Cybersecurity</Text>
                            <Text style={{ ...styleScoped.textList }}>E-standard</Text>
                            <Text style={{ ...styleScoped.textList }}>Digital Service</Text>

                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
};

const styleScoped = StyleSheet.create({
    customInputSearch: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.16)',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: hp('1%')
    },
    textList: {
        fontSize: hp('2%'),
        color: '#707070',
        fontWeight: '300',
        marginTop: hp('2%')
    }
});


