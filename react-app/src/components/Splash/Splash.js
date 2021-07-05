import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinesses } from '../../store/business'
function Splash() {

    const [search, setSearch] = useState(' ');
    const [businesses, setBusinesses] = useState([])
    const [searchResults, setSearchResults] = useState([])
    console.log(businesses)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(businesses)
        let temp = [];
        businesses.forEach(el => {
            console.log(el)
            console.log(Object.values(el))
            if(Object.values(el).includes(search)){
                temp.append(el)
            }
            setSearchResults(temp)
        })
        // setSearchResults(businesses.filter(el => el.includes(search)));
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/business/");
      const responseData = await response.json();
      setBusinesses(responseData.businesses);
    }
    fetchData();
  }, []);

    {return businesses?(
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
          {searchResults.map((business, idx) => <div key={idx}>  {business.business_name} </div>)}
        </div>
    ): (<div>Loading...</div>)}

}
export default Splash;
