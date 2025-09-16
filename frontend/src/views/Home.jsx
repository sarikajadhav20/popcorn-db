import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/movieCard.jsx';

function Home() {
  const [movies, setMovies] = useState([]);

  const loadMovies = async () => {
    const response = await axios.get("http://localhost:8080/movies");
    setMovies(response.data.data);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return <div>
    <div className='flex flex-wrap justify-around'>
    {movies.map((movieObj)=>{        
    const {_id, title, description, images, category, director, year, language, rating}= movieObj;

    return  <MovieCard
      key={_id}
      title={title}
      description={description}
      images={images}
      category={category}
      director={director}
      year={year}
      language={language}
      rating={rating}
    />;
  })}
  </div>
  </div>;
}

export default Home;
