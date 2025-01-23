import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/common/colors";
import CalenderButton from "../../../assets/images/calender/button.png";

const CalenderLeftContainer = styled.div`
  width: 65%;
  padding-top: 0.95vw;
  border-right: 0.05vw solid ${colors.calenderGray};
`;

const CalendarContainer = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  border-radius: 2.2vw;
`;

const Header = styled.div`
  width: 100%;
  padding: 1.15vw 2.25vw 0.8vw 2.25vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CalenderP = styled.p`
  font-size: 1vw;
  font-weight: 500;
  color: ${colors.black};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.4vw;
  align-items: center;
`;

const ButtonImg = styled.img`
  width: 0.45vw;
  height: 0.7vw;
  cursor: pointer;
`;

const WeekContainer = styled.div`
  width: 100%;
  height: 2.5vw;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: ${colors.calenderGray2};
  margin-bottom: 4.45vw;
`;

const Day = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
  font-weight: 500;
  color: ${colors.black};
`;

const DateContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DateCell = styled.div`
  width: 100%;
  height: ${(props) => (props.lastrow === "true" ? "3.75vw" : "6.6vw")};
  text-align: center;
  cursor: pointer;
  font-size: 1vw;
  font-weight: 300;
  color: ${(props) => (props.selected ? colors.white : colors.black)};
  position: relative;
  z-index: 1;

  &.inactive {
    color: ${colors.calenderGray3};
  }
`;

const SelectedDateCell = styled.div`
  position: absolute;
  top: ${(props) => (props.lastrow === "true" ? "15%" : "8%")};
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.5vw;
  height: 1.5vw;
  border-radius: 50%;
  background: ${colors.main};
  z-index: -1;
`;

const CalenderLeft = ({ selectedDay, setSelectedDay }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());

  const changeMonth = (direction) => {
    setMonth((prevMonth) => {
      const newMonth = prevMonth + direction;
      const newYear = newMonth < 0 ? year - 1 : newMonth > 11 ? year + 1 : year;
      setYear(newYear);
      return (newMonth + 12) % 12;
    });
  };

  const generateCalendar = () => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = lastDayOfMonth.getDate();

    const prevMonthDays = firstDayOfWeek;
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const dates = [];

    // 이전 달
    for (let i = prevMonthLastDay - prevMonthDays + 1; i <= prevMonthLastDay; i++) {
      dates.push({
        day: i,
        currentMonth: false,
        month: month === 0 ? 12 : month,
        year: month === 0 ? year - 1 : year,
      });
    }

    // 현재 달
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push({
        day: i,
        currentMonth: true,
        month: month + 1,
        year: year,
      });
    }

    // 다음 달
    const remainingDays = dates.length % 7;
    const nextMonthDays = remainingDays === 0 ? 0 : 7 - remainingDays;

    for (let i = 1; i <= nextMonthDays; i++) {
      dates.push({
        day: i,
        currentMonth: false,
        month: month === 11 ? 1 : month + 2,
        year: month === 11 ? year + 1 : year,
      });
    }

    return dates;
  };

  const calendarDates = generateCalendar();

  const handleDateClick = (day, month, year) => {
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDay(formattedDate);
  };

  const isSelected = (day, month, year) => {
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return selectedDay === formattedDate;
  };

  return (
    <CalenderLeftContainer>
      <CalendarContainer>
        <Header>
          <CalenderP>
            {year}년 {month + 1}월
          </CalenderP>
          <ButtonContainer>
            <ButtonImg src={CalenderButton} alt="button" onClick={() => changeMonth(-1)} />
            <ButtonImg
              src={CalenderButton}
              alt="button"
              style={{ rotate: "180deg" }}
              onClick={() => changeMonth(1)}
            />
          </ButtonContainer>
        </Header>

        <WeekContainer>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Day key={day}>{day}</Day>
          ))}
        </WeekContainer>

        <DateContainer>
          {calendarDates.map((date, index) => {
            const { day, month: cellMonth, year: cellYear, currentMonth } = date;
            const lastrow = index >= calendarDates.length - 7;
            const selected = isSelected(day, cellMonth, cellYear);

            return (
              <DateCell
                key={index}
                className={currentMonth ? "" : "inactive"}
                onClick={() => currentMonth && handleDateClick(day, cellMonth, cellYear)}
                lastrow={lastrow.toString()}
                selected={selected}
              >
                {selected && <SelectedDateCell lastrow={lastrow.toString()} />}
                {day}
              </DateCell>
            );
          })}
        </DateContainer>
      </CalendarContainer>
    </CalenderLeftContainer>
  );
};

export default CalenderLeft;
