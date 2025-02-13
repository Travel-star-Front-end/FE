import React, { useState, useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import planetCutyVer from '../../assets/images/planet/planetTexture/planetCutyVer.jpg';
import useFetch from '../../hooks/useFetch';

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

  const markerSvg = `<svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="currentColor" d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265 C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642 c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854 c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72 c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z"></path> </g></svg>`;

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
