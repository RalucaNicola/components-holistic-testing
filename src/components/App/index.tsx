import { ArcgisTimeSlider } from '@arcgis/map-components-react';
import { ErrorAlert } from '../ErrorAlert';
import { Identity } from '../Identity';
import InfoModal from '../InfoModal';
import Map from '../Map';
import { useEffect, useRef, useState } from 'react';
import MapTimeSlider from '../MapTimeSlider';
import TopPanel from '../TopPanel';

const App = () => {
  const [view, setView] = useState<__esri.MapView>(null);
  return (
    <>
      <Map setView={setView}></Map>
      <MapTimeSlider view={view}></MapTimeSlider>
      <TopPanel></TopPanel>
      <ErrorAlert></ErrorAlert>

      <InfoModal></InfoModal>
    </>
  );
};

export default App;
