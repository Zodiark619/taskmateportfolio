export default async function handler(req, res) {
  const { selection, search, id } = req.query;

  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  try {
    let endpoint;

    if (id) {
      endpoint = `/movie/${id}`;
    } else if (search?.trim()) {
      endpoint = `/search/movie?query=${encodeURIComponent(search)}`;
    } else {
      endpoint = `/movie/${selection || "popular"}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Failed to fetch movies",
      });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
