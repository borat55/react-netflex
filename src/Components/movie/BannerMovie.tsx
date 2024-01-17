import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { moviesResult } from "../../atom";
import { makeImagePath } from "../../utils";
import { useNavigate } from "react-router-dom";

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

function BannerMovie() {
  const getMoviesResult = useRecoilValue(moviesResult);
  const navigate = useNavigate();
  const onMovieBoxClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <Banner
      $bgPhoto={makeImagePath(
        getMoviesResult[0]?.backdrop_path ||
          getMoviesResult[0]?.poster_path ||
          ""
      )}
    >
      <Title>{getMoviesResult[0]?.title}</Title>
      <Overview>{getMoviesResult[0]?.overview}</Overview>
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
        <InfoBtn onClick={() => onMovieBoxClick(Number(getMoviesResult[0].id))}>
          ⓘ Information
        </InfoBtn>
      </BannerBtns>
    </Banner>
  );
}

export default BannerMovie;
