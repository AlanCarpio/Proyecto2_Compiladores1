
%{
    const TablaErrores = require('./Analizador/Error/TablaErrores');
    
    const DeclareListExpression = require('./Analizador/NonTerminal/DeclareListExpression');
    const DeclareExpression = require('./Analizador/NonTerminal/DeclareExpression');
    const SelectExpression = require('./Analizador/NonTerminal/SelectExpression');
    const SetExpression = require('./Analizador/NonTerminal/SetExpression');
    const TableExpression = require('./Analizador/NonTerminal/TableExpression');
    const columnsExpression = require('./Analizador/Terminal/columnsExpression');
    const ModifyTableExpression = require('./Analizador/NonTerminal/ModifyTableExpression');
    const ModifyExpression = require('./Analizador/Terminal/ModifyExpression');
    const DeleteTableExpression = require('./Analizador/NonTerminal/DeleteTableExpression');
    const InsertColumnExpre = require('./Analizador/NonTerminal/InsertColumnExpre');
    const SelectTablesExpression = require('./Analizador/NonTerminal/SelectTablesExpression');
    const RelacionalesExpression = require('./Analizador/Terminal/RelacionalesExpression');
    const AritmeticosExpression = require('./Analizador/Terminal/AritmeticosExpression');
    const BusquedaVariableExpre = require('./Analizador/NonTerminal/BusquedaVariableExpre');
    const BloqueExpression = require('./Analizador/NonTerminal/BloqueExpression');
    const UpdateTableExpression = require('./Analizador/NonTerminal/UpdateTableExpression');
    const UpdateColumnsExpre = require('./Analizador/Terminal/UpdateColumnsExpre');
    const TruncateTableExpre = require('./Analizador/NonTerminal/TruncateTableExpre');
    const LogicalExpression = require('./Analizador/Terminal/LogicalExpression');
    // Importaciones para las tablas
    const DeleteTableExpression2 = require('./Analizador/NonTerminal/TableExpression/DeleteTableExpression2');
    //Importaciones Sentecias de control
    const If = require('./Analizador/NonTerminal/SentenciasDeControl/If');
    const Case = require('./Analizador/NonTerminal/SentenciasDeControl/Case');
    const CaseAux = require('./Analizador/NonTerminal/SentenciasDeControl/CaseAux');
    const Print = require('./Analizador/NonTerminal/FuncionesNativas/Print');
    const Cast = require('./Analizador/NonTerminal/FuncionesNativas/Cast');
    //Importaciones de Sentecias Ciclicas
    const While = require('./Analizador/NonTerminal/SentenciasCiclicas/While');
    const For = require('./Analizador/NonTerminal/SentenciasCiclicas/For');
    //Importaciones Flujo
    const Flujo = require("./Analizador/Terminal/Flujo/Flujo")
    
%}

%{
    const Tabla_de_Errores = new TablaErrores.Tabla()
    Tabla_de_Errores.reiniciar()
%}

%lex

%options case-insensitive

%%
"--".*                          {}; /* Ignorar comentarios de una sola línea que comienzan con "--" */
\/\*[\s\S]*?\*\/                {};/* Ignorar comentarios de varias líneas */

"int"                       return "INT";
"double"                    return "DOUBLE";
"date"                      return "DATE";
"varchar"                   return "VARCHAR";
"boolean"                   return "BOOLEAN";

