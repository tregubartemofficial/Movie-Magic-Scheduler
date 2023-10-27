import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanAllUserPreferences, setUserGenre } from "../redux/calendarSlice";
import { formatDate } from "../App";
import { getTodayEvents } from "../api";
import { AiOutlineClose } from "react-icons/ai";
import UserTimeForm from "../components/UserTimeForm";
import "../styles/Modal.css";

const genres = [
  "Action",
  "Crime",
  "Drama",
  "Fantasy",
  "Sci-Fi",
  "Thriller",
  "War",
  "Comedy",
  "Romance",
  "Western",
  "Horror",
  "Animation",
];

const FilterModal = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const { date, selectedGenres } = useSelector((state) => state.calendar);

  let accessToken = null;
  if (active) {
    accessToken = sessionStorage.getItem("accessToken");
  }

  return (
    <div className={active ? "modal active" : "modal"}>
      <div
        className={active ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-actions">
          <h2 className="title-movie">Filters</h2>
          <button
            className="button button-text"
            onClick={() => setActive(false)}
          >
            Close
            <AiOutlineClose size="1.5em" />
          </button>
        </div>
        <div className="modal-actions">
          <button
            className="button"
            onClick={() => dispatch(cleanAllUserPreferences())}
          >
            Clear filters
          </button>

          {accessToken && (
            <button
              className="button"
              onClick={() => getTodayEvents(date, dispatch)}
            >
              Use my Google Calendar for {formatDate(date)}
            </button>
          )}
        </div>
        <UserTimeForm />
        <div className="flex-center col">
          <h3>Genres</h3>
          <div className="genres-filter">
            {genres.map((genre) => (
              <label
                className={`label-checkbox ${
                  selectedGenres.includes(genre) ? "label-checkbox-active" : ""
                }`}
                htmlFor={genre}
                key={genre}
              >
                <input
                  id={genre}
                  className="checkbox"
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => {
                    dispatch(setUserGenre(genre));
                  }}
                />
                {genre}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
