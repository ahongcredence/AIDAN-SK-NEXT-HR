// components/Navbar.js
import React from "react";
import AIDAN from '../../public/large-logo-1.png'
import Image from "next/image";
const menuIcon = (
  <svg
    xmlns="/assets/img/sprite.svg#more_horiz"
    viewBox="0 0 24 24"
    width="15"
    height="15"
  >
    <path
      fill="currentColor"
      d="M4 18h16v-2H4v2zm0-5h16v-2H4v2zm0-7v2h16V6H4z"
    />
  </svg>
);

const Navbar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="pb-5 flex items-center">
    <div >
      {!isOpen && (
        <button className="usa-button" onClick={toggleSidebar} style={{marginTop: 0}}>
          {menuIcon}
        </button>
      )}
      {/* AIDAN - Side kick */}
     
    </div>
     <div>
     <Image src={AIDAN} height={100} width={120}/>
     </div>
     </div>
  );
};

export default Navbar;
