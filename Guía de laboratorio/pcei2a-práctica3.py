# Métodos
# Taller Grupal
#
# Los estudiantes formarán grupos de cuatro personas. Deberán designar roles
# y organizar su tiempo para asegurar que todos los integrantes contribuyan
# activamente en la investigación y documentación.
#
# El grupo debe investigar los métodos más utilizados para manipular
# objetos de tipo list en Python que se mencionan a continuación:
#
# 1. append()
# 2. insert()
# 3. remove()
# 4. pop()
# 5. sort()
# 6. reverse()
# 7. count()
# 8. index()
#
# Para cada uno de los ocho (8) métodos listados, el grupo debe desarrollar
# y documentar la siguiente información de forma clara y concisa:
#
# - Descripción del método
# - Sintaxis
# - Parámetros que recibe
# - Valor de retorno (si aplica)
# - Ejemplo práctico en código
#
# Todos los integrantes deben participar activamente en el desarrollo
# y documentación del taller.

INVESTIGACIÓN: MÉTODOS DE LISTAS EN PYTHON
1. append(): Sirve para meter un nuevo elemento al final de la lista que ya tenemos.
Sintaxis: lista.append(elemento)
Ejemplo de código:
colores = ["rojo", "verde"]
colores.append("azul")
print(colores)
2. insert(): Agrega un dato en la posición exacta que nosotros queramos usando su número de índice.
Sintaxis: lista.insert(posicion, elemento)
Ejemplo de código:
numeros = [1, 2, 4]
numeros.insert(2, 3) # Metemos el 3 en el lugar del 2
print(numeros)
3. remove(): Busca un valor que le digamos y lo borra de la lista (solo borra el primero que encuentre).
Sintaxis: lista.remove(valor)
Ejemplo de código:
comida = ["pan", "pizza", "arroz"]
comida.remove("pizza")
print(comida)
4. pop(): Quita un elemento de la lista según su posición y, si no ponemos posición, quita el último.
Sintaxis: lista.pop(posicion)
Ejemplo de código:
letras = ["a", "b", "c", "d"]
letras.pop(0) # Quitamos la 'a' que esta en el cero
print(letras)
5. sort(): Acomoda los elementos de la lista, normalmente de menor a mayor o por orden alfabético.
Sintaxis: lista.sort()
Ejemplo de código:
precios = [50, 10, 100, 5]
precios.sort()
print(precios)
6. reverse(): Le da la vuelta a la lista para que el que estaba al final ahora esté al principio.
Sintaxis: lista.reverse()
Ejemplo de código:
orden = [1, 2, 3, 4]
orden.reverse()
print(orden)
7. count(): Cuenta cuántas veces se repite un mismo dato dentro de una lista.
Sintaxis: lista.count(valor)
Ejemplo de código:
notas = [10, 8, 10, 7, 10]
repes = notas.count(10)
print(repes)
8. index(): Nos dice en qué número de posición (índice) se encuentra un dato por primera vez.
Sintaxis: lista.index(valor)
Ejemplo de código:
nombres = ["Juan", "Ana", "Luis"]
donde = nombres.index("Ana")
print(donde)
