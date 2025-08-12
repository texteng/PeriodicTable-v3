import './App.css';
import AtomicElement from './components/AtomicElement';
import ElementData from './assets/ElementData';
import GroupData from './assets/GroupData';

import GroupLabel from './components/GroupLabel';
import PeriodLabel from './components/PeriodLabel';
import { useState, useCallback } from 'react';
import Modal from './components/Modal';
import About from './components/About';
import Legend from './components/Legend';
import { iElement } from './schemas/ElementInterface';
import Header from './components/Header';
import LanthBlock from './components/LanthBlock';
import ActinBlock from './components/ActinBlock';

interface HoverState {
  period: number;
  group: number;
  element: number;
  category: string;
  lanth: boolean;
  actin: boolean;
  otherElementHighlighted: boolean;
}

function App() {

  const [hoverState, setHoverState] = useState<HoverState>({
    period: 0,
    group: 0,
    element: 0,
    category: '',
    lanth: false,
    actin: false,
    otherElementHighlighted: false
  });

  const defaultCurrentElement = { currentElement: ElementData[0] };
  const defaultColorIndex = { colorIndex: 'cpk' };

  const [currentElement, setCurrentElement] = useState({ ...defaultCurrentElement });
  const [colorIndexData, setColorIndex] = useState({ ...defaultColorIndex });
  
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isWide, setIsWide] = useState<boolean>(false);

  const updateHover = useCallback((type: keyof HoverState, value: any) => {
    setHoverState(prev => ({
      ...prev,
      [type]: value,
      otherElementHighlighted: value !== 0 && value !== '' && value !== false
    }));
  }, []);

  const handleHoverPeriod = useCallback((period: number) => {
    updateHover('period', period);
  }, [updateHover]);

  const handleHoverGroup = useCallback((group: number) => {
    updateHover('group', group);
  }, [updateHover]);

  const handleHoverCategory = useCallback((category: string) => {
    updateHover('category', category);
  }, [updateHover]);

  const handleHoverElement = useCallback((element: number) => {
    updateHover('element', element);
  }, [updateHover]);

  const handleHoverLanth = useCallback((lanth: boolean) => {
    updateHover('lanth', lanth);
  }, [updateHover]);

  const handleHoverActin = useCallback((actin: boolean) => {
    updateHover('actin', actin);
  }, [updateHover]);

  const renderGroupLabels = () => {
    const headerArr = [];
    for (let i = 0; i < GroupData.length; i++) {
      headerArr.push(
        <GroupLabel
          data={{ ...GroupData[i] }}
          hover={handleHoverGroup}
          key={GroupData[i].groupNumber}
          wide={isWide}
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
          wide={isWide}
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
          obscure={hoverState}
          hover={handleHoverElement}
          click={handleSelectCurrentElement}
          colorIndex={colorIndexData.colorIndex}
          wide={isWide}
          key={ElementData[i].number}
        />)
      }
    }
    return elements;
  }

  const renderLanthAndActinBlocks = () => {
    const elements = [];
    if (!isWide) {
      elements.push(
        <LanthBlock
            obscure={hoverState}
            hover={handleHoverLanth}
            colorIndex={colorIndexData.colorIndex}
            key={'lanth'}
        />,
        <ActinBlock
          obscure={hoverState}
          hover={handleHoverActin}
          colorIndex={colorIndexData.colorIndex}
          key={'actin'}
      />
      )
    }
    return elements;
  }

  const handleSelectColorIndex = (colorIndex: string) => {
    setColorIndex({ colorIndex });
  }

  const closeModal = () => setIsModalOpen(false);
  const closeAboutModal = () => setIsAboutModalOpen(false);

  const handleSelectCurrentElement = (currentElement: iElement) => {
    setCurrentElement({ currentElement });
    setIsModalOpen(true);
  }

  const handleAboutButtonClick = () => {
    setIsAboutModalOpen(true);
  }

  const handleWideButtonClick = () => {
    setIsWide(!isWide);
  }

  return (
    <div className="App">
      <Header 
        select={handleSelectColorIndex} colorIndex={colorIndexData.colorIndex}
        aboutButtonClick={handleAboutButtonClick}
        wide={isWide}
        wideButtonClick={handleWideButtonClick}
      />
      {renderGroupLabels()}
      {renderPeriodLabels()}
      {renderElements()}
      {renderLanthAndActinBlocks()}
      <Legend colorIndex={colorIndexData.colorIndex} hover={handleHoverCategory} wide={isWide}/>
      <Modal show={isModalOpen} onClose={closeModal} currentElement={currentElement.currentElement} />
      <About show={isAboutModalOpen} onClose={closeAboutModal}/>
    </div>
  );
}

export default App;
