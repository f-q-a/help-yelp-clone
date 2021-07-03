import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Splash() {
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const businesses  = useSelector(state => state.business)
  const [searchResults, setSearchResults] = useState([]);
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();
    const handleSubmit = (e) => {
        e.preventDefault()
    }
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
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="search">Search</label>
            <input
              name="search"
              type="text"
              placeholder="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </form>
  );
}
export default Splash;
