
const AbstractExpression = require("../../Abstract/AbstractExpression");
const Break = require("../Flujo/Break")
const Continue = require("../Flujo/Continue")
const AST = require("../../AST/AST")
class Flujo extends AbstractExpression.AbstractExpression{
    constructor(tag,fila,colummna){
        super(fila,colummna);
        this.tag = tag;
    }
    Interpret(){
        if(this.tag === "break"){
            
            return "break"
        }else{
            return "continue"
        }
    }
    AST(BLOQUE){
        
        var numero = AST.AST.getInstance().FLUJO
        var SENTENCIA_FLUJO = "FLUJO"+numero
        var FLUJO = SENTENCIA_FLUJO+"FLUJO" + numero;

        let dot = "";
        dot += `"${FLUJO}"[label = "${this.tag.toUpperCase()}"][shape = oval];\n`

        dot += `"${BLOQUE}" -> "${FLUJO}" ;\n`

        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().FLUJO += 1;
        
    }
}
module.exports = {
    Flujo
}