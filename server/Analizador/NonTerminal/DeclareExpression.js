const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
const AST  =  require("../AST/AST");
class DeclareExpression extends AbstractExpression.AbstractExpression{
    constructor(ID,tipo,valor,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
        this.Tipo = tipo;
        this.valor = valor;
        
    }
    Interpret(){
        
        if (this.valor === null){
            
        }
        else if (typeof this.valor === "object") {
            this.valor = this.valor.Interpret()
        } 
        let list = TS.TS.getInstance().ObtenerSimbolo("Variable")
        for (const key in list) {
            const element = list[key];
            if (element.nombre === this.ID){
                return ""
            }
            
        }
        TS.TS.getInstance().insertar("Global","Variable",this.ID,this.Tipo,this.valor)
        
        return ""
    }
    AST(BLOQUE){
        if (this.valor === null){
            this.valor = "null"
        }
        let numero = AST.AST.getInstance().DECLARACION_VARIABLE
        var DECLARACION_VARIABLE = "DECLARACION_VARIABLE"+numero
        var DECLARE = DECLARACION_VARIABLE+"DECLARE"+numero
        var ID = DECLARACION_VARIABLE+"ID"+numero
        var ID_VALOR = DECLARACION_VARIABLE+"ID_VALOR"+numero
        var TIPO = DECLARACION_VARIABLE+"TIPO"+numero
        var TIPO_DATO = DECLARACION_VARIABLE+"TIPO_DATO"+numero
        var DEFAULT = DECLARACION_VARIABLE+"DEFAULT"+numero
        var VALOR = DECLARACION_VARIABLE+"VALOR"+numero
        var VALOR_DATO = DECLARACION_VARIABLE+"VALOR_DATO"+numero
        let dot = "";
        dot += `"${DECLARACION_VARIABLE}"[label = "DECLARACION_VARIABLE"][shape = oval];\n`
        dot += `"${DECLARE}"[label = "DECLARE"][shape = oval];\n`
        dot += `"${ID}"[label = "ID"][shape = oval];\n`
        dot += `"${ID_VALOR}"[label = "@${this.ID}"][shape = oval];\n`
        dot += `"${TIPO}"[label = "TIPO"][shape = oval];\n`
        dot += `"${TIPO_DATO}"[label = "${this.Tipo}"][shape = oval];\n`
        dot += `"${DEFAULT}"[label = "DEFAULT"][shape = oval];\n`
        if(typeof this.valor === "object"){
            dot += `"${VALOR}"[label = "${this.valor.Interpret()}"][shape = oval];\n`
        }else{
            dot += `"${VALOR}"[label = "${this.valor}"][shape = oval];\n`
        }
        dot += `"${BLOQUE}" -> "${DECLARACION_VARIABLE}" ;\n`
        dot += `"${DECLARACION_VARIABLE}" -> "${DECLARE}" ;\n`
        dot += `"${DECLARACION_VARIABLE}" -> "${ID}" ;\n`
        dot += `"${DECLARACION_VARIABLE}" -> "${TIPO}" ;\n`
        dot += `"${DECLARACION_VARIABLE}" -> "${DEFAULT}" ;\n`
        dot += `"${DECLARACION_VARIABLE}" -> "${VALOR}" ;\n`
        dot += `"${ID}" -> "${ID_VALOR}" ;\n`
        dot += `"${TIPO}" -> "${TIPO_DATO}" ;\n`
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().DECLARACION_VARIABLE += 1;
        if(typeof this.valor === "object"){
            this.valor.AST(VALOR)
        }
    }
    
}
module.exports = {
    DeclareExpression
}