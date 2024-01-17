import styled from "styled-components";
import { motion } from "framer-motion";

export const Slider = styled.div`
  position: relative;
  top: -100px;
`;

export const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

export const RowBtn = styled.button`
  background-color: transparent;
  border: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
  position: absolute;
  padding: 10px;
  svg {
    fill: rgb(238, 238, 238);
  }
  &:hover {
    svg {
      fill: rgba(238, 238, 238, 0.7);
    }
  }
`;

export const MovieBox = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.$bgPhoto});
  font-size: 65px;
  background-size: cover;
  background-position: center center;
  overflow: hidden;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export const MovieBoxInfo = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;