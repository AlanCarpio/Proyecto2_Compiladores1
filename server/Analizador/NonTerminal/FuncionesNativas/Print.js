const AbstractExpression = require("../../Abstract/AbstractExpression");
const TS  =  require("../../TablaSimb/TablaSimbolos");
const AST = require("../../AST/AST")
class Print extends AbstractExpression.AbstractExpression{
    constructor(instrucciones,fila,colummna){
        super(fila,colummna);
        this.instrucciones = instrucciones;
        
    }
    Interpret(){
        var stringjson = "";
        
        if (typeof this.instrucciones === "object") {
            stringjson += this.instrucciones.Interpret()+"\n"
        }else{
            stringjson  += this.instrucciones+"\n"
            
        }
        
        return stringjson;
    }
    AST(BLOQUE){
        if (typeof this.instrucciones === "object"){
            
            var numero = AST.AST.getInstance().PRINT
            var PRINT_SENTECIA = "SENTECIAPRINT"+numero
            var PRINT = PRINT_SENTECIA+"PRINT" + numero;
            var instruccion = PRINT+"instruccion" + numero;
            let dot = "";
            dot += `"${PRINT_SENTECIA}"[label = "INSTRUCCION PRINT"][shape = oval];\n`
            dot += `"${PRINT}"[label = "PRINT"][shape = oval];\n`
            dot += `"${instruccion}"[label = "instruccion"][shape = oval];\n`

            dot += `"${BLOQUE}" -> "${PRINT_SENTECIA}" ;\n`
            dot += `"${PRINT_SENTECIA}" -> "${PRINT}" ;\n`
            dot += `"${PRINT_SENTECIA}" -> "${instruccion}" ;\n`

            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().PRINT += 1;
            this.instrucciones.AST(instruccion)
        }
        else{
            
            var numero = AST.AST.getInstance().PRINT
            var PRINT_SENTECIA = "SENTECIAPRINT"+numero
            var PRINT = PRINT_SENTECIA+"PRINT" + numero;
            var instruccion = PRINT+"instruccion" + numero;
            let dot = "";
            dot += `"${PRINT_SENTECIA}"[label = "INSTRUCCION PRINT"][shape = oval];\n`
            dot += `"${PRINT}"[label = "PRINT"][shape = oval];\n`
            dot += `"${instruccion}"[label = "${this.instrucciones}"][shape = oval];\n`

            dot += `"${BLOQUE}" -> "${PRINT_SENTECIA}" ;\n`
            dot += `"${PRINT_SENTECIA}" -> "${PRINT}" ;\n`
            dot += `"${PRINT_SENTECIA}" -> "${instruccion}" ;\n`

            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().PRINT += 1;
            
        }
        
    }
    
}
module.exports = {
    Print
}