"declare"                   return "DECLARE";
"default"                   return "DEFAULT";
"begin"                     return "BEGIN";
"end"                       return  "END";
"create"                    return "CREATE";
"table"                     return "TABLE";
"alter"                     return "ALTER";
"add"                       return "ADD";
"drop"                      return "DROP";
"column"                    return "COLUMN";
"rename"                    return "RENAME";
"to"                        return "TO";
"insert"                    return "INSERT";
"into"                    return "INTO";
"values"                    return "VALUES";
"from"                      return "FROM";
"where"                     return "WHERE";
"update"                    return "UPDATE";
"truncate"                  return "TRUNCATE";
"delete"                    return "DELETE";
"print"                     return "PRINT";
"cast"                      return "CAST";
"as"                        return "AS";
"lower"                     return "LOWER";
"upper"                     return "UPPER";
"round"                     return "ROUND";
"len"                       return "LEN";
"typeof"                    return "TYPEOF";
"null"                      return "NULL";
"while"                     return "WHILE";
"break"                     return "BREAK";
"continue"                  return "CONTINUE";
"for"                       return "FOR";
"in"                        return "IN";
"loop"                      return "LOOP";
"case"                      return "CASE";
"when"                      return "WHEN";
// sentencias de Control
"if"                        return "IF";
"then"                      return "THEN";
"else"                      return "ELSE";

"and"                       return "AND";
"or"                        return "OR";
"not"                       return "NOT";

"select"                    return "SELECT";
"set"                       return "SET";

"true"                      return "TRUE";
"false"                     return "FALSE";

/*------------------------ Tokens ------------------------*/

"("                         return "PAR_IZQ";
")"                         return "PAR_DER";
";"                         return "PTCOMA";
"@"                         return "ARROBA";
","                         return "COMA";
"+"                         return "SUMA";
"-"                         return "RESTA";
"*"                         return "MULTI";
"/"                         return "DIVI";
"%"                         return "MODUL";


"=="                        return "DOBLE_IGUAL";
"!="                        return "DIFERENTE";
"<="                        return "MENOR_O_IGUAL";
">="                        return "MAYOR_O_IGUAL";
"<"                         return "MENOR";
">"                         return "MAYOR";
"="                         return "IGUAL";
".."                        return "DOSPTS"

[ \r\t]+                    {};
\n                          {};

\"[0-9]{4}-[0-9]{2}-[0-9]{2}\"  return "FECHA";
[0-9]+(\.[0-9]+)?              return 'DECIMAL';
[0-9]+\b                    return 'ENTERO';
[-_a-zA-Z][-_a-zA-Z0-9]*    {yytext = yytext.toLowerCase(); return 'NOMBRE_DATO'; }

\"[^\"]*\"                { yytext = yytext.substr(1, yyleng-2); return 'DATO_STRING'; };
//

                                         

<<EOF>>                 return 'EOF';

.                       {Tabla_de_Errores.insertar("Error Lexico","Este token no pertenece al lenguaje",yytext,yylloc.first_line,yylloc.first_column+1)}
                        
/lex

/* Asociación de operadores y precedencia */



%start ini
%left OR
%left AND
%right NOT
%left IGUAL DIFERENTE MENOR MENOR_O_IGUAL MAYOR MAYOR_O_IGUAL
%left SUMA RESTA
%left MODUL DIVI MULTI 
%left UMENOS

%% /* Definición de la gramática */

ini 
	: reiniciar instrucciones EOF {;return [$2,Tabla_de_Errores];}
;
reiniciar:
    {Tabla_de_Errores.reiniciar()}
;
instrucciones : instrucciones instruccion {$1.push($2);$$ = $1}
    |instruccion {$$ = [$1]}
;
instruccion:
    DECLARACION_LIST PTCOMA{$$ = $1}
    |DECLARACION PTCOMA{$$ = $1}
    |MODIFICACION PTCOMA{$$ = $1}
    |IMPRIMIR_VARIABLE PTCOMA{$$ = $1}
    |CREAR_TABLA PTCOMA{$$ = $1}
    |MODIFICACION_TABLA PTCOMA{$$ = $1}
    |DELETE_TABLA PTCOMA{$$ = $1}
    |AGREGAR_DATOS_COLUMNAS PTCOMA{$$ = $1}
    |IMPRIMIR_TABLAS PTCOMA{$$ = $1}
    |BEGIN_ENCAPSULADO PTCOMA{$$ = $1}
    |ACTUALIZACION_COLUMNA PTCOMA {$$ = $1}
    |TRUNCATE_TABLES PTCOMA {$$ = $1}
    |DELETE_FILA PTCOMA {$$ = $1}
    |IF_SENTENCIA PTCOMA{$$ = $1}
    |PRINT_SENTENCIA PTCOMA {$$ = $1}
    |WHILE_SENTENCIA PTCOMA {$$ = $1}
    |FLUJO PTCOMA{$$ = $1}
    |FOR_SENTENCIA PTCOMA{$$ = $1}
    |error  {Tabla_de_Errores.insertar("Error Sintactico",`Se Esperaba Este Token:`,yytext ,this._$.first_line,this._$.first_column+1)}

    
    
