import { useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/common/colors";
import Trash from "../../../assets/images/calender/trash.png";
import ModalTime from "./modalTime";
import { API } from "../../../apis/axios";

const AddModalContainer = styled.div`
  width: 100%;
  height: 16.7vw;
  border-radius: 0.75vw;
  background: ${colors.calenderGray5};
  padding: 0 0.6vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3vw;
`;

const TimeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleP = styled.p`
  font-size: 0.9vw;
  font-weight: 700;
  color: ${colors.sideBarGray2};
`;

const TrashImg = styled.img`
  width: 0.85vw;
  height: 0.9vw;
  cursor: pointer;
`;

const TimeSelectContainer = styled.div`
  display: flex;
  gap: 1.6vw;
  align-items: center;
`;

const TimeSelectInnerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45vw;
`;

const PlaceInput = styled.input`
  width: 100%;
  height: 1.65vw;
  border-radius: 0.25vw;
  background: ${colors.white};
  font-size: 0.8vw;
  font-weight: 500;
  color: ${colors.sideBarGray2};
  padding-left: 0.3vw;
`;

const AddButton = styled.button`
  width: 9.6vw;
  height: 1.4vw;
  border-radius: 0.25vw;
  background: ${colors.main};
  cursor: pointer;
  font-size: 0.8vw;
  font-weight: 700;
  color: ${colors.white};
  margin-top: 0.45vw;
  border: none;

  &:hover {
    background: ${colors.mainDark};
  }
`;

const AddModal = ({ onClose, selectedDay }) => {
  const [period, setPeriod] = useState("오전");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [location, setLocation] = useState("");

  const formatNumber = (num) => String(num).padStart(2, "0");

  const handleSubmit = async () => {
    try {
      if (!location.trim()) {
        alert("장소를 입력하세요.");
        return;
      }

      let hour24 = parseInt(hour, 10);
      if (period === "오후" && hour24 !== 12) {
        hour24 += 12;
      } else if (period === "오전" && hour24 === 12) {
        hour24 = 0;
      }

      const formattedDateTime = new Date(`${selectedDay}T${formatNumber(hour24)}:${minute}:00Z`).toISOString();

      const requestData = {
        location,
        date_time: formattedDateTime,
      };

      console.log("데이터:", requestData);

      await API.post("/users", requestData);

      alert("일정이 추가되었습니다!");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("일정 추가 중 오류가 발생했습니다.");
    }
  };

  return (
    <AddModalContainer>
      <TimeContainer>
        <TitleP>시간</TitleP>
        <TrashImg src={Trash} onClick={onClose} alt="delete" />
      </TimeContainer>

      <TimeSelectContainer>
        <ModalTime value={period} onChange={setPeriod} options={["오전", "오후"]} />
        <TimeSelectInnerContainer>
          <ModalTime value={hour} onChange={(value) => setHour(formatNumber(value))} options={Array.from({ length: 12 }, (_, i) => formatNumber(i + 1))} />
          <TitleP style={{ color: colors.black }}>:</TitleP>
          <ModalTime value={minute} onChange={(value) => setMinute(formatNumber(value))} options={Array.from({ length: 60 }, (_, i) => formatNumber(i))} />
        </TimeSelectInnerContainer>
      </TimeSelectContainer>

      <TitleP style={{ marginTop: "6.35vw", width: "100%" }}>장소</TitleP>
      <PlaceInput value={location} onChange={(e) => setLocation(e.target.value)} placeholder="장소를 입력하세요" />

      <AddButton onClick={handleSubmit}>완료</AddButton>
    </AddModalContainer>
  );
};

export default AddModal;
