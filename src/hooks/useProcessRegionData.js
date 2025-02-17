import { useEffect, useState } from 'react';
import {
  fetchCoordinates,
  getRandomColor,
  getRandomStarSize,
} from '../utils/planet/getRandom';

const useProcessRegionData = (data, loading, error) => {
  const [pointsData, setPointsData] = useState([]);

  useEffect(() => {
    const processRegionData = async () => {
      if (!data || loading || error) return;

      try {
        const updatedPoints = await Promise.all(
          data.data.map(async (item) => {
            const region = item.star.region;
            const coordinates = await fetchCoordinates(region);
            return {
              lat: coordinates.lat,
              lng: coordinates.lng,
              name: region,
              color: getRandomColor(),
              size: getRandomStarSize(),
            };
          })
        );
        setPointsData(updatedPoints);
      } catch (err) {
        console.error('Error processing data:', err);
      }
    };

    processRegionData();
  }, [data, loading, error]);

  return pointsData;
};

export default useProcessRegionData;
