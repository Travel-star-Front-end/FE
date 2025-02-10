import React, { useState, useEffect } from "react"; 
import * as s from "../../styles/calender/calender";
import CalenderLeft from "../../components/calender/calenderLeft/calenderLeft";
import CalenderRight from "../../components/calender/calenderRight/calenderRight";

const Calender = () => {
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [selectedDay, setSelectedDay] = useState(formattedToday);
  const [selectedDayId, setSelectedDayId] = useState(null);

  // useEffect(() => {
    // console.log("선택된 날짜:", selectedDay);
    // console.log("선택된 날짜의 day_id:", selectedDayId);
  // }, [selectedDay, selectedDayId]);

  return (
    <s.CalenderContainer>
      <s.CalenderInnerContainer>
        <s.CalenderP>캘린더</s.CalenderP>
        <s.CalenderBar />
        <s.CalenderContentContainer>
          <CalenderLeft selectedDay={selectedDay} setSelectedDay={setSelectedDay} setSelectedDayId={setSelectedDayId} />
          <CalenderRight selectedDay={selectedDay} selectedDayId={selectedDayId} />
        </s.CalenderContentContainer>
      </s.CalenderInnerContainer>
    </s.CalenderContainer>
  );
};

export default Calender;
