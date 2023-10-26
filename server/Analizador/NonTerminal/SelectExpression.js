const AbstractExpression = require("../Abstract/AbstractExpression");
const TS  =  require("../TablaSimb/TablaSimbolos");
const AST  =  require("../AST/AST");
class SelectExpression extends AbstractExpression.AbstractExpression{
    constructor(ID,number,tag,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
        this.number = number;
        this.tag = tag;
        
    }
    Interpret(){
        if (typeof this.ID === "object"){
            this.ID = this.ID.Interpret()
            
        }
        if (this.tag === "variable") {
            let list = TS.TS.getInstance().ObtenerSimbolo("Variable")
            for (const key in list) {
                const element = list[key];
                if (element.nombre === this.ID){
                    
                    return element.valor+"\n"
                }
            }
        } 
        else if(this.tag === "lower"){
            let valor = this.ID
            if (typeof this.ID === "object"){
                let list = TS.TS.getInstance().ObtenerSimbolo("Variable")
                for (const key in list) {
                    const element = list[key];
                    if (element.nombre === this.ID){
                        valor = element.valor
                        
                    }
            }
            }
            return valor.toLowerCase()+"\n"
        }
        else if(this.tag === "upper"){
            let valor = this.ID
            if (typeof this.ID === "object"){
                let list = TS.TS.getInstance().ObtenerSimbolo("Variable")
                for (const key in list) {
                    const element = list[key];
                    if (element.nombre === this.ID){
                        valor = element.valor
                        
                    }
            }
            }
            return valor.toUpperCase()+"\n"
        }
        else if(this.tag === "round"){
            return Number(this.ID.toFixed(this.number))+"\n";
        }
        else if (this.tag === "len") {
            var trimmedString = this.ID.replace(/\s/g, ''); // Elimina los espacios en blanco
            trimmedString = '"' + trimmedString + '"'; // Agrega comillas dobles al inicio y al final
            return trimmedString.length + "\n";
        }
        else if (this.tag === "truncate") {
            var factor = Math.pow(10, this.number);
            return Math.trunc(this.ID * factor) / factor + "\n";
        }
        else if(this.tag === "typeof"){
            if (this.ID === null){
                return result = "null\n"
            }
            var result = typeof this.ID

            var numeroComoCadena = this.ID.toString();
            if (numeroComoCadena.includes('.')) {
                result = "double"
            }else if(/^\d{4}-\d{2}-\d{2}$/.test(numeroComoCadena)){
                result = "date"
            } 
            else {
                
            }
            return  result +"\n"
        }
        else if(this.tag === "CASE"){
            return this.ID
        }
        else{
            return this.ID.Interpret()

        }
        
        
        
    }
    AST(BLOQUE){
        if (this.tag === "variable") {
            var numero = AST.AST.getInstance().SELECT_VARIABLE
            var IMPRIMIR_VARIABLE = "IMPRIMIR_VARIABLE"+numero
            var SELECT = IMPRIMIR_VARIABLE+"SELECT" + numero;
            var ID = IMPRIMIR_VARIABLE+"ID" + numero;
            var ID_NOMBRE = IMPRIMIR_VARIABLE+"ID_NOMBRE" + numero;
            let dot = "";
            dot += `"${IMPRIMIR_VARIABLE}"[label = "IMPRIMIR_VARIABLE"][shape = oval];\n`
            dot += `"${SELECT}"[label = "SELECT"][shape = oval];\n`
            dot += `"${ID}"[label = "ID"][shape = oval];\n`
            dot += `"${ID_NOMBRE}"[label = "@${this.ID}"][shape = oval];\n`
            dot += `"${BLOQUE}" -> "${IMPRIMIR_VARIABLE}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${SELECT}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${ID}" ;\n`
            dot += `"${ID}" -> "${ID_NOMBRE}" ;\n`

            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().SELECT_VARIABLE += 1;
        }
        else if(this.tag === "upper"){
            var numero = AST.AST.getInstance().SELECT_VARIABLE
            var IMPRIMIR_VARIABLE = "IMPRIMIR_VARIABLE"+numero
            var SELECT = IMPRIMIR_VARIABLE+"SELECT" + numero;
            var UPPER = IMPRIMIR_VARIABLE+"UPPER" + numero;
            var ID = IMPRIMIR_VARIABLE+"ID" + numero;
            
            let dot = "";
            dot += `"${IMPRIMIR_VARIABLE}"[label = "IMPRIMIR_VARIABLE"][shape = oval];\n`
            dot += `"${SELECT}"[label = "SELECT"][shape = oval];\n`
            dot += `"${UPPER}"[label = "UPPER"][shape = oval];\n`
            dot += `"${ID}"[label = "${this.ID}"][shape = oval];\n`
            
            dot += `"${BLOQUE}" -> "${IMPRIMIR_VARIABLE}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${SELECT}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${UPPER}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${ID}" ;\n`

            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().SELECT_VARIABLE += 1;
        }
        else if(this.tag === "lower"){
            var numero = AST.AST.getInstance().SELECT_VARIABLE
            var IMPRIMIR_VARIABLE = "IMPRIMIR_VARIABLE"+numero
            var SELECT = IMPRIMIR_VARIABLE+"SELECT" + numero;
            var LOWER = IMPRIMIR_VARIABLE+"LOWER" + numero;
            var ID = IMPRIMIR_VARIABLE+"ID" + numero;
            
            let dot = "";
            dot += `"${IMPRIMIR_VARIABLE}"[label = "IMPRIMIR_VARIABLE"][shape = oval];\n`
            dot += `"${SELECT}"[label = "SELECT"][shape = oval];\n`
            dot += `"${LOWER}"[label = "LOWER"][shape = oval];\n`
            dot += `"${ID}"[label = "${this.ID}"][shape = oval];\n`
            
            dot += `"${BLOQUE}" -> "${IMPRIMIR_VARIABLE}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${SELECT}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${LOWER}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${ID}" ;\n`

            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().SELECT_VARIABLE += 1;
        }
        else if(this.tag === "len"){
            var numero = AST.AST.getInstance().SELECT_VARIABLE
            var IMPRIMIR_VARIABLE = "IMPRIMIR_VARIABLE"+numero
            var SELECT = IMPRIMIR_VARIABLE+"SELECT" + numero;
            var LEN = IMPRIMIR_VARIABLE+"LEN" + numero;
            var ID = IMPRIMIR_VARIABLE+"ID" + numero;
            
            let dot = "";
            dot += `"${IMPRIMIR_VARIABLE}"[label = "IMPRIMIR_VARIABLE"][shape = oval];\n`
            dot += `"${SELECT}"[label = "SELECT"][shape = oval];\n`
            dot += `"${LEN}"[label = "LEN"][shape = oval];\n`
            dot += `"${ID}"[label = "${this.ID}"][shape = oval];\n`
            
            dot += `"${BLOQUE}" -> "${IMPRIMIR_VARIABLE}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${SELECT}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${LEN}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${ID}" ;\n`

            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().SELECT_VARIABLE += 1;
        }
        else if(this.tag === "typeof"){
            var numero = AST.AST.getInstance().SELECT_VARIABLE
            var IMPRIMIR_VARIABLE = "IMPRIMIR_VARIABLE"+numero
            var SELECT = IMPRIMIR_VARIABLE+"SELECT" + numero;
            var TYPEOF = IMPRIMIR_VARIABLE+"TYPEOF" + numero;
            var ID = IMPRIMIR_VARIABLE+"ID" + numero;
            
            let dot = "";
            dot += `"${IMPRIMIR_VARIABLE}"[label = "IMPRIMIR_VARIABLE"][shape = oval];\n`
            dot += `"${SELECT}"[label = "SELECT"][shape = oval];\n`
            dot += `"${TYPEOF}"[label = "TYPEOF"][shape = oval];\n`
            dot += `"${ID}"[label = "${this.ID}"][shape = oval];\n`
            
            dot += `"${BLOQUE}" -> "${IMPRIMIR_VARIABLE}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${SELECT}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${TYPEOF}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${ID}" ;\n`

            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().SELECT_VARIABLE += 1;
        }
        else if(this.tag === "round"){
            var numero = AST.AST.getInstance().SELECT_VARIABLE
            var IMPRIMIR_VARIABLE = "IMPRIMIR_VARIABLE"+numero
            var SELECT = IMPRIMIR_VARIABLE+"SELECT" + numero;
            var ROUND = IMPRIMIR_VARIABLE+"ROUND" + numero;
            var ID = IMPRIMIR_VARIABLE+"ID" + numero;
            var ID_NOMBRE = IMPRIMIR_VARIABLE+"ID_NOMBRE" + numero;
            let dot = "";
            dot += `"${IMPRIMIR_VARIABLE}"[label = "IMPRIMIR_VARIABLE"][shape = oval];\n`
            dot += `"${SELECT}"[label = "SELECT"][shape = oval];\n`
            dot += `"${ROUND}"[label = "ROUND"][shape = oval];\n`
            dot += `"${ID}"[label = "${this.ID}"][shape = oval];\n`
            dot += `"${ID_NOMBRE}"[label = "${this.number}"][shape = oval];\n`
            
            dot += `"${BLOQUE}" -> "${IMPRIMIR_VARIABLE}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${SELECT}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${ROUND}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${ID}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${ID_NOMBRE}" ;\n`

            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().SELECT_VARIABLE += 1;
        }
        else if(this.tag === "truncate"){
            var numero = AST.AST.getInstance().SELECT_VARIABLE
            var IMPRIMIR_VARIABLE = "IMPRIMIR_VARIABLE"+numero
            var SELECT = IMPRIMIR_VARIABLE+"SELECT" + numero;
            var TRUNCATE = IMPRIMIR_VARIABLE+"TRUNCATE" + numero;
            var ID = IMPRIMIR_VARIABLE+"ID" + numero;
            var ID_NOMBRE = IMPRIMIR_VARIABLE+"ID_NOMBRE" + numero;
            let dot = "";
            dot += `"${IMPRIMIR_VARIABLE}"[label = "IMPRIMIR_VARIABLE"][shape = oval];\n`
            dot += `"${SELECT}"[label = "SELECT"][shape = oval];\n`
            dot += `"${TRUNCATE}"[label = "TRUNCATE"][shape = oval];\n`
            dot += `"${ID}"[label = "${this.ID}"][shape = oval];\n`
            dot += `"${ID_NOMBRE}"[label = "${this.number}"][shape = oval];\n`
            
            dot += `"${BLOQUE}" -> "${IMPRIMIR_VARIABLE}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${SELECT}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${TRUNCATE}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${ID}" ;\n`
            dot += `"${IMPRIMIR_VARIABLE}" -> "${ID_NOMBRE}" ;\n`

            AST.AST.getInstance().Insertar(dot);
            AST.AST.getInstance().SELECT_VARIABLE += 1;
        }
           
    }
    
}
module.exports = {
    SelectExpression
}