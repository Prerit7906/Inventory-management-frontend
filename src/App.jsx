import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import { useState,useEffect } from 'react';

import {Routes, Route} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './components/Login';
import ViewProducts from './pages/ViewProducts';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn?
      <MainLayout>
      <Routes>
      <Route exact path="/"  element={<Home />}>
      </Route>
      <Route path="/about" element={<About />}>
      </Route>
      <Route path="/viewProducts"  element={<ViewProducts />}>
      </Route>
    </Routes>
    </MainLayout>:<Login setIsLoggedIn={setIsLoggedIn}/> }
    </div>
  );
}

export default App;
