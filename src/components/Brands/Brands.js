import React from 'react';
import './Brands.scss';

const pics = [
  { name: 'Microsoft', img: require('./img/microsoft-logo.svg'), width: '161px', height: '35px' },
  { name: 'SAP', img: require('./img/sap-logo.svg'), width: '69px', height: '35px' },
  { name: 'Mastercard', img: require('./img/mastercard-logo.svg'), width: '55px', height: '35px' },
  { name: 'Intel', img: require('./img/intel-logo.svg'), width: '53px', height: '35px' },
  { name: 'Gore', img: require('./img/gore-logo.svg'), width: '79px', height: '35px' },
  { name: 'Medtronic', img:require('./img/medtronic-logo.svg'), width: '131px', height: '35px' },
  { name: 'GE', img: require('./img/ge-logo.svg'), width: '50px', height: '50px' },
  { name: '3M', img: require('./img/3m-logo.svg'), width: '67px', height: '35px' },
  { name: 'IMD', img: require('./img/imd-logo.svg'), width: '52px', height: '35px' },
  { name: 'Fujitsu', img: require('./img/fujitsu-logo.svg'), width: '71px', height: '35px' },
];

const Brands = () => (
  <div className="brands">
    {pics.map(pic => (
      <div className="brands__item" key={pic.name}>
        <img alt={pic.name} src={pic.img} width={pic.width} height={pic.height} />
      </div>
    ))}
  </div>
);

export default Brands;
