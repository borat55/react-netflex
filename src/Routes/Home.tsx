import styled from "styled-components";
import {
  IGetMoviesResult,
  getMoviePopular,
  getNowPlayingMovies,
  getMovieTopRate,
  getMovieUpcoming,
} from "../api";

import { useQuery } from "react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import ChosenMovie from "../Components/movie/ChosenMovie";
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

const SliderTitle = styled.h4`
  position: relative;
  top: -115px;
  left: 10px;
  font-size: 30px;
  color: ${(props) => props.theme.white.lighter};
  font-weight: 500;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

function Home() {
  const navigate = useNavigate();
  const chosenMovieMatch = useMatch("/movies/:movieId");

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
          <BannerMovie data={nowPlayingMovies} />

          <SliderTitle>Now Playing</SliderTitle>
          <SliderMovie data={nowPlayingMovies} />

          <SliderTitle>Trending Now</SliderTitle>
          <SliderMovie data={MoviePopular} />

          <SliderTitle>High Rated</SliderTitle>
          <SliderMovie data={movieTopRate} />

          <SliderTitle>Coming soon</SliderTitle>
          <SliderMovie data={movieUpcoming} />

          <AnimatePresence>
            {chosenMovieMatch ? (
              <>
                <Overlay
                  onClick={() => {
                    navigate(-1);
                  }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />

                <ChosenMovie data={nowPlayingMovies} />
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
