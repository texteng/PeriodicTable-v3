import React, { useEffect, useState } from 'react';
import './Legend.css';
import { iLegendProps } from '../schemas/PropInterfaces';
import { LegendData } from '../assets/LegendData';

const Legend: React.FC<iLegendProps> = ({ colorIndex, hover }) => {
  const defaultLegendCategory = { ...LegendData['cpk'] };
  const [legendCategory, setLegendCategory] = useState({ ...defaultLegendCategory  });

  const handleHoverOver = (colorHex: string) => hover(colorHex)
  const handleHoverLeave = () => hover('');

  useEffect(() => {
    setLegendCategory({ ...LegendData[colorIndex] })
  }, [colorIndex]);

  return (
    <div className='l-top l-left absolute px-2'>
      <h1 className='block text-md md:text-xl'>{legendCategory.title}</h1>
      <div className={'flex flex-col gap-0 flex-wrap l-height'}>
        {legendCategory.colors.map((colorData, i) => (
          <div 
            className='px-1 md:px-3'
            onMouseOver={() => handleHoverOver( colorData.color )}
            onMouseOut={() => handleHoverLeave()}
            key={i}
          >
            <div className='inline-block mr-2 color-box rounded-sm border-solid border-1 my:0' style={ { background: colorData.color }}></div>
            <span className='inline text-base my:0 align-text-bottom'>{colorData.displayName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;