const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
const AST = require('../AST/AST')
class TruncateTableExpre extends AbstractExpression.AbstractExpression{
    constructor(ID,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
    }
    Interpret(){
        let result = TS.TS.getInstance().ObtenerSimbolo("Tabla");
        for (const iterator of result) {
            if (iterator.nombre === this.ID) {
                iterator.valor.TruncateTable();
            }
        }
    }
    AST(BLOQUE){
        let numero = AST.AST.getInstance().TRUNCATE;
        var TRUNCATE_TABLE = "TRUNCATE_TABLE" + numero;
        var TRUNCATE = TRUNCATE_TABLE+"TRUNCATE" + numero;
        var TABLE = TRUNCATE_TABLE+"TABLE" + numero;
        var ID = TRUNCATE_TABLE+"ID" + numero;
        var ID_VALOR = TRUNCATE_TABLE+"ID_VALOR" + numero;

        let dot = "";
        dot += `"${TRUNCATE_TABLE}"[label = "TRUNCATE TABLE"][shape = oval];\n`
        dot += `"${TRUNCATE}"[label = "TRUNCATE"][shape = oval];\n`
        dot += `"${TABLE}"[label = "TABLE"][shape = oval];\n`
        dot += `"${ID}"[label = "ID"][shape = oval];\n`
        dot += `"${ID_VALOR}"[label = "${this.ID}"][shape = oval];\n`
        
        
        
        dot += `"${BLOQUE}" -> "${TRUNCATE_TABLE}" ;\n`
        dot += `"${TRUNCATE_TABLE}" -> "${TRUNCATE}" ;\n`
        dot += `"${TRUNCATE_TABLE}" -> "${TABLE}" ;\n`
        dot += `"${TRUNCATE_TABLE}" -> "${ID}" ;\n`
        dot += `"${ID}" -> "${ID_VALOR}" ;\n`
        
        
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().TRUNCATE += 1;
    }
    
}
module.exports = {
    TruncateTableExpre
}