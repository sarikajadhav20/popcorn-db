import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/movieCard.jsx';
import MovieRating from '../components/movieRating.jsx';
import { Search as SearchIcon, TrashIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Load all movies
  const loadMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/movies");
      setMovies(response.data.data);
    } catch (error) {
      toast.error("Error loading movies");
    }
  };

  // Update rating in local state (after save button in MovieRating is clicked)
  const handleRatingUpdate = (movieId, newRating) => {
    setMovies((prevMovies) =>
      prevMovies.map((m) =>
        m._id === movieId ? { ...m, rating: newRating } : m
      )
    );
  };

  useEffect(() => {
    loadMovies();
  }, []);

  // Search movies
  const searchMovies = async () => {
    toast.loading("Searching...", { id: 'searching' });

    try {
      const response = await axios.get(`http://localhost:8080/movies/search?q=${search}`);
      toast.dismiss();
      setMovies(response.data.data);
    } catch (error) {
      toast.dismiss();
      toast.error("Error searching movies");
    }
  };

  useEffect(() => {
    if (search.trim() !== "") {
      searchMovies();
    } else {
      loadMovies();
    }
  }, [search]);

  // Delete movie
  const deleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      await axios.delete(`http://localhost:8080/movies/${id}`);
      toast.success("Movie deleted successfully");

      // remove deleted movie from state without reloading all
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
    } catch (error) {
      toast.error("Failed to delete movie");
    }
  };

  return (
    <div className="min-h-screen bg-blue-200">
      {/* Search Bar */}
      <div className='border-2 border-gray-300 rounded-full my-2 w-fit mx-auto px-3 py-2 bg-white'>
        <input 
          type="text" 
          placeholder='Search Movie' 
          className='border-none w-[400px] focus:outline-none cursor-pointer' 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <SearchIcon className='inline-block' />
      </div>

      {/* Movie Cards */}
      <div className='flex flex-wrap justify-around gap-4'>
        {movies.map((movieObj) => {
          const { _id, title, description, images, category, director, year, language, rating } = movieObj;

          return (
            <div
              key={_id}
              className={`relative cursor-pointer rounded-xl p-2 transition-colors duration-300 ${
                selectedMovie === _id ? "bg-yellow-100" : "bg-white"
              }`}
              onClick={() => setSelectedMovie(_id)}
            >
              {/* Delete Icon */}
              <TrashIcon 
                className="absolute top-1 right-2 text-red-600 hover:text-red-800 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // prevent triggering card selection
                  deleteMovie(_id);
                }}
              />

              {/* MovieCard */}
              <MovieCard
                title={title}
                description={description}
                images={images}
                category={category}
                director={director}
                year={year}
                language={language}
                rating={rating}
              />

           {/* Movie Rating Component */}
           <MovieRating
  movieId={movieObj._id}
  initialRating={movieObj.rating || 0}
  onRatingUpdate={handleRatingUpdate}
/>

            </div>
          );
        })}
      </div>

      <Toaster />
    </div>
  );
}

export default Home;
