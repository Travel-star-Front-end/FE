import React, { useState, useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { patchPlanetName } from '../../apis/planet/planetService';

const PlanetPage = () => {
  const globeRef = useRef();
  const navigate = useNavigate();
  const globeContainerRef = useRef(null);

  //행성 이름 관련 state와 localStorage 확인
  const [planetName, setPlanetName] = useState(
    localStorage.getItem('planetName') || ''
  );
  const [isEditMode, setIsEditMode] = useState(false);

  // 수정 중인 행성 이름을 임시로 저장할 state
  const [tempPlanetName, setTempPlanetName] = useState(planetName);

  // setting.jsx에서 POST 후 저장했던 planetId
  const planetId = localStorage.getItem('planetId') || null;

  //도시 / 연결선 데이터
  const [pointsData, setPointsData] = useState([
    { lat: 37.5665, lng: 126.978, name: '서울' },
  ]);
  const [arcsData, setArcsData] = useState([]);
  const [cityName, setCityName] = useState('');

  //반응형 관련
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
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

  //지구본 자동 회전 기능
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  useEffect(() => {
    if (!planetName) {
      navigate('/setting');
    }
  }, [planetName, navigate]);

  // Google Geocoding API로 위도와 경도 가져오기
  const fetchCoordinates = async (city) => {
    const API_KEY = import.meta.env.VITE_GOOGLE_TOKEN;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      city
    )}&key=${API_KEY}`;

    try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
        const location = response.data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        alert('위치를 찾을 수 없습니다. 다시 시도해주세요.');
        return null;
      }
    } catch (error) {
      console.error('Geocoding API 요청 중 오류 발생:', error);
      alert('위치를 가져오는 중 오류가 발생했습니다.');
      return null;
    }
  };

  // 도시 추가 함수
  const addCity = async () => {
    if (!cityName) {
      alert('도시 이름을 입력해주세요.');
      return;
    }
    const coordinates = await fetchCoordinates(cityName);
    if (!coordinates) return;

    const newPoint = { ...coordinates, name: cityName };
    setPointsData((prev) => [...prev, newPoint]);

    // 이전 여행지와 연결 선 추가
    if (pointsData.length > 0) {
      const lastPoint = pointsData[pointsData.length - 1];
      const newArc = {
        startLat: lastPoint.lat,
        startLng: lastPoint.lng,
        endLat: coordinates.lat,
        endLng: coordinates.lng,
      };
      setArcsData((prev) => [...prev, newArc]);
    }

    setCityName('');
  };

  //시간 함수
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // 행성 이름 수정
  // 수정 모드로 전환
  const handleEditPlanetName = () => {
    setTempPlanetName(planetName);
    setIsEditMode(true);
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setTempPlanetName(planetName);
    setIsEditMode(false);
  };

  // 수정 후 저장
  const handleSavePlanetName = async () => {
    if (!tempPlanetName.trim()) {
      alert('행성 이름을 입력해주세요.');
      return;
    }

    // localStorage 갱신
    localStorage.setItem('planetName', tempPlanetName);
    setPlanetName(tempPlanetName);

    // planetId가 있으면 PATCH
    if (planetId) {
      const success = await patchPlanetName(planetId, tempPlanetName);
      if (!success) {
        alert('행성 이름 수정에 실패했습니다.');
      }
    }

    // 수정 모드 해제
    setIsEditMode(false);
  };

  return (
    <>
      <GlobeWrapper>
        {/* 도시 입력 폼 */}
        {/* <div>
          <input
            type="text"
            placeholder="도시 이름 입력"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button onClick={addCity}>추가</button>
        </div> */}

        <TopBar>
          {isEditMode ? (
            <>
              <RefreshButton>
                <input
                  type="text"
                  style={{ color: 'white', fontSize: '2rem' }}
                  value={tempPlanetName}
                  onChange={(e) => setTempPlanetName(e.target.value)}
                />
                <EditButton onClick={handleSavePlanetName}>저장</EditButton>
                <EditButton onClick={handleCancelEdit}>취소</EditButton>
              </RefreshButton>
            </>
          ) : (
            <>
              <RefreshButton>
                {planetName}
                <EditButton onClick={handleEditPlanetName}>수정</EditButton>
              </RefreshButton>
            </>
          )}

          <TimeDisplay>현재 시각 {getCurrentTime()}</TimeDisplay>
        </TopBar>

        {/* 지구본 */}
        <GlobeContainer ref={globeContainerRef}>
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            // globeImageUrl="../../images/planet.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            backgroundColor="rgba(0,0,0,0)"
            pointsData={pointsData}
            pointLat="lat"
            pointLng="lng"
            pointAltitude={0.02}
            pointLabel={({ name }) => `<b>${name}</b>`}
            arcsData={arcsData}
            arcStartLat="startLat"
            arcStartLng="startLng"
            arcEndLat="endLat"
            arcEndLng="endLng"
            arcColor={() => ['#ff9900', '#ff6600']}
            arcDashLength={1}
            arcDashGap={0}
            arcDashAnimateTime={0}
          />
        </GlobeContainer>
      </GlobeWrapper>
    </>
  );
};

const GlobeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: transparent;
  overflow: hidden;
`;

const GlobeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  padding: 0 2rem;
  z-index: 10;
  margin-top: 10rem;
  gap: 5rem;
`;

const RefreshButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem 1.2rem;
  background: rgb(100, 116, 110);
  border-radius: 0.8rem;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10rem;
`;

const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const EditButton = styled.button`
  background: #01bcd4;
  padding: 0.1rem 0.4rem;
  border-radius: 0.6rem;
  font-size: 1.7rem;
  color: white;
`;

export default PlanetPage;
