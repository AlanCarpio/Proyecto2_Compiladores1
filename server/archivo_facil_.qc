CREATE TABLE Clientes(ID_Cliente INT,Nombre VARCHAR,
CorreoElectronico VARCHAR);
SELECT * FROM Clientes;

INSERT INTO Clientes (ID_Cliente,Nombre, CorreoElectronico)
VALUES (1,"Juan Pérez", "juan@example.com");
SELECT * FROM Clientes;

ALTER TABLE clientes
ADD edad int;
SELECT * FROM Clientes;

INSERT INTO Clientes (Nombre, ID_Cliente,CorreoElectronico,edad)
VALUES ("Carlos Alvarez", 5,"Carlos@example.com",22);
SELECT * FROM Clientes;

ALTER TABLE clientes
DROP COLUMN edad;
SELECT * FROM Clientes;

ALTER TABLE clientes
RENAME TO Alumnos;
SELECT * FROM alumnos;

ALTER TABLE alumnos
RENAME COLUMN id_cliente TO
id;
SELECT * FROM alumnos;

SELECT ID,NOMBRE
FROM ALUMNOS;

CREATE PROCEDURE InicioArchivo1
	@var1 int,
	@punteo int
AS
BEGIN
    print "-----------------CALIFICACION ARCHIVO 1-----------------";
    print "Valor: 15 pts";
    print "--------------------------------------------------------";
    --Verificar ambitos, se toma con prioridad la variable local ante la global.
    if @var1 != 0 THEN
        print "No se toma con prioridad la variable local ante la global";
        print "Perdiste 8 puntos :c";
    else 
        set @punteo = @punteo + 8;
        print "Muy bien, prioridad de variable local correcta" ;
        print "Haz sumado 8 puntos";
        print "Punteo = " + @punteo;
    END IF;

    --Secci?n de declaracion de variables
    call Declaracion(@punteo);
    --seccion de manejo de ?mbitos 2
    --int amb1 = 3;
    --Ambitos2();

    --Secci?n de expresiones aritm?ticas
    --Aritmeticas();

    --Seccion de expresiones l?gicas
    --Logicas();

    --Seccion de expresiones relacionales
    --Relacionales();

    --punteo final

END;


CREATE PROCEDURE Declaracion
	@punteo int
AS
BEGIN
    /*  SALIDA ESPERADA:
            ========= Metodo Declaracion =========
            Voy a ganar Compiladores 1 :D
            ======================================
    */
    print "========= Metodo Declaracion =========" ;
    declare @n1 int default 1;
    declare @n2 int default 1;
    declare @n3 int default 1;
    declare @n4 int default 1;
    declare @str1 varchar default "Voy a ganar Compiladores";
    declare @str2 varchar default "Voy a ganar Compiladores";
    declare @str3 varchar default "Voy a ganar Compiladores";
    declare @str4 varchar default "Voy a ganar Compiladores";
    declare @db1 double default 0.0;
    declare @db2 double default 0.0;
    declare @db3 double default 0.0;
    declare @db4 double default 0.0;

    --si n modificar la asignaci?n
    if @db1 == @db4 THEN 
        print @str1 + " " + @n3 + " :D";
        set @punteo = @punteo + 6;
        print "Declaraci?n correcta";
        print "Haz sumado 6 puntos";
    else
        print "Problemas en el metodo declaracion :(";
        print "Perdiste 6 pts :(";
    end if;
    print "--------------------------------------";
    print "Punteo = " + @punteo;
    print "======================================";
	--seccion de manejo de ?mbitos 2
    call Ambitos2(@punteo);
END;

CREATE PROCEDURE Ambitos2
	@punteo int
AS
BEGIN
    declare @amb1 varchar default "Desde ambito2";
    print "==============Ambitos 2===============";
    if @amb1 == "Desde ambito2" THEN
        print @amb1;
        set @punteo = @punteo + 8;
    else 
        print("Tienes un error al manejar la variable amb1 :(");
        print("Perdiste 8 puntos");
    END IF;
    print "Punteo = " + @punteo;
    print "======================================";
	call Aritmeticas(@punteo);
