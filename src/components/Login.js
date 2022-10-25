import {Link as LinkR,useNavigate,useLocation} from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Lendsqrlogo from "./reusables/Lendsqrlogo";
import login_vector from '../svgs/login_vector.svg';
import { useRef, useState, useEffect} from "react";

const Login = () => {
    //required states
    const navigate = useNavigate();
    const location = useLocation();
    // set location path to where user is coming from or if user is just logging in send user to home.
    const from = location.state?.from?.pathname || "/dashboard";

    const emailRef = useRef();
    const {setAuth,saveToStorage} = useAuth();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [typePwd, setTypePwd] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    //focus on Email field when screen loads
    useEffect(() => {
        emailRef.current.focus();
    }, [])

    
    //API url 
    const API_URL = 'https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users';

    // Handling Form Submission
    const handleSubmit = async (e)=>{
        e.preventDefault()
        //user auth data
        const user = {email,pwd,admin:true}
        setIsLoading(true)
        try {
            const response = await fetch(API_URL);
            if(!response.ok) throw Error ('Did not receive data');
            //mutating returned response to add status states
            let Data = await response.json();
            Data = Data.map(item =>( 
                {
                    ...item,
                    status:{active:false,blacklist:false}
                } 
            ));
            saveToStorage(Data);
            //set Auth state and clear inputs
            setAuth(user);
            setEmail('');
            setPwd('');

            setFetchError(null);
            //send user to where user is coming from or home page
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err.message);
            setFetchError(err.message);
        }finally{
            setIsLoading(false)
        }
        
    }

  return (
    <section className='Login'>
        <div className="Login__container">
            {/* login-page left col */}
            <div className="Login__left">

                <div className="Login__left-wrapper">
                    <Lendsqrlogo/>
                    <div className="Login__left-center">
                        <img src={login_vector} alt="svg-center" />
                    </div>
                </div>
                
            </div>
            {/* login-page right col */}
            <div className="Login__right">
                <div className="Login__right-wrapper">
                    <h1>Welcome!</h1>

                    <p style={fetchError ? {
                        color:'rgb(177, 53, 53)'
                    }: {
                        color:'#213F7D'
                    }}>
                        {!fetchError ? 'Enter details to login.'
                            : `${fetchError}, check your connection`
                        }
                    </p>

                    <form onSubmit={handleSubmit}>

                        <span className="input-wrapper">
                            <label htmlFor="email">
                                Email: 
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                ref={emailRef}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </span>

                        <span className="input-wrapper">
                            <label htmlFor="password">
                                Password: 
                            </label>
                            <input
                                type={typePwd? 'password':'text'}
                                id="password"
                                placeholder="Password"
                                autoComplete="off"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <span className="show-password" onClick={()=>setTypePwd(!typePwd)}>
                                {typePwd? 'SHOW': 'HIDE'}    
                            </span>
                        </span>

                        <span className="forgot-pwd">
                            <LinkR to="/">forgot password?</LinkR>
                        </span>

                        <button disabled={!email || !pwd  ? true : false}>{isLoading ?'...connecting' :'Log in'}</button>
                    </form>


                </div>
            </div>
        </div>
    </section>
  )
}

export default Login