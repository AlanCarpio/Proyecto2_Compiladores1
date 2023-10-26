const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
const AST = require('../AST/AST')
class UpdateTableExpression extends AbstractExpression.AbstractExpression{
    constructor(ID,colummnas,condicion,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
        this.Columnas = colummnas;
        this.codicion = condicion;
    }
    Interpret(){
        let condicion = this.codicion.Interpret()
        let ListColumnas = []
        for (const iterator of this.Columnas) {
            ListColumnas.push(iterator.Interpret())
        }
        let result = TS.TS.getInstance().ObtenerSimbolo("Tabla");
        for (const iterator of result) {
            if (iterator.nombre === this.ID) {
                iterator.valor.UpdateColumnasTabla(ListColumnas,condicion["columna"],condicion["valor"],condicion["operador"]);
            }
        }
        return ""
    }
    AST(BLOQUE){
        var numero = AST.AST.getInstance().UPDATETABLE
        var UPDATETABLE = "UPDATETABLE"+numero
        var UPDATE = UPDATETABLE+"UPDATE" + numero;
        var ID = UPDATETABLE+"ID" + numero;
        var ID_NOMBRE = UPDATETABLE+"ID_NOMBRE" + numero;
        var SET = UPDATETABLE+"SET" + numero;
        var COLUMNAS = UPDATETABLE+"COLUMNAS" + numero;
        var WHERE = UPDATETABLE+"WHERE" + numero;
        var CONDICION = UPDATETABLE+"CONDICION" + numero;
        
        var dot = "";
        dot += `"${UPDATETABLE}"[label = "UPDATE TABLE"][shape = oval];\n`
        dot += `"${UPDATE}"[label = "UPDATE"][shape = oval];\n`
        dot += `"${ID}"[label = "ID"][shape = oval];\n`
        dot += `"${ID_NOMBRE}"[label = "@${this.ID}"][shape = oval];\n`
        dot += `"${SET}"[label = "SET"][shape = oval];\n`
        dot += `"${COLUMNAS}"[label = "COLUMNAS"][shape = oval];\n`
        dot += `"${WHERE}"[label = "WHERE"][shape = oval];\n`
        dot += `"${CONDICION}"[label = "CONDICION"][shape = oval];\n`
        
        dot += `"${BLOQUE}" -> "${UPDATETABLE}" ;\n`
        dot += `"${UPDATETABLE}" -> "${UPDATE}" ;\n`
        dot += `"${UPDATETABLE}" -> "${ID}" ;\n`
        dot += `"${ID}" -> "${ID_NOMBRE}" ;\n`
        dot += `"${UPDATETABLE}" -> "${SET}" ;\n`
        dot += `"${UPDATETABLE}" -> "${COLUMNAS}" ;\n`
        dot += `"${UPDATETABLE}" -> "${WHERE}" ;\n`
        dot += `"${UPDATETABLE}" -> "${CONDICION}" ;\n`

        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().UPDATETABLE += 1;
        this.codicion.AST(CONDICION)
        for (const iterator of this.Columnas) {
            iterator.AST(COLUMNAS)
        }
        
    }
    
}
module.exports = {
    UpdateTableExpression
}