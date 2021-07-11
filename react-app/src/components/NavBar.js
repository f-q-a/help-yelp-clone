import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DemoLogin from './auth/DemoLogin';


const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)



    return (sessionUser ? (
      <div className='relative flex items-center justify-between h-16 bg-red-500 py-2'>
        <div className='align-start	overflow-hidden duration-500 ease-in-out hover:text-white transform hover:scale-110 active:text-white active:scale-110'>
        <NavLink  to="/" exact={true}>
          Home
        </NavLink>
        </div>
        <div className='justify-start	overflow-hidden duration-500 ease-in-out hover:text-white transform hover:scale-110 active:text-white active:scale-110'>
          <NavLink  to="/users" exact={true}>
            Users
          </NavLink>
        </div>
        <div>
          <div className='justify-center text-white text-lg'>
            HELP
        </div>
        </div>
        <div className='justify-end overflow-hidden duration-500 ease-in-out hover:text-white transform hover:scale-110 active:text-white active:scale-110'>
          <NavLink  to="/sign-up" exact={true}>
            Sign Up
          </NavLink>
        </div>
        <div className='align-end overflow-hidden transition duration-500 ease-in-out hover:text-white transform hover:scale-110 active:text-white active:scale-110'>
          <LogoutButton />
        </div>
      </div>
      ) : (
      <div className='grid grid-cols-7 overflow-hidden bg-red-500 '>
      <div className='col-start-1	overflow-hidden duration-500 ease-in-out hover:text-white transform hover:scale-110 active:text-white active:scale-110'>
      <NavLink  to="/" exact={true}>
        Home
      </NavLink>
      </div>
      <div className='col-start-2	overflow-hidden duration-500 ease-in-out hover:text-white transform hover:scale-110 active:text-white active:scale-110'>
        <NavLink  to="/users" exact={true}>
          Users
        </NavLink>
      </div>
      <div className='col-start-6 overflow-hidden duration-500 ease-in-out hover:text-white transform hover:scale-110 active:text-white active:scale-110'>
        <NavLink  to="/sign-up" exact={true}>
          Sign Up
        </NavLink>
      </div>
        <div className='col-start-7 overflow-hidden duration-500 ease-in-out hover:text-white transform hover:scale-110 active:text-white active:scale-110'>
          <NavLink to="/login" exact={true}>
            Login
          </NavLink>
        </div>
        <div>
          <DemoLogin />
        </div>
        </div>
      )
      );
}

export default NavBar;
