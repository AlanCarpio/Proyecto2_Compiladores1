const AbstractExpression = require("../Abstract/AbstractExpression");
const AST = require('../AST/AST')
const TS  =  require("../TablaSimb/TablaSimbolos");
class RelacionalesExpression extends AbstractExpression.AbstractExpression{
    constructor(Tag,OperadorRelacional,valor1,valor2,fila,colummna){
        super(fila,colummna);
        this.Tag = Tag;
        this.OperadorRelacional = OperadorRelacional;
        this.valor1 = valor1;
        this.valor2 = valor2;
    }
    Interpret(){
        if (typeof this.valor1 === "object"){
            this.valor1 = this.valor1.Interpret()
        }
        if (typeof this.valor2 === "object"){
            this.valor2 = this.valor2.Interpret()
        }
        if (this.Tag === "Where"){
            switch (this.OperadorRelacional) {
                case "=":
                    var Object = {
                        "operador":"=",
                        "columna":this.valor1,
                        "valor":this.valor2
                    }
                    return Object
                case "!=":
                    var Object = {
                        "operador":"!=",
                        "columna":this.valor1,
                        "valor":this.valor2
                    }
                    return Object
                case "<":
                    var Object = {
                        "operador":"<",
                        "columna":this.valor1,
                        "valor":this.valor2
                    }
                    return Object
                case "<=":
                    var Object = {
                        "operador":"<=",
                        "columna":this.valor1,
                        "valor":this.valor2
                    }
                    return Object
                case ">":
                    var Object = {
                        "operador":">",
                        "columna":this.valor1,
                        "valor":this.valor2
                    }
                    return Object
                case ">=":
                    var Object = {
                        "operador":">=",
                        "columna":this.valor1,
                        "valor":this.valor2
                    }
                    return Object
                default:
                    break;
            }
        }
        else{
            if (typeof this.valor1 === "object"){
                this.valor1 = this.valor1.Interpret()
            }
            if (typeof this.valor2 === "object"){
                this.valor2 = this.valor2.Interpret()
            }
            switch (this.OperadorRelacional) {
                case "=":
                    return this.valor1 === this.valor2
                case "!=":
                    return this.valor1 != this.valor2
                case "<":
                    return this.valor1 < this.valor2
                case "<=":
                    return this.valor1 <= this.valor2
                case ">":
                    return this.valor1 > this.valor2
                case ">=":
                    return this.valor1 >= this.valor2
                default:
                    break;
            }
        }
        
    }
    toString(){
        return "RELACIONAL"
    }
    AST(BLOQUE){
        
        if (this.Tag === "Where"){
            var numero = AST.AST.getInstance().OPERACIONESRELA;
            var OPERADOR_RELACIONAL = "OPERADOR_RELACIONAL" + numero;
            var VALOR1 = OPERADOR_RELACIONAL+"VALOR1" + numero;
            var VALOR2 = OPERADOR_RELACIONAL+"VALOR2" + numero;
            var OPERADOR = OPERADOR_RELACIONAL+"OPERADOR" + numero;
            

            let dot = "";
            dot += `"${OPERADOR_RELACIONAL}"[label = "RELACIONAL"][shape = oval];\n`
            dot += `"${VALOR1}"[label = "${this.valor1}"][shape = oval];\n`
            dot += `"${OPERADOR}"[label = "${this.OperadorRelacional}"][shape = oval];\n`
            dot += `"${VALOR2}"[label = "${this.valor2}"][shape = oval];\n`
            
            
            
            
            dot += `"${BLOQUE}" -> "${OPERADOR_RELACIONAL}" ;\n`
            dot += `"${OPERADOR_RELACIONAL}" -> "${VALOR1}" ;\n`
            dot += `"${OPERADOR_RELACIONAL}" -> "${OPERADOR}" ;\n`
            dot += `"${OPERADOR_RELACIONAL}" -> "${VALOR2}" ;\n`
            
            
            
            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().OPERACIONESRELA += 1;
            if(typeof this.valor1 === "object"){
                this.valor1.AST(VALOR1)
            }
            if(typeof this.valor2 === "object"){
                this.valor2.AST(VALOR2)
            }
        
        }
        else{
            var numero = AST.AST.getInstance().OPERACIONESRELA;
            var OPERADOR_RELACIONAL = "OPERADOR_RELACIONAL" + numero;
            var VALOR1 = OPERADOR_RELACIONAL+"VALOR1" + numero;
            var VALOR2 = OPERADOR_RELACIONAL+"VALOR2" + numero;
            var OPERADOR = OPERADOR_RELACIONAL+"OPERADOR" + numero;
            

            let dot = "";
            dot += `"${OPERADOR_RELACIONAL}"[label = "OPERADOR RELACIONAL"][shape = oval];\n`
            dot += `"${VALOR1}"[label = "${this.valor1}"][shape = oval];\n`
            dot += `"${OPERADOR}"[label = "${this.OperadorRelacional}"][shape = oval];\n`
            dot += `"${VALOR2}"[label = "${this.valor2}"][shape = oval];\n`
            
            
            
            
            
            dot += `"${BLOQUE}" -> "${OPERADOR_RELACIONAL}" ;\n`
            dot += `"${OPERADOR_RELACIONAL}" -> "${VALOR1}" ;\n`
            dot += `"${OPERADOR_RELACIONAL}" -> "${OPERADOR}" ;\n`
            dot += `"${OPERADOR_RELACIONAL}" -> "${VALOR2}" ;\n`
            
            
            
            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().OPERACIONESRELA += 1;
            if(typeof this.valor1 === "object"){
                this.valor1.AST(VALOR1)
            }
            if(typeof this.valor2 === "object"){
                this.valor2.AST(VALOR2)
            }
        }
    }
    
}
module.exports = {
    RelacionalesExpression
}