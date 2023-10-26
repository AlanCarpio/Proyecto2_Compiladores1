const AbstractExpression = require("../../Abstract/AbstractExpression");
const TS  =  require("../../TablaSimb/TablaSimbolos");
const AST = require("../../AST/AST")
class If extends AbstractExpression.AbstractExpression{
    constructor(condicion,tag,instrucciones,instrucciones_else,fila,colummna){
        super(fila,colummna);
        this.condicion = condicion;
        this.tag = tag;
        this.instrucciones = instrucciones;
        this.instrucciones_else = instrucciones_else
    }
    Interpret(){
        //console.log(this.condicion)
        
        if (this.tag === "SOLO"){
            if (this.condicion.Interpret()){
                let string_json = "";
                for (const iterator of this.instrucciones) {
                    string_json += iterator.Interpret()
                }
                return string_json;
            }else{
                return ""
            }
        }
        else{
            if (this.condicion.Interpret()){
                let string_json = "";
                for (const iterator of this.instrucciones) {
                    string_json += iterator.Interpret();
                }
                return string_json;
            }else{
                let string_json = "";
                for (const iterator of this.instrucciones_else) {
                    string_json += iterator.Interpret();
                }
                return string_json;
                
            }
        }
        
    }
    AST(BLOQUE){
        if (this.tag === "SOLO"){
            var numero = AST.AST.getInstance().IF
            var CONTROL_IF = "CONTROL_IF"+numero
            var IF = CONTROL_IF+"IF" + numero;
            var CONDICION = CONTROL_IF+"CONDICION" + numero;
            var THEN = CONTROL_IF+"THEN" + numero;
            var BEGIN = CONTROL_IF+"BEGIN" + numero;
            var INSTRUCCIONES = CONTROL_IF+"INSTRUCCIONES" + numero;
            var END = CONTROL_IF+"END" + numero;

            
            var dot = "";
            dot += `"${CONTROL_IF}"[label = "CONTROL IF"][shape = oval];\n`
            dot += `"${IF}"[label = "IF"][shape = oval];\n`
            dot += `"${CONDICION}"[label = "CONDICION"][shape = oval];\n`
            dot += `"${THEN}"[label = "THEN"][shape = oval];\n`
            dot += `"${BEGIN}"[label = "BEGIN"][shape = oval];\n`
            dot += `"${INSTRUCCIONES}"[label = "INSTRUCCIONES"][shape = oval];\n`
            dot += `"${END}"[label = "END"][shape = oval];\n`
            
            
            dot += `"${BLOQUE}" -> "${CONTROL_IF}" ;\n`
            dot += `"${CONTROL_IF}" -> "${IF}" ;\n`
            dot += `"${CONTROL_IF}" -> "${CONDICION}" ;\n`
            dot += `"${CONTROL_IF}" -> "${THEN}" ;\n`
            dot += `"${CONTROL_IF}" -> "${BEGIN}" ;\n`
            dot += `"${CONTROL_IF}" -> "${INSTRUCCIONES}" ;\n`
            dot += `"${CONTROL_IF}" -> "${END}" ;\n`

            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().IF += 1;
            this.condicion.AST(CONDICION)
            for (const iterator of this.instrucciones) {
                if(typeof iterator === "object"){
                    iterator.AST(INSTRUCCIONES);
                }
                
            }

            return
        }
        else{
            var numero = AST.AST.getInstance().IF
            var CONTROL_IF = "CONTROL_IF"+numero
            var IF = CONTROL_IF+"IF" + numero;
            var CONDICION = CONTROL_IF+"CONDICION" + numero;
            var THEN = CONTROL_IF+"THEN" + numero;
            var INSTRUCCIONES = CONTROL_IF+"INSTRUCCIONES" + numero;
            var ELSE = CONTROL_IF+"ELSE"+numero;
            var INSTRUCCIONES2 = CONTROL_IF+"INSTRUCCIONES2" + numero;
            var END_ID = CONTROL_IF+"END_ID" + numero;
            
            var dot = "";
            dot += `"${CONTROL_IF}"[label = "CONTROL IF"][shape = oval];\n`
            dot += `"${IF}"[label = "IF"][shape = oval];\n`
            dot += `"${CONDICION}"[label = "CONDICION"][shape = oval];\n`
            dot += `"${THEN}"[label = "THEN"][shape = oval];\n`
            dot += `"${INSTRUCCIONES}"[label = "INSTRUCCIONES"][shape = oval];\n`
            dot += `"${ELSE}"[label = "ELSE"][shape = oval];\n`
            dot += `"${INSTRUCCIONES2}"[label = "INSTRUCCIONES"][shape = oval];\n`
            dot += `"${END_ID}"[label = "END IF"][shape = oval];\n`
            
            
            dot += `"${BLOQUE}" -> "${CONTROL_IF}" ;\n`
            dot += `"${CONTROL_IF}" -> "${IF}" ;\n`
            dot += `"${CONTROL_IF}" -> "${CONDICION}" ;\n`
            dot += `"${CONTROL_IF}" -> "${THEN}" ;\n`
            dot += `"${CONTROL_IF}" -> "${INSTRUCCIONES}" ;\n`
            dot += `"${CONTROL_IF}" -> "${ELSE}" ;\n`
            dot += `"${CONTROL_IF}" -> "${INSTRUCCIONES2}" ;\n`
            dot += `"${CONTROL_IF}" -> "${END_ID}" ;\n`

            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().IF += 1;
            this.condicion.AST(CONDICION)
            for (const iterator of this.instrucciones) {
                if(typeof iterator === "object"){
                    iterator.AST(INSTRUCCIONES);
                }
                
            }
            for (const iterator of this.instrucciones_else) {
                if(typeof iterator === "object"){
                    iterator.AST(INSTRUCCIONES2);
                }
            }
            return
        }
    }
    
}
module.exports = {
    If
}