const Simbolo = require("./Simbolo"); 
class Tabla {
    constructor() {
        this.Inicio = null;
        this.Final = null;
    }

    insertar(Ambito, Rol, nombre, tipo, valor) {
        let simbolo = new Simbolo.Simbolo(Ambito,Rol,nombre,tipo,valor)
            if (this.Inicio == null){
                this.Final = this.Inicio = simbolo;
            }
            else{
                this.Final.Siguiente = simbolo;
                simbolo.Anterior = this.Final;
                this.Final = simbolo;
            }
    }

    reiniciar() {
        this.Inicio = null;
        this.Final = null;
    }

    ObtenerSimbolo(Rol) {
        let list = []
            let aux = this.Inicio;
            while (aux != null) {
                if (aux.Rol === Rol){
                    list.push(aux)
                }
                aux = aux.Siguiente; 
            }
            return list;
    }

    EliminarSimbolo(Rol, ID) {
        let aux = this.Inicio;
            
            while (aux != null) {
                if (aux.Rol === Rol){
                    if (aux.nombre === ID){
                        if (aux === this.Inicio){
                            this.Inicio = aux.Siguiente;
                            if (this.Inicio != null) {
                                this.Inicio.Anterior = null;
                            } else {
                                this.Final = null;
                            }
                        }
                        else if (aux === this.Final) {
                            this.Final = aux.Anterior;
                            this.Final.Siguiente = null;
                        }
                        else {
                            aux.Anterior.Siguiente = aux.Siguiente;
                            aux.Siguiente.Anterior = aux.Anterior;
                        }
                        return
                    }
                }
                aux = aux.Siguiente;
            }
    }

    Modificar(ID, Rol, valor) {
        let aux = this.Inicio;
            while (aux != null) {
                if (aux.Rol === Rol){
                    if (aux.nombre === ID){
                        aux.valor = valor; 
                        return
                    }
                }
                aux = aux.Siguiente; 
            }
    }

    Modificar_Tabla(ID, ID_old, ID_new, Rol, Tag, Tipo) {
        let aux = this.Inicio;
            while (aux != null) {
                if (aux.Rol === Rol){
                    if (aux.nombre === ID){
                        switch (Tag) {
                            case "add":
                                aux.valor.AgregarColumna(ID_old);
                                break;
                            case "drop":
                                aux.valor.EliminarColumna(ID_old);
                                break;
                            case "rename_table":
                                aux.nombre = ID_old;
                                aux.valor.Alias = ID_old;
                                break;
                            case "rename_column":
                                aux.valor.CambiarNombreColumna(ID_old,ID_new);
                                break;
                            default:
                                break;
                        }
                    }
                }
                aux = aux.Siguiente; 
            }
    }

    ObtenerTablaSimbolos() {
        let aux = this.Inicio;
            console.log("|  Ambito  |   Rol |   ID  |   Tipo    |   Valor   ");
            while (aux != null) {
                console.log("|  "+aux.Ambito+"  |   "+aux.Rol+"  |   "+aux.nombre+"  |   "+aux.tipo+"  |   "+aux.valor);
                aux = aux.Siguiente; 
            }
    }
}

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            this.tabla = new Tabla();
            Singleton.instance = this;
        }
        return Singleton.instance;
    }
}

module.exports = Singleton;