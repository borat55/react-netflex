import styled from "styled-components";
import {
  IGetMoviesResult,
  getMoviePopular,
  getNowPlayingMovies,
  getMovieTopRate,
  getMovieUpcoming,
} from "../api";
import { useQuery } from "react-query";
import BannerMovie from "../Components/movie/BannerMovie";
import SliderMovie from "../Components/movie/SliderMovie";

const Wrapper = styled.div`
  background-color: black;
  height: 200vh;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const { data: nowPlayingMovies, isLoading: moviesLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getNowPlayingMovies);

  const { data: MoviePopular, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["movies", "popularMvies"], getMoviePopular);

  const { data: movieTopRate, isLoading: TopRateLoading } =
    useQuery<IGetMoviesResult>(["movies", "highRate"], getMovieTopRate);

  const { data: movieUpcoming, isLoading: upcomingLoading } =
    useQuery<IGetMoviesResult>(["movies", "upcoming"], getMovieUpcoming);

  const loading =
    moviesLoading || popularLoading || TopRateLoading || upcomingLoading;

  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <BannerMovie
            data={nowPlayingMovies}
            title={nowPlayingMovies?.results[0].title}
          />

          <SliderMovie
            data={nowPlayingMovies}
            slidesTitle="Now Playing"
            category="MovieNowPlaying"
          />

          <SliderMovie
            data={MoviePopular}
            slidesTitle="Popular"
            category="MoviePopular"
          />

          <SliderMovie
            data={movieTopRate}
            slidesTitle="Top Rated"
            category="MovieTopRated"
          />

          <SliderMovie
            data={movieUpcoming}
            slidesTitle="Upcoming"
            category="MovieUpcoming"
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
