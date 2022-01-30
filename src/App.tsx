import React, {useState, useEffect} from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import MyPage from './components/pages/MyPage';
import ChangeProfilePage from './components/pages/ChangeProfilePage';
import GuestPage from './components/pages/GuestPage';

import {checkAuth} from './utils/common-requests';


const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    checkAuth()
    .then(bool => setAuth(bool));

  }, []);

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={auth? <MyPage /> : <LoginPage />} />
        <Route path="/guest" element={<GuestPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/changeprofile" element={<ChangeProfilePage />} />　
        <Route element={<LoginPage />} />　　
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
