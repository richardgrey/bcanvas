import React from 'react';
import ItemsList from '../ItemsList/ItemsList';

const samples = [
  {
    id: 'slack',
    title: 'Slack Business Model',
    type: 'business',
    isOwner: false,
  },
  {
    id: 'slack2',
    title: 'Slack Business Model',
    type: 'lean',
    isOwner: false,
  },
  {
    id: 'slack3',
    title: 'Slack Business Model',
    type: 'value',
    isOwner: false,
  },
  {
    id: 'slack4',
    title: 'Slack Business Model',
    type: 'business',
    isOwner: false,
  },
];

const SamplesList = () => <ItemsList canvases={samples} dispatch={() => {}} />;

export default SamplesList;
