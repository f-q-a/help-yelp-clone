import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './styles/navbar.css';
import DemoLogin from './auth/DemoLogin';
import AddBusiness from './BusinessPage/AddBusiness';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  return (
    <div className='navbar'>
      <ul className='navbar__item-container'>
        <li className='navbar__item'>
          <NavLink className='' to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className='navbar__item'>
          <NavLink className='' to='/users' exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        {sessionUser ? (
          <>
            <li className='navbar__item'>
              <NavLink className='' to='/new-business' exact={true} activeClassName='active'>
                Add Business
              </NavLink>
            </li>
            <li className='navbar__item'><LogoutButton /> </li>
          </>
        )
          :
          (<>
            <li className='navbar__item'>
              <NavLink className='' to="/sign-up" exact={true} activeClassName="active">
                Sign Up
              </NavLink>
            </li>
            <li className='navbar__item'>
              <NavLink className='' to="/login" exact={true} activeClassName="active">
                Login
              </NavLink>
            </li>
          </>
          )
        }

      </ul>
    </div>
  );
}

export default NavBar;
