const AbstractExpression = require("../../Abstract/AbstractExpression");
const TS  =  require("../../TablaSimb/TablaSimbolos");
const AST = require("../../AST/AST")
class CaseAux extends AbstractExpression.AbstractExpression{
    constructor(condicionValor,tag,valorTHEN,fila,colummna){
        super(fila,colummna);
        this.condicionValor = condicionValor;
        this.tag = tag;
        this.valorTHEN= valorTHEN;
    }
    Interpret(){
        
        if(typeof this.condicionValor === "object"){
            this.condicionValor = this.condicionValor.Interpret()
        }
        if(typeof this.valorTHEN === "object"){
            this.condicionValor = this.condicionValor.Interpret()
        }
        const object = {
            "condicion_valor":this.condicionValor,
            "valor_then":this.valorTHEN
        }
        return object   
        
        
        
    }
    AST(BLOQUE){
        var numero = AST.AST.getInstance().CASEAUX
        var CASEAUX = "CASEAUX"+numero
        var WHEN = CASEAUX+"WHEN" + numero;
        var OPERADOR1 = CASEAUX+"OPERADOR1" + numero;
        var THEN = CASEAUX+"THEN" + numero;
        var OPERADOR2 = CASEAUX+"OPERADOR2" + numero;
        
        let dot = "";
        dot += `"${CASEAUX}"[label = "CASE WHEN"][shape = oval];\n`
        dot += `"${WHEN}"[label = "WHEN"][shape = oval];\n`
        dot += `"${OPERADOR1}"[label = "${this.condicionValor}"][shape = oval];\n`
        dot += `"${THEN}"[label = "THEN"][shape = oval];\n`
        dot += `"${OPERADOR2}"[label = "${this.valorTHEN}"][shape = oval];\n`
        
        
        dot += `"${BLOQUE}" -> "${CASEAUX}" ;\n`
        dot += `"${CASEAUX}" -> "${WHEN}" ;\n`
        dot += `"${CASEAUX}" -> "${OPERADOR1}" ;\n`
        dot += `"${CASEAUX}" -> "${THEN}" ;\n`
        dot += `"${CASEAUX}" -> "${OPERADOR2}" ;\n`

        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().CASEAUX += 1;
        if(typeof this.condicionValor === "object"){
            this.condicionValor.AST(OPERADOR1)
        }
        if(typeof this.valorTHEN === "object"){
            this.valorTHEN.AST(OPERADOR2)
        }
}
    
}
module.exports = {
    CaseAux
}