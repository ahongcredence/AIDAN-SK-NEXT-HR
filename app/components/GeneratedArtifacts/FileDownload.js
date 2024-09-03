import React from 'react';

const FileDownload = ({ file }) => {
  if (!file || !file.downloadLink) return null;

  return (
    <a href={file.downloadLink} download className="usa-button">
      Download 
    </a>
  );
};

export default FileDownload;