;
FLUJO:
    BREAK {$$ = new Flujo.Flujo("break",@1.first_line,@1.first_column)}
    |CONTINUE {$$ = new Flujo.Flujo("continue",@1.first_line,@1.first_column)}
;
TIPO:
    INT {$$ = "int"}
    |VARCHAR {$$ = "string"}
    |DOUBLE {$$ = "double"}
    |BOOLEAN {$$ = "boolean"}
    |DATE {$$ = "date"}
    |NULL {$$ = "null"}
;
// $1.toLowerCase() === "false"
TIPOS_DATO:  
    ENTERO {if($1 === "0"){};$$ = parseInt($1, 10)}
    |FECHA {$$ = $1}
    |DECIMAL {$$ = parseFloat($1)}
    |DATO_STRING {$$ = $1}
    |TRUE {$$ = true;} 
    |FALSE {$$ = false;} 
    |ARROBA NOMBRE_DATO {$$ = new BusquedaVariableExpre.BusquedaVariableExpre($2,null,@1.first_line,@1.first_column)}
    |NULL {$$ = null}
;
OPERACIONES_ARITMETICAS:
    RESTA OPERACIONES_ARITMETICAS %prec UMENOS {$$ = new AritmeticosExpression.AritmeticosExpression("UMENOS",$2,-1)}
    |OPERACIONES_ARITMETICAS SUMA OPERACIONES_ARITMETICAS {$$ =  new AritmeticosExpression.AritmeticosExpression("+",$1,$3)}
    |OPERACIONES_ARITMETICAS RESTA OPERACIONES_ARITMETICAS {$$ =  new AritmeticosExpression.AritmeticosExpression("-",$1,$3)}
    |OPERACIONES_ARITMETICAS MULTI OPERACIONES_ARITMETICAS {$$ =  new AritmeticosExpression.AritmeticosExpression("*",$1,$3)}
    |OPERACIONES_ARITMETICAS DIVI OPERACIONES_ARITMETICAS {$$ = new AritmeticosExpression.AritmeticosExpression("/",$1,$3)}
    |OPERACIONES_ARITMETICAS MODUL OPERACIONES_ARITMETICAS {$$ = new AritmeticosExpression.AritmeticosExpression("%",$1,$3)}
    |PAR_IZQ OPERACIONES_ARITMETICAS PAR_DER {$$ = $2}
    |TIPOS_DATO {$$ = $1}
    |CAST_EXPRESSION {$$ = $1}
;
RELACIONALES:
    RELACIONALES IGUAL RELACIONALES {$$ = new RelacionalesExpression.RelacionalesExpression("normal","=",$1,$3)}
    |RELACIONALES DIFERENTE RELACIONALES {$$ = new RelacionalesExpression.RelacionalesExpression("normal","!=",$1,$3)}
    |RELACIONALES MENOR_O_IGUAL RELACIONALES {$$ = new RelacionalesExpression.RelacionalesExpression("normal","<=",$1,$3)}
    |RELACIONALES MAYOR_O_IGUAL RELACIONALES {$$ = new RelacionalesExpression.RelacionalesExpression("normal",">=",$1,$3)}
    |RELACIONALES MENOR RELACIONALES {$$ = new RelacionalesExpression.RelacionalesExpression("normal","<",$1,$3)}
    |RELACIONALES MAYOR RELACIONALES {$$ = new RelacionalesExpression.RelacionalesExpression("normal",">",$1,$3)}
    |OPERACIONES_ARITMETICAS {$$ = $1}
    
