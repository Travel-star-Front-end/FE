import React, { useState, useEffect } from "react";
import * as s from "../../../styles/calender/calender";
import CalenderButton from "../../../assets/images/calender/button.png";
import useFetch from "../../../hooks/useFetch";
import colors from "../../../styles/common/colors";

const CalenderLeft = ({ selectedDay, setSelectedDay, setSelectedDayId }) => {
  const { data } = useFetch(`/day-schedules`);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [selectedSchedules, setSelectedSchedules] = useState({});

  useEffect(() => {
    if (data) {
      const scheduleMap = {};

      data.forEach((schedule) => {
        const formattedDate = new Date(schedule.date).toISOString().split("T")[0];
        if (!scheduleMap[formattedDate]) {
          scheduleMap[formattedDate] = [];
        }
        scheduleMap[formattedDate].push({ title: schedule.title, day_id: schedule.day_id });
      });

      setSelectedSchedules(scheduleMap);
    }
  }, [data]);

  useEffect(() => {
    if (selectedSchedules[selectedDay]) {
      const firstSchedule = selectedSchedules[selectedDay][0]; // 첫 번째 일정의 day_id 사용
      setSelectedDayId(firstSchedule.day_id);
    } else {
      setSelectedDayId(null);
    }
  }, [selectedDay, selectedSchedules, setSelectedDayId]);

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

  const getSchedules = (day, month, year) => {
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return selectedSchedules[formattedDate] || [];
  };

  return (
    <s.CalenderLeftContainer>
      <s.CalendarLeftInnerContainer>
        <s.Header>
          <s.CalenderP2>
            {year}년 {month + 1}월
          </s.CalenderP2>
          <s.ButtonContainer>
            <s.ButtonImg src={CalenderButton} alt="button" onClick={() => changeMonth(-1)} />
            <s.ButtonImg src={CalenderButton} alt="button" style={{ rotate: "180deg" }} onClick={() => changeMonth(1)} />
          </s.ButtonContainer>
        </s.Header>

        <s.WeekContainer>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <s.Day key={day}>{day}</s.Day>
          ))}
        </s.WeekContainer>

        <s.DateContainer>
          {calendarDates.map((date, index) => {
            const { day, month: cellMonth, year: cellYear, currentMonth } = date;
            const lastrow = index >= calendarDates.length - 7;
            const selected = isSelected(day, cellMonth, cellYear);
            const schedules = getSchedules(day, cellMonth, cellYear);

            return (
              <s.DateCell
                key={index}
                className={currentMonth ? "" : "inactive"}
                onClick={() => currentMonth && handleDateClick(day, cellMonth, cellYear)}
                lastrow={lastrow.toString()}
                selected={selected}
              >
                {selected && <s.SelectedDateCell lastrow={lastrow.toString()} />}
                {day}
                {schedules.length > 0 && (
                  <div style={{ color: colors.black, height: "100%", paddingTop: "0.5vw" }}>
                    {schedules.map((schedule, i) => (
                      <s.ListP key={i}>{schedule.title}</s.ListP>
                    ))}
                  </div>
                )}
              </s.DateCell>
            );
          })}
        </s.DateContainer>
      </s.CalendarLeftInnerContainer>
    </s.CalenderLeftContainer>
  );
};

export default CalenderLeft;
