import { useEffect, use, memo } from 'react';
import './Modal.css';  // Add custom styles for the modal
import { AppContext } from '../contexts/AppContext';

const Modal = memo(() => {
  const context = use(AppContext);
  
  if (!context) {
    throw new Error('Modal must be used within AppProvider');
  }

  const { isModalOpen, currentElement, closeModal } = context;
  // Return null if the modal should not be shown

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    // Add event listener when the modal is shown
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Clean up the event listener when the modal is closed
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, closeModal]);  // Depend on isModalOpen and closeModal to add/remove the listener properly

  // Close modal when clicking on the overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) closeModal();  // Only close if the target is the overlay (not modal content)
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="bg-black/50 w-screen h-screen top-0 left-0 grid justify-center items-center fixed" onClick={handleOverlayClick}>
      <div className='w-[80vw] bg-white rounded-2xl place-self-center max-w-full text-left'>
        <h2 className='text-3xl p-4'>{currentElement.name} ({currentElement.symbol})</h2>
        <hr />
        <div className='p-5'>
          <div>
            <div className='inline-block border-2 hover:border-blue-600'>
              <a href={currentElement.image.url} target="_blank">
                <img
                  src={currentElement.image.url}
                  aria-description={currentElement.image.attribution}
                  alt={currentElement.image.title}
                  style={{ width: '100px' }} />
              </a>
              {/* <span className="text-center text-xs">{ currentElement.image.title} </span> */}
            </div>
            <div className='inline-block border-2 hover:border-blue-600'>
              <a href={currentElement.bohr_model_image} target="_blank">
                <img
                  src={currentElement.bohr_model_image}
                  alt={`${currentElement.name} Bohr Model`}
                  style={{ width: '100px' }}
                />
              </a>
            </div>
          </div>

          {/* <img src={ currentElement.image.url } style={{width: '200px'}}></img> */}
          <ul className="list-disc px-6">
            <li><span className='font-bold'>Atomic Number:</span> {currentElement.number}</li>
            <li><span className='font-bold'>Category:</span> {currentElement.category}</li>
            <li><span className='font-bold'>Atomic Mass (amu):</span> {currentElement.atomic_mass}</li>
            <li><span className='font-bold'>Electron Configuration:</span> {currentElement.electron_configuration}</li>
            {/* <li><span className='font-bold'>Electron Configuration:</span> {currentElement.electron_configuration}</li> */}
            {currentElement.appearance !== null && (<li><span className='font-bold'>Appearance:</span> {currentElement.appearance}</li>)}
            <li><span className='font-bold'>Phase (Room Temperature):</span> {currentElement.phase}</li>
            {currentElement.boil !== null && (<li><span className='font-bold'>Boiling Point:</span> {currentElement.boil} K</li>)}
            {currentElement.melt !== null && (<li><span className='font-bold'>Melting Point:</span> {currentElement.melt} K</li>)}
            {currentElement.molar_heat !== null && (<li><span className='font-bold'>Molar Heat:</span> {currentElement.melt} °C</li>)}
            {currentElement.density !== null && (<li><span className='font-bold'>Density:</span> {currentElement.density} g/L</li>)}
            {currentElement.electronegativity !== null && (<li><span className='font-bold'>Electronegativity:</span> {currentElement.electronegativity}</li>)}
            {currentElement.atomic_radius !== null && (<li><span className='font-bold'>Atomic Radius:</span> {currentElement.atomic_radius} Å</li>)}
            {currentElement.ionization_energy !== null && (<li><span className='font-bold'>Ionization Energy:</span> {currentElement.ionization_energy} eV</li>)}
            {currentElement.electron_affinity !== null && (<li><span className='font-bold'>Electron Affinity:</span> {currentElement.electron_affinity} kJ/mol</li>)}
            {currentElement.bonding_type !== null && (<li><span className='font-bold'>Bonding Type:</span> {currentElement.bonding_type}</li>)}
            {currentElement.discovered_by !== null && (<li><span className='font-bold'>Discovered by:</span> {currentElement.discovered_by} {currentElement.year_discovered !== null && (<span>({currentElement.year_discovered})</span>)}</li>)}
            {currentElement.named_by !== null && (<li><span className='font-bold'>Named by:</span> {currentElement.named_by}</li>)}
          </ul>

        </div>
        <div className='px-6 pb-4'>
          <div> {currentElement.summary}</div>
          <div> <span className='font-bold'>More Information:</span> <a href={currentElement.source} className="hover:text-blue-600">{currentElement.source}</a></div>
        </div>
      </div>
    </div>
  );
});

export default Modal;