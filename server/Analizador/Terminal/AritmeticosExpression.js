const AbstractExpression = require("../Abstract/AbstractExpression");
const AST = require("../AST/AST")
class AritmeticosExpression extends AbstractExpression.AbstractExpression{
    constructor(OperadorAritmetico,valor1,valor2,fila,colummna){
        super(fila,colummna);
        this.OperadorAritmetico = OperadorAritmetico
        this.valor1 = valor1;
        this.valor2 = valor2;
        this.valor1aux = valor1;
        this.valor2aux = valor2;
    }
    Interpret(){
        if (typeof this.valor1 === "object"){
            this.valor1 = this.valor1.Interpret()
            
        }
        if (typeof this.valor2 === "object"){
            
            this.valor2 = this.valor2.Interpret()
        }
        let const1 = typeof this.valor1;
        let const2 = typeof this.valor2;
        switch (this.OperadorAritmetico) {
            case "+":
                
                if(typeof this.valor1 != "undefined"){
                    var numeroComoCadena = this.valor1.toString();
                    
                }
                if(typeof this.valor2 != "undefined"){
                    var numeroComoCadena2 = this.valor2.toString();
                }
                       
                if(/^\d{4}-\d{2}-\d{2}$/.test(numeroComoCadena) && /^\d{4}-\d{2}-\d{2}$/.test(numeroComoCadena2)){
                    return "Esto No se puede hacer"
                }
                if (const1 === "string" && const2 === "string"){
                    return this.valor1 + this.valor2;
                }
                else if(const1 === "string" && const2 === "number"){
                    if(/^\d{4}-\d{2}-\d{2}$/.test(numeroComoCadena) && const2 === "number"){
                        
                        numeroComoCadena = numeroComoCadena.split("-");
                        var year = parseInt(numeroComoCadena[0]);
                        var mes = parseInt(numeroComoCadena[1]);
                        var dia = parseInt(numeroComoCadena[2]);
                        dia += this.valor2
                        while(true){
                            if(dia >= 30){
                                mes += 1;
                                dia -= 29;
                                if(mes >= 12){
                                    mes -= 11
                                    year += 1
                                }
                            }
                            if (dia < 30){
                                break;
                            }
                        }
                        
                        return `${year}-${mes}-${dia}`
                    }
                    let result = parseInt(this.valor1)
                    return result + this.valor2;
                }
                else if(const1 === "number" && const2 === "number"){
                    return this.valor1 + this.valor2;
                }
                else if(const1 === "number" && const2 === "string"){
                    if(const1 === "number" && /^\d{4}-\d{2}-\d{2}$/.test(numeroComoCadena2)){
                        numeroComoCadena2 = new String(numeroComoCadena2);
                        numeroComoCadena2 = numeroComoCadena2.split("-");
                        var year = parseInt(numeroComoCadena2[0]);
                        var mes = parseInt(numeroComoCadena2[1]);
                        var dia = parseInt(numeroComoCadena2[2]);
                        
                        dia += this.valor1
                        
                        while(true){
                            if(dia >= 30){
                                mes += 1;
                                dia -= 29;
                                if(mes >= 12){
                                    mes -= 11
                                    year += 1
                                }
                            }
                            if (dia < 30){
                                break;
                            }
                        }
                        
                        return `${year}-${mes}-${dia}`
                    }
                    let result = parseInt(this.valor2)
                    return this.valor1 + result;
                }
                
                

                    
            case "-":
                if(typeof this.valor1 != "undefined"){
                    var numeroComoCadena = this.valor1.toString();
                    
                }
                if(typeof this.valor2 != "undefined"){
                    var numeroComoCadena2 = this.valor2.toString();
                }
                   
                if(/^\d{4}-\d{2}-\d{2}$/.test(numeroComoCadena) && /^\d{4}-\d{2}-\d{2}$/.test(numeroComoCadena2)){
                    return "Esto No se puede hacer"
                }
                if (const1 === "string" && const2 === "string"){
                    var result = this.valor1.toString() - this.valor2.toString()
                    return result.toString();
                }
                else if(const1 === "number" && const2 === "string"){
                    if(const1 === "number" && /^\d{4}-\d{2}-\d{2}$/.test(numeroComoCadena2)){
                        numeroComoCadena2 = new String(numeroComoCadena2);
                        numeroComoCadena2 = numeroComoCadena2.split("-");
                        var year = parseInt(numeroComoCadena2[0]);
                        var mes = parseInt(numeroComoCadena2[1]);
                        var dia = parseInt(numeroComoCadena2[2]);
                        dia -= this.valor1;
                        while (dia <= 0) {
                            mes -= 1;
                            if (mes <= 0) {
                                mes += 11;
                                year -= 1;
                            }
                            dia += 29;
                        }
                        return `${year}-${mes}-${dia}`;
                    }
                    let result = parseInt(this.valor2)
                    return this.valor1 - result;
                }
                else if(const1 === "string" && const2 === "number"){
                    if(/^\d{4}-\d{2}-\d{2}$/.test(numeroComoCadena) && const2 === "number"){
                        numeroComoCadena = numeroComoCadena.split("-");
                        var year = parseInt(numeroComoCadena[0]);
                        var mes = parseInt(numeroComoCadena[1]);
                        var dia = parseInt(numeroComoCadena[2]);
                        dia -= this.valor2;
                        while (dia <= 0) {
                            mes -= 1;
                            if (mes <= 0) {
                                mes += 11;
                                year -= 1;
                            }
                            dia += 29;
                        }
                        return `${year}-${mes}-${dia}`
                    }
                    let result = parseInt(this.valor1)
                    return result - this.valor2;
                }
                else if(const1 === "number" && const2 === "number"){
                    return this.valor1 - this.valor2;
                }
                
                
                return this.valor1 - this.valor2;
                

            case "/":
                if (const1 === "string" && const2 === "string"){
                    return "No se puede Pro :v"
                }    
                return this.valor1 / this.valor2;
            case "*":
                if (const1 === "string" && const2 === "string"){
                    return "No se puede Pro :v"
                }
                return this.valor1 * this.valor2;
            case "%":
                if (const1 === "string" && const2 === "string"){
                    return "No se puede Pro :v"
                }
                return this.valor1 % this.valor2;
            case "UMENOS":
                if (const1 === "string" && const2 === "string"){
                    return "No se puede Pro :v"
                }
                return this.valor1 * this.valor2;
            default:

                break;
        }
    }
    toString(){
        return "OPERACION ARITMETICO"
    }
    AST(BLOQUE){
        var numero = AST.AST.getInstance().ARITMETICA
        var OPERACION_ARITMETICA = "OPERACION_ARITMETICA"+numero
        var VALOR1 = OPERACION_ARITMETICA+"VALOR1" + numero;
        var VALOR2 = OPERACION_ARITMETICA+"VALOR2" + numero;
        var OPERADOR = OPERACION_ARITMETICA+"OPERADOR" + numero;
        
        let dot = "";
        dot += `"${OPERACION_ARITMETICA}"[label = "ARITMETICO"][shape = oval];\n`
        if(typeof this.valor1aux != "object"){
            dot += `"${VALOR1}"[label = "${this.valor1aux}"][shape = oval];\n`
        }
        else{
            dot += `"${VALOR1}"[label = "${this.valor1aux.Interpret()}"][shape = oval];\n`
        }
        dot += `"${OPERADOR}"[label = "${this.OperadorAritmetico}"][shape = oval];\n`
        if(typeof this.valor2aux != "object"){
            dot += `"${VALOR2}"[label = "${this.valor2aux}"][shape = oval];\n`
        }
        else{
            dot += `"${VALOR2}"[label = "${this.valor2aux.Interpret()}"][shape = oval];\n`
        }
        dot += `"${BLOQUE}" -> "${OPERACION_ARITMETICA}" ;\n`
        dot += `"${OPERACION_ARITMETICA}" -> "${VALOR1}" ;\n`
        dot += `"${OPERACION_ARITMETICA}" -> "${OPERADOR}" ;\n`
        dot += `"${OPERACION_ARITMETICA}" -> "${VALOR2}" ;\n`
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().ARITMETICA += 1;
        if(typeof this.valor1aux === "object"){
            this.valor1aux.AST(VALOR1);
        }
        if(typeof this.valor2aux === "object"){
            this.valor2aux.AST(VALOR2);
        }
    }
}
module.exports = {
    AritmeticosExpression
}