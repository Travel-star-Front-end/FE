import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/common/colors";
import ListCalender from "./list-calender";
import useFetch from "../../../hooks/useFetch";
import PlusButtonImage from "../../../assets/images/calender/add.png";
import AddModal from "./addModal";

const CalenderRightContainer = styled.div`
  width: 33%;
  padding-top: 2.25vw;
  display: flex;
  justify-content: flex-end;
`;

const InnerCalenderRightContainer = styled.div`
  width: 92%;
  position: relative;
`;

const PContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const RightP = styled.p`
  font-size: 1.2vw;
  font-weight: 700;
  color: ${colors.black};
`;

const PlusButton = styled.img`
  width: 1.625vw;
  height: 1.625vw;
  cursor: pointer;
`;

const NotP = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1vw;
  font-weight: 400;
  color: ${colors.sideBarGray2};
  opacity: 0.5;
  margin-top: 10.55vw;
`

const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 3.15vw;
`;

const CalenderRight = ({ selectedDay }) => {
  const { data, loading, error } = useFetch("/users");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("ko-KR", options);
  };

  return (
    <CalenderRightContainer>
      <InnerCalenderRightContainer>
        <RightP>일정작성</RightP>

        <PContainer>
          <RightP style={{ fontSize: "1vw", fontWeight: "600", marginTop: "0.8vw" }}>
            {formatDate(selectedDay)}
          </RightP>
          <PlusButton src={PlusButtonImage} alt="추가 버튼" onClick={() => setIsModalOpen(true)} />
        </PContainer>

        {data && Array.isArray(data) && data.length > 0 ? (
          <ListCalender data={data} selectedDay={selectedDay} />
        ) : (
          <NotP>등록된 일정이 없습니다.</NotP>
        )}

        {isModalOpen && (
          <ModalContainer>
            <AddModal onClose={() => setIsModalOpen(false)} selectedDay={selectedDay}/>
          </ModalContainer>
        )}

      </InnerCalenderRightContainer>

    </CalenderRightContainer>
  );
};

export default CalenderRight;
