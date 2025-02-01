import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/common/colors";
import deleteButton from "../../../assets/images/deleteButton.png";

const ModalContainer = styled.div`
  position: fixed;
  bottom: 2vw;
  right: 4.2vw;
  width: 23vw;
  height: 20vw;
  background-color: #eeeeee;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 999;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: -0.5rem;
`;

const ModalTitle = styled.p`
  font-size: 1.2vw;
  font-weight: 700;
  color: ${colors.black};
`;

const CloseButton = styled.img`
  width: 1.5vw;
  height: 1.5vw;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1vw;
`;

const Label = styled.label`
  font-size: 1vw;
  font-weight: 600;
  color: ${colors.black};
  margin-bottom: 0.5vw;
`;

const InputField = styled.input`
  width: 100%;
  height: 2.5vw;
  padding: 0.5vw;
  font-size: 1vw;
  border: 1px solid ${colors.gray};
  border-radius: 5px;
  background-color: white;
`;

const SaveButton = styled.button`
  width: 100%;
  height: 2.5vw;
  background-color: #01bcd4;
  color: white;
  font-size: 1.2vw;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.darkBlue};
  }
`;

const PlaceModal = ({ onClose, onSave, initialTitle, initialPlace }) => {
  const [title, setTitle] = useState(initialTitle);
  const [place, setPlace] = useState(initialPlace);

  const handleSave = () => {
    onSave(title, place);
  };

  return (
    <ModalContainer>
      <ModalHeader>
        <ModalTitle>일정 작성</ModalTitle>
        <CloseButton src={deleteButton} alt="삭제" onClick={onClose} />
      </ModalHeader>

      <InputWrapper>
        <Label htmlFor="title">여행 제목</Label>
        <InputField
          id="title"
          placeholder="일정 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputWrapper>

      <InputWrapper>
        <Label htmlFor="place">여행 장소</Label>
        <InputField
          id="place"
          placeholder="일정 장소를 입력하세요"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </InputWrapper>

      <SaveButton onClick={handleSave}>완료</SaveButton>
    </ModalContainer>
  );
};

export default PlaceModal;