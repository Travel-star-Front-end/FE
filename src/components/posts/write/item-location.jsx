import * as s from "../../../styles/posts/write/write";

const ItemMusic = ({ location, onSelect }) => {
  return (
    <s.ItemContainer onClick={() => onSelect(location)}>
      <s.ItemP>{location.formatted_address}</s.ItemP>
    </s.ItemContainer>
  );
};

export default ItemMusic;
