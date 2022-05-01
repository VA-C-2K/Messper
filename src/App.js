import './App.css';
import React, { useLayoutEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes,useLocation } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './context/auth';
import Pages from './pages/Pages';


function App() {
  return (
    <AuthProvider>
      <Router>
           <Pages/>                              
      </Router>
    </AuthProvider>
  );
}

export default App;
