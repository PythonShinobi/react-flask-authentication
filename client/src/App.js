// client/src/App.js
import React, { memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './authContext';

import Home from './home/Home';
import Login from './login/Login';
import Register from './register/Register';
import PageNotFound from './404/PageNotFound';

// Memoized components
const MemoizedComponents = {
  Home: memo(Home),
  Register: memo(Register),
  Login: memo(Login),
  PageNotFound: memo(PageNotFound),
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Routes>
            <Route path='/' element={<MemoizedComponents.Home />} />
            <Route path='/register' element={<MemoizedComponents.Register />} />
            <Route path='/login' element={<MemoizedComponents.Login />} />
            <Route path='*' element={<MemoizedComponents.PageNotFound />} />
          </Routes>          
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default memo(App);