;
RELACIONALES_CON_LOGICAS:
    RELACIONALES_CON_LOGICAS AND RELACIONALES_CON_LOGICAS {$$ = new LogicalExpression.LogicalExpression("and",$1,$3)}
    |RELACIONALES_CON_LOGICAS OR RELACIONALES_CON_LOGICAS {$$ = new LogicalExpression.LogicalExpression("or",$1,$3)}
    |NOT RELACIONALES_CON_LOGICAS {$$ = new LogicalExpression.LogicalExpression("not",$2,null)}
    |RELACIONALES {$$ = $1}
;
// declaracion, modificacion y imprimir varaibles 
DECLARACION_LIST:
    DECLARACION_LIST COMA DECLARACION2 {$1.push($3);$$ = new DeclareListExpression.DeclareListExpression($1,@1.first_line,@1.first_column)}
    |DECLARACION {$$ = [$1]}

;
DECLARACION:
    DECLARE ARROBA NOMBRE_DATO TIPO DEFAULT OPERACIONES_ARITMETICAS {$$ = new DeclareExpression.DeclareExpression($3,$4,$6,@1.first_line,@1.first_column)}
    |DECLARE ARROBA NOMBRE_DATO TIPO {$$ = new DeclareExpression.DeclareExpression($3,$4,null,@1.first_line,@1.first_column)}
;
DECLARACION2:
    ARROBA NOMBRE_DATO TIPO DEFAULT OPERACIONES_ARITMETICAS {$$ = new DeclareExpression.DeclareExpression($2,$3,$5,@1.first_line,@1.first_column)}
    |ARROBA NOMBRE_DATO TIPO {$$ = new DeclareExpression.DeclareExpression($2,$3,null,@1.first_line,@1.first_column)}
;

MODIFICACION:
    SET ARROBA NOMBRE_DATO IGUAL OPERACIONES_ARITMETICAS {$$ = new SetExpression.SetExpression($3,$5,@1.first_line,@1.first_column)}
;
IMPRIMIR_VARIABLE:
    SELECT ARROBA NOMBRE_DATO {$$ = new SelectExpression.SelectExpression($3,"","variable",@1.first_line,@1.first_column)}
    |SELECT CAST_EXPRESSION {$$ = new SelectExpression.SelectExpression($2,"","",@1.first_line,@1.first_column)}
    |SELECT LOWER PAR_IZQ TIPOS_DATO PAR_DER {$$ = new SelectExpression.SelectExpression($4,"","lower",@1.first_line,@1.first_column)}
    |SELECT UPPER PAR_IZQ TIPOS_DATO PAR_DER   {$$ = new SelectExpression.SelectExpression($4,"","upper",@1.first_line,@1.first_column)}
    |SELECT ROUND PAR_IZQ TIPOS_DATO COMA TIPOS_DATO PAR_DER {$$ = new SelectExpression.SelectExpression($4,$6,"round",@1.first_line,@1.first_column)}
    |SELECT LEN PAR_IZQ TIPOS_DATO PAR_DER {$$ = new SelectExpression.SelectExpression($4,"","len",@1.first_line,@1.first_column)}
    |SELECT TRUNCATE PAR_IZQ TIPOS_DATO COMA TIPOS_DATO PAR_DER {$$ = new SelectExpression.SelectExpression($4,$6,"truncate",@1.first_line,@1.first_column)}
    |SELECT TYPEOF PAR_IZQ TIPOS_DATO PAR_DER {$$ = new SelectExpression.SelectExpression($4,"","typeof",@1.first_line,@1.first_column)}
    |SELECT CASE_SENTENCIA {$$ = new SelectExpression.SelectExpression($2,"","CASE",@1.first_line,@1.first_column)}
    |SELECT CASE_BUSQUEDA_SENTENCIA {$$ = new SelectExpression.SelectExpression($2,"","CASE",@1.first_line,@1.first_column)}
