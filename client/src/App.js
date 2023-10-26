import React, { useState } from 'react'
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { oneDarkTheme } from '@uiw/react-codemirror';
import { javaLanguage } from '@codemirror/lang-java';
import fileDownload from 'js-file-download';
import './App.css'


function App({out,onChange2,handleClick2,handleGenerate2,code}) {

  const onchange2_ = onChange2;

  return (
    <div className='container'>
      <div className="editors">
        <CodeMirror
          className='cm1'
          value={code}
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
      <div className='button'>
          <button className='btn1' onClick={handleClick2}> Interpretar </button>
          <button className='btn2' onClick={handleGenerate2}> Generar AST </button>
      </div>
    </div>
  )
}

export default App;
