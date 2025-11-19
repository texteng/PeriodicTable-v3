import './App.css';
import AtomicElement from './components/AtomicElement';
import ElementData from './assets/ElementData';
import GroupData from './assets/GroupData';

import GroupLabel from './components/GroupLabel';
import PeriodLabel from './components/PeriodLabel';
import { use, Suspense, lazy } from 'react';
import Header from './components/Header';
import LanthBlock from './components/LanthBlock';
import ActinBlock from './components/ActinBlock';
import Legend from './components/Legend';
import { AppContext } from './contexts/AppContext';

const Modal = lazy(() => import('./components/Modal'));
const About = lazy(() => import('./components/About'));

function AppContent() {
  const context = use(AppContext);
  
  if (!context) {
    throw new Error('AppContent must be used within AppProvider');
  }

  const {
    colorIndex,
    isWide,
    handleHoverGroup,
    handleHoverPeriod,
    handleSelectColorIndex,
    handleAboutButtonClick,
    handleWideButtonClick
  } = context;

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
        elements.push(
          <AtomicElement
            element={ElementData[i]}
            key={ElementData[i].number}
          />
        )
      }
    }
    return elements;
  }

  const renderLanthAndActinBlocks = () => {
    if (!isWide) {
      return (
        <>
          <LanthBlock />
          <ActinBlock />
        </>
      );
    }
    return null;
  }

  return (
    <div className="App">
      <Header 
        select={handleSelectColorIndex} colorIndex={colorIndex}
        aboutButtonClick={handleAboutButtonClick}
        wide={isWide}
        wideButtonClick={handleWideButtonClick}
      />
      {renderGroupLabels()}
      {renderPeriodLabels()}
      {renderElements()}
      {renderLanthAndActinBlocks()}
      <Legend />
      
      <Suspense fallback={<div className="text-center py-4">Loading modal...</div>}>
        <Modal />
      </Suspense>
      
      <Suspense fallback={<div className="text-center py-4">Loading about...</div>}>
        <About />
      </Suspense>
    </div>
  );
}

export default AppContent;
