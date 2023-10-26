const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
const AST  =  require("../AST/AST");
class BusquedaVariableExpre extends AbstractExpression.AbstractExpression{
    constructor(ID,Tabla,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
        this.Tabla = Tabla
        
    }
    Interpret(){
        
        let result = TS.TS.getInstance().ObtenerSimbolo("Variable")
        if (result.length === 0){
            return this.ID
        }
        for (const key in result) {
            const element = result[key];
            if (element.nombre === this.ID){
                
                return element.valor
            }
            
        }
        return "Esta variable No existe"
    }
    toString() {
        return "VARIABLE"; // Representación personalizada como cadena de texto
    }
    AST(BLOQUE){
        var numero = AST.AST.getInstance().BUSQUEDA_VARIABLE
        var BUSQUEDA_VARIABLE = "BUSQUEDA_VARIABLE"+numero
        var VARIABLE_VALOR = BUSQUEDA_VARIABLE+"VARIABLE_VALOR"+numero
        let dot = "";
        dot += `"${VARIABLE_VALOR}"[label = "@${this.ID}"][shape = oval];\n`
        dot += `"${BLOQUE}" -> "${VARIABLE_VALOR}" ;\n`
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().BUSQUEDA_VARIABLE += 1;
        
    }
    
}
module.exports = {
    BusquedaVariableExpre
}