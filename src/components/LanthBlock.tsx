import React, { useEffect, useState } from 'react';
import './LanthBlock.css';
import { iLanthAndActinProps } from '../schemas/PropInterfaces';
import ElementData from '../assets/ElementData';


const LanthBlock: React.FC<iLanthAndActinProps> = React.memo(({ obscure, hover, colorIndex }) => {
  const obscureStyles = { filter: "grayscale(80%)", opacity: .25 };

  const [style, setStyle] = useState({ 
    background: 'rgb(211,211,211)', 
    color: '#000000', 
    filter: "grayscale(0%)", 
    opacity: 1 
  });

  const handleHoverOver = () => hover(true);
  const handleHoverLeave = () => hover(false);
  const colorIndexChangeList = new Set(['group_block', 'category']);

  useEffect(() => {
    if (obscure.lanth) {
      setStyle(prev => ({ ...prev, filter: "grayscale(0%)", opacity: 1 }))
    }
    else if (obscure.otherElementHighlighted &&
      obscure.period !== 6 &&
      obscure.group !== 3 &&
      obscure.category !== getBackgroundColor(colorIndex)
    ) {
      setStyle(prev => ({ ...prev, ...obscureStyles }))
    } else {
      setStyle(prev => ({ ...prev, filter: "grayscale(0%)", opacity: 1 }))
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
    // const data = { hex: "#FFFFFF", dark: false };
    return colorIndexChangeList.has(colorIndex) ? 
      ElementData[56].colors[colorIndex].hex :
      "rgb(211,211,211)";
  };
  
  const getTextColor = function (colorIndex: string) {
    // const data = element.colors[colorIndex] ?? { hex: "#FFFFFF", dark: true };
    return colorIndexChangeList.has(colorIndex) && ElementData[56].colors[colorIndex].dark ? "#FFFFFF" : "#000000";
  };
  

  return (
    <a href="https://en.wikipedia.org/wiki/Lanthanide" target="_blank">
      <div
        className={`element absolute text-center rounded-md p-1 border border-gray-400 hover:border-gray-600 hover:shadow-inner transition-opacity ease-in-out duration-100 shadow-xl e-top-6 e-left-3`}
        style={style}
        onMouseOver={() => handleHoverOver()}
        onMouseLeave={() => handleHoverLeave()}
      >
        <span className='text-xs flex items-center h-full justify-center'>57-71</span>
      </div>
    </a>
  );

});


export default LanthBlock;