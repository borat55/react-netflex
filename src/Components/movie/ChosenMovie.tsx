import { useScroll } from "framer-motion";
import { makeImagePath } from "../../utils";
import { useNavigate } from "react-router-dom";
import * as C from "../../style component/chosenContentsStyle";
import {
  IMovieDetails,
  IMovieCredits,
  getMovieDetails,
  getMovieCredits,
} from "../../api";
import { useQuery } from "react-query";
import { Loader } from "../../Routes/Home";
import { chosenMovieCategory } from "../../atom";
import { useRecoilValue } from "recoil";

export interface IMovieInfosProps {
  category: string;
  chosenMovieId: string | undefined;
}

const ChosenMovie = ({ category, chosenMovieId }: IMovieInfosProps) => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const c_movieCategory = useRecoilValue(chosenMovieCategory);

  const { data: movieDetail, isLoading: movieDetailLoading } =
    useQuery<IMovieDetails>(["movie_details", category, chosenMovieId], () =>
      getMovieDetails(Number(chosenMovieId))
    );

  const { data: movieCredits, isLoading: movieCreditsLoading } =
    useQuery<IMovieCredits>(["movie_credits", category, chosenMovieId], () =>
      getMovieCredits(Number(chosenMovieId))
    );

  const loading = movieDetailLoading || movieCreditsLoading;
  // console.log(category);
  return (
    <>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <C.Chosen
          style={{ top: scrollY.get() + 40 }}
          layoutId={c_movieCategory + chosenMovieId + ""}
        >
          {chosenMovieId && (
            <>
              <C.ChosenContentsCover
                style={{
                  backgroundImage: `linear-gradient(to top, rgb(24,24,24),35%, transparent), url(${makeImagePath(
                    movieDetail?.backdrop_path ||
                      movieDetail?.poster_path ||
                      "",
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
                {movieDetail?.original_title}
              </C.ChosenContentsTitle>
              <C.ChosenContentsTitleTagline>
                {movieDetail?.original_title} : {movieDetail?.tagline}
              </C.ChosenContentsTitleTagline>
              <C.YearGenreRateBox>
                <C.ChosenContentsReleaseDate>
                  {movieDetail?.release_date.slice(0, 4)}
                </C.ChosenContentsReleaseDate>
                {movieDetail?.genres.map((genre, index) => (
                  <C.ChosenContentsGenre key={genre.id}>
                    {genre.name}
                    {index !== movieDetail.genres.length - 1 && " ·"}
                  </C.ChosenContentsGenre>
                ))}
                <C.ChosenContentsRate>
                  ⭐{movieDetail?.vote_average.toFixed(1)}
                </C.ChosenContentsRate>
              </C.YearGenreRateBox>
              <C.OverviewCreditBox>
                <C.ChosenContentsOverview>
                  {movieDetail?.overview}
                </C.ChosenContentsOverview>
                <C.ContentsCreditsBox>
                  {movieCredits?.cast
                    ?.slice(0, 4)
                    .some(
                      (actor) => actor.known_for_department === "Acting"
                    ) && <C.CastingTitle>Casting : </C.CastingTitle>}

                  {movieCredits?.cast.slice(0, 4).map((actor, index) =>
                    actor.known_for_department === "Acting" ? (
                      <C.ContentsCasts key={actor.id}>
                        {actor.name}
                        {index !== movieCredits.cast.slice(0, 4).length - 1
                          ? ","
                          : null}
                      </C.ContentsCasts>
                    ) : null
                  )}

                  {movieCredits?.crew.some(
                    (director) =>
                      (director.job === "Director" &&
                        director.known_for_department === "Directing") ||
                      (director.job === "Director" &&
                        director.known_for_department === "Acting") ||
                      (director.job === "Director" &&
                        director.known_for_department === "Production") ||
                      (director.job === "Director" &&
                        director.known_for_department === "Crew")
                  ) && (
                    <C.CastingTitle style={{ marginTop: "20px" }}>
                      Production :
                    </C.CastingTitle>
                  )}

                  {movieCredits?.crew.map((director, index) =>
                    (director.job === "Director" &&
                      director.known_for_department === "Directing") ||
                    (director.job === "Director" &&
                      director.known_for_department === "Acting") ||
                    (director.job === "Director" &&
                      director.known_for_department === "Production") ||
                    (director.job === "Director" &&
                      director.known_for_department === "Crew") ? (
                      <C.ContentsCasts key={director.id}>
                        {director.name}
                        {index === 0 ? "," : null}
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

export default ChosenMovie;
