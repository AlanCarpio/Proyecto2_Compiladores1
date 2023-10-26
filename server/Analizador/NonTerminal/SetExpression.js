const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
const AST  =  require("../AST/AST");
class SetExpression extends AbstractExpression.AbstractExpression{
    constructor(ID,valor,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
        this.valor = valor;
        
    }
    Interpret(){
        let val = this.valor;
        if(val === null){

        }
        else if (typeof val === "object"){
            val  = this.valor.Interpret()
        }
        TS.TS.getInstance().Modificar(this.ID,"Variable",val);
        return ""
    }
    AST(BLOQUE){
        let numero = AST.AST.getInstance().SET_VARIABLE
        var SET_VARIABLE = "SET_VARIABLE"+numero
        var SET = SET_VARIABLE+"SET"+numero
        var ID = SET_VARIABLE+"ID"+numero
        var ID_NOMBRE = SET_VARIABLE+"ID_NOMBRE"+numero
        var IGUAL = SET_VARIABLE+"IGUAL"+numero
        var VALOR = SET_VARIABLE+"VALOR"+numero
        let dot = "";
        dot += `"${SET_VARIABLE}"[label = "MODIFICACION VARIABLE"][shape = oval];\n`
        dot += `"${SET}"[label = "SET"][shape = oval];\n`
        dot += `"${ID}"[label = "ID"][shape = oval];\n`
        dot += `"${ID_NOMBRE}"[label = "@${this.ID}"][shape = oval];\n`
        dot += `"${IGUAL}"[label = "IGUAL"][shape = oval];\n`
        
        if(typeof this.valor === "object"){
            dot += `"${VALOR}"[label = "${this.valor.Interpret()}"][shape = oval];\n`
        }else{
            dot += `"${VALOR}"[label = "${this.valor}"][shape = oval];\n`
        }
        dot += `"${BLOQUE}" -> "${SET_VARIABLE}" ;\n`
        dot += `"${SET_VARIABLE}" -> "${SET}" ;\n`
        dot += `"${SET_VARIABLE}" -> "${ID}" ;\n`
        dot += `"${ID}" -> "${ID_NOMBRE}" ;\n`
        dot += `"${SET_VARIABLE}" -> "${IGUAL}" ;\n`
        dot += `"${SET_VARIABLE}" -> "${VALOR}" ;\n`
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().SET_VARIABLE += 1;
        if(typeof this.valor === "object" ){
            this.valor.AST(VALOR);
        }
    }
    
}
module.exports = {
    SetExpression
}