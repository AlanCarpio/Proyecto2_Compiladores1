class Error{
    constructor(tipo,descripcion,error,fila,columna){
        this.tipo=tipo;
        this.descripcion=descripcion;
        this.error = error;
        this.fila=fila;
        this.columna=columna;
        this.siguiente=null;
        this.anterior=null;
    }
}
module.exports = {
    Error
}