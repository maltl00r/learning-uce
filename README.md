# Aprendizaje PCEI - UCE 
Repositorio de uso personal y didáctico donde estaré publicando el código y ejercicios prácticos que son impuestos en mi trayecto de estudio en la Carrera de Pedagogía de las Ciencias Experimentales (Informática). 


Uso únicamente educativo. No autorizado para entrega académica como propio.

## Manejo de Excepciones en Python
En Python, se pueden manejar los errores mediante _funciones_ propias del lenguaje para que se ejecute un bloque de código que necesitemos. Los bloques son: **try**, **except**, **else** y **finally**. Cuyas definiciones se detallarán a continuación:
* La función `try` te permite probar un bloque de código para errores.
* La función `except` te permite manerar un error.
* La función `else` te permite ejecutar el código cuando no hay un error.
* La función `finally` te deja ejecutar el código, sin importar el resultado de los bloques **try** and **except**.

Ejemplo 1:
```py
# Crea una lista vacía
lista=[]

#Bloque de código que se va a intentar
try:
    while True:
        numero = int(input("Ingrese un número: "))
        if numero % 2 == 0: # Se guardará el número en "lista" únicamente si es un número par
            lista.append(numero) 
        else:
            print("Solo se permite ingresar números pares")
            break
# Si el bloque anterior da un error, guarda el error como la variable "e" y lo imprime
except ValueError as e:
    print(e)
# Si el bloque "try" no da error, imprime la lista completa.
else:
    print(lista)
```

Ejemplo 2:
```py
# Realice un programa que solicite al usuario dos notas y que calcule
# el promedio de las notas. Controle todos los errores que pueden darse.
notas = []

# En este bloque se va a intentar ejecutar el código donde se solicite la nota
try:
    for i in range(2): # Se solicitan dos notas
        nota=float(input(f"Ingrese la nota #{i+1}: "))
        notas.append(nota) # Cada nota se añade al final de la lista "notas"

    promedio = sum(notas) / len(notas) # Calcula el promedio de la lista "notas"

except ZeroDivisionError: # Si la lista "notas" está vacía, ejecutará lo siguiente:
    print("No existen notas, no se puede sacar el promedio")

except ValueError: # Si se introduce un valor que no es decimal, ejecutará lo siguiente:
    print("Solo se pueden ingresar números")

else: # Si no existe ningún error, muestra el promedio en la consola
    print(promedio)
```