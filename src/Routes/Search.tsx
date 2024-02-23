import { useLocation } from "react-router-dom";
import { getSearch, ISearch } from "../api";
import { useQuery } from "react-query";
import { Loader } from "./Home";
import styled from "styled-components";
import { makeImagePath } from "../utils";

const SearchContainer = styled.div`
  margin: 100px 0 100px 60px;
`;

const ResultOn = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
`;

const ResultBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ResultContentsLink = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.white.darker};
`;

const ResultImage = styled.div<{ thumImg: string }>`
  width: 100px;
  height: 100px;
  margin-right: 20px;
  background-size: cover;
  border-radius: 5px;
  background-image: url(${(props) => props.thumImg});
  box-shadow: 2px 2px 20px ${(props) => props.theme.black.darker};
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isLoading } = useQuery<ISearch>(["searchResult", keyword], () =>
    getSearch(keyword)
  );

  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <SearchContainer>
          {data?.results.map((content) => content.media_type === "movie") ? (
            <ResultOn> Result on Movies : </ResultOn>
          ) : null}

          {data?.results.map((content) =>
            content.media_type === "movie" ? (
              <ResultBox>
                <ResultImage
                  thumImg={makeImagePath(
                    content.backdrop_path || content.poster_path
                  )}
                ></ResultImage>
                <ResultContentsLink>
                  {content.original_title}
                </ResultContentsLink>
              </ResultBox>
            ) : null
          )}

          {data?.results.map((content) => content.media_type === "tv") ? (
            <ResultOn style={{ marginTop: "50px" }}>
              Result on TV Series :{" "}
            </ResultOn>
          ) : null}

          {data?.results.map((content) =>
            content.media_type === "tv" ? (
              <ResultBox>
                <ResultImage
                  thumImg={makeImagePath(
                    content.backdrop_path || content.poster_path
                  )}
                ></ResultImage>
                <ResultContentsLink>{content.original_name}</ResultContentsLink>
              </ResultBox>
            ) : null
          )}
        </SearchContainer>
      )}
    </>
  );
}

export default Search;
