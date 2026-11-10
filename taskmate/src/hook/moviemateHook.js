import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMovies, getMovieDetail } from "../api/moviemateAPI";

// export const useMovieMate = (selection) => {
//   return useQuery({
//     queryKey: ["movies", selection],
//     queryFn: () => getMovies(selection),
//     staleTime: 24 * 60 * 60 * 1000, // 24 hours
//     gcTime: Infinity, // Keep cache while app is running
//     refetchOnWindowFocus: false,
//   });
// };
export const useMovieMate = (selection, search) => {
  return useQuery({
    queryKey: ["movies", selection, search],
    queryFn: () => getMovies(selection, search),
    staleTime: 24 * 60 * 60 * 1000,
  });
};
export const useMovieMateDetail = (id) => {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetail(id),
    enabled: !!id,
    staleTime: 24 * 60 * 60 * 1000,
  });
};
// export const useSearchMovies = (keyword) => {
//   return useQuery({
//     queryKey: ["movies", "search", keyword],
//     queryFn: () => searchMovies(keyword),
//     enabled: !!keyword.trim(),
//     staleTime: 5 * 60 * 1000,
//   });
// };
