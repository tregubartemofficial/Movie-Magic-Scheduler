import React from "react";
import { useSelector } from "react-redux";
import { movies } from "../../data";
import { formatTimeToMin, formatTimeToUTC } from "../../App";

const MovieSuggest = () => {
  const {
    calendar,
    date,
    startTime,
    endTime,
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
            return false;
          }
        );
        if (selectedTime !== -1) {
          selected.push({ ...movie, timeIndex: selectedTime });
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
  const movieTimeIndex = filteredMovies[0]?.timeIndex;

  return (
    <section className="suggested-movie flex-center col">
      {!(startTime || endTime || (calendar && preferOwnCalendar)) && (
        <h2 className="title-orange">Please enter your preferred time</h2>
      )}
      {(startTime || endTime || (calendar && preferOwnCalendar)) &&
        filteredMovies[0]?.title && (
          <>
            <h2 className="title-orange">{filteredMovies[0].title}</h2>
            <p>
              {formatTimeToUTC(filteredMovies[0].movieStarts[movieTimeIndex])} -
              {formatTimeToUTC(filteredMovies[0].movieEnds[movieTimeIndex])}
            </p>
            <p>$ {filteredMovies[0].ticketPrice}</p>
          </>
        )}
      {!filteredMovies[0]?.title &&
        (startTime || endTime || (calendar && preferOwnCalendar)) && (
          <h2 className="title-orange">No movies available</h2>
        )}
    </section>
  );
};

export default MovieSuggest;
