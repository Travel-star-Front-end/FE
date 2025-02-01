import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/common/colors";
import ListCalender from "./list-calender";
import useFetch from "../../../hooks/useFetch";
import PlusButtonImage from "../../../assets/images/add.png";
import Modal from "./addModal"; 

const CalenderRightContainer = styled.div`
  width: 33%;
  padding-top: 2.25vw;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const InnerCalenderRightContainer = styled.div`
  width: 92%;
`;

const RightP = styled.p`
  font-size: 1.2vw;
  font-weight: 700;
  color: ${colors.black};
`;

const PlusButton = styled.img`
  width: 2.5vw;
  height: 2.5vw;
  cursor: pointer;
  position: absolute;
  top: 3.2vw;
  right: 0vw;
`;

const CalenderRight = ({ selectedDay }) => {
  const { data, loading, error } = useFetch("/users");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduleList, setScheduleList] = useState([]);

  const addSchedule = (newItem) => {
    setScheduleList(prevList => [...prevList, newItem]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("ko-KR", options);
  };

  return (
    <CalenderRightContainer>
      <InnerCalenderRightContainer>
        <RightP>일정작성</RightP>
        <RightP style={{ fontSize: "1vw", fontWeight: "600", marginTop: "0.8vw" }}>
          {formatDate(selectedDay)}
        </RightP>
        <PlusButton
          src={PlusButtonImage}
          alt="추가 버튼"
          onClick={() => setIsModalOpen(true)}
        />
        <ListCalender 
          data={data} 
          selectedDay={selectedDay} 
          scheduleList={scheduleList}
          setScheduleList={setScheduleList}
        />
      </InnerCalenderRightContainer>
      {isModalOpen && (
        <Modal 
          onClose={() => setIsModalOpen(false)} 
          onAdd={addSchedule}
        />
      )}
    </CalenderRightContainer>
  );
};

export default CalenderRight;
