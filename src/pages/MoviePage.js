import React, { useCallback, useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useLocation } from "react-router";
import axios from "axios";
import { optionsForMovies } from "../api";
import { movies } from "../data";
import { formatTimeToUTC } from "../App";

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

        const result = movies.filter((movie) => {
          return movie.title === movieTitle.split("%20").join(" ");
        });

        return {
          ...movieDetailsResponse.data,
          ...result[0],
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

  return (
    movie &&
    movie.posterImg && (
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
              <strong>Runtime:</strong> {movie.duration} minutes
            </li>
            <li>
              <strong>Genres:</strong>
              {movie.genres.map((genre) => genre.name).join(", ")}
            </li>
            <li>
              <strong>Rating:</strong>
              {[...Array(5)].map((_, i) => {
                const isActive = i < movie.rating;
                if (isActive)
                  return <AiFillStar key={i} style={{ display: "inline" }} />;
                return <AiOutlineStar key={i} style={{ display: "inline" }} />;
              })}
            </li>
            <li>
              <strong>Ticket price:</strong> {movie.ticketPrice} $
            </li>

            <li>
              <strong className="title-orange">Sessions:</strong>
              {movie.movieStarts.map((movieStart, i) => {
                const startTime = formatTimeToUTC(movieStart);
                const endTime = formatTimeToUTC(movie.movieEnds[i]);
                return (
                  <div key={i}>
                    <strong>{startTime}</strong>- {endTime}
                  </div>
                );
              })}
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default MoviePage;
