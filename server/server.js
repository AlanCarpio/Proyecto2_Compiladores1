const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const TS  =  require('./Analizador/TablaSimb/TablaSimbolos');
const DeclareExpression = require("./Analizador/NonTerminal/DeclareExpression")
const parser = require('./Analizador2');
const AST = require('./Analizador/AST/AST')
const _ = require('lodash');
app.use(cors());
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.end("Bienvenidos")
})
app.post('/analizar',(req,res)=>{
   
        
    //var nombre = prompt("Por favor, ingresa tu texto:");
    AST.AST.getInstance().reiniciar()
    TS.TS.getInstance().reiniciar()
    const data = req.body;
    //console.log(data)
    //const data = nombre;
    const new_data = data.code.replace(/'/g,'"');
    let message = "";
    let string_json = "";
    let result = parser.parse(new_data)
    // **********************Codigo del AST
    let dot = "";
    let numero = AST.AST.getInstance().INSTRUCCIONES
    var INSTRUCCIONES = "INSTRUCCIONES"+numero;
    var INSTRUCCION = "INSTRUCCION"+numero
    dot += `"${INSTRUCCIONES}"[label = "INSTRUCCIONES"][shape = oval];\n`
    dot += `"${INSTRUCCION}"[label = "INSTRUCCION"][shape = oval];\n`
    dot += `"${INSTRUCCIONES}" -> "${INSTRUCCION}" ;\n`
    AST.AST.getInstance().Insertar(dot);
    AST.AST.getInstance().INSTRUCCION += 1;
    
    let Instrucciones = _.cloneDeep(result[0]);
    // Generador del codigo AST
    if(result[1].estaVacia()){
        for (const element of Instrucciones) {
            try {
                if(typeof element === "object" ){
                    element.AST(INSTRUCCION)
                }
                
            } catch (error) {
                console.error(error)
            }
            
        }
        //----------------------------------
        TS.TS.getInstance().reiniciar()
        Instrucciones = _.cloneDeep(result[0]);
        for (const element of Instrucciones) {
            if (element === ";"){
                string_json += "-----------------Se encontraron Errores--------------------"
                break
            }
            try {
                if(typeof element === "object" ){
                    string_json += element.Interpret()
                }
            } catch (error) {
                console.error(error)
                return
    
            }
        }
        message = "Analisis Hecho Exitosamente"
        
    }else{
        for (const element of Instrucciones) {
            try {
                if(typeof element === "object" ){
                    element.AST(INSTRUCCION)
                }
                
            } catch (error) {
                console.error(error)
            }
            
        }
        string_json += "Se encontraron Errores\n"
        string_json += "AST Generado"
        message = "Se han Encontrado Errores No me ponga 0 :("
    }
    let errores = result[1].ObtenerTablaErrores()
    AST.AST.getInstance().Finalizar();
    const jsonInfo = {
        Json:string_json,
        AST:AST.AST.getInstance().Get_Dot(),
        TS:TS.TS.getInstance().ObtenerTablaSimbolos(),
        TE:errores,
        Estado:message
    };
    
    const jsonString = JSON.stringify(jsonInfo);

  // Envía la cadena JSON como respuesta
   
  res.send(jsonString);

})
app.listen(5000,()=>{
    console.log("El servidor esta corriendo correctamente")
})
