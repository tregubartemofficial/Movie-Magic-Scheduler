import React from "react";
import { movies } from "../data";

const formatTime = (timeInMinutes) => {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const MovieSessions = () => {
  return (
    <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
      {movies.map((movie) => (
        <section key={movie.title} className="flex-center flex-col mx-auto">
          <h2 className="font-semibold">{movie.title}</h2>
          {movie.movieStarts.map((movieStart, i) => {
            const startTime = formatTime(movieStart);
            const endTime = formatTime(movie.movieEnds[i]);
            return <p key={i}>{`${startTime} - ${endTime}`}</p>;
          })}
        </section>
      ))}
    </article>
  );
};

export default MovieSessions;
