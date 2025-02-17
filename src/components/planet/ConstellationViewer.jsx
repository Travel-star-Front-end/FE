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

    // 배경색 설정
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const initialLat = pointsData[0]?.lat || 0;
    const initialLng = pointsData[0]?.lng || 0;

    let maxDistance = 0;

    // 최대 거리 계산
    pointsData.forEach((point) => {
      const dx = point.lng - initialLng;
      const dy = point.lat - initialLat;
      const distance = Math.sqrt(dx * dx + dy * dy);
      maxDistance = Math.max(maxDistance, distance);
    });

    const scale = radius / (maxDistance || 1);

    // 위치 조정
    const adjustedPointsData = adjustPointPositions(
      pointsData.map((point, index) => ({ ...point, id: index })),
      scale,
      canvas.width,
      canvas.height,
      initialLng,
      initialLat
    );

    // 별들을 MST로 연결
    const edges = calculateEdges(adjustedPointsData);
    const mstEdges = kruskalMST(edges, adjustedPointsData.length);

    // 선 그리기
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;

    mstEdges.forEach(([startIdx, endIdx]) => {
      const startPoint = adjustedPointsData[startIdx];
      const endPoint = adjustedPointsData[endIdx];

      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
    });

    // 별 그리기
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

  // 두 점 간의 거리 계산 함수
  const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  };

  // 모든 점들 간의 거리 계산하여 간선 리스트 생성
  const calculateEdges = (points) => {
    const edges = [];

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        edges.push([i, j, calculateDistance(points[i], points[j])]);
      }
    }

    return edges.sort((a, b) => a[2] - b[2]); // 거리 기준으로 정렬
  };

  // Kruskal 알고리즘으로 MST 생성
  const kruskalMST = (edges, numPoints) => {
    const parent = Array(numPoints)
      .fill(0)
      .map((_, idx) => idx);

    // Find 함수: 루트를 찾음
    const findRoot = (node) => {
      if (parent[node] !== node) parent[node] = findRoot(parent[node]);
      return parent[node];
    };

    // Union 함수: 두 트리를 합침
    const unionNodes = (node1, node2) => {
      const root1 = findRoot(node1);
      const root2 = findRoot(node2);

      if (root1 !== root2) parent[root2] = root1;
    };

    const mstEdges = [];

    for (const [startIdx, endIdx, _] of edges) {
      if (findRoot(startIdx) !== findRoot(endIdx)) {
        unionNodes(startIdx, endIdx);
        mstEdges.push([startIdx, endIdx]);

        if (mstEdges.length === numPoints - 1) break; // MST 완성 시 종료
      }
    }

    return mstEdges;
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