END;

CREATE PROCEDURE Aritmeticas
	@punteo int
AS
BEGIN
    --suma de strings con caracteres
    /* SALIDA ESPERADA
    ==============Aritmeticas=============
    Hola COMPI
    El valor de  n1 = 52.1
    El valor de n3 = 70.0
    -Operaciones Basicas: valor esperado:   a)62   b)0   c)-19   d)256   resultados>
    a) 62
    b) 0
    c) -19
    d) 256
    ======================================
    */
    print "==============Aritmeticas=============";
    declare @art1 varchar default "Hola " + "C" + "" + "O" + "" + "M" + "" + "P" + "" + "I";
    print @art1;
    if @art1 == "Hola COMPI" then
        set @punteo = @punteo + 6;
    else
        print "Perdiste 6 puntos en suma de cadena y caracter :c";
    end if;

    declare @n1 double default 0.0 + true + true + 1 + 0.1;
    print "El valor de  n1 = " + @n1;
    if @n1 == 3.1 then
        set @punteo = @punteo + 6;
    else
        print "Perdiste 6 puntos en suma de enteros booleanos y caracteres :c";
    end if;

    declare @n2 int default cast("2" as int) - 1 - cast("1" as int);
    if @n2 == 0 then
        set @punteo = @punteo + 5;
    else
        print "Perdiste 5 puntos en la resta de caracteres :c";
    end if;

    declare @n4 double default (5750 * 2) - 11800 + 1.0;
    declare @n3 double default (((3 * 3) + 4) - 80 + 40.00 * 2 + 358.50 - (29 / 14.50)) - (0.50) + @n4;
    print "El valor de n3 = " + @n3;
    if @n3 == 70.0 then
        set @punteo = @punteo + 6;
    else
        print "Perdiste 6 puntos :c ";
    end if;
    print "Punteo = " + @punteo;
    print "======================================";
	 call operacionesBasicas(@punteo);
end;

CREATE PROCEDURE operacionesBasicas
	@punteo int
AS
BEGIN
    print "Operaciones Aritmeticas 1: valor esperado:   a)62   b)0   c)-19   d)16   resultados>";
    declare @a double;
    set @a = (20 - 10 + 8 / 2 * 3 + 10 - 10 - 10 + 50);
    declare @b double;
    set @b = (50 / 50 * 50 + 50 - 100 + 100 - 100);
    declare @c double;
    set @c = (100 / 20 * 9 - 78 + 6 - 7 + 8 - 7 + 7 * 1 * 2 * 3 / 3);
    declare @d double;
    set @d = (2 * (20 / 5 * 2));
    print "a) " + @a;
    print "b) " + @b;
    print "c) " + @c;
    print "d) " + @d;
    if ((@a == 62) and (@b == 0) and (@c == -19) and (@d == 16)) then
        print "Operaciones aritmeticas 1 bien :D";
        set @punteo = @punteo + 8;
    else
        print("Error para las operaciones basicas :(");
    end if;
    call operacionesAvanzadas(@punteo);
end;

CREATE PROCEDURE operacionesAvanzadas
	@punteo int
AS
BEGIN
    declare @aritmetica1 double default 2.0;
    declare @aritmetica2 double default 10.0;
    print "Operaciones Aritmeticas 2: valor esperado>-20  41 \nresultado>";
    declare @aritmetica3 double default @aritmetica2 * -@aritmetica1;
    print @aritmetica3 + "";
    set @aritmetica1 = @aritmetica3 / @aritmetica1 + 50 * 2 / 50 + 50 * 2 - 100 + 100 / 100 - 0;
    print @aritmetica1 + "";
    if ((@aritmetica3 == -20) and (@aritmetica1 == -7)) then
        print "Operaciones aritmeticas 2 bien :D";
        set @punteo = @punteo + 8;
    else
        print("Error Operaciones Aritmeticas");
    end if;
	print "punteo = "+@punteo;
	call Logicas1(@punteo);
end;

CREATE PROCEDURE Logicas1
	@punteo int
