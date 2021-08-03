import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './styles/userslist.css';
function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <li className='user-list__user' key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1 className='user-list__header'>User List</h1>
      <div className='user-list__container'>
        <ul className='user-list__list'>{userComponents}</ul>
      </div>

    </>
  );
}

export default UsersList;
