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
        },
      ],
    },
  },
];
