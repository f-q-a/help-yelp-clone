import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  return (
    <nav>
      <ul className='grid grid-cols-8 bg-red-500'>
        <li>
          <NavLink className='col-start-1 col-end-3' to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className='' to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <NavLink className='col-start-7 col-end-8' to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>


          {sessionUser ? <li><LogoutButton /> </li> : <NavLink className='col-start-5 col-end-6' to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>}

      </ul>
    </nav>
  );
}

export default NavBar;
