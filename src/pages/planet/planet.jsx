import React, { useState, useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { patchPlanetName } from '../../apis/planet/planetService';
import updateButton from '../../assets/images/planet/switchButton/updateButton.png';
import planetCutyVer from '../../assets/images/planet/planetTexture/planetCutyVer.jpg';
import ConstellationViewer from '../../components/planet/ConstellationViewer';
import { checkPlanetExists } from '../../apis/planet/planetService';
import useFetch from '../../hooks/useFetch';

const PlanetPage = () => {
  const globeRef = useRef();
  const navigate = useNavigate();
  const globeContainerRef = useRef(null);

  // 사용자 일지 전체 가져온 데이터로 별 마커 생성
  const { data, loading, error } = useFetch('/posts');

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
  }, [data, loading, error]);

  // 행성 존재 여부 확인 --------------------------------------------------------------
  // const [isPlanetExists, setIsPlanetExists] = useState(false); // 행성 존재 여부 상태
  // const userId = localStorage.getItem('userId'); // 사용자 ID 가져오기

  // useEffect(() => {
  //   const fetchPlanetStatus = async () => {
  //     if (userId) {
  //       const exists = await checkPlanetExists(userId);
  //       setIsPlanetExists(exists);
  //     }
  //   };
  //   fetchPlanetStatus();
  // }, [userId]);

  // if (!isPlanetExists) {
  //   return;
  // }

  //-------------------------------------------------------------------------------

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
  const [pointsData, setPointsData] = useState(() => {
    const storedData = localStorage.getItem('pointsData');
    return storedData ? JSON.parse(storedData) : [];
  });

  // 초기 arcsData 설정도 수정
  const [arcsData, setArcsData] = useState(() => {
    const storedData = localStorage.getItem('arcsData');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [cityName, setCityName] = useState('');

  //반응형 관련
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  // console.log(globeContainerRef.current);

  // useEffect(() => {
  //   const { innerWidth, innerHeight } = window;
  //   setDimensions({ width: innerWidth, height: innerHeight });
  // }, []);

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
  // const addCity = async () => {
  //   if (!cityName) {
  //     alert('도시 이름을 입력해주세요.');
  //     return;
  //   }
  //   const coordinates = await fetchCoordinates(cityName);
  //   if (!coordinates) return;

  //   const newPoint = {
  //     ...coordinates,
  //     name: cityName,
  //     color: getRandomColor(),
  //     size: getRandomStarSize(),
  //   };
  //   // setPointsData((prev) => [...prev, newPoint]);
  //   setPointsData((prev) => {
  //     const newPointsData = [...prev, newPoint];
  //     localStorage.setItem('pointsData', JSON.stringify(newPointsData));
  //     return newPointsData;
  //   });

  //   // 이전 여행지와 연결 선 추가
  //   if (pointsData.length > 0) {
  //     const lastPoint = pointsData[pointsData.length - 1];
  //     const newArc = {
  //       startLat: lastPoint.lat,
  //       startLng: lastPoint.lng,
  //       endLat: coordinates.lat,
  //       endLng: coordinates.lng,
  //     };
  //     // setArcsData((prev) => [...prev, newArc]);
  //     setArcsData((prev) => {
  //       const newArcsData = [...prev, newArc];
  //       localStorage.setItem('arcsData', JSON.stringify(newArcsData));
  //       return newArcsData;
  //     });
  //   }

  //   setCityName('');
  // };

  // 페이지 로딩 시 로컬 스토리지에서 데이터 불러오기
  // useEffect(() => {
  //   const storedPointsData = localStorage.getItem('pointsData');
  //   const storedArcsData = localStorage.getItem('arcsData');
  //   if (storedPointsData) {
  //     setPointsData(JSON.parse(storedPointsData));
  //   }
  //   if (storedArcsData) {
  //     setArcsData(JSON.parse(storedArcsData));
  //   }
  // }, []);

  // pointsData, arcsData가 변경될 때마다 로컬 스토리지에 저장
  // 근데 이제 이 코드는 필요없을듯? 화요일날 물어보기기
  useEffect(() => {
    localStorage.setItem('pointsData', JSON.stringify(pointsData));
  }, [pointsData]);

  useEffect(() => {
    localStorage.setItem('arcsData', JSON.stringify(arcsData));
  }, [arcsData]);

  //시간 함수
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // 수정 모달 관련
  const [showModal, setShowModal] = useState(false);

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

  const getRandomColor = () => {
    const colors = [
      '#ff6600',
      '#ff9900',
      '#ffcc00',
      '#66ff33',
      '#33ccff',
      '#cc66ff',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomStarSize = () => {
    const sizes = ['7rem', '9rem', '11rem'];
    return sizes[Math.floor(Math.random() * sizes.length)];
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
          <RefreshButton>
            <PlanetName>{planetName}</PlanetName>
            <EditButton onClick={handleOpenModal}>수정</EditButton>
          </RefreshButton>
          <TimeDisplay>
            <UpdateButton src={updateButton} alt="Update" />
            현재 시각 {getCurrentTime()}
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

  @media (max-width: 768px) {
    font-size: 2.8rem;
    padding: 1.2rem 1.44rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
    padding: 1.7rem 2.04rem;
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
    font-size: 3.4rem;
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
  margin-right: 4rem;
  max-height: 4rem;
  cursor: pointer;
  // object-fit: contain;
`;

export default PlanetPage;
