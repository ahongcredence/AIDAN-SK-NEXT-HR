import React, { useState, useEffect } from "react";

function UploadDocs({ setActiveTab, setFileName }) {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [message, setMessage] = useState("");
  const [resetTimer, setResetTimer] = useState(null);
  const [checkingFile, setCheckingFile] = useState(false);
  const [uploadedFileNames, setUploadedFileNames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");


  const uid = () =>
    String(Date.now().toString(32) + Math.random().toString(16)).replace(
      /\./g,
      ""
    );

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const checkFileExists = async (tempFileNames) => {
    try {
      const response = await fetch(`/api/check-file?filename=${tempFileNames}`);
      const fileExists = await response.json();
      return fileExists.exists;
    } catch (error) {
      console.error("Error checking file:", error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFiles) {
      setErrorMessage("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    const tempFileNames = [];
    const uploadFile =[];

    Array.from(selectedFiles).forEach((file) => {
      const fileExtension = file.name.split('.').pop();
      const baseFileName = file.name.split('.')[0];

      const uniqueFileName = `${baseFileName}-${uid()}.${fileExtension}`;
      const newFile = new File([file], uniqueFileName, { type: file.type });

      const tFileName = uniqueFileName.split('.')
      tFileName.pop()
      uploadFile.push(tFileName.join('.'))
      formData.append("files", newFile);
      tempFileNames.push(uniqueFileName);
    });

    setUploadedFileNames(tempFileNames);
    setFileName(uploadFile)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      setMessage(`File uploaded successfully`);
      setCheckingFile(true);

      const checkFileTimer = setInterval(async () => {
        try {
          const allFilesExist = await Promise.all(
            uploadedFileNames.map(async (fileName) => {
              return await checkFileExists(fileName);
            })
          );

          if (allFilesExist.every((exists) => exists)) {
            clearInterval(checkFileTimer);
            setMessage("");
            setCheckingFile(false);
            setSelectedFiles(null);
            document.getElementById("file-input-multiple").value = null;
            setActiveTab(1);
          }
        } catch (error) {
          console.error("Error checking file:", error);
        }
      }, 3000);

      if (resetTimer) {
        clearTimeout(resetTimer);
      }
      setResetTimer(checkFileTimer);
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage(`Error uploading file: ${error.message}`);
      setCheckingFile(false);
    }
  };

  useEffect(() => {
    return () => {
      if (resetTimer) {
        clearTimeout(resetTimer);
      }
    };
  }, [resetTimer]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="usa-form-group">
          <label className="usa-label" htmlFor="file-input-multiple">
            Choose files
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
          Upload Files
        </button>
        {message && !checkingFile && (
          <div className="usa-alert usa-alert--success">
            <div className="usa-alert__body">
              <h4 className="usa-alert__heading">Success</h4>
              <p className="usa-alert__text">{message}</p>
            </div>
          </div>

        )}
        {errorMessage && !checkingFile &&(
          <div class="usa-alert usa-alert--error" role="alert">
          <div class="usa-alert__body">
          <h4 className="usa-alert__heading">Error</h4>
          <p className="usa-alert__text">{errorMessage}</p>
          </div>
        </div>
        )}
        {checkingFile && (
          <div className="usa-alert usa-alert--info" role="alert">
            <div className="usa-alert__body">
              <h3 className="usa-alert__heading">Generating</h3>
              <p className="usa-alert__text">Please wait while your files are being processed.</p>
              <div className="usa-spinner" role="status">
                <span className="usa-sr-only">Generating...</span>
              </div>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default UploadDocs;
