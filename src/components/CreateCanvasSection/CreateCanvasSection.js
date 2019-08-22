import React from 'react';
import NewCanvasCard from '../CreateCanvasCard/CreateCanvasCard';
import { CANVAS_TYPE_BUSINESS, CANVAS_TYPE_VALUE, CANVAS_TYPE_LEAN } from '../../constants';
import './CreateCanvasSection.scss';


const CreateCanvasSection = () => (
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

export default CreateCanvasSection;
