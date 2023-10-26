import React from "react";
import MovieCard from "../ui/MovieCard";
import { movies } from "../data";
import { useSelector } from "react-redux";
import { formatTimeToMin } from "../App";

const MovieListPage = () => {
  const {
    startTime,
    endTime,
    date,
    selectedGenres,
    preferUnfilledCinema,
  } = useSelector((state) => state.calendar);

  const filteredMovies = movies
    .filter((movie) => {
      if (movie.dayOfWeek === new Date(date).getDay()) {
        if (selectedGenres.length) {
          return selectedGenres.some((genre) => movie.genre.includes(genre));
        }
        return movie;
      }
      return false;
    })
    .reduce((selected, movie) => {
      const selectedTime = movie.movieStarts.findIndex((movieStartTime, i) => {
        if (Array.isArray(startTime)) {
          return (
            movie.movieEnds[i] <= formatTimeToMin(endTime[i]) &&
            movieStartTime >= formatTimeToMin(startTime[i])
          );
        }
        if (startTime && endTime) {
          return (
            movie.movieEnds[i] <= formatTimeToMin(endTime) &&
            movieStartTime >= formatTimeToMin(startTime)
          );
        }
        if (startTime) {
          return movieStartTime >= formatTimeToMin(startTime);
        }
        if (endTime) {
          return movie.movieEnds[i] <= formatTimeToMin(endTime);
        }
        return movie;
      });
      if (selectedTime !== -1) {
        selected.push(movie);
      }
      return selected;
    }, [])
    .sort((a, b) => {
      if (preferUnfilledCinema) {
        return a.loadPercentage - b.loadPercentage;
      }
      return b.rating - a.rating;
    });

  return (
    <article className="card-wrapper">
      {filteredMovies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
      {!filteredMovies[0]?.title && (
          <h2 className="title-orange">No movies available</h2>
        )}
    </article>
  );
};

export default MovieListPage;
