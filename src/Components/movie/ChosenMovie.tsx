import { useScroll } from "framer-motion";
import { makeImagePath } from "../../utils";
import { useNavigate } from "react-router-dom";
import * as C from "../../style component/chosenMovieStyle";
import {
  IMovieDetails,
  IMovieCredits,
  getMovieDetails,
  getMovieCredits,
} from "../../api";
import { useQuery } from "react-query";
import { Loader } from "../../Routes/Home";

export interface IMovieInfosProps {
  category: string;
  chosenMovieId: string | undefined;
}

const ChosenMovie = ({ category, chosenMovieId }: IMovieInfosProps) => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  const { data: movieDetail, isLoading: movieDetailLoading } =
    useQuery<IMovieDetails>(["movie_detail", category, chosenMovieId], () =>
      getMovieDetails(Number(chosenMovieId))
    );

  const { data: movieCredits, isLoading: movieCreditsLoading } =
    useQuery<IMovieCredits>(["movie_credits", category, chosenMovieId], () =>
      getMovieCredits(Number(chosenMovieId))
    );

  const loading = movieDetailLoading || movieCreditsLoading;

  return (
    <>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <C.Chosen style={{ top: scrollY.get() + 40 }}>
          {chosenMovieId && (
            <>
              <C.ChosenMovieCover
                style={{
                  backgroundImage: `linear-gradient(to top, rgb(24,24,24),35%, transparent), url(${makeImagePath(
                    movieDetail?.backdrop_path ||
                      movieDetail?.poster_path ||
                      "",
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
              <C.ChosenMovieTitle>
                {movieDetail?.original_title}
              </C.ChosenMovieTitle>
              <C.ChosenMovieTitleTagline>
                {movieDetail?.original_title} : {movieDetail?.tagline}
              </C.ChosenMovieTitleTagline>
              <C.YearGenreRateBox>
                <C.ChosenMovieReleaseDate>
                  {movieDetail?.release_date.slice(0, 4)}
                </C.ChosenMovieReleaseDate>
                {movieDetail?.genres.map((genre, index) => (
                  <C.ChosenMovieGenre key={genre.id}>
                    {genre.name}
                    {index !== movieDetail.genres.length - 1 && " ·"}
                  </C.ChosenMovieGenre>
                ))}
                <C.ChosenMovieRate>
                  ⭐{movieDetail?.vote_average.toFixed(1)}
                </C.ChosenMovieRate>
              </C.YearGenreRateBox>
              <C.OverviewCreditBox>
                <C.ChosenMovieOverview>
                  {movieDetail?.overview}
                </C.ChosenMovieOverview>
                <C.MovieCreditsBox>
                  {movieCredits?.cast.slice(0, 4).map((actor, index) =>
                    actor.known_for_department === "Acting" ? (
                      <C.MovieCasts key={actor.id}>
                        {index === 0 ? "Casting : " : null}
                        {actor.name}
                        {index !== movieCredits.cast.slice(0, 4).length - 1
                          ? ","
                          : null}
                      </C.MovieCasts>
                    ) : null
                  )}
                  {movieCredits?.crew.map((director, index) =>
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

export default ChosenMovie;
