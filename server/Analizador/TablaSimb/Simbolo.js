class Simbolo{
    constructor(Ambito,Rol,nombre,tipo,valor){
        this.Ambito=Ambito;
        this.Rol=Rol;
        this.nombre=nombre;
        this.tipo=tipo; // Tipo de dato si es Int o etc
        this.valor=valor; // El valor que tenda
        this.Siguiente = null;
        this.Anterior = null;
    }
}
module.exports = {
    Simbolo
}
 