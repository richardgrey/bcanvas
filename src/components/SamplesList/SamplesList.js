import React from 'react';
import ItemsList from '../ItemsList/ItemsList';

const samples = [
  {
    id: 'netflix',
    title: 'Netflix Business Model',
    type: 'business',
    isOwner: false,
  },
  {
    id: 'uber',
    title: 'Uber Lean Canvas',
    type: 'lean',
    isOwner: false,
  },
  {
    id: 'slack3',
    title: 'V',
    type: 'value',
    isOwner: false,
  },
  {
    id: 'amazon',
    title: 'Amazon Business Model',
    type: 'business',
    isOwner: false,
  },
];

const SamplesList = () => <ItemsList canvases={samples} dispatch={() => {}} />;

export default SamplesList;
