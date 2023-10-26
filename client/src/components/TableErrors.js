import React, { useState, useEffect } from "react";
import { oneDarkTheme } from '@uiw/react-codemirror';
import { javaLanguage } from '@codemirror/lang-java';
import "..//CSS/TableSimbols.css"
import CodeMirror from '@uiw/react-codemirror';


const Table = ({data}) => {
  

  return (
    <div className="editors">
        <CodeMirror 
          className='centered-codemirror'
          value={data}
          width='100%'
          height='100%'
          readOnly='false'
          theme={oneDarkTheme}
        />
    </div>
  );
};


export default Table;