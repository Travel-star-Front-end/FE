import { useState, useEffect } from "react";
import * as s from "../../../styles/calender/calender";
import colors from "../../../styles/common/colors";
import Trash from "../../../assets/images/calender/trash.png";
import ModalTime from "./modalTime";
import { API } from "../../../apis/axios";

const AddModal = ({ onClose, selectedDay }) => {
  const [period, setPeriod] = useState("오전");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [location, setLocation] = useState("");

  const formatNumber = (num) => String(num).padStart(2, "0");

  const getHourOptions = (period) => {
    if (period === "오전") {
      return Array.from({ length: 12 }, (_, i) => formatNumber(i));
    } else {
      return Array.from({ length: 12 }, (_, i) => formatNumber(i + 12)); 
    }
  };

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

      console.log("데이터:", requestData);

      await API.post("/users", requestData);

      alert("일정이 추가되었습니다.");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("일정 추가 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    setHour("00");
    setMinute("00");
  }, [period]);

  return (
    <s.AddModalContainer>
      <s.TimeContainer>
        <s.AddTitleP>시간</s.AddTitleP>
        <s.AddTrashImg src={Trash} onClick={onClose} alt="delete" />
      </s.TimeContainer>

      <s.TimeSelectContainer>
        <ModalTime value={period} onChange={setPeriod} options={["오전", "오후"]} />
        <s.TimeSelectInnerContainer>
          <ModalTime value={hour} onChange={(value) => setHour(formatNumber(value))} options={getHourOptions(period)}/>
          <s.TitleP style={{ color: colors.black }}>:</s.TitleP>
          <ModalTime value={minute} onChange={(value) => setMinute(formatNumber(value))} options={Array.from({ length: 60 }, (_, i) => formatNumber(i))} />
        </s.TimeSelectInnerContainer>
      </s.TimeSelectContainer>

      <s.AddTitleP style={{ marginTop: "6.35vw", width: "100%" }}>장소</s.AddTitleP>
      <s.PlaceInput value={location} onChange={(e) => setLocation(e.target.value)} placeholder="장소를 입력하세요" />

      <s.AddButton onClick={handleSubmit}>완료</s.AddButton>
    </s.AddModalContainer>
  );
};

export default AddModal;