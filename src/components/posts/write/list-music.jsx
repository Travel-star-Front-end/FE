import * as s from "../../../styles/posts/write/write";
import ItemMusic from "./item-music";

const ListMusic = ({ musicResults, musicQuery, handleMusicSelect }) => {
  if (!musicQuery || musicResults.length === 0) return null;

  return (
    <s.ListContainer>
      {musicResults.map((track) => (
        <ItemMusic 
          key={track.id} 
          track={track} 
          handleMusicSelect={handleMusicSelect} 
        />
      ))}
    </s.ListContainer>
  );
};

export default ListMusic;
