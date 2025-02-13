import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import * as s from "../../../styles/calender/calender";
import ItemCalender from "./item-calender";

const ListCalender = ({ data, onOpenPlaceModal, onOpenEditModal }) => { 
    const [selectedId, setSelectedId] = useState(null);
    const [editVisible, setEditVisible] = useState(false);

    const safeData = Array.isArray(data) ? data : []; 

    const handleItemClick = (id) => {
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
    }

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
                {safeData.map((item, index) => (
                    <ItemCalender 
                        key={index}
                        id={item.id} 
                        title={item.email}
                        selected={selectedId === item.id} 
                        onItemClick={() => handleItemClick(item.id)} 
                        onEditClick={handleEditClick}
                    />
                ))}
            </s.ListContainer>
        </>
    );
};

export default ListCalender;