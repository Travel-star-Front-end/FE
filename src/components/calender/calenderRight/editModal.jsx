import { useState, useEffect } from 'react';
import * as s from '../../../styles/calender/calender';
import colors from '../../../styles/common/colors';
import Trash from '../../../assets/images/calender/trash.png';
import ModalTime from './modalTime';
import { API } from '../../../apis/axios';

const EditModal = ({ onClose, selectedDay, id, setRefreshKey }) => {
  const [period, setPeriod] = useState('오전');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [location, setLocation] = useState('');

  const formatNumber = (num) => String(num).padStart(2, '0');

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const response = await API.get(`/schedule/${selectedDay}/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = response.data;
          console.log('받아온 일정 데이터:', data);
  
          if (data.date_time) {
            const utcDate = new Date(data.date_time);
            const kstDate = new Date(utcDate.getTime() - 9 * 60 * 60 * 1000); 
  
            let kstHour = kstDate.getHours();
            const kstMinute = kstDate.getMinutes();
  
            const period = kstHour < 12 ? '오전' : '오후';
  
            const hour12 = kstHour.toString().padStart(2, '0');
  
            setPeriod(period);
            setHour(hour12); 
            setMinute(kstMinute.toString().padStart(2, '0'));
          }
  
          setLocation(data.location || '');
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchData();
    }
  }, [id]);
  
  
  

  const getHourOptions = (period) => {
    if (period === '오전') {
      return Array.from({ length: 12 }, (_, i) => formatNumber(i));
    } else {
      return Array.from({ length: 12 }, (_, i) => formatNumber(i + 12));
    }
  };

  const convertTo24Hour = (hour) => {
    return String(parseInt(hour, 10)).padStart(2, '0');
  };

  const handleSubmit = async () => {
    try {
      if (!location.trim()) {
        alert('장소를 입력하세요.');
        return;
      }

      if (!selectedDay || isNaN(new Date(selectedDay).getTime())) {
        alert('유효하지 않은 날짜입니다.');
        return;
      }

      const hour24 = convertTo24Hour(hour);
      const dateTimeString = `${selectedDay}T${hour24}:${minute}:00`;

      console.log('날짜 시간 문자열:', dateTimeString);
      const dateObj = new Date(dateTimeString);

      if (isNaN(dateObj.getTime())) {
        alert('날짜 또는 시간이 유효하지 않습니다.');
        return;
      }

      const formattedDateTime = dateObj.toISOString();

      const requestData = {
        location,
        date_time: formattedDateTime,
      };

      //귀찮아서 걍 똑같은 코드 씀. 나중에 리팩토링 ㄱㄱ
      const accssToken = localStorage.getItem('accessToken');
      const response = await API.patch(
        `/schedule/${selectedDay}/${id}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${accssToken}`,
          },
        }
      );

      setRefreshKey((prev) => prev + 1);

      alert('일정이 수정되었습니다.');
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('일정 수정 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    setHour('00');
    setMinute('00');
  }, [period]);

  const handleDelete = async () => {
    try {
      const accssToken = localStorage.getItem('accessToken');
      const response = await API.delete(`/schedule/${selectedDay}/${id}`, {
        headers: {
          Authorization: `Bearer ${accssToken}`,
        },
      });
      if (response) {
        alert('일정이 삭제되었습니다.');
        setRefreshKey((prev) => prev + 1);
        onClose();
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <s.AddModalContainer>
      <s.TimeContainer>
        <s.AddTitleP>시간</s.AddTitleP>
        <s.AddTrashImg src={Trash} onClick={handleDelete} alt="delete" />
      </s.TimeContainer>

      <s.TimeSelectContainer>
        <ModalTime
          value={period}
          onChange={setPeriod}
          options={['오전', '오후']}
        />

        <s.TimeSelectInnerContainer>
          <ModalTime
            value={hour}
            onChange={(value) => setHour(formatNumber(value))}
            options={getHourOptions(period)}
          />
          <s.AddTitleP style={{ color: colors.black }}>:</s.AddTitleP>
          <ModalTime
            value={minute}
            onChange={(value) => setMinute(formatNumber(value))}
            options={Array.from({ length: 60 }, (_, i) => formatNumber(i))}
          />
        </s.TimeSelectInnerContainer>
      </s.TimeSelectContainer>

      <s.AddTitleP style={{ marginTop: '6.35vw', width: '100%' }}>
        장소
      </s.AddTitleP>
      <s.PlaceInput
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="장소를 입력하세요"
      />

      <s.AddButton onClick={handleSubmit}>완료</s.AddButton>
    </s.AddModalContainer>
  );
};

export default EditModal;
