import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ConstellationViewer = ({ pointsData }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 400;
    canvas.height = 400;

    const radius = canvas.width / 2 - 20;

    // 배경색
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const initialLat = pointsData[0]?.lat || 0;
    const initialLng = pointsData[0]?.lng || 0;

    let maxDistance = 0;
    pointsData.forEach((point) => {
      const dx = point.lng - initialLng;
      const dy = point.lat - initialLat;
      const distance = Math.sqrt(dx * dx + dy * dy);
      maxDistance = Math.max(maxDistance, distance);
    });

    const scale = radius / (maxDistance || 1);

    const adjustedPointsData = adjustPointPositions(
      pointsData.map((point, index) => ({ ...point, id: index })),
      scale,
      canvas.width,
      canvas.height,
      initialLng,
      initialLat
    );

    const pointsWithDistance = adjustedPointsData.map((point) => {
      const distance = Math.sqrt(
        Math.pow(point.x - canvas.width / 2, 2) +
          Math.pow(point.y - canvas.height / 2, 2)
      );
      return { ...point, distance };
    });

    pointsWithDistance.sort((a, b) => b.distance - a.distance);

    // 리뉴얼한 별자리 생성 로직. 진짜 별자리가 되어버려~
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    for (let i = 0; i < pointsWithDistance.length - 1; i++) {
      const startPoint = pointsWithDistance[i];
      const endPoint = pointsWithDistance[i + 1];

      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
    }

    adjustedPointsData.forEach((point) => {
      ctx.fillStyle = point.color;
      drawStar(ctx, point.x, point.y, point.outerRadius);
    });
  }, [pointsData]);

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

  // 충돌 방지 로직
  const adjustPointPositions = (
    points,
    scale,
    canvasWidth,
    canvasHeight,
    initialLng,
    initialLat
  ) => {
    const adjustedPoints = points.map((point) => {
      const dx = (point.lng - initialLng) * scale;
      const dy = (initialLat - point.lat) * scale;
      const x = canvasWidth / 2 + dx;
      const y = canvasHeight / 2 + dy;
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
      return { ...point, x, y, outerRadius, id: point.id };
    });

    for (let i = 0; i < adjustedPoints.length; i++) {
      for (let j = i + 1; j < adjustedPoints.length; j++) {
        const point1 = adjustedPoints[i];
        const point2 = adjustedPoints[j];
        const distance = Math.sqrt(
          Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
        );
        const minDistance = point1.outerRadius + point2.outerRadius;
        if (distance < minDistance) {
          // 겹치는 경우, point2를 살짝 이동
          const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
          const moveDistance = minDistance - distance;
          point2.x += Math.cos(angle) * moveDistance;
          point2.y += Math.sin(angle) * moveDistance;
        }
      }
    }
    return adjustedPoints;
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
