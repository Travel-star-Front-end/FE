import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Globe from 'react-globe.gl';
import { postPlanetName } from '../../../apis/planet/planetService';

function SettingPage() {
  const globeRef = useRef();
  const navigate = useNavigate();
  const [planetName, setPlanetName] = useState(
    localStorage.getItem('planetName') || ''
  );
  const globeContainerRef = useRef(null);

  const handleSave = async () => {
    localStorage.setItem('planetName', planetName);
    const newId = await postPlanetName(planetName);
    if (newId) {
      localStorage.setItem('planetId', newId);
    }

    navigate('/planet');
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
      <GlobeWrapper>
        <GlobeContainer ref={globeContainerRef}>
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            // globeImageUrl="../../images/planet.jpg"
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
  min-height: 20vh;
  width: 100%;
  box-sizing: border-box;
`;

const SettingName = styled.div`
  font-size: 2rem;
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
`;

const Settingbutton = styled.button`
  width: 100%;
  max-width: 500px;
  padding: 1.9rem;
  border: none;
  border-radius: 1rem;
  background-color: #00bcd4;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const GlobeWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: transparent;
  overflow: hidden;
`;

const GlobeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const BottomBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  margin-top: 730px;
`;

export default SettingPage;
