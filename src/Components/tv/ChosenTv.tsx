import { useScroll } from "framer-motion";
import { makeImagePath } from "../../utils";
import { useNavigate } from "react-router-dom";
import * as C from "../../style component/chosenContentsStyle";
import { useQuery } from "react-query";
import { Loader } from "../../Routes/Home";
import { chosenTVCategory } from "../../atom";
import { useRecoilValue } from "recoil";
import { getTVDetails, ITVDetails, ITVCredits, getTVCredits } from "../../api";

export interface ITVInfosProps {
  category: string;
  chosenTVId: string | undefined;
}

const ChosenTV = ({ category, chosenTVId }: ITVInfosProps) => {
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
              <C.ChosenContentsCover
                style={{
                  backgroundImage: `linear-gradient(to top, rgb(24,24,24),35%, transparent), url(${makeImagePath(
                    TVDetail?.backdrop_path || TVDetail?.poster_path || "",
                    "w500"
                  )})`,
                }}
              />
              <C.ChosenContentsCloseBtn
                onClick={() => {
                  navigate(-1);
                }}
              >
                &times;
              </C.ChosenContentsCloseBtn>
              <C.ChosenContentsTitle>
                {TVDetail?.original_name}
              </C.ChosenContentsTitle>
              <C.ChosenContentsTitleTagline>
                {TVDetail?.original_name} {TVDetail?.tagline ? ":" : null}{" "}
                {TVDetail?.tagline}
              </C.ChosenContentsTitleTagline>
              <C.YearGenreRateBox>
                <C.ChosenContentsReleaseDate>
                  {TVDetail?.first_air_date.slice(0, 4)}
                </C.ChosenContentsReleaseDate>
                {TVDetail?.genres.map((genre, index) => (
                  <C.ChosenContentsGenre key={genre.id}>
                    {genre.name}
                    {index !== TVDetail.genres.length - 1 && " ·"}
                  </C.ChosenContentsGenre>
                ))}
                <C.ChosenContentsRate>
                  ⭐{TVDetail?.vote_average.toFixed(1)}
                </C.ChosenContentsRate>
              </C.YearGenreRateBox>
              <C.OverviewCreditBox>
                <C.ChosenContentsOverview>
                  {TVDetail?.overview || "Overview is being prepared."}
                </C.ChosenContentsOverview>

                <C.ContentsCreditsBox>
                  {TVCredits?.cast
                    ?.slice(0, 4)
                    .some(
                      (actor) => actor.known_for_department === "Acting"
                    ) && <C.CastingTitle>Casting : </C.CastingTitle>}

                  {TVCredits?.cast?.slice(0, 4).map((actor, index) =>
                    actor.known_for_department === "Acting" ? (
                      <C.ContentsCasts key={actor.id}>
                        {actor.name}
                        {index !== TVCredits.cast.slice(0, 4).length - 1
                          ? ","
                          : null}
                      </C.ContentsCasts>
                    ) : null
                  )}

                  {TVCredits?.crew.some(
                    (director) =>
                      director.job === "Director" ||
                      director.job === "Original Story" ||
                      director.job === "Screenplay"
                  ) && (
                    <C.CastingTitle style={{ marginTop: "20px" }}>
                      Production :
                    </C.CastingTitle>
                  )}

                  {TVCredits?.crew.map((director, index) =>
                    director.job === "Director" ||
                    director.job === "Original Story" ||
                    director.job === "Screenplay" ? (
                      <C.ContentsCasts key={director.id}>
                        {director.name},
                      </C.ContentsCasts>
                    ) : null
                  )}
                </C.ContentsCreditsBox>
              </C.OverviewCreditBox>
            </>
          )}
        </C.Chosen>
      )}
    </>
  );
};

export default ChosenTV;
