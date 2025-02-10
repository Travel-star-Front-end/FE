import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import * as s from "../../../styles/calender/calender";
import ItemCalender from "./item-calender";

const ListCalender = ({ data, onOpenPlaceModal, onOpenEditModal }) => { 
    const [selectedId, setSelectedId] = useState(null);
    const [editVisible, setEditVisible] = useState(false);

    const safeData = Array.isArray(data) ? data : []; 

    const handleItemClick = (id) => {
        console.log(id);
        setSelectedId(id);
        setEditVisible(false);
    };

    const handleEditClick = (id) => {
        onOpenEditModal(id);
    };

    const handleTitleClick = () => {
        setEditVisible(true);
        setSelectedId(null);
    };

    const { data: titleData, loading, error } = useFetch("/posts/1");
    const title = titleData?.title || "제목";
    const subTitle = titleData?.body || "부제목";

    const handlePlaceModalOpen = () => {
        onOpenPlaceModal(title, subTitle);  
    };

    const sortedData = [...safeData].sort((a, b) => {
        const timeA = new Date(a.date).getHours() * 60 + new Date(a.date).getMinutes();
        const timeB = new Date(b.date).getHours() * 60 + new Date(b.date).getMinutes();
        return timeA - timeB;
    });

    return (
        <>
            <s.TitleContainer editvisible={editVisible.toString()} onClick={handleTitleClick}>
                <s.TitleInnerContainer>
                    <s.LeftContainer>
                        <s.TitleP>{title}</s.TitleP>
                        <s.TitleP2>{subTitle}</s.TitleP2>
                    </s.LeftContainer>
                    <s.EditButton visible={editVisible.toString()} onClick={handlePlaceModalOpen}>수정</s.EditButton>
                </s.TitleInnerContainer>
            </s.TitleContainer>

            <s.ListContainer>
                {sortedData.map((item, index) => (
                    <ItemCalender 
                        key={index}
                        time={item.date} 
                        title={item.title}
                        selected={selectedId === item.day_id} 
                        onItemClick={() => handleItemClick(item.day_id)} 
                        onEditClick={handleEditClick}
                    />
                ))}
            </s.ListContainer>
        </>
    );
};

export default ListCalender;
