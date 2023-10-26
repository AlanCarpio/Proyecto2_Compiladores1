# Manual de Usuario - Intérprete de SQL en JavaScript

## 1. Objetivos

### Objetivo General:
Aplicar los conocimientos sobre análisis léxico y sintáctico de un compilador para desarrollar un intérprete sencillo funcional para el lenguaje especificado.

### Objetivos Específicos:
- Que el estudiante aprenda a generar analizadores léxicos y sintácticos utilizando la herramienta JISON.
- Que el estudiante comprenda el manejo de errores léxicos y sintácticos correctamente durante la interpretación.
- Que el estudiante realice la implementación del patrón de diseño intérprete para el manejo de acciones gramaticales en JavaScript.

## 2. Descripción General

El curso de Organización de Lenguajes y Compiladores 1 de la Facultad de Ingeniería de la Universidad de San Carlos de Guatemala necesita un intérprete capaz de reconocer un lenguaje basado en SQL. Los estudiantes deben implementar el intérprete en JavaScript utilizando la herramienta JISON para generar el analizador léxico y sintáctico para el reconocimiento de las instrucciones.

El intérprete debe ser capaz de reconocer instrucciones en lenguaje SQL y las sentencias básicas de DDL y DML para el manejo de tablas en memoria. También se debe permitir el uso de distintos tipos de datos en las expresiones y el manejo correcto de la precedencia de las operaciones de dichas expresiones. Debido a que no es requerido que se diferencie entre mayúsculas y minúsculas, el intérprete debe ser implementado como case insensitive.

Como cualquier procesador de lenguaje, debe generar los siguientes reportes: reporte de tokens, reporte de errores, reporte de tabla de símbolos y la graficación del árbol de análisis sintáctico.

## 3. Entorno de Trabajo

### 3.1 Editor

El editor será parte del entorno de trabajo y permitirá el ingreso del código fuente que será analizado. Las funcionalidades y características del editor incluyen:

- Abrir Archivo: Permite abrir archivos con extensiones .qc y muestra su contenido en una nueva pestaña.
- Guardar Como: Permite guardar el estado del archivo en el que se esté trabajando.
- Interpretar: Manda el codigo escrito en la entrada al servidor donde es procesado y mostrado en la consola de salida
- Generar AST: Descarga el codigo del archivo dot para poder visualizarlo
- Consola de Entrada: Permite la entrada de texto para 
- Consola de Salida: Permite visualizar el texto de respuesta del servidor al momento de interpretar.
![](/images/Editor.JPG)

### 3.2 AST
![](/images/AST.JPG)
Se podra visualizar el Arbol AST
### 3.3 Tabla de Simbolos y Tabla de errores
- Tabla de simbolos
Se podra visualizar las variables creadas al momento de interpretar el codigo fuente enviado
![](/images/Simbols.JPG)
- Tabla de Errores: 
Se podra visualizar los errores que se hayan encontrado durante el analisis tanto los errores lexicos como sintacticos.
![](/images/Errores.JPG)


### 3.4 Reportes

Los reportes disponibles son:


- Reporte de Errores: Muestra todos los errores léxicos y sintácticos encontrados.
- Reporte de Tabla de Símbolos: Muestra todas las variables almacenadas en la tabla de símbolos.
- Generar Árbol de Análisis Sintáctico: Genera una imagen del árbol de análisis sintáctico resultante del análisis.

### 3.6 Área de Consola

La consola de salida muestra resultados, mensajes y toda la información generada por el intérprete. No es editable por el usuario y únicamente muestra información.

## 4. Descripción del Lenguaje

El lenguaje Query Crypter, basado en SQL (Structured Query Language), es un lenguaje de consulta de bases de datos relacionales. Se utiliza para realizar tareas como la creación, modificación y consulta de datos en una base de datos.

El lenguaje Query Crypter se divide en dos categorías principales:

- Lenguaje de Definición de Datos (DDL): Se utiliza para crear, modificar y eliminar tablas de una base de datos.
- Lenguaje de Manipulación de Datos (DML): Se utiliza para insertar, actualizar, eliminar y seleccionar datos de las tablas de una base de datos.