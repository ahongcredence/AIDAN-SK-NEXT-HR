'use client'
import React, { useState, useEffect } from "react";
import UploadDocs from "../components/UploadDocs/UploadDocs";
import GeneratedArtifacts from "../components/GeneratedArtifacts/GeneratedArtifacts";
import FinalArtifacts from "../components/FinalArtifacts/FinalArtifacts";
import SidebarDrawer from "../components/SidebarDrawer";
import Navbar from "../components/Navbar";

const MainContent = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [fileName, setFileName] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  function handleTabClick(tabIndex) {
    setActiveTab(tabIndex);
    console.log("active", tabIndex);
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleResize = () => {
    if (window.innerWidth < 866) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div style={{ display: "flex" }}>
      <aside
        style={{
          width: isSidebarOpen ? "250px" : "0",
          transition: "width 0.3s",
        }}
      >
        <SidebarDrawer isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </aside>
      <main style={{ flex: 1, padding: "20px" }}>
        <Navbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex flex-col">
          <nav className="">
            <ul className="flex">
              <li className={` ${activeTab === 0 ? "usa-current" : ""}`}>
                <a
                  className={activeTab === 0 ? "selected" : ""}
                  href="#"
                  onClick={() => handleTabClick(0)}
                >
                  Uploaded Docs
                </a>
              </li>
              <li className={` ${activeTab === 1 ? "usa-current" : ""}`}>
                <a
                  className={activeTab === 1 ? "selected" : ""}
                  href="#"
                  onClick={() => handleTabClick(1)}
                >
                  Generated Artifacts
                </a>
              </li>
              <li className={` ${activeTab === 2 ? "usa-current" : ""}`}>
                <a
                  className={activeTab === 2 ? "selected" : ""}
                  href="#"
                  onClick={() => handleTabClick(2)}
                >
                  Final Artifacts
                </a>
              </li>
            </ul>
          </nav>

          <div className="content ">
            {activeTab === 0 && (
              <div>
                <UploadDocs
                  setActiveTab={setActiveTab}
                  setFileName={setFileName}
                />
              </div>
            )}

            {activeTab === 1 && (
              <div  style={{width: "100%"}}>
                <GeneratedArtifacts fileName={fileName} />
              </div>
            )}

            {activeTab === 2 && (
              <div>
                <FinalArtifacts />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainContent;
