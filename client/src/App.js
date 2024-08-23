import React, { memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './authContext';

import Home from './home/Home';
import Login from './login/Login';
import Register from './register/Register';
import PageNotFound from './404/PageNotFound';
import Profile from './profile/Profile';
import PrivateRoute from './PrivateRoute';

// Memoized components
const MemoizedHome = memo(Home);
const MemoizedRegister = memo(Register);
const MemoizedLogin = memo(Login);
const MemoizedProfile = memo(Profile);
const MemoizedPageNotFound = memo(PageNotFound);

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Routes>
            <Route path='/' element={<MemoizedHome />} />
            <Route path='/register' element={<MemoizedRegister />} />
            <Route path='/login' element={<MemoizedLogin />} />
            <Route
              path='/profile'
              element={<PrivateRoute element={MemoizedProfile} />}
            />
            <Route path='*' element={<MemoizedPageNotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;