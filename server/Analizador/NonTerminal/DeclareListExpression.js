const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
class DeclareListExpression extends AbstractExpression.AbstractExpression{
    constructor(list_variables,fila,colummna){
        super(fila,colummna);
        this.list_variables = list_variables
    }
    Interpret(){
        for (const iterator of this.list_variables) {
            iterator.Interpret();
        }
        return ""
    }
    AST(BLOQUE){
        for (const iterator of this.list_variables) {
            iterator.AST(BLOQUE);
        }
    }
    
}
module.exports = {
    DeclareListExpression
}