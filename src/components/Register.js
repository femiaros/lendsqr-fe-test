import { useRef, useState, useEffect } from "react";
import useAuth from '../hooks/useAuth';
import autoPageUp from '../hooks/autoPageUp';
import {Link as LinkR} from "react-router-dom";
import Pageheader from "./Pageheader"
import {BsCheck} from 'react-icons/bs';
import {GrFormClose} from 'react-icons/gr';
import axios from "../api/axios";
// import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = ({items}) => {
    const pageHeader = items[0].registerPageHeader[0]
    const {setShowNav} = useAuth();

    const userRef = useRef();
    const errRef = useRef();
    const emailRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //focus on username field when screen loads
    useEffect(() => {
        userRef.current.focus();
        setShowNav(false);
        autoPageUp();
    }, [])
    //when username field changes, check if its a valid name
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    //when email field changes, check if its a valid name
    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    //when pwd and matchpwd field changes, check if valid
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]) 

    //clear out error msg any time user types input
    useEffect(() => {
        setErrMsg('');
    }, [user,email, pwd, matchPwd])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd, email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            // console.log(JSON.stringify(response?.data));
            console.log(response);
            //console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setEmail('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
           if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus(); 
        }
    }

  return (
    <>
        {success ?(
            <section className="Register">
                <div className="register-container">
                    <h1>Registration Successful</h1>
                    <p><LinkR to="/login">Sign In</LinkR></p>
                </div>
            </section>
        ) : (
            <section className="Register">
                <Pageheader pageHeader={pageHeader} />
                <div className="register-container">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username: 
                            <BsCheck className={validName ? "valid" : "hide"} />
                            <GrFormClose className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="email">
                            Email:
                            <BsCheck className={validEmail ? "valid" : "hide"} />
                            <GrFormClose className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            ref={emailRef}
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            autoComplete="off"
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                            Enter a valid Email
                        </p>

                        <label htmlFor="password">
                            Password:
                            <BsCheck className={validPwd ? "valid" : "hide"} />
                            <GrFormClose className={validPwd || !pwd ? "hide" : "invalid"} />
                            {/* {validPwd ? "good" : ""} 
                            {validPwd || !pwd ? "" : "bad"} */}
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <BsCheck className={validMatch && matchPwd ? "valid" : "hide"} />
                            <GrFormClose className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            {/* {validMatch && matchPwd ? "good" : ""}
                            {validMatch || !matchPwd ? "" : "bad"} */}
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                            Must match the first password input field.
                        </p>

                        <button disabled={!validName || !validEmail || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <LinkR to="/login">Sign In</LinkR>
                        </span>
                    </p>
                </div>
            </section>
        )}
    </>
  )
}

export default Register