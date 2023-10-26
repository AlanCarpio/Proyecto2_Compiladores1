const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
const AST  =  require("../AST/AST");
class BloqueExpression extends AbstractExpression.AbstractExpression{
    constructor(Instrucciones,childs,fila,colummna){
        super(fila,colummna);
        this.Instrucciones = Instrucciones;
        this.childs = childs
        
    }
    Interpret(){
        
        let string_json = "";
        for (const iterator of this.Instrucciones) {
            string_json += iterator.Interpret();
        }
        return string_json;
    }
    AST(BLOQUE){
        let numero = AST.AST.getInstance().BLOQUEBEGIN
        let numero2 = AST.AST.getInstance().INSTRUCCION
        
        var BLOQUE_BEGIN = "BLOQUE_BEGIN"+numero
        var BEGIN = BLOQUE_BEGIN+"BEGIN" + numero;
        var INSTRUCCION = "INSTRUCCION"+numero2;
        var END = BLOQUE_BEGIN+"END" + numero;
        let dot = "";
        dot += `"${BLOQUE_BEGIN}"[label = "BLOQUE_BEGIN"][shape = oval];\n`
        dot += `"${BEGIN}"[label = "BEGIN"][shape = oval];\n`
        dot += `"${INSTRUCCION}"[label = "INSTRUCCION"][shape = oval];\n`
        dot += `"${END}"[label = "END"][shape = oval];\n`
        dot += `"${BLOQUE}" -> "${BLOQUE_BEGIN}" ;\n`
        dot += `"${BLOQUE_BEGIN}" -> "${BEGIN}" ;\n`
        dot += `"${BLOQUE_BEGIN}" -> "${INSTRUCCION}" ;\n`
        dot += `"${BLOQUE_BEGIN}" -> "${END}" ;\n`
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().BLOQUEBEGIN += 1;
        AST.AST.getInstance().INSTRUCCION += 1;
        for (const iterator of this.Instrucciones) {
            //console.log(iterator)
            if(typeof iterator === "object"){
                iterator.AST(INSTRUCCION);
            }
        }

    }
    
}
module.exports = {
    BloqueExpression
}