import { CANVAS_TYPE_BUSINESS, CANVAS_TYPE_LEAN, CANVAS_TYPE_VALUE } from '../../constants';

export default {
  [CANVAS_TYPE_BUSINESS]: {
    title: 'Business Model Canvas',
    description: `
      Using this canvas, you can design, describe, challenge and pivot your business model using 
      nine logical blocks every business consists of.
    `,
  },
  [CANVAS_TYPE_VALUE]: {
    title: 'Value Proposition Canvas',
    description: `
      Helps you to understand the needs of your customers, their pain and gains and design products 
      or services customers want to buy.
    `,
  },
  [CANVAS_TYPE_LEAN]: {
    title: 'Lean Canvas',
    description: `
      This version of Business Model Canvas is specifically adopted for Lean Startup methodology with 
      its "Build — Measure — Learn" life cycle in mind.
    `,
  },
};
