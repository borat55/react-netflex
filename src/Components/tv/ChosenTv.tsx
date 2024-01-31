import { useScroll } from "framer-motion";
import { makeImagePath } from "../../utils";
import { useNavigate } from "react-router-dom";
import * as C from "../../style component/chosenMovieStyle";
import { useQuery } from "react-query";
import { Loader } from "../../Routes/Home";
import { chosenTVCategory } from "../../atom";
import { useRecoilValue } from "recoil";
import { getTVDetails, ITVDetails, ITVCredits, getTVCredits } from "../../api";

export interface IMovieInfosProps {
  category: string;
  chosenTVId: string | undefined;
}

const ChosenTV = ({ category, chosenTVId }: IMovieInfosProps) => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const c_TVCategory = useRecoilValue(chosenTVCategory);

  const { data: TVDetail, isLoading: TVDetailLoading } = useQuery<ITVDetails>(
    ["tv_details", category, chosenTVId],
    () => getTVDetails(Number(chosenTVId))
  );

  const { data: TVCredits, isLoading: TVCreditLoading } = useQuery<ITVCredits>(
    ["tv_credits", category, chosenTVId],
    () => getTVCredits(Number(chosenTVId))
  );

  const loading = TVDetailLoading || TVCreditLoading;

  return (
    <>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <C.Chosen
          style={{ top: scrollY.get() + 40 }}
          layoutId={c_TVCategory + chosenTVId + ""}
        >
          {chosenTVId && (
            <>
              <C.ChosenMovieCover
                style={{
                  backgroundImage: `linear-gradient(to top, rgb(24,24,24),35%, transparent), url(${makeImagePath(
                    TVDetail?.backdrop_path || TVDetail?.poster_path || "",
                    "w500"
                  )})`,
                }}
              />
              <C.ChosenMovieCloseBtn
                onClick={() => {
                  navigate(-1);
                }}
              >
                &times;
              </C.ChosenMovieCloseBtn>
              <C.ChosenMovieTitle>{TVDetail?.original_name}</C.ChosenMovieTitle>
              <C.ChosenMovieTitleTagline>
                {TVDetail?.original_name} {TVDetail?.tagline ? ":" : null}{" "}
                {TVDetail?.tagline}
              </C.ChosenMovieTitleTagline>
              <C.YearGenreRateBox>
                <C.ChosenMovieReleaseDate>
                  {TVDetail?.first_air_date.slice(0, 4)}
                </C.ChosenMovieReleaseDate>
                {TVDetail?.genres.map((genre, index) => (
                  <C.ChosenMovieGenre key={genre.id}>
                    {genre.name}
                    {index !== TVDetail.genres.length - 1 && " ·"}
                  </C.ChosenMovieGenre>
                ))}
                <C.ChosenMovieRate>
                  ⭐{TVDetail?.vote_average.toFixed(1)}
                </C.ChosenMovieRate>
              </C.YearGenreRateBox>
              <C.OverviewCreditBox>
                <C.ChosenMovieOverview>
                  {TVDetail?.overview}
                </C.ChosenMovieOverview>
                <C.MovieCreditsBox>
                  {TVCredits?.cast?.slice(0, 4).map((actor, index) =>
                    actor.known_for_department === "Acting" ? (
                      <C.MovieCasts key={actor.id}>
                        {index === 0 ? "Casting : " : null}
                        {actor.name}
                        {index !== TVCredits.cast.slice(0, 4).length - 1
                          ? ","
                          : null}
                      </C.MovieCasts>
                    ) : null
                  )}
                  {TVCredits?.crew?.map((director, index) =>
                    director.job === "Director" ? (
                      <C.MovieDirector key={director.id}>
                        Director : {director.name}
                      </C.MovieDirector>
                    ) : null
                  )}
                </C.MovieCreditsBox>
              </C.OverviewCreditBox>
            </>
          )}
        </C.Chosen>
      )}
    </>
  );
};

export default ChosenTV;
