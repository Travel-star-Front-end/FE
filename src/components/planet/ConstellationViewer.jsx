import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import {
  getRandomColor,
  getRandomStarSize,
  fetchCoordinates,
} from '../../utils/planet/getRandom';
import { drawStar } from '../../utils/constellationviwer/canvasRenderer';

const ConstellationViewer = () => {
  const canvasRef = useRef(null);
  const { data, loading, error } = useFetch('/posts');
  const [pointsData, setPointsData] = useState([]);

  // 데이터 처리
  useEffect(() => {
    const processRegionData = async () => {
      if (!data || loading || error) return;

      try {
        const updatedPoints = [];
        if (Array.isArray(data.data)) {
          for (const item of data.data) {
            const region = item.star.region;
            try {
              const coordinates = await fetchCoordinates(region);
              if (coordinates) {
                updatedPoints.push({
                  lat: coordinates.lat,
                  lng: coordinates.lng,
                  name: region,
                  color: getRandomColor(),
                  size: getRandomStarSize(),
                });
              }
            } catch (error) {
              console.error(`Error processing region ${region}:`, error);
            }
          }
        }
        setPointsData(updatedPoints);
      } catch (error) {
        console.error('Error processing data:', error);
      }
    };

    processRegionData();
  }, [data]);

  // 캔버스 렌더링
  useEffect(() => {
    if (!pointsData || pointsData.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const initialLat = pointsData[0]?.lat || 0;
    const initialLng = pointsData[0]?.lng || 0;
    let maxDistance = 0;

    pointsData.forEach((point) => {
      const dx = point.lng - initialLng;
      const dy = point.lat - initialLat;
      maxDistance = Math.max(maxDistance, Math.sqrt(dx * dx + dy * dy));
    });

    const radius = canvas.width / 2 - 20;
    const scale = radius / (maxDistance || 1);

    // 위치 조정 및 충돌 방지
    const adjustedPointsData = adjustPointPositions(
      pointsData.map((point, index) => ({ ...point, id: index })),
      scale,
      canvas.width,
      canvas.height,
      initialLng,
      initialLat
    );

    // Calculate MST edges
    const edges = calculateEdges(adjustedPointsData);
    console.log('Edges:', edges);
    const mstEdges = kruskalMST(edges, adjustedPointsData.length);
    console.log('MST Edges:', mstEdges);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;

    // Draw MST edges
    mstEdges.forEach(([startIdx, endIdx]) => {
      const startPoint = adjustedPointsData[startIdx];
      const endPoint = adjustedPointsData[endIdx];

      if (!startPoint || !endPoint) {
        console.error(`Invalid edge: startIdx=${startIdx}, endIdx=${endIdx}`);
        return;
      }

      console.log(
        `Drawing line from (${startPoint.x}, ${startPoint.y}) to (${endPoint.x}, ${endPoint.y})`
      );
      ctx.beginPath();
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
    });

    // 별 다시 그리기
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

  const calculateDistance = (point1, point2) => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  };

  const calculateEdges = (points) => {
    const edges = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        edges.push([i, j, calculateDistance(points[i], points[j])]);
      }
    }
    return edges.sort((a, b) => a[2] - b[2]);
  };

  // 충돌 방지 및 위치 조정 함수
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

      if (point.size === '7rem') outerRadius = 11;
      else if (point.size === '9rem') outerRadius = 14;
      else if (point.size === '11rem') outerRadius = 17;
      else outerRadius = 10;

      return { ...point, x, y, outerRadius };
    });

    let collisionDetected = true;
    const maxIterations = 100; // 무한 루프 방지

    for (
      let iteration = 0;
      iteration < maxIterations && collisionDetected;
      iteration++
    ) {
      collisionDetected = false;

      for (let i = 0; i < adjustedPoints.length; i++) {
        for (let j = i + 1; j < adjustedPoints.length; j++) {
          const point1 = adjustedPoints[i];
          const point2 = adjustedPoints[j];

          // 두 점 사이의 거리 계산
          const dx = point2.x - point1.x;
          const dy = point2.y - point1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // 최소 거리 계산
          const minDistance = point1.outerRadius + point2.outerRadius;

          if (distance < minDistance) {
            collisionDetected = true;

            // 점 이동
            const angle = Math.atan2(dy, dx);
            const overlapDistance = (minDistance - distance) / 2;

            point1.x -= Math.cos(angle) * overlapDistance;
            point1.y -= Math.sin(angle) * overlapDistance;

            point2.x += Math.cos(angle) * overlapDistance;
            point2.y += Math.sin(angle) * overlapDistance;

            // 경계 조건 처리
            point1.x = Math.max(
              point1.outerRadius,
              Math.min(canvasWidth - point1.outerRadius, point1.x)
            );
            point1.y = Math.max(
              point1.outerRadius,
              Math.min(canvasHeight - point1.outerRadius, point1.y)
            );

            point2.x = Math.max(
              point2.outerRadius,
              Math.min(canvasWidth - point2.outerRadius, point2.x)
            );
            point2.y = Math.max(
              point2.outerRadius,
              Math.min(canvasHeight - point2.outerRadius, point2.y)
            );
          }
        }
      }
    }

    return adjustedPoints;
  };

  // Kruskal 알고리즘으로 MST 계산
  const kruskalMST = (edges, numPoints) => {
    const parent = Array(numPoints)
      .fill(0)
      .map((_, idx) => idx);

    const findRoot = (node) => {
      if (parent[node] !== node) parent[node] = findRoot(parent[node]);
      return parent[node];
    };

    const unionNodes = (node1, node2) => {
      const root1 = findRoot(node1);
      const root2 = findRoot(node2);
      if (root1 !== root2) parent[root2] = root1;
    };

    const mstEdges = [];
    for (const [startIdx, endIdx] of edges) {
      if (findRoot(startIdx) !== findRoot(endIdx)) {
        unionNodes(startIdx, endIdx);
        mstEdges.push([startIdx, endIdx]);
        if (mstEdges.length === numPoints - 1) break;
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
  width: 16vw;
  height: 16vw;
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
