import React, {useState, useEffect} from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';

import {
    GuestPage,
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
            <Route path="/" element={<GuestPage />} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
