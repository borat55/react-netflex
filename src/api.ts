const API_KEY = "5875916d01b46024d4e80220b502cb79";
const BASE_PATH = "https://api.themoviedb.org/3";

// ---------------------------------- Movies ------------------------------------------------

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
  backdrop_path: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  tagline: string;
  vote_average: number;
}

export interface IMovieCredits {
  id: number;
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

// ---------------------------------- TV Series ------------------------------------------------

export interface ITV {
  backdrop_path: string;
  id: number;
  original_language: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
}

export interface IGetTVResult {
  page: number;
  results: ITV[];
  total_pages: number;
  total_results: number;
}

export interface ITVDetails {
  backdrop_path: string;
  first_air_date: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  id: number;
  release_date: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  tagline: string;
  vote_average: number;
}

export interface ITVCredits {
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
  id: number;
}

export function getTVAiringToday() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTVOnTheAir() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTVPopular() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getTVTopRated() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTVDetails(tvId: number) {
  return fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getTVCredits(tvId: number) {
  return fetch(`${BASE_PATH}/tv/${tvId}/credits?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

// ---------------------------------- Search ------------------------------------------------

export interface ISearch {
  results: [
    {
      backdrop_path: string;
      id: number;
      original_language: string;
      original_title: string;
      original_name: string;
      overview: string;
      poster_path: string;
      media_type: string;
      first_air_date: string;
      release_date: string;
      vote_average: number;
    }
  ];
}

export function getSearch(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&page=2&query=${keyword}`
  ).then((response) => response.json());
}
