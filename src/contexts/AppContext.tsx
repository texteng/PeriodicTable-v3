import { createContext, useState, useCallback, ReactNode, startTransition } from 'react';
import { iElement } from '../schemas/ElementInterface';
import ElementData from '../assets/ElementData';

interface HoverState {
  period: number;
  group: number;
  element: number;
  category: string;
  lanth: boolean;
  actin: boolean;
  otherElementHighlighted: boolean;
}

interface AppContextType {
  // State
  hoverState: HoverState;
  currentElement: iElement;
  colorIndex: string;
  isAboutModalOpen: boolean;
  isModalOpen: boolean;
  isWide: boolean;
  
  // Actions
  updateHover: (type: keyof HoverState, value: any) => void;
  handleHoverPeriod: (period: number) => void;
  handleHoverGroup: (group: number) => void;
  handleHoverCategory: (category: string) => void;
  handleHoverElement: (element: number) => void;
  handleHoverLanth: (lanth: boolean) => void;
  handleHoverActin: (actin: boolean) => void;
  handleSelectColorIndex: (colorIndex: string) => void;
  handleSelectCurrentElement: (element: iElement) => void;
  handleAboutButtonClick: () => void;
  handleWideButtonClick: () => void;
  closeModal: () => void;
  closeAboutModal: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [hoverState, setHoverState] = useState<HoverState>({
    period: 0,
    group: 0,
    element: 0,
    category: '',
    lanth: false,
    actin: false,
    otherElementHighlighted: false
  });

  const [currentElement, setCurrentElement] = useState(ElementData[0]);
  const [colorIndex, setColorIndex] = useState('cpk');
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

  const handleSelectColorIndex = useCallback((colorIndex: string) => {
    startTransition(() => {
      setColorIndex(colorIndex);
    });
  }, []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const closeAboutModal = useCallback(() => setIsAboutModalOpen(false), []);

  const handleSelectCurrentElement = useCallback((currentElement: iElement) => {
    setCurrentElement(currentElement);
    setIsModalOpen(true);
  }, []);

  const handleAboutButtonClick = useCallback(() => {
    setIsAboutModalOpen(true);
  }, []);

  const handleWideButtonClick = useCallback(() => {
    setIsWide(prev => !prev);
  }, []);

  const value: AppContextType = {
    hoverState,
    currentElement,
    colorIndex,
    isAboutModalOpen,
    isModalOpen,
    isWide,
    updateHover,
    handleHoverPeriod,
    handleHoverGroup,
    handleHoverCategory,
    handleHoverElement,
    handleHoverLanth,
    handleHoverActin,
    handleSelectColorIndex,
    handleSelectCurrentElement,
    handleAboutButtonClick,
    handleWideButtonClick,
    closeModal,
    closeAboutModal
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
