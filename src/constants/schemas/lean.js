export default {
  name: 'Lean Canvas',
  icon: '/img/canvas/canvas-lean.svg',
  schema: [
    {
      label: 'problems',
      number: 2,
      title: 'Problems',
      description: ['List top 3 problems of your customers.'],
    },
    {
      label: 'alternatives',
      number: null,
      title: 'Existing Alternatives',
      description: ['List how these problems are solved today'],
    },
    {
      label: 'solutions',
      number: 3,
      title: 'Solutions',
      description: ['Outline possible solution for each problem.'],
    },
    {
      label: 'metrics',
      number: 7,
      title: 'Key Metrics',
      description: ['List the key numbers that tell you how your business is doing.'],
    },
    {
      label: 'proposition',
      number: 5,
      title: 'Unique Value Proposition',
      description: [
        'Single, clear, compelling message that states why you are different and worth paying attention.',
      ],
    },
    {
      label: 'concept',
      number: null,
      title: 'High-Level Concept',
      description: ['List your X for Y analogy (e.g. YouTube = Flickr for videos)'],
    },
    {
      label: 'advantage',
      number: 8,
      title: 'Unfair Advantage',
      description: ['Something that can not easily be bought or copied'],
    },
    {
      label: 'channels',
      number: 6,
      title: 'Channels',
      description: ['List your path to customers inbound and outbound.'],
    },
    {
      label: 'customers',
      number: 1,
      title: 'Customer Segments',
      description: ['List your target customers and users'],
    },
    {
      label: 'adopters',
      number: null,
      title: 'Early Adopters',
      description: ['List the characteristics of your ideal customers'],
    },
    {
      label: 'cost',
      number: 9,
      title: 'Cost structure',
      description: ['List your fixed and variable costs'],
    },
    {
      label: 'revenue',
      number: 4,
      title: 'Revenue Streams',
      description: ['List your sources of revenue'],
    },
  ],
};
