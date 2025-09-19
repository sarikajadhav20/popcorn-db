import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { getMovies, postMovies, getMoviesById, getMoviesSearch, putMoviesById, putMoviesRatingsById ,deleteMoviesById} from './controllers/movie.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB connected:", conn.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

app.get('/', (req, res) => {
  res.json({ status: "Ok", message: "Server is healthy" });
});

app.post("/movies", postMovies);
app.get("/movies", getMovies);
app.get("/movies/search",getMoviesSearch);
app.get("/movies/:id", getMoviesById); 
app.put("/movies/:id",putMoviesById);
app.patch("/movies/:id/rating",putMoviesRatingsById);
app.delete("/movies/:id", deleteMoviesById);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});
