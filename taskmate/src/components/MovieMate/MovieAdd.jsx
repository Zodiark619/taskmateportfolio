import React, { useEffect, useState } from "react";

const MovieAdd = ({ search, setSearch }) => {
  return (
    <div className="container mt-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default MovieAdd;
