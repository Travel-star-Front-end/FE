import { useState, useEffect } from "react";
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

const EditModal = ({ onClose, selectedDay, id }) => {
  const [period, setPeriod] = useState("오전");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [location, setLocation] = useState("");

  const formatNumber = (num) => String(num).padStart(2, "0");

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await API.get(`/users/${id}`);
          const data = response.data;

          setPeriod(data.period || "오전");
          setHour(data.hour || "00");
          setMinute(data.minute || "00");
          setLocation(data.email || "");
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData();
    }
  }, [id]);

  // 오전: 00~11 / 오후: 12~23 반환
  const getHourOptions = (period) => {
    if (period === "오전") {
      return Array.from({ length: 12 }, (_, i) => formatNumber(i)); // 00 ~ 11
    } else {
      return Array.from({ length: 12 }, (_, i) => formatNumber(i + 12)); // 12 ~ 23
    }
  };

  // 시간 변환 로직 (24시간 형식 그대로 반환)
  const convertTo24Hour = (hour) => {
    return String(parseInt(hour, 10)).padStart(2, "0");
  };

  const handleSubmit = async () => {
    try {
      if (!location.trim()) {
        alert("장소를 입력하세요.");
        return;
      }

      if (!selectedDay || isNaN(new Date(selectedDay).getTime())) {
        alert("유효하지 않은 날짜입니다.");
        return;
      }

      const hour24 = convertTo24Hour(hour);
      const dateTimeString = `${selectedDay}T${hour24}:${minute}:00`;

      console.log("날짜 시간 문자열:", dateTimeString);
      const dateObj = new Date(dateTimeString);
      
      if (isNaN(dateObj.getTime())) {
        alert("날짜 또는 시간이 유효하지 않습니다.");
        return;
      }

      const formattedDateTime = dateObj.toISOString();

      const requestData = {
        location,
        date_time: formattedDateTime,
      };

      const response = await API.patch(`/users/${id}`, requestData);

      alert("일정이 수정되었습니다.");
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("일정 수정 중 오류가 발생했습니다.");
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
          <ModalTime value={hour} onChange={(value) => setHour(formatNumber(value))} options={getHourOptions(period)} />
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

export default EditModal;
