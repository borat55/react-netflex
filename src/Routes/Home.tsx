import styled from "styled-components";
import { IGetMoviesResult, getMovies } from "../api";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { moviesResult, loadingMoviesResult } from "../atom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
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
  const isMovieResult = useSetRecoilState(moviesResult);
  const isLoadingMovieResult = useSetRecoilState(loadingMoviesResult);

  const { data: nowPlayingMovies, isLoading: moviesLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);

  const loading = moviesLoading;

  useEffect(() => {
    if (nowPlayingMovies) {
      isMovieResult(nowPlayingMovies.results);
    }
    if (moviesLoading) {
      isLoadingMovieResult((pre) => !pre);
    }
  }, [nowPlayingMovies, isMovieResult, moviesLoading, isLoadingMovieResult]);

  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <BannerMovie />
          <SliderTitle>Now Playing</SliderTitle>
          <SliderMovie />

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

                <ChosenMovie />
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
