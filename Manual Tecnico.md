# Manual Técnico - Intérprete de SQL en JavaScript

## 1. Arquitectura del Sistema

### 1.1. Estructura General

El intérprete de SQL en JavaScript se basa en un enfoque modular que comprende tres componentes principales:
- Editor: Permite la edición y gestión de código fuente.
- Analizador Léxico y Sintáctico: Utiliza JISON para el reconocimiento y análisis de las instrucciones SQL.
- Consola de Salida: Muestra resultados, mensajes.

### 1.2. Comunicación entre Componentes

El editor se comunica con el analizador léxico y sintáctico para enviar el código fuente, y el analizador envía los resultados y mensajes a la consola de salida. El editor puede solicitar la ejecución de la entrada.

## 2. Editor

## 2. Editor

### 2.1. Funcionalidades

- Creación y edición de archivos.
- Apertura de archivos existentes.
- Guardado de archivos.
- Cierre de pestañas.

### 2.2. Interfaz de Usuario

El editor se presenta como una interfaz de pestañas, con la capacidad de abrir, cerrar y editar múltiples archivos de código fuente.

## 3. Analizador Léxico y Sintáctico

### 3.1. Implementación

El analizador léxico y sintáctico se basa en la herramienta JISON para el reconocimiento de instrucciones SQL. Se definen las reglas gramaticales y se generan analizadores a partir de estas reglas.

### 3.2. Reconocimiento de Tokens

El analizador léxico reconoce tokens en el código fuente y genera un reporte de tokens.

### 3.3. Manejo de Errores

El analizador maneja errores léxicos y sintácticos, generando un reporte de errores detallado.

### 3.4. Generación de Árbol de Análisis Sintáctico

Se genera un árbol de análisis sintáctico que representa la estructura del código SQL.

### 3.5. Componentes Lógicos

#### 3.5.1. Librerías Utilizadas

- [Graphviz]: Graphviz es una suite de software de código abierto utilizada para visualizar y representar gráficos y diagramas, especialmente en el contexto de la teoría de grafos. 
- [React]: React es una biblioteca de JavaScript de código abierto desarrollada por Facebook que se utiliza principalmente para la construcción de interfaces de usuario (UI) interactivas y componentes reutilizables. Aunque a menudo se le llama un "framework", React se centra principalmente en la capa de vista de una aplicación y trabaja bien con otras bibliotecas y tecnologías.
- [NodeJs]:Node.js es un entorno de tiempo de ejecución de JavaScript de código abierto que permite a los desarrolladores ejecutar código JavaScript en el lado del servidor. A diferencia de JavaScript en el navegador, que se utiliza principalmente para interactuar con el DOM y las páginas web, Node.js se utiliza para crear aplicaciones del lado del servidor y herramientas de línea de comandos. 
- [Express]:Express es un popular marco de desarrollo de aplicaciones web en Node.js. Su función principal es simplificar la creación de aplicaciones web y servicios API
- [Jison]:Jison es una herramienta que se utiliza para generar analizadores sintácticos o parsers en JavaScript. Su función principal es ayudar en la construcción de intérpretes o compiladores para analizar y procesar lenguajes de programación, formatos de archivos o estructuras de datos específicos.
#### 3.5.2. Estructuras de Datos

Se utilizan las siguientes estructuras de datos en el proyecto:

- [Lista Doblemente Enlazada]: Se uso para guardar los simbolos al momento de interpretar 
    y los errores encontrados al momento de analizar el codigo fuente.
![](/images/Simbol.JPG)


#### 3.5.3. Clases

A continuación se muestran las clases utilizadas para la interpretacion de codigo fuente se utilizo el metodo Patron Interprete:

- Clase Padre donde Heredan las demas clases 
    ![](/images/Padre.JPG)
- Clases hijas que Heredan de la clase Padre
    ![](/images/Hijas.JPG)

Estas clases tienen solo dos Metodos Principales
El Interpret() que tiene el codigo que se encarga de analizar el codigo fuente del programa.

El AST() tiene el codigo que se encarga de hacer arbol sintactico.

## 4. Consola de Salida

### 4.1. Reportes

- Reporte de Errores: Muestra errores léxicos y sintácticos.
![](/images/Errores.JPG)
- Reporte de Tabla de Símbolos: Muestra variables en la tabla de símbolos.
![](/images/Simbols.JPG)
- Generación de Árbol de Análisis Sintáctico: Genera una imagen del árbol sintáctico.
![](/images/Arbol.JPG)

## 5. Descripción del Lenguaje

El lenguaje Query Crypter, basado en SQL, consta de dos categorías principales: DDL y DML, que se utilizan para la creación y manipulación de tablas en una base de datos relacional.

## 6. Requisitos del Sistema

- Navegador web compatible con JavaScript.
- Acceso a Internet para cargar la aplicación.



