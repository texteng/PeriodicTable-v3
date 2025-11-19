import { useEffect, useState, use, memo } from 'react';
import './Legend.scss';
import { LegendData } from '../assets/LegendData';
import { AppContext } from '../contexts/AppContext';

const Legend = memo(() => {
  const context = use(AppContext);
  
  if (!context) {
    throw new Error('Legend must be used within AppProvider');
  }

  const { colorIndex, handleHoverCategory, isWide } = context;
  const [legendCategory, setLegendCategory] = useState(LegendData.cpk);

  const handleHoverOver = (colorHex: string) => handleHoverCategory(colorHex)
  const handleHoverLeave = () => handleHoverCategory('')

  useEffect(() => {
    setLegendCategory(LegendData[colorIndex])
  }, [colorIndex]);

  const renderContainer = () => {
    const baseClasses = 'absolute px-2'
    return isWide ? `${baseClasses} lw-top lw-left`: `${baseClasses} l-top l-left`;
  }

  const renderTitleClasses = () => {
    const baseClasses = 'block text-base';
    return isWide ? baseClasses : `${baseClasses} md:text-xl`
  }

  const renderFieldsClasses = () => {
    const baseClasses = 'flex flex-col gap-0 flex-wrap';
    return isWide ? `${baseClasses} lw-height` : `${baseClasses} l-height`;
  }

  const renderFieldClasses = () => {
    return isWide ? 'px-1' : 'px-1 md:px-3';
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