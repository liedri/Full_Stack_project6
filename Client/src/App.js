import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './components/login';
import Info from './components/info';
import Todos from './components/todos';
import Posts from './components/posts';
import Photos from './components/photos';
import Albums from './components/albums';
import Application from './components/Application';

export const userContext = React.createContext();

function App() {

  const [userInfo, setUserInfo] = useState({});

  return (
    <userContext.Provider value={userInfo}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LoginPage setUserInfo={setUserInfo} />} />
          <Route exact path='/login' element={<LoginPage setUserInfo={setUserInfo} />} />

          <Route path='/application/:id' element={<Application />} >
            <Route index path="/application/:id/info" element={<Info />} />
            <Route path="/application/:id/todos" element={<Todos />} />
            <Route path="/application/:id/posts" element={<Posts />} />
            <Route path="/application/:id/albums" element={<Albums />} />
            <Route path="/application/:id/albums/:id/photos" element={<Photos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
};

export default App;
