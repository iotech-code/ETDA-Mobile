
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
import ImagePicker from 'react-native-image-crop-picker';
import { colors, apiServer } from '../../constant/util'
import Icons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImgToBase64 from 'react-native-image-base64';
import translate from '../../constant/lang'
 
const http = new HttpRequest();

const options = {
    title: 'Select Avatar',
    quality: 1.0,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
}



export default class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userObject: {},
            ImagePath: '',
            updatePhoto: false,
            visibleSearch: false,
            visibleChangeTypeOfUser: false,
            readButtonColor: '#fff',
            readTextColor: colors.primary,
            postButtonColor: '#fff',
            postTextColor: colors.primary,
            visibleModalPostandRead: false,
            successModal: false,
            rReason: '',
            rExp: {
                exp1: '',
                exp2: '',
                exp3: ''
            },
            lng: {},
            dafault_avatar: require('../../assets/images/default_avatar.jpg')
        }
    }

    async UNSAFE_componentWillMount() {
        await this.getLang();
        this.setUserObject();
    }
    
    async getLang() {
        this.setState({ isFetching: true })
        let vocap = await translate()
        this.setState({ lng: vocap })
        this.setState({ isFetching: false })
    }

    componentDidMount() {
        // console.log(this.props)
    }

    componentWillUnmount() {
        this.setState({})
    }

    async setUserObject () {
        const {user_data} = await this.props;
        
        await this.setState({
            userObject: {...user_data}
        });
    }

    async requestChangeRole (type) {
        await http.setTokenHeader();
        const data = {
            user_rq_type: type,
            rq_reason: this.state.rReason,
            rq_exp: this.state.rExp
        }

        http.post(apiServer.url + '/api/backend/user/change-role', data);
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
        const { visibleModalPostandRead, lng } = this.state
        return (
            <Overlay
                isVisible={visibleModalPostandRead}
                overlayStyle={{
                    width: wp('90%'),
                    paddingVertical: hp('2%'),
                    paddingHorizontal: hp('2%')
                }}
            >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
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
                    }}>{lng.change_user_type_title}</Text>
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
                    {lng.change_user_type_detail}
                </Text>

                <View style={{ ...style.customInput, height: hp('10%') }}>
                    <TextInput
                        value={this.state.rReason}
                        style={{ fontSize: hp('2%') }}
                        placeholder={lng.enter_reason}
                        multiline={true}
                        onChangeText={ (value) => this.setState({rReason: value}) }
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
                    {lng.change_user_type_detail2}
                </Text>

                <View >
                    <TextInput
                        value={this.state.rExp.exp1}
                        style={{ ...style.customInput, fontSize: hp('2%') }}
                        placeholder={lng.enter_experience}
                        onChangeText={ (value) => this.setState({ rExp: { ...this.state.rExp, exp1: value } } ) }
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <TextInput
                        value={this.state.rExp.exp2}
                        style={{ ...style.customInput, fontSize: hp('2%') }}
                        placeholder={lng.enter_experience}
                        onChangeText={ (value) => this.setState({ rExp: { ...this.state.rExp, exp2: value} } ) }
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <TextInput
                        value={this.state.rExp.exp3}
                        style={{ ...style.customInput, fontSize: hp('2%') }}
                        placeholder={lng.enter_experience}
                        onChangeText={ (value) => this.setState({ rExp: { ...this.state.rExp, exp3: value} } ) }
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <Button
                        title={lng.confirm}
                        buttonStyle={ {
                            padding: hp('1.5%'),
                            ...style.btnRounded,
                            ...style.btnPrimary
                        } }
                        onPress={ () => this.saveTypeOfUser() }
                    />
                </View>
                <View style={{ marginTop: hp('1%') }}>
                    <Button
                        title={lng.cancle}
                        Outline={true}
                        titleStyle={{ color: '#003764' }}
                        buttonStyle={{
                            ...style.btnRounded,
                            ...style.btnPrimaryOutline
                        }}
                        onPress={() => this.setState({ visibleModalPostandRead: false })}
                    />
                </View>
                </KeyboardAvoidingView>
            </Overlay>
        )
    }

    showSuccessModal() {
        const { successModal,lng } = this.state
        return (
            <Overlay
                isVisible={ successModal }
                overlayStyle={{
                    width: wp('90%'),
                    paddingVertical: hp('2%'),
                    paddingHorizontal: hp('2%')
                }}
            >
                <>
                    <Icon name="check-circle" size={hp('12%')} style={{ alignSelf: "center" }} color="#30D100"/>
                    <Text style={{ marginTop: 20, textAlign: 'center' }}>
                    {lng.sucess_change_role}
                    </Text>
                    <View style={{
                        marginTop: hp('3%')
                    }}>
                        <Button
                            title="Done"
                            buttonStyle={{
                                ...style.btnRounded,
                                ...style.btnPrimary
                            }}
                            onPress={() => this.setState({successModal: false})}
                        />
                    </View>
                </>
            </Overlay>
        )
    }

    renderChangeTypeOfUser() {
        const { visibleChangeTypeOfUser, lng } = this.state
        return (
            <Overlay
                isVisible={visibleChangeTypeOfUser}
                onBackdropPress={() => this.setState({ visibleChangeTypeOfUser: false })}
                overlayStyle={{ width: '90%', padding: hp('2%') }}
            >
                <>
                <Text style={{ fontSize: hp('2%'), textAlign: 'center', color: '#003764' }}>{lng.change_type_of_account}</Text>
                <View style={{ ...style.divider, marginVertical: hp('1%') }}></View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                <TouchableOpacity
                    style={{ width: '49%' }}
                    onPress={() => this.confirmReadOnly() }
                    >
                        <View style={{ ...styleScoped.option, backgroundColor: this.state.readButtonColor }}>
                            <Icons name="description" size={hp('12%')} style={{ alignSelf: "center" }} color={ this.state.readTextColor } />
                        </View>
                        <Text style={{
                            marginTop: hp('3%'),
                            textAlign: 'center',
                            fontSize: hp('2%'),
                            color: '#000000'
                        }}>{lng.read_only}</Text>
                    </TouchableOpacity>
 
                    <TouchableOpacity
                        style={{ width: '49%' }}
                        onPress={ () => this.confirmPostRead() }
                    >
                        <View style={{ ...styleScoped.option, backgroundColor: this.state.postButtonColor }}>
                            <Icons 
                            name="create" size={hp('12%')} 
                            style={{ alignSelf: "center" }} 
                            color={ this.state.postTextColor } />
                        </View>
                        <Text style={{
                            marginTop: hp('3%'),
                            textAlign: 'center',
                            fontSize: hp('2%'),
                            color: '#000000'
                        }}>{lng.post_and_read}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: hp('2%') }}>
                    <Button
                        title={lng.continue}
                        buttonStyle={{
                            padding: hp('1%'),
                            ...style.btnRounded,
                            ...style.btnPrimary
                        }}
                        onPress={() => this.saveTypeOfUser()}
                    />
                    <View style={{ marginTop: hp('1%') }}></View>
                    <Button
                        title={lng.cancle}
                        Outline={true}
                        titleStyle={{ color: '#003764' }}
                        buttonStyle={{
                            ...style.btnPrimaryOutline,
                            ...style.btnRounded
                        }}
                        onPress={() => this.setState({ visibleChangeTypeOfUser: false })}
                    />
                </View>
                </>
            </Overlay>
        )
    }

    async saveTypeOfUser() {
        await this.setState({
            visibleModalPostandRead: false,
            visibleChangeTypeOfUser: false,
            successModal: true
        })
        await this.requestChangeRole('read,post_read')
    }

    async confirmReadOnly () {
        await this.setState({
            readButtonColor: colors.primary,
            readTextColor: '#fff',
            postButtonColor: '#fff',
            postTextColor: colors.primary,
            visible: true, 
            visibleChangeTypeOfUser: false,
            type: 'read',
            successModal: true,
            userObject: {
                ...this.state.userObject,
                user_type: 'read'
            }
        })
        await this.requestChangeRole('read')
    }

    async confirmPostRead () {
        await this.setState({
            readButtonColor: '#fff',
            readTextColor: colors.primary,
            postButtonColor: colors.primary,
            postTextColor: '#fff',
            visible: true,
            visibleModalPostandRead: true,
            type: 'read',
            successModal: false,
            userObject: {
                ...this.state.userObject,
                user_type: 'read'
            }
        })
        
        await this.continueTypeOfUser('read,post_read')
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
            await AsyncStorage.removeItem('user_data');
            await AsyncStorage.setItem('user_data', JSON.stringify( userObject ) );
            await Actions.pop({refresh:{}});
        } else {
            alert('Update fail.');
        }
    };

    render() {
        const { userObject, lng } = this.state;
        
        return (
            <View style={{ flex: 1 }}>
                {
                    this.showSuccessModal()
                }
                <ScrollView style={{ flex: 1, backgroundColor: 'white', ...style.marginHeaderStatusBar }}>
                    <View style={{ backgroundColor: 'white', paddingBottom: hp('2%'), marginBottom: hp('2%') }}>
                        <View style={{ ...style.navbar }}>
                            <Icon name="chevron-left" size={hp('3%')} color="white" onPress={() => Actions.pop({refresh:{}})} />
                            <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.edit_profile}</Text>
                            <TouchableOpacity
                                onPress={() => this.callEditProfile()}
                            >
                                <Text style={{ fontSize: hp('2.2%'), color: 'white' }}>{lng.save}</Text>
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
                                <Text style={{ fontSize: hp('2.5%') }}>{lng.name}</Text>
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
                                <Text style={{ fontSize: hp('2.2%') }}>{lng.contact_me}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                
                                <TextInput
                                    style={{ ...style.customInput, width: '100%' }}
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
                                <Text style={{ fontSize: hp('2.2%') }}>{lng.professional}</Text>
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
                                <Text style={{ fontSize: hp('2.2%') }}>{lng.organization}</Text>
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
                                <Text style={{ fontSize: hp('2.2%') }}>{lng.position}</Text>
                            </View>
                            <TextInput
                                style={{ ...style.customInput, width: '100%' }}
                                value={userObject.position}
                                onChangeText={ (value) => this.setState({userObject: { ...userObject, position: value } }) }
                            />
                        </View>
                            {
                                userObject.user_role == 'Member' &&
                                <>
                                <View style={{ marginTop: hp('2%') }}>
                                    <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: hp('1%') }}>
                                        <Icon name="account-group" size={hp('3%')} color="#003764" style={{ marginRight: hp('2%') }} />
                                        <Text style={{ fontSize: hp('2.2%') }}>{lng.type_of_user}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#707070', fontWeight: '300' }}>{ userObject.user_type }</Text>
                                        <TouchableOpacity
                                            style={{ padding: hp('1%'), paddingHorizontal: hp('2%'), backgroundColor: '#427AA1', borderRadius: 20 }}
                                            onPress={() => this.setState({ visibleChangeTypeOfUser: true })}
                                        >
                                            <Text style={{ color: "white" }}>{lng.change}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ marginTop: hp('2%') }}>
                                    <Text style={{ fontSize: hp('1.7%'), width: '70%', color: '#707070' }}>{lng.edit_profile_footer}</Text>
                                </View>
                                </>
                            }
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


