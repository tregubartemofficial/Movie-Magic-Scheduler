import React from "react";
import { movies } from "../data";
import { formatTimeToMin, formatTimeToUTC } from "../App";

const MovieSuggest = ({ userPreferences }) => {
  let movieTimeIndex = 0;

  const filteredMovies = movies
    .filter((movie) => {
      return movie.dayOfWeek === new Date(userPreferences.date).getDay();
    })
    .filter((movie) => {
      return movie.movieStarts.some((movieStartTime, i) => {
        movieTimeIndex = i;
        if (userPreferences?.startTime && userPreferences?.endTime) {
          return (
            movie.movieEnds[i] <= formatTimeToMin(userPreferences.endTime) &&
            movieStartTime >= formatTimeToMin(userPreferences.startTime)
          );
        }
        if (userPreferences?.startTime && !userPreferences?.endTime) {
          return movieStartTime >= formatTimeToMin(userPreferences.startTime);
        }
        if (!userPreferences?.startTime && userPreferences?.endTime) {
          return movie.movieEnds[i] >= formatTimeToMin(userPreferences.endTime);
        }
        return false;
      });
    })
    .sort((a, b) => {
      if (userPreferences.preferUnfilledCinema) {
        return a.loadPercentage - b.loadPercentage;
      }
      return b.rating - a.rating;
    });

  return (
    <section className="flex flex-col items-center content-center p-4">
      {!(userPreferences?.startTime || userPreferences?.endTime) && (
        <p className="text-lg font-semibold text-orange-700">
          Please enter your preferred time
        </p>
      )}
      {(userPreferences?.startTime || userPreferences?.endTime) &&
        filteredMovies[0]?.title && (
          <>
            <h2 className="text-lg font-semibold text-orange-700">
              {filteredMovies[0].title}
            </h2>
            <p>
              {formatTimeToUTC(filteredMovies[0].movieStarts[movieTimeIndex])} -
              {formatTimeToUTC(filteredMovies[0].movieEnds[movieTimeIndex])}
            </p>
            <p>$ {filteredMovies[0].ticketPrice}</p>
          </>
        )}
      {!filteredMovies[0]?.title &&
        (userPreferences?.startTime || userPreferences?.endTime) && (
          <p className="text-lg font-semibold text-orange-600">
            No movies available
          </p>
        )}
    </section>
  );
};

export default MovieSuggest;
