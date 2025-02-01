import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../../../styles/common/colors";
import ListCalender from "./list-calender";
import useFetch from "../../../hooks/useFetch";
import PlusButtonImage from "../../../assets/images/calender/add.png";
import AddModal from "./addModal";
import PlaceModal from "./placeModal";
import EditModal from "./editModal";

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
`;

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
`;

const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 3.15vw;
`;

const CalenderRight = ({ selectedDay }) => {
  const { data, loading, error } = useFetch("/users");
  const [modalType, setModalType] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    console.log("선택 날짜 변경: ", selectedDay);
  }, [selectedDay]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("ko-KR", options);
  };

  const handlePlaceModalOpen = (title, subTitle) => {
    setTitle(title);
    setSubTitle(subTitle);
    setModalType("place");
  };

  const handleEditModalOpen = (id) => {
    setEditItemId(id);
    setModalType("edit");
  };

  return (
    <CalenderRightContainer>
      <InnerCalenderRightContainer>
        <RightP>일정작성</RightP>

        <PContainer>
          <RightP style={{ fontSize: "1vw", fontWeight: "600", marginTop: "0.8vw" }}>
            {formatDate(selectedDay)}
          </RightP>
          <PlusButton src={PlusButtonImage} alt="추가 버튼" onClick={() => setModalType("add")}/>
        </PContainer>

        {data && Array.isArray(data) && data.length > 0 ? (
          <ListCalender data={data} selectedDay={selectedDay} onOpenPlaceModal={handlePlaceModalOpen} onOpenEditModal={handleEditModalOpen}/>
        ) : (
          <NotP>등록된 일정이 없습니다.</NotP>
        )}

        {modalType && (
          <ModalContainer>
            {modalType === "add" && <AddModal onClose={() => setModalType(null)} selectedDay={selectedDay} />}
            {modalType === "place" && <PlaceModal onClose={() => setModalType(null)} selectedDay={selectedDay} title={title} subTitle={subTitle} />}
            {modalType === "edit" && <EditModal onClose={() => setModalType(null)} selectedDay={selectedDay} id={editItemId}/>}
          </ModalContainer>
        )}

      </InnerCalenderRightContainer>
    </CalenderRightContainer>
  );
};

export default CalenderRight;
