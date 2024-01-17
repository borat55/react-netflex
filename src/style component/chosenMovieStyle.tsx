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

export const ChosenMovieCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
  z-index: -999;
`;

export const ChosenMovieCloseBtn = styled.button`
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

export const ChosenMovieTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 40px;
  font-weight: 700;
  position: relative;
  top: -60px;
  left: 20px;
  padding: 10px;
  width: 90%;
`;

export const ChosenMovieTitleTagline = styled.h3`
  color: ${(props) => props.theme.white.darker};
  font-size: 17px;
  font-weight: 600;
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

export const ChosenMovieReleaseDate = styled.h4`
  border: 1px solid ${(props) => props.theme.white.darker};
  border-radius: 3px;
  padding: 2px 3px;
  color: #1cc11c;
  font-size: 20px;
  font-weight: 600;
  margin-right: 13px;
`;

export const ChosenMovieGenre = styled.h4`
  color: ${(props) => props.theme.white.darker};
  font-size: 20px;
  font-weight: 600;
  margin-right: 5px;
  white-space: nowrap;
`;

export const ChosenMovieRate = styled.h4`
  color: ${(props) => props.theme.white.darker};
  font-size: 20px;
  font-weight: 600;
  margin-left: 8px;
`;

export const OverviewCreditBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const ChosenMovieOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 18px;
  width: 60%;
  line-height: 25px;
`;

export const MovieCreditsBox = styled.div`
  width: 30%;
`;

export const MovieCasts = styled.h4`
  display: inline-block;
  margin-right: 3px;
  line-height: 25px;
`;

export const MovieDirector = styled.h4`
  margin-top: 10px;
`;
