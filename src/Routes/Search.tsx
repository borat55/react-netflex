import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { getSearch, ISearch } from "../api";
import { useQuery } from "react-query";
import { Loader } from "./Home";
import { makeImagePath } from "../utils";
import { AnimatePresence } from "framer-motion";
import { Overlay } from "../style component/sliderContentsStyle";
import ChosenMovie from "../Components/movie/ChosenMovie";
import ChosenTV from "../Components/tv/ChosenTv";
import { useRecoilState } from "recoil";
import { chosenMovieCategory, chosenTVCategory } from "../atom";
import { useEffect } from "react";
import * as Se from "../style component/searchContentsStyle";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const navigate = useNavigate();
  const chosenResultBox = useMatch("/search/:contentId/detail");

  const [c_movieCategory, setC_movieCategory] =
    useRecoilState(chosenMovieCategory);
  const [c_TVCategory, setC_TVCategory] = useRecoilState(chosenTVCategory);

  const { data, isLoading, refetch } = useQuery<ISearch>(["searchResult"], () =>
    getSearch(keyword)
  );

  useEffect(() => {
    refetch();
  }, [refetch, keyword]);

  const movieArray = data?.results.filter(
    (type) => type.media_type === "movie"
  );
  const tvArray = data?.results.filter((type) => type.media_type === "tv");

  const movieYearSorted = movieArray?.sort((a, b) => {
    if (a.release_date < b.release_date) return 1;
    if (a.release_date > b.release_date) return -1;
    return 0;
  });
  const tvYearSorted = tvArray?.sort((a, b) => {
    if (a.first_air_date < b.first_air_date) return 1;
    if (a.first_air_date > b.first_air_date) return -1;
    return 0;
  });

  const chosenContentObj = data?.results.find(
    (chosenItem) => chosenItem.id === Number(chosenResultBox?.params.contentId)
  );

  function onResultBoxClick(contentId: number | null) {
    navigate(`/search/${contentId}/detail?keyword=${keyword}`);
    if (
      data?.results.find((chosenItem) => chosenItem.id === contentId)
        ?.media_type === "tv"
    ) {
      setC_TVCategory("searchedTv");
    }
    if (
      data?.results.find((chosenItem) => chosenItem.id === contentId)
        ?.media_type === "movie"
    ) {
      setC_movieCategory("searchedMovie");
    }
  }

  return (
    <>
      <Se.RecheckSearchKeyword>
        <Se.ResultOfSearch>
          Result of searching with the keyword{" "}
        </Se.ResultOfSearch>
        <Se.WithKeyword>{keyword}</Se.WithKeyword>
      </Se.RecheckSearchKeyword>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Se.SearchContainer>
          {movieYearSorted ? (
            <Se.ResultMediaType> 🎬 Movies : </Se.ResultMediaType>
          ) : null}

          <Se.SearchRowResult>
            {movieYearSorted?.map((content) =>
              content.media_type === "movie" ? (
                <Se.ResultBox
                  key={content.id}
                  onClick={() => onResultBoxClick(content.id)}
                  layoutId={c_movieCategory + content.id + ""}
                  variants={Se.contentsBoxVariants}
                  initial="normal"
                  whileHover="hover"
                  thum_img={makeImagePath(
                    content.backdrop_path || content.poster_path
                  )}
                >
                  {content.backdrop_path === null &&
                  content.poster_path === null ? (
                    <Se.NoImg>Image is being prepared.</Se.NoImg>
                  ) : null}
                  <Se.ResultContentsInfo variants={Se.ContentsInfoVariants}>
                    <Se.ResultContentsInfoText
                      title_length={content.original_title.length}
                    >
                      {content.original_title}
                    </Se.ResultContentsInfoText>
                  </Se.ResultContentsInfo>
                </Se.ResultBox>
              ) : null
            )}
          </Se.SearchRowResult>

          {tvYearSorted ? (
            <Se.ResultMediaType>📺 TV Series : </Se.ResultMediaType>
          ) : null}

          <Se.SearchRowResult>
            {tvYearSorted?.map((content) =>
              content.media_type === "tv" ? (
                <Se.ResultBox
                  key={content.id}
                  onClick={() => onResultBoxClick(content.id)}
                  layoutId={c_TVCategory + content.id}
                  variants={Se.contentsBoxVariants}
                  initial="normal"
                  whileHover="hover"
                  thum_img={makeImagePath(
                    content.backdrop_path || content.poster_path
                  )}
                >
                  {content.backdrop_path === null &&
                  content.poster_path === null ? (
                    <Se.NoImg>Image is being prepared.</Se.NoImg>
                  ) : null}
                  <Se.ResultContentsInfo variants={Se.ContentsInfoVariants}>
                    <Se.ResultContentsInfoText
                      title_length={content.original_name.length}
                    >
                      {content.original_name}
                    </Se.ResultContentsInfoText>
                  </Se.ResultContentsInfo>
                </Se.ResultBox>
              ) : null
            )}
          </Se.SearchRowResult>
        </Se.SearchContainer>
      )}
      <AnimatePresence>
        {chosenResultBox ? (
          <>
            <Overlay
              onClick={() => {
                navigate(-1);
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {chosenContentObj?.media_type === "tv" ? (
              <ChosenTV
                category={c_TVCategory}
                chosenTVId={chosenResultBox?.params.contentId}
              />
            ) : chosenContentObj?.media_type === "movie" ? (
              <ChosenMovie
                category={c_movieCategory}
                chosenMovieId={chosenResultBox?.params.contentId}
              />
            ) : null}
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Search;
