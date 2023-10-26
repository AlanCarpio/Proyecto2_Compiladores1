const Error = require('./Error.js')
const TS = (function(){
    var instancia;

    class Tabla{
        constructor(){
            this.Inicio=null;
            this.Final=null;
        }
        
        insertar(Tipo,descripcion,Errors,fila,columna){
            let simbolo = new Error.Error(Tipo,descripcion,Errors,fila,columna)
            if (this.Inicio === null){
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
        
        obtener(){
            
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