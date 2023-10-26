import { useState } from "react";
import styled from "styled-components";
import TableSimbols from "../components/TableSimbols"
import TableErros from "../components/TableErrors"
import DotRenderer from "../components/DotRenderer"
import Interpretador from "../components/Interpretador"

export function Tabs({out,onChange,handleClick,handleGenerate,DOT,code,fileContent,setFileContent,dataTS,dataTE}) {
  const [activeTab, setactiveTab] = useState(0);
  const seleccionar = (index) => {
    setactiveTab(index);
  };
  return (
    <Container activeTab={`${activeTab}00%`}>
      <ul className="tabs">
        <li
          className={activeTab === 0 ? "active" : ""}
          onClick={() => seleccionar(0)}
        > <h5>Editor de Codigo</h5>
          
        </li>
        <li
          className={activeTab === 1 ? "active" : ""}
          onClick={() => seleccionar(1)}
        > <h5>Tabla de Simbolos</h5>
          
        </li>
        <li
          className={activeTab === 2 ? "active" : ""}
          onClick={() => seleccionar(2)}
        > <h5>Tabla de Errores</h5>
          
        </li>
        <li
          className={activeTab === 3 ? "active" : ""}
          onClick={() => seleccionar(3)}
        > <h5>AST</h5>
          
        </li>
        <span className="indicador"></span>
      </ul>
      <div className="tab-content">
        {activeTab === 0 &&  <Interpretador out={out} onChange2={onChange} handleClick2={handleClick} handleGenerate2={handleGenerate} code={code} fileContent={fileContent} setFileContent={setFileContent}/>}
        {activeTab === 1 && <TableSimbols data={dataTS}/>}
        {activeTab === 2 && <TableErros data={dataTE}/>}
        {activeTab === 3 && <DotRenderer dotCode={DOT}/>}
      </div>
    </Container>
  );
}

const Container = styled.div`
position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color:rgb(32,32,32);
  padding:20px;
  color:#0f0f0f;
  .tabs{
    list-style: none;
    display: flex;
    box-shadow: 0px 10px 20px -3px rgba(0, 0, 0, 0.1);
    background-color: #202020;
    position: relative;
    border-radius: 100px;
    justify-content: space-between;
    top: 0;
    left: 0;
    color: #fff;
    
    li{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 54px;
      width: 150px;
      font-size: 1.25rem;
      font-weight: 500;
      cursor: pointer;
      z-index: 2;
      
    }
    .indicador {
      position: absolute;
      display: flex;
      height: 54px;
      width: 150px;
      background-color: #7425CF;
      z-index: 1;
      border-radius: 99px;
      transition: 0.25s ease-out;
      box-shadow: 0px 10px 20px -3px #7425CF;
      transform: translateX(${(props) => props.activeTab});
    }
  }
  .tab-content {
    position: relative;
    border-radius: 6px;
    margin-top: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items:center;
    font-size:3rem;
  }
  h5{
    font: oblique bold 70% cursive;
  }

`;