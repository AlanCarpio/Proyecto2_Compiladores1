const AbstractExpression = require("../../Abstract/AbstractExpression");
const TS  =  require("../../TablaSimb/TablaSimbolos");
const AST = require("../../AST/AST")
class Cast extends AbstractExpression.AbstractExpression{
    constructor(dato,tipoDato,fila,colummna){
        super(fila,colummna);
        this.dato = dato;
        this.tipoDato = tipoDato;
        
    }
    Interpret(){
        let dat = this.dato;
        if (typeof this.dato === "object"){
            dat = this.dato.Interpret()
        }
        
        switch (this.tipoDato) {
            case "int":
                return parseInt(dat)
            case "string":

                return dat.toString()
            case "double":
                return parseFloat(dat)
            case "date":
                return dat.toString()
            case "boolean":
                return dat;
            case "null":
                return dat;
            default:
            return "NaN"
        }
    }
    AST(BLOQUE){
        var numero = AST.AST.getInstance().CAST
            var SENTENCIA_CAST = "SENTENCIA_CAST"+numero
            var CAST = SENTENCIA_CAST+"CAST" + numero;
            var ID = SENTENCIA_CAST+"ID" + numero;
            var AS = SENTENCIA_CAST+"AS" + numero;
            var TIPO = SENTENCIA_CAST+"TIPO" + numero;
            
            
            var dot = "";
            dot += `"${SENTENCIA_CAST}"[label = "SENTENCIA CAST"][shape = oval];\n`
            dot += `"${CAST}"[label = "CAST"][shape = oval];\n`
            dot += `"${ID}"[label = "${this.dato}"][shape = oval];\n`
            dot += `"${AS}"[label = "AS"][shape = oval];\n`
            dot += `"${TIPO}"[label = "${this.tipoDato}"][shape = oval];\n`
            
            
            
            dot += `"${BLOQUE}" -> "${SENTENCIA_CAST}" ;\n`
            dot += `"${SENTENCIA_CAST}" -> "${CAST}" ;\n`
            dot += `"${SENTENCIA_CAST}" -> "${ID}" ;\n`
            dot += `"${SENTENCIA_CAST}" -> "${AS}" ;\n`
            dot += `"${SENTENCIA_CAST}" -> "${TIPO}" ;\n`
            

            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().CAST += 1;
    }
    
}
module.exports = {
    Cast
}