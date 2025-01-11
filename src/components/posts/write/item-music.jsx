import React from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";

const ItemContainer = styled.div`
    width: 100%;
    padding: 0.5vw;
    cursor: pointer;
    border-bottom: 0.05vw solid ${colors.white};

    &:hover {
        background-color: ${colors.writeGray2};
    }
`;

const ItemP = styled.p`
    font-size: 1.2vw;
    font-weight: 400;
    color: ${colors.sideBarGray2};
`

const ItemMusic = ({ track, handleMusicSelect }) => {
  return (
    <ItemContainer onClick={() => handleMusicSelect(track)}>
      <ItemP>{track.name} - {track.artists[0].name}</ItemP>
    </ItemContainer>
  );
};

export default ItemMusic;
