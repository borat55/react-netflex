import * as B from "../../style component/bannerMovieStyle";
import { makeImagePath } from "../../utils";
import { useNavigate } from "react-router-dom";
import { IGetMoviesResult, IGetTVResult } from "../../api";

export interface IMovieInfosProps {
  data: IGetMoviesResult | IGetTVResult | undefined;
  title: string | undefined;
}

function BannerMovie({ data, title }: IMovieInfosProps) {
  const navigate = useNavigate();
  const onMovieBoxClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <B.Banner
      $bgPhoto={makeImagePath(
        data?.results[0]?.backdrop_path || data?.results[0]?.poster_path || ""
      )}
    >
      <B.Title>{title}</B.Title>
      <B.Overview>{data?.results[0]?.overview}</B.Overview>
      <B.BannerBtns>
        <B.PlayBtn>
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
        </B.PlayBtn>
        <B.InfoBtn onClick={() => onMovieBoxClick(Number(data?.results[0].id))}>
          ⓘ Information
        </B.InfoBtn>
      </B.BannerBtns>
    </B.Banner>
  );
}

export default BannerMovie;
