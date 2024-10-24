import React from 'react';
import './GroupLabel.css';

interface iGroupLabelProps {
  data: {
    title: string;
    groupNumber: number;
    yposition: number;
  };
  hover: (groupHover: number) => void;
}

const GroupLabel: React.FC<iGroupLabelProps> = ({ data, hover }) => {
  const className = "element absolute text-center p-1 pt-2 hover:text-blue-600";
  const handleHoverOver = () => hover(data.groupNumber)
  const handleHoverLeave = () => hover(0);

  return (
    <div
      className={className + ` e-top-${data.yposition} e-left-${data.groupNumber} 2xl:pt-4`}
      onMouseOver={() => handleHoverOver()}
      onMouseOut={() => handleHoverLeave()}
    >
      <a href={`https://www.wikipedia.com/wiki/Group_${data.groupNumber}_element`} target="_blank">
        <span className='text-md md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl group-number block'>{data.groupNumber}</span>
        <span className='hidden md:text-xs lg:text-sm md:block xl:text-lg 2xl:text-2xl group-roman-numeral'>{data.title}</span>
      </a>

    </div>
  );
};

export default GroupLabel;