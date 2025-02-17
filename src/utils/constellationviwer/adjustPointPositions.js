// utils/adjustPointPositions.js
export const adjustPointPositions = (
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
