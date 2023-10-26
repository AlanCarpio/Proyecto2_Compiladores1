const AbstractExpression = require("../../Abstract/AbstractExpression");
const TS  =  require("../../TablaSimb/TablaSimbolos");
const AST = require("../../AST/AST")
const _ = require('lodash');
class For extends AbstractExpression.AbstractExpression{
    constructor(ID,Primer_numero,Segundo_numero,instrucciones,fila,colummna){
        super(fila,colummna);
        this.ID = ID
        this.Primer_numero = Primer_numero
        this.Segundo_numero = Segundo_numero
        this.instrucciones = instrucciones;
        
        
    }
    Interpret(){
        if(typeof this.Primer_numero === "object"){
            this.Primer_numero = this.Primer_numero.Interpret()
        }
        if(typeof this.Segundo_numero === "object"){
            this.Segundo_numero = this.Segundo_numero.Interpret()
        }
        const variableB = () => {
            let result = TS.TS.getInstance().ObtenerSimbolo("Variable")
            for (const key in result) {
                const element = result[key];
                if (element.nombre === this.ID){
                    result = element.valor
                }
                
            }
            return result
        }
        const variableM = () => {
            let result = TS.TS.getInstance().ObtenerSimbolo("Variable")
            for (const key in result) {
                const element = result[key];
                if (element.nombre === this.ID){
                    element.valor += 1
                }
                
            }
            return result
        }
        TS.TS.getInstance().insertar("Local","Variable",this.ID,"int",this.Primer_numero)
        let string_json = "";
        let InstruccionesAux = _.cloneDeep(this.instrucciones);
        while (variableB() < this.Segundo_numero) {
            
            for (const iterator of InstruccionesAux) {
                let result = iterator.Interpret()
                
                if (result === "break"){
                    return string_json
                }
                else if(result === "continue"){
                    break
                }
                else{
                    string_json += result
                }
            }
            InstruccionesAux = _.cloneDeep(this.instrucciones);
            variableM();
        }
        return string_json
        
    }
    AST(BLOQUE){
        
        var numero = AST.AST.getInstance().FOR
        var SENTENCIA_FOR = "SENTENCIA_FOR"+numero
        var FOR = SENTENCIA_FOR+"FOR" + numero;
        var ID = SENTENCIA_FOR+"ID" + numero;
        var IN = SENTENCIA_FOR+"IN" + numero;
        var NUMBER1 = SENTENCIA_FOR+"NUMBER1" + numero;
        var NUMBER2 = SENTENCIA_FOR+"NUMBER2" + numero;
        var INSTRUCCIONES = SENTENCIA_FOR+"INSTRUCCIONES" + numero;
        var BEGIN = SENTENCIA_FOR+"BEGIN" + numero;
        var END = SENTENCIA_FOR+"END" + numero;
        
        let dot = "";
        dot += `"${SENTENCIA_FOR}"[label = "SENTECIA FOR"][shape = oval];\n`
        dot += `"${FOR}"[label = "FOR"][shape = oval];\n`
        dot += `"${ID}"[label = "${this.ID}"][shape = oval];\n`
        dot += `"${IN}"[label = "IN"][shape = oval];\n`
        dot += `"${NUMBER1}"[label = "${this.Primer_numero}"][shape = oval];\n`
        dot += `"${NUMBER2}"[label = "${this.Segundo_numero}"][shape = oval];\n`
        dot += `"${INSTRUCCIONES}"[label = "INSTRUCCION"][shape = oval];\n`
        dot += `"${BEGIN}"[label = "BEGIN"][shape = oval];\n`
        dot += `"${END}"[label = "END"][shape = oval];\n`
        
        dot += `"${BLOQUE}" -> "${SENTENCIA_FOR}" ;\n`
        dot += `"${SENTENCIA_FOR}" -> "${FOR}" ;\n`
        dot += `"${SENTENCIA_FOR}" -> "${ID}" ;\n`
        dot += `"${SENTENCIA_FOR}" -> "${IN}" ;\n`
        dot += `"${SENTENCIA_FOR}" -> "${NUMBER1}" ;\n`
        dot += `"${SENTENCIA_FOR}" -> "${NUMBER2}" ;\n`
        dot += `"${SENTENCIA_FOR}" -> "${INSTRUCCIONES}" ;\n`
        dot += `"${SENTENCIA_FOR}" -> "${BEGIN}" ;\n`
        dot += `"${SENTENCIA_FOR}" -> "${END}" ;\n`
        
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().FOR += 1;

        for (const iterator of this.instrucciones) {
            if(typeof iterator === "object"){
                iterator.AST(INSTRUCCIONES)
            }
            
        }
        
    }
}
module.exports = {
    For
}