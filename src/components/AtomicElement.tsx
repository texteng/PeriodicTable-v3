import React, { useEffect, useState } from 'react';
import { iElement } from '../schemas/ElementInterface';
import './AtomicElement.css';
import { iAtomicElementProps } from '../schemas/propInterfaces';

const AtomicElement: React.FC<iAtomicElementProps> = ({ element, obscure, colorIndex, hover, click }) => {
  const defalutBackgroundColor = { background: getBackgroundColor(colorIndex, element) };
  const defaultTextColor = { color: getTextColor(colorIndex, element) };
  const className = "element absolute text-center rounded-md p-1 border border-gray-400 hover:border-gray-600 hover:shadow-inner transition-opacity ease-in-out duration-100";
  const massNumber = renderMassNumber(element.atomic_mass);
  const defaultAdditionalInfo = { info: massNumber }

  const defaultStyles = { filter: "grayscale(0%)", opacity: 1 };
  const obscureStyles = { filter: "grayscale(80%)", opacity: .25 };

  const [style, setStyle] = useState({ ...defalutBackgroundColor, ...defaultTextColor, ...defaultStyles });
  const [additionalInfo, setAdditionalInfo] = useState({ ...defaultAdditionalInfo });


  const handleHoverOver = () => hover(element.number);
  const handleHoverLeave = () => hover(0);

  const handleClick = () => {
    return click(element)
  }

  useEffect(() => {
    if (obscure.otherElementHighlighted &&
      obscure.periodHover !== element.period &&
      obscure.groupHover !== element.group &&
      obscure.elementHover !== element.number
    ) {
      setStyle({ ...style, ...obscureStyles })
    } else {
      setStyle({ ...style, ...defaultStyles })
    }
  }, [obscure]);

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


  return (
    <div
      className={className + ` e-top-${element.ypos} e-left-${element.xpos} md:py-2 lg:py-1 px-0 shadow-xl`}
      style={style}
      onMouseOver={() => handleHoverOver()}
      onMouseLeave={() => handleHoverLeave()}
      onClick={() => handleClick()}
    >
      <span className='text-xs hidden lg:block xl:block 2xl:block leading-3'>{element.number}</span>
      <span className='text-xl sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl block element-symbol p-0'>{element.symbol}</span>
      <span className='text-xs 2xl:text-sm hidden lg:block xl:block 2xl:block additional-info font-bold leading-3 p-0'>{additionalInfo.info}</span>
      <span className='tracking-tighter hidden text-xs 2xl:block xl:block tracking-narrow element-name'>{element.name}</span>
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

const getAdditionalInfo = function (colorIndex: string, element: iElement): string {
  if (colorIndex === 'cpk') {
    return renderMassNumber(element.atomic_mass);
  } else if (colorIndex === 'bonding_type' || colorIndex === 'group_block') {
    return '';
  }
  // @ts-ignore;
  return `${element[colorIndex] ?? ''}`;
}

export default AtomicElement;