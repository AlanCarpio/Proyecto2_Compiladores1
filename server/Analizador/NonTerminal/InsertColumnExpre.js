const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
const AST = require('../AST/AST')
class InsertColumnExpre extends AbstractExpression.AbstractExpression{
    constructor(ID,columnas,valores,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
        this.columnas = columnas
        this.valores = valores
    }
    Interpret(){
        let simbolos = TS.TS.getInstance().ObtenerSimbolo("Tabla");
        for (const iterator of simbolos) {
            if (iterator.nombre === this.ID){
                for (const key in this.columnas) {
                    let ID_columna = this.columnas[key];
                    let Valor_columna = this.valores[key];
                    if (typeof Valor_columna === "object"){
                        Valor_columna = Valor_columna.Interpret()
                    }
                    iterator.valor.AgregarContenidoColumna(ID_columna,Valor_columna);
                }
            }
        }
        return "";
    }
    AST(BLOQUE){
        let numero = AST.AST.getInstance().INSERTARFILAS;
        var INSERTAR_FILAS = "INSERTAR_FILAS" + numero;
        var INSERT = INSERTAR_FILAS+"INSERT" + numero;
        var INTO = INSERTAR_FILAS+"INTO" + numero;
        var ID = INSERTAR_FILAS+"ID" + numero;
        var ID_VALOR = INSERTAR_FILAS+"ID_VALOR" + numero;
        var PAR_IZQ1 = INSERTAR_FILAS+"PAR_IZQ1" + numero;
        var COLUMNAS = INSERTAR_FILAS+"COLUMNAS" + numero;
        var PAR_DER1 = INSERTAR_FILAS+"PAR_DER1" + numero;
        var PAR_IZQ2 = INSERTAR_FILAS+"PAR_IZQ2" + numero;
        var VALORES = INSERTAR_FILAS+"VALORES" + numero;
        var PAR_DER2 = INSERTAR_FILAS+"PAR_DER2" + numero;
        
        let dot = "";
        dot += `"${INSERTAR_FILAS}"[label = "INSERTAR FILAS"][shape = oval];\n`
        dot += `"${INSERT}"[label = "INSERT"][shape = oval];\n`
        dot += `"${INTO}"[label = "INTO"][shape = oval];\n`
        dot += `"${ID}"[label = "ID"][shape = oval];\n`
        dot += `"${ID_VALOR}"[label = "${this.ID}"][shape = oval];\n`
        dot += `"${PAR_IZQ1}"[label = "("][shape = oval];\n`
        dot += `"${COLUMNAS}"[label = "COLUMNAS"][shape = oval];\n`
        for (const key in this.columnas) {
            const element = this.columnas[key];    
            dot += `"${INSERTAR_FILAS+COLUMNAS+key}"[label = "${element}"][shape = oval];\n`
        }
        dot += `"${PAR_DER1}"[label = ")"][shape = oval];\n`
        dot += `"${PAR_IZQ2}"[label = "("][shape = oval];\n`
        dot += `"${VALORES}"[label = "VALORES"][shape = oval];\n`
        for (const key in this.valores) {
            const element = this.valores[key];    
            dot += `"${INSERTAR_FILAS+VALORES+key}"[label = "${element}"][shape = oval];\n`
        }
        dot += `"${PAR_DER2}"[label = ")"][shape = oval];\n`
        
        
        
        dot += `"${BLOQUE}" -> "${INSERTAR_FILAS}" ;\n`
        dot += `"${INSERTAR_FILAS}" -> "${INSERT}" ;\n`
        dot += `"${INSERTAR_FILAS}" -> "${INTO}" ;\n`
        dot += `"${INSERTAR_FILAS}" -> "${ID}" ;\n`
        dot += `"${ID}" -> "${ID_VALOR}" ;\n`
        dot += `"${INSERTAR_FILAS}" -> "${PAR_IZQ1}" ;\n`
        dot += `"${INSERTAR_FILAS}" -> "${COLUMNAS}" ;\n`
        for (const key in this.columnas) {
            const element = this.columnas[key];    
            dot += `"${COLUMNAS}" -> "${INSERTAR_FILAS+COLUMNAS+key}" ;\n`
        }
        dot += `"${INSERTAR_FILAS}" -> "${PAR_DER1}" ;\n`
        dot += `"${INSERTAR_FILAS}" -> "${PAR_IZQ2}" ;\n`
        dot += `"${INSERTAR_FILAS}" -> "${VALORES}" ;\n`
        for (const key in this.valores) {
            const element = this.valores[key];    
            dot += `"${VALORES}" -> "${INSERTAR_FILAS+VALORES+key}" ;\n`
        }
        dot += `"${INSERTAR_FILAS}" -> "${PAR_DER2}" ;\n`
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().INSERTARFILAS += 1;
    }
    
}
module.exports = {
    InsertColumnExpre
}