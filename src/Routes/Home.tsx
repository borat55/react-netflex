import styled from "styled-components";
import {
  IMovie,
  IGetMoviesResult,
  IMovieDetails,
  getMovieDetails,
  getMovies,
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
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
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
  width: 40vw;
  height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
  right: 0;
  left: 0;
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

const ChosenMovieTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 40px;
  position: relative;
  top: -60px;
  padding: 10px;
`;

const ChosenMovieTagline = styled.h3``;

const ChosenMovieReleaseDate = styled.h4``;

const ChosenMovieGenre = styled.h4`
  margin: 50px;
`;

const ChosenMovieRate = styled.h4``;

const ChosenMovieOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 24px;
  position: relative;
  top: -70px;
  padding: 20px;
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
    transition: {
      delay: 0.3,
      duration: 0.4,
      type: "tween",
    },
  },
};

const offset = 6;

// const aMovie = {
//   adult: false,
//   backdrop_path: "/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg",
//   genre_ids: [28, 12, 14],
//   id: 572802,
//   original_language: "en",
//   original_title: "Aquaman and the Lost Kingdom",
//   overview:
//     "Black Manta, still driven by the need to avenge his father's death and wielding the power of the mythic Black Trident, will stop at nothing to take Aquaman down once and for all. To defeat him, Aquaman must turn to his imprisoned brother Orm, the former King of Atlantis, to forge an unlikely alliance in order to save the world from irreversible destruction.",
//   popularity: 1536.539,
//   poster_path: "/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg",
//   release_date: "2023-12-20",
//   title: "Aquaman and the Lost Kingdom",
//   video: false,
//   vote_average: 6.491,
//   vote_count: 411,
// };

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

  const loading = moviesLoading || movieDetailLoading;

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
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={chosenMovieMatch.params.movieId}
                >
                  {clickedMovie && (
                    <>
                      <ChosenMovieCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <ChosenMovieTitle>
                        {movieDetail?.original_title}
                      </ChosenMovieTitle>
                      <ChosenMovieTagline>
                        {movieDetail?.tagline}
                      </ChosenMovieTagline>
                      <ChosenMovieReleaseDate>
                        {movieDetail?.release_date}
                      </ChosenMovieReleaseDate>
                      {movieDetail?.genres.map((genre) => (
                        <ChosenMovieGenre>{genre.name}</ChosenMovieGenre>
                      ))}
                      <ChosenMovieRate>
                        {movieDetail?.vote_average}
                      </ChosenMovieRate>
                      <ChosenMovieOverview>
                        {movieDetail?.overview}
                      </ChosenMovieOverview>
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
