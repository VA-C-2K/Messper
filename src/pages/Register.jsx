import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { setDoc, doc, Timestamp } from 'firebase/firestore';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import './css/Login.css';

const Register = () => {
    const history = useNavigate();
    const [namevalidate, setNameValidate] = useState(false);
    const [pwdvalidate, setPwdValidate] = useState(false);
    const [emailvalidate, setEmailValidate] = useState(false);

    const emailvalidationmsg = () => toast.error("Email is Invalid!");
    const notifyNameValidation = () => toast.error("Name should contain more than 5 Characters!");
    const notifyPasswordValidation = () => toast.error("Password should length should be more than 8!");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
    });

    const { name, email, password, error, loading } = data;

    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const validateName = () => {
            if (name.length < 5) {
                setNameValidate(false);
                notifyNameValidation();
            }
            else {
                setNameValidate(true);
            }
    }
    const checkEmail = (email) => {
        //eslint-disable-next-line
        return email.match(
            //eslint-disable-next-line
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    function checkPwd(str) {
        if (str.length < 8) {
            return ("Password too short!");
        } else if (str.length > 20) {
            return ("Password too long!");
        } else if (str.search(/\d/) === -1) {
            return ("Please use digits in password!");
        } else if (str.search(/[a-zA-Z]/) === -1) {
            return ("Please use letters in password!");
            //eslint-disable-next-line
        } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) !== -1) {
            return ("Please use special characters in password!");
        }
        return ("ok");
    }
    const validateEmail = () => {

        if (!email) {
            setEmailValidate(false);
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
    const validatePassword = () => {
        if (!password) {
           
            setPwdValidate(false);
        } else {
            let msg = checkPwd(password);
            if (msg !== "ok") {
                setPwdValidate(false);
                const paswordmsg = () => toast.warning(msg);
                paswordmsg();
            }
            else {
                setPwdValidate(true);
            }
        }
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setData({ ...data, error: null, loading: true });
        if (!name || !email || !password) {
            setData({ ...data, error: "All fields are required" });
        }
        if (namevalidate && pwdvalidate && emailvalidate) {
            try {
                const result = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                await setDoc(doc(db, "users", result.user.uid), {
                    uid: result.user.uid,
                    name,
                    email,
                    createdAt: Timestamp.fromDate(new Date()),
                    isOnline: true,
                });
                setData({
                    name: "",
                    email: "",
                    password: "",
                    error: null,
                    loading: false,
                });
                history("/");
            }
            catch (err) {
                setData({ ...data, error: err.message, loading: false });
            }
        }
        else {
            if (!namevalidate) notifyNameValidation();
            if (!pwdvalidate) notifyPasswordValidation();
            if (!emailvalidate) emailvalidationmsg();
        }
    }
    return (
        <div className="Login">
            <div className='login_container'>
                <div className='login_text'>Create An Account</div>
                <ToastContainer
                    position="bottom-left"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                />
                <div className="login_page">
                    <div className="login_title">
                        Messenger
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <input type="text" placeholder='Name' name="name" value={name} onChange={handleChange} onBlur={validateName} />
                        <input type="email" placeholder='Email' name="email" value={email} onChange={handleChange} onBlur={validateEmail} />
                        <input type="password" placeholder='Password' name="password" value={password} onChange={handleChange} onBlur={validatePassword} />
                        {error ? <p className="error">{error}</p> : null}
                        <button className="btn" disabled={loading}>
                            {loading ? 'Creating ...' : 'Register'}
                        </button>
                        
                    </form>
                    <div className="signup">
                        <p>Already have an account?</p>
                        <Link to="/login">LogIn</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;