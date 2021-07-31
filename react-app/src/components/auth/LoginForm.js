import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import '../styles/form.css';

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
    <div className='form__container'>

      <form onSubmit={onLogin} className='login__form'>
        <div className='input__container'>
          <h2>Login</h2>
          <div className='form__input'>
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
          <div className='form__input'>
            <label htmlFor="password">Password</label>
            <input
              className='login__password-input'
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />

          </div>
          <div className='form__input button__container'>
            <button className='form__button' type="submit">Login</button>
          </div>
        </div>
      </form>

    </div>
  );
};

export default LoginForm;
