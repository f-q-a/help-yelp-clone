import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinesses } from '../../store/business'
import SearchResults from "./SearchResults";

function Splash() {

  const [search, setSearch] = useState('');
  const [businesses, setBusinesses] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault();
    let temp = [];
    businesses.forEach(el => {
      let tempArr = [...Object.values(el)];

      tempArr = tempArr.filter(el => typeof (el) === "string");

      for (let i = 0; i < tempArr.length; i++) {
        console.log(tempArr[i])

        if (tempArr[i].toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          temp.push({ ...el })

        }


      }

    }

    )
    setSearchResults([...temp])

    const categoryFilter = () => {
    }

    // setSearchResults(businesses.filter(el => el.includes(search)));
  }
  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/business/");
      const responseData = await response.json();
      const serviceRes = await fetch("/api/services/");
      const serviceData = await serviceRes.json();
      setBusinesses(responseData.businesses);
    }
    fetchData();
  }, []);

  {
    return businesses ? (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="search">Search</label>
            <input
              name="search"
              type="text"
              placeholder="search"
              value={search}
              onChange={handleChange}
            />
            <button type='submit'>Submit</button>
          </div>
        </form>
        {searchResults.map((business, idx) => <div key={idx}> <SearchResults business={business} /> </div>)}
      </div>
    ) : (<div>Loading...</div>)
  }

}
export default Splash;
