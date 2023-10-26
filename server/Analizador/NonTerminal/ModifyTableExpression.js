const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
const Tabla = require("../DBTabla/Tabla")
const AST = require('../AST/AST')
class ModifyTableExpression extends AbstractExpression.AbstractExpression{
    constructor(ID,modificaciones,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
        this.modificaciones = modificaciones;
    }
    Interpret(){
        for (const key in this.modificaciones) {
            const element = this.modificaciones[key]
            let result = element.Interpret()
            TS.TS.getInstance().Modificar_Tabla(this.ID,result["ID_old"],result["ID_new"],"Tabla",result["Tag"],result["tipo"])
        }
        return "";
    }
    AST(BLOQUE){
        let numero = AST.AST.getInstance().MODIFICACION_TABLA;
        var MODIFICACION_TABLA = "MODIFICACION_TABLA" + numero;
        var ALTER = MODIFICACION_TABLA+"ALTER" + numero;
        var TABLE = MODIFICACION_TABLA+"TABLE" + numero;
        var ID = MODIFICACION_TABLA+"ID" + numero;
        var ID_VALOR = MODIFICACION_TABLA+"ID_VALOR" + numero;
        var ACCIONES_MODIFICAR = MODIFICACION_TABLA+"ACCIONES_MODIFICAR" + numero;

        let dot = "";
        dot += `"${MODIFICACION_TABLA}"[label = "MODIFICAR TABLA"][shape = oval];\n`
        dot += `"${ALTER}"[label = "ALTER"][shape = oval];\n`
        dot += `"${TABLE}"[label = "TABLE"][shape = oval];\n`
        dot += `"${ID}"[label = "ID"][shape = oval];\n`
        dot += `"${ID_VALOR}"[label = "${this.ID}"][shape = oval];\n`
        dot += `"${ACCIONES_MODIFICAR}"[label = "MODIFICACIONES"][shape = oval];\n`
        
        
        dot += `"${BLOQUE}" -> "${MODIFICACION_TABLA}" ;\n`
        dot += `"${MODIFICACION_TABLA}" -> "${ALTER}" ;\n`
        dot += `"${MODIFICACION_TABLA}" -> "${TABLE}" ;\n`
        dot += `"${MODIFICACION_TABLA}" -> "${ID}" ;\n`
        dot += `"${ID}" -> "${ID_VALOR}" ;\n`
        dot += `"${MODIFICACION_TABLA}" -> "${ACCIONES_MODIFICAR}" ;\n`
        
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().MODIFICACION_TABLA += 1;
        for (const key in this.modificaciones) {
            const element = this.modificaciones[key]
            element.AST(ACCIONES_MODIFICAR)
            
        }
    }
    
}
module.exports = {
    ModifyTableExpression
}