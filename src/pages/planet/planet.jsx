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
  getFeelingColor,
  getRandomStarSize,
} from '../../utils/planet/getRandom';
import { markerSvg } from '../../components/planet/MarkerSVG';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/Spinner/Spinner';

const PlanetPage = () => {
  const globeRef = useRef();
  const navigate = useNavigate();
  const globeContainerRef = useRef(null);
  const userId = localStorage.getItem('userId');

  // 사용자 전체 일지 조회
  const { data, loading, error } = useFetch('/posts');
  //사용자 행성 조회
  const {
    data: planetData,
    loading: planetLoading,
    error: planetError,
  } = useFetch(`/planet`);
  const {
    data: nameData,
    loading: nameLoading,
    error: nameError,
  } = useFetch('mypage');
  const nickname = nameData?.data?.nickname || '알 수 없는 사용자';

  // 상태관리------------------------------------------------------------------------
  const [planetName, setPlanetName] = useState('');
  const [tempPlanetName, setTempPlanetName] = useState(planetName); // 수정 중인 행성 이름을 임시로 저장할 state
  //시간 함수
  const [currentTime, setCurrentTime] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [timeZoneId, setTimeZoneId] = useState(null);
  // 수정 모달 관련
  const [showModal, setShowModal] = useState(false);
  const [pointsData, setPointsData] = useState([]);

  //반응형 관련
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // 행성 존재 여부 확인 --------------------------------------------------------------

  useEffect(() => {
    if (planetData && planetData.planet_name) {
      setPlanetName(planetData.planet_name);
    }
  }, [planetData]);

  // 사용자 전체 일지 조회 후 별생성-------------------------------------------------------------------------------
  useEffect(() => {
    const processRegionData = async () => {
      if (!data || loading || error) return;

      setIsProcessing(true);

      let updatedPoints = [];

      if (Array.isArray(data.data)) {
        for (const item of data.data) {
          const region = item.star.region;
          const feelNum = item.feel_color;
          const stars_id = item.id;

          try {
            const coordinates = await fetchCoordinates(region);
            if (coordinates) {
              const newPoint = {
                lat: coordinates.lat,
                lng: coordinates.lng,
                name: region,
                id: stars_id,
                color: getFeelingColor(feelNum),
                size: getRandomStarSize(),
              };
              updatedPoints.push(newPoint);
            }
          } catch (error) {
            console.error(`Error processing region ${region}:`, error);
          }
        }
      }

      setPointsData(updatedPoints);
      // setArcsData(updatedArcs);

      setIsProcessing(false);
    };

    processRegionData();
  }, [data]);

  useEffect(() => {
    const updateView = () => {
      if (globeContainerRef.current) {
        const { offsetWidth, offsetHeight } = globeContainerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }

      if (globeRef.current) {
        const minWidth = 300; // 최소 화면 너비
        const maxWidth = 1200; // 최대 화면 너비
        const minAltitude = 2.5; // 최소 altitude
        const maxAltitude = 6; // 최대 altitude

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

    updateView();

    window.addEventListener('resize', updateView);

    return () => {
      window.removeEventListener('resize', updateView);
    };
  }, []);

  //지구본 자동 회전 기능
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.2;
    }
  }, []);

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

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('사용자 ID를 찾을 수 없습니다.');
      return;
    }

    const success = await patchPlanetName(userId, tempPlanetName);
    if (success) {
      setPlanetName(tempPlanetName);
      alert('행성 이름이 성공적으로 변경되었습니다.');
      setShowModal(false);
      window.location.reload();
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

  console.log(pointsData);

  return (
    <>
      <GlobeWrapper>
        {isProcessing && <Spinner />}

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
            htmlElementsData={pointsData}
            htmlLat={(d) => d.lat}
            htmlLng={(d) => d.lng}
            htmlAltitude={0.01}
            htmlElement={(d) => {
              const el = document.createElement('div');
              el.innerHTML = markerSvg;
              el.style.cursor = 'pointer';
              el.style.pointerEvents = 'auto';

              const tooltip = document.createElement('div');
              tooltip.className = 'tooltip';
              tooltip.innerText = d.name;
              tooltip.style.position = 'absolute';
              tooltip.style.backgroundColor = 'rgb(100, 116, 110)';
              tooltip.style.color = '#fff';
              tooltip.style.padding = '5px';
              tooltip.style.borderRadius = '5px';
              tooltip.style.display = 'none';

              document.body.appendChild(tooltip);

              el.onmouseover = () => {
                tooltip.style.display = 'block';
              };
              el.onmousemove = (event) => {
                tooltip.style.left = `${event.pageX + 10}px`;
                tooltip.style.top = `${event.pageY + 10}px`;
              };
              el.onmouseleave = () => {
                tooltip.style.display = 'none';
              };
              el.onclick = () => {
                tooltip.style.display = 'none';
                navigate(`/posts/${d.id}`, {
                  state: {
                    postId: d.id,
                    postUserId: userId,
                    nickname: nickname,
                  },
                });
              };

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
  overflow: hidden;
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

  @media (max-width: 290px) {
    font-size: 2vw;
    padding: 1.2vw 1.7vw;
    margin-left: 8vw;
    font-size: 1.6vw;
    gap: 0.45vw;
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
  @media (max-width: 300px) {
    font-size: 1.8vw;
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
  @media (max-width: 300px) {
    font-size: 1.67vw;
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
  @media (max-width: 300px) {
    font-size: 1.67vw;
    margin-left: 0.22vw;
  }
`;

export default PlanetPage;
