import React, { useState } from "react"; 
import styled from "styled-components";
import colors from "../../styles/common/colors";
import CalenderLeft from "../../components/calender/calenderLeft/calenderLeft";
import CalenderRight from "../../components/calender/calenderRight/calenderRight";

const CalenderContainer = styled.div`
  background: ${colors.homeGray};
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 3.1vw;
`;

const CalenderInnerContainer = styled.div`
  width: 90%;
`;

const CalenderP = styled.p`
  font-size: 1.2vw;
  font-weight: 600;
  color: ${colors.sideBarGray2};
`;

const CalenderBar = styled.div`
  width: 100%;
  height: 0.05vw;
  background: ${colors.writeGray};
  margin-top: 0.5vw;
`;

const CalenderContentContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
`;

const Calender = () => {
  // 오늘 날짜를 기본값으로
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`;

  // 선택된 날짜
  const [selectedDay, setSelectedDay] = useState(formattedToday);

  return (
    <CalenderContainer>
      <CalenderInnerContainer>
        <CalenderP>캘린더</CalenderP>
        <CalenderBar />
        <CalenderContentContainer>
          {/* 왼쪽 달력 - 날짜 선택하면 selectedDay 변경 */}
          <CalenderLeft selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

          {/* 오른쪽 일정 - 현재 선택된 날짜 props로 받음 */}
          <CalenderRight selectedDay={selectedDay} />
        </CalenderContentContainer>
      </CalenderInnerContainer>
    </CalenderContainer>
  );
};

export default Calender;
