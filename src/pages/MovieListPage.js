import React from "react";
import MovieCard from "../ui/MovieCard";
import { movies } from "../data";
import { useSelector } from "react-redux";
import { formatTimeToMin } from "../App";


const MovieListPage = () => {
  // const state = useSelector((state) => state.user);
  const {
    calendar,
    startTime,
    endTime,
    date,
    selectedGenres,
    preferUnfilledCinema,
    preferOwnCalendar,
  } = useSelector((state) => state.calendar);

  const filteredMovies = movies
    .reduce((selected, movie) => {
      if (movie.dayOfWeek === new Date(date).getDay()) {
        const selectedTime = movie.movieStarts.findIndex(
          (movieStartTime, i) => {
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
          }
        );
        if (selectedTime !== -1) {
          selected.push(movie);
        }
        if (selectedGenres.lenght) {
          selectedGenres.forEach((genre) => {
            if (movie.genre.includes(genre)) {
              selected.push(movie);
            }
          });
        }
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
    <article
      className="card-wrapper"

    >
      {filteredMovies.map((movie) => (
        <MovieCard key={movie.title} movie={movie} />
      ))}
      {!filteredMovies[0]?.title &&
        (startTime || endTime || (calendar && preferOwnCalendar)) && (
          <h2 className="title-orange">No movies available</h2>
        )}
    </article>
  );
};

export default MovieListPage;
