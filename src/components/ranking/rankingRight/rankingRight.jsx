import React, { useState, useEffect } from 'react';
import { API } from '../../../apis/axios';
import styled from 'styled-components';
import colors from '../../../styles/common/colors';
import InputRankingRight from './input/inputRankingRight';
import ButtonRankingRight from './button/buttonRankingRight';
import ConstellationViewer from '../../planet/ConstellationViewer';

const RightContainer = styled.div`
  width: 30%;
  background: ${colors.white};
  height: 35.01vw;
  margin-top: 1.65vw;
  box-shadow: 0 0.2vw 0.68vw 0 rgba(0, 0, 0, 0.04);
  border-radius: 0.25vw;
  padding: 0 0.7vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImgContainer = styled.div`
  width: 16.1vw;
  height: 16.1vw;
  background: ${colors.black};
  border-radius: 50%;
  margin-top: 3.2vw;
`;

const RightP = styled.p`
  font-size: 1.2vw;
  font-weight: 800;
  color: ${colors.black};
  margin-top: 2.2vw;
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 0 1.65vw;
`;

const RankingRight = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // 별자리 관련 추가함
  const [pointsData, setPointsData] = useState([]);
  const [arcsData, setArcsData] = useState([]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name) return alert('이름을 입력해주세요.');

    setLoading(true);

    try {
      const response = await API.post('/users', { username: name });
      alert('별자리 신청이 완료되었습니다.');
      console.log(response.data);
    } catch (err) {
      alert('서버에 문제가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  // 별자리 관련 추가함함
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
    <RightContainer>
      <ImgContainer>
        <ConstellationViewer pointsData={pointsData} arcsData={arcsData} />
      </ImgContainer>
      <RightP>나의 여행 별자리</RightP>

      <InputContainer>
        <RightP
          style={{ fontWeight: '600', fontSize: '0.9vw', marginTop: '1.3vw' }}
        >
          이름
        </RightP>
        <InputRankingRight
          placeholder="작성해주세요."
          value={name}
          onChange={handleChange}
        />
        <ButtonRankingRight onClick={handleSubmit}>
          {loading ? '신청 중...' : '신청하기'}
        </ButtonRankingRight>
      </InputContainer>
    </RightContainer>
  );
};

export default RankingRight;
