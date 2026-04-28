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

# Función tipo 1. Replica el código cuando se llama, no recibe parámetros ni retorna nada
def mensaje():
    print("El número ingresado debe ser igual o mayor que 0") # Muestra el mensaje en consola cuando se lo solicita

# Función tipo 2. Replica el código cuando se llama, no recibe parámetros y retorna un valor.
def mensaje2():
    msg = "El valor ingresado no es un número" # Guarda el mensaje en una variable llamada 'msg'
    return msg # Si se llama la función, va a retornar la variable 'msg'

# Función tipo 3. Replica el código cuando se llama, recibe parámetros y no retorna nada
def suma(x,y):
    print(x+y) # Muestra el resultado de la operación x+y en consola cuando se lo solicita

# Función tipo 3. Replica el código cuando se llama, recibe parámetros y no retorna nada
def resta(x,y):
    # Validación para que el resultado no dé números inferiores a 0
    if x < y: 
        print(f"Este programa no permite la resta de números negativos. ({x} es menor que {y})")

    else:
        resultado=x-y # Guarda el resultado de la resta en una variable
        print(resultado) # Al finalizar, imprime el resultado cuando se solicita la función resta()

# Función tipo 4. Replica el código cuando se llama, recibe parámetros y retorna un valor
def division(x,y):
    resultado = (x/y) # Guarda el resultado de la división en una variable
    return resultado # Retorna la variable 'resultado' cuando se solicita la función division()

# Función tipo 4. Replica el código cuando se llama, recibe parámetros y retorna un valor
def multiplicacion(x,y):
    resultado=x*y # Guarda el resultado de la multiplicación en una variable
    return resultado # Retorna la variable 'resultado' cuando se solicita la función multiplicacion()

while True: # Bucle para repetir el programa hasta que el usuario decida concluir
    try:
        while True: # Bucle para solicitar números hasta que sean válidos
            x = float(input("Ingrese el primer número: ")) # Guarda el primer número en la variable X
            # Valida que 'x' sea mayor o igual que 0
            if x < 0: 
                mensaje() # Se solicita la función tipo 1
                break # Si es un número inválido, se rompe el bucle de solicitar números
            
            y = float(input("Ingrese el segundo número: ")) # Guarda el segundo número en la variable Y
            # Valida que 'y' sea mayor o igual que 0
            if y < 0:
                mensaje() # Se solicita la función tipo 1
                break # Si es un número inválido, se rompe el bucle de solicitar números
            
            # Si ambos números son válidos, va a operar el siguiente código:
            if x and y >= 0:
                # Guarda el operador en la variable 'opción'
                opcion = input("Ingrese un operador matemático (+, -, *, o /) para continuar con la operación: ") 

                # Mostrará el mensaje dependiendo de la operación que se elija
                if opcion == '+': 
                    print("El resultado de la suma es: ")
                    suma(x,y) # Se solicita la función tipo 3

                elif opcion == '-':
                    print("El resultado de la resta es: ")
                    resta(x,y) # Se solicita la función tipo 3

                elif opcion == '*':
                    print("El resultado de la multiplicación es: ")
                    print(multiplicacion(x,y)) # Se solicita la función tipo 4

                elif opcion == '/':
                    print("El resultado de la división es: ")
                    print(division(x,y)) # Se solicita la función tipo 4

                else:
                    print("Operador inválido, intente nuevamente.")

    except ValueError: # Si se ingresa un valor que no es un número ejecutará lo siguiente
        print(mensaje2()) # Llama a la función tipo 2 y la muestra en consola.
    except ZeroDivisionError:
        print("No se puede dividir para 0.") # Si se elige la opción '/' (división) y da error, se mostrará este mensaje

