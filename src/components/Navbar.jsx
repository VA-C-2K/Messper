import React, { useContext, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../context/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from "./svg/logo.png";
import './css/Navbar.css';
const Navbar = () => {
  const history = useNavigate();
  let location = useLocation();
  const [currentLocation, setCurrentLocation] = useState("");
  const { user } = useContext(AuthContext);
  const handleSignOut = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false,
    })
    await signOut(auth);
    history("/login");
  }
  useLayoutEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location.pathname]);
  return (
    <>
      {currentLocation !== "/login" || currentLocation !== "/register" ? (
        <div className="nav">
          {user ? (
            <> 
            <ul>
              <li className="logo">
                <Link to="/"> Messper</Link>
              </li>
              <li> </li>
              <li> </li>
              <li> </li>
              <li> </li>
              <li> </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button className="btn" onClick={handleSignOut}>Logout</button>
                </li>
              </ul>
            </>
          ) : (
            <>
            </>
          )}
        </div>
      ) : null}
    </>
  )
}

export default Navbar