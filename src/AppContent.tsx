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
    return GroupData.map((group) => (
      <GroupLabel
        data={group}
        hover={handleHoverGroup}
        key={group.groupNumber}
        wide={isWide}
      />
    ));
  }

  const renderPeriodLabels = () => {
    return Array.from({ length: 7 }, (_, i) => i + 1).map((period) => (
      <PeriodLabel
        data={{ periodNumber: period }}
        hover={handleHoverPeriod}
        key={period}
        wide={isWide}
      />
    ));
  }

  const renderElements = () => {
    return ElementData.filter(Boolean).map((element) => (
      <AtomicElement
        element={element}
        key={element.number}
      />
    ));
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
