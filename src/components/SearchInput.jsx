import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('author');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Pass the search term and search type to the parent component
    onSearch(searchTerm, searchType);
  };

  return (
    <div className="my-4">
      <form onSubmit={handleSearchSubmit}>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder={`Search by ${searchType === 'author' ? 'Author' : 'Title'}`}
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded"
          />

          <select
            value={searchType}
            onChange={handleTypeChange}
            className="px-4 py-2 border rounded"
          >
            <option value="author">Author</option>
            <option value="title">Title</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-wblack px-4 py-2 rounded hover:bg-white hover:border"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;