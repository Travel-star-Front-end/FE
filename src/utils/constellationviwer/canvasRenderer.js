import { adjustPointPositions } from '../constellationviwer/adjustPointPositions';
import { kruskalMST, calculateEdges } from '../constellationviwer/mstUtils';

export const renderCanvas = (canvasRef, pointsData) => {
  if (!pointsData || pointsData.length === 0) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');

  // 캔버스 초기화
  canvas.width = 400;
  canvas.height = 400;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 초기 위치 계산
  const initialLat = pointsData[0]?.lat || 0;
  const initialLng = pointsData[0]?.lng || 0;

  // 스케일 및 위치 조정
  let maxDistance = Math.max(
    ...pointsData.map((point) =>
      Math.sqrt(
        Math.pow(point.lng - initialLng, 2) +
          Math.pow(point.lat - initialLat, 2)
      )
    )
  );

  const radius = canvas.width / 2 - 20;
  const scale = radius / (maxDistance || 1);

  const adjustedPointsData = adjustPointPositions(
    pointsData.map((point, index) => ({ ...point, id: index })),
    scale,
    canvas.width,
    canvas.height,
    initialLng,
    initialLat
  );

  // MST 계산 및 그리기
  const edges = calculateEdges(adjustedPointsData);
  const mstEdges = kruskalMST(edges, adjustedPointsData.length);

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;

  mstEdges.forEach(([startIdx, endIdx]) => {
    const startPoint = adjustedPointsData[startIdx];
    const endPoint = adjustedPointsData[endIdx];
    if (!startPoint || !endPoint) return;

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
};

export const drawStar = (ctx, x, y, outerRadius) => {
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
