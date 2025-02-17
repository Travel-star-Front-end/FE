import React, { useState, useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import planetCutyVer from '../../assets/images/planet/planetTexture/planetCutyVer.jpg';
import useFetch from '../../hooks/useFetch';
import { fetchCoordinates } from '../../utils/planet/getRandom';
import { markerSvg } from '../../components/planet/MarkerSVG';

const OthersPlanet = () => {
  const { id } = useParams();
  const globeRef = useRef();
  const globeContainerRef = useRef(null);
  const [planetData, setPlanetData] = useState({
    planetName: '', //이거 사실 필요한지 모르겠음.. 차피 id 값이 행성 이름으로 나올거라
    pointsData: [],
    arcsData: [],
  });

  //반응형 관련
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const { data, loading, error } = useFetch(`/stars/${id}/regions`);

  useEffect(() => {
    if (!data || loading || error) return;

    const loadPointsData = async () => {
      const pointsDataPromises = data.regions.map(async (regionName) => {
        const coordinates = await fetchCoordinates(regionName);
        if (coordinates) {
          return {
            lat: coordinates.lat,
            lng: coordinates.lng,
            name: regionName,
            color: '#ff6600',
            size: '9rem',
          };
        }
        return null;
      });

      const resolvedPointsData = (await Promise.all(pointsDataPromises)).filter(
        (point) => point !== null
      );
      setPlanetData({ planetName: id, pointsData: resolvedPointsData });
    };

    loadPointsData();
  }, [data, loading, error, id]);

  // useEffect(() => {
  //   const { innerWidth, innerHeight } = window;
  //   setDimensions({ width: innerWidth, height: innerHeight });
  // }, []);

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

  // 백엔드 연동 전이라서 임시 데이터 만듬
  // useEffect(() => {
  //   // 일단 임시 데이터
  //   const mockData = {
  //     planetName: '테스트 행성',
  //     pointsData: [
  //       {
  //         lat: 37.5665,
  //         lng: 126.978,
  //         name: '서울',
  //         color: '#ff6600',
  //         size: '9rem',
  //       },
  //       {
  //         lat: 35.6762,
  //         lng: 139.6503,
  //         name: '도쿄',
  //         color: '#33ccff',
  //         size: '7rem',
  //       },
  //     ],
  //   };
  //   setPlanetData(mockData);
  // }, [id]);

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
      <GlobeWrapper>
        <TopBar>
          <RefreshButton>{id} 행성</RefreshButton>
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
            pointsData={planetData.pointsData}
            pointLat="lat"
            pointLng="lng"
            pointAltitude={0.02}
            pointLabel={({ name }) => `<b>${name}</b>`}
            htmlElementsData={planetData.pointsData}
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
    font-size: 3rem;
    padding: 1.2rem 1.44rem;
  }

  @media (max-width: 480px) {
    font-size: 4rem;
    padding: 1.7rem 2.04rem;
  }
`;

export default OthersPlanet;
