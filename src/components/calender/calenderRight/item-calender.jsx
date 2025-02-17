import * as s from '../../../styles/calender/calender';

const ItemCalender = ({
  id,
  title,
  time,
  location,
  selected,
  selecteDay,
  onItemClick,
  onEditClick,
}) => {
  return (
    <s.ItemContainer selected={selected} onClick={onItemClick}>
      <s.ItemInnerContainer>
        <s.LeftContainer>
          {/* 나중에 백엔드 명세서 보고 id -> 시간으로 바꾸기 */}
          {/* 네 해드렸습니다~ */}
          <s.ItemP>{time}</s.ItemP>
          <s.ItemP2>{location}</s.ItemP2>
        </s.LeftContainer>
        <s.EditButton2
          selected={selected}
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(id, selecteDay);
          }}
        >
          수정
        </s.EditButton2>
      </s.ItemInnerContainer>
    </s.ItemContainer>
  );
};

export default ItemCalender;
