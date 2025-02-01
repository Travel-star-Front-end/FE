import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/common/colors";
import EditModal from "./editModal";
import PlaceModal from "./placeModal";

const ListContainer = styled.div`
  width: 100%;
  height: 27.85vw;
  overflow-y: scroll;
  margin-top: 0;
  border: 0.05vw solid ${colors.calenderGray};

  &::-webkit-scrollbar {
    width: 0.6vw;
  }
  &::-webkit-scrollbar-track {
    background: #f9f9f9;
  }
  &::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 0.3vw;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  height: 2.6vw;
  padding: 1vw;
  border: 1px solid #d9d9d9;
  background-color: ${(props) => (props.selected ? "#AEE0EA" : "white")};
  cursor: pointer;
`;

const HeaderButton = styled.button`
  font-size: 0.8vw;
  padding: 0.4vw 1vw;
  border: none;
  border-radius: 0.5vw;
  background-color: #f9f9f9;
  color: black;
  cursor: pointer;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  margin-right: 1.3rem;

  &:hover {
    background-color: ${colors.lightBlue};
  }
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vw;
  border-bottom: 1px solid #d9d9d9;
  background-color: ${(props) => (props.selected ? "#AEE0EA" : "white")};
  cursor: pointer;
`;

const TimeText = styled.span`
  font-size: 1.2vw;
  font-weight: bold;
`;

const EventText = styled.span`
  font-size: 1vw;
  flex-grow: 1;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 12vw);
`;

const PlaceText = styled.span`
  font-size: 0.8vw;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 12vw);
  margin-right: 6vw;
`;

const EditButton = styled.button`
  font-size: 0.8vw;
  padding: 0.5vw 1vw;
  border: none;
  border-radius: 0.5vw;
  background-color: #f9f9f9;
  color: black;
  cursor: pointer;
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};

  &:hover {
    background-color: ${colors.lightBlue};
  }
`;

const ListCalender = ({ data, selectedDay, scheduleList, setScheduleList }) => {
  const [selectedHeader, setSelectedHeader] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({ id: null, time: "", event: "" });
  const [travelTitle, setTravelTitle] = useState("여행 제목");
  const [travelPlace, setTravelPlace] = useState("여행 장소");
  const [showPlaceModal, setShowPlaceModal] = useState(false);

  const handleHeaderClick = () => {
    setSelectedHeader((prev) => !prev);
  };

  const handleHeaderButtonClick = (e) => {
    e.stopPropagation();
    setShowPlaceModal(true);
  };

  const handlePlaceModalSave = (newTitle, newPlace) => {
    setTravelTitle(newTitle);
    setTravelPlace(newPlace);
    setShowPlaceModal(false);
  };

  const handleItemClick = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const handleEditClick = (item) => {
    setCurrentEdit(item);
    setModalOpen(true);
  };

  const handleSave = (editedItem) => {
    setScheduleList((prevData) =>
      prevData.map((item) => (item.id === editedItem.id ? editedItem : item))
    );
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setScheduleList((prevData) => prevData.filter((item) => item.id !== id));
    setModalOpen(false);
  };

  return (
    <>
      <HeaderContainer selected={selectedHeader} onClick={handleHeaderClick}>
        <EventText>{travelTitle}</EventText>
        <PlaceText>{travelPlace}</PlaceText>
        <HeaderButton visible={selectedHeader} onClick={handleHeaderButtonClick}>
          수정
        </HeaderButton>
      </HeaderContainer>

      <ListContainer>
        {scheduleList.map((item) => (
          <ItemContainer
            key={item.id}
            selected={selectedId === item.id}
            onClick={() => handleItemClick(item.id)}
          >
            <TimeText>{item.time}</TimeText>
            <EventText>{item.event}</EventText>
            <EditButton
              $visible={selectedId === item.id}
              onClick={() => handleEditClick(item)}
            >
              수정
            </EditButton>
          </ItemContainer>
        ))}
      </ListContainer>

      {modalOpen && (
        <EditModal
          item={currentEdit}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setModalOpen(false)}
        />
      )}

      {showPlaceModal && (
        <PlaceModal
          onClose={() => setShowPlaceModal(false)}
          initialTitle={travelTitle}
          initialPlace={travelPlace}
          onSave={handlePlaceModalSave}
        />
      )}
    </>
  );
};

export default ListCalender;
