import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import '../styles/form.css'

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data.errors) {
        setErrors(data.errors);
      }
    } else {
      setErrors([...errors, 'Password and Repeat Password do not match, please fix this and try again.'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className='form__container'>
      <form onSubmit={onSignUp}>
        <div className='input__container'>
          <h2>Signup</h2>
          <div>
            {errors.map((el, idx) => {
              return (<div key={idx}>{el}</div>)
            })}
          </div>
          <div className='form__input'>
            <label>User Name</label>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className='form__input'>
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='form__input'>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='form__input'>
            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className='form__input button__container'>
            <button className='form__button' type="submit">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
