import React from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux';


// Auth
import Login from './auth/Login'
import Register from './auth/Register/Register'
import ChooseUserType from './auth/Register/ChooseUserType'
import RegisterSuccess from './auth/Register/Success'
import ForgetPassword from './auth/Login/ForgetPassword'
import Main from './Main'
import Activity from './Activity/Activity'
import MessageBoard from './Message/MessageBoard'
import CreatePost  from './Post/Create'
const RouterPage = () => {
    return (

        <Router>
            <Stack key="root">
                <Scene key="Login" component={Login} title="Login" hideNavBar initial />
                <Scene key="Register" component={Register} title="Register" hideNavBar />
                <Scene key="ChooseUserType" component={ChooseUserType} title="ChooseUserType" hideNavBar />
                <Scene key="RegisterSuccess" component={RegisterSuccess} title="RegisterSuccess" hideNavBar />
                <Scene key="ForgetPassword" component={ForgetPassword} title="ForgetPassword" hideNavBar />
                <Scene key="Main"     component={Main} title="Main" hideNavBar />
                <Scene key="Activity" component={Activity} title="Activity" hideNavBar />
                <Scene key="MessageBoard" component={MessageBoard} title="MessageBoard" hideNavBar />
                <Scene key="CreatePost" component={CreatePost} title="CreatePost" hideNavBar />



            </Stack>
        </Router>

    );
};


export default RouterPage;