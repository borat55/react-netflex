import { useLocation } from "react-router-dom";
import { getSearch, ISearch } from "../api";
import { useQuery } from "react-query";
import { Loader } from "./Home";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion } from "framer-motion";

const RecheckSearchKeyword = styled.div`
  margin: 120px 0 0 60px;
  display: flex;
  align-items: center;
`;

const ResultOfSearch = styled.div`
  color: ${(props) => props.theme.black.lighter};
  font-size: 25px;
  font-weight: 400;
  margin-right: 8px;
`;

const WithKeyword = styled(ResultOfSearch)`
  color: ${(props) => props.theme.white.darker};
`;

const SearchContainer = styled.div`
  margin-bottom: 100px;
`;

const ResultMediaType = styled.div`
  font-size: 28px;
  font-weight: 400;
  margin: 120px 0 30px 60px;
`;

const SearchRowResult = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 95%;
  margin: 0 auto;
`;

const ResultBox = styled(motion.div)<{ thum_img: string }>`
  width: 280px;
  height: 180px;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  background-image: url(${(props) => props.thum_img});
  box-shadow: 2px 2px 20px ${(props) => props.theme.black.darker};
  background-color: ${(props) =>
    props.thum_img === "https://image.tmdb.org/t/p/original/null"
      ? props.theme.black.darker
      : null};
  position: relative;
  width: 280px;
  height: 180px;
  overflow: hidden;
`;

export const NoImg = styled(motion.h4)`
  font-size: 25px;
  font-weight: 400;
  color: ${(props) => props.theme.black.lighter};
  position: absolute;
  left: 10px;
  top: 40%;
`;

const ResultContentsInfo = styled(motion.div)`
  color: ${(props) => props.theme.black.darker};
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  padding: 5px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const ResultContentsInfoText = styled.h4<{ title_length: number }>`
  font-size: ${(props) => (props.title_length > 15 ? "15px" : "20px")};

  text-align: center;
`;

const contentsBoxVariants = {
  normal: { scale: 1 },
  hover: {
    zIndex: 1,
    y: -30,
    scale: 1.2,
    borderRadius: "5px",
    transition: {
      delay: 0.3,
      duration: 0.2,
      type: "leaner",
    },
  },
};

const ContentsInfoVariants = {
  normal: { scale: 1 },
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.2,
      type: "leaner",
    },
  },
};

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isLoading } = useQuery<ISearch>(["searchResult", keyword], () =>
    getSearch(keyword)
  );

  let yearSortArray = data?.results;
  let yearSorted = yearSortArray?.sort((a, b) => {
    if (a.release_date > b.release_date || a.first_air_date > b.first_air_date)
      return 1;
    if (a.release_date < b.release_date || a.first_air_date < b.first_air_date)
      return -1;
    return 0;
  });

  return (
    <>
      <RecheckSearchKeyword>
        <ResultOfSearch>Result of searching with the keyword </ResultOfSearch>
        <WithKeyword>{keyword}</WithKeyword>
      </RecheckSearchKeyword>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <SearchContainer>
          {yearSorted?.map((content) => content.media_type === "movie") ? (
            <ResultMediaType> 🎬 Movies : </ResultMediaType>
          ) : null}

          <SearchRowResult>
            {yearSorted?.map((content) =>
              content.media_type === "movie" ? (
                <ResultBox
                  key={content.id}
                  variants={contentsBoxVariants}
                  initial="normal"
                  whileHover="hover"
                  thum_img={makeImagePath(
                    content.backdrop_path || content.poster_path
                  )}
                >
                  {content.backdrop_path === null &&
                  content.poster_path === null ? (
                    <NoImg>Image is being prepared.</NoImg>
                  ) : null}
                  <ResultContentsInfo variants={ContentsInfoVariants}>
                    <ResultContentsInfoText
                      title_length={content.original_title.length}
                    >
                      {content.original_title}
                    </ResultContentsInfoText>
                  </ResultContentsInfo>
                </ResultBox>
              ) : null
            )}
          </SearchRowResult>

          {yearSorted?.map((content) => content.media_type === "tv") ? (
            <ResultMediaType>📺 TV Series : </ResultMediaType>
          ) : null}

          <SearchRowResult>
            {yearSorted?.map((content) =>
              content.media_type === "tv" ? (
                <ResultBox
                  key={content.id}
                  variants={contentsBoxVariants}
                  initial="normal"
                  whileHover="hover"
                  thum_img={makeImagePath(
                    content.backdrop_path || content.poster_path
                  )}
                >
                  <ResultContentsInfo variants={ContentsInfoVariants}>
                    <ResultContentsInfoText
                      title_length={content.original_name.length}
                    >
                      {content.original_name}
                    </ResultContentsInfoText>
                  </ResultContentsInfo>
                </ResultBox>
              ) : null
            )}
          </SearchRowResult>
        </SearchContainer>
      )}
    </>
  );
}

export default Search;
