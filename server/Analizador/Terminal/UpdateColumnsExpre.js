const AbstractExpression = require("../Abstract/AbstractExpression");
const AST = require('../AST/AST')
class UpdateColumnsExpre extends AbstractExpression.AbstractExpression{
    constructor(ID,valor,fila,colummna){
        super(fila,colummna);
        this.ID = ID;
        this.valor = valor
    }
    Interpret(){
        if (typeof this.valor === "object"){
            this.valor = this.valor.Interpret()
        }
        
        return { ID: this.ID, valor: this.valor }
        
    }
    AST(BLOQUE){
        var numero = AST.AST.getInstance().UPDATETABLECOLUMS
        var UPDATETABLECOLUMS = "UPDATETABLECOLUMS"+numero
        var COLUMNA = UPDATETABLECOLUMS+"COLUMNA"+numero;
        var dot = "";
        dot += `"${COLUMNA}"[label = "${this.ID} = ${this.valor}"][shape = oval];\n`
        dot += `"${BLOQUE}" -> "${COLUMNA}" ;\n`
        AST.AST.getInstance().Insertar(dot);
        AST.AST.getInstance().UPDATETABLECOLUMS += 1;
    }
    
}
module.exports = {
    UpdateColumnsExpre
}