import { motion } from "framer-motion";
import styled from "styled-components";

export const Chosen = styled(motion.div)`
  position: absolute;
  width: 50vw;
  height: 90vh;
  background-color: ${(props) => props.theme.black.darker};
  right: 0;
  left: 0;
  z-index: 999;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
`;

export const ChosenContentsCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
  z-index: -999;
`;

export const ChosenContentsCloseBtn = styled.button`
  cursor: pointer;
  color: ${(props) => props.theme.white.darker};
  font-size: 40px;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: ${(props) => props.theme.black.darker};
  border: none;
  border-radius: 50%;
  position: absolute;
  top: 25px;
  right: 20px;
  z-index: 3;
`;

export const ChosenContentsTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 40px;
  font-weight: 700;
  position: relative;
  top: -60px;
  left: 20px;
  padding: 10px;
  width: 90%;
`;

export const ChosenContentsTitleTagline = styled.h3`
  color: ${(props) => props.theme.white.darker};
  font-size: 18px;
  font-weight: 400;
  position: relative;
  top: -65px;
  left: 35px;
  width: 90%;
`;

export const YearGenreRateBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  top: -30px;
  left: 35px;
`;

export const ChosenContentsReleaseDate = styled.h4`
  border: 1px solid ${(props) => props.theme.white.darker};
  border-radius: 3px;
  padding: 2px 3px;
  color: #1cc11c;
  font-size: 20px;
  font-weight: 600;
  margin-right: 13px;
`;

export const ChosenContentsGenre = styled.h4`
  color: ${(props) => props.theme.white.darker};
  font-size: 20px;
  font-weight: 600;
  margin-right: 5px;
  white-space: nowrap;
`;

export const ChosenContentsRate = styled.h4`
  color: ${(props) => props.theme.white.darker};
  font-size: 20px;
  font-weight: 600;
  margin-left: 8px;
`;

export const OverviewCreditBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const ChosenContentsOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 18px;
  width: 60%;
  line-height: 25px;
`;

export const ContentsCreditsBox = styled.div`
  width: 30%;
`;

export const ContentsCasts = styled.h4`
  display: inline-block;
  margin-right: 3px;
  line-height: 25px;
`;

export const CastingTitle = styled.div``;
