import styled from "styled-components";

export const Banner = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

export const Title = styled.h2`
  font-size: 68px;
  font-weight: 900;
  text-shadow: 3px 3px ${(props) => props.theme.black.lighter};
  margin-bottom: 20px;
`;

export const Overview = styled.p`
  font-size: 25px;
  text-shadow: 2px 1px ${(props) => props.theme.black.lighter};
  width: 50%;
`;

export const BannerBtns = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const PlayBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${(props) => props.theme.white.lighter};
  font-size: 20px;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 30px;
  box-shadow: 2px 1px ${(props) => props.theme.black.lighter};
  svg {
    margin-right: 7px;
  }
`;

export const InfoBtn = styled.button`
  border: none;
  background-color: ${(props) => props.theme.black.lighter};
  color: white;
  font-size: 20px;
  width: 180px;
  height: 40px;
  border-radius: 5px;
  cursor: pointer;
`;
