import { motion } from "framer-motion";
import styled from "styled-components";

export const RecheckSearchKeyword = styled.div`
  margin: 120px 0 0 60px;
  display: flex;
  align-items: center;
`;

export const ResultOfSearch = styled.div`
  color: ${(props) => props.theme.black.lighter};
  font-size: 25px;
  font-weight: 400;
  margin-right: 8px;
`;

export const WithKeyword = styled(ResultOfSearch)`
  color: ${(props) => props.theme.white.darker};
`;

export const SearchContainer = styled.div`
  margin-bottom: 100px;
`;

export const ResultMediaType = styled.div`
  font-size: 28px;
  font-weight: 400;
  margin: 120px 0 30px 60px;
`;

export const SearchRowResult = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 95%;
  margin: 0 auto;
`;

export const ResultBox = styled(motion.div)<{ thum_img: string }>`
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

export const ResultContentsInfo = styled(motion.div)`
  color: ${(props) => props.theme.black.darker};
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  padding: 5px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const ResultContentsInfoText = styled.h4<{ title_length: number }>`
  font-size: ${(props) => (props.title_length > 15 ? "15px" : "20px")};

  text-align: center;
`;

export const contentsBoxVariants = {
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

export const ContentsInfoVariants = {
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
