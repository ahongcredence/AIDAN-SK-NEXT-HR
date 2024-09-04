import Image from "next/image";
import React, { useState, useEffect } from "react";
import credenceLogo from "../../public/credence_1.png";
import CTC_Alert from 'ctc-alert';
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
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [alert, setAlert] = useState(null)
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    const maxSizeMB = 100;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    const totalSizeBytes = files.reduce((total, file) => total + file.size, 0);

    if (totalSizeBytes > maxSizeBytes) {
      setSelectedFiles([]);
      setTimeout(() => {
        setAlert({ severity: 'error', header: 'Invalid file size', message: `Total size of selected files exceeds the maximum allowed limit of ${maxSizeMB} MB.` });
      }, 3000);
      return;
    } else {
      setAlert(null)
    }
    setSelectedFiles(files);


  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFiles.length === 0) {
      setErrorMessage("Please select files");
      return;
    }

    for (const file of selectedFiles) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64FileContent = reader.result.split(",")[1];

        const formData = {
          file_name: `${file.name}`,
          file_content: base64FileContent,
        };

        try {
          const response = await fetch("/api/job_descriptions/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (!response.ok) {
            throw new Error("File upload failed");
          }

          const result = await response.json();
          setAlert({ severity: 'success', header: 'Upload Complete', message: `File upload complete` });
          setTimeout(() => {
            setAlert(null);
          }, 5000);
          setSelectedFiles([])
        } catch (error) {
          console.log("error", error)
          setAlert({ severity: 'error', header: 'Upload Unsuccessful', message: `There was a problem uploading your file` });
          setTimeout(() => {
            setAlert(null);
          }, 5000);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`usa-sidenav sidebar ${isOpen ? "is-visible" : ""}`}
      style={{ display: isOpen ? "block" : "none", height: "100vh", overflowY: "auto" }}

    >
      <button className="usa-button" onClick={toggleSidebar}>
        {closeIcon}
      </button>
      {alert && <CTC_Alert severity={alert.severity} header={alert.header} message={alert.message} />}
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
      <form
        onSubmit={handleSubmit}
      >
        <div className="usa-form-group">
          <label className="usa-label" htmlFor="file-input-multiple">
            Upload Job Description(s)
          </label>
          <input
            id="file-input-multiple"
            className="usa-file-input"
            type="file"
            name="file-input-multiple"
            multiple
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"

          />
        </div>
        <button type="submit" className="usa-button mb-3">
          Upload
        </button>
      </form>
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
