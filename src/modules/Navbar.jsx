import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import PoetryDisplay from './PoetryDisplay';
// esse vira navbar 
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('author');

  const handleSearch = (term, type) => {
    setSearchTerm(term);
    setSearchType(type);
  };

  return (
    <>
      <nav className="bg-gray p-4 font-roboto">
        <div className="container mx-auto flex justify-between items-center font-roboto font-medium text-lg">
          <div className="flex items-center">
            <img
              src="../../src/images/shakespeare-icon.jpg"  // Replace with your logo URL
              alt="Logo"
              className="rounded-md w-10 mr-2"
            />
            <span className="text-black text-lg font-semibold">ArtVee</span>
          </div>
          <SearchInput onSearch={handleSearch} />
          Discover Classical Poems
        </div>
      </nav>
      <PoetryDisplay author={searchType} searchTerm={searchTerm} />
    </>
  );
};

export default Navbar;