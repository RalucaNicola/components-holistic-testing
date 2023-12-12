import * as styles from './TopPanel.module.css';
import '@esri/calcite-components/dist/components/calcite-action';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-switch';
import { CalciteAction } from '@esri/calcite-components-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setInfoModalOptions } from '../../store/modalSlice';
import { Identity } from '../Identity';

const TopPanel = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.actionsContainer}>
        <div className={styles.leftActionsContainer}>Hello ArcGIS Maps SDK for JavaScript</div>
        <div className={styles.rightActionsContainer}>
          <CalciteAction
            icon='information-f'
            scale='s'
            appearance='transparent'
            text=''
            onClick={() => dispatch(setInfoModalOptions({ visible: true }))}
          ></CalciteAction>
          <Identity></Identity>
        </div>
      </div>
    </div>
  );
};

export default TopPanel;
