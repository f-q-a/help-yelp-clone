import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinesses } from '../../store/business'
import SearchResults from "./SearchResults";
import SearchIcon from '@material-ui/icons/Search';

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
      let inserted = false;
      tempArr = tempArr.filter(el => typeof (el) === "string");

      for (let i = 0; i < tempArr.length; i++) {
        console.log(tempArr[i])
        console.log(tempArr)
        console.log(category)

        if (tempArr[i].toLowerCase().indexOf(search.toLowerCase()) !== -1 || category.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          temp.push({ ...el })
          inserted = true;
          break;

        }


      }
      if (!inserted) {
        for (let i = 0; i < el['services'].length; i++) {
          console.log(el['services'][i])
          if (el[`services`][i]['desc'].toLowerCase().indexOf(search.toLowerCase()) !== -1 && !temp.includes(el)) {
            temp.push({ ...el })

          }
        }
      }


    }

    )
    // temp = temp.filter((el, idx, self) =>
    //   idx === self.findIndex((t) => (
    //     t['id'] === el["id"] && t['business_name'] === el['business_name']
    //   ))
    // ) //This code is based on an answer from user Eydrian on Github (https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects), check to see if it's ok to use it before putting it in the final product.
    setSearchResults([...temp])

    // setSearchResults(businesses.filter(el => el.includes(search)));
  }

  if (businesses) {

  }
  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/business/");
      const responseData = await response.json();
      setBusinesses(responseData);
    }
    fetchData();
  }, []);

  {
    return businesses ? (
      <div className='main-splash__container'>
        <div className='main-splash__header'>help</div>
        <div className='main-splash__main'>
          <h4 className='main-splash__help-text'>Search for businesses by name, category, or services rendered</h4>
          <div className='search-container'>
            <form className='main-splash__content' onSubmit={handleSubmit}>
              <input
                className='main-splash__searchbar'
                name="search"
                type="text"
                placeholder="Plumbing, Electrician, Construction, Floorcare, etc."
                value={search}
                onChange={handleChange}
              />
              <button className='search__button' type='submit'>{<SearchIcon classes={{ root: "test__element", }} />}</button>
            </form>
            <div className='search-container__results'>
              {searchResults.map((business, idx) => <div className='search' key={idx}> <SearchResults business={business} /> </div>)}
            </div>
          </div>
        </div>
      </div>
    ) : (<div>Loading...</div>)
  }

}
export default Splash;
