import React from "react";
import { Route, Routes } from "react-router";
import MovieSchedulePage from "./pages/MovieSchedulePage";
import MovieCatalogPage from "./pages/MovieCatalogPage";
import Header from "./components/Header";

export const formatTimeToUTC = (timeInMinutes) => {
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

export const formatTimeToMin = (time) => {
  if (!time) return;
  if (typeof time === "number") time = time.toString();
  const [hours, min] = time?.split(":");
  return +hours * 60 + +min;
};

const App = () => {
  

  return (
    <>
      <Header />
      <main className="wrapper">
        <Routes>
          <Route path="/" element={<MovieSchedulePage />} />
          <Route path="/movie-catalog" element={<MovieCatalogPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
