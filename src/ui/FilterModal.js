import React from 'react'
import '../styles/Modal.css'
import UserTimeForm from '../components/movieCatalog/UserTimeForm';
import { useDispatch, useSelector } from 'react-redux';
import { cleanAllUserPreferences, setUserGenre } from '../redux/calendarSlice';

const genres = [
  'Action',
  'Crime',
  'Drama',
  'Fantasy',
  'Sci-Fi',
  'Thriller',
  'War',
  'Comedy',
  'Romance',
  'Western',
  'Horror',
];

const FilterModal = ({ active, setActive}) => {
  const dispatch = useDispatch();
  const { selectedGenres } = useSelector((state) => state.calendar);
  
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
          </button>
        </div>
        <div className="modal-actions">
          <button
            className="button"
            onClick={() => dispatch(cleanAllUserPreferences())}
          >
            Clear filters
          </button>
        </div>
        <UserTimeForm />
        <div className="flex-center col">
          <h3>Genre</h3>
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
}

export default FilterModal;