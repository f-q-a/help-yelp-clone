import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router";
import { Redirect } from "react-router";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <a href='' className='button__logout' onClick={onLogout}>Logout</a>;
};

export default LogoutButton;
