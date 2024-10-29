import React, { useEffect, useState } from 'react';
import './Legend.css';
import { iLegendProps } from '../schemas/PropInterfaces';
import { LegendData } from '../assets/LegendData';

const Legend: React.FC<iLegendProps> = ({ colorIndex, wide, hover }) => {
  const defaultLegendCategory = { ...LegendData['cpk'] };
  const [legendCategory, setLegendCategory] = useState({ ...defaultLegendCategory  });

  const handleHoverOver = (colorHex: string) => hover(colorHex)
  const handleHoverLeave = () => hover('');

  useEffect(() => {
    setLegendCategory({ ...LegendData[colorIndex] })
  }, [colorIndex]);

  const renderContainer = () => {
    const baseClasses = 'absolute px-2'
    return wide ? `${baseClasses} lw-top lw-left`: `${baseClasses} l-top l-left`;
  }

  const renderTitleClasses = () => {
    const baseClasses = 'block text-base';
    return wide ? baseClasses : `${baseClasses} md:text-xl`
  }

  const renderFieldsClasses = () => {
    const baseClasses = 'flex flex-col gap-0 flex-wrap';
    return wide ? `${baseClasses} lw-height` : `${baseClasses} l-height`;
  }

  const renderFieldClasses = () => {
    return wide ? 'px-1' : 'px-1 md:px-3';
  }

  return (
    <div className={renderContainer()}>
      <h1 className= {renderTitleClasses()}>{legendCategory.title}</h1>
      <div className={renderFieldsClasses()}>
        {legendCategory.colors.map((colorData, i) => (
          <div 
            className={renderFieldClasses()}
            onMouseOver={() => handleHoverOver( colorData.color )}
            onMouseOut={() => handleHoverLeave()}
            key={i}
          >
            <div className='inline-block mr-2 color-box rounded-sm border-solid border-1' style={ { background: colorData.color }}></div>
            <span className='inline text-base align-text-bottom'>{colorData.displayName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;