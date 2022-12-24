import React, {useState, useEffect} from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';

import {
    LoginPage,
    SignupPage,
    MyPage,
    GuestPage,
    PasswordPage
} from '../components/pages'

import {checkAuth} from '../apis/common-requests'


const AppRoutes = () => {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        checkAuth()
        .then(bool => setAuth(bool));
    }, []);


    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={auth? <MyPage /> : <LoginPage />} />
            <Route path="/guest" element={<GuestPage />} />
            <Route path="/signup" element={<SignupPage />}/>
            <Route path="/password" element={<PasswordPage />} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
