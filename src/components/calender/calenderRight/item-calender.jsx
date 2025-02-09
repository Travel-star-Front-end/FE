import * as s from "../../../styles/calender/calender";

const ItemCalender = ({ time, title, selected, onItemClick, onEditClick }) => {
    const formatTime = (dateString) => {
        if (!dateString) return "00:00";
        
        const dateObj = new Date(dateString);
        
        if (isNaN(dateObj.getTime())) {
            console.error("date 에러:", dateString);
            return "00:00";
        }

        const formattedTime = dateObj.toISOString().split("T")[1].substring(0, 5);
        return formattedTime;
    };

    return (
        <s.ItemContainer selected={selected} onClick={onItemClick}>
            <s.ItemInnerContainer>
                <s.LeftContainer>
                    <s.ItemP>{formatTime(time)}</s.ItemP>
                    <s.ItemP2>{title}</s.ItemP2>
                </s.LeftContainer>
                <s.EditButton2 selected={selected} onClick={(e) => { e.stopPropagation(); onEditClick(); }}>
                    수정
                </s.EditButton2>
            </s.ItemInnerContainer>
        </s.ItemContainer>
    );
};

export default ItemCalender;