AS
BEGIN    
    print "==============Logicas1=============";
    if not false then
	set @punteo = @punteo +1;
        print "Bien primera condicion:)";
    else
        print "Perdiste 1 punto :c";
    end if;

    if (((true and true) or ((false and false) )) or (not true)  ) then
        set @punteo = @punteo +5;
        print"Bien segunda condicion:)";
    else
        print "Perdiste 5 puntos :c";
    end if;
    print "======================================";
    print "-----------------------------------";
    print "Punteo = " + @punteo;
    print "----------------------------------";
    call Logicas2(@punteo);
END;


CREATE PROCEDURE Logicas2
	@punteo int
AS
BEGIN 
    declare @n0 int default 16;
    print "==============Logicas2=============";
    
    declare @n1 double;
    set @n1 = @n0 / 16;
    set @n1 = @n1 + true;
    declare @condicion1 boolean default @n1 != 2; --esto es falso
    declare @condicion2 boolean default 0 == @n1; --falso
    declare @condicion3 boolean default not true; --falso

    if (not(not(not(@condicion1 or @condicion2) or @condicion3))) then
        print "Nots y Ors correctos";
        set @punteo = @punteo + 10;
    else
        print "No Funciona nots y ands :(";
    end if;
    
    print"======================================";
    print "punteo =" + @punteo; 

    call Logicas3(@punteo,@n0);
END;

CREATE PROCEDURE Logicas3
	@punteo int,
	@n0 int
AS
BEGIN 
    
    print "==============Logicas3=============";

    declare @condicion1 boolean default false; --esto es falso
    declare @condicion2 boolean default false; --falso
    declare @condicion3 boolean default true; --verdadero
    if (not (not ((not (false or false)) or (true)))) then
        print "NORS correctos";
        set @punteo = @punteo + 8;
    else
        print "No Funcionan NORS :(";
    end if;

    print "======================================";
	print "punteo = "+@punteo;
	call Relacionales(@punteo);
end;


CREATE PROCEDURE Relacionales
	@punteo int
AS
BEGIN
    declare @n0 int default 34;
    declare @n1 int default 16;

    call relaciones1(@punteo,@n0);
end;

CREATE PROCEDURE relaciones1
	@punteo int,
	@salida int
AS
BEGIN

    print "==============relacionales1=============";
    declare @n0 double default @salida + 0.0;
    if (@n0 < 34.44) then
        set @salida = @salida + 15;
        if (@salida > 44) then
	begin
            set @salida = @salida +1;

        end;
    
    else 
        set @salida = 1;
    end if;

    if (@salida != 1) then
        if (@salida == 50) then
            print "Salida Correcta Relacionales 1!";
            set @punteo = @punteo + 10;
        
        else 
            print "Salida incorrecta!!";
        end if;
    
    else 
        print "Salida incorrecta!!";
    end if;
    print "======================================";
call relaciones2(@punteo,@n1);
end;


CREATE PROCEDURE relaciones2
	@punteo int,
	@n0 int
AS
BEGIN
    print "vas bien, animo :D";

    print "============Relacionales2=============";


    if (10 - 15 >= 0) and (44.44 == 44.44) then
   

        print("Salida incorrecta primer Si relacionales2!!");

    

    else 

        if((15 + 8 == 22 - 10 + 5 * 3 - 4) and (13 * 0 > -1)) then

        

            if(10.0 != 11.0 - 1.01) then

            

                print "Salida CORRECTA en relacionales2!!";
                set @punteo = @punteo + 5;
           

            else 

                print("Salida incorrecta segundo Si relacionales 2!!");

            end if;



        

        else 

            if(1 == 1) then

            

                print "Salida incorrecta relacionales 2 3er si !!" ;

            

            else 

                print("Salida incorrecta relacionales 2 Sino3er si !!");

            end if;



        end if;



    end if;
    print("======================================");
    print "Punteo Final: " + @punteo;
    print "-----------------------------------";
    print "|   RESULTADO ARCHIVO 1 = " + (@punteo*20)/100 + " pts  |";
    print "-----------------------------------";
end;

select * from alumnos;
call InicioArchivo1(0,0);
select * from alumnos;