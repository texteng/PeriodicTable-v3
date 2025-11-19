import React, { useEffect, useState } from 'react';
import './Legend.scss';
import { iLegendProps } from '../schemas/PropInterfaces';
import { LegendData } from '../assets/LegendData';

const Legend: React.FC<iLegendProps> = React.memo(({ colorIndex, hover, wide }) => {
  const [legendCategory, setLegendCategory] = useState(LegendData['cpk']);

  const handleHoverOver = (colorHex: string) => hover(colorHex)
  const handleHoverLeave = () => hover('')

  useEffect(() => {
    setLegendCategory(LegendData[colorIndex])
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
      <h1 className={renderTitleClasses()}>{legendCategory.title}</h1>
      <div className={renderFieldsClasses()}>
        {legendCategory.colors.map((colorData) => (
          <div 
            className={renderFieldClasses()}
            onMouseOver={() => handleHoverOver(colorData.color)}
            onMouseOut={() => handleHoverLeave()}
            key={colorData.color}
          >
            <div className='inline-block mr-2 h-5 w-5 rounded-sm border-solid border-1' style={{ background: colorData.color }}></div>
            <span className='inline text-base align-text-bottom'>{colorData.displayName}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Legend;