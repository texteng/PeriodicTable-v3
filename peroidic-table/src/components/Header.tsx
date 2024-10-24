import React from 'react';
import './Header.css';

interface iAtomicHeaderProps {
  colorIndex: string;
  select: (colorIndex: string) => void;
}


const Header: React.FC<iAtomicHeaderProps> = ({ colorIndex, select }) => {
  const handleSelectColorIndex = (colorIndexSelection: string) => {
    select(colorIndexSelection);
  }

  return (
    <div className='bg-slate-800 px-2 py-2 md:py-3 lg:py-4 text-white grid grid-cols-14'>
    <div className='text-sm md:text-base xl:text-xl col'>Periodic Table of Elements</div>
    <div className="col-start-13 text-sm md:text-base xl:text-xl">
    <div id="color-options" className='place-self-end'>
      <label htmlFor="color-index" className="mr-6">Pick Color Type</label>        
      <select name="color-index"
        onChange={e => handleSelectColorIndex(e.target.value)}
        value={colorIndex}
        className='bg-slate-600 px-2 py-1 my-[-10px]'
      >
        <option value="cpk">CPK</option>
        <option value="atomic_radius">Atomic Radius</option>
        <option value="boil">Boil</option>
        <option value="bonding_type">Bonding_type</option>
        <option value="category">Category</option>
        <option value="density">Density</option>
        <option value="electron_affinity">Electron Affinity</option>
        <option value="electronegativity">Electronegativity</option>
        <option value="group_block">Group Block</option>
        <option value="ionization_energy">Ionization Energy</option>
        <option value="melt">Melt</option>
        <option value="molar_heat">Molar Heat</option>
        <option value="phase">Phase</option>
        <option value="van_der_waals_radius">Van del Waals Radius</option>
        <option value="year_discovered">Year Discovered</option>
      </select>
    </div>
    </div>
  </div>
  );
};

export default Header;
