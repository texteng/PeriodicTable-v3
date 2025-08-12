import React from 'react';
import './PeriodLabel.css';
import { iPeriodLabelProps } from '../schemas/PropInterfaces';

const PeriodLabel: React.FC<iPeriodLabelProps> = React.memo(({ data, hover, wide }) => {
  const handleHoverOver = () => hover(data.periodNumber);
  const handleHoverLeave = () => hover(0);

  const renderContainerClasses = () => {
    const baseClasses = 'align-middle element absolute text-center hover:text-blue-600 px-2 py-2';
    return wide ?
      `${baseClasses} ew-top-${data.periodNumber} ew-left-0` :
      `${baseClasses} md:py-3 md:pl-4 lg:py-5 xl:py-6 2xl:py-8 e-left-0 e-top-${data.periodNumber}`
  }

  const renderPeriodClasses = () => {
    const baseClasses = 'block text-md';
    return wide ? 
      baseClasses :
      `${baseClasses} md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl` ; 
  }

  return (
    <div
      className={renderContainerClasses()}
      onMouseOver={() => handleHoverOver()}
      onMouseOut={() => handleHoverLeave()}
    >
      <a href={`https://www.wikipedia.com/wiki/Period_${data.periodNumber}_element`} target="_blank">
        <span className={renderPeriodClasses()}>{data.periodNumber}</span>
      </a>
    </div>
  );
});

export default PeriodLabel;