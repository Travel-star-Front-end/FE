import React from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";
import ItemMusic from "./item-music";

const ListContainer = styled.div`
    position: absolute;
    width: 100%;
    background-color: ${colors.writeGray};
    z-index: 10;
    margin-top: 0.5vw;
`;

const ListMusic = ({ musicResults, musicQuery, handleMusicSelect }) => {
  if (!musicQuery || musicResults.length === 0) return null;

  return (
    <ListContainer>
      {musicResults.map((track) => (
        <ItemMusic 
          key={track.id} 
          track={track} 
          handleMusicSelect={handleMusicSelect} 
        />
      ))}
    </ListContainer>
  );
};

export default ListMusic;
