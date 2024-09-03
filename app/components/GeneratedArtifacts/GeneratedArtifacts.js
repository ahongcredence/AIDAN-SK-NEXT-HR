import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const GeneratedArtifacts = ({ setActiveTab, fileName }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  console.log("files", files);

  const fetchFiles = async () => {
    try {
      // const folderName = "TechChallenge Team2 20240517 (003)_d3c5a4f8-9b3f-41d6-8d6e-3a0b3e5c8b50"; 

      const response = await fetch(
        `/api/generate?folderName=${encodeURIComponent(fileName)}`
      );
      // const response = await fetch(`/api/generate?folderName=${encodeURIComponent(folderName)}`);

      const data = await response.json();
      // data.files.filter((y)=> y.name === "agents_done.txt").length > 0
      setFiles(data.files);
    } catch (error) {
      console.error("Error fetching generated artifacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log(files.filter((y)=> y.name === "agents_done.txt").length < 0, ".....")
    if (!files?.some((y) => y.name === "agents_done.txt")) {
      setIsInProgress(true);
      fetchFiles();
    } else setIsInProgress(false);
  }, [files]);

  const handleFileClick = (file, index) => {
    setSelectedFile(file);
    setSelectedRow(index)
  };

  const handleClose = () => {
    setSelectedFile(null);
  };

  return (
    <div>
      <div className="w-full">
        {loading && (
          <div className="usa-alert usa-alert--info" role="alert">
            <div className="usa-alert__body">
              <h3 className="usa-alert__heading">Loading</h3>
              <p className="usa-alert__text">
                Please wait while the generated artifacts are being loaded.
              </p>
              <div className="usa-spinner" role="status">
                <span className="usa-sr-only">Loading...</span>
              </div>
            </div>
          </div>
        )}
        {!loading && isInProgress && fileName && (
          <div className="usa-alert usa-alert--info" role="alert">
            <div className="usa-alert__body">
              <h3 className="usa-alert__heading">Loading</h3>
              <p className="usa-alert__text">
                We're almost there! Please bear with us while we finish
                generating.
              </p>
              <div className="usa-spinner" role="status">
                <span className="usa-sr-only">Loading...</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          {!loading && (
            <div
              className="usa-table-container"
              style={{
                overflowY: "auto",
                maxHeight: "470px",
              }}
            >
              <table className="usa-table" style={{ marginTop: 0 }}>
                <thead>
                  <tr>
                    <th scope="col">File Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files?.length > 0 ? (
                    files?.map(
                      (file, index) =>
                        file.name !== "agents_done.txt" && (
                          <tr
                            key={index}
                            onClick={() => handleFileClick(file, index)}
                            style={{ cursor: "pointer" }}
                          >
                            <td
                              style={{
                                backgroundColor:
                                  selectedRow === index ? "#cde8ff" : "",
                              }}
                            >
                              {file.name}
                            </td>
                            <td
                              style={{
                                backgroundColor:
                                  selectedRow === index ? "#cde8ff" : "",
                              }}
                            >
                              {file.type === "download" ||
                              file.type === "text" ? (
                                <a
                                  href={file.downloadLink}
                                  download
                                  className="usa-button"
                                  style={{ margin: 0 }}
                                >
                                  <FontAwesomeIcon icon={faDownload} />
                                </a>
                              ) : (
                                <button
                                  className="usa-button usa-button--secondary"
                                  onClick={() => handleFileClick(file)}
                                >
                                  View
                                </button>
                              )}
                            </td>
                          </tr>
                        )
                    )
                  ) : (
                    <tr>
                      <td colSpan="2">No generated artifacts available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div>
            {!loading && (
              <div>
                {selectedFile && (
                  <>
                    {selectedFile.type === "text" ? (
                      <div
                        className="usa-card__container"
                        style={{
                          overflowX: "auto",
                          overflowY: "auto",
                          maxHeight: "470px",
                        }}
                      >
                        <pre style={{ whiteSpace: "pre-wrap" }}>
                          {selectedFile.content}
                        </pre>
                      </div>
                    ) : selectedFile.mimeType.startsWith("image/") ? (
                      <img
                        src={`data:${selectedFile.mimeType};base64,${selectedFile.content}`}
                        alt={selectedFile.name}
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    ) : (
                      <p className="flex h-[470px] justify-center items-center">
                        This file cannot be displayed.
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedArtifacts;
