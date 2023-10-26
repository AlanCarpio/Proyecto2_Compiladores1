const AbstractExpression = require("../../Abstract/AbstractExpression");
const TS  =  require("../../TablaSimb/TablaSimbolos");
const AST = require("../../AST/AST")
class Case extends AbstractExpression.AbstractExpression{
    constructor(NameID,ID,cast_list,ELSE_valor,AS_ID,tag,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
        this.NameID = NameID;
        this.cast_list = cast_list;
        this.ELSE_valor = ELSE_valor;
        this.AS_ID = AS_ID;
        this.tag = tag;
        
    }
    Interpret(){
        if(this.tag === "BUSCANDO"){
            for (const iterator of this.cast_list) {
                var result = iterator.Interpret()
                var condicion = result["condicion_valor"]
                if (condicion) {
                    if(this.AS_ID != ""){
                        return this.AS_ID+" : "+result["valor_then"]
                    }
                    else{
                        return result["valor_then"]
                    }
                    
                }
            }
            if(typeof this.ELSE_valor === "object"){
                this.ELSE_valor = this.ELSE_valor.Interpret()
            }
            return this.ELSE_valor
        }   
        if(typeof this.ID === "object"){
            this.ID = this.ID.Interpret()
        }
        for (const iterator of this.cast_list) {
            var result = iterator.Interpret()
            var condicion =  this.ID === result["condicion_valor"]
            if (condicion) {
                if(this.AS_ID != ""){
                    return this.AS_ID+" : "+result["valor_then"]
                }
                else{
                    return this.NameID+" : "+result["valor_then"]
                }
                
            }
        }
        if(typeof this.ELSE_valor === "object"){
            this.ELSE_valor = this.ELSE_valor.Interpret()
        }
        if(this.AS_ID != ""){
            return this.AS_ID+" : "+this.ELSE_valor
        }
        else{
            return this.NameID+" : "+this.ELSE_valor
        }
        
        
        
    }
    AST(BLOQUE){
        
        var numero = AST.AST.getInstance().CASE
        var CASE_SENTENCIA = "CASE_SENTENCIA"+numero
        var CASE = CASE_SENTENCIA+"WHEN" + numero;
        var ID = CASE_SENTENCIA+"ID" + numero;
        var CASE_SUBS = CASE_SENTENCIA+"CASE_SUBS" + numero;
        var ELSE = CASE_SENTENCIA+"ELSE" + numero;
        var ELSE_VALOR = CASE_SENTENCIA+"ELSE_VALOR" + numero;
        var END = CASE_SENTENCIA+"END" + numero;
        var AS = CASE_SENTENCIA+"AS" + numero;
        var ID2 = CASE_SENTENCIA+"ID2" + numero;
        
        let dot = "";
        dot += `"${CASE_SENTENCIA}"[label = "CASE SENTENCIA"][shape = oval];\n`
        dot += `"${CASE}"[label = "CASE"][shape = oval];\n`
        dot += `"${ID}"[label = "${this.NameID}"][shape = oval];\n`
        dot += `"${CASE_SUBS}"[label = "CASES"][shape = oval];\n`
        dot += `"${ELSE}"[label = "ELSE"][shape = oval];\n`
        dot += `"${ELSE_VALOR}"[label = "${this.ELSE_valor}"][shape = oval];\n`
        dot += `"${END}"[label = "END"][shape = oval];\n`
        dot += `"${AS}"[label = "AS"][shape = oval];\n`
        dot += `"${ID2}"[label = "${this.AS_ID}"][shape = oval];\n`
        
        
        
        dot += `"${BLOQUE}" -> "${CASE_SENTENCIA}" ;\n`
        dot += `"${CASE_SENTENCIA}" -> "${CASE}" ;\n`
        dot += `"${CASE_SENTENCIA}" -> "${ID}" ;\n`
        dot += `"${CASE_SENTENCIA}" -> "${CASE_SUBS}" ;\n`
        dot += `"${CASE_SENTENCIA}" -> "${ELSE}" ;\n`
        dot += `"${ELSE}" -> "${ELSE_VALOR}" ;\n`
        dot += `"${CASE_SENTENCIA}" -> "${END}" ;\n`
        dot += `"${CASE_SENTENCIA}" -> "${AS}" ;\n`
        dot += `"${CASE_SENTENCIA}" -> "${ID2}" ;\n`
        
        
        
        
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().CASE += 1;
        for (const iterator of this.cast_list) {
            if (typeof iterator === "object"){
                iterator.AST(CASE_SUBS)
            }
        }
    }
    
}
module.exports = {
    Case
}