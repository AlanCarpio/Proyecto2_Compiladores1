const AbstractExpression = require("../../Abstract/AbstractExpression");
const TS  =  require("../../TablaSimb/TablaSimbolos");
const AST = require("../../AST/AST")
class DeleteTableExpression2 extends AbstractExpression.AbstractExpression{
    constructor(ID,condicion,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
        this.codicion = condicion;
    }
    Interpret(){
        let condicion = this.codicion.Interpret()
        let result = TS.TS.getInstance().ObtenerSimbolo("Tabla");
        for (const iterator of result) {
            if (iterator.nombre === this.ID) {
                iterator.valor.DeleteConCondicion(condicion["columna"],condicion["valor"]);
            }
        }
        return ""
    }
    AST(BLOQUE){
        let numero = AST.AST.getInstance().DELETE;
        var DELETE = "DELETE" + numero;
        var DELETE2 = DELETE+"DELETE2" + numero;
        var FROM = DELETE+"FROM" + numero;
        var ID = DELETE+"ID" + numero;
        var ID_VALOR = DELETE+"ID_VALOR" + numero;
        var WHERE = DELETE+"WHERE"+numero;
        var CONDICION = DELETE+"CONDICION"+numero;

        let dot = "";
        dot += `"${DELETE}"[label = "DELETE TABLE"][shape = oval];\n`
        dot += `"${DELETE2}"[label = "DELETE"][shape = oval];\n`
        dot += `"${FROM}"[label = "FROM"][shape = oval];\n`
        dot += `"${ID}"[label = "ID"][shape = oval];\n`
        dot += `"${ID_VALOR}"[label = "${this.ID}"][shape = oval];\n`
        dot += `"${WHERE}"[label = "WHERE"][shape = oval];\n`
        dot += `"${CONDICION}"[label = "CONDICION"][shape = oval];\n`
        
        
        
        dot += `"${BLOQUE}" -> "${DELETE}" ;\n`
        dot += `"${DELETE}" -> "${DELETE2}" ;\n`
        dot += `"${DELETE}" -> "${FROM}" ;\n`
        dot += `"${DELETE}" -> "${ID}" ;\n`
        dot += `"${ID}" -> "${ID_VALOR}" ;\n`
        dot += `"${DELETE}" -> "${WHERE}" ;\n`
        dot += `"${DELETE}" -> "${CONDICION}" ;\n`
        
        
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().DELETE += 1;
        this.codicion.AST(CONDICION);
    }
    
}
module.exports = {
    DeleteTableExpression2
}