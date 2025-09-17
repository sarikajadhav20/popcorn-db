import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/movieCard.jsx';
import {Search as SearchIcon} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function Home() {
  const [movies, setMovies] = useState([]);

  const [search, setSearch] = useState("");

  const loadMovies = async () => {
    const response = await axios.get("http://localhost:8080/movies");
    setMovies(response.data.data);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const searchMovies = async () => {
    toast.loading("Searching...", {id: 'searching'});

    try {
      const response = await axios.get(`http://localhost:8080/movies/search?q=${search}`);
      toast.dismiss();
      setMovies(response.data.data);
    } 
    catch (error) {
      toast.dismiss();
      toast.error("Error searching movies");
    }
  };

  useEffect(() => {
    searchMovies();
  }, [search]);
    

  return <div>
    <div className='border-2 border-gray-300 rounded-full my-2 w-fit mx-auto px-3 py-2'>
        <input type="text" placeholder='Search Movie' className='border-none  w-[400px] focus:outline-none' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <SearchIcon className='inline-block'/>
    </div>

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
  <Toaster/>
  </div>;
}

export default Home;
