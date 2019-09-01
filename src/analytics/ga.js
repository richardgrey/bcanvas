import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_GA, { debug: true });

export default ReactGA;
