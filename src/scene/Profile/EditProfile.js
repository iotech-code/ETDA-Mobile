
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import HttpRequest from '../../Service/HttpRequest';
import { Button, Overlay } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import style from '../../styles/base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFonAwesome from 'react-native-vector-icons/FontAwesome'
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { colors, apiServer } from '../../constant/util'
import Icons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImgToBase64 from 'react-native-image-base64';
const http = new HttpRequest();

const options = {
    title: 'Select Avatar',
    quality: 1.0,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
};

export default class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userObject: {},
            ImagePath: '',
            updatePhoto: false,
            visibleSearch: false,
            visibleChangeTypeOfUser: false,
            visibleModalPostandRead: false,
            rReason: '',
            rExp: {
                exp1: '',
                exp2: '',
                exp3: ''
            },
            dafault_avatar: require('../../assets/images/default_avatar.jpg')
        }
    }


    componentDidMount() {
        this.setUserObject();
    }

    async setUserObject () {
        const {user_data} = await this.props;
        await this.setState({
            userObject: {...user_data}
        });
    }

    chooseImageFileRegister = async () => {
        const imageFile = await ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        });
        this.setState({
            ImagePath: imageFile.path
        });
        ImgToBase64.getBase64String(imageFile.path)
        .then(encodedImage => {
            const imageData = 'data:image/jpeg;base64,' + encodedImage;
            this.setState({
                updatePhoto: true,
                userObject: {
                        ...this.state.userObject,
                        photo: imageData
                    }
            });
        })
    }


    continueTypeOfUser(type ) {
        if (type == 'read'){
            this.setState({ visibleModalPostandRead: false })
        }else{
            this.setState({ visibleModalPostandRead: true })
        }
        this.setState({ visibleChangeTypeOfUser: false })
    }

    renderModalPostandRead() {
        const { visibleModalPostandRead } = this.state
        return (
            <>
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
            </>
        )
    }

    renderChangeTypeOfUser() {
        const { visibleChangeTypeOfUser } = this.state
        return (
            <View>
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
            </View>
        )
    }

    callEditProfile = async () => {
        let {userObject} = this.state;
        let data = {
            "user_id": userObject.userid,
            "user_fullname": userObject.fullname,
            "user_photo": this.state.updatePhoto ? userObject.photo : '',
            "mobile_number": userObject.mobile_number,
            "organization": userObject.organization,
            "position": userObject.position,
            "professional": userObject.professional,
            "user_rq_type": userObject.user_type,
            "rq_reason": userObject.rReason,
            "rq_exp": {
                "exp1": this.state.rExp.exp1,
                "exp2": this.state.rExp.exp2,
                "exp3": this.state.rExp.exp3
            }
        }

        await http.setTokenHeader();
        let update = await http.put(apiServer.url + '/api/backend/user/update/' + userObject.userid, data);
        let {status} = await update.data;

        if (status == "success") {
            await this.setState({
                userObject: {
                        ...this.state.userObject,
                        photo: this.state.ImagePath
                    }
            });
            await AsyncStorage.setItem('user_data', JSON.stringify( userObject ) );
            await Actions.MyProfile();
        } else {
            alert('Update fail.');
        }
    };

    render() {
        const { userObject } = this.state;

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
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
                                    uri: userObject.photo,
                                  }} style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'cover',
                                    borderRadius: 100
                                }} />
                            }
                                <TouchableOpacity style={{ ...styleScoped.btnImageProfile }}  onPress={ () => this.chooseImageFileRegister() }>
                                    <IconFonAwesome name="pencil" size={hp('2%')} color="white" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: hp('2%') }}>
                                <Text style={{ fontSize: hp('2.5%') }}>Name</Text>
                                <TextInput
                                    value={userObject.fullname}
                                    style={{ ...style.customInput, minWidth: '60%', marginTop: 5, borderWidth: 0 }}
                                    placeholder="Fullname"
                                    onChangeText={ (value) => this.setState({userObject: { ...userObject, fullname: value } }) }
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
                                    placeholder={this.props.mobile_number}
                                    keyboardType='number-pad'
                                    value={userObject.mobile_number}
                                    onChangeText={ (value) => this.setState({userObject: { ...userObject, mobile_number: value } }) }
                                />
                            </View>
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="lightbulb-outline" size={hp('3%')} color="#FED449" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Professional</Text>
                            </View>
                            <TextInput
                                style={{ ...style.customInput, width: '100%' }}
                                value={userObject.professional}
                                onChangeText={ (value) => this.setState({userObject: { ...userObject, professional: value } }) }
                            />
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="domain" size={hp('3%')} color="#EE3397" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Organization</Text>
                            </View>
                            <TextInput
                                style={{ ...style.customInput, width: '100%' }}
                                value={userObject.organization}
                                onChangeText={ (value) => this.setState({userObject: { ...userObject, organization: value } }) }
                            />
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="bag-checked" size={hp('3%')} color="#427AA1" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Position</Text>
                            </View>
                            <TextInput
                                style={{ ...style.customInput, width: '100%' }}
                                value={userObject.position}
                                onChangeText={ (value) => this.setState({userObject: { ...userObject, position: value } }) }
                            />
                        </View>

                        <View style={{ marginTop: hp('2%') }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                <Icon name="account-group" size={hp('3%')} color="#003764" style={{ marginRight: hp('2%') }} />
                                <Text style={{ fontSize: hp('2.2%') }}>Type of user</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2%'), color: '#707070', fontWeight: '300' }}>{ userObject.user_type }</Text>
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
                    </KeyboardAvoidingView>
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
        width: hp('4%'),
        height: hp('4%'),
        borderRadius: 100,
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


