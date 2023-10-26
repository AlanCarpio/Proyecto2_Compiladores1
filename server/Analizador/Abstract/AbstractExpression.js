class AbstractExpression{
    constructor(fila,Columna){
        this.Fila = fila;
        this.Columna = Columna
    }
    Interpret(){}
    AST(BLOQUE){}
}
module.exports ={
    AbstractExpression
}