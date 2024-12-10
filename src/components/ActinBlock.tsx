import React, { useEffect, useState } from 'react';
import './ActinBlock.css';
import { iLanthAndActinProps } from '../schemas/PropInterfaces';
import ElementData from '../assets/ElementData';


const ActinBlock: React.FC<iLanthAndActinProps> = ({ obscure, colorIndex, hover }) => {
  const defaultBackgroundColor = { background: 'rgb(211,211,211)'}; // not using hex so this will not hover
  const defaultTextColor = { color: '#000000' };

  const defaultStyles = { filter: "grayscale(0%)", opacity: 1 };
  const obscureStyles = { filter: "grayscale(80%)", opacity: .25 };

  const [style, setStyle] = useState({ ...defaultBackgroundColor, ...defaultTextColor, ...defaultStyles });

  const handleHoverOver = () => hover(true);
  const handleHoverLeave = () => hover(false);
  const colorIndexChangeList = new Set(['group_block', 'category']);

  useEffect(() => {
    if (obscure.actinHover) {
      setStyle({ ...style, ...defaultStyles });
    } else if (
      obscure.otherElementHighlighted &&
      obscure.periodHover !== 7 &&
      obscure.groupHover !== 3 &&
      obscure.categoryHover !== getBackgroundColor(colorIndex)
    ) {
      setStyle({ ...style, ...obscureStyles });
    } else {
      setStyle({ ...style, ...defaultStyles });
    }
  }, [obscure, colorIndex]);

  useEffect(() => {
    setStyle({
      ...style,
      color: getTextColor(colorIndex),
      background: getBackgroundColor(colorIndex)
    })
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

};


export default ActinBlock;