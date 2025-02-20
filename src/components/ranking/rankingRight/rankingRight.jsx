import React, { useState, useEffect, useRef } from 'react';
import { API } from '../../../apis/axios';
import * as s from '../../../styles/ranking/ranking';
import InputRankingRight from './input/inputRankingRight';
import ButtonRankingRight from './button/buttonRankingRight';
import ConstellationViewer from '../../planet/ConstellationViewer';
import html2canvas from 'html2canvas';
import useFetch from '../../../hooks/useFetch';

const RankingRight = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [pointsData, setPointsData] = useState([]);
  const [arcsData, setArcsData] = useState([]);
  const imgContainerRef = useRef(null);

  useEffect(() => {
    const storedPointsData = localStorage.getItem('pointsData');
    const storedArcsData = localStorage.getItem('arcsData');

    if (storedPointsData) setPointsData(JSON.parse(storedPointsData));
    if (storedArcsData) setArcsData(JSON.parse(storedArcsData));
  }, []);

  const { data } = useFetch('/stars/ranking/check');
  const isCompleted = data?.applied === 1;

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name) return alert('이름을 입력해주세요.');

    setLoading(true);

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        alert('로그인이 필요합니다.');
        setLoading(false);
        return;
      }

      const canvas = await html2canvas(imgContainerRef.current);
      canvas.toBlob(async (blob) => {
        if (!blob) {
          alert('이미지 캡처에 실패했습니다.');
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', blob, `${Date.now()}_constellation.png`);

        const response = await API.patch('/stars/name', formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        // console.log(response);
        alert('별자리 신청이 완료되었습니다. 반영까지 5분이 소요됩니다.');
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
    } catch (err) {
      alert('이미지 업로드 중 오류 발생');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <s.RightContainer>
      <s.ImgContainer ref={imgContainerRef}>
        <ConstellationViewer pointsData={pointsData} arcsData={arcsData} />
      </s.ImgContainer>
      <s.ImgOutContainer completed={isCompleted.toString()} />

      <s.RightP>나의 여행 별자리</s.RightP>

      {isCompleted ? (
        <s.CompletedP>신청완료</s.CompletedP>
      ) : (
        <s.InputContainer>
          <s.RightP
            style={{ fontWeight: '600', fontSize: '0.9vw', marginTop: '1.3vw' }}
          >
            이름
          </s.RightP>
          <InputRankingRight
            placeholder="작성해주세요."
            value={name}
            onChange={handleChange}
          />
          <ButtonRankingRight onClick={handleSubmit}>
            신청하기
          </ButtonRankingRight>
        </s.InputContainer>
      )}
    </s.RightContainer>
  );
};

export default RankingRight;
