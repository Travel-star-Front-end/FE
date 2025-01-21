import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ConstellationViewer = ({ pointsData, arcsData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 400;
    canvas.height = 400;
    const radius = canvas.width / 2 - 20;

    // 배경경
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 서울의 위경도를 기준점으로 설정
    const seoulLat = 37.5665;
    const seoulLng = 126.978;

    // 모든 점들의 최대 거리 계산
    let maxDistance = 0;
    pointsData.forEach((point) => {
      const dx = point.lng - seoulLng;
      const dy = point.lat - seoulLat;
      const distance = Math.sqrt(dx * dx + dy * dy);
      maxDistance = Math.max(maxDistance, distance);
    });

    const scale = radius / (maxDistance || 1);

    // 연결선
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    arcsData.forEach((arc) => {
      const startX = canvas.width / 2 + (arc.startLng - seoulLng) * scale;
      const startY = canvas.height / 2 + (seoulLat - arc.startLat) * scale;
      const endX = canvas.width / 2 + (arc.endLng - seoulLng) * scale;
      const endY = canvas.height / 2 + (seoulLat - arc.endLat) * scale;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    });

    // 별 그리기
    pointsData.forEach((point) => {
      const dx = (point.lng - seoulLng) * scale;
      const dy = (seoulLat - point.lat) * scale;

      const x = canvas.width / 2 + dx;
      const y = canvas.height / 2 + dy;

      let outerRadius;
      if (point.size === '7rem') {
        outerRadius = 11;
      } else if (point.size === '9rem') {
        outerRadius = 14;
      } else if (point.size === '11rem') {
        outerRadius = 17;
      } else {
        outerRadius = 10;
      }

      ctx.fillStyle = point.color;
      drawStar(ctx, x, y, outerRadius);
    });
  }, [pointsData, arcsData]);

  // 별 그리기 함수
  const drawStar = (ctx, x, y, outerRadius) => {
    const spikes = 5;

    const innerRadius = outerRadius / 2;

    let rot = (Math.PI / 2) * 3;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(x, y - outerRadius);

    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(
        x + Math.cos(rot) * outerRadius,
        y + Math.sin(rot) * outerRadius
      );
      rot += step;
      ctx.lineTo(
        x + Math.cos(rot) * innerRadius,
        y + Math.sin(rot) * innerRadius
      );
      rot += step;
    }

    ctx.closePath();
    ctx.fill();
  };

  return (
    <ViewerContainer>
      <Canvas ref={canvasRef} />
    </ViewerContainer>
  );
};

const ViewerContainer = styled.div`
  width: 16.1vw;
  height: 16.1vw;
  border-radius: 50%;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: black;
`;

export default ConstellationViewer;
