# Ejercicio: Menú de operaciones matemáticas con validaciones
#
# Instrucciones:
# Elaborar un programa en Python que despliegue un menú para realizar
# las cuatro operaciones básicas. 
#
# Requerimientos:
# - Implementar funciones para capturar y validar datos.
# - Aplicar los cuatro tipos de funciones (con/sin parámetros, con/sin retorno).
# - Validaciones: No división para 0, solo números positivos, no restas negativas.
# - Manejo de errores para evitar caracteres (try/except).
# - El programa permite n repeticiones.

# Función tipo 1. Replica el código cuando se llama, no recibe parámetros ni retorna nada.
def mensaje():
    print("El número ingresado debe ser igual mayor que 0") # Muestra el mensaje en consola cuando se lo solicita

# Función tipo 2. Replica el código cuando se llama, no recibe parámetros y retorna un valor.
def mensaje2():
    msg = "El valor ingresado no es un número" # gua
    return msg

# Función tipo 3. Replica el código cuando se llama, recibe parámetros y no retorna nada.
def suma(x,y):
    print(x+y)

# Función tipo 3. Replica el código cuando se llama, recibe parámetros y no retorna nada.
def resta(x,y):
    if x < y:
        print(f"Este programa no permite la resta de números negativos. ({x} es menor que {y})")
    else:
        resultado=x-y
        print(resultado)

# Función tipo 4. Replica el código cuando se llama, recibe parámetros y retorna un valor.
def division(x,y):
    resultado = (x/y)
    return resultado

# Función tipo 4. Replica el código cuando se llama, recibe parámetros y retorna un valor.
def multiplicacion(x,y):
    resultado=x*y
    return resultado

while True: # Bucle para repetir el programa hasta que el usuario decida concluir
    try:
        while True: # Bucle para solicitar números hasta que sean válidos
            x = float(input("Ingrese el primer número: "))
            if x < 0:
                mensaje()
            y = float(input("Ingrese el segundo número: "))
            if y < 0:
                mensaje()
            break

        opcion = input("Ingrese un operador matemático (+, -, *, o /) para continuar con la operación: ")

        if opcion == '+':
            print("El resultado de la suma es: ")
            suma(x,y)

        elif opcion == '-':
            print("El resultado de la resta es: ")
            resta(x,y)

        elif opcion == '*':
            print("El resultado de la multiplicación es: ")
            print(multiplicacion(x,y))

        elif opcion == '/':
            print("El resultado de la división es: ")
            print(division(x,y))

        else:
            print("Operador inválido, intente nuevamente.")
        
    except ValueError:
        print(mensaje2()) # Llama a la función tipo 2 y la muestra en consola.
    except ZeroDivisionError:
        print("No se puede dividir para 0.")
