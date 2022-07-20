import {useRef, useState, useEffect, useContext} from 'react';
import AuthContext from '../context/AuthProvider';
import {Link} from 'react-router-dom'

import axios from '../api/axios';
import Todo from './Todo';
const LOGIN_URL = '/login';

const Login = () => {
  const {setAuth} = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:4000/login', {
        email: email,
        password: pwd,
      
      })
      .then((result) => {
          // console.log(result.data);
        setSuccess(true)
        setAuth(true);
      })
      .catch((error) => {
        console.log(error);
        setErrMsg(error);
      });
  };
  

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to="/todo"> <Todo></Todo></Link>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
