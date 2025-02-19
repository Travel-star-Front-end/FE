import React, { useState } from 'react';
import * as s from '../../styles/calender/calender';
import CalenderLeft from '../../components/calender/calenderLeft/calenderLeft';
import CalenderRight from '../../components/calender/calenderRight/calenderRight';

const Calender = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const [selectedDay, setSelectedDay] = useState(formattedToday);

  return (
    <s.CalenderContainer>
      <s.CalenderInnerContainer>
        <s.CalenderP>캘린더</s.CalenderP>
        <s.CalenderBar />
        <s.CalenderContentContainer>
          <CalenderLeft
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            refreshKey={refreshKey}
          />

          <CalenderRight
            selectedDay={selectedDay}
            refreshKey={refreshKey}
            setRefreshKey={setRefreshKey}
          />
        </s.CalenderContentContainer>
      </s.CalenderInnerContainer>
    </s.CalenderContainer>
  );
};

export default Calender;
