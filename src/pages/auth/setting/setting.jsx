import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Globe from 'react-globe.gl';
import { API } from '../../../apis/axios';
import { postPlanetName } from '../../../apis/planet/planetService';
import planetCutyVer from '../../../assets/images/planet/planetTexture/planetCutyVer.jpg';
import Spinner from '../../../components/Spinner/Spinner';

function SettingPage() {
  const globeRef = useRef();
  const navigate = useNavigate();
  const [planetName, setPlanetName] = useState(
    localStorage.getItem('planetName') || ''
  );
  const globeContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  //임시로 로딩 스피너 구현
  const handleSave = async () => {
    try {
      setIsLoading(true);
      // 행성 이름 로컬 스토리지 저장
      localStorage.setItem('planetName', planetName);

      // 로컬 스토리지에서 userId 가져오기
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('사용자 ID를 찾을 수 없습니다.');

      // 행성 생성 API 호출
      const response = await postPlanetName(planetName);
      console.log('postPlanetName 응답:', response); // 응답 데이터를 출력

      if (!response) {
        throw new Error('API 응답이 null입니다.');
      }

      // 응답으로 받은 행성 ID 저장
      if (response && typeof response === 'string') {
        console.log('응답 데이터:', response); // 디버깅용 로그
        localStorage.setItem('planetId', response);
        navigate('/planet');
      } else {
        throw new Error('API 응답이 null 또는 잘못된 형식입니다.');
      }
    } catch (error) {
      console.error('행성 생성 실패:', error.message);
      alert(`오류 발생: ${error.message}`);
    }
  };

  useEffect(() => {
    if (!globeRef.current) return;

    // lat: 위도(+값이면 북반구, -값이면 남반구),
    // lng: 경도(+값이면 동경, -값이면 서경),
    // altitude: 본인이 원하는 줌(확대/높이) 정도
    globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 5 }, 0);
    // ↑ 마지막 매개변수(0): 애니메이션 지속 시간(밀리초). 필요시 늘리면 카메라가 부드럽게 이동.
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  //반응형 관련
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    setDimensions({ width: innerWidth, height: innerHeight });
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (globeContainerRef.current) {
        const { offsetWidth, offsetHeight } = globeContainerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <GlobeWrapper>
        <GlobeContainer ref={globeContainerRef}>
          <TopBar>
            <SettingContainer>
              <PlanetName>나의 행성</PlanetName>
            </SettingContainer>
          </TopBar>
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            // globeImageUrl={planetCutyVer}
            // ↑ 카툰 느낌의 지구본 텍스쳐
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            backgroundColor="rgba(0,0,0,0)"
          />
        </GlobeContainer>
        <BottomBar>
          <SettingContainer>
            <SettingName>행성 이름 설정</SettingName>
            <Settinginput
              type="text"
              value={planetName}
              onChange={(e) => setPlanetName(e.target.value)}
            />
            <Settingbutton onClick={handleSave}>저장하고 시작</Settingbutton>
          </SettingContainer>
        </BottomBar>
      </GlobeWrapper>
    </>
  );
}

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  text-align: center;
  // min-height: 20vh;
  width: 100vw;
  box-sizing: border-box;
`;

const SettingName = styled.div`
  font-size: 20px;
  color: white;
`;

const Settinginput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 1rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.5rem;
  background: white;
  margin-bottom: 0.8rem;

  @media (max-width: 1800px) {
    padding: 2rem;
    font-size: 2rem;
  }

  @media (max-width: 1200px) {
    padding: 2.2rem;
    font-size: 3.5rem;
  }

  @media (max-width: 768px) {
    padding: 2.6rem;
    font-size: 5rem;
  }
`;

const Settingbutton = styled.button`
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  border: none;
  border-radius: 1rem;
  background-color: #00bcd4;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media (max-width: 1800px) {
    padding: 2.2rem;
    font-size: 3rem;
  }

  @media (max-width: 1200px) {
    padding: 2.4rem;
    font-size: 4rem;
  }

  @media (max-width: 768px) {
    padding: 2.8rem;
    font-size: 6rem;
  }
`;

const GlobeWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: transparent;
  overflow: hidden;
`;

const GlobeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const BottomBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  margin-top: 75vh;
`;

const PlanetName = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: white;
`;

const TopBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  margin-top: 15rem;
`;

export default SettingPage;
