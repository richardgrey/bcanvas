export default [
  {
    key: 'business',
    icon: 'segment',
    tab: 'Business Model Canvas',
    img: {
      src: require('./img/business-model.jpg'),
      sources: [
        {
          srcSet: `${require('./img/business-model.jpg')}, ${require('./img/business-model@2x.jpg')} 2x`,
          media: '(min-width: 1024px)',
        },
        {
          srcSet: `${require('./img/business-model-tablet.jpg')}, ${require('./img/business-model-tablet@2x.jpg')} 2x`,
          media: '(min-width: 768px)',
        },
        {
          srcSet: `${require('./img/business-model-mobile.jpg')}, ${require('./img/business-model-mobile@2x.jpg')} 2x`,
        },
      ],
    },
  },
  {
    key: 'value',
    icon: 'gift',
    tab: 'Value Proposition Canvas',
    img: {
      src: require('./img/value-proposition.jpg'),
      sources: [
        {
          srcSet: `${require('./img/value-proposition.jpg')}, ${require('./img/value-proposition@2x.jpg')} 2x`,
          media: '(min-width: 1024px)',
        },
        {
          srcSet: `${require('./img/value-proposition-tablet.jpg')}, ${require('./img/value-proposition-tablet@2x.jpg')} 2x`,
          media: '(min-width: 768px)',
        },
        {
          srcSet: `${require('./img/value-proposition-mobile.jpg')}, ${require('./img/value-proposition-mobile@2x.jpg')} 2x`,
        },
      ],
    },
  },
  {
    key: 'lean',
    icon: 'lean',
    tab: 'Lean Canvas',
    img: {
      src: require('./img/lean-canvas.jpg'),
      sources: [
        {
          srcSet: `${require('./img/lean-canvas.jpg')}, ${require('./img/lean-canvas@2x.jpg')} 2x`,
          media: '(min-width: 1024px)',
        },
        {
          srcSet: `${require('./img/lean-canvas-tablet.jpg')}, ${require('./img/lean-canvas-tablet@2x.jpg')} 2x`,
          media: '(min-width: 768px)',
        },
        {
          srcSet: `${require('./img/lean-canvas-mobile.jpg')}, ${require('./img/lean-canvas-mobile@2x.jpg')} 2x`,
        },
      ],
    },
  },
];
