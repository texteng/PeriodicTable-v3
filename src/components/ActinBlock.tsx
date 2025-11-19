import { useEffect, useState, use, memo } from 'react';
import './ActinBlock.css';
import ElementData from '../assets/ElementData';
import { AppContext } from '../contexts/AppContext';


const ActinBlock = memo(() => {
  const context = use(AppContext);
  
  if (!context) {
    throw new Error('ActinBlock must be used within AppProvider');
  }

  const { hoverState: obscure, colorIndex, handleHoverActin } = context;
  
  const obscureStyles = { filter: "grayscale(80%)", opacity: .25 };

  const [style, setStyle] = useState({ 
    background: 'rgb(211,211,211)', 
    color: '#000000', 
    filter: "grayscale(0%)", 
    opacity: 1 
  });

  const handleHoverOver = () => handleHoverActin(true);
  const handleHoverLeave = () => handleHoverActin(false);
  const colorIndexChangeList = new Set(['group_block', 'category']);

  useEffect(() => {
    if (obscure.actin) {
      setStyle(prev => ({ ...prev, filter: "grayscale(0%)", opacity: 1 }));
    } else if (
      obscure.otherElementHighlighted &&
      obscure.period !== 7 &&
      obscure.group !== 3 &&
      obscure.category !== getBackgroundColor(colorIndex)
    ) {
      setStyle(prev => ({ ...prev, ...obscureStyles }));
    } else {
      setStyle(prev => ({ ...prev, filter: "grayscale(0%)", opacity: 1 }));
    }
  }, [obscure, colorIndex]);

  useEffect(() => {
    setStyle(prev => ({
      ...prev,
      color: getTextColor(colorIndex),
      background: getBackgroundColor(colorIndex)
    }))
  }, [colorIndex]);

  const getBackgroundColor = function (colorIndex: string) {
    return colorIndexChangeList.has(colorIndex) ? 
      ElementData[88].colors[colorIndex].hex :
      "rgb(211,211,211)";
  };
  
  const getTextColor = function (colorIndex: string) {
    return colorIndexChangeList.has(colorIndex) && ElementData[56].colors[colorIndex].dark ? "#FFFFFF" : "#000000";
  };
  

  return (
    <a href="https://en.wikipedia.org/wiki/Actinide" target="_blank">
      <div
        className={`element absolute text-center rounded-md p-1 border border-gray-400 hover:border-gray-600 hover:shadow-inner transition-opacity ease-in-out duration-100 shadow-xl e-top-7 e-left-3`}
        style={style}
        onMouseOver={() => handleHoverOver()}
        onMouseLeave={() => handleHoverLeave()}
      >
        <span className='text-xs flex items-center h-full justify-center'>89-103</span>
      </div>
    </a>
  );

});


export default ActinBlock;