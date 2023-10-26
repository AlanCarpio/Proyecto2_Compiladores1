const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
const Tabla = require("../DBTabla/Tabla")
const AST  =  require("../AST/AST");
class TableExpression extends AbstractExpression.AbstractExpression{
    constructor(ID,colummnas,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
        this.columnas = colummnas;
    }
    Interpret(){
        let nueva_tabla = new Tabla.Tabla(this.ID)
        for (const key in this.columnas) {
            const element = this.columnas[key]
            let result = element.Interpret()
            nueva_tabla.AgregarColumna(result);

        }
        TS.TS.getInstance().insertar("Global","Tabla",this.ID,null,nueva_tabla);
        return "";
    }
    AST(BLOQUE){
        let numero = AST.AST.getInstance().CREATE_TABLA;
        var CREATE_TABLE = "CREATE_TABLE" + numero;
        var CREATE = CREATE_TABLE+"CREATE"+numero;
        var TABLE = CREATE_TABLE+"TABLE"+numero;
        var ID = CREATE_TABLE+"ID" + numero;
        var ID_VALOR = CREATE_TABLE+"ID_VALOR" + numero;
        var PAR_IZQ = CREATE_TABLE+"PAR_IZQ" + numero;
        var TABLA_COLUMNAS = CREATE_TABLE+"TABLA_COLUMNAS" + numero;
        var PAR_DER = CREATE_TABLE+"PAR_DER" + numero;

        let dot = "";
        dot += `"${CREATE_TABLE}"[label = "CREATE TABLE"][shape = oval];\n`
        dot += `"${CREATE}"[label = "CREATE"][shape = oval];\n`
        dot += `"${TABLE}"[label = "TABLE"][shape = oval];\n`
        dot += `"${ID}"[label = "ID"][shape = oval];\n`
        dot += `"${ID_VALOR}"[label = "@${this.ID}"][shape = oval];\n`
        dot += `"${PAR_IZQ}"[label = "("][shape = oval];\n`
        dot += `"${TABLA_COLUMNAS}"[label = "TABLA_COLUMNAS"][shape = oval];\n`
        dot += `"${PAR_DER}"[label = ")"][shape = oval];\n`
        
        
        
        dot += `"${BLOQUE}" -> "${CREATE_TABLE}" ;\n`
        dot += `"${CREATE_TABLE}" -> "${CREATE}" ;\n`
        dot += `"${CREATE_TABLE}" -> "${TABLE}" ;\n`
        dot += `"${CREATE_TABLE}" -> "${ID}" ;\n`
        dot += `"${ID}" -> "${ID_VALOR}" ;\n`
        dot += `"${CREATE_TABLE}" -> "${PAR_IZQ}" ;\n`
        dot += `"${CREATE_TABLE}" -> "${TABLA_COLUMNAS}" ;\n`
        dot += `"${CREATE_TABLE}" -> "${PAR_DER}" ;\n`
        
        
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().CREATE_TABLA += 1;
        /*
        for (const key in this.columnas) {
            const element = this.columnas[key]
            element.AST(TABLA_COLUMNAS);
        }
        */
    }
    
}
module.exports = {
    TableExpression
}