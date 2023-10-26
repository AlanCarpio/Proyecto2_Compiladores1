class Tabla{ 
    constructor(Alias){
        this.Alias = Alias;
        this.Columnas = new Map();
        
    }
    toString() {
      return "Table"; // Representación personalizada como cadena de texto
    }
    AgregarColumna(ID){
        this.Columnas.set(ID,[])
    }
    AgregarContenidoColumna(ID,valor){
        this.Columnas.get(ID).push(valor);
        
    }
    CambiarNombreColumna(nombreViejo, nombreNuevo) {
      if (this.Columnas.has(nombreViejo)) {
        const contenidoColumna = this.Columnas.get(nombreViejo);
        this.Columnas.set(nombreNuevo, contenidoColumna);
        this.Columnas.delete(nombreViejo);
      }
    }
    TruncateTable(){
      for (const [clave, valor] of this.Columnas) {
        this.Columnas.set(clave, []);
      }
    }
    DeleteConCondicion(columna, valorAEliminar){
      
      if (this.Columnas.has(columna)) {
        const valoresColumna = this.Columnas.get(columna);
        
        const indicesAEliminar = [];
        for (let i = 0; i < valoresColumna.length; i++) {
          
          if (valoresColumna[i] === valorAEliminar) {
            
            indicesAEliminar.push(i);
          }
        }
        
        // Eliminar los valores coincidentes en los índices encontrados
        for (let j = indicesAEliminar.length - 1; j >= 0; j--) {
          valoresColumna[indicesAEliminar[j]] = "";
        }
      }
    }
    EliminarColumna(ID){
        this.Columnas.delete(ID);
    }
    UpdateColumnasTabla(columnasNuevas, columnaCondicion, valorCondicion,tag) {
      
      if (!columnaCondicion || !valorCondicion) {
        console.log('Debes proporcionar la columna y el valor de la condición para actualizar las filas.');
        return;
      }
  
      const indexColumnaCondicion = Array.from(this.Columnas.keys()).indexOf(columnaCondicion);
      
      if (indexColumnaCondicion === -1) {
        console.log(`La columna "${columnaCondicion}" no existe en la tabla.`);
        return;
      }
  
      for (let i = 0; i < columnasNuevas.length; i++) {
        const columnaNueva = columnasNuevas[i];
        const { ID, valor } = columnaNueva;

        
        const indexColumnaNueva = Array.from(this.Columnas.keys()).indexOf(ID);
        
        
        if (indexColumnaNueva >= 0) {
          for (let j = 0; j < this.Columnas.get(ID).length; j++) {
            var condicion = null
            switch (tag) {
              case "=":
                condicion = this.Columnas.get(columnaCondicion)[j] === valorCondicion
                break;
              case "!=":
                condicion = this.Columnas.get(columnaCondicion)[j] != valorCondicion
                break;
              case "<=":
                condicion = this.Columnas.get(columnaCondicion)[j] <= valorCondicion
                break;
              case ">=":
                condicion = this.Columnas.get(columnaCondicion)[j] >= valorCondicion
                break;
              case "<":
                condicion = this.Columnas.get(columnaCondicion)[j] < valorCondicion
                break;
              case ">":
                condicion = this.Columnas.get(columnaCondicion)[j] > valorCondicion
                break;
              default:
                break;
            }
            if (condicion) {
              this.Columnas.get(ID)[j] = valor;
            }
            /*
            
            */
          }
          
        }
      }
    }
    
    
    ImprimirTablaTodo() {
      function formatCellValue(value) {
        if (value === false) {
          return 'false';
        } else if (value === true) {
          return 'true';
        } else if (value === 0) {
          return '0';
        }
        return (value || '').toString();
      }
        
      let string = `+${'-'.repeat(this.Alias.length + 2)}+\n`;
        string += `| ${this.Alias} |\n`;
        string += `+${'-'.repeat(this.Alias.length + 2)}+\n`;

        const columnNames = Array.from(this.Columnas.keys());
        const columnWidths = columnNames.map(name => Math.max(name.length, ...this.Columnas.get(name).map(val => (val || '').toString().length)));

        // Imprimir los nombres de las columnas
        string += '| ' + columnNames.map((name, index) => name.padEnd(columnWidths[index])).join(' | ') + ' |\n';

        // Imprimir la línea divisoria
        string += `|${'-'.repeat(columnNames.length + 7 + columnWidths.reduce((acc, width) => acc + width, 0))}|\n`;

        // Imprimir el contenido de las filas
        const numRows = Math.max(...columnNames.map(name => this.Columnas.get(name).length));
        for (let i = 0; i < numRows; i++) {
            string += '| ';
            for (let j = 0; j < columnNames.length; j++) {
            const columnName = columnNames[j];
            const columnWidth = columnWidths[j];
            const value = this.Columnas.get(columnName)[i];
            string += formatCellValue(value).padEnd(columnWidth) + ' | ';
            }
            string += '\n';
        }

        string += `+${'-'.repeat(this.Alias.length + 2)}+\n`;

        return string;
    }
    ImprimirTablaTodoConWhere(columnaFiltrada, valorFiltrado, Tag) {
      function formatCellValue(value) {
        if (value === null || value === undefined) {
          return '';  // Valor en blanco para nulos o indefinidos
        } else if (value === false) {
          return 'false';
        } else if (value === true) {
          return 'true';
        } else if (value === 0) {
          return '0';
        }
        return value.toString();
      }
      let string = `+${'-'.repeat(this.Alias.length + 2)}+\n`;
      string += `| ${this.Alias} |\n`;
      string += `+${'-'.repeat(this.Alias.length + 2)}+\n`;
    
      const columnNames = Array.from(this.Columnas.keys());
      const columnWidths = columnNames.map(name => Math.max(name.length, ...this.Columnas.get(name).map(val => formatCellValue(val).length)));
    
      // Imprimir los nombres de las columnas
      string += '| ' + columnNames.map((name, index) => name.padEnd(columnWidths[index])).join(' | ') + ' |\n';
    
      // Imprimir la línea divisoria
      string += `|${'-'.repeat(columnNames.length + 2 + columnWidths.reduce((acc, width) => acc + width, 0))}|\n`;
    
      // Filtrar las filas solo si se proporciona una columna de filtrado y un valor de filtrado
      if (columnaFiltrada && valorFiltrado !== undefined) {
        const valuesToFilter = this.Columnas.get(columnaFiltrada);
        const filteredRows = [];
    
        for (let i = 0; i < valuesToFilter.length; i++) {
          const value = valuesToFilter[i];
          let includeRow = false;
    
          switch (Tag) {
            case "=":
              includeRow = value === valorFiltrado;
              break;
            case "!=":
              includeRow = value !== valorFiltrado;
              break;
            case ">":
              includeRow = value > valorFiltrado;
              break;
            case ">=":
              includeRow = value >= valorFiltrado;
              break;
            case "<":
              includeRow = value < valorFiltrado;
              break;
            case "<=":
              includeRow = value <= valorFiltrado;
              break;
            default:
              break;
          }
    
          if (includeRow) {
            const row = columnNames.map((columnName, j) => formatCellValue(this.Columnas.get(columnName)[i]).padEnd(columnWidths[j]));
            filteredRows.push(row);
          }
        }
    
        // Imprimir las filas filtradas
        filteredRows.forEach(row => {
          string += '| ' + row.join(' | ') + ' |\n';
        });
      }
    
      string += `+${'-'.repeat(this.Alias.length + 2)}+\n`;
    
      return string;
    }
    ImprimirTablaColumnas(columnas){
        if (!Array.isArray(columnas) || columnas.length === 0) {
            return 'No se especificaron columnas para imprimir.';
          }
        
          let string = `+${'-'.repeat(this.Alias.length + 2)}+\n`;
          string += `| ${this.Alias} |\n`;
          string += `+${'-'.repeat(this.Alias.length + 2)}+\n`;
        
          const columnNames = columnas.filter(name => this.Columnas.has(name));
          const columnWidths = columnNames.map(name => Math.max(name.length, ...this.Columnas.get(name).map(val => (val || '').toString().length)));
        
          // Imprimir los nombres de las columnas
          string += '| ' + columnNames.map((name, index) => name.padEnd(columnWidths[index])).join(' | ') + ' |\n';
        
          // Imprimir la línea divisoria
          string += `|${'-'.repeat(columnNames.length + 2 + columnWidths.reduce((acc, width) => acc + width, 0))}|\n`;
        
          // Imprimir el contenido de las filas
          const numRows = Math.max(...columnNames.map(name => this.Columnas.get(name).length));
          for (let i = 0; i < numRows; i++) {
            string += '| ';
            for (let j = 0; j < columnNames.length; j++) {
              const columnName = columnNames[j];
              const columnWidth = columnWidths[j];
              const value = this.Columnas.get(columnName)[i];
              string += (value || '').toString().padEnd(columnWidth) + ' | ';
            }
            string += '\n';
          }
        
          string += `+${'-'.repeat(this.Alias.length + 2)}+\n`;
        
          return string;
    }
    ImprimirTablaColumnasConWhere(columnas,columnaFiltrada,valorFiltrado,Tag) {
      let string = `+${'-'.repeat(this.Alias.length + 2)}+\n`;
      string += `| ${this.Alias} |\n`;
      string += `+${'-'.repeat(this.Alias.length + 2)}+\n`;

      const columnNames = columnas.filter(name => this.Columnas.has(name));
      const columnWidths = columnNames.map(name => Math.max(name.length, ...this.Columnas.get(name).map(val => (val || '').toString().length)));

      // Imprimir los nombres de las columnas
      string += '| ' + columnNames.map((name, index) => name.padEnd(columnWidths[index])).join(' | ') + ' |\n';

      // Imprimir la línea divisoria
      string += `|${'-'.repeat(columnNames.length + 2 + columnWidths.reduce((acc, width) => acc + width, 0))}|\n`;

      // Filtrar las filas si se especifica una columna y un valor para filtrar
      const filteredRows = [];
      if (true) {
        const valuesToFilter = this.Columnas.get(columnaFiltrada);
        for (let i = 0; i < valuesToFilter.length; i++) {
          switch (Tag) {
            case "=":
              if (valuesToFilter[i] === valorFiltrado) {
                const row = [];
                for (let j = 0; j < columnNames.length; j++) {
                  const columnName = columnNames[j];
                  const columnWidth = columnWidths[j];
                  row.push((this.Columnas.get(columnName)[i] || '').toString().padEnd(columnWidth));
                }
                filteredRows.push(row);
              }
              break;
            case "!=":
              if (valuesToFilter[i] != valorFiltrado) {
                const row = [];
                for (let j = 0; j < columnNames.length; j++) {
                  const columnName = columnNames[j];
                  const columnWidth = columnWidths[j];
                  row.push((this.Columnas.get(columnName)[i] || '').toString().padEnd(columnWidth));
                }
                filteredRows.push(row);
              }
              break;
            case ">":
              if (valuesToFilter[i] > valorFiltrado) {
                const row = [];
                for (let j = 0; j < columnNames.length; j++) {
                  const columnName = columnNames[j];
                  const columnWidth = columnWidths[j];
                  row.push((this.Columnas.get(columnName)[i] || '').toString().padEnd(columnWidth));
                }
                filteredRows.push(row);
              }
              break;
            case ">=":
              if (valuesToFilter[i] >= valorFiltrado) {
                const row = [];
                for (let j = 0; j < columnNames.length; j++) {
                  const columnName = columnNames[j];
                  const columnWidth = columnWidths[j];
                  row.push((this.Columnas.get(columnName)[i] || '').toString().padEnd(columnWidth));
                }
                filteredRows.push(row);
              }
              break;
            case "<":
              if (valuesToFilter[i] < valorFiltrado) {
                const row = [];
                for (let j = 0; j < columnNames.length; j++) {
                  const columnName = columnNames[j];
                  const columnWidth = columnWidths[j];
                  row.push((this.Columnas.get(columnName)[i] || '').toString().padEnd(columnWidth));
                }
                filteredRows.push(row);
              }
              break; 
            case "<=":
              if (valuesToFilter[i] <= valorFiltrado) {
                const row = [];
                for (let j = 0; j < columnNames.length; j++) {
                  const columnName = columnNames[j];
                  const columnWidth = columnWidths[j];
                  row.push((this.Columnas.get(columnName)[i] || '').toString().padEnd(columnWidth));
                }
                filteredRows.push(row);
              }
              break;   
            default:
              break;
          }
        }
      } 

      // Imprimir las filas filtradas
      filteredRows.forEach(row => {
        string += '| ' + row.join(' | ') + ' |\n';
      });

      string += `+${'-'.repeat(this.Alias.length + 2)}+\n`;

      return string;
      
      
    }
}
module.exports = {
    Tabla
}