import React, { useState, useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { patchPlanetName } from '../../apis/planet/planetService';
import updateButton from '../../assets/images/planet/switchButton/updateButton.png';
import planetCutyVer from '../../assets/images/planet/planetTexture/planetCutyVer.jpg';
import {
  fetchCoordinates,
  getRandomColor,
  getRandomStarSize,
} from '../../utils/planet/getRandom';
import useFetch from '../../hooks/useFetch';

const PlanetPage = () => {
  const globeRef = useRef();
  const navigate = useNavigate();
  const globeContainerRef = useRef(null);

  const userId = JSON.parse(localStorage.getItem('userId') || '[]');

  // 사용자 전체 일지 조회
  const { data, loading, error } = useFetch('/posts');
  //사용자 행성 조회
  const {
    data: planetData,
    loading: planetLoading,
    error: planetError,
  } = useFetch(`/planet/${userId}`);

  // 상태관리------------------------------------------------------------------------
  const [planetName, setPlanetName] = useState('');
  const [tempPlanetName, setTempPlanetName] = useState(planetName); // 수정 중인 행성 이름을 임시로 저장할 state
  //시간 함수
  const [currentTime, setCurrentTime] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [timeZoneId, setTimeZoneId] = useState(null);
  // 수정 모달 관련
  const [showModal, setShowModal] = useState(false);
  //도시 / 연결선 데이터
  const [pointsData, setPointsData] = useState(() => {
    const storedData = localStorage.getItem('pointsData');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [arcsData, setArcsData] = useState(() => {
    const storedData = localStorage.getItem('arcsData');
    return storedData ? JSON.parse(storedData) : [];
  });
  //반응형 관련
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  // 행성 존재 여부 확인 --------------------------------------------------------------

  useEffect(() => {
    if (planetData && planetData.planet_name) {
      setPlanetName(planetData.planet_name);
    }
  }, [planetData]);

  // -------------------------------------------------------------------------------

  // 사용자 일지 전체 가져온 데이터로 별 마커 생성
  useEffect(() => {
    const processRegionData = async () => {
      if (!data || loading || error) return;

      const storedPointsData = JSON.parse(
        localStorage.getItem('pointsData') || '[]'
      );
      const storedArcsData = JSON.parse(
        localStorage.getItem('arcsData') || '[]'
      );

      const existingRegions = new Set(
        storedPointsData.map((point) => point.name)
      );

      let updatedPoints = [...storedPointsData];
      let updatedArcs = [...storedArcsData];

      if (Array.isArray(data.data)) {
        for (const item of data.data) {
          const region = item.star.region;

          if (!existingRegions.has(region)) {
            try {
              const coordinates = await fetchCoordinates(region);

              if (coordinates) {
                const newPoint = {
                  lat: coordinates.lat,
                  lng: coordinates.lng,
                  name: region,
                  color: getRandomColor(),
                  size: getRandomStarSize(),
                };

                updatedPoints.push(newPoint);
                existingRegions.add(region);

                if (updatedPoints.length > 1) {
                  const prevPoint = updatedPoints[updatedPoints.length - 2];
                  const newArc = {
                    startLat: prevPoint.lat,
                    startLng: prevPoint.lng,
                    endLat: coordinates.lat,
                    endLng: coordinates.lng,
                  };
                  updatedArcs.push(newArc);
                }
              }
            } catch (error) {
              console.error(`Error processing region ${region}:`, error);
            }
          }
        }
      }

      if (updatedPoints.length > storedPointsData.length) {
        localStorage.setItem('pointsData', JSON.stringify(updatedPoints));
        localStorage.setItem('arcsData', JSON.stringify(updatedArcs));

        setPointsData(updatedPoints);
        setArcsData(updatedArcs);
      }
    };

    processRegionData();
  }, [data]);

  // setting.jsx에서 POST 후 저장했던 planetId
  // const planetId = localStorage.getItem('planetId') || null;

  // console.log(globeContainerRef.current);

  // 반응형 관련
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

  useEffect(() => {
    const minWidth = 300; // 최소 화면 너비
    const maxWidth = 1200; // 최대 화면 너비
    const minAltitude = 2.5; // 최소 altitude
    const maxAltitude = 6; // 최대 altitude

    const updateGlobeView = () => {
      if (globeRef.current) {
        const { innerWidth } = window;

        const scale = (innerWidth - minWidth) / (maxWidth - minWidth);
        const newAltitude =
          minAltitude +
          (maxAltitude - minAltitude) * (1 - Math.min(Math.max(scale, 0), 1));

        globeRef.current.pointOfView(
          { lat: 20.5665, lng: 126.978, altitude: newAltitude },
          0
        );
      }
    };

    updateGlobeView();
    window.addEventListener('resize', updateGlobeView);

    return () => window.removeEventListener('resize', updateGlobeView);
  }, []);

  //지구본 자동 회전 기능
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.2;
    }
  }, []);

  // useEffect(() => {
  //   if (!planetName) {
  //     navigate('/setting');
  //   }
  // }, [planetName, navigate]);

  // pointsData, arcsData가 변경될 때마다 로컬 스토리지에 저장
  // useEffect(() => {
  //   localStorage.setItem('pointsData', JSON.stringify(pointsData));
  //   localStorage.setItem('arcsData', JSON.stringify(arcsData));
  // }, [pointsData, arcsData]);

  // 현재 위치 기반 시간 업데이트 함수
  const updateTimeBasedOnLocation = async () => {
    if (!navigator.geolocation) {
      alert('위치 정보를 사용할 수 없습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const API_KEY = import.meta.env.VITE_GOOGLE_TOKEN;
          const timestamp = Math.floor(Date.now() / 1000);
          const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${API_KEY}`;

          const response = await axios.get(url);
          if (response.data.status === 'OK') {
            const { timeZoneId } = response.data;
            setTimeZoneId(timeZoneId);

            const formatter = new Intl.DateTimeFormat('ko-KR', {
              timeZone: timeZoneId,
              timeZoneName: 'long',
            });

            const localTimeString = formatter.format(new Date());

            // 시간대 이름만 추출하는 로직
            let locationName = localTimeString.replace(
              /.*\s(.+?) 표준시/,
              '$1'
            );
            if (!locationName || locationName === localTimeString) {
              locationName = '알 수 없는 지역';
            }
            setCurrentLocation(locationName);

            updateLocalTime(timeZoneId);
          } else {
            alert('시간대를 가져오는 데 실패했습니다.');
          }
        } catch (error) {
          console.error('시간대 정보를 가져오는 중 오류 발생:', error);
          alert('시간 정보를 업데이트하는 중 오류가 발생했습니다.');
        }
      },
      (error) => {
        console.error('위치 정보를 가져오는 중 오류 발생:', error);
        alert('위치 정보를 가져오지 못했습니다. 위치 권한을 허용해주세요.');
      }
    );
  };

  // 현지 시간 계산 및 업데이트 함수
  const updateLocalTime = (timeZoneId) => {
    if (!timeZoneId) return;

    const now = new Date();
    const formatter = new Intl.DateTimeFormat('ko-KR', {
      timeZone: timeZoneId,
      hour: '2-digit',
      minute: '2-digit',
    });
    setCurrentTime(formatter.format(now));
  };

  // 컴포넌트가 마운트될 때 위치 기반 시간 업데이트
  useEffect(() => {
    updateTimeBasedOnLocation();
  }, []);

  // 일정 간격으로 시간 업데이트
  useEffect(() => {
    if (!timeZoneId) return;

    const intervalId = setInterval(() => {
      updateLocalTime(timeZoneId);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [timeZoneId]);

  const handleOpenModal = () => {
    setTempPlanetName(planetName);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 수정 후 저장
  const handleSavePlanetName = async () => {
    if (!tempPlanetName.trim()) {
      alert('행성 이름을 입력해주세요.');
      return;
    }

    const userId = localStorage.getItem('userId'); // user_id 가져오기
    if (!userId) {
      alert('사용자 ID를 찾을 수 없습니다.');
      return;
    }

    // 서버로 변경된 행성 이름 전송
    const success = await patchPlanetName(userId, tempPlanetName);
    if (success) {
      // 서버 통신 성공 시 로컬 스토리지에 저장
      localStorage.setItem('planetName', tempPlanetName);

      // 화면에 반영
      setPlanetName(tempPlanetName);
      alert('행성 이름이 성공적으로 변경되었습니다.');
      setShowModal(false);
    } else {
      alert('행성 이름 수정에 실패했습니다.');
    }
  };

  // 마커 관련
  const htmlElementsData = pointsData.map((point) => ({
    lat: point.lat,
    lng: point.lng,
    altitude: 0.1,
    name: point.name,
  }));

  // 마커 svg
  const markerSvg = `<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="currentColor" d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"></path> </g></svg>`;

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
          <RefreshButton>
            <PlanetName>{planetName}</PlanetName>
            <EditButton onClick={handleOpenModal}>수정</EditButton>
          </RefreshButton>
          <TimeDisplay>
            <UpdateButton
              src={updateButton}
              alt="Update"
              onClick={updateTimeBasedOnLocation}
            />
            현재 시각 {currentTime}
            {currentLocation && <SmallText> {currentLocation} 기준</SmallText>}
          </TimeDisplay>
        </TopBar>

        {/* 수정 모달 */}
        {showModal && (
          <ModalBackdrop onClick={handleCloseModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <RenamePlanet>행성 이름 수정</RenamePlanet>
              <ModalInput
                type="text"
                value={tempPlanetName}
                onChange={(e) => setTempPlanetName(e.target.value)}
              />
              <ModalButtonContainer>
                <ModalButton onClick={handleSavePlanetName}>저장</ModalButton>
                <ModalButton onClick={handleCloseModal}>취소</ModalButton>
              </ModalButtonContainer>
            </ModalContent>
          </ModalBackdrop>
        )}

        {/* 지구본 */}
        <GlobeContainer ref={globeContainerRef}>
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            // globeImageUrl={planetCutyVer}
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            backgroundColor="rgba(0,0,0,0)"
            pointsData={pointsData}
            pointLat="lat"
            pointLng="lng"
            pointAltitude={0.02}
            pointLabel={({ name }) => `<b>${name}</b>`}
            // arcsData={arcsData}
            // arcStartLat="startLat"
            // arcStartLng="startLng"
            // arcEndLat="endLat"
            // arcEndLng="endLng"
            // arcColor={() => ['#ff9900', '#ff6600']}
            // arcDashLength={1}
            // arcDashGap={0}
            // arcDashAnimateTime={0}
            // arcAltitude={0}
            // arcStroke={1}
            htmlElementsData={pointsData}
            htmlLat={(d) => d.lat}
            htmlLng={(d) => d.lng}
            htmlAltitude={0.01}
            htmlElement={(d) => {
              const el = document.createElement('div');
              el.innerHTML = markerSvg;
              el.innerHTML = `
                <div style="
                  transform: translate(0%, 0%) scale(0.5);
                  width: ${d.size};
                  height: ${d.size};
                ">
                 ${markerSvg}
                </div>
              `;
              el.style.color = d.color;
              return el;
            }}
          />
        </GlobeContainer>
      </GlobeWrapper>
    </>
  );
};

const GlobeWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: transparent;
  overflow: hidden;
`;

const GlobeContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  padding: 0 2rem;
  z-index: 10;
  margin-top: 10rem;
  gap: 3rem;
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

  @media (max-width: 768px) {
    font-size: 2.8rem;
    padding: 1.2rem 1.44rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
    padding: 1.7rem 2.04rem;
  }

  @media (max-width: 445px) {
    font-size: 2rem;
    padding: 1.2rem 1.7rem;
  }
`;

const PlanetName = styled.div`
  max-width: 15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  color: white;
  font-size: 2rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const EditButton = styled.button`
  background: #01bcd4;
  padding: 0.1rem 0.4rem;
  border-radius: 0.6rem;
  font-size: 1.7rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 2.55rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
  }

  @media (max-width: 450px) {
    font-size: 2rem;
  }
`;

const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: rgba(249, 249, 249, 0.8);
  width: 44rem;
  padding: 2rem 3rem;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RenamePlanet = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: #333;
  text-align: center;
`;

const ModalInput = styled.input`
  width: 100%;
  background: white;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  outline: none;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;
`;

const ModalButton = styled.button`
  padding: 1rem 2rem;
  width: 100%;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  cursor: pointer;
  border: none;

  &:first-child {
    background: #01bcd4;
    color: white;
  }

  &:last-child {
    background: #f5f5f5;
    color: #333;
  }
`;

const UpdateButton = styled.img`
  width: auto;
  height: 100%;
  margin-right: 3rem;
  max-height: 4rem;
  cursor: pointer;
  // object-fit: contain;
`;

const SmallText = styled.span`
  font-size: 1.2rem; /* 원하는 크기로 설정 */
  margin-left: 1rem;
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-left: 0.2rem;
  }
`;

export default PlanetPage;
