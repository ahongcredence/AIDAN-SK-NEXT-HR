import Image from "next/image";
import React from "react";
import credenceLogo from "../../public/credence_1.png";

const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="15"
    height="15"
  >
    <path
      fill="currentColor"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    />
  </svg>
);

const SidebarDrawer = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`usa-sidenav sidebar ${isOpen ? "is-visible" : ""}`}
      style={{ display: isOpen ? "block" : "none", height: "100vh" , overflowY:"auto"}}

    >
      <button className="usa-button" onClick={toggleSidebar}>
        {closeIcon}
      </button>

      <ul className="usa-sidenav__list flex gap-3 pt-2">
        <li>
          <input type="checkbox" id="working" name="working" />
          <label htmlFor="working"> Working</label>
        </li>
        <li>
          <input type="checkbox" id="archived" name="archived" />
          <label htmlFor="archived"> Archived</label>
        </li>
      </ul>

      <footer className="usa-footer absolute bottom-0">
        <div className="usa-footer__primary-section">
          <div className="usa-grid">
            <div className="usa-footer__logo grid-row">
                <Image
                  src={credenceLogo}
                  alt="credence-llc"
                  width={200}
                  height={200}
                />
            
            </div>
          </div>
        </div>
      </footer>
      
      
    </div>
  );
};

export default SidebarDrawer;
