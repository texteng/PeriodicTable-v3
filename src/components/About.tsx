import { useEffect, use, memo } from 'react';
import './Modal.css'; // Add custom styles for the modal
import { AppContext } from '../contexts/AppContext';

const About = memo(() => {
  const context = use(AppContext);
  
  if (!context) {
    throw new Error('About must be used within AppProvider');
  }

  const { isAboutModalOpen, closeAboutModal } = context;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAboutModal();
      }
    };

    // Add event listener when the modal is shown
    if (isAboutModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    // Clean up the event listener when the modal is closed
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAboutModalOpen, closeAboutModal]);  // Depend on isAboutModalOpen and closeAboutModal to add/remove the listener properly

  // Close modal when clicking on the overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) closeAboutModal();  // Only close if the target is the overlay (not modal content)
  };

  if (!isAboutModalOpen) {
    return null;
  }


  return (
    <div className="bg-black/50 w-screen h-screen top-0 left-0 grid justify-center items-center fixed" onClick={handleOverlayClick}>
      <div className='w-[80vw] bg-white rounded-2xl place-self-center max-w-full text-left'>
        <h2 className='text-3xl p-4'>About Periodic Table</h2>
        <hr />
        <div className='p-5'>
          <p>This Periodic Table was meant to be tech demo only. Not used for actual chemists.</p>
          The source of the data from this table come from:
          <ul className='list-disc p-5'>
            <li><a className="hover:text-blue-600" href="https://github.com/Bowserinator/Periodic-Table-JSON">https://github.com/Bowserinator/Periodic-Table-JSON</a></li>
            <li><a className="hover:text-blue-600" href="https://github.com/neelpatel05/periodic-table-api">https://github.com/neelpatel05/periodic-table-api</a></li>
          </ul>
          <p><a href="https://github.com/texteng/PeriodicTable-v3">Github repo</a></p>
          <p>This Periodic Table was Created by Stephen Teng.</p>
        </div>
      </div>
    </div>
  );
});

export default About;