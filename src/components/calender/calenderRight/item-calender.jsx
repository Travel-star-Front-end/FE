import * as s from "../../../styles/calender/calender";

const ItemCalender = ({ id, title, selected, onItemClick, onEditClick }) => {
    return (
        <s.ItemContainer selected={selected} onClick={onItemClick}>
            <s.ItemInnerContainer>
                <s.LeftContainer>
                    {/* 나중에 백엔드 명세서 보고 id -> 시간으로 바꾸기 */}
                    <s.ItemP>{id}</s.ItemP>
                    <s.ItemP2>{title}</s.ItemP2>
                </s.LeftContainer>
                <s.EditButton2 selected={selected} onClick={(e) => { e.stopPropagation(); onEditClick(id, title); }}>수정</s.EditButton2>
            </s.ItemInnerContainer>
        </s.ItemContainer>
    )
}

export default ItemCalender;