import React, { useState } from "react";
import MovieCard from "../ui/MovieCard";
import { movies } from "../data";
import { useSelector } from "react-redux";

const MovieCatalogPage = () => {
  const state = useSelector((state) => state.user);
  console.log(state);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const filteredMovies = movies.filter((movie) => {
    if (!date) return movie;
    return movie.dayOfWeek === new Date(date).getDay();
  });

  return (
    <div className="movie-catalog">
      <label htmlFor="date" className="label">
        <input
          id="date"
          className="input input-catalog"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
      </label>
      <article className="card-wrapper">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </article>
    </div>
  );
};

export default MovieCatalogPage;
