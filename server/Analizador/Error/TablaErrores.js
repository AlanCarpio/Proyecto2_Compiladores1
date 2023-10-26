const Error = require('./Error.js')
class Tabla{
    constructor(){
        this.Inicio=null;
        this.Final=null;
        this.Candado = true;
    }
    
    insertar(Tipo,descripcion,Errors,fila,columna){
        let simbolo = new Error.Error(Tipo,descripcion,Errors,fila,columna)
        
        if (Errors != ";"){
            if(this.Candado){
                if (this.Inicio === null){
                    this.Final = this.Inicio = simbolo;
                }
                else{
                    this.Final.Siguiente = simbolo;
                    simbolo.Anterior = this.Final;
                    this.Final = simbolo;
                }
                this.Candado = false
            }
            
        }else{
            this.Candado = true
        }
        
        
        
    }
    /*
    let simbolo = new Error.Error(Tipo,descripcion,Errors,fila,columna)
        
        if (Errors != ";"){
            if(this.Candado){
                if (this.Inicio === null){
                    this.Final = this.Inicio = simbolo;
                }
                else{
                    this.Final.Siguiente = simbolo;
                    simbolo.Anterior = this.Final;
                    this.Final = simbolo;
                }
                this.Candado = false
            }
            
        }else{
            this.Candado = true
        }
    */
    reiniciar(){
        this.Inicio = null;
        this.Final = null;
    }
    
    estaVacia() {
        return this.Inicio === null;
    }
    
    

    
    ObtenerTablaErrores(){
        let aux = this.Inicio;
        let data = "|  Tipo" + " ".repeat(7) + " |   Descripcion" + " ".repeat(12) + " |   Error" + " ".repeat(8) + " |   Fila" + " ".repeat(8) + " |   Columna" + " ".repeat(11) + " |\n";
        while (aux != null) {
            data+="|  " + (String(aux.tipo)).padEnd(10) + " |   " + (String(aux.descripcion)).padEnd(24) + " |   " + (String(aux.error)).padEnd(14) + " |   " + (String(aux.fila)).padEnd(11) + " |   " + (String(aux.columna)).padEnd(16) + " |\n";
            aux = aux.Siguiente;
        }
        return data
    }  
}

module.exports = {
    Tabla
}