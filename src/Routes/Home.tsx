import styled from "styled-components";
import {
  IGetMoviesResult,
  IMovieDetails,
  IMovieCredits,
  getMovies,
  getMovieDetails,
  getMovieCredits,
} from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background-color: black;
  height: 200vh;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  font-weight: 900;
  text-shadow: 3px 3px ${(props) => props.theme.black.lighter};
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 25px;
  text-shadow: 2px 1px ${(props) => props.theme.black.lighter};
  width: 50%;
`;

const BannerBtns = styled.div`
  display: flex;
  margin-top: 20px;
`;

const PlayBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${(props) => props.theme.white.lighter};
  font-size: 20px;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 30px;
  box-shadow: 2px 1px ${(props) => props.theme.black.lighter};
  svg {
    margin-right: 7px;
  }
`;

const InfoBtn = styled.button`
  border: none;
  background-color: ${(props) => props.theme.black.lighter};
  color: white;
  font-size: 20px;
  width: 180px;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const RowBtn = styled.button`
  background-color: transparent;
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  padding: 10px;
  svg {
    fill: rgb(238, 238, 238);
  }
  &:hover {
    svg {
      fill: rgba(238, 238, 238, 0.7);
    }
  }
`;

const MovieBox = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.$bgPhoto});
  font-size: 65px;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const MovieBoxInfo = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const ChosenMovie = styled(motion.div)`
  position: absolute;
  width: 50vw;
  height: 90vh;
  background-color: ${(props) => props.theme.black.darker};
  right: 0;
  left: 0;
  z-index: 999;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
`;

const ChosenMovieCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;

const ChosenMovieCloseBtn = styled.button`
  cursor: pointer;
  color: ${(props) => props.theme.white.darker};
  font-size: 40px;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: ${(props) => props.theme.black.darker};
  border: none;
  border-radius: 50%;
  position: absolute;
  top: 25px;
  right: 20px;
  z-index: 3;
`;

const ChosenMovieTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 40px;
  font-weight: 700;
  position: relative;
  top: -60px;
  left: 20px;
  padding: 10px;
  width: 90%;
`;

const ChosenMovieTitleTagline = styled.h3`
  color: ${(props) => props.theme.white.darker};
  font-size: 17px;
  font-weight: 600;
  position: relative;
  top: -65px;
  left: 35px;
  width: 90%;
`;

const YearGenreRateBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  top: -30px;
  left: 35px;
`;

const ChosenMovieReleaseDate = styled.h4`
  border: 1px solid ${(props) => props.theme.white.darker};
  border-radius: 3px;
  padding: 2px 3px;
  color: #1cc11c;
  font-size: 20px;
  font-weight: 600;
  margin-right: 13px;
`;

const ChosenMovieGenre = styled.h4`
  color: ${(props) => props.theme.white.darker};
  font-size: 20px;
  font-weight: 600;
  margin-right: 5px;
  white-space: nowrap;
`;

const ChosenMovieRate = styled.h4`
  color: ${(props) => props.theme.white.darker};
  font-size: 20px;
  font-weight: 600;
  margin-left: 8px;
`;

const OverviewCreditBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ChosenMovieOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 18px;
  width: 60%;
  line-height: 25px;
`;

const MovieCreditsBox = styled.div`
  width: 30%;
`;

const MovieCasts = styled.h4`
  display: inline-block;
  margin-right: 3px;
  line-height: 25px;
`;

const MovieDirector = styled.h4`
  margin-top: 10px;
`;

const rowVariants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth + 5 : window.outerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.4,
      type: "tween",
    },
  },
};

const movieBoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    borderRadius: 7,
    transition: {
      delay: 0.3,
      duration: 0.4,
      type: "tween",
    },
  },
};

const offset = 6;

