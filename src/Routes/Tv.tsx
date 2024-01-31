import styled from "styled-components";
import {
  IGetTVResult,
  getTVAiringToday,
  getTVPopular,
  getTVTopRated,
} from "../api";
import { useQuery } from "react-query";
import BannerMovie from "../Components/movie/BannerMovie";
import SliderTv from "../Components/tv/SliderTv";

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

function Tv() {
  const { data: data_AiringToday, isLoading: loading_AiringToday } =
    useQuery<IGetTVResult>(["TV", "TVairingToday"], getTVAiringToday);

  const { data: data_Popular, isLoading: loading_Popular } =
    useQuery<IGetTVResult>(["TV", "TVPopular"], getTVPopular);

  const { data: data_TopRated, isLoading: loading_TopRated } =
    useQuery<IGetTVResult>(["TV", "TVTopRated"], getTVTopRated);

  const loading = loading_AiringToday || loading_Popular || loading_TopRated;

  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <BannerMovie
            data={data_AiringToday}
            title={data_AiringToday?.results[0].name}
          />

          <SliderTv
            data={data_AiringToday}
            slidesTitle="Airing Today"
            category="TVNowPlaying"
          />

          <SliderTv
            data={data_Popular}
            slidesTitle="Popular"
            category="TVPopular"
          />

          <SliderTv
            data={data_TopRated}
            slidesTitle="Top Rated"
            category="TVTopRated"
          />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