;
// Encapsulado de instrucciones
BEGIN_ENCAPSULADO:
    BEGIN instrucciones END {$$ = new BloqueExpression.BloqueExpression($2,[$1,$3],@1.first_line,@1.first_column)}
; 
// Tablas
CREAR_TABLA:
    CREATE TABLE NOMBRE_DATO PAR_IZQ TABLA_ATRIBUTOS PAR_DER {$$ =  new TableExpression.TableExpression($3,$5,@1.first_line,@1.first_column)}
;
TABLA_ATRIBUTOS:
    TABLA_ATRIBUTOS COMA ATRIBUTO_TABLA {$1.push($3); $$ = $1;}
    |ATRIBUTO_TABLA {$$ = [$1];}
;
ATRIBUTO_TABLA:
    NOMBRE_DATO TIPO {$$ = new columnsExpression.columnsExpression($1,$2)}
;
// Modificacion de tablas
MODIFICACION_TABLA:
    ALTER TABLE NOMBRE_DATO ACCIONES_MODIFICAR {$$ = new ModifyTableExpression.ModifyTableExpression($3,$4)}
;
ACCIONES_MODIFICAR:
    ACCIONES_MODIFICAR ACCION_MODIFICAR {$1.push($2); $$ = $1;}
    |ACCION_MODIFICAR {$$ = [$1];}
;
ACCION_MODIFICAR:
    ADD NOMBRE_DATO TIPO  {$$ = new ModifyExpression.ModifyExpression($2,null,"add",$3)} // Agrega una nueva columna
    |DROP COLUMN NOMBRE_DATO  {$$ = new ModifyExpression.ModifyExpression($3,null,"drop",null)} // Elimina una columna
    |RENAME TO NOMBRE_DATO  {$$ = new ModifyExpression.ModifyExpression($3,null,"rename_table",null)} //Cambia el nombre a la tabla
    |RENAME COLUMN NOMBRE_DATO TO NOMBRE_DATO  {$$ = new ModifyExpression.ModifyExpression($3,$5,"rename_column",null)}//Cambia el nombre a una columna
;
//Eliminar Una Tabla
DELETE_TABLA:
    DROP TABLE NOMBRE_DATO {$$ = new DeleteTableExpression.DeleteTableExpression($3,@1.first_line,@1.first_column)}
;
// Agregar Contenido a las columnas de las tablas
AGREGAR_DATOS_COLUMNAS:
    INSERT INTO NOMBRE_DATO PAR_IZQ NOMBRES_COLUMNAS PAR_DER VALUES PAR_IZQ VALORES_COLUMNAS PAR_DER {$$ = new InsertColumnExpre.InsertColumnExpre($3,$5,$9,@1.first_line,@1.first_column)}
    
;
NOMBRES_COLUMNAS:
    NOMBRES_COLUMNAS COMA NOMBRE_COLUMNAS {$1.push($3); $$ = $1;}
    |NOMBRE_COLUMNAS {$$ = [$1];}
;
NOMBRE_COLUMNAS:
    NOMBRE_DATO {$$ = $1;}
    |CAST PAR_IZQ NOMBRE_DATO AS TIPOS_DATO PAR_DER {$$ = $3;}
;
VALORES_COLUMNAS:
    VALORES_COLUMNAS COMA VALORE_COLUMNAS {$1.push($3); $$ = $1;}
    |VALORE_COLUMNAS {$$ = [$1];}
;
VALORE_COLUMNAS:
    OPERACIONES_ARITMETICAS {$$ = $1;}
