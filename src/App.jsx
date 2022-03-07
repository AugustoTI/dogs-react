import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Error404 } from './components/Error404/Error404';

import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { ProtectedRoute } from './components/helper/ProtectedRoute';
import { Photo } from './components/photo/Photo';

import { GlobalProvider } from './contexts/glovalProvider/GlobalProvider';

import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { User } from './pages/user/User';
import { UserProfile } from './pages/user/userProfile/UserProfile';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalProvider>
          <Header />
          <main className="AppBody">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login/*" element={<Login />} />
              <Route
                path="conta/*"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />
              <Route path="foto/:id" element={<Photo />} />
              <Route path="perfil/:user" element={<UserProfile />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </main>
          <Footer />
        </GlobalProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
