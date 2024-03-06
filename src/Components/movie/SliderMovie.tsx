import * as S from "../../style component/sliderContentsStyle";
import { makeImagePath } from "../../utils";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { IGetMoviesResult } from "../../api";
import ChosenMovie from "./ChosenMovie";
import { useSetRecoilState } from "recoil";
import { chosenMovieCategory } from "../../atom";
import { NoImg } from "../../style component/searchContentsStyle";

export interface IMovieInfosProps {
  data: IGetMoviesResult | undefined;
  slidesTitle: string;
  category: string;
}

const offset = 6;

function SliderMovie({ data, slidesTitle, category }: IMovieInfosProps) {
  const navigate = useNavigate();
  const chosenMovieMatch = useMatch("/movies/:movieId");
  const [index, setIndex] = useState(0);
  const [back, isBack] = useState(false);
  const setC_movieCategory = useSetRecoilState(chosenMovieCategory);

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
    setC_movieCategory(category);
  };

  return (
    <>
      <S.Slider>
        <S.SliderTitle>{slidesTitle}</S.SliderTitle>
        <AnimatePresence
          custom={back}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <S.Row
            custom={back}
            variants={S.rowVariants}
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
                <S.ContentsBox
                  layoutId={category + movie.id + ""}
                  key={category + movie.id}
                  variants={S.contentsBoxVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: "tween" }}
                  onClick={() => onMovieBoxClick(movie.id)}
                  $bgPhoto={makeImagePath(
                    movie.backdrop_path || movie.poster_path,
                    "w500"
                  )}
                >
                  {movie.backdrop_path === null ? (
                    <NoImg>Image is being prepared.</NoImg>
                  ) : null}
                  <S.ContentsBoxInfo variants={S.infoVariants}>
                    <h4>{movie.title}</h4>
                  </S.ContentsBoxInfo>
                </S.ContentsBox>
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
