import React from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux';


// Auth
import Login from './auth/Login'



const RouterPage = () => {
    return (
        
        <Router>
            <Stack key="root">
                <Scene initial  key="Login" component={Login} title="Login" hideNavBar />
            </Stack>
        </Router>

    );
};


export default RouterPage;