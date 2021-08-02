import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './styles/user.css';

function User() {
  const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className='user__container'>
      <h2>{user.username}</h2>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
    </div>
  );
}
export default User;
