import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import '../styles/login.css';

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='login__container'>
      <div className='login__main'>
        <div className='login__form-container'>
          <form onSubmit={onLogin} className='login__form'>
            <div className='login__form-email'>
              <label htmlFor="email">Email</label>
              <input
                className='login__email-input'
                name="email" bn
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='login__form-password'>
              <label htmlFor="password">Password</label>
              <input
                className='login__password-input'
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
              <button type="submit" className=''>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
