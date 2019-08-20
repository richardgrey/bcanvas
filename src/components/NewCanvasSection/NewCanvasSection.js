import React from 'react';
import NewCanvasCard from '../NewCanvasCard/NewCanvasCard';
import './NewCanvasSection.scss';

import {
  CANVAS_TYPE_BUSINESS,
  CANVAS_TYPE_VALUE,
  CANVAS_TYPE_LEAN,
} from '../../constants';

const NewCanvasSection = () => (
  <div className="new-canvas-section">
    <div className="new-canvas-section__col">
      <NewCanvasCard type={CANVAS_TYPE_BUSINESS} withDescription />
    </div>
    <div className="new-canvas-section__col">
      <NewCanvasCard type={CANVAS_TYPE_VALUE} withDescription />
    </div>
    <div className="new-canvas-section__col">
      <NewCanvasCard type={CANVAS_TYPE_LEAN} withDescription />
    </div>
  </div>
);

export default NewCanvasSection;
