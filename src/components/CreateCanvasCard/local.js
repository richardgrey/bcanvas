import { CANVAS_TYPE_BUSINESS, CANVAS_TYPE_LEAN, CANVAS_TYPE_VALUE } from '../../constants';

export default {
  [CANVAS_TYPE_BUSINESS]: {
    title: 'Business Model Canvas',
    description: `
      Deconstruct your business idea into logical components allowing you to design, describe, invent 
      and pivot your business model.
    `,
    // description: `
    //   The Business Model Canvas is a strategic management and entrepreneurial tool. It allows
    //   you to describe, design, challenge, invent, and pivot your business model.
    // `,
  },
  [CANVAS_TYPE_VALUE]: {
    title: 'Value Proposition Canvas',
    description: `
      Helps you to understand the needs of your customers, their pain and gains and design products 
      or services customers want to buy.
    `,
    // description: `
    //   The Value Proposition Canvas helps you tackle the core challenges of every business —
    //   creating compelling products and services customers want to buy.
    // `,
  },
  [CANVAS_TYPE_LEAN]: {
    title: 'Lean Canvas',
    description: `
      Visualises your business idea deconstructing your idea into its key assumptions allowing you 
      to invent disruptive business models.
    `,
    // description: `
    //   Lean Canvas is a 1-page business plan template that helps you deconstruct your idea into
    //   its key assumptions. It’s adapted Business Model Canvas and optimized for Lean Startups.
    // `,
  },
};
