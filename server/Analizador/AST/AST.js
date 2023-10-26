 
const AST = (function(){
    var instancia;

    class Arbol_AST{
        constructor(){
            this.DOT = "digraph arbol {\n ";
            this.INSTRUCCIONES = 1;
            this.INSTRUCCION = 1;
            //Variables
            this.BUSQUEDA_VARIABLE = 1;
            this.DECLARACION_VARIABLE = 1;
            this.SET_VARIABLE = 1;
            this.SELECT_VARIABLE = 1;
            this.ARITMETICA = 1;
            // Bloques
            this.BLOQUEBEGIN = 1;
            // Tablas
            this.CREATE_TABLA = 1;
            this.MODIFICACION_TABLA = 1;
            this.MODIFICACIONES = 1;
            this.IMPRIMIRTABLAS = 1;
            this.UPDATETABLE = 1;
            this.TRUNCATE = 1;
            this.DELETE = 1;
            // Tablas columnas
            this.COLUMNAS_ATRI = 1;
            this.INSERTARFILAS = 1;
            this.UPDATETABLECOLUMS = 1;

            // OperacionesRelacionales y Logicas
            this.OPERACIONESRELA = 1;
            this.LOGICAS = 1;
            //Sentencias de Control
            this.IF = 1;
            this.CASE = 1;
            this.CASEAUX = 1;
            //FuncionesNativas
            this.CAST = 1;
            this.PRINT = 1;
            this.FLUJO = 1;
            //Funciones Ciclicas
            this.WHILE = 1;
            this.FOR = 1;
        }
        Insertar(dot){
            this.DOT += dot 
        }
        
        reiniciar(){
            this.DOT = "digraph arbol {\n ";
            this.INSTRUCCIONES = 1;
            this.INSTRUCCION = 1;
            //Variables
            this.BUSQUEDA_VARIABLE = 1;
            this.DECLARACION_VARIABLE = 1;
            this.SET_VARIABLE = 1;
            this.SELECT_VARIABLE = 1;
            this.ARITMETICA = 1;
            // Bloques
            this.BLOQUEBEGIN = 1;
            // Tablas
            this.CREATE_TABLA = 1;
            this.MODIFICACION_TABLA = 1;
            this.MODIFICACIONES = 1;
            this.IMPRIMIRTABLAS = 1;
            this.UPDATETABLE = 1;
            this.TRUNCATE = 1;
            this.DELETE = 1;
            // Tablas columnas
            this.COLUMNAS_ATRI = 1;
            this.INSERTARFILAS = 1;
            this.UPDATETABLECOLUMS = 1;

            // OperacionesRelacionales y Logicas
            this.OPERACIONESRELA = 1;
            this.LOGICAS = 1;
            //Sentencias de Control
            this.IF = 1;
            //FuncionesNativas
            this.CAST = 1;
            this.PRINT = 1;
            this.FLUJO = 1;
            //Funciones Ciclicas
            this.WHILE = 1;
        }
        Finalizar(){
            this.DOT += "}" 
        }
        Imprimir(){
            console.log(this.DOT);
        }
        Get_Dot(){
            return this.DOT
        }
    }
    function CrearInstancia(){
        return new Arbol_AST();
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
    AST
}