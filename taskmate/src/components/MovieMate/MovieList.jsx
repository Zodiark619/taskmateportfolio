import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
const MovieList = ({ setSelection, selection, data, search }) => {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="d-flex align-items-center mb-0 gap-2">
          Movie Count
          <span className="badge bg-primary">{data?.length ?? 0}</span>
        </h5>

        <select
          disabled={search.trim().length !== 0}
          className="form-select w-auto"
          value={selection}
          onChange={(e) => setSelection(e.target.value)}
        >
          <option value="popular">Popular</option>
          <option value="top_rated">Top Rated</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>

      <div className="row g-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={selection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="row g-3"
          >
            {data?.map((movie) => (
              <div className="col-6 col-md-4 col-lg-3" key={movie.id}>
                <div className="card h-100">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="card-img-top"
                    alt={movie.title}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">
                      {movie.overview.slice(0, 100) + "..."}
                    </p>

                    <Link
                      to={`/moviemate/${movie.id}`}
                      className="btn btn-primary"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MovieList;
