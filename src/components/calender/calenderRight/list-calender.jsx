import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import styled from "styled-components";
import colors from "../../../styles/common/colors";
import ItemCalender from "./item-calender";

const ListContainer = styled.div`
    width: 100%;
    height: 27.85vw;
    overflow-y: scroll;
    border: 0.05vw solid ${colors.calenderGray};
`;

const TitleContainer = styled.div`
    width: 100%;
    height: 2.15vw;
    background: ${({ isEditVisible }) => (isEditVisible ? colors.subMain : colors.white)};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 1.2vw;
`;

const TitleInnerContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LeftContainer = styled.div`
    width: calc(100% - 3vw);
    display: flex;
    align-items: center;
`;

const TitleP = styled.p`
    width: 25%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.9vw;
    font-weight: 600;
    color: ${colors.black};
`;

const TitleP2 = styled(TitleP)`
    font-size: 0.5vw;
    width: 100%;
    padding-right: 1vw;
`;

const EditButton = styled.button`
    width: 3vw;
    height: 1.3vw;
    background: ${colors.homeGray};
    border: none;
    border-radius: 0.25vw;
    font-size: 0.8vw;
    font-weight: 500;
    color: ${colors.calenderGray4};
    cursor: pointer;
    display: ${({ visible }) => (visible ? "inline-block" : "none")};
`;

const ListCalender = ({ data, onOpenPlaceModal }) => { 
    const [selectedId, setSelectedId] = useState(null);
    const [isEditVisible, setIsEditVisible] = useState(false);

    const safeData = Array.isArray(data) ? data : []; 

    const handleItemClick = (id) => {
        setSelectedId(id);
        setIsEditVisible(false);
    };

    const handleTitleClick = () => {
        setIsEditVisible(true);
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
            <TitleContainer isEditVisible={isEditVisible} onClick={handleTitleClick}>
                <TitleInnerContainer>
                    <LeftContainer>
                        <TitleP>{title}</TitleP>
                        <TitleP2>{subTitle}</TitleP2>
                    </LeftContainer>
                    <EditButton visible={isEditVisible} onClick={handlePlaceModalOpen}>수정</EditButton>
                </TitleInnerContainer>
            </TitleContainer>

            <ListContainer>
                {safeData.map((item, index) => (
                    <ItemCalender 
                        key={index}
                        id={item.id} 
                        title={item.email}
                        selected={selectedId === item.id} 
                        onItemClick={() => handleItemClick(item.id)} 
                    />
                ))}
            </ListContainer>
        </>

    );
};

export default ListCalender;
