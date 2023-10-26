const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
const AST = require('../AST/AST')
class columnsExpression extends AbstractExpression.AbstractExpression{
    constructor(ID,tipo,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
        this.tipo = tipo;
    }
    Interpret(){
        return this.ID
    }
    AST(BLOQUE){
        let numero = AST.AST.getInstance().COLUMNAS_ATRI;
        var COLUMNAS_ATRI = "COLUMNAS_ATRI" + numero;
        var ID = COLUMNAS_ATRI+"ID" + numero;
        var ID_VALOR = COLUMNAS_ATRI+"ID_VALOR" + numero;
        var TIPO = COLUMNAS_ATRI+"TIPO" + numero;
        var TIPO_VALOR = COLUMNAS_ATRI+"TIPO_VALOR" + numero;

        let dot = "";
        dot += `"${ID}"[label = "ID"][shape = oval];\n`
        dot += `"${ID_VALOR}"[label = "${this.ID}"][shape = oval];\n`
        dot += `"${TIPO}"[label = "TIPO"][shape = oval];\n`
        dot += `"${TIPO_VALOR}"[label = "${this.tipo}"][shape = oval];\n`
        
        dot += `"${BLOQUE}" -> "${ID}" ;\n`
        dot += `"${ID}" -> "${ID_VALOR}" ;\n`
        dot += `"${BLOQUE}" -> "${TIPO}" ;\n`
        dot += `"${TIPO}" -> "${TIPO_VALOR}" ;\n`
        
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().COLUMNAS_ATRI += 1;


    }
    
}
module.exports = {
    columnsExpression
}