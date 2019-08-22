import React from 'react';
import NewCanvasCard from '../CreateCanvasCard/CreateCanvasCard';
import { CANVAS_TYPE_BUSINESS, CANVAS_TYPE_VALUE, CANVAS_TYPE_LEAN } from '../../constants';
import './CreateCanvasSection.scss';

const CreateCanvasSection = props => (
  <div className="create-canvas-section">
    <div className="create-canvas-section__col">
      <NewCanvasCard type={CANVAS_TYPE_BUSINESS} {...props} />
    </div>
    <div className="create-canvas-section__col">
      <NewCanvasCard type={CANVAS_TYPE_VALUE} {...props} />
    </div>
    <div className="create-canvas-section__col">
      <NewCanvasCard type={CANVAS_TYPE_LEAN} {...props} />
    </div>
  </div>
);

export default CreateCanvasSection;
