import Movie from './../models/movies.js';

const getMovies=async(req, res)=>{
    const movies = await Movie.find();

    res.json({success:true, data:movies, message:"Movies fetched successfully"});
};

const postMovies=async(req, res) => {
    console.log('Body received',req.body);
    const { title, description, images, category, director, year, language, rating } = req.body;
   
    const newMovie = new Movie({
        title,
        description,
        images,
        category,
        director,
        year,
        language,
        rating
    });

    const savedMovie = await newMovie.save();

    res.json({
        success: true,
        data:savedMovie,
        message: "Movie added successfully"
    });
};

const getMoviesById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);

    if (movie) {
      return res.status(200).json({
        success: true,
        data: movie,
        message: "Movie fetched successfully"
      });
    } 
    else {
      return res.status(401).json({
        success: false,
        data: null,
        message: "Movie not found"
      });
    }
  }
  catch (err) {
    return res.status(404).json({
        success: false,
        data: null,
        message: "Error fetching movie",
    });
  }
};

const getMoviesSearch = async (req, res) => {
    const {q}= req.query;

    const movies = await Movie.find({
        title: { $regex: q, $options: "i" }
    });

    if(movies.length==0){
        return res.status(404).json({
            success: false,
            data: null,
            message: "No movies found",
        });
    }else {
        return res.status(200).json({
            success: true,
            data: movies,
            message: "Movies fetched successfully",
        });
    }
};

const putMoviesById = async (req, res) => {
    const { id } = req.params;
    const { title, description, images, category, director, year, language, rating } = req.body;

    await Movie.updateOne({ _id: id }, {
        title,
        description,
        images,
        category,
        director,
        year,
        language,
        rating
    }
  );
  const updatedMovie = await Movie.findById(id);

  return res.status(200).json({
    success: true,
    data: updatedMovie,
    message: "Movie updated successfully",
  });

};

const putMoviesRatingsById = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;

    if(rating < 0 || rating > 10){
        return res.status(400).json({
            success: false,
            data: null,
            message: "Rating must be between 0 and 10",
        });
    }

    await Movie.updateOne({ _id: id }, { rating });
    const updatedMovie = await Movie.findById(id);

    return res.status(200).json({
      success: true,
      data: updatedMovie,
      message: "Movie rating updated successfully",
    });

}

const deleteMoviesById = async (req, res) => {
    const { id } = req.params;
    await Movie.deleteOne({ _id: id});
    return res.status(200).json({
      success: true,
      data: null,
      message: "Movie deleted successfully",
    });
};

export { getMovies, postMovies, getMoviesById, getMoviesSearch, putMoviesById ,putMoviesRatingsById, deleteMoviesById};

