import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import { setMapCenterToHashParams } from "../../utils/URLHashParams";
import Graphic from "@arcgis/core/Graphic";
import { AppDispatch } from "../../store/storeConfiguration";
import { getView } from "./view";
import MapView from "@arcgis/core/views/MapView";

interface GraphicHit {
    graphic: Graphic;
}

const listeners: IHandle[] = [];
export const initializeViewEventListeners = (view: MapView) => (dispatch: AppDispatch) => {
    if (view) {
        const listener = reactiveUtils.when(
            () => view.stationary,
            () => {
                const lon = +view.center.longitude.toFixed(3);
                const lat = +view.center.latitude.toFixed(3);
                const zoom = view.zoom;
                setMapCenterToHashParams({ lon, lat }, zoom);
            }
        );

        listeners.push(listener);
    }
}

export const removeEventListeners = () => {
    listeners.forEach(listener => listener.remove());
}

