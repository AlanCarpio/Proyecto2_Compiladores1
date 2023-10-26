import React, { useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDarkTheme } from '@uiw/react-codemirror';
import { javaLanguage } from '@codemirror/lang-java';
import fileDownload from 'js-file-download';
import '../App.css';
import Button from '@mui/material/Button';

const buttonStyle = {
  backgroundColor: 'rgb(116,37,207)',
  color: 'white',
  borderRadius: '100px',
  boxShadow: '0px 10px 20px -3px #7425CF',
  
  padding: '10px 20px',
  margin: '0 10px',
  cursor: 'pointer',
  font: "oblique bold 32% cursive",
};

function Interpretador({ out, onChange2, handleClick2, handleGenerate2, code, fileContent, setFileContent }) {
  const onchange2_ = onChange2;

  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFileContent(e.target.result);
      };

      reader.readAsText(file);
    }
  };

  const handleClickFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='container'>
      <div className='app-bar'>
        <Button style={buttonStyle} onClick={handleClick2}>
          Interpretar
        </Button>
        <Button style={buttonStyle} onClick={handleGenerate2}>
          Generar AST
        </Button>
        <Button style={buttonStyle} onClick={handleClickFileInput}>
          Cargar Archivo
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </Button>
        <Button style={buttonStyle}>
          Guardar Como
        </Button>
      </div>
      <div className="editors">
        <CodeMirror
          className='cm1'
          value={fileContent || code}
          width='100%'
          height='100%'
          theme={oneDarkTheme}
          extensions={[javaLanguage]}
          onChange={onchange2_}
        />

        <CodeMirror
          className='cm2'
          value={out}
          width='100%'
          height='100%'
          readOnly='true'
          theme={oneDarkTheme}
        />
      </div>
    </div>
  );
}

export default Interpretador;