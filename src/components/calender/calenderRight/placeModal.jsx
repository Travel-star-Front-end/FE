import { useState } from "react";
import { API } from "../../../apis/axios";
import styled from "styled-components";
import colors from "../../../styles/common/colors";
import Trash from "../../../assets/images/calender/trash.png";

const PlaceModalContainer = styled.div`
  width: 100%;
  height: 11.1vw;
  border-radius: 0.75vw;
  padding: 0 0.6vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3vw;
  background: ${colors.calenderGray5};
`

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const TitleP = styled.p`
  font-size: 0.9vw;
  font-weight: 700;
  color: ${colors.sideBarGray2};
`

const TrashImg = styled.img`
  width: 0.85vw;
  height: 0.9vw;
  cursor: pointer;
`;

const PlaceInput = styled.input`
  width: 100%;
  height: 1.65vw;
  background: ${colors.white};
  border-radius: 0.25vw;
  font-size: 0.8vw;
  font-weight: 500;
  color: ${colors.sideBarGray2};
`

const PlaceButton = styled.button`
  width: 9.6vw;
  height: 1.4vw;
  border-radius: 0.25vw;
  background: ${colors.main};
  cursor: pointer;
  font-size: 0.8vw;
  font-weight: 700;
  color: ${colors.white};
`

const PlaceModal = ({ title, subTitle, selectedDay, onClose }) => {
  const [modalTitle, setModalTitle] = useState(title);
  const [modalSubTitle, setModalSubTitle] = useState(subTitle);

  const handleTitleChange = (e) => {
    setModalTitle(e.target.value);
  };

  const handleSubTitleChange = (e) => {
    setModalSubTitle(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await API.post("/users", {
        title: modalTitle,
        subTitle: modalSubTitle,
      });

      // console.log("response", response.data);
      onClose();
    } catch (error) {
      console.error("서버 에러:", error);
    }
  };

  return (
    <PlaceModalContainer>
      <TitleContainer>
        <TitleP>일정제목</TitleP>
        <TrashImg src={Trash} onClick={onClose} alt="delete" />
      </TitleContainer>
      <PlaceInput value={modalTitle} onChange={handleTitleChange} />

      <TitleP style={{width: "100%", marginTop: "0.6vw"}}>일정설명</TitleP>
      <PlaceInput value={modalSubTitle} onChange={handleSubTitleChange} />

      <PlaceButton style={{marginTop: "0.4vw"}} onClick={handleSubmit}>완료</PlaceButton>
    </PlaceModalContainer>
  )
}

export default PlaceModal;