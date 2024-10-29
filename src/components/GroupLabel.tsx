import React from 'react';
import './GroupLabel.css';
import { iGroupLabelProps } from '../schemas/PropInterfaces';

const GroupLabel: React.FC<iGroupLabelProps> = ({ data, wide, hover }) => {
  const handleHoverOver = () => hover(data.groupNumber)
  const handleHoverLeave = () => hover(0);

  const renderContainerClasses = () => {
    const baseClasses = `element absolute text-center p-1 pt-2 hover:text-blue-600`;
    if (wide) {
      const wideLeftPos = data.groupNumber <= 2 ? data.groupNumber : data.groupNumber + 14;
      return `${baseClasses} ew-top-${data.yposition} ew-left-${wideLeftPos}`;
    }
    return `${baseClasses} e-top-${data.yposition} e-left-${data.groupNumber} 2xl:pt-4`;
  }

  const renderGroupNumberClasses = () => {
    const baseClasses = "text-md md:text-base group-number block";
    return wide ? baseClasses : `${baseClasses} lg:text-xl xl:text-2xl 2xl:text-3xl`;
  }

  const renderTitle = () => {
    return wide ? [] : [<span className='hidden md:text-xs lg:text-sm md:block xl:text-lg 2xl:text-2xl group-roman-numeral'>{ data.title }</span>];
  }

  return (
    <div
      className={renderContainerClasses()}
      onMouseOver={() => handleHoverOver()}
      onMouseOut={() => handleHoverLeave()}
    >
      <a href={`https://www.wikipedia.com/wiki/Group_${data.groupNumber}_element`} target="_blank">
        <span className={renderGroupNumberClasses()}>{data.groupNumber}</span>
        { renderTitle() }
      </a>

    </div>
  );
};

export default GroupLabel;