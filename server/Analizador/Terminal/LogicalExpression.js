const AbstractExpression = require("../Abstract/AbstractExpression");
const AST = require('../AST/AST')
class LogicalExpression extends AbstractExpression.AbstractExpression{
    constructor(OperadorLogico,Relacional1,Relacional2,fila,colummna){
        super(fila,colummna);
        this.OperadorLogico = OperadorLogico;
        this.Relacional1 = Relacional1;
        this.Relacional2 = Relacional2;
    }
    Interpret(){
        let relacional1 = this.Relacional1.Interpret()
        let relacional2 = null;
        if (this.Relacional2 === null){
            
        }
        else{
            relacional2 = this.Relacional2.Interpret()
        }
        switch (this.OperadorLogico) {
            case "and":
                return relacional1 && relacional2
                
            case "or":
                return relacional1 || relacional2
                
            case "not":
                return ! relacional1
        
            default:
                break;
        }
        
    }
    toString(){
        return "LOGICO"
    }
    AST(BLOQUE){
        
        var numero = AST.AST.getInstance().LOGICAS;
        var OPERADOR_LOGICO = "OPERADOR_LOGICO" + numero;
        var RELACIONAL1 = OPERADOR_LOGICO+"RELACIONAL1" + numero;
        var RELACIONAL2 = OPERADOR_LOGICO+"RELACIONAL2" + numero;
        var OPERADOR_L = OPERADOR_LOGICO+"OPERADOR" + numero;
        

        let dot = "";
        dot += `"${OPERADOR_LOGICO}"[label = "OPERADOR lOGICO"][shape = oval];\n`
        dot += `"${RELACIONAL1}"[label = "RELACIONAL"][shape = oval];\n`
        dot += `"${OPERADOR_L}"[label = "${this.OperadorLogico.toUpperCase()}"][shape = oval];\n`
        dot += `"${RELACIONAL2}"[label = "RELACIONAL"][shape = oval];\n`
        
        
        
        
        
        dot += `"${BLOQUE}" -> "${OPERADOR_LOGICO}" ;\n`
        dot += `"${OPERADOR_LOGICO}" -> "${RELACIONAL1}" ;\n`
        dot += `"${OPERADOR_LOGICO}" -> "${OPERADOR_L}" ;\n`
        dot += `"${OPERADOR_LOGICO}" -> "${RELACIONAL2}" ;\n`
        
        
        
        
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().LOGICAS += 1;
        
        if(typeof this.Relacional1 === "object"){
            this.Relacional1.AST(RELACIONAL1)
        }
        if(typeof this.Relacional2 === "object"){
            this.Relacional2.AST(RELACIONAL2)
        }
        
        
    }
    
}
module.exports = {
    LogicalExpression
}