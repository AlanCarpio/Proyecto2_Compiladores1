const AbstractExpression = require("../../Abstract/AbstractExpression");
const TS  =  require("../../TablaSimb/TablaSimbolos");
const AST = require("../../AST/AST")
const Break = require("../../Terminal/Flujo/Break")
const Continue = require("../../Terminal/Flujo/Continue")
const _ = require('lodash');
class While extends AbstractExpression.AbstractExpression{
    constructor(condicion,instrucciones,fila,colummna){
        super(fila,colummna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        
        
    }
    Interpret(){
        let string_json = "";
        let InstruccionesAux = _.cloneDeep(this.instrucciones);
        let CondicionAux = _.cloneDeep(this.condicion);
        
        while (CondicionAux.Interpret()) {
            for (const iterator of InstruccionesAux) {
                let result = iterator.Interpret()
                
                if (result === "break"){
                    console.log(result)
                    return string_json
                }
                else if(result === "continue"){
                    break
                }
                else{
                    string_json += result
                }
            }
            CondicionAux = _.cloneDeep(this.condicion);
            InstruccionesAux = _.cloneDeep(this.instrucciones);
            
        }
       
        
        return string_json
        
    }
    AST(BLOQUE){
        var numero = AST.AST.getInstance().WHILE
        var SENTENCIA_WHILE = "SENTENCIA_WHILE"+numero
        var WHILE = SENTENCIA_WHILE+"WHILE" + numero;
        var RELACIONALES = SENTENCIA_WHILE+"RELACIONALES" + numero;
        var BEGIN = SENTENCIA_WHILE+"BEGIN" + numero;
        var INSTRUCCIONES = SENTENCIA_WHILE+"INSTRUCCIONES" + numero;
        var END = SENTENCIA_WHILE+"END" + numero;
        
        let dot = "";
        dot += `"${SENTENCIA_WHILE}"[label = "SENTECIA WHILE"][shape = oval];\n`
        dot += `"${WHILE}"[label = "WHILE"][shape = oval];\n`
        dot += `"${RELACIONALES}"[label = "RELACIONAL"][shape = oval];\n`
        dot += `"${BEGIN}"[label = "BEGIN"][shape = oval];\n`
        dot += `"${INSTRUCCIONES}"[label = "INSTRUCCION"][shape = oval];\n`
        dot += `"${END}"[label = "END"][shape = oval];\n`
        
        dot += `"${BLOQUE}" -> "${SENTENCIA_WHILE}" ;\n`
        dot += `"${SENTENCIA_WHILE}" -> "${WHILE}" ;\n`
        dot += `"${SENTENCIA_WHILE}" -> "${RELACIONALES}" ;\n`
        dot += `"${SENTENCIA_WHILE}" -> "${BEGIN}" ;\n`
        dot += `"${SENTENCIA_WHILE}" -> "${INSTRUCCIONES}" ;\n`
        dot += `"${SENTENCIA_WHILE}" -> "${END}" ;\n`
        
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().WHILE += 1;

        let InstruccionesAux = _.cloneDeep(this.instrucciones);
        let CondicionAux = _.cloneDeep(this.condicion);
        CondicionAux.AST(RELACIONALES)
        
        for (const iterator of InstruccionesAux) {
            if(typeof iterator === "object"){
                iterator.AST(INSTRUCCIONES)
            }
            
        }
        
    }
}
module.exports = {
    While
}