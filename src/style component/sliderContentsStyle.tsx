import styled from "styled-components";
import { motion } from "framer-motion";

export const Slider = styled.div`
  height: 220px;
  position: relative;
  top: -100px;
  margin-bottom: 60px;
`;

export const SliderTitle = styled.h4`
  position: relative;
  top: -15px;
  left: 10px;
  font-size: 30px;
  color: ${(props) => props.theme.white.lighter};
  font-weight: 500;
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
  // The "top", "left", "right" are given in the component of the SliderMovie file. //
  padding: 10px;
  svg {
    fill: ${(props) => props.theme.white.darker};
  }
  &:hover {
    svg {
      fill: ${(props) => props.theme.black.lighter};
    }
  }
`;

export const ContentsBox = styled(motion.div)<{ $bgPhoto: string }>`
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

export const ContentsBoxInfo = styled(motion.div)`
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

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const rowVariants = {
  hidden: (isBack: boolean) => ({
    x: isBack ? -window.outerWidth + 5 : window.outerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (isBack: boolean) => ({
    x: isBack ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.4,
      type: "tween",
    },
  },
};

export const contentsBoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    borderRadius: 7,
    transition: {
      delay: 0.3,
      duration: 0.4,
      type: "tween",
    },
  },
};
