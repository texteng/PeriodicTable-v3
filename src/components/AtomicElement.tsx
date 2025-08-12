import React, { useEffect, useState } from 'react';
import { iElement } from '../schemas/ElementInterface';
import './AtomicElement.css';
import { iAtomicElementProps } from '../schemas/PropInterfaces';


const AtomicElement: React.FC<iAtomicElementProps> = ({ element, obscure, colorIndex, wide, hover, click }) => {
  const defaultBackgroundColor = { background: getBackgroundColor(colorIndex, element) };
  const defaultTextColor = { color: getTextColor(colorIndex, element) };
  const massNumber = renderMassNumber(element.atomic_mass);
  const defaultAdditionalInfo = { info: massNumber }

  const defaultStyles = { filter: "grayscale(0%)", opacity: 1 };
  const obscureStyles = { filter: "grayscale(80%)", opacity: .25 };

  const [style, setStyle] = useState({ ...defaultBackgroundColor, ...defaultTextColor, ...defaultStyles });
  const [additionalInfo, setAdditionalInfo] = useState({ ...defaultAdditionalInfo });

  const hideAdditionalInfoCategory = new Set(['bonding_type', 'block', 'phase' ]);
  const showMassAsAdditionalCategory = new Set(['cpk', 'group_block', 'category']);

  const handleHoverOver = () => hover(element.number);
  const handleHoverLeave = () => hover(0);

  const handleClick = () => {
    return click(element)
  }

  const baseClasses = () => {
    const standardClasses = `element absolute text-center rounded-md p-1 border border-gray-400 hover:border-gray-600 hover:shadow-inner transition-opacity ease-in-out duration-100 px-0 shadow-xl`;
    return wide ? standardClasses : standardClasses + " md:py-2 lg:py-1";

  }

  const positionClasses = () => {
    return !wide ? `e-top-${element.ypos} e-left-${element.xpos}` : `ew-top-${element.wypos} ew-left-${element.wxpos}`;
  }

  const renderInterFields = () => {
    const elements = [];
    
    if (wide) {
      return <span key={`w-symbol-${element.symbol}`} className='text-xl block element-symbol p-0'>{element.symbol}</span>;
    }
    
    if (!wide) {
      elements.push(
        <span key={`number-${element.number}`} className='text-xs hidden lg:block xl:block 2xl:block leading-3'>{element.number}</span>,
        <span key={`symbol-${element.symbol}`} className='text-xl sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl block element-symbol p-0'>{element.symbol}</span>,
        <span key={`additional-${element.number}`} className='text-xs 2xl:text-sm hidden lg:block xl:block 2xl:block additional-info font-bold leading-3 p-0'>{additionalInfo.info}</span>,
        <span key={`name-${element.name}`} className='tracking-tighter hidden text-xs 2xl:block xl:block tracking-narrow element-name'>{element.name}</span>
      )
    }
    return elements
  }


  useEffect(() => {
    if (obscure.otherElementHighlighted) {
      if (
        (obscure.lanth && element.number >= 57 && element.number <= 71) ||
        (obscure.actin && element.number >= 89 && element.number <= 103)
      ) {
        setStyle({ ...style, ...defaultStyles });
      } else if (
        obscure.period !== element.period &&
        obscure.group !== element.group &&
        obscure.category !== getBackgroundColor(colorIndex, element) &&
        obscure.element !== element.number
      ) {
        setStyle({ ...style, ...obscureStyles });
      } else {
        setStyle({ ...style, ...defaultStyles });
      }
    } else {
      setStyle({ ...style, ...defaultStyles });
    }
  }, [obscure, colorIndex]);

  useEffect(() => {
    setStyle({
      ...style,
      color: getTextColor(colorIndex, element),
      background: getBackgroundColor(colorIndex, element)
    })
    setAdditionalInfo({
      info: getAdditionalInfo(colorIndex, element)
    })
  }, [colorIndex]);

  const getAdditionalInfo = function (colorIndex: string, element: iElement): string {
    if (showMassAsAdditionalCategory.has(colorIndex)) {
      return renderMassNumber(element.atomic_mass);
    } else if (hideAdditionalInfoCategory.has(colorIndex)) {
      return '';
    }
    // @ts-ignore;
    return `${element[colorIndex] ?? ''}`;
  }

  return (
    <div
      className={baseClasses() + ' ' + positionClasses() }
      style={style}
      onMouseOver={() => handleHoverOver()}
      onMouseLeave={() => handleHoverLeave()}
      onClick={() => handleClick()}
    >
      {renderInterFields()}
    </div>
  );

};

const renderMassNumber = (atomicMass: number) => {
  const atomicMassValue: number = atomicMass;
  let atomicMassString: string;
  if ((atomicMassValue * 1000) % 1 !== 0) {
    atomicMassString = atomicMassValue.toFixed(3).toString();
  } else if (atomicMassValue % 1 == 0) {
    atomicMassString = `(${atomicMassValue})`;
  } else {
    atomicMassString = atomicMassValue.toString();
  }
  return atomicMassString;
}


const getBackgroundColor = function (colorIndex: string, element: iElement) {
  const data = element.colors[colorIndex] ?? { hex: "#FFFFFF", dark: false };
  return data.hex;
};

const getTextColor = function (colorIndex: string, element: iElement) {
  const data = element.colors[colorIndex] ?? { hex: "#FFFFFF", dark: false };
  return data.dark ? "#FFFFFF" : "#000000";
};

export default AtomicElement;