import React from 'react';
import './PeriodLabel.css';

export interface iPeriodLabelProps {
  data: { periodNumber: number };
  hover: (periodHover: number) => void;
}

const PeriodLabel: React.FC<iPeriodLabelProps> = ({ data, hover }) => {
  const className = "align-middle element absolute text-center hover:text-blue-600";

  const handleHoverOver = () => hover(data.periodNumber);
  const handleHoverLeave = () => hover(0);

  return (
    <div
      className={className + ` e-top-${data.periodNumber} e-left-0 px-2 py-2 md:py-3 md:pl-4 lg:py-5 xl:py-6 2xl:py-8`}
      onMouseOver={() => handleHoverOver()}
      onMouseOut={() => handleHoverLeave()}
    >
      <a href={ `https://www.wikipedia.com/wiki/Period_${data.periodNumber}_element`} target="_blank">
        <span className='text-md md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl block`'>{data.periodNumber}</span>
      </a>
    </div>
  );
};

export default PeriodLabel;