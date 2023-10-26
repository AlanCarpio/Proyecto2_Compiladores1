const Simbolo = require("./Simbolo"); 
const TS = (function(){
    var instancia;

    class Tabla{
        constructor(){
            this.Inicio = null;
            this.Final = null;
        }
        
        insertar(Ambito,Rol,nombre,tipo,valor){
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
        
        reiniciar(){
            this.Inicio = null;
            this.Final = null;
        }
        ObtenerSimbolo(Rol){
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
        EliminarSimbolo(Rol,ID){
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
        Modificar(ID,Rol,valor){
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
        Modificar_Tabla(ID,ID_old,ID_new,Rol,Tag,Tipo){
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
        ObtenerTablaSimbolos(){
            let aux = this.Inicio;

    // Inicializamos los tamaños máximos de cada columna con un valor mínimo
            let maxAmbitoLength = 7;  // Longitud de "Ambito"
            let maxRolLength = 4;     // Longitud de "Rol"
            let maxNombreLength = 4;  // Longitud de "ID"
            let maxTipoLength = 4;    // Longitud de "Tipo"
            let maxValorLength = 5;   // Longitud de "Valor"

            // Iteramos para encontrar los tamaños máximos
            while (aux != null) {
                maxAmbitoLength = Math.max(maxAmbitoLength, aux.Ambito.length);
                maxRolLength = Math.max(maxRolLength, aux.Rol.length);
                maxNombreLength = Math.max(maxNombreLength, aux.nombre.length);
                
                // Establecemos un valor mínimo para maxTipoLength
                maxTipoLength = Math.max(maxTipoLength, 4); // Mínimo de 4 para "Tipo"
                
                if (aux.tipo !== null) {
                    maxTipoLength = Math.max(maxTipoLength, aux.tipo.length);
                }
                
                // Establecemos un valor mínimo para maxValorLength
                maxValorLength = Math.max(maxValorLength, 5); // Mínimo de 5 para "Valor"
                
                if (typeof aux.valor === "string") {
                    maxValorLength = Math.max(maxValorLength, aux.valor.length);
                } else {
                    maxValorLength = Math.max(maxValorLength, 6); // Mínimo de 6 para "Object"
                }

                aux = aux.Siguiente;
            }

            aux = this.Inicio;

            var data = "|  Ambito" + " ".repeat(maxAmbitoLength - 6) + " |   Rol" + " ".repeat(maxRolLength - 3) + " |   ID" + " ".repeat(maxNombreLength - 2) + " |   Tipo" + " ".repeat(maxTipoLength - 4) + " |   Valor" + " ".repeat(maxValorLength - 5) + "  |\n";

            while (aux != null) {
                data += "|  " + aux.Ambito + " ".repeat(maxAmbitoLength - aux.Ambito.length) + " |   " + aux.Rol + " ".repeat(maxRolLength - aux.Rol.length) + " |   " + aux.nombre + " ".repeat(maxNombreLength - aux.nombre.length) + " |   " + aux.tipo + " ".repeat(maxTipoLength - (aux.tipo || "Tipo").length) + " |   " + aux.valor + " ".repeat(maxValorLength - (aux.valor || "Valor").length) + "  |\n";
                aux = aux.Siguiente;
            }

            return data;
        }
        
    }
    function CrearInstancia(){
        return new Tabla();
    }

    return {
        getInstance:function(){
            if(!instancia){
                instancia=CrearInstancia()
            }
            return instancia;
        }
    }

}());
module.exports = {
    TS
}