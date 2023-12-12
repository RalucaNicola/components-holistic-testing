import * as styles from './TimeSlider.module.css';
import TimeInfo from '@arcgis/core/layers/support/TimeInfo';
import { ArcgisTimeSlider } from '@arcgis/map-components-react';
import { useEffect, useState } from 'react';

interface Props {
  view?: __esri.MapView;
}

const MapTimeSlider = ({ view }: Props) => {
  const [timeInfo, setTimeInfo] = useState<TimeInfo>(null);

  useEffect(() => {
    if (view) {
      const timeLayer = view.map.layers
        .filter((l) => l.title === 'Crash data 2023')
        .getItemAt(0) as __esri.FeatureLayer;
      timeLayer.when(() => {
        setTimeInfo(timeLayer.timeInfo);
      });
    }
  }, [view]);
  return (
    <div className={styles.timeSlider}>
      {timeInfo && <ArcgisTimeSlider view={view} fullTimeExtent={timeInfo.fullTimeExtent}></ArcgisTimeSlider>}
    </div>
  );
};

export default MapTimeSlider;
