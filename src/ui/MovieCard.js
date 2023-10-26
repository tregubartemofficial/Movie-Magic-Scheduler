import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatTimeToMin, formatTimeToUTC } from "../App";
import { optionsForMovies } from "../api";
import "../styles/MovieCard.css";
import { useSelector } from "react-redux";

const MovieCard = ({ movie }) => {
  const { startTime: userStartTime, endTime: userEndTime } = useSelector(
    (state) => state.calendar
  );
  const [posterUrl, setPosterUrl] = useState(null);
  console.log();

  const searchMovie = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${movie.title}&language=en`,
        optionsForMovies
      );

      if (response.data.results && response.data.results.length > 0) {
        const movieId = response.data.results[0].id;
        const movieDetailsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=images&language=en`,
          optionsForMovies
        );
        const posterPath =
          movieDetailsResponse.data.images.backdrops[0].file_path;
        return `https://image.tmdb.org/t/p/original${posterPath}`;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [movie.title]);

  useEffect(() => {
    searchMovie().then((url) => {
      setPosterUrl(url);
    });
  }, [searchMovie]);

  return (
    <Link className="card" to={`/${movie.title}`}>
      <img src={posterUrl} alt={movie.title} className="card-img" />
      <div className="card-content">
        <h2 className="title-movie">{movie.title}</h2>
        <p>
          <b>+{movie.ageLimit}</b> {movie.genre}
        </p>
        <div className="wrapper-time-table">
          {movie.movieStarts.map((movieStart, i) => {
            const startTime = formatTimeToUTC(movieStart);
            const endTime = movie.movieEnds[i];

            if (userStartTime && movieStart < formatTimeToMin(userStartTime)) {
              return <React.Fragment key={i}></React.Fragment>;
            }

            if (userEndTime && endTime > formatTimeToMin(userEndTime)) {
              return <React.Fragment key={i}></React.Fragment>;
            }

            return (
              <div className="time-table" key={i}>
                <div className="time">
                  <b>{startTime}</b>
                </div>
                <p className="ticket-price">{movie.ticketPrice} $</p>
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
