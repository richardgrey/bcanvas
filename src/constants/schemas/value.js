export default {
  name: 'Value Proposition',
  icon: '/img/canvas/canvas-value.svg',
  schema: [
    {
      label: 'products',
      number: 5,
      title: 'Products & Services',
      description: [
        'What are the products and services you can offer you customer so they can get their job done?',
      ],
    },
    {
      label: 'gain-creators',
      number: 6,
      title: 'Gain Creators',
      description: [
        'What can you offer you customer to help them achieve their gains?',
        'How do they create benefits your customer expects, desires or would be surprised by?',
        'It could include functional utility, social gains, positive emotions, and cost savings.',
      ],
    },
    {
      label: 'pain-relievers',
      number: 7,
      title: 'Pain Relievers',
      description: [
        'How can you help your customers to relieve their pains?',
        'What problems can you eradicate?',
      ],
    },
    {
      label: 'gains',
      number: 3,
      title: 'Gains',
      description: [
        'What would make your customer happy?',
        'What would make their life and job-to-be-done easier?',
      ],
    },
    {
      label: 'pains',
      number: 2,
      title: 'Pains',
      description: [
        'What is annoying or troubling your customer?',
        'What is preventing them from getting their job done?',
        'Pains can be functional, social, emotional, or ancillary.',
      ],
    },
    {
      label: 'jobs',
      number: 1,
      title: 'Jobs-To-Be-Done',
      description: [
        'What is the job the customer wants to get done in their work or life?',
        'It could be the tasks they are trying to perform and complete, the problems they are trying to solve, or the needs they are trying to satisfy.'
      ],
    },
    {
      label: 'substitution',
      number: 4,
      title: 'Substitution',
      description: ['What your customer are doing now to get their job done?'],
    },
    {
      label: 'proposition',
      number: 9,
      title: 'Value Proposition',
      description: [
        'Describe your value proposition. Format:',
        'Our [product/service] helps [customer segment] who want to [job], by [verb↓] [pain] and [verb↑] [gain]',
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
