import React, { useState, useEffect } from 'react';
import * as s from '../../../styles/calender/calender';
import ListCalender from './list-calender';
import useFetch from '../../../hooks/useFetch';
import PlusButtonImage from '../../../assets/images/calender/add.png';
import AddModal from './addModal';
import PlaceModal from './placeModal';
import EditModal from './editModal';
import { getCalenderData } from '../../../apis/planet/planetService';

const CalenderRight = ({ selectedDay }) => {
  const { data, loading, error } = useFetch(`/schedule/${selectedDay}`);
  const [modalType, setModalType] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    console.log('선택 날짜 변경: ', selectedDay);
    console.log('api 연결 데이터터: ', data);
  }, [selectedDay]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ko-KR', options);
  };

  const handlePlaceModalOpen = (title, subTitle) => {
    setTitle(title);
    setSubTitle(subTitle);
    setModalType('place');
  };

  const handleEditModalOpen = (id) => {
    setEditItemId(id);
    setModalType('edit');
  };
  console.log(data);

  return (
    <s.CalenderRightContainer>
      <s.InnerCalenderRightContainer>
        <s.RightP>일정작성</s.RightP>

        <s.PContainer>
          <s.RightP
            style={{ fontSize: '1vw', fontWeight: '600', marginTop: '0.8vw' }}
          >
            {formatDate(selectedDay)}
          </s.RightP>
          <s.PlusButton
            src={PlusButtonImage}
            alt="추가 버튼"
            onClick={() => setModalType('add')}
          />
        </s.PContainer>

        {data && Array.isArray(data) && data.length > 0 ? (
          <ListCalender
            data={data}
            selectedDay={selectedDay}
            onOpenPlaceModal={handlePlaceModalOpen}
            onOpenEditModal={handleEditModalOpen}
          />
        ) : (
          <s.NotP>등록된 일정이 없습니다.</s.NotP>
        )}

        {modalType && (
          <s.ModalContainer>
            {modalType === 'add' && (
              <AddModal
                onClose={() => setModalType(null)}
                selectedDay={selectedDay}
              />
            )}
            {modalType === 'place' && (
              <PlaceModal
                onClose={() => setModalType(null)}
                selectedDay={selectedDay}
                title={title}
                subTitle={subTitle}
              />
            )}
            {modalType === 'edit' && (
              <EditModal
                onClose={() => setModalType(null)}
                selectedDay={selectedDay}
                id={editItemId}
              />
            )}
          </s.ModalContainer>
        )}
      </s.InnerCalenderRightContainer>
    </s.CalenderRightContainer>
  );
};

export default CalenderRight;
