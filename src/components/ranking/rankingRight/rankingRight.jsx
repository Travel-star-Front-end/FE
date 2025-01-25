import React, { useState, useEffect, useRef } from 'react';
import { API } from '../../../apis/axios';
import * as s from "../../../styles/ranking/ranking";
import InputRankingRight from './input/inputRankingRight';
import ButtonRankingRight from './button/buttonRankingRight';
import ConstellationViewer from '../../planet/ConstellationViewer';
import html2canvas from 'html2canvas';

const RankingRight = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [pointsData, setPointsData] = useState([]);
  const [arcsData, setArcsData] = useState([]);
  const imgContainerRef = useRef(null);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name) return alert('이름을 입력해주세요.');

    setLoading(true);

    try {
      const canvas = await html2canvas(imgContainerRef.current);
      canvas.toBlob(async (blob) => {
        const filename = `${Date.now()}_constellation.png`;

        const response = await API.post('/users', {
          username: name,
          constellationImage: filename,
        });

        alert('별자리 신청이 완료되었습니다.');
        console.log(response.data);

        setIsCompleted(true);
      });
    } catch (err) {
      alert('이미지 캡처 중 오류 발생');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedPointsData = localStorage.getItem('pointsData');
    const storedArcsData = localStorage.getItem('arcsData');
    if (storedPointsData) {
      setPointsData(JSON.parse(storedPointsData));
    }
    if (storedArcsData) {
      setArcsData(JSON.parse(storedArcsData));
    }
  }, []);

  return (
    <s.RightContainer>
        <s.ImgContainer ref={imgContainerRef}>
          <ConstellationViewer pointsData={pointsData} arcsData={arcsData} />
        </s.ImgContainer>
        <s.ImgOutContainer completed={isCompleted.toString()}/>
      <s.RightP>나의 여행 별자리</s.RightP>

      {isCompleted ? (
        <s.CompletedP>신청완료</s.CompletedP>
      ) : (
        <s.InputContainer>
          <s.RightP style={{ fontWeight: '600', fontSize: '0.9vw', marginTop: '1.3vw' }}>
            이름
          </s.RightP>
          <InputRankingRight placeholder="작성해주세요." value={name} onChange={handleChange} />
          <ButtonRankingRight onClick={handleSubmit}>신청하기</ButtonRankingRight>
        </s.InputContainer>
      )}
    </s.RightContainer>
  );
};

export default RankingRight;
