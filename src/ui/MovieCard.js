import React, { useCallback, useEffect, useState } from "react";
import { formatTimeToUTC } from "../App";
import "../styles/MovieCard.css";
import { Link } from "react-router-dom";
import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGZmNTFmMTAwMmQyYjc2YjQ0OGExZTU1NzhjYTU5ZSIsInN1YiI6IjY1MzgxZDBjNDFhYWM0MDBlMDQwNTlkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IKZylHI9D7VnwoXWs6WSaP4-6sRW3ES4UEH64WD7hgs",
  },
};

const MovieCard = ({ movie }) => {
  const [posterUrl, setPosterUrl] = useState(null);

  const searchMovie = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${movie.title}&language=en`,
        options
      );

      if (response.data.results && response.data.results.length > 0) {
        const movieId = response.data.results[0].id;
        const movieDetailsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=images&language=en`,
          options
        );
        const posterPath =
          movieDetailsResponse.data.images.posters[0].file_path;
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
    <Link className="card" to={`/${movie.title.replace(/\s/g, "_")}`}>
        <img src={posterUrl} alt={movie.title} className="card-img" />
        <div className="card-content">
          <h2 className="title-movie">{movie.title}</h2>
          <p>
            <b>+{movie.ageLimit}</b> {movie.genre}
          </p>
          {movie.movieStarts.map((movieStart, i) => {
            const startTime = formatTimeToUTC(movieStart);
            const endTime = formatTimeToUTC(movie.movieEnds[i]);
            return (
              <div className="time-table" key={i}>
                <div className="time">
                  <p key={i}>{`${startTime} - ${endTime}`}</p>
                </div>
                <p className="ticket-price">{movie.ticketPrice} $</p>
              </div>
            );
          })}
        </div>
    </Link>
  );
};

export default MovieCard;
