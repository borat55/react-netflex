import styled from "styled-components";
import { IGetMoviesResult, getMovies } from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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

const MovieBox = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.$bgPhoto});
  font-size: 65px;
  background-size: cover;
  background-position: center center;

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

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
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

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((pre) => !pre);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider onClick={increaseIndex}>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial={"hidden"}
                animate={"visible"}
                transition={{ type: "tween", duration: 1 }}
                exit={"exit"}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <MovieBox
                      key={movie.id}
                      variants={movieBoxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
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
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
