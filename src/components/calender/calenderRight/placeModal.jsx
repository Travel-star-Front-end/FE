import { useState } from "react";
import { API } from "../../../apis/axios";
import * as s from "../../../styles/calender/calender";
import Trash from "../../../assets/images/calender/trash.png";


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

      console.log("response", response.data);
      alert("일지 제목이 수정되었습니다.");
      onClose();
    } catch (error) {
      console.error("서버 에러:", error);
    }
  };

  return (
    <s.PlaceModalContainer>
      <s.PlaceTitleContainer>
        <s.PlaceTitleP>일정제목</s.PlaceTitleP>
        <s.TrashImg src={Trash} onClick={onClose} alt="delete" />
      </s.PlaceTitleContainer>
      <s.PlaceInput value={modalTitle} onChange={handleTitleChange} />

      <s.PlaceTitleP style={{width: "100%", marginTop: "0.6vw"}}>일정설명</s.PlaceTitleP>
      <s.PlaceInput value={modalSubTitle} onChange={handleSubTitleChange} />

      <s.PlaceButton style={{marginTop: "0.4vw"}} onClick={handleSubmit}>완료</s.PlaceButton>
    </s.PlaceModalContainer>
  )
}

export default PlaceModal;