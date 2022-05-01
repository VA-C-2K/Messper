import React, { useLayoutEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes,useLocation } from "react-router-dom";
import PrivateRoute from '../components/PrivateRoute';
import Profile from './Profile';
import Home from './Home';
import Navbar from '../components/Navbar';
import Register from './Register';
import Login from './Login';

const Pages = () => {
    let location = useLocation();
    const [currentLocation, setCurrentLocation] = useState("");
    useLayoutEffect(() => {
        setCurrentLocation(location.pathname);
      }, [location.pathname]);
  return (
  <>
     {currentLocation === "/login" || currentLocation === "/register" ? (
        null
     ):<Navbar />}
        <Routes>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<Home />} />
          </Route>
          <Route  path='/profile' element={<PrivateRoute />}>
            <Route  path='/profile' element={<Profile />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes> 
    </> 
  )
}

export default Pages