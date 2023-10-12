import React from "react";
import { movies } from "../data";
import { formatTimeToMin, formatTimeToUTC } from "../App";

const MovieSuggest = ({ userPreferences }) => {
  const { date, startTime, endTime, preferUnfilledCinema } = userPreferences;

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
    <section className="flex flex-col items-center content-center p-4">
      {!(startTime || endTime) && (
        <h2 className="title-orange">Please enter your preferred time</h2>
      )}
      {(startTime || endTime) && filteredMovies[0]?.title && (
        <>
          <h2 className="title-orange">{filteredMovies[0].title}</h2>
          <p>
            {formatTimeToUTC(filteredMovies[0].movieStarts[movieTimeIndex])} -
            {formatTimeToUTC(filteredMovies[0].movieEnds[movieTimeIndex])}
          </p>
          <p>$ {filteredMovies[0].ticketPrice}</p>
        </>
      )}
      {!filteredMovies[0]?.title && (startTime || endTime) && (
        <h2 className="title-orange">No movies available</h2>
      )}
    </section>
  );
};

export default MovieSuggest;