;
// Imprimir en pantalla las tablas
IMPRIMIR_TABLAS:
    SELECT MULTI FROM NOMBRE_DATO {$$ = new SelectTablesExpression.SelectTablesExpression($4,"Todo",null,null);}
    |SELECT ATRIBUTOS_TABLAS FROM NOMBRE_DATO {$$ = new SelectTablesExpression.SelectTablesExpression($4,"Columnas",$2,null);}
    |SELECT MULTI FROM NOMBRE_DATO WHERE CONDICION {$$ = new SelectTablesExpression.SelectTablesExpression($4,"Todo_Where",null,$6);}
    |SELECT ATRIBUTOS_TABLAS FROM NOMBRE_DATO WHERE  CONDICION{$$ = new SelectTablesExpression.SelectTablesExpression($4,"Columnas_Where",$2,$6);}
;
ATRIBUTOS_TABLAS:
    ATRIBUTOS_TABLAS COMA ATRIBUTO_TABLAS {$1.push($3);$$ = $1}
    |ATRIBUTO_TABLAS {$$ = [$1]}
;
ATRIBUTO_TABLAS:
    NOMBRE_DATO {$$ = $1}
;
// Condicion especifica para where
CONDICION:
    NOMBRE_DATO IGUAL CONDICION {$$ = new RelacionalesExpression.RelacionalesExpression("Where","=",$1,$3)}
    |NOMBRE_DATO DIFERENTE CONDICION {$$ = new RelacionalesExpression.RelacionalesExpression("Where","!=",$1,$3)}
    |NOMBRE_DATO MENOR_O_IGUAL CONDICION {$$ = new RelacionalesExpression.RelacionalesExpression("Where","<=",$1,$3)}
    |NOMBRE_DATO MAYOR_O_IGUAL CONDICION {$$ = new RelacionalesExpression.RelacionalesExpression("Where",">=",$1,$3)}
    |NOMBRE_DATO MENOR CONDICION {$$ = new RelacionalesExpression.RelacionalesExpression("Where","<",$1,$3)}
    |NOMBRE_DATO MAYOR CONDICION {$$ = new RelacionalesExpression.RelacionalesExpression("Where",">",$1,$3)}
    |TIPOS_DATO {$$ = $1}
;
// Actualizacion de valores en las tablas en sus columnas
ACTUALIZACION_COLUMNA:
    UPDATE NOMBRE_DATO SET COLUMNAS_ATRI WHERE CONDICION {$$ = new UpdateTableExpression.UpdateTableExpression($2,$4,$6,@1.first_line,@1.first_column)}
;
COLUMNAS_ATRI:
    COLUMNAS_ATRI COMA COLUMNA_ATRI {$1.push($3);$$ = $1}
    |COLUMNA_ATRI {$$ = [$1]}
;
COLUMNA_ATRI:
    NOMBRE_DATO IGUAL OPERACIONES_ARITMETICAS  {$$ = new UpdateColumnsExpre.UpdateColumnsExpre($1,$3,@1.first_line,@1.first_column)}
;
// Truncate
TRUNCATE_TABLES:
    TRUNCATE TABLE NOMBRE_DATO {$$ = new TruncateTableExpre.TruncateTableExpre($3,@1.first_line,@1.first_column)}
;
// Delete
DELETE_FILA:
    DELETE FROM NOMBRE_DATO WHERE CONDICION {$$ = new DeleteTableExpression2.DeleteTableExpression2($3,$5,@1.first_line,@1.first_column)} 
;
//CASt
CAST_EXPRESSION:
    CAST PAR_IZQ OPERACIONES_ARITMETICAS AS TIPO PAR_DER {$$ = new Cast.Cast($3,$5,@1.first_line,@1.first_column)} 
;
// Print
PRINT_SENTENCIA:
    PRINT OPERACIONES_ARITMETICAS {$$ = new Print.Print($2,@1.first_line,@1.first_column)}
    |PRINT CASE_SENTENCIA {$$ = new Print.Print($2,@1.first_line,@1.first_column) }
    |PRINT CASE_BUSQUEDA_SENTENCIA {$$ = new Print.Print($2,@1.first_line,@1.first_column) }
   
