import { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import * as s from '../../../styles/calender/calender';
import ItemCalender from './item-calender';

const ListCalender = ({
  data,
  selectedDay,
  onOpenPlaceModal,
  onOpenEditModal,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [editVisible, setEditVisible] = useState(false);

  const safeData = Array.isArray(data) ? data : [];

  const handleItemClick = (id) => {
    setSelectedId(id);
    setEditVisible(false);
  };

  // 파라미터 추가함
  const handleEditClick = (id, selecteDay) => {
    onOpenEditModal(id, selecteDay);
  };

  const handleTitleClick = () => {
    setEditVisible(true);
    setSelectedId(null);
  };

  // 시/분 추출하는 함수 추가함
  const extractTime = (dateTime) => {
    const utcDate = new Date(dateTime);
    const kstDate = new Date(utcDate.getTime() - 9 * 60 * 60 * 1000); // ✅ 9시간 더하기 (UTC → KST 변환)
  
    const hours = kstDate.getHours().toString().padStart(2, '0');
    const minutes = kstDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  // 시간 기준 정렬 함수 추가함
  const sortedData = safeData.sort((a, b) => {
    const timeA = new Date(a.date_time);
    const timeB = new Date(b.date_time);
    return timeA - timeB;
  });

  // console.log('솔티드데이터터', sortedData);

  // const {
  //   data: titleData,
  //   loading,
  //   error,
  // } = useFetch(`/schedule/${selectedDay}`);
  // const title = titleData?.[0]?.location || '제목';
  // const subTitle = titleData?.[0]?.body || '부제목';

  // const handlePlaceModalOpen = () => {
  //   onOpenPlaceModal(title, subTitle);
  // };
  // console.log('safe Data', safeData);

  return (
    <>
    {/*
      <s.TitleContainer
        editvisible={editVisible.toString()}
        onClick={handleTitleClick}
      >
        <s.TitleInnerContainer>
          <s.LeftContainer>
          <s.TitleP>{title}</s.TitleP>
            <s.TitleP2>{subTitle}</s.TitleP2>
          </s.LeftContainer>
          <s.EditButton
            visible={editVisible.toString()}
            onClick={handlePlaceModalOpen}
          >
            수정
          </s.EditButton>
        </s.TitleInnerContainer>
      </s.TitleContainer>
      */}

      {/* time, location, selectedDay 추가함, ket 값 변경함*/}
      <s.ListContainer>
        {sortedData.map((item) => (
          <ItemCalender
            key={item.schedule_id}
            id={item.schedule_id}
            time={extractTime(item.date_time)}
            location={item.location}
            selectedDay={selectedDay}
            selected={item.schedule_id === selectedId}
            onItemClick={() => handleItemClick(item.schedule_id)}
            onEditClick={handleEditClick}
          />
        ))}
      </s.ListContainer>
    </>
  );
};

export default ListCalender;
