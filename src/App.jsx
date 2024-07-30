import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import { useState,useEffect } from 'react';

import {Routes, Route} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './components/Login';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn?
      <MainLayout>
      <Routes>
      <Route exact path="/" Component={Home}>
      </Route>
      <Route path="/about" Component={About}>
      </Route>
    </Routes>
    </MainLayout>:<Login setIsLoggedIn={setIsLoggedIn}/> }
    </div>
  );
}

export default App;