;
// Sentencias de Control
// IF
IF_SENTENCIA:
    IF RELACIONALES_CON_LOGICAS THEN  BEGIN instrucciones END {$$ = new If.If($2,"SOLO",$5,null,@1.first_line,@1.first_column)}
    |IF RELACIONALES_CON_LOGICAS THEN instrucciones ELSE instrucciones END IF {$$ = new If.If($2,"",$4,$6,@1.first_line,@1.first_column)}
;
// CASE SIMPLE
CASE_SENTENCIA:
    CASE NOMBRE_DATO MULTI_CASE ELSE OPERACIONES_ARITMETICAS END AS NOMBRE_DATO {$$ = new Case.Case($2,new BusquedaVariableExpre.BusquedaVariableExpre($2,null,@1.first_line,@1.first_column),$3,$5,$8,"",@1.first_line,@1.first_column)}
    |CASE OPERACIONES_ARITMETICAS MULTI_CASE ELSE OPERACIONES_ARITMETICAS END AS NOMBRE_DATO {$$ = new Case.Case($2,$2,$3,$5,$8,"",@1.first_line,@1.first_column)}
    |CASE NOMBRE_DATO MULTI_CASE ELSE OPERACIONES_ARITMETICAS END {$$ = new Case.Case($2,new BusquedaVariableExpre.BusquedaVariableExpre($2,null,@1.first_line,@1.first_column),$3,$5,"","",@1.first_line,@1.first_column)}
    
;
MULTI_CASE:
    MULTI_CASE MULT_CASE {$1.push($2);$$ = $1}
    |MULT_CASE {$$ = [$1]}
;
MULT_CASE:
    WHEN OPERACIONES_ARITMETICAS THEN OPERACIONES_ARITMETICAS { $$ = new CaseAux.CaseAux($2,"",$4,@1.first_line,@1.first_column)}
    
;
//CASE BUSQUEDA
CASE_BUSQUEDA_SENTENCIA:
    CASE  MULTI_CASE_BUSQUEDA ELSE OPERACIONES_ARITMETICAS END AS NOMBRE_DATO {$$ = new Case.Case("","",$2,$4,$7,"BUSCANDO",@1.first_line,@1.first_column)}
    |CASE  MULTI_CASE_BUSQUEDA ELSE OPERACIONES_ARITMETICAS END {$$ = new Case.Case("","",$2,$4,"","BUSCANDO",@1.first_line,@1.first_column)}
    
;
MULTI_CASE_BUSQUEDA:
    MULTI_CASE_BUSQUEDA MULT_CASE_BUSQUEDA {$1.push($2);$$ = $1}
    |MULT_CASE_BUSQUEDA {$$ = [$1]}
;
MULT_CASE_BUSQUEDA:
    WHEN RELACIONALES_CON_LOGICAS THEN OPERACIONES_ARITMETICAS { $$ = new CaseAux.CaseAux($2,"",$4,@1.first_line,@1.first_column)}
    
;
//Sentecias Ciclicas
//While
WHILE_SENTENCIA:
    WHILE RELACIONALES_CON_LOGICAS BEGIN instrucciones END {$$ = new While.While($2,$4,@1.first_line,@1.first_column)}
;
//For
FOR_SENTENCIA:
    FOR ARROBA NOMBRE_DATO IN OPERACIONES_ARITMETICAS DOSPTS OPERACIONES_ARITMETICAS BEGIN instrucciones END LOOP {$$ = new For.For($3,$5,$7,$9,@1.first_line,@1.first_column)}
    |FOR ARROBA NOMBRE_DATO IN OPERACIONES_ARITMETICAS DOSPTS OPERACIONES_ARITMETICAS BEGIN instrucciones END {$$ = new For.For($3,$5,$7,$9,@1.first_line,@1.first_column)}
;
