export default function SearchBar() {
    return (
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
          {searchResults.map((business, idx) => <SearchContainer key={idx} {...business}/>)}
        </div>
      );
  }
