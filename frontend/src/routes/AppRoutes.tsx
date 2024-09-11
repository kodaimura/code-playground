import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';

import {
    GuestPage,
} from '../components/pages'


const AppRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<GuestPage />} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
