import React, { useState } from "react";
import Hero from "./Hero";
import MovieList from "./MovieList";
import MovieAdd from "./MovieAdd";
import { useMovieMate } from "../../hook/moviemateHook";

const MovieMate = () => {
  const [selection, setSelection] = useState("popular");
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useMovieMate(
    search.trim() ? "search" : selection,
    search,
  );

  return (
    <>
      <Hero />
      <MovieAdd search={search} setSearch={setSearch} />
      <MovieList
        search={search}
        setSelection={setSelection}
        selection={selection}
        data={data}
      />
    </>
  );
};

export default MovieMate;
