import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/common/colors";
import deleteButton from "../../../assets/images/deleteButton.png"; 

const ModalContent = styled.div`
  background: #eeeeee;
  padding: 2vw;
  position: fixed;
  bottom: 2vw;
  right: 4.2vw;
  width: 23vw;
  height: 18vw;
  border-radius: 15px;
  z-index: 1001;

  &:click {
    stopPropagation();
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1.5vw;
`;

const TimeLabelRow = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin-bottom: 1vw;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5vw;
`;

const DeleteIcon = styled.img`
  width: 1.2vw;
  height: 1.2vw;
  cursor: pointer;
`;

const Select = styled.select`
  padding: 0.5vw;
  border: 1px solid ${colors.calenderGray};
  border-radius: 0.3vw;
  font-size: 1vw;
  background-color: white;
  width: 13rem;
`;

const EventInput = styled.input`
  flex: 1;
  padding: 0.5vw;
  border: 1px solid ${colors.calenderGray};
  border-radius: 0.3vw;
  font-size: 1vw;
  width: 100%;
  background-color: white;
  margin-top: 0.8vw;
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
  border-radius: 5px;
  font-size: 2rem;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #00a0bb;
  }
`;

const InputLabel = styled.label`
  font-size: 1vw;
  font-weight: bold;
  color: black;
`;

const AddModal = ({ onClose, onAdd }) => {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [amPm, setAmPm] = useState("오전");
  const [event, setEvent] = useState("");

  const handleSave = () => {
    const newTime = `${hour}:${minute} ${amPm === "오전" ? "AM" : "PM"}`;

    const newItem = {
      id: Date.now(), 
      time: newTime,
      event,
    };

    onAdd(newItem);
    onClose();
  };

  return (
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <InputGroup>
        <TimeLabelRow>
          <InputLabel>시간</InputLabel>
          <DeleteIcon src={deleteButton} alt="닫기" onClick={onClose} />
        </TimeLabelRow>
        <InputContainer>
          <Select value={amPm} onChange={(e) => setAmPm(e.target.value)}>
            <option value="오전">AM</option>
            <option value="오후">PM</option>
          </Select>

          <Select value={hour} onChange={(e) => setHour(e.target.value)}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => {
              const val = num < 10 ? `0${num}` : `${num}`;
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </Select>

          <span>:</span>

          <Select value={minute} onChange={(e) => setMinute(e.target.value)}>
            {Array.from({ length: 60 }, (_, i) => i).map((num) => {
              const val = num < 10 ? `0${num}` : `${num}`;
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </Select>
        </InputContainer>
      </InputGroup>

      <InputGroup>
        <InputLabel>장소</InputLabel>
        <EventInput
          type="text"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          placeholder="일정을 입력하세요"
        />
      </InputGroup>

      <ButtonContainer>
        <ModalButton onClick={handleSave}>추가</ModalButton>
      </ButtonContainer>
    </ModalContent>
  );
};

export default AddModal;
