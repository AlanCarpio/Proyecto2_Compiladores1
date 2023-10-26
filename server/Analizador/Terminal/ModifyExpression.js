const AbstractExpression = require("../Abstract/AbstractExpression");
const AST = require('../AST/AST')
class ModifyExpression extends AbstractExpression.AbstractExpression{
    constructor(ID_old,ID_new,Tag,tipo,fila,colummna){
        super(fila,colummna);
        this.ID_old = ID_old;
        this.ID_new = ID_new;
        this.Tag = Tag;
        this.tipo = tipo;
    }
    Interpret(){
        let Object = {
            "ID_old":this.ID_old,
            "ID_new":this.ID_new,
            "Tag":this.Tag,
            "tipo":this.tipo,
        }
        return Object
    }
    AST(BLOQUE){
        switch (this.Tag) {
            case "add":
                var numero = AST.AST.getInstance().MODIFICACIONES;
                var AGREGAR_COLUMNA = "AGREGAR_COLUMNA" + numero;
                var ADD = AGREGAR_COLUMNA+"ADD" + numero;
                var ID = AGREGAR_COLUMNA+"ID" + numero;
                var ID_VALOR = AGREGAR_COLUMNA+"ID_VALOR" + numero;
                var TIPO = AGREGAR_COLUMNA+"TIPO" + numero;
                var TIPO_VALOR = AGREGAR_COLUMNA+"TIPO_VALOR" + numero;

                var dot = "";
                dot += `"${AGREGAR_COLUMNA}"[label = "AGREGAR COLUMNA"][shape = oval];\n`
                dot += `"${ADD}"[label = "ADD"][shape = oval];\n`
                dot += `"${ID}"[label = "ID"][shape = oval];\n`
                dot += `"${ID_VALOR}"[label = "${this.ID_old}"][shape = oval];\n`
                dot += `"${TIPO}"[label = "TIPO"][shape = oval];\n`
                dot += `"${TIPO_VALOR}"[label = "${this.tipo}"][shape = oval];\n`

                
                dot += `"${BLOQUE}" -> "${AGREGAR_COLUMNA}" ;\n`
                dot += `"${AGREGAR_COLUMNA}" -> "${ADD}" ;\n`
                dot += `"${AGREGAR_COLUMNA}" -> "${ID}" ;\n`
                dot += `"${ID}" -> "${ID_VALOR}" ;\n`
                dot += `"${AGREGAR_COLUMNA}" -> "${TIPO}" ;\n`
                dot += `"${TIPO}" -> "${TIPO_VALOR}" ;\n`
                
                AST.AST.getInstance().Insertar(dot);
                AST.AST.getInstance().MODIFICACIONES += 1;
                return
            case "drop":
                
                var numero = AST.AST.getInstance().MODIFICACIONES;
                var ELIMINAR_COLUMNA = "ELIMINAR_COLUMNA" + numero;
                var DROP = ELIMINAR_COLUMNA+"DROP" + numero;
                var COLUMN = ELIMINAR_COLUMNA+"COLUMN" + numero;
                var ID = ELIMINAR_COLUMNA+"ID" + numero;
                var ID_VALOR = ELIMINAR_COLUMNA+"ID_VALOR" + numero;

                var dot = "";
                dot += `"${ELIMINAR_COLUMNA}"[label = "ELIMINAR COLUMNA"][shape = oval];\n`
                dot += `"${DROP}"[label = "DROP"][shape = oval];\n`
                dot += `"${COLUMN}"[label = "COLUMN"][shape = oval];\n`
                dot += `"${ID}"[label = "ID"][shape = oval];\n`
                dot += `"${ID_VALOR}"[label = "${this.ID_old}"][shape = oval];\n`
                

                
                dot += `"${BLOQUE}" -> "${ELIMINAR_COLUMNA}" ;\n`
                dot += `"${ELIMINAR_COLUMNA}" -> "${DROP}" ;\n`
                dot += `"${ELIMINAR_COLUMNA}" -> "${COLUMN}" ;\n`
                dot += `"${ELIMINAR_COLUMNA}" -> "${ID}" ;\n`
                dot += `"${ID}" -> "${ID_VALOR}" ;\n`
                
                
                AST.AST.getInstance().Insertar(dot);
                AST.AST.getInstance().MODIFICACIONES += 1;
                return;
            case "rename_table":
                var numero = AST.AST.getInstance().MODIFICACIONES;
                var RENOMBRAR_TABLA = "RENOMBRAR TABLA" + numero;
                var RENAME = RENOMBRAR_TABLA+"RENAME" + numero;
                var TO = RENOMBRAR_TABLA+"TO" + numero;
                var ID = RENOMBRAR_TABLA+"ID" + numero;
                var ID_VALOR = RENOMBRAR_TABLA+"ID_VALOR" + numero;

                var dot = "";
                dot += `"${RENOMBRAR_TABLA}"[label = "RENOMBRAR TABLA"][shape = oval];\n`
                dot += `"${RENAME}"[label = "RENAME"][shape = oval];\n`
                dot += `"${TO}"[label = "TO"][shape = oval];\n`
                dot += `"${ID}"[label = "ID"][shape = oval];\n`
                dot += `"${ID_VALOR}"[label = "${this.ID_old}"][shape = oval];\n`
                

                
                dot += `"${BLOQUE}" -> "${RENOMBRAR_TABLA}" ;\n`
                dot += `"${RENOMBRAR_TABLA}" -> "${RENAME}" ;\n`
                dot += `"${RENOMBRAR_TABLA}" -> "${TO}" ;\n`
                dot += `"${RENOMBRAR_TABLA}" -> "${ID}" ;\n`
                dot += `"${ID}" -> "${ID_VALOR}" ;\n`
                
                
                AST.AST.getInstance().Insertar(dot);
                AST.AST.getInstance().MODIFICACIONES += 1;
                return
            case "rename_column":
                var numero = AST.AST.getInstance().MODIFICACIONES;
                var RENOMBRAR_COLUMNA = "RENOMBRAR_COLUMNA" + numero;
                var RENAME = RENOMBRAR_COLUMNA+"RENAME" + numero;
                var COLUMN = RENOMBRAR_COLUMNA+"COLUMN" + numero;
                var ID = RENOMBRAR_COLUMNA+"ID" + numero;
                var ID_VALOR = RENOMBRAR_COLUMNA+"ID_VALOR" + numero;
                var TO = RENOMBRAR_COLUMNA+"TO" + numero; 
                var ID2 = RENOMBRAR_COLUMNA+"ID2" + numero;
                var ID_VALOR2 = RENOMBRAR_COLUMNA+"ID_VALOR2" + numero;
                
                var dot = "";
                dot += `"${RENOMBRAR_COLUMNA}"[label = "RENOMBRAR COLUMNA"][shape = oval];\n`
                dot += `"${RENAME}"[label = "RENAME"][shape = oval];\n`
                dot += `"${COLUMN}"[label = "COLUMN"][shape = oval];\n`
                dot += `"${ID}"[label = "ID"][shape = oval];\n`
                dot += `"${ID_VALOR}"[label = "${this.ID_old}"][shape = oval];\n`
                dot += `"${TO}"[label = "TO"][shape = oval];\n`
                dot += `"${ID2}"[label = "ID"][shape = oval];\n`
                dot += `"${ID_VALOR2}"[label = "${this.ID_new}"][shape = oval];\n`
                
                

                
                dot += `"${BLOQUE}" -> "${RENOMBRAR_COLUMNA}" ;\n`
                dot += `"${RENOMBRAR_COLUMNA}" -> "${RENAME}" ;\n`
                dot += `"${RENOMBRAR_COLUMNA}" -> "${COLUMN}" ;\n`
                dot += `"${RENOMBRAR_COLUMNA}" -> "${ID}" ;\n`
                dot += `"${ID}" -> "${ID_VALOR}" ;\n`
                dot += `"${RENOMBRAR_COLUMNA}" -> "${TO}" ;\n`
                dot += `"${RENOMBRAR_COLUMNA}" -> "${ID2}" ;\n`
                dot += `"${ID2}" -> "${ID_VALOR2}" ;\n` 

                AST.AST.getInstance().Insertar(dot);
                AST.AST.getInstance().MODIFICACIONES += 1;
        
            default:
                break;
        }
    }
}
module.exports = {
    ModifyExpression
}