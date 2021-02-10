
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, BottomSheet, Overlay } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFonAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import { fonts, colors, apiServer } from '../../constant/util'
import Icons from 'react-native-vector-icons/MaterialIcons';


const options = {
    // title: 'Select Avatar',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    quality: 1.0,
    maxWidth: 1400,
    maxHeight: 1400,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userObject: {
                phone: '',
                professional: '',
                position: '',
                organization: '',
                type: '',
                name: '',
                photo: '',
                userId: '',
            },
            visibleSearch: false,
            visibleChangeTypeOfUser: false,
            visibleModalPostandRead: false,
            rReason: '', 
            rExp: [], 
            rExp1: '', 
            rExp2: '', 
            rExp3: '',
            dafault_avatar:require('../../assets/images/default_avatar.jpg')
        }
    }


    componentDidMount() {
        this.setUserObject();
    }

    async setUserObject () {
        const {user_data} = await this.props;
        
        await this.setState({
            userObject: {...user_data}
        })
    }

    chooseImageFileRegister = () => {
        ImagePicker.showImagePicker(options, (response) => {
           // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('data image : ' , response ) 
                var image = 'data:image/jpeg;base64,' + response.data
                this.setState({
                    photo : image
                })
              //  callDeleting(response.uri, token, "test1.jpg")
            }
        });
    };


    continueTypeOfUser(type ) {
        if (type == 'read'){
            this.setState({ visibleModalPostandRead: false })
        }else{
            this.setState({ visibleModalPostandRead: true })
        }
        this.setState({ visibleChangeTypeOfUser: false })
       
    }

    renderModalPostandRead() {
        onChangeTextReason = async (value) => {
            this.setState({
                rReason: value
            })
        }

        onChangeTextExp1 = async (value) => {
            this.setState({
                rExp1: value
            })
        }


        onChangeTextExp2 = async (value) => {
            this.setState({
                rExp2: value
            })
        }

        onChangeTextExp3 = async (value) => {
            this.setState({
                rExp3: value
            })
        }
        const { visibleModalPostandRead } = this.state
        return (
            <Overlay
                isVisible={visibleModalPostandRead}
                overlayStyle={{
                    width: wp('90%'),
                    paddingVertical: hp('2%'),
                    paddingHorizontal: hp('2%')
                }}
            >
                <View style={{
                    borderBottomColor: '#707070',
                    borderBottomWidth: 1,
                    paddingBottom: hp('1.5%')
                }}>
                    <Text style={{
                        textAlign: 'center',
                        color: '#003764',
                        fontSize: hp('1.7%'),
                        fontWeight: '600'
                    }}>Change permission to posts and read</Text>
                </View>
                <Text
                    style={{
                        marginVertical: hp('2%'),
                        textAlign: 'left',
                        fontSize: hp('1.8%'),
                        lineHeight: 27,
                        fontWeight: '300'
                    }}
                >
                    Please, enter your reason for change
                    permission to posts and read.
                </Text>

                <View style={{ ...style.customInput, height: hp('10%') }}>
                    <TextInput
                        style={{ fontSize: hp('2%') }}
                        placeholder="Enter your reason…"
                        multiline={true}
                        onChangeText={(value) => {
                            onChangeTextReason(value)
                        }}
                        numberOfLines={50}

                    />
                </View>

                <Text
                    style={{
                        marginTop: hp('2%'),
                        marginBottom: hp('1%'),
                        textAlign: 'left',
                        fontSize: hp('1.8%'),
                        lineHeight: 27,
                        fontWeight: '300'
                    }}
                >
                    Please, enter your experience or
                    workmanship that will help make decision
                    for ETDA. (Give 3 experience or less than)
                </Text>

                <View >
                    <TextInput
                        style={{ ...style.customInput, fontSize: hp('2%') }}
                        placeholder="Enter your experience…"
                        onChangeText={(value) => {
                            onChangeTextExp1(value)
                        }}
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <TextInput
                        style={{ ...style.customInput, fontSize: hp('2%') }}
                        placeholder="Enter your experience…"
                        onChangeText={(value) => {
                            onChangeTextExp2(value)
                        }}
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <TextInput
                        style={{ ...style.customInput, fontSize: hp('2%') }}
                        placeholder="Enter your experience…"
                        onChangeText={(value) => {
                            onChangeTextExp3(value)
                        }}
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <Button
                        title="Confirm"
                        buttonStyle={{
                            padding: hp('1.5%'),
                            ...style.btnRounded,
                            ...style.btnPrimary
                        }}
                        onPress={() => this.setState({ visibleModalPostandRead: false })}
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <Button
                        title="Cancle"
                        Outline={true}
                        titleStyle={{ color: '#003764' }}
                        buttonStyle={{
                            ...style.btnRounded,
                            ...style.btnPrimaryOutline
                        }}
                        onPress={() => this.setState({ visibleModalPostandRead: false })}
                    />
                </View>
            </Overlay>
        )
    }

    renderChangeTypeOfUser() {
        const { visibleChangeTypeOfUser } = this.state
        return (
            <Overlay
                isVisible={visibleChangeTypeOfUser}
                onBackdropPress={() => this.setState({ visibleChangeTypeOfUser: false })}
                overlayStyle={{ width: '90%', padding: hp('2%') }}
            >
                <Text style={{ fontSize: hp('2%'), textAlign: 'center', color: '#003764' }}>Change type of your account</Text>
                <View style={{ ...style.divider, marginVertical: hp('1%') }}></View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <TouchableOpacity
                        style={{ width: '49%' }}
                        onPress={() => this.setState({ visible: true , type : 'read' })}
                    >
                        <View style={{ ...styleScoped.option, backgroundColor: colors.primary }}>
                            <Icons name="description" size={hp('12%')} style={{ alignSelf: "center" }} color="white" />
                        </View>
                        <Text style={{
                            marginTop: hp('3%'),
                            textAlign: 'center',
                            fontSize: hp('2%'),
                            color: '#000000'
                        }}>Read only</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ width: '49%' }}
                        onPress={() => this.setState({ visible: true , type : 'read, post_read' })}
                    >
                        <View style={styleScoped.option}>
                                    <Icons name="create" size={hp('12%')} style={{ alignSelf: "center" }} color={colors.primary} />
                        </View>
                        <Text style={{
                            marginTop: hp('3%'),
                            textAlign: 'center',
                            fontSize: hp('2%'),
                            color: '#000000'
                        }}>
                            Posts and Read
                                </Text>

                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: hp('2%') }}>
                    <Button
                        title="Continue"
                        buttonStyle={{
                            padding: hp('1%'),
                            ...style.btnRounded,
                            ...style.btnPrimary
                        }}
                        onPress={() => this.continueTypeOfUser(this.state.type)}
                    />
                    <View style={{ marginTop: hp('1%') }}></View>
                    <Button
                        title="Cancle"
                        Outline={true}
                        titleStyle={{ color: '#003764' }}
                        buttonStyle={{
                            ...style.btnPrimaryOutline,
                            ...style.btnRounded
                        }}
                        onPress={() => this.setState({ visibleChangeTypeOfUser: false })}
                    />
                </View>

            </Overlay>
        )
    }

    callEditProfile = async (token) => {
        this.state.rExp.push(this.state.rExp1)
        this.state.rExp.push(this.state.rExp2)
        this.state.rExp.push(this.state.rExp3)
        var image = []
        if (this.state.photo === '' || this.state.photo === null){
            image = this.state.photo
        }else{
            image = ''
        }

        const data = {
            "user_id": this.state.userId,
            "user_fullname": this.state.name,
            "user_photo": image,
            "mobile_number": this.state.phone,
            "organization": this.state.organization,
            "position": this.state.position,
            "professional": this.state.professional,
            "user_rq_type": this.state.type,
            "rq_reason": this.state.rReason,
            "rq_exp": this.state.rExp
        }

        axios.put(apiServer.url + '/api/backend/user/update/' + this.props.userId, data,{
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((response) => {
                if (response.data.status == "success") {
                    console.log(response.data)
                    Actions.MyProfile()
                } else {

                }
            })
            .catch((error) => {
                console.log('error 1 : ', error)
            })
            .finally(function () {
            });

    };


    render() {
        const { userObject } = this.state.userObject;

        onChangeTextPhone = async (value) => {
            this.setState({
                phone: value
            })
        }

        onChangeTextOrganization = async (value) => {
            this.setState({
                organization: value
            })
        }


        onChangeTextPosition = async (value) => {
            this.setState({
                position: value
            })
        }


        onChangeTextProfessional = async (value) => {
            this.setState({
                professional: value
            })
        }
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ backgroundColor: 'white', paddingBottom: hp('2%'), marginBottom: hp('2%') }}>
                        <View style={{ ...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop()} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Edit Profile</Text>
                            <TouchableOpacity
                                onPress={() => this.callEditProfile()}
                            >
                                <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ ...style.container }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

                            <View style={{ width: hp('15%'), height: hp('15%'), borderRadius: 100 }}>
                                {this.state.userObject.photo === '' || this.state.userObject.photo === null ?
                                <Image source={this.state.dafault_avatar} style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                    borderRadius: 100
                                }} />
                                :
                                <Image source={{
                                    uri: this.state.userObject.photo,
                                  }} style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                    borderRadius: 100
                                }} />
                            }
                                <TouchableOpacity style={{ ...styleScoped.btnImageProfile }}  onPress={() => {this.chooseImageFileRegister()}}>
                                    <IconFonAwesome name="pencil" size={hp('2%')} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: hp('2%') }}>
                                <Text style={{ fontSize: hp('2.5%') }}>Name</Text>
                                <TextInput
                                    value={this.state.userObject.name}
                                    style={{ ...style.customInput, minWidth: '60%', marginTop: 5, borderWidth: 0 }}
                                    placeholder="Fullname"
                                    onChangeText={(value) => {
                                        this.setState({userObject: { name: value } })
                                    }}
                                />
                            </View>

                        </View>

                        <View style={{ marginTop: hp('4%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="phone" size={hp('3%')} color="#29B100" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Contact me</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <TextInput
                                    style={{ ...style.customInput, marginRight: hp('1%') }}
                                    placeholder="TH 66+"
                                />
                                <TextInput
                                    style={{ ...style.customInput, width: '80%' }}
                                    placeholder={this.props.phone}
                                    keyboardType='number-pad'
                                    onChangeText={(value) => {
                                        onChangeTextPhone(value)
                                    }}
                                />
                            </View>
                            {/* <Text style={{ fontSize: hp('2%'), color: '#707070', fontWeight: '300' }}>TH 66+ 099-999-9999</Text> */}
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="lightbulb-outline" size={hp('3%')} color="#FED449" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Professional</Text>
                            </View>
                            <TextInput
                                style={{ ...style.customInput, width: '100%' }}
                                placeholder={this.state.professional}
                                onChangeText={(value) => {
                                    onChangeTextProfessional(value)
                                }}
                            />
                            {/* <Text style={{ fontSize: hp('2%'), color: '#707070', fontWeight: '300' }}>Digital Identity</Text> */}
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="domain" size={hp('3%')} color="#EE3397" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Organization</Text>
                            </View>
                            <TextInput
                                style={{ ...style.customInput, width: '100%' }}
                                placeholder={this.state.organization}
                                onChangeText={(value) => {
                                    onChangeTextOrganization(value)
                                }}
                            />
                            {/* <Text style={{ fontSize: hp('2%'), color: '#707070', fontWeight: '300' }}>Data Guardian</Text> */}
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="bag-checked" size={hp('3%')} color="#427AA1" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Position</Text>
                            </View>
                            <TextInput
                                style={{ ...style.customInput, width: '100%' }}
                                placeholder={this.state.position}
                                onChangeText={(value) => {
                                    onChangeTextPosition(value)
                                }}
                            />
                            {/* <Text style={{ fontSize: hp('2%'), color: '#707070', fontWeight: '300' }}>Software engineer</Text> */}
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="account-group" size={hp('3%')} color="#003764" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Type of user</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%'), color: '#707070', fontWeight: '300' }}>{this.state.userObject.type.toUpperCase()}</Text>
                                <TouchableOpacity
                                    style={{ padding: hp('1%'), paddingHorizontal: hp('2%'), backgroundColor: '#427AA1', borderRadius: 20 }}
                                    onPress={() => this.setState({ visibleChangeTypeOfUser: true })}
                                >
                                    <Text style={{ color: "white" }}>Change</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <Text style={{ fontSize: hp('1.7%'), width: '70%', color: '#707070' }}>*If you want to change permission to post. You can request to admin.</Text>
                        </View>

                    </View>
                </ScrollView>
                {this.renderChangeTypeOfUser()}
                {this.renderModalPostandRead()}
            </View >
        );
    }


};

const styleScoped = StyleSheet.create({
    btnImageProfile: {
        // padding: hp('1%'),
        width: hp('4%'),
        height: hp('4%'),
        borderRadius: 100,
        // borderWidth: 1,
        // borderColor: 'black',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#003764',
        position: 'absolute',
        right: 2,
        bottom: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    option: {
        padding: hp('3%'),
        borderRadius: 10,
        borderColor: colors.primary,
        borderWidth: 1,
        width: '100%',
        height: hp('20%')
    },
});


