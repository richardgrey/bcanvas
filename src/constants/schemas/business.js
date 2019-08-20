export default {
  name: 'Business Model',
  icon: '/img/canvas/business-model.svg',
  schema: [
    {
      label: 'partners',
      number: 2,
      title: 'Key Partners',
      description: [
        'Who are your key partners/suppliers?',
        'What are the motivations for the partnerships?',
        'Which Key Activities do your partners perform?',
      ],
    },
    {
      label: 'activities',
      number: 3,
      title: 'Key Activities',
      description: [
        'What are the activities you perform every day to create & deliver your value proposition?',
      ],
    },
    {
      label: 'resources',
      number: 7,
      title: 'Key Resources',
      description: ['What are the resources you need to create & deliver your Value Proposition?'],
    },
    {
      label: 'proposition',
      number: 5,
      title: 'Value Proposition',
      description: [
        'What is the value you deliver to your customer?',
        'Which of your customer’s problems are you helping to solve?',
        'What is the customer need that your value proposition addresses?',
        // 'What is your promise to your customers?',
        'What are the products and services you create for your customers?',
      ],
    },
    {
      label: 'relationships',
      number: 8,
      title: 'Customer Relationships',
      description: [
        'What relationship does each customer segment expect you to establish and maintain?',
      ],
    },
    {
      label: 'channels',
      number: 6,
      title: 'Channels',
      description: [
        'How does your value proposition reach your customer?',
        'Where can your customer buy or use your products or services?',
      ],
    },
    {
      label: 'customers',
      number: 1,
      title: 'Customer Segments',
      description: [
        'For whom are you creating value?',
        'What are the customer segments that either pay, receive or decide on your value proposition?',
      ],
    },
    {
      label: 'cost',
      number: 9,
      title: 'Cost Structure',
      description: [
        'What are the important costs you make to create & delivery your value proposition?',
      ],
    },
    {
      label: 'revenue',
      number: 4,
      title: 'Revenue Streams',
      description: [
        'How do customers reward you for the value you provide to them?',
        'What are the different revenue models?',
      ],
    },
  ],
};