function Home() {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const chosenMovieMatch = useMatch("/movies/:movieId");

  const { data: nowPlayingMovies, isLoading: moviesLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);

  const { data: movieDetail, isLoading: movieDetailLoading } =
    useQuery<IMovieDetails>(
      ["movie_detail", chosenMovieMatch?.params.movieId],
      () => getMovieDetails(Number(chosenMovieMatch?.params.movieId))
    );

  const { data: movieCredits, isLoading: movieCreditsLoading } =
    useQuery<IMovieCredits>(
      ["movie_credits", chosenMovieMatch?.params.movieId],
      () => getMovieCredits(Number(chosenMovieMatch?.params.movieId))
    );

  const loading = moviesLoading || movieDetailLoading || movieCreditsLoading;

  const [index, setIndex] = useState(0);
  const [back, isBack] = useState(false);

  const increaseIndex = () => {
    if (nowPlayingMovies) {
      if (loading) return;
      toggleLeaving();
      const totalMovies = nowPlayingMovies.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      isBack(false);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (nowPlayingMovies) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = nowPlayingMovies.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      isBack(true);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((pre) => !pre);

  const onMovieBoxClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  const onOverlayClick = () => {
    navigate(-1);
  };

  const clickedMovie =
    chosenMovieMatch?.params.movieId &&
    nowPlayingMovies?.results.find(
      (movie) => String(movie.id) === chosenMovieMatch.params.movieId
    );

  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(
              nowPlayingMovies?.results[0].backdrop_path ||
                nowPlayingMovies?.results[0].poster_path ||
                ""
            )}
          >
            <Title>{nowPlayingMovies?.results[0].title}</Title>
            <Overview>{nowPlayingMovies?.results[0].overview}</Overview>
            <BannerBtns>
              <PlayBtn>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                    fill="currentColor"
                  ></path>
                </svg>
                Play
              </PlayBtn>
              <InfoBtn
                onClick={() =>
                  onMovieBoxClick(Number(nowPlayingMovies?.results[0].id))
                }
              >
                ⓘ Information
              </InfoBtn>
            </BannerBtns>
          </Banner>
          <Slider>
            <AnimatePresence
              custom={back}
              initial={false}
              onExitComplete={toggleLeaving}
            >
              <Row
                custom={back}
                variants={rowVariants}
                initial={"hidden"}
                animate={"visible"}
                transition={{ type: "tween", duration: 1 }}
                exit={"exit"}
                key={index}
              >
                {nowPlayingMovies?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <MovieBox
                      layoutId={movie.id + ""}
                      key={movie.id}
                      variants={movieBoxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      onClick={() => onMovieBoxClick(movie.id)}
                      $bgPhoto={makeImagePath(
                        movie.backdrop_path || movie.poster_path,
                        "w500"
                      )}
                    >
                      <MovieBoxInfo variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </MovieBoxInfo>
                    </MovieBox>
                  ))}
              </Row>
              <RowBtn style={{ top: 80 }} onClick={decreaseIndex}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
              </RowBtn>
              <RowBtn style={{ top: 80, right: 10 }} onClick={increaseIndex}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </svg>
              </RowBtn>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {chosenMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <ChosenMovie
                  style={{ top: scrollY.get() + 40 }}
                  layoutId={chosenMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <ChosenMovieCover
                        style={{
                          backgroundImage: `linear-gradient(to top, rgb(24,24,24),35%, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <ChosenMovieCloseBtn onClick={onOverlayClick}>
                        &times;
                      </ChosenMovieCloseBtn>
                      <ChosenMovieTitle>
                        {movieDetail?.original_title}
                      </ChosenMovieTitle>
                      <ChosenMovieTitleTagline>
                        {movieDetail?.original_title} : {movieDetail?.tagline}
                      </ChosenMovieTitleTagline>
                      <YearGenreRateBox>
                        <ChosenMovieReleaseDate>
                          {movieDetail?.release_date.slice(0, 4)}
                        </ChosenMovieReleaseDate>
                        {movieDetail?.genres.map((genre, index) => (
                          <ChosenMovieGenre key={genre.id}>
                            {genre.name}
                            {index !== movieDetail.genres.length - 1 && " ·"}
                          </ChosenMovieGenre>
                        ))}
                        <ChosenMovieRate>
                          ⭐{movieDetail?.vote_average.toFixed(1)}
                        </ChosenMovieRate>
                      </YearGenreRateBox>
                      <OverviewCreditBox>
                        <ChosenMovieOverview>
                          {movieDetail?.overview}
                        </ChosenMovieOverview>
                        <MovieCreditsBox>
                          {movieCredits?.cast.slice(0, 4).map((actor, index) =>
                            actor.known_for_department === "Acting" ? (
                              <MovieCasts key={actor.id}>
                                {index === 0 ? "Casting : " : null}
                                {actor.name}
                                {index !==
                                movieCredits.cast.slice(0, 4).length - 1
                                  ? ","
                                  : null}
                              </MovieCasts>
                            ) : null
                          )}
                          {movieCredits?.crew.map((director, index) =>
                            director.job === "Director" ? (
                              <MovieDirector key={director.id}>
                                Director : {director.name}
                              </MovieDirector>
                            ) : null
                          )}
                        </MovieCreditsBox>
                      </OverviewCreditBox>
                    </>
                  )}
                </ChosenMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
