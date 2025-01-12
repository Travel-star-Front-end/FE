import * as s from "../../../styles/posts/write/write";

const ItemMusic = ({ track, handleMusicSelect }) => {
  return (
    <s.ItemContainer onClick={() => handleMusicSelect(track)}>
      <s.ItemP>{track.name} - {track.artists[0].name}</s.ItemP>
    </s.ItemContainer>
  );
};

export default ItemMusic;
