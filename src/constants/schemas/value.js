export default {
  name: 'Value Proposition',
  icon: '/img/canvas/canvas-value.svg',
  schema: [
    {
      label: 'benefits',
      number: 5,
      title: 'Benefits',
      description: ['What your product/service do?'],
    },
    {
      label: 'features',
      number: 6,
      title: 'Features',
      description: ['How does your product/service work?'],
    },
    {
      label: 'experience',
      number: 7,
      title: 'Experience',
      description: ['What does it feel like to use your product/service?'],
    },
    {
      label: 'wants',
      number: 3,
      title: 'Wants',
      description: ['What are the emotional drivers of purchasing?'],
    },
    {
      label: 'needs',
      number: 2,
      title: 'Needs',
      description: ['What are the hidden needs?', 'What are the rational drivers of purchasing?'],
    },
    {
      label: 'fears',
      number: 1,
      title: 'Fears',
      description: ['Risks of switching to your product?'],
    },
    {
      label: 'substitutes',
      number: 4,
      title: 'Substitutes',
      description: ['What do people currently do instead?'],
    },
    {
      label: 'proposition',
      number: 9,
      title: 'Value Proposition',
      description: [
        'Describe your value proposition. Format:',
        'We help [X] to [Y] by [Z]',
      ],
    },
    {
      label: 'segment',
      number: 8,
      title: 'Customer Segment',
      description: [
        'For whom are you creating value?',
        'Describe you customer his role at work and life.',
      ],
    },
  ],
};
