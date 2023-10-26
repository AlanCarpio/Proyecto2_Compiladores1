import styled from "styled-components";
import { Tabs } from "./components/Tabs";
import React, { useState , useEffect} from 'react'

import fileDownload from 'js-file-download';
function App2() {
    const [code, setCode] = useState('');
    const [out, setOut] = useState('');
    const [ast, setAst] = useState('');
    const [dataTS,setdataTS] = useState('');
    const [dataER,setdataER] = useState('');
    const [Estado,setEstado] = useState('');
    const [fileContent, setFileContent] = useState(''); // Estado para almacenar el contenido del archivo cargado
    const onChange = React.useCallback((value, ViewUpdate) => {
      setCode(value);
    }, []);
  
    useEffect(() => {
      if (Estado) {
        const timeoutId = setTimeout(() => {
          setEstado(''); // Cierra el popup después de 3 segundos
        }, 3000);
  
        return () => clearTimeout(timeoutId); // Limpia el timeout si el componente se desmonta
      }
    }, [Estado]);
    const handleClick = () => {
      fetch('http://localhost:5000/analizar', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          "code": code
        })
      })
      .catch(error => {
        console.error('Error en la solicitud fetch:', error);
        setOut("Hay ocurrido un Problema :(")
        // Manejar errores aquí
      })
      .then(res => {
        if (res) {
          return res.json();
        } else {
          setOut("Hay ocurrido un Problema :(")
          throw new Error("La respuesta está vacía o no es válida");
          
        }
      })
      .then(data => {
        
        if(data !== undefined){
          setOut(data.Json)
          setAst(data.AST)
          setdataTS(data.TS)
          setdataER(data.TE)
          setEstado(data.Estado)
        }else{
          setOut("Hay ocurrido un Problema :(")
        }
        
        
      }
      );
    }
  
    const handleGenerate = () => {
      fileDownload(ast, "test.dot");
      
    }
    return (
    <Container>
      {/* Renderizar el mensaje emergente condicionalmente */}
      <Popup hidden={!Estado}>{Estado}</Popup>
      <Tabs out={out} onChange={onChange} handleClick={handleClick} handleGenerate={handleGenerate} DOT={ast} code={code} fileContent={fileContent} setFileContent={setFileContent} dataTS={dataTS} dataTE={dataER}/>
    </Container>
  );
}
// CAsi terminado
const Container = styled.main`
  height: 100vh;
`;
const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(116,37,207);
  padding: 20px;
  box-shadow: 0px 10px 20px -3px #7425CF;
  z-index: 1000;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  transition: all 0.3s;
  
  // Agrega estilos específicos para el cierre automático
  opacity: ${props => props.hidden ? 0 : 1};
  visibility: ${props => props.hidden ? "hidden" : "visible"};
`;
export default App2;