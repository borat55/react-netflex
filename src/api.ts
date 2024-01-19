const API_KEY = "5875916d01b46024d4e80220b502cb79";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  backdrop_path: string;
  id: number;
  original_language: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}

export interface IGetMoviesResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieDetails {
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number;
  tagline: string;
  vote_average: number;
}

export interface IMovieCredits {
  cast: [
    {
      id: number;
      known_for_department: string;
      name: string;
      character: string;
    }
  ];
  crew: [
    {
      id: number;
      known_for_department: string;
      name: string;
      job: string;
    }
  ];
}

export function getNowPlayingMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMoviePopular() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieTopRate() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieUpcoming() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieDetails(movieId: number) {
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieCredits(movieId: number) {
  return fetch(`${BASE_PATH}/movie/${movieId}/credits?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
