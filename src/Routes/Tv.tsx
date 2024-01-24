import styled from "styled-components";
import {
  IGetTVResult,
  getTVAiringToday,
  getTVOnTheAir,
  getTVPopular,
  getTVTopRated,
} from "../api";
import { useQuery } from "react-query";
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

function Tv() {
  const { data: data_AiringToday, isLoading: loading_AiringToday } =
    useQuery<IGetTVResult>(["TV", "TVairingToday"], getTVAiringToday);

  const { data: data_OnTheAir, isLoading: loading_OnTheAir } =
    useQuery<IGetTVResult>(["TV", "TVOnTheAir"], getTVOnTheAir);

  const { data: data_Popular, isLoading: loading_Popular } =
    useQuery<IGetTVResult>(["TV", "TVPopular"], getTVPopular);

  const { data: data_TopRated, isLoading: loading_TopRated } =
    useQuery<IGetTVResult>(["TV", "TVTopRated"], getTVTopRated);

  const loading =
    loading_AiringToday ||
    loading_OnTheAir ||
    loading_Popular ||
    loading_TopRated;

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

          <SliderMovie
            data={data_AiringToday}
            slidesTitle="Airing Today"
            title={data_AiringToday?.results[0].name}
            category="Now_Playing"
          />

          <SliderMovie
            data={data_OnTheAir}
            slidesTitle="On The Air"
            title={data_OnTheAir?.results[0].name}
            category="On_The_Air"
          />

          <SliderMovie
            data={data_Popular}
            slidesTitle="Popular"
            title={data_Popular?.results[0].name}
            category="Popular"
          />

          <SliderMovie
            data={data_TopRated}
            slidesTitle="Top Rated"
            title={data_TopRated?.results[0].name}
            category="Top_Rated"
          />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;
