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
      let serviceArr = [...Object.values(el['services'])]
      let category = el['category'];
      tempArr = tempArr.filter(el => typeof (el) === "string");

      for (let i = 0; i < tempArr.length; i++) {
        console.log(tempArr[i])
        console.log(tempArr)
        console.log(category)

        if (tempArr[i].toLowerCase().indexOf(search.toLowerCase()) !== -1 || category['name'].toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          temp.push({ ...el })

        }


      }

      for(let i = 0; i < el['services'].length; i++){
        console.log(el['services'][i])
        if(el[`services`][i]['desc'].toLowerCase().indexOf(search.toLowerCase()) !== -1 && !temp.includes(el)){
          temp.push({...el})
        }
      }

    }

    )
    temp = temp.filter((el, idx, self) =>
      idx === self.findIndex((t) => (
        t['id'] === el["id"] && t['business_name'] === el['business_name']
      ))
    ) //This code is based on an answer from user Eydrian on Github (https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects), check to see if it's ok to use it before putting it in the final product.
    setSearchResults([...temp])

    // setSearchResults(businesses.filter(el => el.includes(search)));
  }
  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/business/");
      const responseData = await response.json();
      console.log(responseData)
      setBusinesses(responseData);
    }
    fetchData();
  }, []);

  {
    return businesses ? (
      <div className='flex h-screen'>
        <form onSubmit={handleSubmit} className='left-200'>
          <div className='flex items-center rounded-full shadow-xl'>
            <input className='w-full rounded p-2 w-200'
              name="search"
              type="text"
              placeholder="search"
              value={search}
              onChange={handleChange}
            />
            <button type='submit' className='materials-ui'><i className="material-icons">search</i></button>
          </div>
        </form>
        {searchResults.map((business, idx) => <div key={idx}> <SearchResults business={business} /> </div>)}
      </div>
    ) : (<div>Loading...</div>)
  }

}
export default Splash;
