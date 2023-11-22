import React, { useState, useEffect } from 'react';

const PoetryDisplay = ({ author, searchTerm }) => {
  const [poetryData, setPoetryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const poemsPerPage = 5;
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const indexOfLastPoem = currentPage * poemsPerPage;
  const indexOfFirstPoem = indexOfLastPoem - poemsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = 'https://poetrydb.org/';

        // Check if author and searchTerm are provided
        if (author && searchTerm) {
          apiUrl += `${author}/${searchTerm}`;
        } else {
          // Fetch default poems if author or searchTerm is not provided
          apiUrl += 'random/50'; // Adjust the number of default poems as needed
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        setPoetryData(data);
      } catch (error) {
        console.error('Error fetching poetry data:', error);
      }
    };

    fetchData();
  }, [author, searchTerm]);

  const poemsToDisplay = () => {
    const indexOfLastPoem = currentPage * poemsPerPage;
    const indexOfFirstPoem = indexOfLastPoem - poemsPerPage;
    const filteredPoems = showFavoritesOnly
      ? getFavoritePoems()
      : poetryData;

    return filteredPoems.slice(indexOfFirstPoem, indexOfLastPoem);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo({ top: 5, behavior: 'smooth' })
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo({ top: 5, behavior: 'smooth' })
  };
  const handleCopyPoem = (poemText) => {
    const textarea = document.createElement('textarea');
    textarea.value = poemText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };
  const handleToggleFavoritesOnly = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
    setCurrentPage(1); // Reset current page when toggling to show only favorites
  };
  const getFavoritePoems = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites;
  };

  const isPoemFavorited = (poem) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some((favorite) => favorite.title === poem.title);
  };

  const handleFavoritePoem = (poem) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const isPoemInFavorites = favorites.some((favorite) => favorite.title === poem.title)
    if (!isPoemInFavorites) {
      favorites.push(poem);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Poem added to favorites');
    } else {
      alert('Poem is already in favorites')
    }
  }
  return (
    <>
      <div className="flex justify-around mb-2 font-playfair">
        <button onClick={handleToggleFavoritesOnly}>
          {showFavoritesOnly ? 'Show All Poems' : 'Show Favorites Only'}
        </button>
        <div className='flex justify-end mr-36'>Show: <p>5</p>/<p>10</p>/<p>15</p></div>
      </div>
      <div className={`flex justify-center mt-4`}>
        <button
          onClick={() => handlePreviousPage()}
          disabled={currentPage === 1}
          className={`bg-blue-500 text-black px-4 py-2 rounded ${poemsToDisplay().length <= 5 ? 'text-gray' : 'text-black'}`}
        >
          <ion-icon name="chevron-back-outline"></ion-icon>
        </button>
        <button
          onClick={handleNextPage}
          disabled={poetryData.length / poemsPerPage > 100 }
          className={`bg-blue-500 text-black px-4 py-2 rounded mr-2 ${poetryData.length < 5 || poemsToDisplay().length < 5 ? 'text-gray' : 'text-black'}`}
        >
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
      <div className='flex justify-center'>
        <div className='flex align-center font-roboto'>
          {poemsToDisplay().length > 0 ? (
            <ul className=''>
              {
                poemsToDisplay().map((poem, index) => (
                  <li key={index} className='mt-20 hover:bg-gray p-10 rounded-lg'>
                    <h1 className=' font-bold'>{poem.title}</h1>
                    <h2 className='text-sm font-medium text-black'>{poem.author}</h2>
                    {poem.lines.map((line, lineIndex) => (
                      <p key={lineIndex} className='font-normal '>{line}</p>
                    ))}
                    <div className='flex justify-end mt-3'>
                      <button
                        className='w-12'
                        onClick={() => handleCopyPoem(poem.lines.join('\n'))}
                      >
                        <ion-icon name="copy-outline"></ion-icon>
                      </button>
                      <button
                        className='w-12'
                        onClick={() => handleFavoritePoem(poem)}
                      >
                        <ion-icon name={isPoemFavorited(poem) ? 'heart' : 'heart-outline'}></ion-icon>
                      </button>
                    </div>
                  </li>
                ))
              }
            </ul>
          ) : (
            <p> No poems found.</p>
          )}
        </div>
      </div>
      {
        Math.ceil(poetryData.length / poemsPerPage) > 1 && (
          <div className={`flex justify-center mt-4 ${poetryData.length < 5 || poemsToDisplay().length < 5 ? 'hidden' : ''}`}>
            <button
              onClick={() => handlePreviousPage()}
              disabled={currentPage === 1}
              className={`bg-blue-500 text-black px-4 py-2 rounded ${poetryData.length === 0 || poemsToDisplay().length <= 5 ? 'text-black' : 'text-gray'}`}
            >
              <ion-icon name="chevron-back-outline"></ion-icon>
            </button>
            <button
              onClick={handleNextPage}
              disabled={poetryData.length === 0 || poemsToDisplay().length <= 5}
              className={`bg-blue-500 text-black px-4 py-2 rounded mr-2 ${poetryData.length < 5 || poemsToDisplay().length < 5 ? 'text-gray' : 'text-black'}`}

            >
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </button>
          </div>)
      }

    </>
  );
};


export default PoetryDisplay;