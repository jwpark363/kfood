import { useState } from 'react';

const FileDropZone = () => {
  const [droppedFiles, setDroppedFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    setDroppedFiles(files);

    // 서버 업로드 예시 (선택 사항)
    // const formData = new FormData();
    // files.forEach(file => formData.append('files[]', file));
    // fetch('/upload', {
    //   method: 'POST',
    //   body: formData,
    // });
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        width: '100%',
        height: '200px',
        border: '2px dashed #aaa',
        borderRadius: '8px',
        textAlign: 'center',
        lineHeight: '200px',
        color: '#555',
        backgroundColor: '#f9f9f9',
        marginBottom: '20px',
      }}
    >
      여기에 파일을 드래그하세요
      {droppedFiles.length > 0 && (
        <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
          {droppedFiles.map((file, index) => (
            <li key={index} style={{ fontSize: '14px' }}>
              📄 {file.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileDropZone;
