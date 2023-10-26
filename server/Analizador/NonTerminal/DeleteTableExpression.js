const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
const AST = require('../AST/AST')
class DeleteTableExpression extends AbstractExpression.AbstractExpression{
    constructor(ID,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
    }
    Interpret(){
        TS.TS.getInstance().ObtenerSimbolo("Tabla",this.ID);
        return "";
    }
    AST(BLOQUE){
        let numero = AST.AST.getInstance().MODIFICACION_TABLA;
        var ELIMINAR_TABLA = "ELIMINAR_TABLA" + numero;
        var DROP = ELIMINAR_TABLA+"DROP" + numero;
        var TABLE = ELIMINAR_TABLA+"TABLE" + numero;
        var ID = ELIMINAR_TABLA+"ID" + numero;
        var ID_VALOR = ELIMINAR_TABLA+"ID_VALOR" + numero;

        let dot = "";
        dot += `"${ELIMINAR_TABLA}"[label = "ELIMINAR TABLA"][shape = oval];\n`
        dot += `"${DROP}"[label = "DROP"][shape = oval];\n`
        dot += `"${TABLE}"[label = "TABLE"][shape = oval];\n`
        dot += `"${ID}"[label = "ID"][shape = oval];\n`
        dot += `"${ID_VALOR}"[label = "${this.ID}"][shape = oval];\n`
        
        
        
        dot += `"${BLOQUE}" -> "${ELIMINAR_TABLA}" ;\n`
        dot += `"${ELIMINAR_TABLA}" -> "${DROP}" ;\n`
        dot += `"${ELIMINAR_TABLA}" -> "${TABLE}" ;\n`
        dot += `"${ELIMINAR_TABLA}" -> "${ID}" ;\n`
        dot += `"${ID}" -> "${ID_VALOR}" ;\n`
        
        
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().MODIFICACION_TABLA += 1;
    }
    
}
module.exports = {
    DeleteTableExpression
}