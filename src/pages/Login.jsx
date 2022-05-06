import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import './css/Login.css';
const Login = () => {
    const history = useNavigate();
    const [emailvalidate, setEmailValidate] = useState(false);

    const emailvalidationmsg = () => toast.error("Email is Invalid!");
    const notifyEmail = () => toast.warning("Please Enter Email");

    const [data, setData] = useState({
        email: "",
        password: "",
        error: null,
        loading: false,
    });

    const { email, password, error, loading } = data;

    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const checkEmail = (email) => {
        //eslint-disable-next-line
        return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const validateEmail = () => {

        if (!email) {
            setEmailValidate(false);
            notifyEmail();
        }
        else {
            if (!checkEmail(email)) {
                setEmailValidate(false);
                emailvalidationmsg();
            }
            else {
                setEmailValidate(true);
            }
        }

    }
    const handleSubmit = async e => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true });
        if (!email || !password) {
            setData({ ...data, error: "All fields are required" });
        }
        if (emailvalidate) {
            try {
                const result = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                await updateDoc(doc(db, "users", result.user.uid), {
                    isOnline: true,
                });
                setData({
                    email: "",
                    password: "",
                    error: null,
                    loading: false,
                });
                history("/");
            }
            catch (err) {
                console.log(err)
                setData({ ...data, error: err.message, loading: false });
            }
        }
        else {
            if (!emailvalidate) emailvalidationmsg();
            setData({ ...data, error: "The entered data is incorrect, Follow the instructions carefully", loading: false });
        }
    }
    return (
        <div className="Login">
            <div className='login_container'>
                <div className='login_text'>Log-in to Continue</div>
                <ToastContainer
                    position="bottom-left"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                />
                <div className="login_page">
                    <div className="login_title">
                    Messper
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder='Email' value={email} onChange={handleChange} onBlur={validateEmail} required />
                        <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} required />
                        {error ? <p className="error">{error}</p> : null}
                        <button className="btn" disabled={loading}>
                            {loading ? 'Logging in ...' : 'Login'}
                        </button>
                    </form>
                    <div className="signup">
                        <p>Don't have  an account?</p>
                        <Link to="/register" className="a">SignUp</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;