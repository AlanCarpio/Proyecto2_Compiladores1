const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
const AST = require('../AST/AST')
class SelectTablesExpression extends AbstractExpression.AbstractExpression{
    constructor(ID,Tag,columnas,codicionrelacional,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
        this.Tag = Tag;
        this.columnas = columnas
        this.codicionrelacional = codicionrelacional
    }
    Interpret(){
        let string = "";
        switch (this.Tag) {
            case "Todo":
                let result = TS.TS.getInstance().ObtenerSimbolo("Tabla");
                for (const iterator of result) {
                    if (iterator.nombre === this.ID) {
                        string += iterator.valor.ImprimirTablaTodo(this.columnas);
                    }
                }
                break;
            case "Columnas":
                let result2 = TS.TS.getInstance().ObtenerSimbolo("Tabla");
                for (const iterator of result2) {
                    if (iterator.nombre === this.ID) {
                        string += iterator.valor.ImprimirTablaColumnas(this.columnas);
                    }
                }
                break;
            case "Todo_Where":
                var condicion = this.codicionrelacional.Interpret()    
                let result3 = TS.TS.getInstance().ObtenerSimbolo("Tabla");
                for (const iterator of result3) {
                    if (iterator.nombre === this.ID) {
                        string += iterator.valor.ImprimirTablaTodoConWhere(condicion["columna"],condicion["valor"],condicion["operador"]);
                    }
                }
                break;
            case "Columnas_Where":

                var condicion = this.codicionrelacional.Interpret()         
                let result4 = TS.TS.getInstance().ObtenerSimbolo("Tabla");
                for (const iterator of result4) {
                    if (iterator.nombre === this.ID) {
                        string += iterator.valor.ImprimirTablaColumnasConWhere(this.columnas,condicion["columna"],condicion["valor"],condicion["operador"]);
                    }
                }
                break;
            default:
                break;
        }
        return string;
    }
    AST(BLOQUE){
        switch (this.Tag) {
            case "Todo":
                var numero = AST.AST.getInstance().IMPRIMIRTABLAS
                var IMPRIMIRTABLAS = "IMPRIMIR_TABLAS"+numero
                var SELECT = IMPRIMIRTABLAS+"SELECT" + numero;
                var MULTI = IMPRIMIRTABLAS+"MULTI" + numero;
                var FROM = IMPRIMIRTABLAS+"FROM" + numero;
                var ID = IMPRIMIRTABLAS+"ID" + numero;
                var ID_NOMBRE = IMPRIMIRTABLAS+"ID_NOMBRE" + numero;
                
                
                var dot = "";
                dot += `"${IMPRIMIRTABLAS}"[label = "IMPRIMIR TABLAS"][shape = oval];\n`
                dot += `"${SELECT}"[label = "SELECT"][shape = oval];\n`
                dot += `"${MULTI}"[label = "*"][shape = oval];\n`
                dot += `"${FROM}"[label = "FROM"][shape = oval];\n`
                dot += `"${ID}"[label = "ID"][shape = oval];\n`
                dot += `"${ID_NOMBRE}"[label = "@${this.ID}"][shape = oval];\n`
                
                dot += `"${BLOQUE}" -> "${IMPRIMIRTABLAS}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${SELECT}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${MULTI}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${FROM}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${ID}" ;\n`
                dot += `"${ID}" -> "${ID_NOMBRE}" ;\n`

                AST.AST.getInstance().Insertar(dot);
                AST.AST.getInstance().IMPRIMIRTABLAS += 1;
                return
            case "Columnas":
                var numero = AST.AST.getInstance().IMPRIMIRTABLAS
                var IMPRIMIRTABLAS = "IMPRIMIR_TABLAS"+numero
                var SELECT = IMPRIMIRTABLAS+"SELECT" + numero;
                var COLUMNAS = IMPRIMIRTABLAS+"COLUMNAS" + numero;
                var FROM = IMPRIMIRTABLAS+"FROM" + numero;
                var ID = IMPRIMIRTABLAS+"ID" + numero;
                var ID_NOMBRE = IMPRIMIRTABLAS+"ID_NOMBRE" + numero;
                
                
                var dot = "";
                dot += `"${IMPRIMIRTABLAS}"[label = "IMPRIMIR TABLAS"][shape = oval];\n`
                dot += `"${SELECT}"[label = "SELECT"][shape = oval];\n`
                dot += `"${COLUMNAS}"[label = "COLUMNAS"][shape = oval];\n`
                for (const key in this.columnas) {
                    const element = this.columnas[key];    
                    dot += `"${IMPRIMIRTABLAS+COLUMNAS+key}"[label = "${element}"][shape = oval];\n`
                }
                dot += `"${FROM}"[label = "FROM"][shape = oval];\n`
                dot += `"${ID}"[label = "ID"][shape = oval];\n`
                dot += `"${ID_NOMBRE}"[label = "@${this.ID}"][shape = oval];\n`
                
                dot += `"${BLOQUE}" -> "${IMPRIMIRTABLAS}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${SELECT}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${COLUMNAS}" ;\n`
                for (const key in this.columnas) {
                    const element = this.columnas[key];    
                    dot += `"${COLUMNAS}" -> "${IMPRIMIRTABLAS+COLUMNAS+key}" ;\n`
                }
                dot += `"${IMPRIMIRTABLAS}" -> "${FROM}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${ID}" ;\n`
                dot += `"${ID}" -> "${ID_NOMBRE}" ;\n`

                AST.AST.getInstance().Insertar(dot);
                AST.AST.getInstance().IMPRIMIRTABLAS += 1;
                return
            case "Todo_Where":
                var numero = AST.AST.getInstance().IMPRIMIRTABLAS
                var IMPRIMIRTABLAS = "IMPRIMIR_TABLAS"+numero
                var SELECT = IMPRIMIRTABLAS+"SELECT" + numero;
                var MULTI = IMPRIMIRTABLAS+"MULTI" + numero;
                var FROM = IMPRIMIRTABLAS+"FROM" + numero;
                var ID = IMPRIMIRTABLAS+"ID" + numero;
                var ID_NOMBRE = IMPRIMIRTABLAS+"ID_NOMBRE" + numero;
                var WHERE = IMPRIMIRTABLAS+"WHERE" + numero;
                var CONDICION = IMPRIMIRTABLAS+"CONDICION" + numero;
                
                
                var dot = "";
                dot += `"${IMPRIMIRTABLAS}"[label = "IMPRIMIR TABLAS"][shape = oval];\n`
                dot += `"${SELECT}"[label = "SELECT"][shape = oval];\n`
                dot += `"${MULTI}"[label = "*"][shape = oval];\n`
                dot += `"${FROM}"[label = "FROM"][shape = oval];\n`
                dot += `"${ID}"[label = "ID"][shape = oval];\n`
                dot += `"${ID_NOMBRE}"[label = "${this.ID}"][shape = oval];\n`
                dot += `"${WHERE}"[label = "WHERE"][shape = oval];\n`
                dot += `"${CONDICION}"[label = "CONDICION"][shape = oval];\n`
                
                dot += `"${BLOQUE}" -> "${IMPRIMIRTABLAS}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${SELECT}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${MULTI}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${FROM}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${ID}" ;\n`
                dot += `"${ID}" -> "${ID_NOMBRE}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${WHERE}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${CONDICION}" ;\n`


                AST.AST.getInstance().Insertar(dot);
                AST.AST.getInstance().IMPRIMIRTABLAS += 1;
                this.codicionrelacional.AST(CONDICION)
                return
            case "Columnas_Where":
                var numero = AST.AST.getInstance().IMPRIMIRTABLAS
                var IMPRIMIRTABLAS = "IMPRIMIR_TABLAS"+numero
                var SELECT = IMPRIMIRTABLAS+"SELECT" + numero;
                var COLUMNAS = IMPRIMIRTABLAS+"COLUMNAS" + numero;
                var FROM = IMPRIMIRTABLAS+"FROM" + numero;
                var ID = IMPRIMIRTABLAS+"ID" + numero;
                var ID_NOMBRE = IMPRIMIRTABLAS+"ID_NOMBRE" + numero;
                var WHERE = IMPRIMIRTABLAS+"WHERE" + numero;
                var CONDICION = IMPRIMIRTABLAS+"CONDICION" + numero;
                
                var dot = "";
                dot += `"${IMPRIMIRTABLAS}"[label = "IMPRIMIR TABLAS"][shape = oval];\n`
                dot += `"${SELECT}"[label = "SELECT"][shape = oval];\n`
                dot += `"${COLUMNAS}"[label = "COLUMNAS"][shape = oval];\n`
                for (const key in this.columnas) {
                    const element = this.columnas[key];    
                    dot += `"${IMPRIMIRTABLAS+COLUMNAS+key}"[label = "${element}"][shape = oval];\n`
                }
                dot += `"${FROM}"[label = "FROM"][shape = oval];\n`
                dot += `"${ID}"[label = "ID"][shape = oval];\n`
                dot += `"${ID_NOMBRE}"[label = "@${this.ID}"][shape = oval];\n`
                dot += `"${WHERE}"[label = "WHERE"][shape = oval];\n`
                dot += `"${CONDICION}"[label = "CONDICION"][shape = oval];\n`
                
                dot += `"${BLOQUE}" -> "${IMPRIMIRTABLAS}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${SELECT}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${COLUMNAS}" ;\n`
                for (const key in this.columnas) {
                    const element = this.columnas[key];    
                    dot += `"${COLUMNAS}" -> "${IMPRIMIRTABLAS+COLUMNAS+key}" ;\n`
                }
                dot += `"${IMPRIMIRTABLAS}" -> "${FROM}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${ID}" ;\n`
                dot += `"${ID}" -> "${ID_NOMBRE}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${WHERE}" ;\n`
                dot += `"${IMPRIMIRTABLAS}" -> "${CONDICION}" ;\n`

                AST.AST.getInstance().Insertar(dot);
                AST.AST.getInstance().IMPRIMIRTABLAS += 1;
                this.codicionrelacional.AST(CONDICION)
                return
                
            default:
                break;
    }
    }
    
}
module.exports = {
    SelectTablesExpression
}