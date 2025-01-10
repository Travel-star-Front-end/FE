// src/components/CommonGlobe.jsx
import React, { forwardRef, useEffect } from 'react';
import Globe from 'react-globe.gl';

const GlobeComponent = forwardRef(
  (
    {
      width,
      height,
      arcsData = [],
      pointsData = [],
      autoRotate = true,
      autoRotateSpeed = 0.5,
      pointLabel = 'name',
      arcStartLat = 'startLat',
      arcStartLng = 'startLng',
      arcEndLat = 'endLat',
      arcEndLng = 'endLng',
      arcColor = () => ['#ff9900', '#ff6600'],
      arcDashLength = 1,
      arcDashGap = 0,
      arcDashAnimateTime = 0,
      pointOfView = null,
      onGlobeReady = () => {},
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (ref.current) {
        ref.current.controls().autoRotate = autoRotate;
        ref.current.controls().autoRotateSpeed = autoRotateSpeed;
      }
    }, [autoRotate, autoRotateSpeed, ref]);

    useEffect(() => {
      if (pointOfView && ref.current) {
        ref.current.pointOfView(pointOfView, 1000);
      }
    }, [pointOfView, ref]);

    return (
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="rgba(0,0,0,0)"
        ref={ref}
        width={width}
        height={height}
        arcsData={arcsData}
        pointsData={pointsData}
        arcStartLat={arcStartLat}
        arcStartLng={arcStartLng}
        arcEndLat={arcEndLat}
        arcEndLng={arcEndLng}
        arcColor={arcColor}
        arcDashLength={arcDashLength}
        arcDashGap={arcDashGap}
        arcDashAnimateTime={arcDashAnimateTime}
        pointLabel={pointLabel}
        {...props}
      />
    );
  }
);

export default GlobeComponent;
