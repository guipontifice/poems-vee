import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import PoetryDisplay from './PoetryDisplay';
import imgLogo from '../../public/images/shakespeare-icon.jpg'

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('author');

  const handleSearch = (term, type) => {
    setSearchTerm(term);
    setSearchType(type);
  };

  return (
    <>
      <nav className="bg-gray p-4 font-sans">
        <div className="container mx-auto flex justify-between items-center font-sans font-medium text-md">
          <div className="flex items-center">
            <img
              src={imgLogo}  
              alt="Logo"
              className="rounded-md w-10 mr-2"
            />
            <span className="sm:hidden xs:hidden xxs:hidden text-black text-lg font-semibold">ArtVee</span>
          </div>
          <SearchInput onSearch={handleSearch} />
          <p className='sm:hidden xs:hidden xxs:hidden'>
            Discover Classical Poems
          </p>
        </div>
      </nav>
      <PoetryDisplay author={searchType} searchTerm={searchTerm} />
    </>
  );
};

export default Navbar;