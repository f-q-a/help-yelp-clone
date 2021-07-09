import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useHistory } from "react-router";
import { Redirect } from "react-router";

const DemoLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onDemoLogin = async (e) => {
    await dispatch(login('demo@aa.io', 'password'));
  };

  return <button onClick={onDemoLogin}>Demo Login</button>;
};

export default DemoLogin;
