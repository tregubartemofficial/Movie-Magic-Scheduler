import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { optionsForMovies } from "../calendarAPI";

const MoviePage = () => {
  const [movie, setMovie] = useState({});
  const { pathname } = useLocation();
  const movieTitle = pathname.split("/")[1];

  const searchMovie = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&language=en`,
        optionsForMovies
      );

      if (response.data.results && response.data.results.length > 0) {
        const movieId = response.data.results[0].id;
        const movieDetailsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=images&language=en`,
          optionsForMovies
        );
        const posterPath =
          movieDetailsResponse.data.images.posters[0].file_path;

        return {
          ...movieDetailsResponse.data,
          posterImg: `https://image.tmdb.org/t/p/original${posterPath}`,
        };
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [movieTitle]);

  useEffect(() => {
    searchMovie().then((url) => {
      setMovie(url);
    });
  }, [searchMovie]);

  console.log(movie);
  return (
      movie && movie.posterImg && (
        <div className="movie-details">
          <img src={movie.posterImg} alt={movie.title} />
          <div className="movie-info">
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <ul>
              <li>
                <strong>Release Date:</strong> {movie.release_date}
              </li>
              <li>
                <strong>Runtime:</strong> {movie.runtime} minutes
              </li>
              <li>
                <strong>Genres:</strong>{" "}
                {movie.genres.map((genre) => genre.name).join(", ")}
              </li>
              <li>
                <strong>Rating:</strong> {movie.vote_average} / 10
              </li>
            </ul>
          </div>
        </div>
      )
  );
};

export default MoviePage;
