import * as styles from './Map.module.css';
import { Children, FC, ReactNode, cloneElement, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { initializeView, destroyView } from '../../services/map/view';
import { initializeViewEventListeners, removeEventListeners } from '../../services/map/eventListeners';
import { ArcgisMap, ArcgisTimeSlider } from '@arcgis/map-components-react';
import { mapConfig } from '../../config';
import { setViewLoaded } from '../../store/loadingSlice';
import { getMapCenterFromHashParams } from '../../utils/URLHashParams';
import MapView from '@arcgis/core/views/MapView';
import TimeSlider from '@arcgis/core/widgets/TimeSlider';
import TimeInfo from '@arcgis/core/layers/support/TimeInfo';

interface Props {
  children?: ReactNode;
  setView: (view: MapView) => void;
}

const Map: FC<Props> = ({ children, setView }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <ArcgisMap
        item-id={mapConfig['web-map-id']}
        onViewReady={(customEvent: any) => {
          const view = customEvent.detail.view;
          setView(view);
          dispatch(setViewLoaded(true));
          const mapCenter = getMapCenterFromHashParams();
          if (mapCenter) {
            view.goTo({ zoom: mapCenter.zoom, center: [mapCenter.center.lon, mapCenter.center.lat] });
          }
          //window.view = view;
          view.padding = {
            top: 80,
            bottom: 0
          };
          view.constraints = {
            minZoom: 1
          };
          view.ui.move('zoom', 'top-right');
          view.popup = {
            dockEnabled: true,
            dockOptions: {
              buttonEnabled: false,
              breakpoint: false
            },
            highlightEnabled: false
          };
          dispatch(initializeViewEventListeners(view));
        }}
      >
        {children}
      </ArcgisMap>
    </>
  );
};

export default Map;
