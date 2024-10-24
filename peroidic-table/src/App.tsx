import './App.css';
import AtomicElement from './components/AtomicElement';
import ElementData from './assets/ElementData';
import GroupData from './assets/GroupData';

import GroupLabel from './components/GroupLabel';
import PeriodLabel from './components/PeriodLabel';
import { useState } from 'react';
import Modal from './components/Modal';
import About from './components/About';
import { iElement } from './schemas/ElementInterface';
import Header from './components/Header';

function App() {

  // const [ hoverPeriod, setHoverPeriod ] = useState({ hoverPeriod: (num: number) => num });
  const defaultPeriodHover = { periodHover: 0 };
  const defaultGroupHover = { groupHover: 0 };
  const defaultElementHover = { elementHover: 0 };
  const defaultCurrentElement = { currentElement: ElementData[0] };
  const defaultOtherElementHighlighted = { otherElementHighlighted: false };
  const defaultColorIndex = { colorIndex: 'cpk' };

  const [periodHover, setPeriodHover] = useState({ ...defaultPeriodHover });
  const [groupHover, setGroupHover] = useState({ ...defaultGroupHover });
  const [elementHover, setElementHover] = useState({ ...defaultElementHover });
  const [currentElement, setCurrentElement] = useState({ ...defaultCurrentElement });
  const [otherElementHighlighted, setOtherElementHighlighted] = useState({ ...defaultOtherElementHighlighted });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [colorIndexData, setColorIndex] = useState({...defaultColorIndex});

  const renderGroupLabels = () => {
    const headerArr = [];
    for (let i = 0; i < GroupData.length; i++) {
      headerArr.push(
        <GroupLabel
          data={{ ...GroupData[i] }}
          hover={handleHoverGroup}
          key={i}
        />
      )
    }
    return headerArr;
  }

  const renderPeriodLabels = () => {
    const periodLabelsArr = []
    for (let i = 1; i < 8; i++) {
      periodLabelsArr.push(
        <PeriodLabel
          data={{ periodNumber: i }}
          hover={handleHoverPeriod}
          key={i}
        />
      )
    }
    return periodLabelsArr;
  }

  const renderElements = () => {
    const elements = [];
    for (let i = 0; i < ElementData.length; i++) {
      if (ElementData[i]) {
        elements.push(<AtomicElement
          element={ElementData[i]}
          obscure={{ ...periodHover, ...groupHover, ...elementHover, ...otherElementHighlighted }}
          hover={handleHoverElement}
          click={handleSelectCurrentElement}
          colorIndex={colorIndexData.colorIndex}
          key={i}
        />)
      }
    }
    return elements;
  }

  const handleHoverPeriod = (periodHover: number) => {
    setPeriodHover({ periodHover });
    setOtherElementHighlighted({ otherElementHighlighted: periodHover !== 0 })
  }

  const handleHoverGroup = (groupHover: number) => {
    setGroupHover({ groupHover });
    setOtherElementHighlighted({ otherElementHighlighted: groupHover !== 0 })
  }

  const handleHoverElement = (elementHover: number) => {
    setElementHover({ elementHover });
    setOtherElementHighlighted({ otherElementHighlighted: elementHover !== 0 })
  }

  const handleSelectColorIndex = (colorIndex: string) => {
    setColorIndex({ colorIndex });
  }


  const closeModal = () => setIsModalOpen(false);
  const handleSelectCurrentElement = (currentElement: iElement) => {
    setCurrentElement({ currentElement });
    setIsModalOpen(true);
  }
  return (
    <div className="App">
      <Header select={handleSelectColorIndex} colorIndex={colorIndexData.colorIndex} />
      {renderGroupLabels()}
      {renderPeriodLabels()}
      {renderElements()}
      <Modal show={isModalOpen} onClose={closeModal} currentElement={currentElement.currentElement} />
      <About></About>
    </div>
  );
}

export default App;

