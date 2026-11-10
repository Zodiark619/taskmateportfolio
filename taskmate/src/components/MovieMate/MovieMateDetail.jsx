import { useNavigate, useParams } from "react-router-dom";
import { useMovieMateDetail } from "../../hook/moviemateHook";

const MovieMateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useMovieMateDetail(id ?? "");

  if (!id) return <p>Invalid movie ID.</p>;

  if (isPending) return <p>Loading movie...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  if (!data) return <p>Movie not found.</p>;
  return (
    <div className="container ">
      <button
        onClick={() => navigate("/moviemate")}
        className="btn btn-primary mt-5"
      >
        Back
      </button>
      <h1>{data.title}</h1>

      <img
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.title}
      />

      <p>{data.overview}</p>
      <p>Rating: {data.vote_average}</p>
      <p>Release date: {data.release_date}</p>
    </div>
  );
};

export default MovieMateDetail;
