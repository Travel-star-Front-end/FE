import styled, { css } from "styled-components";
import colors from "../common/colors";

// ranking.jsx
export const RankingContainer = styled.div`
    background: ${colors.homeGray};
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 3.1vw 0 2.25vw 0;
`

export const RankingInnerContainer = styled.div`
    width: 90%;
`

export const RankingP = styled.p`
    font-size: 1.2vw;
    font-weight: 600;
    color: ${colors.sideBarGray2};
`

export const RankingBar = styled.div`
    width: 100%;
    height: 0.05vw;
    background: ${colors.writeGray};
    margin-top: 0.5vw;
`

export const RankingContentContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 1.1vw;
`

// rankingLeft.jsx
export const LeftContainer = styled.div`
    width: 68%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const BottomBar = styled.div`
    width: 100%;
    height: 0.05vw;
    background: ${colors.writeGray};
    margin: 2.75vw 0 0.95vw 0;
`

export const BottomContainer = styled.div`
    width: 100%;
`

// list-topRanking.jsx
export const ListTopContainer = styled.div`
    width: 100%;
    height: 23.75vw;
    background: ${colors.white};
    box-shadow: 0 0.2vw 0.68vw 0 rgba(0, 0, 0, 0.04);
`

export const ListTopP = styled.p`
    font-size: 1vw;
    font-weight: 600;
    color: ${colors.main};
    margin: 0.85vw 0 0 1.3vw;
`

export const ListTopInnerContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`

export const ListTopInnerContainer2 = styled.div`
    width: 100%;
    display: flex;
    text-align: center;
    margin-top: 9vw;
`

export const ErrorP = styled.p`
    width: 100%;
    font-size: 1vw;
    font-weight: 400;
    color: ${colors.sideBarGray2};
    opacity: 0.5;
`

// item-topRanking.jsx
export const ItemTopContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ItemTopInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9vw;
`

export const ItemTopImgContainer = styled.div`
    position: relative;
    width: 13.65vw;
    height: 13.65vw;
    border-radius: 50%;
    ${({ imageurl }) => imageurl && css`
        background-image: url(${imageurl});
        background-size: cover;
        background-position: center;
    `}
    background-color: ${colors.black};
`;


export const ItemTopRankingContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 4.05vw;
    height: 4.05vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.main};
    border-radius: 50%;
`

export const ItemTopRankingP = styled.p`
    font-size: 2vw;
    font-weight: 800;
    color: ${colors.white};
`

export const ItemTopPContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.3vw;
`

export const ItemTopP = styled.p`
    width: 100%;
    font-size: 0.7vw;
    font-weight: 700;
    color: ${colors.black};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
`

export const ItemTopViewContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`

export const ItemTopViewImg = styled.img`
    width: 1.2vw;
    height: 1.2vw;
`

export const ItemTopVoteButton = styled.button`
    width: 8.95vw;
    height: 2.1vw;
    border-radius: 0.25vw;
    cursor: pointer;
    font-size: 0.7vw;
    font-weight: 700;
    color: ${colors.white};
    background: ${colors.main};
`

// list-bottomRanking.jsx
export const ListBottomContainer = styled.div`
    width: 100%;
    height: 30vw;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-top: 1vw;
`

export const ListBottomContainer2 = styled.div`
    width: 100%;
    display: flex;
    text-align: center;
    margin-top: 6vw;
`

// item-bottomRanking.jsx
export const ItemBottomContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.35vw;
`

export const ItemBottomInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5vw;
`

export const ItemBottomImgContainer = styled.div`
    position: relative;
    width: 10.65vw;
    height: 10.65vw;
    border-radius: 50%;
    ${({ imageurl }) => imageurl && css`
        background-image: url(${imageurl});
        background-size: cover;
        background-position: center;
    `}
    background-color: ${colors.black};
`;


export const ItemBottomPContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

export const ItemBottomP = styled.p`
    width: 100%;
    font-size: 0.5vw;
    font-weight: 700;
    color: ${colors.black};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
`

export const ItemBottomP2 = styled.p`
    font-size: 0.6vw;
    font-weight: 500;
    color: ${colors.main};
`

export const ItemBottomViewContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`

export const ItemBottomVoteButton = styled.button`
    width: 6.7vw;
    height: 1.55vw;
    border-radius: 0.25vw;
    cursor: pointer;
    font-size: 0.7vw;
    font-weight: 700;
    color: ${colors.white};
    background: ${colors.main};
`

// rankingRight.jsx
export const RightContainer = styled.div`
  width: 30%;
  background: ${colors.white};
  height: 35.01vw;
  box-shadow: 0 0.2vw 0.68vw 0 rgba(0, 0, 0, 0.04);
  border-radius: 0.25vw;
  padding: 0 0.7vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImgContainer = styled.div`
  width: 16.1vw;
  height: 16.1vw;
  background: ${colors.black};
  border-radius: 50%;
  position: relative;
  margin-top: 3.2vw;
`;

export const ImgOutContainer = styled.div`
  width: 16.85vw;
  height: 16.85vw;
  display: ${({ completed }) => (completed === 'true' ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  border: 0.1vw solid ${colors.rankingGreen};
  border-radius: 50%;
  margin-top: 2.8vw;
  position: absolute;
`;

export const RightP = styled.p`
  font-size: 1.2vw;
  font-weight: 800;
  color: ${colors.black};
  margin-top: 2.2vw;
`;

export const InputContainer = styled.div`
  width: 100%;
  padding: 0 1.65vw;
`;

export const CompletedP = styled.p`
  font-size: 1.6vw;
  font-weight: 800;
  color: ${colors.main};
  margin-top: 1.3vw;
`;


// inputRankingRight.jsx
export const InputRightContainer = styled.input`
    width: 100%;
    height: 3.4vw;
    border: none;
    border-radius: 0.25vw;
    background: ${colors.homeGray};
    margin-top: 0.45vw;
    font-size: 0.8vw;
    font-weight: 400;
    color: ${colors.rankingGray};
`

// buttonRankingRight.jsx
export const ButtonRihgtContainer = styled.button`
    width: 100%;
    height: 3.05vw;
    background: ${colors.main};
    border: none;
    border-radius: 0.75vw;
    cursor: pointer;
    font-size: 1.1vw;
    font-weight: 800;
    color: ${colors.white};
    margin-top: 1.55vw;
`