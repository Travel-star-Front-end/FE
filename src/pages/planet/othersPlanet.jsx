import React, { useState, useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import planetCutyVer from '../../assets/images/planet/planetTexture/planetCutyVer.jpg';
import useFetch from '../../hooks/useFetch';
import { fetchCoordinates } from '../../utils/planet/getRandom';
import { markerSvg } from '../../components/planet/MarkerSVG';
import { getFeelingColor } from '../../utils/planet/getRandom';
import Spinner from '../../components/Spinner/Spinner';

const OthersPlanet = () => {
  const { id } = useParams();
  const globeRef = useRef();
  const globeContainerRef = useRef(null);
  const [planetData, setPlanetData] = useState({
    planetName: '', //이거 사실 필요한지 모르겠음.. 차피 id 값이 행성 이름으로 나올거라
    pointsData: [],
  });
  //반응형 관련
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // 로그인된 사용자 행성 조회
  const userId = localStorage.getItem('userId');

  // 별자리 지역 조회
  const { data, loading, error } = useFetch(`/stars/${id}/regions`);

  // 다른 사용자 행성 조회
  const {
    data: planetNameData,
    isloading,
    iserror,
  } = useFetch(`/planets/${userId}`);
  const planetName = planetNameData?.data?.planet_name || '행성 조회 실패';

  useEffect(() => {
    if (!data || loading || error) return;

    setIsProcessing(true);

    const loadPointsData = async () => {
      const pointsDataPromises = data.regions.map(async (region) => {
        const coordinates = await fetchCoordinates(region.region); // 'region' 필드 사용

        if (coordinates) {
          return {
            lat: coordinates.lat,
            lng: coordinates.lng,
            name: region.region,
            color: getFeelingColor(region.feel_color),
            size: '9rem',
          };
        }

        return null;
      });

      const resolvedPointsData = (await Promise.all(pointsDataPromises)).filter(
        (point) => point !== null
      );

      setPlanetData({ planetName, pointsData: resolvedPointsData });

      setIsProcessing(false);
    };

    loadPointsData();
  }, [data, loading, error, id]);

  //반응형 관련 altitude 동적으로 조절
  useEffect(() => {
    const minWidth = 300; // 최소 화면 너비
    const maxWidth = 1200; // 최대 화면 너비
    const minAltitude = 2.5; // 최소 altitude 값
    const maxAltitude = 6; // 최대 altitude 값

    const updateGlobeView = () => {
      if (globeRef.current) {
        const { innerWidth } = window;

        // 화면 너비에 따라 altitude를 선형적으로 계산
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
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.2;
    }
  }, []);

  const htmlElementsData = planetData.pointsData.map((point) => ({
    lat: point.lat,
    lng: point.lng,
    altitude: 0.1,
    name: point.name,
  }));

  return (
    <>
      {isProcessing && <Spinner />}

      <GlobeWrapper>
        <TopBar>
          <RefreshButton>{planetName} 행성</RefreshButton>
        </TopBar>
        <GlobeContainer ref={globeContainerRef}>
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            // globeImageUrl={planetCutyVer}
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            backgroundColor="rgba(0,0,0,0)"
            htmlElementsData={planetData.pointsData}
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

              el.onmouseover = (event) => {
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
                navigate(`/posts/${d.id}`);
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
    font-size: 3rem;
    padding: 1.2rem 1.44rem;
  }

  @media (max-width: 480px) {
    font-size: 3vw;
    padding: 1.2vw 1.67vw;
  }
`;

export default OthersPlanet;
