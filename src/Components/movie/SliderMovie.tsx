import * as S from "../../style component/sliderMovieStyle";
import { makeImagePath } from "../../utils";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { IGetMoviesResult } from "../../api";
import ChosenMovie from "./ChosenMovie";

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

export interface IMovieInfosProps {
  data: IGetMoviesResult | undefined;
  title: string;
  category: string;
}

const offset = 6;

function SliderMovie({ data, title, category }: IMovieInfosProps) {
  const navigate = useNavigate();
  const chosenMovieMatch = useMatch("/movies/:movieId");
  const [index, setIndex] = useState(0);
  const [back, isBack] = useState(false);

  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((pre) => !pre);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      isBack(false);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      isBack(true);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const onMovieBoxClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <>
      <S.Slider>
        <S.SliderTitle>{title}</S.SliderTitle>
        <AnimatePresence
          custom={back}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <S.Row
            custom={back}
            variants={rowVariants}
            initial={"hidden"}
            animate={"visible"}
            transition={{ type: "tween", duration: 1 }}
            exit={"exit"}
            key={category + index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <S.MovieBox
                  layoutId={movie.id + ""}
                  key={category + movie.id}
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
                  <S.MovieBoxInfo variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </S.MovieBoxInfo>
                </S.MovieBox>
              ))}
          </S.Row>
          <S.RowBtn style={{ top: 100, left: 10 }} onClick={decreaseIndex}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </S.RowBtn>
          <S.RowBtn style={{ top: 100, right: 10 }} onClick={increaseIndex}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </S.RowBtn>
        </AnimatePresence>
      </S.Slider>
      <AnimatePresence>
        {chosenMovieMatch ? (
          <>
            <S.Overlay
              onClick={() => {
                navigate(-1);
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <ChosenMovie
              category={category}
              chosenMovieId={chosenMovieMatch?.params.movieId}
            />
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default SliderMovie;
