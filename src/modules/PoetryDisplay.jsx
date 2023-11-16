import React, { useState, useEffect } from 'react';

const PoetryDisplay = ({ author, searchTerm }) => {
  const [poetryData, setPoetryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://poetrydb.org/${author}/${searchTerm}`);
        const data = await response.json();
        setPoetryData(data);
      } catch (error) {
        console.error('Error fetching poetry data:', error);
      }
    };

    fetchData();
  }, [author, searchTerm]); // Include author and searchTerm in the dependency array

  return (
    <>
      <div className='ml-10 my-4'>
        <div className='grid grid-cols-3'>
          {poetryData ? (
            <ul className='border-2'>
              {poetryData.map((poem, index) => (
                <li key={index} className='mt-20 '>
                  <h1 className='underline'>{poem.title}</h1>
                  <h2 className='text-sm text-gray'>{poem.author}</h2>
                  {poem.lines.map((line, lineIndex) => (
                    <p key={lineIndex}>{line}</p>
                  ))}
                </li>
              ))}
            </ul>
          ) : (
            <p> Loading poetry data...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PoetryDisplay;