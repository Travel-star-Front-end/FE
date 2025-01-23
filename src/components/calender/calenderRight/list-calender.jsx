import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { API } from "../../../apis/axios"; 
import colors from "../../../styles/common/colors";
import EditModal from "./editModal"; 

const ListContainer = styled.div`
  width: 100%;
  height: 27.85vw;
  overflow-y: scroll;
  margin-top: 1.2vw;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 12vw);
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
`;

const ListCalender = ({ data, selectedDay }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [localData, setLocalData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({ id: null, time: "", event: "" });

  // 실제로는 백엔드 연결 시 selectedDay에 따라 API를 요청하거나, data를 필터링해서 쓸 수 있음.
  // 지금은 JSONPlaceholder 예시로 임시 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("https://jsonplaceholder.typicode.com/todos?_limit=20");
        const transformedData = response.data.map((item) => ({
          id: item.id,
          time: `${item.id % 12 || 12}:00 ${item.id % 24 < 12 ? "AM" : "PM"}`,
          event: item.title,
        }));
        setLocalData(transformedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleItemClick = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const handleEditClick = (item) => {
    setCurrentEdit(item);
    setModalOpen(true);
  };

  const handleSave = (editedItem) => {
    setLocalData((prevData) =>
      prevData.map((item) => (item.id === editedItem.id ? editedItem : item))
    );
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setLocalData((prevData) => prevData.filter((item) => item.id !== id));
    setModalOpen(false);
  };

  return (
    <>
      <ListContainer>
        {localData.map((item) => (
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
    </>
  );
};

export default ListCalender;
