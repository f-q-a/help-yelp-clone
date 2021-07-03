import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";

const SearchForm = () => {
  const [search, setSearch] = useState("");

  const onSubmit= (e) => {
    dispatch(getSearchResults)
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor="Search Terms">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={search}
          onChange={setSearch}
        />
      </div>
        <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
