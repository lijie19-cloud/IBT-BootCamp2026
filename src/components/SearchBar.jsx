function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="search-container">
      <label htmlFor="search">Search</label>

      <input
        id="search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBar;
