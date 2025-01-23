import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/common/colors";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2vw;
  width: 30vw;
  border-radius: 0.5vw;
  box-shadow: 0 0.5vw 1vw rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1001;
`;

const ModalHeader = styled.h3`
  margin: 0 0 1vw 0;
  font-size: 1.5vw;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5vw;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
  margin-bottom: 1vw;
`;

const Input = styled.input`
  flex: 1; 
  padding: 0.5vw;
  border: 1px solid ${colors.calenderGray};
  border-radius: 0.3vw;
  font-size: 1vw;
  width: 100%;
`;

const Select = styled.select`
  flex: 0.3;
  padding: 0.5vw;
  border: 1px solid ${colors.calenderGray};
  border-radius: 0.3vw;
  font-size: 1vw;
  background-color: #eee;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalButton = styled.button`
  flex: 1;
  margin-right: 0.5rem;
  background-color: #01bcd4;
  color: #fff;
  border: none;
  padding: 1rem;
  border-radius: 0.25rem;
  font-size: 1.5rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #00a0bb;
  }
`;

const DeleteButton = styled.button`
  flex: 1;
  margin-right: 0.5rem;
  background-color: #eee;
  color: #333;
  border: none;
  padding: 1rem;
  border-radius: 0.25rem;
  font-size: 1.5rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #ddd;
  }
`;

const EditModal = ({ item, onSave, onDelete, onClose }) => {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleTimeChange = (e) => {
    const [hour, minute] = editedItem.time.split(":");
    const updatedTime = `${e.target.value}:${minute.split(" ")[0]} ${
      editedItem.time.split(" ")[1]
    }`;
    setEditedItem({ ...editedItem, time: updatedTime });
  };

  const handleAmPmChange = (e) => {
    const [hour, minute] = editedItem.time.split(":");
    const updatedTime = `${hour}:${minute.split(" ")[0]} ${e.target.value}`;
    setEditedItem({ ...editedItem, time: updatedTime });
  };

  const handleEventChange = (e) => {
    setEditedItem({ ...editedItem, event: e.target.value });
  };

  const handleSave = () => {
    onSave(editedItem);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>수정하기</ModalHeader>
        <InputGroup>
          <InputContainer>
            <Input
              type="text"
              value={editedItem.time.split(" ")[0]} // "시간:분"만 추출
              onChange={handleTimeChange}
              placeholder="시간을 입력하세요"
            />
            <Select
              value={editedItem.time.split(" ")[1]} // AM/PM만 추출
              onChange={handleAmPmChange}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </Select>
          </InputContainer>
          <Input
            type="text"
            value={editedItem.event}
            onChange={handleEventChange}
            placeholder="일정을 입력하세요"
          />
        </InputGroup>
        <ButtonContainer>
          <ModalButton onClick={handleSave}>수정 완료</ModalButton>
          <DeleteButton onClick={() => onDelete(item.id)}>삭제</DeleteButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditModal;
