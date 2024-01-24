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
            title={nowPlayingMovies?.results[0].title}
            category="Now_Playing"
          />

          <SliderMovie
            data={MoviePopular}
            slidesTitle="Popular"
            title={MoviePopular?.results[0].title}
            category="Popular"
          />

          <SliderMovie
            data={movieTopRate}
            slidesTitle="Top Rated"
            title={movieTopRate?.results[0].title}
            category="Top_Rated"
          />

          <SliderMovie
            data={movieUpcoming}
            slidesTitle="Upcoming"
            title={movieUpcoming?.results[0].title}
            category="Upcoming"
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
